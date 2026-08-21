#!/usr/bin/env bash
# Deploy delegationeconomy.fyi to Vercel.
#
# First run: it asks a few setup questions (scope, link to existing project).
# Every run after that: it just ships. This is the loop you'll use while
# editing copy, so it lives in the repo rather than in your memory.
#
#   ./deploy.sh          production deploy
#   ./deploy.sh preview  throwaway URL, safe to share, does not touch the domain

set -euo pipefail
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node isn't installed. Get it from https://nodejs.org (LTS), then run this again."
  exit 1
fi

# Fail early on a broken local reference rather than shipping a 404.
# The check itself lives in scripts/check-links.mjs so that CI, a git hook
# and this script all run the same implementation.
if ! node scripts/check-links.mjs; then
  echo "Not deploying."
  exit 1
fi

if grep -q "var FORM_ENDPOINT = '';" index.html 2>/dev/null; then
  echo "Note: the email form has no endpoint set, so it falls back to a mailto link."
  echo "      Set FORM_ENDPOINT in index.html when you want to capture addresses."
  echo
fi

# Vercel's own error for a signed-out CLI is just "Not authorized", which
# tells you nothing. Check first and say the actual fix.
if ! npx --yes vercel whoami >/dev/null 2>&1; then
  echo "You're not signed in to the Vercel CLI."
  echo
  echo "  Run:  npx vercel login"
  echo
  echo "Use the same method as vercel.com. It opens a browser tab."
  echo "Then run ./deploy.sh again."
  exit 1
fi

echo "Signed in as: $(npx --yes vercel whoami 2>/dev/null)"
echo

TARGET="${1:-production}"

if [ "$TARGET" = "preview" ]; then
  npx --yes vercel
else
  npx --yes vercel --prod
fi

cat <<'EOF'

Deployed. If the domain still isn't live, it needs attaching once:

  Vercel dashboard -> this project -> Settings -> Domains -> add delegationeconomy.fyi
  Then set the record it shows you at your .fyi registrar.

That's a one-time step. After it's done, ./deploy.sh is the whole workflow.
EOF
