---
title: "Run it on"
description: "Which platforms GraphOWL has been run on, and which are expected to work but untested."
---

GraphOWL ships as a container image that needs **PostgreSQL with pgvector**. This page says what has actually been run, so you do not have to guess. "Tested" means we ran it; "Expected" means it is a standard container on that platform and we have not tried it.

![Two ways to run it](/brand/run-options.svg)

| Platform | Status | Notes |
|---|---|---|
| **Linux, amd64** | Tested | The hosted demo runs on an Ubuntu amd64 virtual machine with 1 GB of memory and swap, behind a reverse proxy |
| **macOS, Apple silicon (Docker Desktop)** | Tested, with caveats | The amd64 image started and served the console, `/health` and `/sparql` under emulation against a fresh database. An arm64 image has been built but not yet run |
| **Linux, arm64** | Expected | An arm64 image builds; not yet run on an arm64 host |
| **macOS, Intel (Docker Desktop)** | Expected | Uses the amd64 image natively |
| **Windows (Docker Desktop with WSL 2)** | Not tested | A standard container; expect it to work |
| **Kubernetes** | Not tested | The compose file maps to a Deployment and a StatefulSet or managed PostgreSQL; there is no Helm chart yet |
| **Managed PostgreSQL** | Not tested | Any PostgreSQL 16 service that offers the `vector` extension should work; the server runs its own migrations at startup |

## What the demo proves

The hosted demo runs a small dataset on the smallest machine we could find. It shows the server works in a very modest footprint; it is **not** a sizing guide. No benchmark figures are published yet.

## Minimum to try it

A machine with Docker, about 2 GB of free memory for the two containers, and a free port 8080. Real workloads need more.

## Found a platform that works or does not?

Please tell us: [open an issue](https://github.com/graphowl/graphowl/issues/new/choose) with the platform, the image tag and what happened. This table is only as good as the reports behind it.
