#!/usr/bin/env bash
# Start MyPavitra storefront — use Node 22 (Next.js hangs on Node 26)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Prefer Homebrew Node 22
if [ -d "/opt/homebrew/opt/node@22/bin" ]; then
  export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
elif [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck source=/dev/null
  source "$HOME/.nvm/nvm.sh"
  nvm use 22 2>/dev/null || nvm install 22
fi

NODE_MAJOR="$(node -v | sed 's/v//' | cut -d. -f1)"
if [ "$NODE_MAJOR" -gt 22 ] 2>/dev/null; then
  echo "⚠️  Node $(node -v) detected. Next.js needs Node 20–22."
  echo "   Install: brew install node@22"
  echo "   Then: export PATH=\"/opt/homebrew/opt/node@22/bin:\$PATH\""
  exit 1
fi

# Warn if disk is tight
AVAIL_KB=$(df -k "$ROOT" | awk 'NR==2 {print $4}')
if [ "$AVAIL_KB" -lt 5242880 ] 2>/dev/null; then
  echo "⚠️  Low disk space (<5GB free). Next.js may hang. Free space before starting."
fi

# Warn if project is on iCloud Desktop
if [[ "$ROOT" == *"/Desktop/"* ]]; then
  echo "⚠️  Project is on Desktop (often iCloud-synced). Next.js may hang at 'Starting...'."
  echo "   Move to ~/dev/mypavitra for reliable dev: mv \"$ROOT\" ~/dev/mypavitra"
fi

export NEXT_TELEMETRY_DISABLED=1
export WATCHPACK_POLLING=true

echo "Node $(node -v) · Starting storefront at http://127.0.0.1:3000"
pnpm --filter @puja/web dev
