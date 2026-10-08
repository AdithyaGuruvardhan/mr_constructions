#!/usr/bin/env bash
# Deploys the admin API (server/) to the VPS and restarts it under pm2.
# Never touches the server's .env, live content (data/) or uploaded images (uploads/).
set -euo pipefail

REMOTE_HOST="mrconstruction-vps"
REMOTE_DIR="/var/www/mrconstruction-api"
PM2_NAME="mrconstruction-api"

cd "$(dirname "$0")"

echo "==> Copying API code"
ssh "$REMOTE_HOST" "mkdir -p $REMOTE_DIR"
rsync -avzc \
  --exclude='.env' --exclude='data/' --exclude='uploads/' --exclude='node_modules/' \
  --exclude='seed.js' --exclude='.DS_Store' \
  server/ "$REMOTE_HOST:$REMOTE_DIR/"

echo "==> Installing dependencies and restarting"
ssh "$REMOTE_HOST" "
  set -e
  cd $REMOTE_DIR
  npm install --omit=dev --no-audit --no-fund
  if [ ! -f .env ] || [ ! -f data/content.json ]; then
    echo 'First-time setup still needed (.env and data/content.json). See server/README.md.'
    exit 1
  fi
  pm2 restart $PM2_NAME --update-env 2>/dev/null || pm2 start index.js --name $PM2_NAME
  pm2 save
"

echo "==> Verifying"
sleep 2
STATUS=$(curl -s -o /dev/null -w '%{http_code}' https://mrconstruction.in/api/content)
if [ "$STATUS" = "200" ]; then
  echo "API is live: https://mrconstruction.in/api/content"
else
  echo "WARNING: https://mrconstruction.in/api/content returned $STATUS"
  exit 1
fi
