---
title: "Cookbook: a data catalog"
description: "Use the graph as a catalog: find assets, see ownership gaps and follow lineage."
---

**The question.** What do we have, who owns it, and what depends on it?

GraphOWL catalogs the assets it reads: services, databases, schemas, tables and columns, each named by a fully qualified name (FQN). They are also facts in the graph, so catalog questions and domain questions are asked the same way.

## 1. See what is catalogued

```bash
curl "$URL/overview" -H "Authorization: Bearer $TOKEN" -H "x-graphowl-workspace: dairy-coop"
```

On the demo: 94 assets (1 service, 1 database, 1 schema, 18 tables, 73 columns), 1 of them described.

## 2. Find an asset

```bash
curl "$URL/search?q=milk_lot" -H "Authorization: Bearer $TOKEN" -H "x-graphowl-workspace: dairy-coop"
```

## 3. List with filters, page through

```bash
curl "$URL/assets?kind=table&limit=20" -H "Authorization: Bearer $TOKEN"
```

Lists are keyset-paginated: the response has `paging.after`; pass it back as `after` for the next page. Filters include `kind`, `owner`, `domain`, `dataProduct`, `lifecycle`, `tags` and `certification`.

## 4. Find the gaps

```bash
curl "$URL/assets?unowned=true&limit=20" -H "Authorization: Bearer $TOKEN"
```

`unowned=true` is the **ownership-gap report**: assets with no owner anywhere up their chain. Documentation coverage is in `/overview` too (here 1 of 94 described), which is the work list for the next review.

## 5. Follow the structure

An asset's children, ancestors and neighbourhood are routes of their own (`/assets/{id}/children`, `/assets/{id}/ancestors`, `/assets/{id}/graph`), and `traverse` does the same from an agent. Impact is one call: `analyze_impact` reports what a change would affect downstream and who to tell.

## What this shows

A catalog is one use of the engine, not its identity. The same graph holds the catalog and the domain model, so "which tables hold quality data, who owns them, and which lots do they describe" is one question.
