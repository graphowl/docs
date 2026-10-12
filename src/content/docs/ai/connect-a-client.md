---
title: "Connect a client"
description: "Talk to the GraphOWL MCP server from a client or a script."
---

The endpoint is `POST {URL}/mcp`, JSON-RPC 2.0 over HTTP. Use the same credentials as the API.

## Check by hand

```bash
curl -X POST "$URL/mcp" -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" -H "Authorization: Bearer $TOKEN" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"check","version":"0"}}}'
```

A working server answers with its capabilities (tools and resources) and its protocol version. Then list the tools:

```bash
-d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'
```

## From an assistant

Any client that supports remote MCP servers over HTTP can use the endpoint: give it the URL and the credential its configuration asks for. Client configuration formats differ and change often, so follow your client's own documentation for adding a remote server.

On the demo, the web gate asks for a username and password in addition; a client that cannot send those cannot reach the demo's MCP endpoint. Run your own instance for that case (see [Run it yourself](/operators/deploy/)).

## What to try first

1. `list_workspaces`, to see what the session can reach.
2. `search_assets` with a word from your domain.
3. `get_asset_context` on what it finds.
4. `traverse` from that asset to see what connects to it.
