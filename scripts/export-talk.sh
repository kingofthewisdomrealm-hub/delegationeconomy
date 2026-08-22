#!/bin/sh
# Copy only the talk files into .talk-out so Vercel cannot mistake this
# repo for the Vite/TanStack app that still lives beside the deck.
set -e
out=".talk-out"
rm -rf "$out"
mkdir -p "$out/demos" "$out/public"
cp index.html deck.css deck.js brief.html "$out/"
cp demos/* "$out/demos/"
if [ -d public ]; then
  cp public/* "$out/public/" 2>/dev/null || true
fi
if [ -f qr-delegationeconomy.svg ]; then
  cp qr-delegationeconomy.svg "$out/"
fi
echo "Talk export ready in $out"
ls -la "$out"
