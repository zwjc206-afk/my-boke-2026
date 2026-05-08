#!/bin/zsh
set -e

REPO_URL="$1"

if [ -z "$REPO_URL" ]; then
  echo 'Usage: scripts/publish-to-github.sh "https://github.com/USER/REPO.git"'
  exit 1
fi

git branch -M main

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

git push -u origin main

echo ""
echo "Pushed to GitHub."
echo "If the repository is USER.github.io, the live site will be:"
echo "https://USER.github.io/"
echo ""
echo "If the repository is a project repository, the live site will usually be:"
echo "https://USER.github.io/REPO/"
