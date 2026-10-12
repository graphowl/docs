---
title: "Query with SPARQL"
description: "Ask the graph questions with SPARQL over the HTTP API."
---

`POST /sparql` takes a JSON body and returns the variable bindings.

```bash
curl -X POST "$URL/sparql" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"query": "SELECT ?class (COUNT(?s) AS ?n) WHERE { GRAPH ?g { ?s a ?class } } GROUP BY ?class ORDER BY DESC(?n)"}'
```

The answer has `variables`, `rows`, and fields that say how the query ran (`factsScanned`, `truncated`, `plan`). A `truncated: true` means the answer was cut short by a limit: narrow the query.

## Named graphs

Imported facts live in **named graphs**, one per source or import. A pattern outside a `GRAPH` block reads only the default graph. If a query that should find data returns no rows, wrap the pattern:

```sparql
SELECT ?s ?p ?o WHERE { GRAPH ?g { ?s ?p ?o } } LIMIT 10
```

## Why POST

A query is a body, not a URL. The `GET` form would put queries (which often contain literal values from your data) into request logs and browser history.

## Reasoning

Queries can include what the reasoner derived; derived facts are marked as such in results of the graph and traversal routes. See [Concepts](/start/concepts/).

## Supported

SPARQL 1.1 query. Federated query is not claimed. See [Standards](/reference/standards/).
