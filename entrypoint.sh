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

# inject <placeholder> <runtime_value>
# Skips if runtime_value is empty or identical to the placeholder (no-op).
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

inject "https://bi8s-placeholder-api.local/v1/"  "${NEXT_PUBLIC_CUSTOM_API_URL:-}"
inject "https://bi8s-placeholder-cdn.local/"      "${NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL:-}"
inject "https://bi8s-placeholder-site.local"      "${NEXT_PUBLIC_SITE_URL:-}"

exec node server.js
