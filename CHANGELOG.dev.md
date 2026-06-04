# Changelog (dev)
## v0.2.0 - 2026-05-09
## v0.41.0 - 2026-06-04

Environment: dev
Docker Image: 
Git Tag: v0.41.0
Commit SHA: 78a66e68e8d591e491a041d62a13f5d135039bff

Changes:
- feat: replace MovieList with MovieGrid on home, movies, and TV pages (78a66e6)

## v0.40.0 - 2026-06-04

Environment: dev
Docker Image: 
Git Tag: v0.40.0
Commit SHA: 409990639f9ca543942f932f71a586b26c42d031

Changes:
- fix: prevent horizontal overflow in Banner component during slide-in animations (4099906)

## v0.39.0 - 2026-06-04

Environment: dev
Docker Image: 
Git Tag: v0.39.0
Commit SHA: 637ec9d32bf6436589baf6bf01f0935426bc7946

Changes:
- fix: update recently added titles, fix navbar hydration FOUC, and optimize responsiveness (637ec9d)

## v0.38.0 - 2026-06-04

Environment: dev
Docker Image: 
Git Tag: v0.38.0
Commit SHA: d61b20fbc71d6b4796ccf887f5463191a80dc2e1

Changes:
- refactor: update page titles and metadata formatting (d61b20f)

## v0.37.0 - 2026-06-04

Environment: dev
Docker Image: 
Git Tag: v0.37.0
Commit SHA: 78519be4e1262d520f94d56facf1ca4333ab9e6f

Changes:
- feat(banner): set opacity to 50% for audio/replay buttons and content rating, rising to 90% for audio on hover (78519be)

## v0.36.0 - 2026-06-04

Environment: dev
Docker Image: 
Git Tag: v0.36.0
Commit SHA: f6101541c91738594410b1753648627e7b9956f9

Changes:
- feat(banner): reposition audio controls on mobile and make icons responsive (f610154)

## v0.35.0 - 2026-06-04

Environment: dev
Docker Image: 
Git Tag: v0.35.0
Commit SHA: 2d6bb8da97b6c7c9e29ef650be4817d97c38aaa4

Changes:
- feat(playback): implement touch double-tap for fullscreen toggle and restrict auto-rotation to fullscreen only (2d6bb8d)

## v0.34.0 - 2026-06-04

Environment: dev
Docker Image: 
Git Tag: v0.34.0
Commit SHA: 18a65da03680a4345643e917d2750a5dfb78b30b

Changes:
- style: apply prettier formatting to navigation files (18a65da)
- feat(playback): implement landscape mode for video player on small screens and enhance navigation URL handling (9988a0a)

## v0.33.0 - 2026-06-04

Environment: dev
Docker Image: 
Git Tag: v0.33.0
Commit SHA: bf5e1e184ec3ce654679b400f3c7421851799cc1

Changes:
- feat(reporting): add Report Issue dialog for playback issues and enhance navigation with source tracking (bf5e1e1)

## v0.32.0 - 2026-06-02

Environment: dev
Docker Image: 
Git Tag: v0.32.0
Commit SHA: 75836547647314238da58a3faae6ef38a413d341

Changes:
- feat(playback): enhance playback controls with hover progress tooltip and fullscreen adjustments style(playback): update volume slider track colors and button sizes for better UI fix(video): improve error handling and visibility in video header and playback components (7583654)

## v0.31.0 - 2026-06-02

Environment: dev
Docker Image: 
Git Tag: v0.31.0
Commit SHA: dbc99ba88c5ed8492c58a9880497c5832302cb39

Changes:
- fix(playback): update video playing state management in Banner component (dbc99ba)
- style(docs): improve table formatting in Playback Controls documentation (9f0e8ae)
- feat(docs): add Playback Controls documentation detailing player controls and visibility rules (c5e1bb6)
- fix(playback): update playback data structure to use new preview URL format (b8d6023)
- feat: enhance playback functionality with season and episode support, update related components and hooks (61c4352)

## v0.30.0 - 2026-05-31

