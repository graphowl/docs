---
title: "Workspaces and packs"
description: "One engine, many domains: how workspaces scope data and packs bundle models."
---

## Workspaces

A workspace holds one team's sources, models and graph.

```bash
curl "$URL/workspaces" -H "Authorization: Bearer $TOKEN"
# [{"slug": "dairy-coop", "displayName": "Northfield Dairy Cooperative", ...}]
```

Send `x-graphowl-workspace: <slug>` on a request to scope it. Without it, a request reads across what the caller may see; in an MCP session scoped to one workspace, the argument is required.

**A workspace gathers many sources.** When you add a source, add it to a workspace you choose; do not create one workspace per source.

## Packs

A **pack** is a bundle of domain content: an ontology, a glossary, rules and expectations. Packs are why one engine serves a data catalog, a compliance model or a product domain.

```bash
curl "$URL/ontology-packs" -H "Authorization: Bearer $TOKEN"
```

Each pack has an id, a version, a licence, a term count and the glossary it ships. A workspace **uses** the packs it needs, so one deployment can serve several domains without showing one the other's vocabulary.

## Installing and authoring

Packs are created and edited through the console and the MCP tools (`create_pack`, `write_pack_ontology`, `write_pack_glossary`, `install_pack`, `merge_pack`). A change a person has not approved stays a proposal.

## Versions

A pack carries a version. Installing a new version reports what would change before it applies, and what removing a pack would affect.
