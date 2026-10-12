---
title: "Glossary"
description: "Plain definitions of the terms used across the documentation."
---

| Term | Meaning |
|---|---|
| **Fact** | One statement about a subject (subject, predicate, object), with its source and the time it became true or was retracted. |
| **Retract** | End a fact without deleting it. The earlier state stays queryable. |
| **Transaction time** | The moment a fact was recorded. `asOf` queries resolve a timestamp to the newest transaction at or before it. |
| **Workspace** | One team's sources, models and graph. Scopes what a request can read. |
| **Ontology** | The classes, properties and relations that give data meaning. |
| **Class / property / relation** | A kind of thing; a value it carries; a link to another thing. |
| **Entity / instance** | One actual thing: milk lot number 10. |
| **Glossary / vocabulary term** | A business word and its definition. |
| **Axiom** | A statement in the ontology the reasoner can use, such as "every `QualityTest` is a `Measurement`". |
| **Pack** | A bundle of ontology, glossary, rules and expectations for one domain. |
| **Proposal** | A change suggested by software or an agent. It has no effect until a person approves it. |
| **Derived fact** | A fact the reasoner concluded. Stored and marked as derived. |
| **Constraint / shape** | A rule the data must satisfy, checked by validation. |
| **Expectation** | A named quality check with a pass and fail count. |
| **Named graph** | A labelled set of facts, usually one per source or import. |
| **Virtual graph** | A source queried in place through a reviewed mapping. |
| **Asset** | A catalogued thing such as a service, database, schema, table or column. |
| **FQN** | Fully qualified name: the dotted path that identifies an asset, for example `dairy-coop-db.dairy_coop.dairy.milk_lot`. |
| **MCP** | Model Context Protocol: how an AI assistant calls tools on a server. |
| **Grant** | The list of capabilities an agent may use. |
| **Open mode** | A server with no identity provider configured: it accepts every request. For development only. |
| **SPARQL / openCypher / SHACL / OWL 2 RL** | W3C and graph-community standards for querying, constraining and reasoning. See [Standards](/reference/standards/). |
