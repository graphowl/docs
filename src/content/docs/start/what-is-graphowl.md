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
| **Query** | SPARQL, a documented openCypher subset, graph traversal, keyword and semantic search, over the same facts. |
| **Reason** | OWL 2 RL reasoning derives what follows from the model, and marks it as derived. |
| **Validate** | SHACL-style constraints and quality expectations check data against the model. |
| **Remember** | Every fact keeps its history. Nothing is deleted, only retracted. |
| **Serve** | An HTTP API, an MCP server for AI agents, and a console for people. |

## One engine, three layers

![One engine, three layers](/brand/architecture.svg)

It is **not** a metadata catalog with a graph bolted on, and it is not tied to one industry. A data catalog, a compliance model or a product domain is one *pack* of models and rules on the same engine.

## Many ways in

![The console, HTTP API, MCP server and client libraries all reach the same engine](/brand/api-surface.svg)

## Who it is for

| You are | GraphOWL gives you |
|---|---|
| **A data or platform team** | one graph over your databases, with definitions, owners and lineage as facts you can query |
| **A domain modeller or analyst** | an ontology proposed from your data that you review, then rules and constraints that check it |
| **An AI-agent builder** | reviewed, dated, traceable context behind an MCP server, with grants that limit what an agent may do |
| **An evaluator** | a live demo and a clear list of what is and is not built |

## When it is not the right tool

- **A system of record for transactions.** GraphOWL reads your sources; it does not replace them. Source databases are read through read-only roles.
- **Whole-graph analytics at very large scale.** Traversal is bounded by design; heavy graph algorithms are not the focus. No benchmark figures are published yet.
- **A drop-in replacement for another graph database.** The query surface is SPARQL 1.1 and a documented openCypher subset, not a clone of any product's dialect. See [known limits](/reference/limits/).

## Where to go next

- **See it work:** the [Quickstart](/start/quickstart/).
- **Understand it:** [Concepts in ten minutes](/start/concepts/).
- **Check fit honestly:** [Known limits](/reference/limits/) and [Standards](/reference/standards/).
- **Try a worked scenario:** the [dairy traceability cookbook](/cookbooks/dairy-traceability/).
