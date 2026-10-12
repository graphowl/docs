#!/usr/bin/env bash
# Refreshes data/mcp-tools.json from a running server. Use a scratch or demo server, never a customer's.
#   GRAPHOWL_URL=https://demo.graphowl.app GRAPHOWL_BASIC_AUTH=user:pass scripts/fetch-mcp-tools.sh
set -euo pipefail
curl -fsS ${GRAPHOWL_BASIC_AUTH:+-u "$GRAPHOWL_BASIC_AUTH"} ${GRAPHOWL_TOKEN:+-H "Authorization: Bearer $GRAPHOWL_TOKEN"} \
  -X POST "${GRAPHOWL_URL:?set GRAPHOWL_URL}/mcp" -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' > "$(dirname "$0")/../data/mcp-tools.json"
