# syntax=docker/dockerfile:1.7

# Pin a digest for reproducible multi-arch builds.
ARG NODE_IMAGE=node:20-alpine

FROM --platform=$BUILDPLATFORM ${NODE_IMAGE} AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

FROM --platform=$BUILDPLATFORM ${NODE_IMAGE} AS builder
WORKDIR /app
# ---------------------------------------------------------------------------
# Build-time placeholder values. Real URLs are injected at container startup
# by entrypoint.sh so a single image works across all environments.
# The placeholders are valid URLs so next.config.js can parse them.
# ---------------------------------------------------------------------------
ARG NEXT_PUBLIC_CUSTOM_API_URL=https://bi8s-placeholder-api.local/v1/
ARG NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL=https://bi8s-placeholder-cdn.local/
ARG NEXT_PUBLIC_SITE_URL=https://bi8s-placeholder-site.local
ARG NEXT_PUBLIC_ENABLE_LOGGING=false
ARG NEXT_PUBLIC_HTTP_TIMEOUT_MS=10000
# All real CDN and API hosts from every environment are listed here so that
# next/image remotePatterns and CSP headers (resolved at build time) cover
# both dev and bi8s at runtime.
ARG NEXT_PUBLIC_IMAGE_HOSTS=api.emm4bi8s.dev,api-dev.emm4bi8s.dev,cdn.emm4bi8s.dev,cdn-dev.emm4bi8s.dev
ARG NEXT_PUBLIC_APP_VERSION=
ARG NEXT_PUBLIC_APP_ENV=
ENV NEXT_PUBLIC_CUSTOM_API_URL=$NEXT_PUBLIC_CUSTOM_API_URL \
    NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL=$NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_ENABLE_LOGGING=$NEXT_PUBLIC_ENABLE_LOGGING \
    NEXT_PUBLIC_HTTP_TIMEOUT_MS=$NEXT_PUBLIC_HTTP_TIMEOUT_MS \
    NEXT_PUBLIC_IMAGE_HOSTS=$NEXT_PUBLIC_IMAGE_HOSTS \
    NEXT_PUBLIC_APP_VERSION=$NEXT_PUBLIC_APP_VERSION \
    NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ARG NEXT_PUBLIC_APP_VERSION=
ARG NEXT_PUBLIC_APP_ENV=
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_APP_VERSION=$NEXT_PUBLIC_APP_VERSION \
    NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV \
    PORT=8443 \
    HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Runtime entrypoint: replaces placeholder URLs with real env var values
COPY --chmod=755 entrypoint.sh /entrypoint.sh
USER nextjs
EXPOSE 8443
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:8443/ || exit 1
ENTRYPOINT ["/entrypoint.sh"]
