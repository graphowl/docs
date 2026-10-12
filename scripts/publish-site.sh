#!/usr/bin/env bash
# Builds the docs, checks links, and publishes them to https://docs.graphowl.app (GitHub Pages, branch gh-pages).
# GitHub Actions is unavailable, so the built output is pushed from here.
#   GH_TOKEN=<token with repo access> scripts/publish-site.sh
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/generate-reference.py
npm run build
python3 scripts/check-links.py
TMP="$(mktemp -d)"
git worktree prune
if git show-ref --quiet refs/heads/gh-pages; then git worktree add "$TMP" gh-pages; else git worktree add --orphan -b gh-pages "$TMP"; fi
find "$TMP" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R dist/. "$TMP/"
(cd "$TMP" && git add -A && git -c user.name=GraphOWL -c user.email=connect@graphowl.app commit -qm "Publish docs" --allow-empty && git push -q origin gh-pages)
git worktree remove --force "$TMP"
echo "published to gh-pages"
