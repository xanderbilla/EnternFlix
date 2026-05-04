# SEO

## Metadata

SEO metadata is defined using Next App Router metadata APIs.

Implemented:

- Global metadata in `src/app/layout.tsx`
- Route metadata in page files (`/`, `/movies`, `/search`, `/not-found`)
- Open Graph title/description/type
- Twitter card metadata
- Robots directives in root metadata

## Open Graph

- Site-level OG values are present for major routes.
- `metadataBase` is set for canonical URL resolution.

## Structured Data

- No JSON-LD structured data is currently implemented.
- Recommended future additions:
  - `Movie` / `TVSeries` schema where relevant
  - Organization/site schema in root layout

## Sitemap and Robots

- Robots directives exist via metadata.
- No dedicated `sitemap.ts`/`sitemap.xml` generator currently documented.
- If needed, implement sitemap route and submit to search consoles.

## Practical Checklist

- Keep per-page title/description unique.
- Add social images when media assets are finalized.
- Add structured data for key content pages.
