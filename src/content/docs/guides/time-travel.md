---
title: "Time travel"
description: "Ask a question as the graph stood at an earlier moment."
---

![Every fact keeps its history](/brand/time-travel.svg)

Add `asOf` (an RFC 3339 timestamp) to a SPARQL or openCypher request:

```bash
curl -X POST "$URL/sparql" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"query": "SELECT (COUNT(*) AS ?n) WHERE { GRAPH ?g { ?s ?p ?o } }", "asOf": "2026-10-12T15:50:00Z"}'
```

On the demo this returned 105 facts at 15:50, shortly after the load began, and 2,391 once it finished. The response's `asOf` field is the **transaction** the timestamp resolved to (173 for that query).

Because facts are retracted rather than deleted, the earlier answer is exactly what the graph would have said then.

## How a timestamp resolves

A timestamp resolves to the **newest transaction at or before it**. Everything recorded in that transaction or earlier is visible; nothing later is.

## Before the first transaction

An instant earlier than the graph's first transaction describes an **empty graph**, and the response reports `asOf: 0`. (Builds before this fix returned the present state for such an instant. If a server still does, it is running an older build: upgrade.)

## What time travel covers

- `POST /sparql` and `POST /cypher` take `asOf` in the body.
- Graph traversal (the neighbourhood of an asset) takes `asOf` as a query parameter.
- A single asset can be read as it stood at a moment.

## What it does not do

It reads history; it does not rewrite it. There is no route that changes a past state.
