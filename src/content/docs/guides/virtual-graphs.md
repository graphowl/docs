---
title: "Virtual graphs"
description: "Query a source database in place, through a mapping a reviewer approved."
---

A **virtual graph** answers questions from a source database *without copying its rows into the graph*. The source stays the system of record; GraphOWL translates a graph query into queries over the source through a **mapping** that a person has reviewed.

## When to use one

| Use a virtual graph when | Load the data instead when |
|---|---|
| the source changes constantly and a copy would go stale | you need history of the data itself |
| the data is large and you only ask narrow questions | you want reasoning across the whole set |
| you may not copy the data out of its home | you want the fastest, simplest queries |

## How it works

1. Connect the source with a **read-only** role.
2. Map its tables and columns to classes and properties of the ontology; a person reviews the mapping.
3. Approve it. The virtual graph is versioned: a change is a new version.
4. Query it through MCP (`query_virtual_graph`) or the API. Rows come back as the source holds them, with a `truncated` flag if a limit cut the answer short.

Nothing in a virtual graph can write to the source.

## Operations

`GET /virtual-graphs` lists the newest version of each (administrators). `list_virtual_graphs` and `query_virtual_graph` are the MCP tools. Query logs are kept for a configurable time (`VIRTUAL_LOG_RETENTION_DAYS`).
