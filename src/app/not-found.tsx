import NotFoundContent from "@/components/NotFound/NotFoundContent";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Unavailable Content",
  description:
    "The content you're looking for is not available. Explore our vast collection of movies, TV shows, and anime on EnternFlix.",
  path: "/not-found",
  keywords: ["404", "not found", "unavailable content"],
  noIndex: true,
});

export default function NotFound() {
  return <NotFoundContent />;
}
