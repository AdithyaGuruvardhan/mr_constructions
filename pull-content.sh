#!/usr/bin/env bash
# Copies the live content (text, projects, certificates) and uploaded images
# from the VPS to this machine, so local development matches the live site.
# Read-only on the server. Your local content is backed up first.
set -euo pipefail

REMOTE_HOST="mrconstruction-vps"
REMOTE_DIR="/var/www/mrconstruction-api"

cd "$(dirname "$0")"

if [ -f server/data/content.json ]; then
  mkdir -p server/data/backups
  cp server/data/content.json "server/data/backups/content-before-pull-$(date +%Y%m%d-%H%M%S).json"
fi

echo "==> Downloading live content"
mkdir -p server/data
rsync -avz "$REMOTE_HOST:$REMOTE_DIR/data/content.json" server/data/content.json

echo "==> Downloading uploaded images"
mkdir -p server/uploads
rsync -avz "$REMOTE_HOST:$REMOTE_DIR/uploads/" server/uploads/

echo "Done. Restart 'npm run server' if it's running, then reload the site."
