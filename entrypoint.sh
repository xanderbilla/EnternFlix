#!/bin/sh
# shellcheck shell=sh
set -e

# ---------------------------------------------------------------------------
# Runtime environment injection for Next.js standalone builds.
#
# NEXT_PUBLIC_* variables are compiled into the client JS bundle at Docker
# *build* time as literal strings. This script replaces the known placeholder
# values with the real values supplied via container environment variables,
# allowing a single image to serve multiple environments.
#
# Two kinds of replacement are performed:
#
#   inject      — replaces full placeholder URLs (with protocol + path).
#                 Targets client-side fetch calls, image src strings, etc.
#
#   inject_host — replaces bare hostname strings in the server bundle.
#                 Specifically patches next/image remotePatterns, which only
#                 stores the hostname (no protocol/path), so that the image
#                 optimisation endpoint accepts requests for the real CDN host.
#                 This is a no-op on images built with NEXT_PUBLIC_IMAGE_HOSTS
#                 already listing all real hosts (the normal CI / fresh-build
#                 path), making it safe to run on any image version.
#
# Strategy:
#   Dockerfile ARG defaults  →  placeholder URL strings baked into bundle
#   Container env vars       →  real URLs passed at "docker run" / compose time
#   This script              →  sed-replaces placeholders before server starts
#
# Idempotent: if a placeholder is absent (e.g. container restart without
# recreation) sed is a no-op. Safe to re-run.
#
# Placeholders must match the ARG defaults in Dockerfile exactly.
# ---------------------------------------------------------------------------

NEXT_DIR="/app/.next"

# inject <placeholder_url> <runtime_url>
# Replaces the full placeholder URL string everywhere in the JS bundle.
# Skips if runtime_url is empty or identical to the placeholder (no-op).
inject() {
  placeholder="$1"
  runtime_val="${2:-}"

  if [ -z "$runtime_val" ] || [ "$runtime_val" = "$placeholder" ]; then
    return 0
  fi

  # -r: skip if find returns no files (BusyBox xargs supports -r since 1.22)
  find "$NEXT_DIR" -type f -name "*.js" \
    | xargs -r sed -i "s|${placeholder}|${runtime_val}|g"
}

# inject_host <placeholder_hostname> <runtime_hostname>
# Replaces a bare hostname string in every JS file.
# Dots in the BRE search pattern are escaped to match literally.
inject_host() {
  placeholder_host="$1"
  runtime_host="${2:-}"

  if [ -z "$runtime_host" ] || [ "$runtime_host" = "$placeholder_host" ]; then
    return 0
  fi

  # Escape dots so they match literally in the BRE pattern, not as wildcards.
  escaped=$(printf '%s' "$placeholder_host" | sed 's/\./[.]/g')

  find "$NEXT_DIR" -type f -name "*.js" \
    | xargs -r sed -i "s|${escaped}|${runtime_host}|g"
}

# url_to_host <url>  →  hostname only (strips protocol and path)
url_to_host() {
  printf '%s' "$1" | sed 's|.*://||' | cut -d'/' -f1
}

# ---------------------------------------------------------------------------
# 1. Full-URL replacement (client JS — fetch calls, image src strings, etc.)
# ---------------------------------------------------------------------------
inject "https://bi8s-placeholder-api.local/v1/"  "${NEXT_PUBLIC_CUSTOM_API_URL:-}"
inject "https://bi8s-placeholder-cdn.local/"      "${NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL:-}"
inject "https://bi8s-placeholder-site.local"      "${NEXT_PUBLIC_SITE_URL:-}"

# ---------------------------------------------------------------------------
# 2. Hostname-only replacement (server bundle — next/image remotePatterns)
# ---------------------------------------------------------------------------
_cdn_host=""
[ -n "${NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL:-}" ] \
  && _cdn_host=$(url_to_host "${NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL}")

_api_host=""
[ -n "${NEXT_PUBLIC_CUSTOM_API_URL:-}" ] \
  && _api_host=$(url_to_host "${NEXT_PUBLIC_CUSTOM_API_URL}")

inject_host "bi8s-placeholder-cdn.local" "$_cdn_host"
inject_host "bi8s-placeholder-api.local" "$_api_host"

exec node server.js