Environment: dev
Docker Image: 
Git Tag: v0.30.0
Commit SHA: fa4bdfebd9546a5f894d21a74b46f4cd051a5ff3

Changes:
- style(icons): apply prettier formatting to SVG icon components (fa4bdfe)
- fix(banner): use playback preview with asset fallback for video URL (969cb23)
- fix(video): use AssetKey.value and CLIP-first asset priority order (d424458)
- feat(cast-info): reorder fields and add aliases, career, measurements (c673e09)
- feat(types): update Movie, Asset, and Person schema to match API (08d2610)
- feat(cast-dialog): add role icons and tooltips to dialog header (8507d2d)
- feat(ui): add reusable CSS-only Tooltip component (bdffc23)
- feat(icons): add PerformerIcon and ContentCreatorIcon SVG components (d630f0a)
- fix(search): prevent input reset while typing on /search page (99c3173)
- chore(docker): normalize container port from 8443 to 3000 (4a1e525)

## v0.29.0 - 2026-05-30

Environment: dev
Docker Image: 
Git Tag: v0.29.0
Commit SHA: 5e86fd2417b4497b1d97d3b08d62b81a071016f9

Changes:
- fix(config): pin server port to 8443 across dev, start, Docker, and compose (5e86fd2)

## v0.28.0 - 2026-05-30

Environment: dev
Docker Image: 
Git Tag: v0.28.0
Commit SHA: 2dfa9e637cc2291a045beb3f47a0ec8bf48f9939

Changes:
- fix(deps,format): add sonner to dependencies and fix apiErrorToast formatting (2dfa9e6)
- test(env,logger): update mocks and tests for logLevel config (740abaa)
- style(banner): reformat useBanner destructure for readability (efc95b1)
- feat(logger): replace binary flag with LEVEL_RANK level-order filter (62f707f)
- feat(env): replace enableLogging with NEXT_PUBLIC_LOG_LEVEL level config (ff3726f)
- fix(genre): hide genre button until genres have loaded (799da24)
- fix(banner): cap retries at 3 total calls and show info toast on failure (ec07ed2)
- fix(ui): soften image fallback background to zinc-800/40 (4cbb22f)
- feat(skeleton): pass isLoading to grids in browse, genre, and search pages (8b68578)
- feat(skeleton): wire skeleton into MovieGrid and MovieList (f179c67)
- feat(skeleton): add MovieListSkeleton, MovieGridSkeleton, and isLoading prop type (5bcd569)
- fix(playback): suppress noisy network error logs (9f6dbf9)
- feat(toast): add sonner Toaster and apiErrorToast utility (c9ea682)

## v0.27.0 - 2026-05-30

Environment: dev
Docker Image: 
Git Tag: v0.27.0
Commit SHA: 3251203f4b4e71aea684d754b30f8567f87a1511

Changes:
- feat(ui): remove skeletons, add per-card bg-zinc-800 with onLoad fade (3251203)

## v0.26.0 - 2026-05-29

Environment: dev
Docker Image: 
Git Tag: v0.26.0
Commit SHA: 8f4c2ce314d4364970c41ea08e61215ee8175cea

Changes:
- fix(entrypoint): patch remotePatterns hostnames in server bundle for next/image (8f4c2ce)

## v0.25.0 - 2026-05-29

Environment: dev
Docker Image: 
Git Tag: v0.25.0
Commit SHA: 07a4d5644a2b08da6bf895382738f7acbe222736

Changes:
- fix: remove hardcoded S3 fallback and fix compose build args (07a4d56)
- fix: correct runtime URL injection and env configuration (0b2ce01)

## v0.24.0 - 2026-05-29

Environment: dev
Docker Image: 
Git Tag: v0.24.0
Commit SHA: 382c00ca023c9f030d98ca22cdbc423e2de4df47

