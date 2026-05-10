# Changelog (dev)
## v0.2.0 - 2026-05-09
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
