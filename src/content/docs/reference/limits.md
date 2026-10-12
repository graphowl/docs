---
title: "Known limits"
description: "What GraphOWL does not do yet, stated plainly."
---

Early access means gaps. This page lists the ones we know about so you do not have to find them.

| Area | Limit |
|---|---|
| **openCypher** | A documented subset. Some functions are parsed but not yet supported (`type(r)`, `properties(n)`); they return a `400` naming the construct. A query with no label (`MATCH (n) RETURN count(n)`) returns `0`. No conformance claim to openCypher or ISO GQL. |
| **Query time** | A query that runs past its time budget (20 seconds by default) is stopped with a `400`; it is never answered partially. An unselective pattern, such as several unconstrained patterns that share no variable, can multiply into billions of rows, so name the classes and relationships a query should follow. |
| **SPARQL** | SPARQL 1.1 query. No federated query, no SPARQL 1.2. |
| **SHACL** | Core constraints and SPARQL constraints, with stated gaps; no reusable SPARQL constraint components, no SHACL rules. See [Standards](/reference/standards/). |
| **RDF formats** | Import: Turtle, N-Triples, JSON-LD. Export: Turtle, JSON-LD, N-Triples, N-Quads. No RDF/XML or TriG through the API. |
| **Time travel** | A timestamp earlier than the first transaction returns the present state instead of empty. |
| **Named graphs** | Imported facts live in named graphs; patterns outside `GRAPH` read only the default graph. |
| **Scale** | The demo is a small dataset on a small machine. **No benchmark figures are published**; they will come with the method that produced them. |
| **Distribution** | The server is proprietary and provided as an early-access container under an evaluation licence. |
| **Client libraries** | Not yet on PyPI or npm. |

Found something not listed? [Open an issue](https://github.com/graphowl/graphowl/issues/new/choose).
