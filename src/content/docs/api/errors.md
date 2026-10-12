---
title: "Errors"
description: "How GraphOWL reports problems, every problem type, and what to do about each."
---

Errors are [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) problem documents: a machine-readable `type`, a short `title`, the HTTP `status`, a `detail`, and for validation an `errors` array that names each field. **The `type` is a link to the heading on this page that explains it**, and the strings are stable: branch on them, never on the prose.

```json
{
  "status": 400,
  "title": "Validation failed",
  "detail": "1 field failed validation",
  "type": "https://docs.graphowl.app/api/errors/#validation-failed",
  "errors": [
    {"code": "type", "field": "query",
     "detail": "`a function call that is not a supported aggregate` is in the subset's grammar but has no lowering yet"}
  ]
}
```

## By status

| Status | Meaning | What to do |
|---|---|---|
| `400` | the request is wrong | fix it; do not retry |
| `401` | no valid credential | send a token, or renew it |
| `403` | known, but not allowed | the `detail` names what is required |
| `404` | does not exist, or you may not see it | check the id and the workspace header |
| `409` | a conflict with existing state | fix the cause; retrying the same request cannot succeed |
| `412` | `If-Match` is stale | re-read, merge, retry |
| `429` | a sender or an agent exceeded its own rate | wait for `Retry-After` |
| `500` | the server failed | retry with backoff, then report |
| `503` | the server refused the request for load | wait for `Retry-After` and resend |

## Time budget

A query that runs past the server's time budget (20 seconds by default; `GRAPH_OWL_QUERY_TIMEOUT_MS`) is **stopped**, and the answer is a `400` `validation-failed` with a `query` error that says so. It is an error, never a partial answer. Narrow the query: name the classes and relationships it should follow.

## Truncated is not an error

A query that hit its *facts* budget answers `200` with `truncated: true`. The answer is incomplete, not wrong. See [Query with SPARQL](/guides/query-sparql/).

## Problem types

### malformed-body

**Status 400.** The body could not be read as the expected shape, for example a missing `Content-Type: application/json` or invalid JSON.

*What to do:* Fix the request; do not retry.

### validation-failed

**Status 400.** The body is well formed but one or more fields are invalid. `errors[]` names every one, not just the first. A query stopped at its time budget also arrives here, with the field `query`.

*What to do:* Fix the fields named in `errors`; for a query, narrow it.

### illegal-relationship

**Status 400.** The relationship you tried to create is well formed but meaningless between those kinds of entity.

*What to do:* Choose a different relationship type.

### unauthenticated

**Status 401.** No credential, or one that does not verify.

*What to do:* Send a valid bearer token.

### token-expired

**Status 401.** The bearer token has expired.

*What to do:* Get a new token and retry.

### token-invalid

**Status 401.** The token is malformed, or its signature, issuer or audience is wrong.

*What to do:* Check the identity-provider settings and the token.

### forbidden

**Status 403.** You are known, but may not do this.

*What to do:* The `detail` names what is required; ask for the role or grant.

### agent-refused

**Status 403.** An agent's write was refused. The `detail` names the rule: the capability that was missing, or the scope it strayed outside.

*What to do:* Request the capability, or stay inside the scope. The refusal is recorded.

### not-found

**Status 404.** The thing does not exist, or you may not see it.

*What to do:* Check the id, name and workspace header.

### version-conflict

**Status 412.** `If-Match` named a version that is no longer current. The response carries the current one.

*What to do:* Re-read, merge your change, and retry with the new version.

### fqn-conflict

**Status 409.** An asset with that fully qualified name already exists.

*What to do:* Use a different name, or update the existing asset.

### relationship-conflict

**Status 409.** That exact relationship already exists.

*What to do:* Nothing to do, or change one end.

### domain-already-assigned

**Status 409.** The asset already belongs to a domain.

*What to do:* Remove it from the first domain before assigning another.

### domain-in-use

**Status 409.** The domain still has assets.

*What to do:* Move or remove the assets first.

### tag-in-use

**Status 409.** The tag is still applied to assets.

*What to do:* Remove it from them first.

### tag-mutually-exclusive

**Status 409.** The tag belongs to an exclusive group and the asset already carries another tag from it.

*What to do:* Choose one tag from the group.

### proposal-already-decided

**Status 409.** The proposal was already accepted or rejected.

*What to do:* Read the recorded decision.

### change-proposal-already-decided

**Status 409.** The change proposal was already decided.

*What to do:* Read the recorded decision.

### models-not-yet

**Status 409.** The model step cannot run yet: its questions have not been ratified.

*What to do:* Ratify or drop the open questions, then retry.

### ontology-model-changed

**Status 409.** The model changed since you read it.

*What to do:* Re-read the model and propose again.

### waiver-exists

**Status 409.** A waiver for that violation already exists.

*What to do:* Update or remove the existing waiver.

### assignment-exists

**Status 409.** That assignment already exists.

*What to do:* Nothing to do.

### memory-exists

**Status 409.** An identical memory is already recorded for that asset.

*What to do:* Nothing to do.

### relation-exists

**Status 409.** That relation already exists.

*What to do:* Nothing to do.

### custom-property-exists

**Status 409.** A custom property with that name already exists.

*What to do:* Use another name.

### pack-version-exists

**Status 409.** That pack version is already installed.

*What to do:* Install a newer version, or use the installed one.

### pack-referenced-externally

**Status 409.** Something outside the pack still refers to it.

*What to do:* Remove the references first.

### webhook-path-exists

**Status 409.** A webhook with that path already exists.

*What to do:* Choose another path.

### stream-subscription-exists

**Status 409.** A streaming subscription with that name already exists.

*What to do:* Choose another name.

### principal-still-holds

**Status 409.** The principal still holds something that blocks removing it.

*What to do:* Release what it holds first.

### glossary-has-terms

**Status 409.** The glossary still has terms.

*What to do:* Remove or move the terms first.

### idempotency-conflict

**Status 409.** An idempotency key was reused for different content.

*What to do:* Fix the key generation. Retrying cannot succeed.

### merge-already-split

**Status 409.** That merge was already split.

*What to do:* Nothing to do.

### review-already-decided

**Status 409.** The review was already decided.

*What to do:* Read the recorded decision.

### drift-already-decided

**Status 409.** The drift record was already decided.

*What to do:* Read the recorded decision.

### thread-already-resolved

**Status 409.** The thread was already resolved.

*What to do:* Nothing to do.

### rate-limited

**Status 429.** One sender (for example a webhook endpoint) exceeded its own configured rate.

*What to do:* Wait for `Retry-After`; other senders are unaffected.

### agent-rate-limited

**Status 429.** An agent used up its action budget. It is the one refusal that will stop being true on its own.

*What to do:* Wait for `Retry-After` and retry.

### internal-error

**Status 500.** The server failed.

*What to do:* Retry with backoff; if it persists, report the time and route.

### overloaded

**Status 503.** No permit was free on an admission-controlled path (queries or ingestion). The request is refused, not queued, and nothing about it is wrong.

*What to do:* Wait for `Retry-After` and send it again.
