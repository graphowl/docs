---
title: "Standards"
description: "What GraphOWL implements of each W3C standard, and what it does not, dated."
---

GraphOWL is built on W3C standards for graph data. This page says, for each one, what is implemented, what is not, and **when each fact was last checked**. A conformance claim without a date is not a claim, and standards move.

**Read this first.** Nothing here is a certified conformance claim. These are statements of what the product does, written by its authors. If something on this page is wrong, please [open an issue](https://github.com/graphowl/graphowl/issues/new/choose); a wrong row is a bug.

| Dated check | What it covers |
|---|---|
| 28 July 2026 (RDF 1.2 and SPARQL 1.2 rows re-checked 8 September 2026) | Status of each specification at w3.org |
| 21 September 2026, against a running deployment | What the product implements for SPARQL, SHACL and OWL 2 RL |
| 12 October 2026, against the product's source code and API specification | Which RDF formats can be imported and exported, and whether cardinality is enforced on write |

Anything not re-checked on a given date keeps its earlier date, so a stale row shows up as a stale row.

## Summary

| Standard | Status of the standard | GraphOWL |
|---|---|---|
| RDF data model | RDF 1.1 is a Recommendation; RDF 1.2 Concepts is a Candidate Recommendation (7 Apr 2026) | **Implemented** (triples and quads). **Aligned with** RDF 1.2 CR of 7 April 2026 for relationship reification; *not* described as "RDF 1.2 compliant". |
| Serialisations | Turtle, N-Triples, N-Quads, TriG, JSON-LD, RDF/XML | **Import:** Turtle, N-Triples and JSON-LD. **Export:** Turtle, JSON-LD, N-Triples and N-Quads. RDF/XML and TriG are not offered through the API. |
| SPARQL | SPARQL 1.1 is a Recommendation; SPARQL 1.2 is a Working Draft (2026) | **Implemented** for query. Built on permissively licensed open-source SPARQL components. No claim of SPARQL 1.2. |
| SHACL | SHACL (Core and SPARQL constraints, 20 Jul 2017) is a **Recommendation**; SHACL 1.2 is a Working Draft (Aug 2026) | **Implemented with stated gaps** — see below. Validates; does not yet derive (SHACL rules are not implemented). |
| OWL 2 RL | Profile of OWL 2, a Recommendation since 2012 | **Implemented** as a reasoner: what follows from the model's axioms (subclass, transitivity, inverse and so on) is derived and marked as derived. |
| SKOS | Recommendation | Vocabularies can be imported as SKOS. No conformance claim beyond import. |
| Cypher / GQL | openCypher; ISO/IEC 39075 (GQL) | A documented subset can be queried, and written to a workspace's own graph. **No conformance claim** to openCypher or ISO GQL. |

## The status of the specifications

RDF 1.2 Concepts and SPARQL 1.2 Federated Query are at Candidate Recommendation. The rest of the 2026 track (SPARQL 1.2 Query Language, Protocol and Entailment; SHACL 1.2 Core and SPARQL Extensions; the RDF 1.2 serialisations) is Working Draft and may change. **SHACL Core and SHACL-SPARQL as published in 2017 are already a Recommendation**, the tier beyond Candidate Recommendation, and are unaffected by SHACL 1.2 not yet being final.

RDF 1.2 Concepts' own text said it would not become a Recommendation before 5 May 2026. That date has passed and, at the check on 28 July 2026, it was still a Candidate Recommendation dated 7 April 2026. The earliest possible date in a Candidate Recommendation is a floor on the wait, not a forecast of it.

## SHACL, stated precisely (21 September 2026)

Against the SHACL Recommendation of 20 July 2017: Core (sections 1–4) and SPARQL-based constraints (sections 5–6).

| Feature | State |
|---|---|
| Targets: `sh:targetClass`, `sh:targetSubjectsOf`, `sh:targetObjectsOf`, `sh:targetNode`, implicit class targets | Implemented. Class targets follow `rdfs:subClassOf`, as the specification defines. |
| Non-validating characteristics: `sh:name`, `sh:description`, `sh:order`, `sh:group`, `sh:defaultValue` | Implemented: accepted and read. |
| Property-shape constraints: `sh:minCount`, `sh:maxCount`, `sh:minLength`, `sh:maxLength`, `sh:minInclusive`, `sh:maxInclusive`, `sh:pattern`, `sh:datatype`, `sh:nodeKind`, `sh:class`, `sh:hasValue`, `sh:in` | Implemented. |
| `sh:datatype` given as an IRI | Implemented (29 September 2026). An `xsd:date` value is checked as text. |
| Logical combinators `sh:and`, `sh:or`, `sh:not` | Implemented **over property-shape branches**, not over arbitrary shapes: a stated departure from the specification. |
| `sh:in` | Written as a **repeated predicate, not an RDF list**: a stated departure. |
| `sh:sparql` / `sh:SPARQLConstraint` | Implemented. |
| Reusable SPARQL constraint components (`sh:SPARQLConstraintComponent`, `sh:parameter`, `sh:labelTemplate`) | **Not implemented.** |
| `sh:closed` / `sh:ignoredProperties`, `sh:node`, property paths other than a plain predicate, `sh:qualifiedValueShape`, `sh:languageIn`, `sh:uniqueLang` | **Not implemented.** |
| SHACL rules and other SHACL 1.2 features | **Not implemented.** They exist only in Working Drafts. |
| Shapes written by a generated ontology model (named node shapes, sequence paths, a conditional rule, a record profile at warning severity) | **Written into the model, but not enforced by the engine.** |

## RDF 1.2 alignment

GraphOWL's reified relationship node is structurally an RDF 1.2 reifier, so alignment is additive rather than a migration. **Not yet implemented:** emitting `rdf:reifies` with triple terms, and `rdf:dirLangString` (language plus base direction). These were not re-checked on 12 October 2026 and keep their earlier state (not implemented).

## Other known gaps

- **Cardinality is enforced on write.** A predicate registered as single-valued rejects a second value. (Checked against the code on 12 October 2026.)
- **Federated query** (SPARQL 1.2 Federated Query) is not claimed.

## How to read "implemented"

It means the capability exists and is reachable in the running product. It does not mean it has been certified against the W3C test suites. If you need that assurance for a specific feature, ask, and we will tell you plainly whether it has been done.
