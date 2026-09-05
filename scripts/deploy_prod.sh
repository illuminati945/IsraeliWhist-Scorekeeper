#!/usr/bin/env bash
set -e

PROD_DIR="/home/ubuntu/israeli-whist-scorekeeper"
echo "🚀 Deploying to Prod Environment ($PROD_DIR)..."
cd "$PROD_DIR"
git checkout main
npm run build
sudo systemctl restart israeli-whist.service
echo "✅ Production environment restarted and live at https://i945.duckdns.org/whist/"
