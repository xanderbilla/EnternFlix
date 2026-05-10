#!/bin/bash
# Setup Amplify environment variables for EnternFlix
# Usage: ./scripts/setup-amplify-env.sh [dev|prod]

set -e

# Configuration
APP_ID="d3uphs6spds7z1"
BRANCH="${1:-dev}"

# Verify branch
if [ "$BRANCH" != "dev" ] && [ "$BRANCH" != "prod" ]; then
  echo "Error: Branch must be 'dev' or 'prod'"
  exit 1
fi

echo "  Setting up Amplify environment for branch: $BRANCH"
echo "App ID: $APP_ID"

# Create environment variables JSON based on branch
if [ "$BRANCH" = "prod" ]; then
  # Production environment
  ENV_JSON='{"NODE_ENV":"production","PORT":"3000","HOSTNAME":"0.0.0.0","NEXT_PUBLIC_ENABLE_LOGGING":"false","NEXT_PUBLIC_SITE_URL":"https://your-domain.com","NEXT_PUBLIC_HTTP_TIMEOUT_MS":"10000","NEXT_PUBLIC_CUSTOM_API_URL":"https://api.yourdomain.com/v1","NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL":"https://your-cdn-bucket.s3.region.amazonaws.com/","NEXT_PUBLIC_IMAGE_HOSTS":"","NEXT_PUBLIC_APP_ENV":"prod"}'
else
  # Development environment
  ENV_JSON='{"NODE_ENV":"development","PORT":"3000","HOSTNAME":"0.0.0.0","NEXT_PUBLIC_ENABLE_LOGGING":"true","NEXT_PUBLIC_SITE_URL":"http://localhost:3000","NEXT_PUBLIC_HTTP_TIMEOUT_MS":"10000","NEXT_PUBLIC_CUSTOM_API_URL":"http://localhost:8080/v1","NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL":"https://bi8s-storage-dev.s3.us-east-1.amazonaws.com/","NEXT_PUBLIC_IMAGE_HOSTS":"","NEXT_PUBLIC_APP_ENV":"dev"}'
fi

echo ""
echo "  Updating Amplify environment variables..."

# Update the branch with environment variables
aws amplify update-branch \
  --app-id "$APP_ID" \
  --branch-name "$BRANCH" \
  --environment-variables "$ENV_JSON" \
  --output json > /dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "Successfully updated Amplify environment variables for branch: $BRANCH"
  echo ""
  if [ "$BRANCH" = "prod" ]; then
    echo "   Production Variables:"
    echo "   NODE_ENV=production"
    echo "   NEXT_PUBLIC_ENABLE_LOGGING=false"
    echo "   NEXT_PUBLIC_SITE_URL=https://your-domain.com"
    echo "   NEXT_PUBLIC_CUSTOM_API_URL=https://api.yourdomain.com/v1"
    echo "   NEXT_PUBLIC_APP_ENV=prod"
  else
    echo "  Development Variables:"
    echo "   NODE_ENV=development"
    echo "   NEXT_PUBLIC_ENABLE_LOGGING=true"
    echo "   NEXT_PUBLIC_SITE_URL=http://localhost:3000"
    echo "   NEXT_PUBLIC_CUSTOM_API_URL=http://localhost:8080/v1"
    echo "   NEXT_PUBLIC_APP_ENV=dev"
  fi
  echo "   PORT=3000"
  echo "   HOSTNAME=0.0.0.0"
  echo "   NEXT_PUBLIC_HTTP_TIMEOUT_MS=10000"
  echo "   NEXT_PUBLIC_CUSTOM_IMAGE_BASE_URL=(see above)"
  echo "   NEXT_PUBLIC_IMAGE_HOSTS=(empty)"
else
  echo "  Failed to update Amplify environment variables"
  exit 1
fi

echo ""
echo "  Setup complete! Your Amplify app will use these environment variables on the next deploy."
