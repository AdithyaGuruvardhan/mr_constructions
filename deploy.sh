#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="mrconstruction-vps"
REMOTE_PATH="/var/www/mrconstruction/"

cd "$(dirname "$0")"

echo "==> Pulling latest from git"
git pull

echo "==> Building"
npm run build

echo "==> Deploying to $REMOTE_HOST:$REMOTE_PATH"
rsync -avzc --delete --exclude='.DS_Store' dist/ "$REMOTE_HOST:$REMOTE_PATH"

echo "==> Verifying"
DEPLOYED_JS=$(curl -s https://mrconstruction.in/ | grep -o 'index-[A-Za-z0-9]*\.js' || true)
LOCAL_JS=$(basename dist/assets/index-*.js)

if [ "$DEPLOYED_JS" = "$LOCAL_JS" ]; then
  echo "Deployed successfully: $DEPLOYED_JS"
else
  echo "WARNING: deployed asset ($DEPLOYED_JS) does not match local build ($LOCAL_JS)"
  exit 1
fi

echo "==> Live at https://mrconstruction.in"
