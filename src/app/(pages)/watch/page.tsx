import { cache } from "react";
import { notFound } from "next/navigation";
import WatchPageContent from "@/components/WatchPage/WatchPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildTitleJsonLd } from "@/lib/seo/jsonLd";
import { fetchTitleData } from "@/services/content/titleContent";

/** Dedupes the title fetch between generateMetadata and the page render. */
const getTitle = cache(fetchTitleData);

interface WatchPageProps {
  searchParams: Promise<{ id?: string; type?: string }>;
}

const BASE_KEYWORDS = ["watch", "stream", "movie", "tv show"];

export async function generateMetadata({ searchParams }: WatchPageProps) {
  const { id, type } = await searchParams;
  const path =
    id && type ? `/watch?id=${encodeURIComponent(id)}&type=${type}` : "/watch";

  let title = "Watch";
  let description = "Watch selected movie or TV content on EnternFlix.";

  if (id) {
    try {
      const { content } = await getTitle(id);
      if (content.title) {
        title = `Watch ${content.title}`;
        description =
          content.overview?.trim() || `Stream ${content.title} on EnternFlix.`;
      }
    } catch {
      // Fallback to generic metadata; watch surface is noIndex anyway.
    }
  }

  return createPageMetadata({
    title,
    description,
    path,
    keywords: BASE_KEYWORDS,
    noIndex: true,
  });
}

export default async function WatchPage({ searchParams }: WatchPageProps) {
  const params = await searchParams;
  const id = params.id ?? null;
  const type =
    params.type === "movie" || params.type === "tv" ? params.type : null;

  if (!id || !type) {
    notFound();
  }

  let titleJsonLd: ReturnType<typeof buildTitleJsonLd> | null = null;
  try {
    const { content, mediaType } = await getTitle(id);
    titleJsonLd = buildTitleJsonLd(content, mediaType);
  } catch {
    // Render without structured data if the title cannot be resolved.
  }

  return (
    <>
      {titleJsonLd ? <JsonLd data={titleJsonLd} id="title-jsonld" /> : null}
      <WatchPageContent contentId={id} contentType={type} />
    </>
  );
}
