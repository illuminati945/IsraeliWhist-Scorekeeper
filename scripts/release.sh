#!/usr/bin/env bash
set -e

VERSION=$1
if [ -z "$VERSION" ]; then
  echo "Usage: ./scripts/release.sh <version> (e.g. 1.0.0)"
  exit 1
fi

REPO="illuminati945/IsraeliWhist-Scorekeeper"
TAG="v$VERSION"
GITHUB_TOKEN="${GITHUB_TOKEN:-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}"

echo "=========================================="
echo "🚀 Creating Release $TAG for $REPO"
echo "=========================================="

# 1. Ensure tests pass
echo "🧪 Running test suite..."
npm test

# 2. Update version in package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = '$VERSION';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# 3. Update version and release info in IsraeliWhist manifests
node -e "
const fs = require('fs');
const nowIso = new Date().toISOString();
for (const file of ['IsraeliWhist.json']) {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (data.apps && data.apps[0]) {
      const app = data.apps[0];
      app.version = '$VERSION';
      app.versionDate = nowIso;
      app.downloadURL = 'https://github.com/$REPO/releases/download/$TAG/IsraeliWhist-$TAG.ipa';
      if (app.versions && app.versions[0]) {
        app.versions[0].version = '$VERSION';
        app.versions[0].date = nowIso;
        app.versions[0].downloadURL = app.downloadURL;
      }
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
    console.log('✓ Updated ' + file);
  }
}
"

# 4. Rebuild production bundle
npm run build

# 5. Commit and tag on main
git checkout main
git add .
git diff-index --quiet HEAD || git commit -m "release: $TAG [skip ci]"

# Delete existing local tag if re-releasing
if git rev-parse "$TAG" >/dev/null 2>&1; then
  git tag -d "$TAG"
fi
git tag -a "$TAG" -m "Release $TAG"

# 6. Push main and tags to origin
echo "📤 Pushing main and $TAG to GitHub..."
git push origin main
git push origin "$TAG" --force

# 7. Create GitHub Release via REST API
echo "📦 Publishing GitHub Release $TAG..."
RELEASE_NOTES="## 🃏 Israeli Whist Scorekeeper Release
- 🎯 **Exact Bidding Score Engine**: Instant calculation of $+10 + \text{Bid}^2$ for contracts, penalties, and Zero rules.
- 🎴 **Dealer Hook Rule**: Real-time enforcement preventing round bid sums of 13 ($\sum B \neq 13$).
- ⚡ **Multiplayer WebSocket Sync**: Real-time room synchronization with link sharing and anti-regression guards.
- ✏️ **History & Baseline**: Dynamic deal history editing with cumulative score cascade and arbitrary starting baselines.
- 🌐 **Bilingual (עברית & English)**: Full Hebrew RTL support with left-side math signs and English localization.
- ⚡ **Ultra-Fast Instant Loading**: Single-file bundled assets (~30 KB gzipped) with pre-gzipped in-memory caching."

JSON_PAYLOAD=$(node -e "
const notes = process.argv[1];
console.log(JSON.stringify({
  tag_name: '$TAG',
  target_commitish: 'main',
  name: 'Israeli Whist Scorekeeper $TAG',
  body: notes,
  draft: false,
  prerelease: false
}));
" "$RELEASE_NOTES")

# Check if release exists on GitHub
RELEASE_CHECK=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/repos/$REPO/releases/tags/$TAG")
RELEASE_ID=$(echo "$RELEASE_CHECK" | node -e "
let stdin = '';
process.stdin.on('data', d => stdin += d);
process.stdin.on('end', () => {
  try {
    const json = JSON.parse(stdin);
    console.log(json.id || '');
  } catch(e) {
    console.log('');
  }
});
")

if [ -n "$RELEASE_ID" ] && [ "$RELEASE_ID" != "undefined" ]; then
  echo "Release $TAG already exists (ID: $RELEASE_ID). Updating release..."
  curl -s -X PATCH \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$REPO/releases/$RELEASE_ID" \
    -d "$JSON_PAYLOAD" >/dev/null
else
  echo "Creating new GitHub Release $TAG..."
  curl -s -X POST \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$REPO/releases" \
    -d "$JSON_PAYLOAD" >/dev/null
fi

# 8. Sync dev branch with main
if git rev-parse --verify dev >/dev/null 2>&1; then
  echo "🌿 Syncing dev branch with main..."
  git checkout dev
  git merge main -m "merge: release $TAG into dev"
  git push origin dev
  git checkout main
fi

echo "=========================================="
echo "✅ Successfully released $TAG to GitHub!"
echo "🔗 https://github.com/$REPO/releases/tag/$TAG"
echo "=========================================="
