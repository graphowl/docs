---
title: "Run it yourself"
description: "Run GraphOWL with Docker: a Postgres database and the server."
---

:::caution[Early access]
The server image is provided under the [evaluation licence](/docs/project/licences/) for evaluation only, not production. It is a **private** container package: request access first.
:::

GraphOWL needs **PostgreSQL with the pgvector extension** and the server image. A ready-made compose file is in the hub: [`graphowl/graphowl/run`](https://github.com/graphowl/graphowl/tree/main/run).

## 1. Request access

Email <connect@graphowl.app> with your name, organisation, GitHub username and what you want to evaluate. You are added as a reader of the package and told the image tag.

## 2. Start it

```bash
echo YOUR_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin   # token with read:packages
git clone https://github.com/graphowl/graphowl && cd graphowl/run
cp .env.example .env            # set POSTGRES_PASSWORD; check GRAPHOWL_IMAGE
docker compose up -d
curl http://localhost:8080/health
# {"status":"alive","version":"0.1.0"}
```

Open <http://localhost:8080> for the console. The server applies its database migrations at startup, and a fresh install starts with an empty graph.

The compose file:

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

  server:
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

Images are published for `linux/amd64` and `linux/arm64`.

:::danger[Do not expose an unauthenticated server]
With no identity provider configured, the server runs in **open mode** and announces it at startup. Bind it to localhost, or put authentication in front of it, before it is reachable by anyone else. See [Authentication](/docs/operators/authentication/).
:::

## Next

Load the [sample dairy database](https://github.com/graphowl/examples/tree/main/dairy-cooperative) and follow [From a database to an ontology](/docs/guides/database-to-ontology/).

## Resources

The demo runs on a 1 GB single-core machine with swap, for a small dataset. Give real workloads more memory.

## Backups

The database holds everything. Back it up with `pg_dump` on a schedule and test a restore.
