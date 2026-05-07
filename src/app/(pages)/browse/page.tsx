import { DynamicHome } from "@/utils/dynamicImports";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Browse",
  description:
    "Discover unlimited movies, TV shows, and anime on EnternFlix. Watch trending content, explore new releases, and stream your favorite entertainment.",
  path: "/browse",
  keywords: [
    "browse",
    "streaming",
    "movies",
    "tv shows",
    "anime",
    "trending",
    "new releases",
  ],
});

export default function BrowsePage() {
  return <DynamicHome />;
}