Changes:
- fix(ci): add placeholder URL vars to build job env (382c00c)
- ci: switch to paths allowlist trigger, add app_env output for NEXT_PUBLIC_APP_ENV (bb423e2)
- chore: remove production environment variables from .env.production file (43b6c02)
- feat: update CI/CD workflow and Dockerfile for bi8s environment support, add entrypoint script for runtime variable injection (1b6b816)

## v0.23.0 - 2026-05-28

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.23.0
Git Tag: v0.23.0
Commit SHA: 4fa43ecde25ab3f3726800080908b79be0d81806

Changes:
- fix: remove unnecessary animation class from loading state in Banner component (4fa43ec)

## v0.22.0 - 2026-05-28

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.22.0
Git Tag: v0.22.0
Commit SHA: 223a6a28585a5412102ed4dadc62575b04322ee2

Changes:
- feat: implement server-side prefetching for movies and browse pages, enhance loading states and error handling (223a6a2)

## v0.21.0 - 2026-05-27

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.21.0
Git Tag: v0.21.0
Commit SHA: e646f355f170e9108908b66a5f7bff700357ab83

Changes:
- fix: responsive navbar clearance for movies, genre, and collection pages (e646f35)

## v0.20.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.20.0
Git Tag: v0.20.0
Commit SHA: 188b78ee0413895aa00e3872c28c21370442ba88

Changes:
- fix(ci): poll until all Amplify jobs cleared before triggering new deploy (188b78e)

## v0.19.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.19.0
Git Tag: v0.19.0
Commit SHA: 056b517c364c531476dcc23a9813ce4c353069b2

Changes:
- fix(ci): stop pending Amplify jobs before triggering new deploy to avoid LimitExceededException (056b517)

## v0.18.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.18.0
Git Tag: v0.18.0
Commit SHA: 2235ca39e7e01c735ccae7e3ad1c8d3982b7f8f3

Changes:
- fix: add missing @testing-library/dom peer dependency (2235ca3)
- fix(Navbar): center logo and adjust mobile menu layout (6b1ef67)
-  Please enter the commit message for your changes. Lines starting (1330c71)

## v0.17.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.17.0
Git Tag: v0.17.0
Commit SHA: 5e8b18f0c48c09a8dae68bc381b1f7fbb8ad8f07

Changes:
- fix(build): stabilize turbopack root and amplify install (5e8b18f)

## v0.16.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.16.0
Git Tag: v0.16.0
Commit SHA: 69dcd897c45a9614f650df4fa53c1d0e9c21c51e

Changes:
- fix(amplify): install devDependencies during build (69dcd89)

## v0.15.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.15.0
Git Tag: v0.15.0
Commit SHA: d7250602aedec306c6ab294d014e6dae3f62ad21

Changes:
- fix(amplify): force production mode for Next build (d725060)

## v0.14.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.14.0
Git Tag: v0.14.0
Commit SHA: 2f0d7ea2bf0fcf99716420b244acb4fb42536bef

Changes:
- fix(amplify): remove duplicated build spec keys (2f0d7ea)
- docs: add amplify build troubleshooting guide (1d22007)

## v0.13.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.13.0
Git Tag: v0.13.0
Commit SHA: da4cdf85f1d82eae632509f50237985ad5917872

Changes:
- fix(amplify): add .env.production and improve build reliability (da4cdf8)

## v0.12.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.12.0
Git Tag: v0.12.0
Commit SHA: 935b13b54883f05ee3e552c143ff940f55e364a8

Changes:
- fix(amplify): use minimal build config relying on amplify env vars (935b13b)

## v0.11.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.11.0
Git Tag: v0.11.0
Commit SHA: 366c97b1351b6130cc5147261237718749d2687c

Changes:
- fix(amplify): simplify build config with legacy peer deps (366c97b)
- fix(amplify): persist environment variables to build phase (3143df1)

## v0.10.0 - 2026-05-10

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.10.0
Git Tag: v0.10.0
Commit SHA: 505920a6f9f58e82057ff98d1206c21690b6623c

Changes:
- feat: enhance Amplify environment setup with detailed variable management and defaults (505920a)

