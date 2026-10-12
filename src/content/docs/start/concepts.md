---
title: "Concepts in ten minutes"
description: "The handful of ideas that explain how GraphOWL behaves."
---

## Facts, and their history

Everything in the graph is a **fact**: a statement about a subject, with where it came from and when it became true. Facts are never overwritten or deleted. A change **retracts** the old fact and adds a new one, so you can ask what was true at an earlier moment.

![Every fact keeps its history](/brand/time-travel.svg)

See [Time travel](/guides/time-travel/).

## Workspaces

A **workspace** holds one team's sources, models and graph. Requests name a workspace (the `x-graphowl-workspace` header), and what you can read is scoped to it. A workspace gathers many sources; add a new source to an existing workspace rather than making one workspace per source.

## Ontology, vocabulary, entity

Three things people often blur, kept apart on purpose:

| | Question it answers | Example |
|---|---|---|
| **Vocabulary term** | what do people here mean by this word? | "milk lot": a quantity of milk collected together |
| **Ontology class** | what kind of thing is it? | `MilkLot`, with properties and relations |
| **Entity** | what actual things exist? | milk lot number 10 |

## From a database to an ontology

![Tables become classes, columns become properties, foreign keys become relations](/brand/database-to-ontology.svg)

## Packs

A **pack** is a bundle of ontology, glossary, rules and expectations for a domain. A data catalog, a compliance rule set or a dairy model is a pack. The same engine serves all of them. See [Workspaces and packs](/guides/workspaces-and-packs/).

## Review before effect

Models proposed by software (for example, an ontology proposed from a database's tables) are **proposals** until a person approves them. Nothing a machine suggests changes what the graph claims on its own.

![Proposals flow to a review queue, then to the approved model, then to the graph](/brand/review-flow.svg)

## Reasoning, and what "derived" means

OWL 2 RL reasoning works out what follows from the model's axioms: if every `QualityTest` is a kind of `Measurement`, a quality test is also a measurement. Such conclusions are stored and **marked as derived**, so you can always tell what was stated from what was inferred.

![Stated facts and derived conclusions](/brand/reasoning.svg)

## Validation

Constraints and quality expectations check data against the model and report what does not fit, without changing it.

## Named graphs

Imported facts live in **named graphs**, one per source or import. A SPARQL pattern outside a `GRAPH` block reads only the default graph.

![Where facts live](/brand/named-graphs.svg)

## Virtual graphs

A **virtual graph** asks a source database *in place*, through a mapping a reviewer approved, rather than copying its rows into the graph. See [Virtual graphs](/guides/virtual-graphs/).

## Provenance

Every fact says where it came from: which source, which import, which person approved the model that gave it meaning.
