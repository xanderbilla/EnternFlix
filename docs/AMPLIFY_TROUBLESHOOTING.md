# Amplify Build Troubleshooting Guide

## Current Status

The Amplify build has been failing consistently (jobs 22-29). The issue appears to be in the build phase, not in the configuration.

## What We've Fixed

1. ✅ Created `.env.production` file with all required environment variables
2. ✅ Updated `amplify.yml` with:
   - Minimal, straightforward build commands
   - npm cache cleaning for reliability
   - Better error handling
3. ✅ Set up all environment variables in Amplify console via `setup-amplify-env.sh`
4. ✅ Verified build works locally with `npm install --legacy-peer-deps && npm run build`

## How to Debug

### 1. Check Amplify Build Logs (AWS Console)

```bash
# Get the latest job ID
aws amplify list-jobs --app-id d3uphs6spds7z1 --branch-name dev --max-results 1

# The logUrl is available in the job details, viewable in AWS console at:
# https://console.aws.amazon.com/amplify/apps/d3uphs6spds7z1/deployments
```

### 2. Verify Local Build

```bash
# At repo root:
npm install --legacy-peer-deps
npm run build
```

Both should succeed without errors.

### 3. Check Environment Variables in Amplify

```bash
aws amplify list-branches --app-id d3uphs6spds7z1 --query 'branches[*].[branchName,environmentVariables]' --output json | jq '.'
```

Should show all 10 variables set.

## Potential Issues & Fixes

### Issue: "npm ERR! code ERR_MODULE_NOT_FOUND"

**Cause**: Peer dependency conflicts  
**Fix**: Already using `--legacy-peer-deps` flag

### Issue: "Cannot find module 'next'"

**Cause**: node_modules not properly cached  
**Fix**: Try manual redeploy from Amplify console → Deployments → Redeploy

### Issue: "env variables undefined"

**Cause**: Environment variables not passed to build  
**Fix**: Verify `aws amplify list-branches` shows env vars, then redeploy

## Alternative: Manual Deploy to Amplify

If the automated build continues to fail:

```bash
# Build locally
npm install --legacy-peer-deps
npm run build

# Deploy directly to Amplify
amplify deploy --frontend

# Or build a Docker image and push to ECR, then deploy via CodeDeploy
docker build -t enternflix:latest .
```

## Environment Variables Set in Amplify

```
NODE_ENV=development
NEXT_PUBLIC_ENABLE_LOGGING=true
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CUSTOM_API_URL=http://localhost:8080/v1
NEXT_PUBLIC_HTTP_TIMEOUT_MS=10000
NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL=https://bi8s-storage-dev.s3.us-east-1.amazonaws.com/
NEXT_PUBLIC_APP_ENV=dev
PORT=3000
HOSTNAME=0.0.0.0
```

## Files Modified

- `amplify.yml` - Build configuration
- `.env.production` - Production env variables (Next.js auto-loads during build)
- `.env.local` - Development env variables (gitignored)
- `scripts/setup-amplify-env.sh` - Amplify environment setup script

## Next Steps

1. **Check Amplify logs** in AWS console for the actual error message
2. **Try Redeploy** from Amplify console (may resolve cache issues)
3. **Contact AWS Support** if build continues to fail despite these fixes
4. **Use Docker** for local testing and manual deployment if Amplify build remains broken

## Helpful Commands

```bash
# Check current git status
git status

# View amplify build config
cat amplify.yml

# View production env
cat .env.production

# Test build locally
NODE_ENV=production npm run build

# Verify all variables are exported
node -e "console.log(process.env.NEXT_PUBLIC_SITE_URL)"
```

