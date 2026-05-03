FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_TMDB_API_KEY
ARG NEXT_PUBLIC_TMDB_BASE_URL
ARG NEXT_PUBLIC_CUSTOM_API_URL
ARG NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL
ARG NEXT_PUBLIC_ENABLE_LOGGING=false
ARG NEXT_PUBLIC_HTTP_TIMEOUT_MS=10000
ARG NEXT_PUBLIC_IMAGE_HOSTS=
ENV NEXT_PUBLIC_TMDB_API_KEY=$NEXT_PUBLIC_TMDB_API_KEY \
    NEXT_PUBLIC_TMDB_BASE_URL=$NEXT_PUBLIC_TMDB_BASE_URL \
    NEXT_PUBLIC_CUSTOM_API_URL=$NEXT_PUBLIC_CUSTOM_API_URL \
    NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL=$NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL \
    NEXT_PUBLIC_ENABLE_LOGGING=$NEXT_PUBLIC_ENABLE_LOGGING \
    NEXT_PUBLIC_HTTP_TIMEOUT_MS=$NEXT_PUBLIC_HTTP_TIMEOUT_MS \
    NEXT_PUBLIC_IMAGE_HOSTS=$NEXT_PUBLIC_IMAGE_HOSTS \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1
CMD ["node", "server.js"]
