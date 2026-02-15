#!/bin/bash
set -e

VERSION="${1:?Usage: bash scripts/deploy.sh <version> <tag> [title]}"
TAG="${2:-UPDATE}"
TITLE="${3:-Update}"

echo "============================================"
echo "  Clawd Bot Deploy v$VERSION [$TAG]"
echo "============================================"

# Step 1: Pre-deploy checks
echo ""
echo "Step 1: Running pre-deploy checks..."
node scripts/pre-deploy.js || { echo "Pre-deploy failed. Aborting."; exit 1; }

# Step 1.5: Codex Code Review (Debug Trifecta Layer 2)
CODEX_SCRIPT="$HOME/.openclaw/scripts/codex-review.sh"
if [ -f "$CODEX_SCRIPT" ]; then
  echo ""
  echo "Step 1.5: Running Codex code review..."
  bash "$CODEX_SCRIPT" "$(pwd)" || { echo "Codex review BLOCKED deploy. Fix issues first."; exit 1; }
fi

# Step 2: Deploy via PM2
echo ""
echo "Step 2: Deploying Clawd v$VERSION via PM2..."
pm2 restart clawd || pm2 start index.js --name clawd
pm2 save

# Step 3: Smoke tests
echo ""
echo "Step 3: Running smoke tests..."
sleep 3
node scripts/smoke-test.js || echo "WARNING: Smoke tests had issues"

# Step 4: QA Report
echo ""
echo "============================================"
echo "  QA Report — Clawd v$VERSION"
echo "============================================"
echo "  Tag:      $TAG"
echo "  Title:    $TITLE"
echo "  Date:     $(date '+%Y-%m-%d %H:%M:%S')"
echo "  Status:   Deployed"
echo "============================================"
echo ""
echo "Done: Clawd v$VERSION deployed successfully."
