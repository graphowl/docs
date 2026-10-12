---
title: "Load data"
description: "Push entities and relationships with the ingestion API, or import RDF files."
---

There are three ways in. Pick by where the data starts.

| You have | Use |
|---|---|
| a source database | [From a database to an ontology](/guides/database-to-ontology/) |
| entities and relationships from a script or scheduler | the ingestion API, below |
| RDF in Turtle, N-Triples or JSON-LD | `POST /graph/import/rdf` |

## The ingestion API

Two routes, and the difference is size, not capability:

| You have | Use | You get |
|---|---|---|
| up to 1,000 entities and edges | `POST /ingest` | `207` with a verdict per item |
| a file of any size | `POST /ingest/batch` | `202` and a job to poll at `GET /ingest/jobs/{id}` |

`POST /ingest` is synchronous and **partially successful**: item 42 being wrong does not discard the other 999. You get an array of `{index, status, id, problem}` indexed against the list you sent.

`POST /ingest/batch` takes JSONL (`application/x-ndjson`) or CSV (`text/csv`) as a raw body, not multipart. Processing streams, so file size does not matter. A job ends as `succeeded`, `failed` or **`partial`**: some rows landed and some did not. `partial` is not a failure; read the per-row failures.

## Entities are named by FQN

An entity is named by its fully qualified name, never by an id: you do not know ours and should not have to. A parent is `parentFqn`; the service derives the child's name from it.

## Idempotency

Every push carries an `Idempotency-Key`; the client libraries generate one for you.

1. **A retry reuses the key.** A key per attempt makes the retry a second push.
2. **A key identifies a request, not a slot.** Reusing one for different content is a `409`. Retrying a `409` can never succeed.
3. **Keys expire after 24 hours.**

## Use a client library

```python
from graphowl_ingest import GraphOwlClient, IngestBuilder

client = GraphOwlClient(base_url="https://your-graphowl-host", token=TOKEN)
request = (
    IngestBuilder()
    .entity("service", "payments")
    .entity("database", "core", parent_fqn="payments")
    .build()
)
result = client.push(request)      # batching, keys and retries handled
```

See [Client libraries](/sdks/) and the [`graphowl-ingest` repository](https://github.com/graphowl/sdk-python).

## What a push does not do

A push says what it is *about*, not what it is *not*. GraphOWL does not delete what your push omitted: "absent from this file" and "deleted at the source" are different facts, and only your adapter can tell them apart.
