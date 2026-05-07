import { permanentRedirect } from "next/navigation";

// `/` is not a content surface; canonical landing is `/browse`. Issuing a
// 308 keeps SEO equity consolidated on the canonical URL.
export default function HomePage() {
  permanentRedirect("/browse");
}
