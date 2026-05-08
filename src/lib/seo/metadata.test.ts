import { describe, expect, it } from "vitest";
import { createPageMetadata } from "@/lib/seo/metadata";

describe("createPageMetadata", () => {
  it("builds canonical, Open Graph, and Twitter metadata from one source", () => {
    const metadata = createPageMetadata({
      title: "Browse",
      description: "Browse titles.",
      path: "/browse",
      keywords: ["browse"],
    });

    expect(metadata.title).toBe("Browse");
    expect(metadata.alternates?.canonical).toBe(
      "https://enternflix.vercel.app/browse",
    );
    expect(metadata.openGraph?.title).toBe("Browse - EnternFlix");
    expect(metadata.openGraph?.url).toBe(
      "https://enternflix.vercel.app/browse",
    );
    expect(metadata.twitter?.title).toBe("Browse - EnternFlix");
    expect(metadata.authors).toEqual([{ name: "EnternFlix" }]);
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(["streaming platform", "browse"]),
    );
  });

  it("can mark pages as noindex when needed", () => {
    const metadata = createPageMetadata({
      title: "Unavailable Content",
      description: "Missing page.",
      path: "/not-found",
      noIndex: true,
    });

    expect(metadata.robots).toEqual({
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    });
  });
});
