---
title: "Errors"
description: "How GraphOWL reports problems, and what to do about each kind."
---

Errors are [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) problem documents: a machine-readable `type`, a short `title`, the HTTP `status`, a `detail`, and for validation an `errors` array that names each field.

```json
{
  "status": 400,
  "title": "Validation failed",
  "detail": "1 field failed validation",
  "type": "https://graph-owl.dev/errors/validation-failed",
  "errors": [
    {"code": "type", "field": "query",
     "detail": "`a function call that is not a supported aggregate` is in the subset's grammar but has no lowering yet"}
  ]
}
```

A malformed body is also a problem document (title `Malformed request body`), for example a missing `Content-Type: application/json`.

## What to do

| Status | Meaning | What to do |
|---|---|---|
| `400` | the request is wrong: a field failed validation, or the body is malformed | fix the request; do not retry. Read `errors[].field` and `detail` |
| `401` | no valid credential | send a token, or check it has not expired |
| `403` | the credential is valid but not allowed: a missing capability or role | the `detail` names what is required; ask for the grant |
| `404` | the thing does not exist, or you may not see it | check the id or name and the workspace header |
| `409` | a conflict: an idempotency key reused for different content, or a name already taken | fix the cause; retrying the same request cannot succeed |
| `429` | the server is busy | wait and retry with backoff |
| `5xx` | the server failed | retry with backoff; if it persists, [open an issue](https://github.com/graphowl/graphowl/issues/new/choose) with the time and route |

## Agents and refusals

A tool call outside an agent's grant is refused with a `403` that names the capability it needed, and the refusal is recorded. See [Agent patterns](/ai/patterns/).

## Truncated is not an error

A query that hit its budget answers `200` with `truncated: true`. The answer is incomplete, not wrong: narrow the query. See [Query with SPARQL](/guides/query-sparql/).

## The `type` URL

The `type` identifies the problem kind. Treat it as an opaque identifier; the namespace in the current early-access build may change.
