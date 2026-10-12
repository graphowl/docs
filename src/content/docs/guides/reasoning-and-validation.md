---
title: "Reason and validate"
description: "Derive what follows from the model, and check data against constraints."
---

## Reasoning

![Stated facts and derived conclusions](/brand/reasoning.svg)

`POST /reasoning/runs` derives everything the asserted graph implies and **replaces the reasoning overlay**. The conclusions live in their own named graph, so they never mix with what was stated. The answer reports how many facts were derived and which rule produced each (for example `inverseOf` or `subClassOf`).

On the demo, a run derived 458 facts. For example, each herd's link to its breed produced the inverse link from the breed back to the herd (rule `inverseOf`).

| Route | What it answers |
|---|---|
| `POST /reasoning/runs` | derive everything and replace the overlay |
| `GET /reasoning/derived` | what the reasoner concluded about one subject |
| `GET /reasoning/explain` | why a fact holds, recursively, down to the assertions under it |

Reasoning follows OWL 2 RL. See [Standards](/reference/standards/) for exactly what is and is not covered. From an agent: `run_reasoning` and `explain`.

## Validation

Constraints (shapes) say what data must look like: a property is required, a value is in a range, a pattern matches.

| Route | What it does |
|---|---|
| `GET /validation/shapes` | list the constraints |
| `POST /validation/shapes/import` | import shapes (preview first with `/validation/shapes/preview`) |
| `POST /validation/runs` | validate the estate against every shape and replace the queue |
| `GET /validation/report` | current violations, worst first (paged with `limit` and `offset`) |
| `/validation/waivers` | record that a violation is accepted, and why |
| `/validation/expectations` | named quality checks with pass and fail counts |

```bash
curl "$URL/validation/report?limit=20" -H "Authorization: Bearer $TOKEN" -H "x-graphowl-workspace: dairy-coop"
```

```json
{"data": [], "limit": 50, "offset": 0, "total": 0, "computedAt": null}
```

An empty `data` with `computedAt: null` means validation has not run for this workspace, not that the data is clean: run it first.

## Validation never changes data

A run reports; it does not fix. A violation is a question for a person, who can fix the source, adjust the constraint, or record a waiver.

## What is enforced

Core constraints and SPARQL constraints, with stated gaps. See the [SHACL table](/reference/standards/).
