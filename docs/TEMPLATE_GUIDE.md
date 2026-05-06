# Template Guide

How to fork EnternFlix and ship your own catalog UI without rewriting the data layer.

## What This Template Gives You

- Production Next.js 16 + React 19 + Tailwind setup with strict TypeScript.
- TanStack Query data layer pre-wired to a content API.
- HLS player, infinite scrolling browse, search, dialogs, and SEO surfaces.
- Docker, lint, typecheck, test, and accessibility tooling.

## What You Will Change

| Concern             | File(s)                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| Brand identity      | `src/config/site.ts`, `public/img/og-default.jpg`, `public/img/logo.*`, favicons in `src/app/` |
| Theme               | `tailwind.config.js`, `src/app/globals.css`                                                    |
| Navigation          | `src/constants/navbar.ts`                                                                      |
| Footer              | `src/components/Footer/`                                                                       |
| Backend endpoints   | `.env.local`, `src/lib/api/request.ts` if shapes differ                                        |
| Genres / categories | `src/constants/` plus any pages under `src/app/(pages)/browse/`                                |

## Step 1: Fork and Install

```bash
git clone https://github.com/xanderbilla/enternflix.git my-app
cd my-app
rm -rf .git && git init
npm ci
cp .env.example .env.local
```

Set in `.env.local`:

```
NEXT_PUBLIC_CUSTOM_API_URL=https://your-api.example.com
NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL=https://your-images.example.com
NEXT_PUBLIC_SITE_URL=https://your-site.example.com
```

## Step 2: Rebrand

`src/config/site.ts`:

```ts
export const siteConfig = {
  name: "Your Brand",
  tagline: "Your tagline.",
  description: "One-line description used in default meta description.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-site.example.com",
  themeColor: "#000000",
  ogImage: "/img/og-default.jpg",
  twitter: { site: "@yourhandle", creator: "@yourhandle" },
  keywords: ["your", "keywords"],
};
```

Replace:

- `public/img/og-default.jpg` (1200×630).
- `public/img/logo.*` and any other logo references.
- Favicon files in `src/app/` (`icon.png`, `apple-icon.png`).

Search the codebase for the literal string `EnternFlix` and replace any user-visible occurrences.

## Step 3: Theme

`tailwind.config.js`:

- Update `theme.extend.colors` for brand colors.
- Update `theme.extend.fontFamily` if you want a different font.

If you switch to a webfont, use `next/font` in `src/app/layout.tsx`:

```ts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });
// then add inter.variable to <html className=...>
```

`src/app/globals.css`:

- Update CSS variables for backgrounds, accents, scrollbar.
- Avoid removing scrollbar styling without testing on Windows + Firefox.

## Step 4: Navigation

`src/constants/navbar.ts` defines the top-level menu and genre list. Edit the entries, then verify the routes exist under `src/app/(pages)/browse/`.

To add a new browse subpage:

```bash
mkdir src/app/\(pages\)/browse/my-list
```

Create `page.tsx`:

```tsx
import { buildBaseMetadata } from "@/lib/seo/metadata";

export const metadata = buildBaseMetadata({
  title: "My List",
  description: "...",
  path: "/browse/my-list",
});

export default function Page() {
  // compose existing components
  return <MyListSurface />;
}
```

Add the path to `src/app/sitemap.ts`.

## Step 5: Backend Adaptation

If your backend matches the [bi8s-go](https://github.com/xanderbilla/bi8s-go) shape, no code changes are needed. Otherwise:

1. Open `src/lib/api/request.ts` and adjust path templates to match your backend.
2. Open `src/types/api.ts` and `src/types/movie.ts` to match your response envelope.
3. Run `npm run typecheck` — TypeScript will surface every place that needs to follow the change.
4. Update mocks in `src/services/content/*.test.ts` and `src/hooks/api/*.test.ts`.

If your backend uses a different envelope (e.g. no `success` flag), update services to normalize once at the boundary instead of changing every component.

## Step 6: Auth (Optional)

Auth is intentionally not implemented. If you need it, follow [AUTHENTICATION.md](AUTHENTICATION.md). The interceptor and middleware extension points are already in place.

## Step 7: Footer

`src/components/Footer/` hosts the brand footer. Replace links and copyright. Keep the layout — it adapts to mobile widths.

## Step 8: SEO Verification

```bash
npm run build
npm start
```

Then:

- View the page source for `/browse`. Confirm canonical, OG, Twitter, and JSON-LD.
- `curl https://your-site/sitemap.xml` and `curl https://your-site/robots.txt`.
- Run Lighthouse SEO and Accessibility on `/browse` and `/watch?id=…`.

## Step 9: Deploy

Follow [DEPLOYMENT.md](DEPLOYMENT.md). The fastest path is `docker compose up --build` against a `.env` file with your URLs.

## Maintaining a Fork

- Pull only the directories you have not customized (e.g. `src/lib/`, `src/hooks/`, `src/services/`).
- Track upstream via `git remote add upstream` and cherry-pick fixes.
- Run `npm audit` weekly. Update one dependency at a time.

## Questions This Template Does Not Answer

- Backend implementation. Use [bi8s-go](https://github.com/xanderbilla/bi8s-go) or your own.
- Cloud-specific deployment (Vercel, AWS ECS, GCP Cloud Run). The standalone bundle runs on all of them; pick one and follow its docs.
- Payments, accounts, watchlists. Not in scope.
