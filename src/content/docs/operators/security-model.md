---
title: "Security model"
description: "Who can do what, and where the boundaries are."
---

## Identity

With `OIDC_ISSUER` set, every API call needs a valid bearer token from your identity provider. People and services each have their own identity. See [Authentication](/operators/authentication/).

## Authorization

- **Roles** come from a token claim (`OIDC_ROLES_CLAIM`); administrators are named in `GRAPH_OWL_ADMIN_SUBJECTS`.
- **Workspaces** scope what a request can read.
- **Agent grants** list the capabilities an agent may use; anything else is refused and recorded.
- **Policies** can deny access to parts of the catalog by name prefix.

## Data boundaries

- **Sources are read-only.** Source databases are read through roles you create with read-only access.
- **No telemetry.** The server sends nothing to its authors.
- **Nothing leaves by default.** Federated query, outbound webhooks and remote ontology imports are each off until an operator names the allowed hosts.

## Review before effect

Changes proposed by software or agents are proposals until a person approves them, so a compromised or mistaken agent cannot rewrite the model on its own.

## Network

Bind to localhost or a private network and put TLS in front of the server (a reverse proxy). The compose file binds to `127.0.0.1` for that reason.

## Reporting a vulnerability

See [Security](/project/security/).
