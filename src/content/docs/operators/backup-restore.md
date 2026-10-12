---
title: "Backup and restore"
description: "Back up everything with the PostgreSQL tools, and test the restore."
---

Everything GraphOWL stores (facts and their history, models, catalog, proposals, settings) is in PostgreSQL. That makes backup an ordinary database task.

## Back up

```bash
docker compose exec db pg_dump -U postgres -Fc graphowl > graphowl-$(date +%F).dump
```

Run it on a schedule, and copy the dump off the machine.

## Restore

Into a fresh database, with the same server image or a newer one:

```bash
docker compose down
docker volume rm <project>_pgdata          # only for a restore into an empty database
docker compose up -d db
docker compose exec -T db pg_restore -U postgres -d graphowl --clean --if-exists < graphowl-2026-10-12.dump
docker compose up -d server
curl http://localhost:8080/ready
```

## Test the restore

A backup you have not restored is a hope. Restore into a scratch stack, call `/health` and `/ready`, and run one query whose answer you know.

## Consistency

A dump is a consistent snapshot of the database. Stop writers if you need a point in time that matches an external system.

## What is not in the database

Container images and your compose and environment files. Keep those in version control (without secrets).

## Moving between instances

The product has a lossless archive format for moving a catalog between instances, available through the full toolset. It is **not** part of the early-access image: use `pg_dump` and `pg_restore` until release notes say otherwise.
