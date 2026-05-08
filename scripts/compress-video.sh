#!/bin/zsh
set -e

if [ "$#" -lt 2 ]; then
  echo 'Usage: scripts/compress-video.sh "/path/to/source.mp4" "public/assets/videos/compressed/output.m4v"'
  exit 1
fi

SOURCE="$1"
OUTPUT="$2"
mkdir -p "$(dirname "$OUTPUT")"
avconvert --source "$SOURCE" --preset PresetAppleM4V720pHD --output "$OUTPUT" --replace --disableMetadataFilter --progress
