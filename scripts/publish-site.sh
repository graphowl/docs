#!/usr/bin/env bash
# Builds the docs, checks links, and publishes them under graphowl.app/docs.
# GitHub Actions is unavailable, so the built output is copied into the site repository and pushed from here.
#   scripts/publish-site.sh [path-to-graphowl-site-checkout]
set -euo pipefail
cd "$(dirname "$0")/.."
SITE="${1:-../graphowl-site}"
python3 scripts/generate-reference.py
npm run build
python3 scripts/check-links.py
rm -rf "$SITE/docs"
cp -R dist "$SITE/docs"
echo "built into $SITE/docs; review, commit and push that repository"
