#!/usr/bin/env bash
set -e

DEV_DIR="/home/ubuntu/israeli-whist-scorekeeper-dev"
if [ ! -d "$DEV_DIR" ]; then
  echo "Error: Dev directory $DEV_DIR does not exist."
  exit 1
fi

echo "🚀 Deploying to Dev Environment ($DEV_DIR)..."
cd "$DEV_DIR"
git fetch origin dev
git checkout dev
git pull origin dev
npm run build
sudo systemctl restart israeli-whist-dev.service
echo "✅ Dev environment restarted and live at https://i945.duckdns.org/whist-dev/"
