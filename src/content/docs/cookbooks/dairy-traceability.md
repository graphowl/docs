---
title: "Cookbook: dairy traceability"
description: "Trace a failed quality test to the lots, batches and retailers affected."
---

**The question.** A quality test came back above the limit. Which milk lot was it, which production batches used that lot, and which retailers received those batches?

This is a recall trace. In a relational database it is a four-table join. In the graph it is a path.

## 1. Find the failing test

The data uses an example somatic cell count limit of 400,000. Which tests exceed it?

```sparql
PREFIX d: <https://graph-owl.dev/packs/source-dairy-coop-db#>
SELECT ?test ?v WHERE {
  GRAPH ?g { ?test a d:QualityTest ; d:qualityTestValue ?v . FILTER(?v > 400000) }
}
```

One test: `QualityTest/test_id=27`, at 455,500.

## 2. Which lot did it measure?

```sparql
PREFIX d: <https://graph-owl.dev/packs/source-dairy-coop-db#>
SELECT ?lot WHERE {
  GRAPH ?g { <https://graph-owl.dev/packs/source-dairy-coop-db#QualityTest/test_id=27> d:qualityTestMilkLot ?lot }
}
```

`MilkLot/lot_id=5`.

## 3. Follow the lot to the retailers

One query walks the whole path: test, lot, the batch lots that used it, their production batches, the sales of those batches, and the retailers.

```sparql
PREFIX d: <https://graph-owl.dev/packs/source-dairy-coop-db#>
SELECT DISTINCT ?retailerName ?batch WHERE {
  GRAPH ?g {
    <https://graph-owl.dev/packs/source-dairy-coop-db#QualityTest/test_id=27> d:qualityTestMilkLot ?lot .
    ?bl d:batchLotMilkLot ?lot ; d:batchLotProductionBatch ?batch .
    ?sale d:saleProductionBatch ?batch ; d:saleRetailer ?r .
    ?r d:retailerName ?retailerName
  }
} ORDER BY ?retailerName
```

The answer: lot 5 went into `ProductionBatch/batch_id=2`, which was sold to **Orchard Deli** and **Summit Foods**. Those are the two retailers to call.

## 4. Make the check permanent

A trace is a question asked once. A **constraint** asks it continuously: "no quality test may exceed the limit without a recorded decision". See the [rules cookbook](/cookbooks/compliance-rules/) and [Reason and validate](/guides/reasoning-and-validation/).

## 5. Ask it as an agent

With the [MCP server](/ai/mcp-overview/), the same question is `query_graph` or `traverse` from an assistant, and the answer cites the facts behind it.

## What this shows

- The path is stated in the data, not rebuilt from join keys each time.
- Every hop is a fact with a source, so the answer is traceable.
- The graph can answer the same question over history: add `asOf` to ask what you would have told the retailers last week ([Time travel](/guides/time-travel/)).

:::note
A long multi-hop **Cypher** pattern that mixed an incoming relationship with several hops ran for minutes on the demo's small machine, while the SPARQL form above answered promptly. Prefer SPARQL for long paths until [known limits](/reference/limits/) says otherwise.
:::
