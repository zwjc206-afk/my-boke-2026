#!/bin/zsh
cd "$(dirname "$0")"
NODE_BIN="$(command -v node)"
if [ -z "$NODE_BIN" ] && [ -x "/Applications/Codex.app/Contents/Resources/node" ]; then
  NODE_BIN="/Applications/Codex.app/Contents/Resources/node"
fi
if [ -z "$NODE_BIN" ]; then
  echo "Node.js was not found."
  exit 1
fi
"$NODE_BIN" scripts/update-ai-news.mjs
