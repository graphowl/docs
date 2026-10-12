---
title: "Query with Cypher"
description: "Ask the graph pattern questions with a documented Cypher subset: labels, properties, relationships, filters and counts."
---

`POST /cypher` takes the same body as [SPARQL](/guides/query-sparql/): `{"query": "..."}`. Every example on this page was run against the [demo](/start/quickstart/) (a synthetic dairy cooperative), and the results quoted are what it returned.

```bash
curl -u "$USER:$PASS" -X POST https://demo.graphowl.app/cypher \
  -H "Content-Type: application/json" \
  -d '{"query": "MATCH (n:MilkLot) RETURN count(n) AS lots"}'
```

## How the model maps to Cypher

| In Cypher | In GraphOWL |
|---|---|
| a **label** (`:MilkLot`) | a class of the workspace's ontology |
| a **property** (`n.milkLotLitres`) | a data property of that class; names are the ontology's own, here the class name followed by the column |
| a **relationship type** (`[:milkLotFarm]`) | an object property that links two classes |
| a node returned bare | its identifier (an IRI) |

To find the names for your own data, look at the classes and properties of the approved ontology in the console, or ask SPARQL: `SELECT DISTINCT ?p WHERE { GRAPH ?g { ?s a <class-iri> ; ?p ?o } }`.

## Count things

```cypher
MATCH (n:MilkLot) RETURN count(n) AS lots
```

Returns `40`.

## Return properties, sorted

```cypher
MATCH (n:MilkLot)
RETURN n.milkLotLitres AS litres, n.milkLotCollectedOn AS day
ORDER BY litres DESC LIMIT 3
```

The three largest lots: 2,688, 2,651 and 2,614 litres, collected on 13, 15 and 17 September 2026.

## Filter

```cypher
MATCH (t:QualityTest)
WHERE t.qualityTestValue > 400000
RETURN t.qualityTestLotId AS lot, t.qualityTestValue AS value
ORDER BY value DESC LIMIT 3
```

One test is above the example limit used in the data (400,000): lot 5, at 455,500. This is the kind of question a validation rule then asks continuously; see [Concepts](/start/concepts/).

## Follow a relationship

```cypher
MATCH (l:MilkLot)-[:milkLotFarm]->(f:Farm)
RETURN f.farmName AS farm, count(l) AS lots
```

Lots per farm, for example Farm Elmfield with 3 and Farm Glenview with 3.

Name the relationship type to pick one link; leave it out (`-[r]->`) to follow any.

## Follow two relationships

```cypher
MATCH (t:QualityTest)-[:qualityTestMilkLot]->(l:MilkLot)-[:milkLotFarm]->(f:Farm)
RETURN f.farmName AS farm, count(t) AS tests
ORDER BY tests DESC LIMIT 3
```

Quality tests per farm, reached through the milk lot each test measured: Farm Elmfield, Farm Fernlea and Farm Cedar Hill have 6 each. The same question in a relational database is a three-table join; here it is a path.

## Return nodes

```cypher
MATCH (a:QualityTest)-[r]->(b:MilkLot) RETURN a, b LIMIT 2
```

Each node is returned as its identifier, for example `…#QualityTest/test_id=6` and `…#MilkLot/lot_id=1`. Use the identifier to look the node up, or to start a [traversal](/ai/mcp-tools/#traverse).

## What is not supported yet

GraphOWL implements a **documented subset** of Cypher and makes no conformance claim to openCypher or ISO GQL. Something outside the subset is refused with a `400` that names the construct, rather than answered wrongly:

```json
{"status": 400, "title": "Validation failed",
 "errors": [{"field": "query", "detail": "`a function call that is not a supported aggregate` is in the subset's grammar but has no lowering yet"}]}
```

Checked on the demo, this happens for `properties(n)` and for `type(r)` in a result or aggregate. Use a named relationship type instead of `type(r)`, or use [SPARQL](/guides/query-sparql/) when a pattern needs more than the subset offers. Two things to know:

- `MATCH (n) RETURN count(n)` without a label returns `0` on the demo; name a label.
- Results use the same typed-literal form as SPARQL (`"40"^^xsd:integer`); a client should read the datatype, not parse the text.
