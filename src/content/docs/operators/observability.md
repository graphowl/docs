---
title: "Observability"
description: "Health, readiness, metrics and logs."
---

## Health and readiness

| Route | Use |
|---|---|
| `GET /health` | liveness: the process is up. `{"status":"alive","version":"0.1.0"}` |
| `GET /ready` | readiness: it can serve (the database is reachable and migrated) |

Use `/health` for restart decisions and `/ready` for load-balancer decisions.

## Metrics

`GET /metrics` serves Prometheus text format. It includes request counts by method, route and status:

```text
# TYPE graph_owl_http_requests_total counter
graph_owl_http_requests_total{method="POST",route="/cypher",status="200"} 17
```

Scrape it like any Prometheus target. Routes are reported as templates (`/glossaries/{id}/terms`), so cardinality stays bounded.

## Logs

Logs go to standard output. `LOG_LEVEL` sets the filter; `LOG_FORMAT=json` switches to structured JSON, one object per line. Every request is logged with a request id, the principal, method, route, status and duration in milliseconds, so a slow or failing call can be traced from a client's complaint to one line.

At startup the server logs how it is configured, including whether authentication is on, and **warns loudly when it is off**.

## What to watch

- `5xx` rate per route.
- `503` rate: sustained refusals mean the admission limits are too low, or something is hammering the server. `429` is a single sender exceeding its own rate.
- Request duration for `/sparql` and `/cypher`.
- Disk and connections on the PostgreSQL side.
