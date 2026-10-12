---
title: "FAQ"
description: "Short answers to the questions people ask first."
---

## Is GraphOWL open source?
No. The server, console and image are proprietary and provided for evaluation under an [evaluation licence](/project/licences/). The API description, client libraries, examples, sample data and these docs are public, each under its own licence.

## Can I run it myself?
Yes, as an early-access container: PostgreSQL with pgvector plus one server. See [Run it yourself](/operators/deploy/). The evaluation licence covers evaluation, not production.

## Is it only for metadata and data catalogs?
No. A catalog is one use. The engine stores and reasons over any connected knowledge: a business domain, a compliance rule set, a product model.

## Where does my data live?
In GraphOWL's own store (PostgreSQL). Source databases are read through read-only roles and never written to. The server sends nothing to us.

## Do I need to know RDF or OWL?
No to start. The console and the guides work with classes, properties and relations. SPARQL is there when you want exact questions, and [openCypher](/guides/query-cypher/) for graph patterns.

## How do I get data in?
Connect a source database and let GraphOWL propose an ontology ([guide](/guides/database-to-ontology/)), push entities with the [ingestion API](/guides/load-data/), or import RDF files.

## Is it Cypher, openCypher or GQL?
openCypher, as a documented subset, with a few GQL forms. "Cypher" is a registered trademark of Neo4j, Inc.; **openCypher** is the open specification of the language, and GQL (ISO/IEC 39075:2024) is the ISO standard it influenced. GraphOWL is not affiliated with Neo4j, Inc. and claims no conformance to either specification. See [Query with openCypher](/guides/query-cypher/).

## Can an AI agent use it?
Yes. An [MCP server](/ai/mcp-overview/) exposes the graph, and a grant limits what an agent may do. Agents propose; people approve.

## Can I get my data out?
Yes. See [Export your data](/guides/export/): Turtle, JSON-LD, N-Triples, N-Quads, JSON Lines, GraphML and more.

## How big can it get?
We have not published benchmarks, and will not make speed claims without a published method. The demo runs a small dataset on a small machine.

## Why does my query return nothing?
Most often the pattern is outside a `GRAPH ?g { ... }` block, and imported facts live in named graphs. See [Query with SPARQL](/guides/query-sparql/).

## How do I report a problem?
[Open an issue](https://github.com/graphowl/graphowl/issues/new/choose). For a vulnerability, see [Security](/project/security/).
