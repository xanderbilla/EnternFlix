const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// Helper function to extract hostname from URL
const getHostnameFromUrl = (url) => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return null;
  }
};

// Helper function to extract protocol from URL
const getProtocolFromUrl = (url) => {
  if (!url) return "https";
  try {
    const urlObj = new URL(url);
    return urlObj.protocol.replace(":", "");
  } catch {
    return "https";
  }
};

// Build remote patterns from environment variables
const buildRemotePatterns = () => {
  const patterns = [
    // TMDB images (always HTTPS)
    {
      protocol: "https",
      hostname: "image.tmdb.org",
      pathname: "/**",
    },
  ];

  // Add S3 image base URL if configured
  const s3ImageUrl = process.env.NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL;
  if (s3ImageUrl) {
    const s3Hostname = getHostnameFromUrl(s3ImageUrl);
    if (s3Hostname) {
      patterns.push({
        protocol: getProtocolFromUrl(s3ImageUrl),
        hostname: s3Hostname,
        pathname: "/**",
      });
    }
  }

  // Fallback S3 hostnames (for development)
  // Add both dev and prod S3 buckets
  patterns.push(
    {
      protocol: "https",
      hostname: "bi8s-dev.s3.us-east-1.amazonaws.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "bi8s.s3.us-east-1.amazonaws.com",
      pathname: "/**",
    },
  );

  // Add custom API URL if configured
  const customApiUrl = process.env.NEXT_PUBLIC_CUSTOM_API_URL;
  if (customApiUrl) {
    const apiHostname = getHostnameFromUrl(customApiUrl);
    if (apiHostname) {
      patterns.push({
        protocol: getProtocolFromUrl(customApiUrl),
        hostname: apiHostname,
        pathname: "/**",
      });
    }
  }

  // Fallback API hostnames
  patterns.push(
    {
      protocol: "https",
      hostname: "api.xanderbilla.com",
      pathname: "/**",
    },
    {
      protocol: "http",
      hostname: "localhost",
      pathname: "/**",
    },
  );

  return patterns;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: buildRemotePatterns(),
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = withBundleAnalyzer(nextConfig);
