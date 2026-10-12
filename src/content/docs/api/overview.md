---
title: "API overview"
description: "Authentication, errors, pagination and conventions for the GraphOWL HTTP API."
---

The API is JSON over HTTP. The full description is [`openapi.json`](https://github.com/graphowl/graphowl/blob/main/api/openapi.json); the [reference](/docs/api/reference/) lists every route.

## Authentication

Send a bearer token: `Authorization: Bearer <token>`. Tokens are OIDC access tokens. See [Authentication](/docs/operators/authentication/).

## Workspaces

Send the workspace slug in the `x-graphowl-workspace` header to scope a request to one workspace.

## Errors

Errors are [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) problem documents with `status`, `title`, `detail` and, for validation, an `errors` array naming each field:

```json
{"status": 400, "title": "Validation failed", "detail": "1 field failed validation",
 "errors": [{"code": "type", "field": "query", "detail": "..."}]}
```

A `400` means the request is wrong: fix it, do not retry. `5xx` and `429` mean not now: retry with backoff.

## Lists

Lists are keyset-paginated. Pass the cursor from one page to get the next; do not compute offsets.

## Health

`GET /health` (liveness) and `GET /ready` (readiness).

## Versioning

Early access: the surface may change before 1.0. Changes are listed in the [changelog](https://github.com/graphowl/graphowl/blob/main/CHANGELOG.md).
