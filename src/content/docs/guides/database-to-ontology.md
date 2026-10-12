---
title: "From a database to an ontology"
description: "Scan a database, review the proposed ontology, load a sample, and ask questions of it."
---

This is the walkthrough behind the demo. It uses a fictional dairy cooperative; the [sample database](https://github.com/graphowl/examples/tree/main/dairy-cooperative) is public.

:::note
This guide describes the console flow. Each step is also an API operation (see the [API reference](/api/reference/)); the console is the easiest way to learn the shape.
:::

## 1. Connect the source, read-only

Create a **read-only role** in your database and connect it as a source. GraphOWL reads the database's tables, columns and keys. Nothing in the console can change the source.

## 2. Scan and propose

GraphOWL catalogues the schema as assets (tables, columns, keys) and proposes an ontology from it: a class per table, a property per column, a relation per foreign key. For the dairy database that is farms, herds, milk lots, tanker runs, quality tests, batches, retailers and sales.

## 3. Review

Open the proposal. Approve, edit or reject each class, relation and rule. **Nothing takes effect until a person approves it.** Approved terms enter the workspace's vocabulary.

## 4. Load a sample

Load a bounded sample of rows. Each row becomes an instance of an approved class. The demo loads the first rows of each table: enough to explore and to check the model, without copying the whole database.

## 5. Ask questions

```sparql
SELECT ?class (COUNT(?s) AS ?n)
WHERE { GRAPH ?g { ?s a ?class } }
GROUP BY ?class ORDER BY DESC(?n)
```

Then try [Cypher](/guides/query-cypher/), search, or the [MCP server](/ai/mcp-overview/) from an assistant.

## 6. Check coverage

See how much of the model is documented and how much of it the data reaches. Gaps are the work list for the next review.

## What to look for

- A class with no instances: the sample missed it, or the table is empty.
- A relation with no edges: a foreign key whose values do not match.
- Terms with no definition: the vocabulary needs writing.
