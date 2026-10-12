---
title: "Configuration"
description: "The environment variables the server reads, grouped by what they control."
---

The server is configured by environment variables. Only `DATABASE_URL` is required.

## Core

| Variable | Default | What it does |
|---|---|---|
| `DATABASE_URL` | required | PostgreSQL connection string (PostgreSQL with the pgvector extension) |
| `BIND_ADDR` | `0.0.0.0:8080` | address and port the HTTP server listens on |
| `LOG_LEVEL` | `info` | log filter (for example `info` or `debug`) |
| `LOG_FORMAT` | text | set to `json` for structured logs |
| `SPARQL_ALLOW_GET` | off | only the word `true` lets `/sparql` accept `GET`; the default `POST`-only keeps queries out of access logs |

## Authentication

| Variable | What it does |
|---|---|
| `OIDC_ISSUER` | the identity provider's issuer; setting it turns authentication on |
| `OIDC_AUDIENCE` | the expected token audience |
| `OIDC_ROLES_CLAIM` | which token claim carries the caller's roles |
| `OIDC_CONSOLE_CLIENT_ID` | the console's client id for sign-in |
| `GRAPH_OWL_JWT_SECRET` | a shared secret for HS256 tokens (development and small setups) |
| `GRAPH_OWL_ADMIN_SUBJECTS` | token subjects that are administrators |

With neither `OIDC_ISSUER` nor `GRAPH_OWL_JWT_SECRET`, the server runs in **open mode** and says so at startup. See [Authentication](/operators/authentication/).

## Search and embeddings

| Variable | What it does |
|---|---|
| `EMBEDDING_API_BASE_URL` | base URL of an OpenAI-compatible embeddings API |
| `EMBEDDING_API_KEY` | its key |
| `EMBEDDING_MODEL` | the model name (required when the base URL is set) |
| `GRAPH_OWL_EMBED_REFRESH_SECS` | how often embeddings refresh in the background (300 by default) |

## Load and limits

| Variable | What it does |
|---|---|
| `GRAPH_OWL_QUERY_TIMEOUT_MS` | the longest one query may run before it is stopped (20,000 by default). A stopped query is a `400` error, never a partial answer |
| `GRAPH_OWL_ADMISSION_QUERY_PERMITS` | how many queries may run at once; further requests are refused with `503` and a retry hint |
| `GRAPH_OWL_ADMISSION_INGESTION_PERMITS` | the same for ingestion |
| `GRAPH_OWL_ADMISSION_RETRY_AFTER_SECONDS` | the retry hint sent with a `503` |
| `GRAPH_OWL_BUDGET` | an overall memory budget for the server's caches |
| `GRAPH_OWL_BUDGET_*_MB` | per-area memory budgets (analytics, authorization, query plans, reasoning, shapes, vectors) |

`GRAPH_OWL_ADMISSION_RETRY_AFTER_SECONDS` is the hint sent with that `503`. A value the server cannot use is refused at startup with a message naming the variable, rather than silently ignored.

## Federation, webhooks and sources

| Variable | What it does |
|---|---|
| `GRAPH_OWL_FEDERATION_ENDPOINTS` | the SPARQL endpoints `SERVICE` calls may reach (an allow-list; off by default) |
| `GRAPH_OWL_FEDERATION_TIMEOUT_MS` | how long a federated call may take |
| `GRAPH_OWL_OUTBOUND_WEBHOOK_ALLOWLIST` | hosts outbound webhooks may call (off by default) |
| `GRAPH_OWL_ONTOLOGY_IMPORT_HOSTS` | hosts an ontology import may fetch from |
| `GRAPH_OWL_PACKS_DIR` | where installed packs are read from |
| `VIRTUAL_LOG_RETENTION_DAYS` | how long virtual-graph query logs are kept |

## Tips

- Put secrets in your orchestrator's secret store, not in the compose file.
- Change one thing at a time and watch `/ready` and the logs.
- A deployment-level allow-list (federation, webhooks, imports) is **off until you set it**: nothing leaves the server by default.
