---
title: "Authentication"
description: "Sign-in for people and service accounts."
---

GraphOWL verifies **OIDC access tokens** (RS256, against the issuer's published keys). Set the issuer with the `OIDC_ISSUER` environment variable; the server then requires a valid bearer token on API calls.

## People

Sign in through your identity provider. Their roles decide what they can read and approve.

## Services and agents

A service or agent authenticates as **itself**, not as a person: create a service account in your identity provider with a client-credentials grant, give it only the access it needs (an ingesting adapter needs write access to the part it owns and nothing else), and pass its token to the client library.

## Open mode

With no issuer and no shared secret configured, the server runs in **open mode** for development and says so loudly at startup. A server that is open by accident must not look the same as one that is open on purpose. Never expose open mode beyond your own machine.
