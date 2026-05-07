import type { MetadataRoute } from "next";
import { getAbsoluteUrl, siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/watch", "/api/"],
      },
    ],
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
