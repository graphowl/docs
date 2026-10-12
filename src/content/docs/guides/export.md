---
title: "Export your data"
description: "Get your facts out in standard formats."
---

Your data is not locked in. Facts export in W3C formats and as property-graph files.

| Route | Formats |
|---|---|
| `GET /graph/export/rdf` | Turtle (default), JSON-LD, N-Triples, N-Quads |
| `GET /graph/export/jsonl` | JSON Lines |
| `GET /graph/export/json-graph` | JSON Graph |
| `GET /graph/export/graphml` | GraphML |
| `GET /graph/export/cypher` | openCypher statements |
| `GET /graph/export/bulk-csv` | CSV bulk-import files |
| `GET /graph/export/preview` | what an export would contain, without writing it |

```bash
curl "$URL/graph/export/rdf?format=turtle" -H "Authorization: Bearer $TOKEN" -H "x-graphowl-workspace: dairy-coop"
```

## Look before you export

`/graph/export/preview` returns the node and edge counts and a **`lossy`** list: what the target format cannot carry. A property-graph format cannot hold named graphs, so an RDF-to-property-graph export reports a `namedGraphCollapse` with examples. Read it before relying on the file.

## Import

`POST /graph/import/rdf` takes Turtle, N-Triples or JSON-LD. RDF/XML and TriG are not offered through the API; see [Standards](/reference/standards/).

## Whole-instance backup

For a full backup, use PostgreSQL's own tools. See [Backup and restore](/operators/backup-restore/).
