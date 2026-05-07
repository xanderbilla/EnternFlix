const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

function hostFromUrl(url) {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function protoFromUrl(url) {
  if (!url) return "https";
  try {
    return new URL(url).protocol.replace(":", "");
  } catch {
    return "https";
  }
}

function originFromUrl(url) {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

function collectAllowedOrigins() {
  const origins = new Set();
  const apiOrigin = originFromUrl(process.env.NEXT_PUBLIC_CUSTOM_API_URL);
  const imgOrigin = originFromUrl(
    process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL,
  );
  if (apiOrigin) origins.add(apiOrigin);
  if (imgOrigin) origins.add(imgOrigin);

  const extra = (process.env.NEXT_PUBLIC_IMAGE_HOSTS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const entry of extra) {
    if (entry.includes("://")) {
      const o = originFromUrl(entry);
      if (o) origins.add(o);
    } else {
      origins.add(`https://${entry}`);
    }
  }
  return Array.from(origins);
}

function buildRemotePatterns() {
  const patterns = [];

  const seen = new Set();
  const push = (proto, host) => {
    if (!host || seen.has(host)) return;
    seen.add(host);
    patterns.push({ protocol: proto, hostname: host, pathname: "/**" });
  };

  push(
    protoFromUrl(process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL),
    hostFromUrl(process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL),
  );
  push(
    protoFromUrl(process.env.NEXT_PUBLIC_CUSTOM_API_URL),
    hostFromUrl(process.env.NEXT_PUBLIC_CUSTOM_API_URL),
  );

  const extra = (process.env.NEXT_PUBLIC_IMAGE_HOSTS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const entry of extra) {
    if (entry.includes("://")) {
      push(protoFromUrl(entry), hostFromUrl(entry));
    } else {
      push("https", entry);
    }
  }

  return patterns;
}

function buildContentSecurityPolicy() {
  const isDev = process.env.NODE_ENV !== "production";
  const allowed = collectAllowedOrigins();
  const allowedList = allowed.join(" ");
  // Next.js App Router injects inline runtime scripts; without a nonce middleware
  // we must allow 'unsafe-inline' for scripts. Dev additionally needs 'unsafe-eval'
  // for HMR / React Refresh.
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    isDev ? "'unsafe-eval'" : null,
  ]
    .filter(Boolean)
    .join(" ");

  const directives = {
    "default-src": "'self'",
    "base-uri": "'self'",
    "object-src": "'none'",
    "frame-ancestors": "'none'",
    "form-action": "'self'",
    "script-src": scriptSrc,
    "style-src": "'self' 'unsafe-inline'",
    "img-src": `'self' data: blob: ${allowedList}`.trim(),
    "media-src": `'self' blob: ${allowedList}`.trim(),
    "connect-src": `'self' ${allowedList} ${isDev ? "ws: wss:" : ""}`.trim(),
    "font-src": "'self' data:",
    "worker-src": "'self' blob:",
    "manifest-src": "'self'",
    "upgrade-insecure-requests": "",
  };

  return Object.entries(directives)
    .map(([k, v]) => (v ? `${k} ${v}` : k))
    .join("; ");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: buildRemotePatterns(),
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async headers() {
    const csp = buildContentSecurityPolicy();
    const isProd = process.env.NODE_ENV === "production";
    const securityHeaders = [
      { key: "Content-Security-Policy", value: csp },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];
    if (isProd) {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/browse/genere/:id",
        destination: "/browse/genre/:id",
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
