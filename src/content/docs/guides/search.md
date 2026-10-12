---
title: "Search"
description: "Find assets, terms and graph subjects by keyword or by meaning."
---

Three routes, three jobs.

| Route | Searches | Use it for |
|---|---|---|
| `GET /search?q=` | assets, glossary terms and business metrics, together | a search box: "find anything called lot" |
| `GET /search/nodes` | graph subjects, by meaning (semantic) | "things like this", scoped to the workspace |
| `GET /search/nodes/similar` | subjects most like a given one | recommendations, duplicates, neighbours in meaning |

## Keyword search

```bash
curl "$URL/search?q=lot" -H "Authorization: Bearer $TOKEN" -H "x-graphowl-workspace: dairy-coop"
```

Each result has a `kind`, an `id`, a `label`, and for assets the fully qualified name and asset kind:

```json
{"kind": "asset", "id": "fa6f3d62-…", "label": "lot_id",
 "fqn": "dairy-coop-db.dairy_coop.dairy.batch_lot.lot_id", "assetKind": "column"}
```

## Semantic search

Semantic search needs an embedding model configured on the server (`EMBEDDING_API_BASE_URL`, `EMBEDDING_API_KEY` and `EMBEDDING_MODEL`; see [Configuration](/operators/configuration/)). Embeddings are refreshed in the background, every 300 seconds by default.

`GET /search/nodes/embedding` shows what is stored about one node's embedding, which is the first thing to check when a node does not turn up.

## From an agent

The MCP tools `search_assets`, `search_nodes` and `similar_nodes` do the same, scoped to the session's workspace. See the [tool reference](/ai/mcp-tools/).
