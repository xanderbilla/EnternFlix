# SEO

EnternFlix uses the Next.js Metadata API for HTML head tags, JSON-LD for structured data, and generated `sitemap.xml` / `robots.txt`. All SEO surfaces are server-rendered.

## Metadata

`src/lib/seo/metadata.ts` exposes builders that produce typed `Metadata` objects:

| Builder                                                   | Used by             | Notes                                                                         |
| --------------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------- |
| `buildBaseMetadata({ title, description, path, image? })` | App-wide pages      | Sets canonical, OG, Twitter, robots: `index,follow`                           |
| `buildNoIndexMetadata(...)`                               | `/search`, `/watch` | Sets `robots: { index: false, follow: false }` and disables sitemap inclusion |
| `buildTitleMetadata(content)`                             | `/watch` titles     | Pulls metadata from a fetched `Movie`                                         |

All builders read `siteConfig` (`src/config/site.ts`) for brand and `NEXT_PUBLIC_SITE_URL` for absolute URLs.

### Per-Page Pattern

```ts
// src/app/(pages)/browse/popular/page.tsx
export const metadata = buildBaseMetadata({
  title: "Popular",
  description: "Most popular movies and shows on EnternFlix.",
  path: "/browse/popular",
});
```

For dynamic routes, export `generateMetadata` and call `cache(fetchTitleData)` so the page component reuses the same response:

```ts
const getTitle = cache(fetchTitleData);

export async function generateMetadata({ searchParams }) {
  const { content } = await getTitle(searchParams.id);
  return buildTitleMetadata(content);
}
```

## JSON-LD

`src/lib/seo/jsonLd.tsx` provides small composable builders. Render the result inside a `<script type="application/ld+json">` produced by the helper component.

| Builder                        | Schema           | Use                                       |
| ------------------------------ | ---------------- | ----------------------------------------- |
| `buildMovieJsonLd(movie)`      | `Movie`          | Watch / title page when `mediaType=movie` |
| `buildTvSeriesJsonLd(content)` | `TVSeries`       | Watch / title page when `mediaType=tv`    |
| `buildCollectionJsonLd(items)` | `CollectionPage` | Browse / genre / popular pages            |

JSON-LD is emitted server-side; never inject user input without the schema validator in the builder.

## Sitemap

`src/app/sitemap.ts` returns the routes that should be indexed:

- `/` (redirects to `/browse`, kept for crawler discovery)
- `/browse` and curated subpaths (`/recent`, `/latest`, `/popular`, `/trending`, `/movies`, `/tv-shows`)
- `/browse/genre/{id}` for each known genre

Excluded by design:

- `/watch` — non-canonical query-string page; produces duplicate content if indexed.
- `/search` — query-string driven results.

## Robots

`src/app/robots.ts`:

```
User-agent: *
Allow: /
Disallow: /watch
Disallow: /api/
Sitemap: {NEXT_PUBLIC_SITE_URL}/sitemap.xml
```

## Open Graph & Twitter

`buildBaseMetadata` populates:

- `openGraph`: title, description, url, site name, locale, image (`siteConfig.ogImage` by default).
- `twitter`: `card: "summary_large_image"`, title, description, image, optional `site` / `creator` from `siteConfig.twitter`.

Replace `public/img/og-default.jpg` for your brand. Recommended size: 1200×630.

## Canonical URLs

`buildBaseMetadata` sets `alternates.canonical` to `${siteConfig.url}${path}`. Always pass a leading-slash `path` to keep canonicals correct across environments.

## Headings

- One `<h1>` per route. Banner titles use `<h1>` on detail surfaces; carousels and sections use `<h2>` / `<h3>`.
- Do not skip levels.

## Images

- Use `next/image` via `RemoteImage`. It enforces width/height to prevent CLS and emits `loading="lazy"` except for above-the-fold banners (use `priority`).
- Always provide `alt`. Empty `alt=""` only for purely decorative imagery.

## SEO Checklist

- [ ] Page exports `metadata` or `generateMetadata`.
- [ ] Canonical path is a clean URL (no trailing slash, no query for indexable pages).
- [ ] Public pages do **not** use `buildNoIndexMetadata`.
- [ ] Title and description are unique and < 160 chars.
- [ ] OG image exists and is reachable.
- [ ] Detail pages emit JSON-LD (`Movie` / `TVSeries`).
- [ ] Sitemap contains the route (or the route is intentionally excluded).
- [ ] No `console.error` from missing required env at request time.
