# Amplify Environment Configuration

## Overview

This project uses AWS Amplify for hosting with environment variables managed through the Amplify console and `amplify.yml`.

## Environment Variables

All environment variables are centrally defined and synced to Amplify using the setup script.

### Available Variables

| Variable                            | Dev Default                                            | Prod Default                                       | Purpose                              |
| ----------------------------------- | ------------------------------------------------------ | -------------------------------------------------- | ------------------------------------ |
| `NODE_ENV`                          | `development`                                          | `production`                                       | Node.js environment mode             |
| `PORT`                              | `3000`                                                 | `3000`                                             | Server port                          |
| `HOSTNAME`                          | `0.0.0.0`                                              | `0.0.0.0`                                          | Server hostname                      |
| `NEXT_PUBLIC_ENABLE_LOGGING`        | `true`                                                 | `false`                                            | Enable client-side logging           |
| `NEXT_PUBLIC_SITE_URL`              | `http://localhost:3000`                                | `https://your-domain.com`                          | Public site URL (SEO, OG, canonical) |
| `NEXT_PUBLIC_HTTP_TIMEOUT_MS`       | `10000`                                                | `10000`                                            | Axios request timeout                |
| `NEXT_PUBLIC_CUSTOM_API_URL`        | `http://localhost:8080/v1`                             | `https://api.yourdomain.com/v1`                    | Custom backend API URL               |
| `NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL` | `https://bi8s-storage-dev.s3.us-east-1.amazonaws.com/` | `https://your-cdn-bucket.s3.region.amazonaws.com/` | S3/CDN image base URL                |
| `NEXT_PUBLIC_IMAGE_HOSTS`           | ``                                                     | ``                                                 | Comma-separated allowed image hosts  |
| `NEXT_PUBLIC_APP_ENV`               | `dev`                                                  | `prod`                                             | Application environment label        |

## Setup Scripts

### Initial Setup

Set up environment variables in Amplify for all branches:

```bash
# Setup dev branch
./scripts/setup-amplify-env.sh dev

# Setup prod branch (if exists)
./scripts/setup-amplify-env.sh prod
```

### After Adding New Variables

1. Update the variable defaults in `scripts/setup-amplify-env.sh`
2. Update the `amplify.yml` with new defaults in the preBuild phase
3. Run the setup script for affected branches:
   ```bash
   ./scripts/setup-amplify-env.sh dev
   ./scripts/setup-amplify-env.sh prod
   ```

## How It Works

### `amplify.yml` Build Phase

The `amplify.yml` file controls the build process and handles environment variable defaults:

1. **preBuild**: Loads version from `.version.{dev,prod}` and sets environment-specific defaults
2. **build**: Runs `npm ci` and `npm run build`
3. **artifacts**: Outputs `.next` directory

Key features:

- Environment variables from Amplify console are available in the build
- Defaults are applied if variables are not set
- Different values for dev/prod based on `AMPLIFY_ENV`

### Managing Variables in Amplify

Variables are set via AWS CLI using the `setup-amplify-env.sh` script:

```bash
aws amplify update-branch \
  --app-id d3uphs6spds7z1 \
  --branch-name dev \
  --environment-variables '{"NODE_ENV":"development",...}'
```

## Deployment Workflow

1. **Local Development**: Uses `.env.local` and `.env.example`
2. **Amplify dev branch**: Uses variables set via `setup-amplify-env.sh dev`
3. **Amplify prod branch**: Uses variables set via `setup-amplify-env.sh prod` (requires prod branch to exist)
4. **Docker**: Environment variables can be passed to container

## Troubleshooting

### Variables not applied in Amplify build

1. Check that variables are set in the Amplify console:

   ```bash
   aws amplify list-branches --app-id d3uphs6spds7z1 --query 'branches[*].[branchName,environmentVariables]' --output json | jq '.'
   ```

2. Ensure `amplify.yml` exports variables in preBuild phase

3. Trigger a new build in Amplify console (Apps → EnternFlix → Deployments → Redeploy)

### Production values not being used

1. Verify prod branch exists: `aws amplify list-branches --app-id d3uphs6spds7z1`
2. Check `AMPLIFY_ENV` is set to `prod` for your prod branch
3. Run: `./scripts/setup-amplify-env.sh prod`

## Best Practices

- ✅ Keep `.env.local` in `.gitignore` (sensitive data)
- ✅ Keep `.env.example` in git (template)
- ✅ Use the setup script to sync Amplify variables (not manual console edits)
- ✅ Test environment-specific values locally with `NODE_ENV=production npm run build`
- ✅ Keep `amplify.yml` defaults in sync with script values

## References

- [Amplify Environment Variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