## v0.9.0 - 2026-05-09

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.9.0
Git Tag: v0.9.0
Commit SHA: ea7a7e9883d6bff148245dd05af33cf4ebd0a713

Changes:
- fix: ensure local image optimization works without env vars and refine carousel behavior (ea7a7e9)

## v0.8.0 - 2026-05-09

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.8.0
Git Tag: v0.8.0
Commit SHA: 880219c2ff5f1f4c3566a8ff14d7d1edc89966e8

Changes:
- fix: improve banner loading behavior and update movie list rendering (880219c)
- Revert "fix: movielist card clipping by enabling horizontal scroll" (3445e83)

## v0.7.0 - 2026-05-09

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.7.0
Git Tag: v0.7.0
Commit SHA: 477e481377b4349ce6ac04dbc44e88c691fea8f4

Changes:
- fix: movielist card clipping by enabling horizontal scroll (477e481)

## v0.6.0 - 2026-05-09

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.6.0
Git Tag: v0.6.0
Commit SHA: 479c92b4f92c54bbc1b7eda66b12be15a1ee1dc9

Changes:
- ci: amplify integration complete (479c92b)

## v0.5.0 - 2026-05-09

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.5.0
Git Tag: v0.5.0
Commit SHA: a646f06b0cbd6bfee92d6631bd20716df5044d23

Changes:
- ci: skip runs on docs changes and fix amplify deploy (a646f06)

## v0.4.0 - 2026-05-09

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.4.0
Git Tag: v0.4.0
Commit SHA: 7907c37df0b7b7e03becd12837a42414a90c6339

Changes:
- ci: deploy to amplify with version injection (7907c37)

## v0.3.0 - 2026-05-09

Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.3.0
Git Tag: v0.3.0
Commit SHA: ead9304e9af674b82d24bd1445ad579fd2e06c40

Changes:
- ci: use vX.Y.Z tags (ead9304)
- fix: align release and runtime version (9d307ad)
- chore(release): dev v0.2.0 [skip ci] (55419d5)
- ci: ensure ecr repo exists (5a76245)
- ci: use aws key secrets (345feb4)
- fix: align footer branding (b7057fe)
- ci: add release workflow (8bdca4e)
- refactor: split hooks api (437384a)
- feat: refactor app ui (32d6ef1)
- docs: reorganize docs (9f2454b)
- docs(readme): refresh intro (5bc4fc8)
- test: add regressions (bd54646)
- fix(types): align models (30a0351)
- fix(runtime): standalone start (f222216)
- docs(readme): keep minimal (918092f)
- docs(ops): add runbooks (73c948e)
- docs(app): add reference (3bf13cf)
- docs(core): add guides (498d0b2)
- docs: update guides (f49b6a1)
- test: expand coverage (c1b14e2)


Environment: dev
Docker Image: 929910138721.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-dev-v0.2.0
Git Tag: dev-v0.2.0
Commit SHA: 5a76245748c7937246fd33f5c6ddce05b75f05db

Changes:
- ci: ensure ecr repo exists (5a76245)
- ci: use aws key secrets (345feb4)
- fix: align footer branding (b7057fe)
- ci: add release workflow (8bdca4e)
- refactor: split hooks api (437384a)
- feat: refactor app ui (32d6ef1)
- docs: reorganize docs (9f2454b)
- docs(readme): refresh intro (5bc4fc8)
- test: add regressions (bd54646)
- fix(types): align models (30a0351)
- fix(runtime): standalone start (f222216)
- docs(readme): keep minimal (918092f)
- docs(ops): add runbooks (73c948e)
- docs(app): add reference (3bf13cf)
- docs(core): add guides (498d0b2)
- docs: update guides (f49b6a1)
- test: expand coverage (c1b14e2)
- refactor(core): tighten types (73edc1e)
- refactor(browse): update UI (f7ce605)
- refactor(dialog): streamline UI (c93bb1f)

All notable changes to the dev environment of EnternFlix.
Versions are independent from `prod`. See [CHANGELOG.prod.md](CHANGELOG.prod.md).
