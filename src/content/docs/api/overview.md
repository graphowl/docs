---
title: "API overview"
description: "Authentication, workspaces, errors, pagination, idempotency and conventions for the GraphOWL HTTP API."
---

The API is JSON over HTTP. The full description is [`openapi.json`](https://github.com/graphowl/graphowl/blob/main/api/openapi.json); the [reference](/api/reference/) lists every route.

## Health and metrics

`GET /health` (liveness) and `GET /ready` (readiness). `GET /metrics` serves Prometheus metrics. See [Observability](/operators/observability/).

## Authentication

Send a bearer token: `Authorization: Bearer <token>`. Tokens are OIDC access tokens. See [Authentication](/operators/authentication/).

## Workspaces

Send the workspace slug in the `x-graphowl-workspace` header to scope a request to one workspace. Without it, a request reads across what the caller may see.

## Errors

Errors are [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) problem documents. See the [error guide](/api/errors/).

## Lists and pagination

Lists are **keyset-paginated**. Pass `limit` and, from the previous response's `paging.after`, `after` for the next page:

```bash
curl "$URL/assets?limit=2" -H "Authorization: Bearer $TOKEN"
# {"data": [ ... 2 assets ... ], "paging": {"after": "ZGFpcnktY29vcC1kYi5k..."}}

curl "$URL/assets?limit=2&after=ZGFpcnktY29vcC1kYi5k..." -H "Authorization: Bearer $TOKEN"
```

Do not compute offsets or decode the cursor: it is opaque. A few reports (such as `/validation/report`) page with `limit` and `offset` and return `total`.

## Filtering

List routes take filters as query parameters: `GET /assets` accepts `kind`, `owner`, `unowned`, `domain`, `dataProduct`, `lifecycle`, `tags` and `certification`, among others. The [reference](/api/reference/) and the OpenAPI file list each route's parameters.

## Idempotency

Writes that can be retried take an `Idempotency-Key` header: the ingestion routes require one. A retry reuses the key; reusing a key for different content is a `409`; keys expire after 24 hours. See [Load data](/guides/load-data/).

## Busy servers

An operator can limit concurrent queries and ingestion (see [Configuration](/operators/configuration/)). A request refused for load answers `503` (`overloaded`) with a `Retry-After` hint: wait and resend. Individual senders and agents that exceed their own rate get `429`. A query that runs past its time budget (20 seconds by default) is stopped with a `400`.

## Content types

Request and response bodies are `application/json`, except ingestion files (`application/x-ndjson`, `text/csv`) and RDF import and export (Turtle, N-Triples, JSON-LD and so on).

## Versioning

Early access: the surface may change before 1.0. Changes are listed in the [changelog](https://github.com/graphowl/graphowl/blob/main/CHANGELOG.md).
