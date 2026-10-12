---
title: "Upgrades"
description: "Move to a newer image safely."
---

1. **Read the release notes** in the [changelog](https://github.com/graphowl/graphowl/blob/main/CHANGELOG.md) for the version you are moving to.
2. **Back up** the database ([Backup and restore](/operators/backup-restore/)).
3. **Pull the new image** and set `GRAPHOWL_IMAGE` to its tag.
4. **Restart the server:** `docker compose up -d server`. The server applies database migrations at startup, in order.
5. **Check** `/health` and `/ready`, then run a query whose answer you know.

## Rolling back

Migrations are forward-only. To roll back, restore the backup you took in step 2 and start the previous image.

## Early access

During early access the API and the schema may change between versions. Pin an image tag instead of tracking `latest-eval`, and upgrade deliberately.
