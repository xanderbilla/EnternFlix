import type { Metadata } from "next";
import { getAbsoluteUrl, siteConfig } from "@/config/site";

interface CreatePageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  /** Override the default OG/Twitter image. Absolute or site-relative path. */
  image?: string;
}

function buildDocumentTitle(title: string) {
  return title === siteConfig.name ? title : `${title} - ${siteConfig.name}`;
}

function resolveImageUrl(image?: string) {
  const target = image ?? siteConfig.ogImage;
  if (!target) return undefined;
  if (/^https?:\/\//i.test(target)) return target;
  return getAbsoluteUrl(target);
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
  image,
}: CreatePageMetadataOptions): Metadata {
  const absoluteUrl = getAbsoluteUrl(path);
  const documentTitle = buildDocumentTitle(title);
  const imageUrl = resolveImageUrl(image);
  const ogImages = imageUrl ? [{ url: imageUrl }] : undefined;
  const twitterImages = imageUrl ? [imageUrl] : undefined;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.creator,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: absoluteUrl,
      siteName: siteConfig.name,
      title: documentTitle,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle,
      description,
      images: twitterImages,
      site: siteConfig.twitter.site || undefined,
      creator: siteConfig.twitter.handle || undefined,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
  };
}
