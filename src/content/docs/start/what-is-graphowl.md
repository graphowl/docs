---
title: "What is GraphOWL"
description: "A knowledge graph engine that stores, queries, reasons over and validates connected knowledge."
---

GraphOWL turns the pieces of what an organisation knows (tables, files, rules, definitions) into **one graph that knows what things mean**, then lets people and AI agents ask it questions, check it against rules, and trust the answers.

![From scattered data to answers you can trust](/brand/pipeline.svg)

## What it does

| | |
|---|---|
| **Connect** | Read a source database through a read-only role, load files, or query a source in place as a virtual graph. |
| **Model** | Propose an ontology from what is already there. A person reviews every class, relation and rule before it takes effect. |
| **Query** | SPARQL, a documented Cypher subset, graph traversal, keyword and semantic search, over the same facts. |
| **Reason** | OWL 2 RL reasoning derives what follows from the model, and marks it as derived. |
| **Validate** | SHACL-style constraints and quality expectations check data against the model. |
| **Remember** | Every fact keeps its history. Nothing is deleted, only retracted. |
| **Serve** | An HTTP API, an MCP server for AI agents, and a console for people. |

## One engine, three layers

![One engine, three layers](/brand/architecture.svg)

It is **not** a metadata catalog with a graph bolted on, and it is not tied to one industry. A data catalog, a compliance model or a product domain is one *pack* of models and rules on the same engine.

## Where to go next

- **See it work:** the [Quickstart](/start/quickstart/).
- **Understand it:** [Concepts in ten minutes](/start/concepts/).
- **Be honest with yourself about fit:** [Known limits](/reference/limits/) and [Standards](/reference/standards/).
