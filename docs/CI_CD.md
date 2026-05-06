# CI/CD & Release Engineering

End-to-end pipeline for **EnternFlix**: lint → typecheck → test → audit → Next.js
build → multi-arch Docker build → push to ECR → bump version → update changelog
→ create git tag and GitHub release → deploy.

Workflow file: [.github/workflows/ci-cd.yml](../.github/workflows/ci-cd.yml)
Bump script: [scripts/version-bump.mjs](../scripts/version-bump.mjs)

---

## 1. Branch → environment mapping

| Branch | Environment | Version file    | Changelog                                 | Git tag prefix |
| ------ | ----------- | --------------- | ----------------------------------------- | -------------- |
| `dev`  | dev         | `.version.dev`  | [CHANGELOG.dev.md](../CHANGELOG.dev.md)   | `dev-vX.Y.Z`   |
| `prod` | prod        | `.version.prod` | [CHANGELOG.prod.md](../CHANGELOG.prod.md) | `prod-vX.Y.Z`  |

Other branches are explicitly **rejected** by the `setup` job — the pipeline
will fail fast with a clear error. Pull requests targeting `dev` / `prod` run
all quality gates and the build, but **do not** push images, bump versions,
tag, or release.

Dev and prod versions are fully **independent** — bumping one never touches the
other.

---

## 2. Semantic versioning rules

The bump script ([scripts/version-bump.mjs](../scripts/version-bump.mjs))
inspects commit subjects since the last `${env}-v*` tag and chooses the highest
applicable bump.

| Commit subject pattern                            | Bump  | Result            |
| ------------------------------------------------- | ----- | ----------------- |
| `major:` prefix or `!` after type (e.g. `feat!:`) | major | `X.Y.Z → X+1.0.0` |
| `feat:` / `feature:`                              | minor | `X.Y.Z → X.Y+1.0` |
| `fix:` / `patch:` / `chore:` / `docs:`            | patch | `X.Y.Z → X.Y.Z+1` |
| anything else                                     | patch | `X.Y.Z → X.Y.Z+1` |

Manual override via `workflow_dispatch`:

```bash
gh workflow run ci-cd.yml --ref dev -f bump=minor
```

Local dry-run:

```bash
npm run version:bump -- --env dev --bump auto --messages "$(git log --pretty=%s -n 20)"
# next=0.2.0 bump=minor prev=0.1.0
```

Add `--write` to update the `.version.<env>` file (CI does this automatically
in the `release` job).

---

## 3. Docker image naming

Pushed to ECR repository `${ECR_REGISTRY}/${ECR_REPOSITORY}`:

| Tag                        | Purpose                                      |
| -------------------------- | -------------------------------------------- |
| `efx-image-<env>-v<X.Y.Z>` | Immutable, version-pinned. Use for rollback. |
| `efx-image-<env>-latest`   | Mutable pointer to the latest `<env>` build. |

Both tags point at the **same** multi-arch image (`linux/amd64`,
`linux/arm64`). The pipeline asserts the version-pinned tag matches the
computed app version before considering the build successful.

The full image reference becomes:

```
${ECR_REGISTRY}/${ECR_REPOSITORY}:efx-image-dev-v0.2.0
${ECR_REGISTRY}/${ECR_REPOSITORY}:efx-image-prod-v1.4.2
```

> AWS account ID, region, and repository name are **never** hardcoded — they
> come from the GitHub repository variables `AWS_REGION`, `ECR_REPOSITORY`,
> `ECR_REGISTRY`, and the OIDC role in the secret `AWS_ROLE_ARN`.

---

## 4. Pipeline stages

```
push (dev|prod)
        │
        ▼
┌──────────────┐
│  setup       │  detect branch → env, compute next version
└──────┬───────┘
       │
       ├──► lint ─┐
       ├──► format│
       ├──► typecheck
       ├──► test (Vitest, 217 tests)
       └──► audit (continue-on-error)
                  │
                  ▼
            ┌──────────┐
            │  build   │  Next.js standalone (NEXT_PUBLIC_APP_VERSION injected)
            └────┬─────┘
                 ▼
            ┌──────────┐
            │  docker  │  Buildx + QEMU → ECR (push only on dev/prod push)
            └────┬─────┘
                 ▼
            ┌──────────┐
            │ release  │  bump .version.<env>, update CHANGELOG.<env>.md,
            │          │  commit [skip ci], git tag, GitHub release
            └────┬─────┘
                 ▼
            ┌──────────┐
            │ deploy   │  GitHub Environment hook (wire your platform here)
            └──────────┘
```

