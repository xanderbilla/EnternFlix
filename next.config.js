const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const TMDB_IMAGE_HOST = "image.tmdb.org";

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

function buildRemotePatterns() {
  const patterns = [
    { protocol: "https", hostname: TMDB_IMAGE_HOST, pathname: "/**" },
  ];

  const seen = new Set([TMDB_IMAGE_HOST]);
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
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
