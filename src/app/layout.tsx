import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import QueryProvider from "@/lib/query/QueryProvider";
import { VideoProvider } from "@/contexts/VideoContext";
import { TransitionProvider } from "@/contexts/TransitionContext";
import { getAbsoluteUrl, siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const defaultDocumentTitle = `${siteConfig.name} - ${siteConfig.tagline}`;
const defaultOgImage = siteConfig.ogImage
  ? [{ url: siteConfig.ogImage }]
  : undefined;
const defaultTwitterImages = siteConfig.ogImage
  ? [siteConfig.ogImage]
  : undefined;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: siteConfig.ogImage ? getAbsoluteUrl(siteConfig.ogImage) : undefined,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}#organization` },
      inLanguage: siteConfig.locale.replace("_", "-"),
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${getAbsoluteUrl("/search")}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultDocumentTitle,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords, "netflix alternative"],
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultDocumentTitle,
    description: siteConfig.description,
    images: defaultOgImage,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultDocumentTitle,
    description: siteConfig.description,
    images: defaultTwitterImages,
    site: siteConfig.twitter.site || undefined,
    creator: siteConfig.twitter.handle || undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <QueryProvider>
          <VideoProvider>
            <TransitionProvider>{children}</TransitionProvider>
          </VideoProvider>
        </QueryProvider>
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          toastOptions={{
            style: { background: "#27272a" },
          }}
        />
      </body>
    </html>
  );
}
