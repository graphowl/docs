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

## `graphowl` (Python client)

```python
from graphowl import GraphOWL

owl = GraphOWL(url="https://your-graphowl-host", api_key="...")

owl.vocabulary.search("invoice")        # what a business term means
owl.ontology.term_iris("demo")          # what types exist in a pack
owl.assets.list(limit=10)               # what is catalogued
owl.graph().subgraph(asset_id)          # what connects to what
owl.inference.run()                     # what can be derived
owl.validation.report()                 # whether the data is valid
owl.query.sparql("SELECT * WHERE { GRAPH ?g { ?s ?p ?o } } LIMIT 5")
```

Sync and async (`AsyncGraphOWL`), with typed errors that carry the server's own explanation. Calls are grouped by what you want to do: `vocabulary`, `ontology`, `modelling`, `assets`, `catalog`, `graph`, `query`, `semantic`, `mapping`, `virtual_graphs`, `inference`, `validation`, `reconciliation`, `governance`, `collaboration`, `webhooks`, `workspaces`, `ops`.

## `graphowl-ingest` (Python)

```python
from graphowl_ingest import GraphOwlClient, IngestBuilder

client = GraphOwlClient(base_url="https://your-graphowl-host", token=TOKEN)
request = (IngestBuilder()
           .entity("service", "payments")
           .entity("database", "core", parent_fqn="payments")
           .build())
result = client.push(request)
```

Batching, idempotency keys and retries (with jitter, on `429` and `5xx` only) are handled. A file goes up with `client.push_file(text, "jsonl")` and `client.await_job(handle["id"])`.

## `@graphowl/ingest` (TypeScript)

```ts
import { GraphOwlClient, IngestBuilder } from "./src/ingest.js";

const client = new GraphOwlClient({ baseUrl: "https://your-graphowl-host", token });
const result = await client.push(
  new IngestBuilder()
    .entity({ kind: "service", name: "payments" })
    .entity({ kind: "database", name: "core", parentFqn: "payments" })
    .build(),
);
```

Types are generated from the OpenAPI description, so they cannot drift from what the service publishes.

## Status

Version 0.1.0, early access: the API may change before 1.0. Run something real against your server before you trust any client: the libraries' unit tests mock the transport.
