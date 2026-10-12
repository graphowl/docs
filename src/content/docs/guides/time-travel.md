---
title: "Time travel"
description: "Ask a question as the graph stood at an earlier moment."
---

Add `asOf` (an RFC 3339 timestamp) to a SPARQL or Cypher request:

```bash
curl -X POST "$URL/sparql" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"query": "SELECT (COUNT(*) AS ?n) WHERE { GRAPH ?g { ?s ?p ?o } }", "asOf": "2026-10-12T15:50:00Z"}'
```

On the demo this returned 105 facts at 15:50, shortly after the load began, and 2,391 once it finished. The response's `asOf` field is the transaction the timestamp resolved to.

Because facts are retracted rather than deleted, the earlier answer is exactly what the graph would have said then.

:::caution[Known issue]
A timestamp **earlier than the first transaction** currently returns the present state instead of an empty answer, and the response's `asOf` is `null`. Use a timestamp inside the history. This is tracked as a bug.
:::
