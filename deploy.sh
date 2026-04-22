#!/usr/bin/env bash
# Manual deploy to gh-pages branch.
# Usage: ./deploy.sh
# Requires: git, pnpm, and a 'github' remote pointing to the repo.

set -euo pipefail

REMOTE=${REMOTE:-github}
BRANCH=gh-pages

echo "→ Building..."
pnpm build

echo "→ Deploying dist/ to $REMOTE/$BRANCH..."
cd dist

# Initialise a throw-away repo so we can force-push just the built files.
git init -q
git add -A
git commit -q -m "deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f "$(git -C .. remote get-url $REMOTE)" HEAD:$BRANCH

cd ..
echo "✓ Done — https://ccok12345678.github.io/bkk-laos-2026/"
