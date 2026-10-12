---
title: "Run it yourself"
description: "Run GraphOWL with Docker: a Postgres database and the server."
---

:::caution[Early access]
The server image is provided under the [evaluation licence](/docs/project/licences/) on request, for evaluation only. Email <connect@graphowl.app> to request a registry token and the image name.
:::

GraphOWL needs **PostgreSQL with the pgvector extension** (use the `pgvector/pgvector:pg16` image) and the server image.

```yaml
services:
  db:
    image: pgvector/pgvector:pg16
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: graphowl
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d graphowl"]
      interval: 5s
      retries: 10

  app:
    image: ${GRAPHOWL_IMAGE}
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    environment:
      DATABASE_URL: postgres://postgres:${POSTGRES_PASSWORD}@db:5432/graphowl
    ports:
      - "127.0.0.1:8080:8080"

volumes:
  pgdata:
```

```bash
docker login <registry>          # with the token you were given
export GRAPHOWL_IMAGE=<image-name-you-were-given>
export POSTGRES_PASSWORD=$(openssl rand -hex 16)
docker compose up -d
curl http://localhost:8080/health
```

The server applies its database migrations at startup.

:::danger[Do not expose an unauthenticated server]
With no identity provider configured, the server runs in **open mode** and announces it at startup. Bind it to localhost, or put authentication in front of it, before it is reachable by anyone else. See [Authentication](/docs/operators/authentication/).
:::

## Resources

The demo runs on a 1 GB single-core machine with swap, for a small dataset. Give real workloads more memory.

## Backups

The database holds everything. Back it up with `pg_dump` on a schedule and test a restore.
