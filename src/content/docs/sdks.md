---
title: "Client libraries"
description: "Libraries for pushing data into GraphOWL and for reading, querying and governing it."
---

All three are Apache-2.0, early access and **not yet on PyPI or npm**: install from a checkout.

| Library | Use it to | Repository |
|---|---|---|
| `graphowl-ingest` (Python) | push entities and relationships in; no runtime dependencies | [graphowl/sdk-python](https://github.com/graphowl/sdk-python) |
| `@graphowl/ingest` (TypeScript) | the same, from Node or a worker | [graphowl/sdk-typescript](https://github.com/graphowl/sdk-typescript) |
| `graphowl` (Python) | read, query, reason, validate and govern | [graphowl/python-client](https://github.com/graphowl/python-client) |

For any other language, generate a client from the [OpenAPI description](https://github.com/graphowl/graphowl/blob/main/api/openapi.json) with any OpenAPI generator.

## Which one

- A script or scheduler job that **loads data**: `graphowl-ingest` or `@graphowl/ingest`. They batch, retry safely with idempotency keys, and report a verdict per item.
- An application or notebook that **asks questions**: `graphowl`.

## Example

```python
from graphowl import GraphOWL

owl = GraphOWL(url="https://your-graphowl-host", api_key="...")
owl.query.sparql("SELECT * WHERE { GRAPH ?g { ?s ?p ?o } } LIMIT 5")
```
