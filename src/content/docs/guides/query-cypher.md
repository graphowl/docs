---
title: "Query with Cypher"
description: "Ask the graph pattern questions with a documented Cypher subset."
---

`POST /cypher` takes the same body as SPARQL: `{"query": "..."}`.

```bash
curl -X POST "$URL/cypher" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"query": "MATCH (n:MilkLot) RETURN n LIMIT 2"}'
```

```bash
-d '{"query": "MATCH (n:MilkLot) RETURN count(n) AS lots"}'
```

A label is a class of the workspace's ontology. Nodes come back as their identifiers.

## A subset, and an honest error

GraphOWL implements a **documented subset** of Cypher and makes no conformance claim to openCypher or ISO GQL. Something outside the subset is refused with a `400` that names the construct, rather than answered wrongly. For example, a function that is parsed but not yet supported returns:

```json
{"status": 400, "title": "Validation failed",
 "errors": [{"field": "query", "detail": "`a function call that is not a supported aggregate` is in the subset's grammar but has no lowering yet"}]}
```

When a pattern needs more than the subset offers, use [SPARQL](/docs/guides/query-sparql/).