> **Integration & E2E suites are not configured** in this repo. Add a
> Playwright (or similar) job before relying on it. The `test` job runs only
> Vitest unit tests today.

---

## 5. Required GitHub configuration

### Repository variables (Settings → Secrets and variables → Actions → Variables)

| Variable                                  | Required | Purpose                                 |
| ----------------------------------------- | -------- | --------------------------------------- |
| `AWS_REGION`                              | yes      | e.g. `us-east-1`                        |
| `ECR_REPOSITORY`                          | yes      | e.g. `enternflix`                       |
| `ECR_REGISTRY`                            | yes      | `<acct>.dkr.ecr.<region>.amazonaws.com` |
| `BUILD_NEXT_PUBLIC_CUSTOM_API_URL`        | yes      | API origin baked into the build         |
| `BUILD_NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL` | yes      | CDN origin baked into the build         |
| `BUILD_NEXT_PUBLIC_SITE_URL`              | yes      | Public site URL                         |
| `BUILD_NEXT_PUBLIC_IMAGE_HOSTS`           | no       | Extra `next/image` hostnames            |

### Repository secrets

| Secret         | Required | Purpose                                   |
| -------------- | -------- | ----------------------------------------- |
| `AWS_ROLE_ARN` | yes      | OIDC role assumed for ECR push            |
| `GITHUB_TOKEN` | auto     | Used for tag, release, and version commit |

### CI-injected build args (do **not** set manually)

| Variable                  | Source                               | Surfaced as                          |
| ------------------------- | ------------------------------------ | ------------------------------------ |
| `NEXT_PUBLIC_APP_VERSION` | `setup` job (`v` + `.version.<env>`) | Footer "Version: vX.Y.Z"             |
| `NEXT_PUBLIC_APP_ENV`     | `setup` job (`dev` / `prod`)         | Available via `config.app.deployEnv` |

---

## 6. Release format

Each release commit appends an entry to `CHANGELOG.<env>.md`:

```
## v1.4.2 - 2025-04-08

Environment: prod
Docker Image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/enternflix:efx-image-prod-v1.4.2
Git Tag: prod-v1.4.2
Commit SHA: 0123456789abcdef...

Changes:
- feat: add watch history (a1b2c3d)
- fix: resolve subtitle desync (d4e5f6a)
```

The corresponding GitHub release uses the title `PROD Release v1.4.2` (or
`DEV Release vX.Y.Z`, marked **prerelease**).

---

## 7. Version display in the UI

The footer renders:

```
Version: vX.Y.Z
```

Sourced from `config.app.version` in [src/lib/env/env.ts](../src/lib/env/env.ts),
populated by `NEXT_PUBLIC_APP_VERSION` injected at build time. The component
itself contains **no hardcoded version**. When the variable is empty (local
development) the footer falls back to `v0.0.0-local`.

See [src/components/Footer/Footer.tsx](../src/components/Footer/Footer.tsx).

---

## 8. Rollback

To roll back to a previous version (image-only):

```bash
# 1. Pull and re-tag the previous immutable image as -latest:
docker pull "${ECR_REGISTRY}/${ECR_REPOSITORY}:efx-image-prod-v1.4.1"
docker tag  "${ECR_REGISTRY}/${ECR_REPOSITORY}:efx-image-prod-v1.4.1" \
            "${ECR_REGISTRY}/${ECR_REPOSITORY}:efx-image-prod-latest"
docker push "${ECR_REGISTRY}/${ECR_REPOSITORY}:efx-image-prod-latest"

# 2. Trigger a redeploy on your platform (force new ECS task / restart
#    Container App / etc.).
```

To also roll back the source-of-truth version (so the next bump starts from
the previous version):

```bash
git revert <release-commit-sha>      # reverts .version.<env> + changelog entry
git push origin prod
```

The next pipeline run on that branch will compute the next version from the
restored `.version.<env>` baseline.

---

## 9. Failure modes (intentional)

The pipeline fails fast — by design — when:

- The triggering branch is anything other than `dev` or `prod`.
- The computed version does not match `^\d+\.\d+\.\d+$`.
- The Docker tag does not contain the computed version (sanity gate).
- A required GitHub variable / secret is missing (`AWS_ROLE_ARN`,
  `AWS_REGION`, `ECR_REPOSITORY`, `ECR_REGISTRY`,
  `BUILD_NEXT_PUBLIC_CUSTOM_API_URL`, `BUILD_NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL`).
- Lint, format, typecheck, unit tests, or `next build` fail.

`audit:ci` is `continue-on-error: true` — vulnerabilities surface in the run
summary but do not block a release.
