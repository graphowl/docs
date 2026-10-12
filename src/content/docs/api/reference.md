---
title: API reference
description: Every route of the GraphOWL HTTP API, grouped by area. Generated from the published OpenAPI description.
---

469 operations in 79 areas, generated from [`openapi.json`](https://github.com/graphowl/graphowl/blob/main/api/openapi.json). Request and response shapes are in that file; paste it into any OpenAPI viewer for the full detail.

## agents

| Method | Path | What it does |
|---|---|---|
| `GET` | `/agents/grants` | Every agent grant |
| `GET` | `/agents/{agent_id}/activity` | An agent's writes, including refused attempts |
| `DELETE` | `/agents/{agent_id}/grant` | Revoke an agent's capabilities |
| `GET` | `/agents/{agent_id}/grant` | What one agent may do |
| `PUT` | `/agents/{agent_id}/grant` | Grant or replace an agent's capabilities |

## alignments

| Method | Path | What it does |
|---|---|---|
| `POST` | `/alignments` | Write one cross-vocabulary alignment (skos:*Match or owl:equivalentClass) |
| `POST` | `/alignments/complex/closure` | The equivalences a set of correspondences implies (transitivity over equivalences only, weakest link of the best path), and any declared-disjoint members they join; stateless, stores nothing |
| `POST` | `/alignments/complex/rewrite` | Rewrite a SPARQL read query through a set of correspondences; 200 with verdict `rewritten` (the query and what was used) or `refused` (why); stateless, runs nothing |
| `GET` | `/alignments/review` | Alignments in decision 4's review band, resolved |

## assets

| Method | Path | What it does |
|---|---|---|
| `GET` | `/assets` | List assets; `?owner=` filters by effective owner, `?unowned=true` is the ownership-gap report |
| `POST` | `/assets` | Create or update an asset by FQN |
| `GET` | `/assets/roots` | List root assets |
| `GET` | `/assets/search` | Search assets |
| `GET` | `/assets/stats` | Asset counts by kind |
| `POST` | `/assets/{fqn}/schema-change` | **Reports, never blocks** (decision 3) |
| `GET` | `/assets/{fqn}/successor` | Terminal successor |
| `DELETE` | `/assets/{id}` | Soft-delete an asset and its subtree, reporting how many were tombstoned |
| `GET` | `/assets/{id}` | Fetch an asset |
| `PATCH` | `/assets/{id}` | Update an asset |
| `GET` | `/assets/{id}/activity` | Field changes and collaboration events, merged and ordered |
| `GET` | `/assets/{id}/analytics` | The neighbourhood around an asset |
| `GET` | `/assets/{id}/ancestors` | An asset's ancestors |
| `GET` | `/assets/{id}/announcements` | Every announcement ever posted against an entity |
| `POST` | `/assets/{id}/announcements` | Post a time-boxed announcement |
| `GET` | `/assets/{id}/announcements/active` | Announcements live right now, inherited from ancestors |
| `GET` | `/assets/{id}/change-proposals` | Change proposals on an entity, status-filterable |
| `POST` | `/assets/{id}/change-proposals` | Propose a field change — no write permission required |
| `GET` | `/assets/{id}/children` | An asset's children |
| `GET` | `/assets/{id}/contradictions` | Open disagreements about this asset; nothing is resolved and nothing is hidden |
| `GET` | `/assets/{id}/data-products` | Asset products |
| `DELETE` | `/assets/{id}/domain` | Delete asset domain |
| `GET` | `/assets/{id}/domain` | Asset domain |
| `POST` | `/assets/{id}/domain` | Assign asset domain |
| `DELETE` | `/assets/{id}/followers/{user_id}` | Stop following an asset |
| `PUT` | `/assets/{id}/followers/{user_id}` | Follow an asset; idempotent, so a second follow is also 200 |
| `GET` | `/assets/{id}/graph` | The neighbourhood around an asset |
| `POST` | `/assets/{id}/lifecycle` | Replace lifecycle |
| `GET` | `/assets/{id}/lpg-node` | One asset's own facts as a property-graph node |
| `GET` | `/assets/{id}/memories` | What we know about this asset, best first, each flagged for staleness |
| `GET` | `/assets/{id}/owners` | Who owns this asset |
| `PUT` | `/assets/{id}/owners` | Set who owns this asset; an empty list makes it unowned |
| `POST` | `/assets/{id}/resolve` | Resolve this asset against its blocking-key candidates |
| `POST` | `/assets/{id}/restore` | Restore a soft-deleted asset |
| `GET` | `/assets/{id}/threads` | Threads on an entity, resolved-filterable |
| `POST` | `/assets/{id}/threads` | Start a thread with its opening message |
| `GET` | `/assets/{id}/versions` | An asset's version history |

## auth

| Method | Path | What it does |
|---|---|---|
| `GET` | `/auth/config` | How to authenticate against this server |

## business-metrics

| Method | Path | What it does |
|---|---|---|
| `GET` | `/business-metrics` | Every metric, paginated |
| `POST` | `/business-metrics` | Create a metric |
| `GET` | `/business-metrics/search` | Search metrics by name, definition, or defining term |
| `DELETE` | `/business-metrics/{id}` | Delete a metric |
| `GET` | `/business-metrics/{id}` | Fetch a metric |
| `PATCH` | `/business-metrics/{id}` | Update a metric's definition, formula, unit, granularity or calculation type |
| `PUT` | `/business-metrics/{id}/sources` | Replace a metric's declared sources, reconciled by source |

## certification-types

| Method | Path | What it does |
|---|---|---|
| `GET` | `/certification-types` | Certification types |
| `POST` | `/certification-types` | Create certification type |

## certifications

| Method | Path | What it does |
|---|---|---|
| `GET` | `/certifications/{targetFqn}` | Certifications on |
| `POST` | `/certifications/{targetFqn}` | Issue certification |

## change-proposals

| Method | Path | What it does |
|---|---|---|
| `GET` | `/change-proposals` | Every change proposal catalog-wide, status-filterable — for a review queue |
| `POST` | `/change-proposals/{id}/accept` | Accept a proposal — applied and attributed to the proposer |
| `POST` | `/change-proposals/{id}/reject` | Reject a proposal; reason required |

## classifications

| Method | Path | What it does |
|---|---|---|
| `GET` | `/classifications` | Classifications |
| `POST` | `/classifications` | Create classification |
| `DELETE` | `/classifications/{id}` | Delete classification |
| `POST` | `/classifications/{id}/tags` | Create tag |

## collections

| Method | Path | What it does |
|---|---|---|
| `DELETE` | `/collections/{id}` | Delete a collection; its member concepts are untouched |
| `PATCH` | `/collections/{id}` | Rename, redefine, reorder or re-member a collection |

## complex-alignments

| Method | Path | What it does |
|---|---|---|
| `GET` | `/complex-alignments` | The workspace's stored correspondences, narrowed by `status` and `relation`; each carries its derived kind, both sides in words, and whether a query can be rewritten through it |
| `POST` | `/complex-alignments` | Propose a correspondence: stored as `proposed` (201), or 200 with `created: false` when the id exists; a correspondence a person could not make is 400 |
| `POST` | `/complex-alignments/check` | Rewrite through the workspace's accepted correspondences, run the original and the rewrite in the workspace's scope, and compare the answers: `agree`, `differ` (with a sample of rows only one side has) or `cannotCompare` (with why: both empty, truncated, not a SELECT, or one could not run). Read-only |
| `GET` | `/complex-alignments/closure` | The equivalences the workspace's accepted correspondences imply, with their paths |
| `GET` | `/complex-alignments/coverage` | How much of a vocabulary's saved model (`glossary=`) the workspace's alignments reach: each class and property aligned and accepted, aligned only by proposals, or not reached; 404 if the vocabulary has no saved model |
| `POST` | `/complex-alignments/import/edoal` | Import an EDOAL alignment (RDF/XML, the request body) as proposals: nothing is accepted. Reads classes, and/or, and attribute-value restrictions with `equals`; every other construct, and the relations `%` and `HasInstance`, is reported by cell and name. Without `curated=true` every cell is a computed match (an equivalence becomes a close match); only a person may pass `curated` (403 for a service account); 400 if the file cannot be read at all |
| `POST` | `/complex-alignments/import/sssom` | Import an SSSOM/TSV mapping set (the request body, as text) as proposals: nothing is accepted. Only `semapv:ManualMappingCuration` is read as a person's decision, so any other equivalence becomes a close match; a row that cannot be read is reported by line and the rest are stored; 400 if the file cannot be read at all |
| `POST` | `/complex-alignments/rewrite` | Rewrite a SPARQL read query through the workspace's accepted correspondences; 200 with verdict `rewritten` or `refused` |
| `POST` | `/complex-alignments/{id}/decision` | A person accepts or rejects a correspondence; a service account is refused (403) |
| `GET` | `/complex-alignments/{id}/explain` | One correspondence, or a `derived:a+b` path, in words |

## concept-schemes

| Method | Path | What it does |
|---|---|---|
| `DELETE` | `/concept-schemes/{id}` | Delete a concept scheme; its concepts stay, unassigned |
| `PATCH` | `/concept-schemes/{id}` | Rename or redefine a concept scheme |

## connectors

| Method | Path | What it does |
|---|---|---|
| `GET` | `/connectors/configs` | Every connector configuration, without credentials |
| `POST` | `/connectors/configs` | Save a connector configuration; the credential is write-only |
| `POST` | `/connectors/databricks/runs` | Catalogue a Databricks catalog and schema, through a SQL warehouse |
| `GET` | `/connectors/disconnected` | The sources that are disconnected, by service name |
| `POST` | `/connectors/postgres/runs` | Catalogue a Postgres source |
| `GET` | `/connectors/runs` | Recent connector runs, newest first |
| `GET` | `/connectors/{connector}/schema` | What a connector needs configured, as JSON Schema |
| `POST` | `/connectors/{connector}/test` | Try a connection before saving it; a refused connection is 200 with ok:false |

## context

| Method | Path | What it does |
|---|---|---|
| `GET` | `/context/{version}` | The JSON-LD @context compacted output points at by URL |

## contracts

| Method | Path | What it does |
|---|---|---|
| `GET` | `/contracts` | Contracts |
| `POST` | `/contracts` | Create contract |
| `GET` | `/contracts/{id}` | Contract |
| `DELETE` | `/contracts/{id}/breaches` | Delete contract breaches |
| `GET` | `/contracts/{id}/slas` | Evaluate slas |
| `POST` | `/contracts/{id}/status` | Replace contract status |

## contradictions

| Method | Path | What it does |
|---|---|---|
| `POST` | `/contradictions/reviews` | Confirm or dismiss a candidate contradiction; confirming does not close it |

## custom-properties

| Method | Path | What it does |
|---|---|---|
| `GET` | `/custom-properties` | Custom property definitions, optionally for one entity type |
| `POST` | `/custom-properties` | Define an organization-specific property on an entity type |
| `DELETE` | `/custom-properties/{id}` | Delete a custom property definition, refused while values exist |
| `PATCH` | `/custom-properties/{id}` | Update custom property |

## cypher

| Method | Path | What it does |
|---|---|---|
| `POST` | `/cypher` | Run a Cypher query |
| `POST` | `/cypher/write` | Change the workspace's own graph with Cypher: CREATE, MERGE, SET, REMOVE, DELETE; dryRun reports the counts and writes nothing |

## data-products

| Method | Path | What it does |
|---|---|---|
| `GET` | `/data-products` | Data products |
| `POST` | `/data-products` | Create data product |
| `DELETE` | `/data-products/{id}` | Delete data product |
| `GET` | `/data-products/{id}` | Data product |
| `PATCH` | `/data-products/{id}` | Update data product |
| `GET` | `/data-products/{id}/assets` | Product assets |
| `DELETE` | `/data-products/{id}/assets/{assetId}` | Delete product asset |
| `PUT` | `/data-products/{id}/assets/{assetId}` | Create product asset |

## domains

| Method | Path | What it does |
|---|---|---|
| `GET` | `/domains` | Domains |
| `POST` | `/domains` | Create domain |
| `DELETE` | `/domains/{id}` | Delete domain |
| `GET` | `/domains/{id}` | Domain |
| `PATCH` | `/domains/{id}` | Update domain |
| `GET` | `/domains/{id}/assets/count` | Count domain assets |
| `GET` | `/domains/{id}/children` | Child domains |

## drift

| Method | Path | What it does |
|---|---|---|
| `GET` | `/drift` | Drift items awaiting review, pending first |
| `POST` | `/drift/reports` | Push a drift report — one or more items, each naming its own asset |
| `POST` | `/drift/{id}/apply` | Write a drift item's declared value to live state |
| `POST` | `/drift/{id}/ignore` | Review a drift item and deliberately leave it as-is |

## extraction

| Method | Path | What it does |
|---|---|---|
| `POST` | `/extraction/claims/{id}/decision` | Confirm or reject a queued claim |
| `GET` | `/extraction/queue` | Claims awaiting confirmation, each with the sentence it came from |
| `POST` | `/extraction/runs` | Submit a parsed document and the claims drawn from it |
| `DELETE` | `/extraction/runs/{id}` | Delete an extraction run and everything it produced |

## facts

| Method | Path | What it does |
|---|---|---|
| `GET` | `/facts` | The facts log, with its facets, histogram and patterns |

## findings

| Method | Path | What it does |
|---|---|---|
| `GET` | `/findings` | The reconciliation findings queue, optionally scoped to one pack and status |
| `POST` | `/findings` | Record a reconciliation run's findings (admin only; idempotent while a matching finding is still pending) |
| `POST` | `/findings/forget` | Withdraw one pack's findings about the named subjects, retracting their flakes — the scope re-running a single customer needs, where a pack-wide reset would empty every other customer's queue |
| `POST` | `/findings/{id}/decision` | Accept or dismiss a finding, recorded against the calling principal |
| `GET` | `/findings/{id}/evidence-graph` | The subgraph reachable from a finding's own subject — nodes and edges computed by traversal, not the rule's flat evidence list |

## glossaries

| Method | Path | What it does |
|---|---|---|
| `GET` | `/glossaries` | Every glossary |
| `POST` | `/glossaries` | Create a glossary |
| `POST` | `/glossaries/bundle` | Restore a vocabulary from an exported bundle |
| `DELETE` | `/glossaries/{id}` | Delete a glossary; `409` naming its term count unless `recursive=true` |
| `GET` | `/glossaries/{id}` | Fetch a glossary |
| `GET` | `/glossaries/{id}/amendments` | Every revision of any term's wording in one glossary — what it said before, who changed it, and their words — most recent first |
| `GET` | `/glossaries/{id}/brief` | A vocabulary's brief — purpose, audience, scope, sources and the questions the model must answer — or an empty one |
| `PUT` | `/glossaries/{id}/brief` | Replace a vocabulary's brief; a field over its length limit is refused by name |
| `GET` | `/glossaries/{id}/bundle` | Export the whole vocabulary — pack, terms, brief, model, schemes, interviews — as one re-importable document |
| `GET` | `/glossaries/{id}/citations` | Every cited term of a glossary: the source and the place in it |
| `GET` | `/glossaries/{id}/collections` | A glossary's SKOS collections, each with its members in order |
| `POST` | `/glossaries/{id}/collections` | Create a SKOS collection; membership never implies broader |
| `GET` | `/glossaries/{id}/concept-details` | Every saved concept detail in a glossary |
| `GET` | `/glossaries/{id}/concept-schemes` | A glossary's concept schemes |
| `POST` | `/glossaries/{id}/concept-schemes` | Make a concept scheme inside a glossary |
| `POST` | `/glossaries/{id}/erase` | Report what deleting a vocabulary would take; `force=true` deletes it, its pack, and what was built from it (virtual graphs over its sources, alignments naming its terms, conclusions drawn about it) unless `keep` names them |
| `GET` | `/glossaries/{id}/health` | A glossary's vocabulary health: each SKOS integrity or quality issue, its terms and its fix |
| `GET` | `/glossaries/{id}/interviews` | A vocabulary's discovery interviews — your own, or all of them for an administrator |
| `POST` | `/glossaries/{id}/interviews` | Start a discovery interview; mode is metadata (default) or samples |
| `GET` | `/glossaries/{id}/ontology-model` | A vocabulary's ontology model — CBox record and questions, TBox classes, properties and constraints, ABox individuals — or an empty one at version 0 |
| `PUT` | `/glossaries/{id}/ontology-model` | Save the whole ontology model, made against the version it was read at; 409 when someone saved since |
| `POST` | `/glossaries/{id}/ontology-model/check-draft` | Check a model that is not saved: what stops it being saved (`problems`) and the findings that need no generated graph, with the saved version it was weighed against. Generates nothing, runs no question and keeps nothing |
| `POST` | `/glossaries/{id}/ontology-model/check-findings/decision` | Dismiss or accept a finding of the latest run, with a reason; the key rides in the body (admin only) |
| `POST` | `/glossaries/{id}/ontology-model/check-findings/reopen` | Take a decision on a finding back, so it is open again (admin only) |
| `GET` | `/glossaries/{id}/ontology-model/checks` | A vocabulary's check runs, newest first, without their findings |
| `POST` | `/glossaries/{id}/ontology-model/checks` | Check the saved model — generate its graph (unless `?generate=false`, which checks the graph as it stands), run every competency question, evaluate the record — and keep the run; what could not be done is listed in `skipped` (admin only) |
| `GET` | `/glossaries/{id}/ontology-model/checks/latest` | The most recent check run with its findings, what was resolved since the run before, whether the model has been saved since, and the decisions held; 404 when never checked |
| `GET` | `/glossaries/{id}/ontology-model/checks/{run}` | One check run with its findings |
| `GET` | `/glossaries/{id}/ontology-model/diff` | What changed between two saved versions of the model (`from`, `to`) |
| `POST` | `/glossaries/{id}/ontology-model/findings` | Record each place the model's data breaks one of the model's own rules as a finding (idempotent) |
| `POST` | `/glossaries/{id}/ontology-model/generate` | Generate the TBox and ABox graphs from the saved model, replacing the last generation |
| `GET` | `/glossaries/{id}/ontology-model/lpg` | The model's data as a property graph: json (default), or a cypher, graphml or jsonl file |
| `POST` | `/glossaries/{id}/ontology-model/materialise` | Run a saved table mapping over every row of its table and write the result as RDF into a graph of its own, or report what would land (`dryRun`) (admin only) |
| `GET` | `/glossaries/{id}/ontology-model/proposals` | A vocabulary's proposed changes to its model, newest first, each as a diff against the model as it is now (admin only) |
| `POST` | `/glossaries/{id}/ontology-model/proposals` | Propose a change to a model: the whole proposed model and a sentence why; nothing is applied (admin only) |
| `POST` | `/glossaries/{id}/ontology-model/proposals/{proposal}/decision` | Record a decision on an open proposal: loaded or dismissed (admin only) |
| `GET` | `/glossaries/{id}/ontology-model/rdf` | What the model built as RDF: a preview, or the whole file with download=true (show: ontology, data, everything; format: turtle, ntriples, jsonld) |
| `POST` | `/glossaries/{id}/ontology-model/rdf/replace` | Replace the part of the model `show` names (ontology, rules, vocabulary, data, everything, model) with the Turtle, N-Triples or JSON-LD in the body, and report what changed and what stayed the same; dryRun=true writes nothing |
| `GET` | `/glossaries/{id}/ontology-model/turtle` | The Turtle the saved model generates, TBox and ABox, without loading it |
| `POST` | `/glossaries/{id}/ontology-model/validate` | Run the model's own constraints over the data under it — the generated individuals and the RDF loaded for the model (admin only) |
| `GET` | `/glossaries/{id}/ontology-model/versions` | Every version the model has been saved at, oldest first |
| `GET` | `/glossaries/{id}/ontology-model/versions/{version}` | The model as it was at one saved version |
| `GET` | `/glossaries/{id}/placements` | Where each of a glossary's concepts is placed: scheme, is-a check, exclusion |
| `GET` | `/glossaries/{id}/terms` | Every term in a glossary |
| `POST` | `/glossaries/{id}/terms` | Create a term in a glossary |
| `GET` | `/glossaries/{id}/transitions` | Every recorded lifecycle move for a glossary's terms, most recent first |
| `GET` | `/glossaries/{id}/wording-proposals` | A glossary's model-drafted wording and names, each naming the model and its state, for the Modeller's term rows |

## glossary-terms

| Method | Path | What it does |
|---|---|---|
| `GET` | `/glossary-terms/search` | Search terms by name, synonym, abbreviation or definition |
| `DELETE` | `/glossary-terms/{id}` | Delete a term |
| `GET` | `/glossary-terms/{id}` | Fetch a term |
| `PATCH` | `/glossary-terms/{id}` | Update a term's definition, synonyms or abbreviations |
| `GET` | `/glossary-terms/{id}/amendments` | Every revision of an approved term's wording — what it said before, who changed it, and their words — most recent first |
| `GET` | `/glossary-terms/{id}/detail` | A concept's full SKOS detail: labels in other languages, notes, notation, sources and Dublin Core |
| `PUT` | `/glossary-terms/{id}/detail` | Replace a concept's SKOS detail; one preferred label per language |
| `POST` | `/glossary-terms/{id}/mapping-proposals` | Propose a correction to a term's OWL mapping, with its evidence |
| `PUT` | `/glossary-terms/{id}/placement` | Set a concept's scheme, its passed is-a check, or its documented exclusion |
| `PATCH` | `/glossary-terms/{id}/relation-proposals` | Approve or reject a proposed relation |
| `POST` | `/glossary-terms/{id}/relation-proposals` | Propose a SKOS relation for review, with the evidence for it |
| `DELETE` | `/glossary-terms/{id}/relations` | Retract a relation this term declared |
| `GET` | `/glossary-terms/{id}/relations` | Every relation visible on this term, derived inverses included |
| `POST` | `/glossary-terms/{id}/relations` | Assert a SKOS relation, owned by this term |
| `GET` | `/glossary-terms/{id}/reviewers` | A term's assigned reviewers |
| `PUT` | `/glossary-terms/{id}/reviewers` | Replace a term's assigned reviewers |
| `POST` | `/glossary-terms/{id}/source` | Cite the source and location a term came from |
| `POST` | `/glossary-terms/{id}/transitions` | Move a term through its review workflow |
| `DELETE` | `/glossary-terms/{id}/usage` | Detach a term from an asset or column |
| `GET` | `/glossary-terms/{id}/usage` | Every asset or column this term is attached to |
| `POST` | `/glossary-terms/{id}/usage` | Attach a term to an asset or column, by FQN |

## graph

| Method | Path | What it does |
|---|---|---|
| `POST` | `/graph/context` | The neighbourhood around any subject, catalog asset or not |
| `POST` | `/graph/context/analytics` | Connectivity for any subject, catalog asset or not |
| `GET` | `/graph/export/bulk-csv` | Export the caller's authorized estate as Neo4j bulk-import CSV, bundled as .tar.zst |
| `GET` | `/graph/export/cypher` | Export the caller's authorized estate as a batched, idempotent Cypher script |
| `GET` | `/graph/export/graphml` | Export the caller's authorized estate as GraphML |
| `GET` | `/graph/export/json-graph` | Export the caller's authorized estate as one JSON graph view |
| `GET` | `/graph/export/jsonl` | Export the caller's authorized estate as JSON Lines |
| `GET` | `/graph/export/preview` | Count what an export would contain, without writing anything |
| `GET` | `/graph/export/rdf` | Export the caller's authorized estate as RDF (turtle, jsonld, ntriples, or nquads) |
| `DELETE` | `/graph/import/rdf` | Delete import route |
| `POST` | `/graph/import/rdf` | Import an RDF document into a named import graph (admin only) |
| `POST` | `/graph/import/rdf/subjects` | List what an RDF document describes, per subject, from a parse alone — nothing is written (admin only) |
| `GET` | `/graph/materialised` | Preview a pack's materialised knowledge graph: Turtle, counts and entities for one view of it |
| `POST` | `/graph/paths` | Routes between two nodes |
| `POST` | `/graph/reconcile` | Repair the graph projection |

## health

| Method | Path | What it does |
|---|---|---|
| `GET` | `/health` | Liveness |
| `GET` | `/health/{fqn}` | Asset health |

## inbox

| Method | Path | What it does |
|---|---|---|
| `GET` | `/inbox` | The 'waiting on you' feed — pending items merged from agent proposals, change proposals, the resolution queue, findings and extraction claims |

## ingest

| Method | Path | What it does |
|---|---|---|
| `POST` | `/ingest` | Push entities in one call; 207 with per-item status, partial success |
| `POST` | `/ingest/batch` | Upload a JSONL or CSV batch; 202 with a job handle to poll |
| `DELETE` | `/ingest/jobs/{id}` | Ask a batch job to stop; the response says what had landed |
| `GET` | `/ingest/jobs/{id}` | How a batch job is doing: state, counts, and per-row failures |

## interviews

| Method | Path | What it does |
|---|---|---|
| `GET` | `/interviews/{session}` | One interview with every question and answer, withdrawn answers included |
| `POST` | `/interviews/{session}/answers` | Record the answer to the question just shown: a choice, your own words, or not knowing |
| `GET` | `/interviews/{session}/artifacts` | The latest version of each kind of artefact a discovery interview holds, in the order the interview produces them |
| `POST` | `/interviews/{session}/artifacts` | Save what a stage of the gated discovery interview produced (scope, cqContract, requirements, evidence, modelAssessment, gaps, candidates, proposals, validation) as the next version of its kind; seen only by whoever ran the interview and an administrator |
| `GET` | `/interviews/{session}/artifacts/{kind}` | One kind of artefact of a discovery interview: the latest, or `?version=` for an earlier one (404 when there is none) |
| `POST` | `/interviews/{session}/back` | Withdraw the latest standing answer; it stays in the transcript, marked |
| `POST` | `/interviews/{session}/status` | Mark an interview active, complete or abandoned, and record the schema fingerprint it was built from |

## label-suggestions

| Method | Path | What it does |
|---|---|---|
| `GET` | `/label-suggestions` | Label suggestions |

## labels

| Method | Path | What it does |
|---|---|---|
| `GET` | `/labels/{targetFqn}` | Labels on |
| `POST` | `/labels/{targetFqn}` | Apply tag label |
| `DELETE` | `/labels/{targetFqn}/{tagFqn}` | Delete tag label |
| `POST` | `/labels/{targetFqn}/{tagFqn}/confirm` | Confirm label |
| `POST` | `/labels/{targetFqn}/{tagFqn}/propagate` | Propagate label |
| `POST` | `/labels/{targetFqn}/{tagFqn}/reject` | Reject label |

## lineage

| Method | Path | What it does |
|---|---|---|
| `POST` | `/lineage` | Assert that one asset feeds another |
| `GET` | `/lineage/asset/{id}` | The lineage graph around an asset, bounded upstream and downstream |
| `POST` | `/lineage/reconcile` | Reconcile lineage |
| `DELETE` | `/lineage/{id}` | Remove a lineage edge |
| `GET` | `/lineage/{id}/columns` | Column mappings |
| `PUT` | `/lineage/{id}/columns` | Replace column mappings |

## mapping-proposals

| Method | Path | What it does |
|---|---|---|
| `GET` | `/mapping-proposals` | Every OWL-mapping correction waiting for a decision, with its evidence |
| `PATCH` | `/mapping-proposals/{id}` | Approve or reject a mapping correction; approving applies it |

## mcp

| Method | Path | What it does |
|---|---|---|
| `POST` | `/mcp` | MCP tools over JSON-RPC 2.0 |
| `GET` | `/mcp/calls` | Mcp recent calls |
| `GET` | `/mcp/usage` | Mcp tool usage |

## me

| Method | Path | What it does |
|---|---|---|
| `GET` | `/me` | The caller's own resolved identity |

## memories

| Method | Path | What it does |
|---|---|---|
| `GET` | `/memories` | Cross-entity memory search, for administration |
| `POST` | `/memories` | Write down organizational knowledge |
| `GET` | `/memories/{id}` | One memory, superseded or not |
| `POST` | `/memories/{id}/mentions` | Resolve a textual mention found in this memory against the catalog |
| `POST` | `/memories/{id}/retract` | Mark a memory as no longer believed, without replacing it |
| `POST` | `/memories/{id}/supersede` | Correct a memory, keeping the original readable |

## merges

| Method | Path | What it does |
|---|---|---|
| `POST` | `/merges/{id}/split` | Reverse a merge, restoring both entities |

## model-findings

| Method | Path | What it does |
|---|---|---|
| `PATCH` | `/model-findings/{id}` | Keep or dismiss a whole-model finding as one, recorded with the person's name; a grouping is kept in the Modeller |

## namespaces

| Method | Path | What it does |
|---|---|---|
| `GET` | `/namespaces` | Every vocabulary this deployment understands beyond the shipped set |
| `POST` | `/namespaces` | Declare a vocabulary IRI and get the namespace code it resolves to (admin only; idempotent by IRI) |

## ontology

| Method | Path | What it does |
|---|---|---|
| `POST` | `/ontology/compile` | Compile a semantic model to Turtle, or refuse it and say why |
| `GET` | `/ontology/profile` | Which OWL profiles the TBox belongs to, and which POST /reasoning/runs would route to |

## ontology-editor

| Method | Path | What it does |
|---|---|---|
| `POST` | `/ontology-editor/dry-run` | The explicit 'Check' button — shapes and reasoning, matching the policy editor's own non-debounced dry run |
| `POST` | `/ontology-editor/preview` | The fast, as-the-author-types path — parse only, no shapes or reasoning, no `State<Catalog>` needed since noth |
| `POST` | `/ontology-editor/save` | Saves the editor's current document as `ONTOLOGY_EDITOR_SOURCE`'s current state, through the existing import p |

## ontology-imports

| Method | Path | What it does |
|---|---|---|
| `GET` | `/ontology-imports` | List the ontology imports kept on this deployment |
| `POST` | `/ontology-imports` | Keep an ontology document for a later comparison |
| `POST` | `/ontology-imports/resolve` | Resolve a kept import's differences against a pack |
| `DELETE` | `/ontology-imports/{import_id}` | Forget a kept ontology import |
| `POST` | `/ontology-imports/{import_id}/compare/{pack}` | Compare a kept import against a pack's installed ontology |

## ontology-models

| Method | Path | What it does |
|---|---|---|
| `POST` | `/ontology-models/orphans/cleanup` | Remove the graphs a vocabulary's model generated when that vocabulary no longer exists (what deleting one used to leave behind); `dryRun` lists them without removing anything. A live vocabulary's graphs are never touched (admin only) |

## ontology-packs

| Method | Path | What it does |
|---|---|---|
| `GET` | `/ontology-packs` | Every imported pack |
| `POST` | `/ontology-packs` | Import a SKOS vocabulary as a new pack version — the Turtle document is the whole body |
| `POST` | `/ontology-packs/bundle` | Restore a pack from an exported bundle |
| `DELETE` | `/ontology-packs/{id}` | Report what removing a pack would affect; `force=true` removes it |
| `GET` | `/ontology-packs/{id}` | One imported pack |
| `GET` | `/ontology-packs/{id}/bundle` | Export the pack, its sources and its finding rules as one re-importable document |
| `POST` | `/ontology-packs/{id}/compare` | Compare an uploaded document against a pack's ontology |
| `POST` | `/ontology-packs/{id}/conflicts/queue` | Put a document's ontology conflicts in the review queue |
| `POST` | `/ontology-packs/{id}/merge` | Execute an accepted ontology merge |
| `GET` | `/ontology-packs/{id}/overrides` | Every local customization on a pack |
| `POST` | `/ontology-packs/{id}/overrides` | Add a local customization without forking the pack |
| `DELETE` | `/ontology-packs/{id}/overrides/{override_id}` | Remove a local customization; the pack's own value applies again |
| `POST` | `/ontology-packs/{id}/regenerate` | Report what regenerating this pack would change, installed and on disk |
| `POST` | `/ontology-packs/{id}/reset` | Report what resetting this pack would remove; `force=true` removes it |
| `GET` | `/ontology-packs/{id}/terms` | Every term a pack imported, with overrides applied |
| `POST` | `/ontology-packs/{id}/upgrade` | Diff a candidate new version and, unless `dryRun=true`, apply it |

## overview

| Method | Path | What it does |
|---|---|---|
| `GET` | `/overview` | Everything the landing page needs |

## packs

| Method | Path | What it does |
|---|---|---|
| `GET` | `/packs/available` | Available packs |
| `POST` | `/packs/{id}/import/glossary` | Import glossary terms from an uploaded file |
| `GET` | `/packs/{pack}/axiom-proposals` | List a pack's axiom proposals and their decisions |
| `POST` | `/packs/{pack}/axiom-proposals` | Propose a structural OWL axiom, queued for a person to decide |
| `PATCH` | `/packs/{pack}/axiom-proposals/{id}` | Approve or reject an axiom proposal |
| `GET` | `/packs/{pack}/axioms` | A pack's axioms.ttl as it is on disk |
| `POST` | `/packs/{pack}/candidates` | What else a pack's blocking strategies say might be this |
| `GET` | `/packs/{pack}/competency-coverage` | Which of a pack's declared queries currently answer, and which are empty |
| `GET` | `/packs/{pack}/console` | Pack console config |
| `GET` | `/packs/{pack}/definition-drift` | Which of a pack's definitions its glossary.ttl and ontology.ttl state differently from the approved terms; nothing is written |
| `POST` | `/packs/{pack}/definition-drift/apply` | Bring a pack's documents' definitions into line with the approved terms, one literal at a time, writing only what changed |
| `GET` | `/packs/{pack}/expectations` | A pack's expectations.ttl as it is on disk |
| `GET` | `/packs/{pack}/finding-rules` | Every finding rule registered for one pack (admin only) |
| `POST` | `/packs/{pack}/finding-rules` | Register a pack's [[findings]] rules for the native reconcile engine (admin only; upsert per rule label) |
| `DELETE` | `/packs/{pack}/finding-rules/{label}` | Run one of a pack's registered `[[queries]]` by name, with caller-supplied bindings |
| `GET` | `/packs/{pack}/glossary` | A pack's glossary.ttl as it is on disk — what a merge appends to |
| `PUT` | `/packs/{pack}/glossary` | Write a pack's glossary file, refusing a document that would drop triples |
| `POST` | `/packs/{pack}/install` | Install pack |
| `GET` | `/packs/{pack}/obligations` | A pack's open obligations, due date first.md |
| `GET` | `/packs/{pack}/ontology` | A pack's ontology.ttl as it is on disk — what a merge appends to |
| `PUT` | `/packs/{pack}/ontology` | Write a pack's ontology file, refusing a document that would drop triples |
| `GET` | `/packs/{pack}/queries` | Every query a pack declares, with its SPARQL and its required bindings — the read half needed to review a pack somebody else wrote |
| `POST` | `/packs/{pack}/queries` | Register a pack's `[[queries]]`.md`), the named-quer |
| `POST` | `/packs/{pack}/queries/{name}/run` | Run pack query route |
| `POST` | `/packs/{pack}/reconcile` | Evaluate a pack's registered rules and record what they conclude (admin only) |
| `POST` | `/packs/{pack}/suggest-owl-model` | Draft an OWL model from a pack's glossary, read-only |

## policies

| Method | Path | What it does |
|---|---|---|
| `GET` | `/policies` | Every stored policy, with the roles it applies to |
| `POST` | `/policies` | Create or update a policy, replacing which roles it applies to |
| `POST` | `/policies/dry-run` | What a policy would do to the estate, without saving it |
| `DELETE` | `/policies/{name}` | Remove a policy |

## posts

| Method | Path | What it does |
|---|---|---|
| `DELETE` | `/posts/{id}` | Tombstone a post — author only |
| `PATCH` | `/posts/{id}` | Edit a post — author only, inside the edit window |
| `GET` | `/posts/{id}/reactions` | Reaction counts on a post, by kind |
| `POST` | `/posts/{id}/reactions` | Toggle a reaction — a repeat removes it |

## predicates

| Method | Path | What it does |
|---|---|---|
| `POST` | `/predicates` | Define a predicate a pack asserts |

## proposals

| Method | Path | What it does |
|---|---|---|
| `GET` | `/proposals` | Agent proposals awaiting a human |
| `GET` | `/proposals/{id}` | One proposal |
| `POST` | `/proposals/{id}/accept` | Accept a proposal — applied with the agent as author |
| `POST` | `/proposals/{id}/reject` | Reject a proposal — nothing is applied |

## ready

| Method | Path | What it does |
|---|---|---|
| `GET` | `/ready` | Readiness |

## reasoning

| Method | Path | What it does |
|---|---|---|
| `GET` | `/reasoning/derived` | What the reasoner concluded about one subject |
| `POST` | `/reasoning/el/classify` | Classify the ontology's TBox against OWL 2 EL via the whelk sidecar |
| `GET` | `/reasoning/el/explain` | Why one class is classified under another, per OWL 2 EL |
| `GET` | `/reasoning/explain` | Why a fact holds, recursively, down to the assertions under it |
| `POST` | `/reasoning/runs` | Derive everything the asserted graph implies, replacing the overlay |

## recertification-queue

| Method | Path | What it does |
|---|---|---|
| `GET` | `/recertification-queue` | Recertification queue |

## relation-proposals

| Method | Path | What it does |
|---|---|---|
| `GET` | `/relation-proposals` | Every relation waiting for a decision, with its evidence |

## relationships

| Method | Path | What it does |
|---|---|---|
| `DELETE` | `/relationships/{id}` | Delete a relationship |

## resolution

| Method | Path | What it does |
|---|---|---|
| `GET` | `/resolution/queue` | Ambiguous candidate pairs awaiting review, pending first |
| `POST` | `/resolution/queue/bulk` | Confirm or reject several review-queue entries in one request |
| `POST` | `/resolution/queue/{id}/confirm` | Confirm a queued pair; writes the merge |
| `POST` | `/resolution/queue/{id}/reject` | Reject a queued pair; the decision persists |

## search

| Method | Path | What it does |
|---|---|---|
| `GET` | `/search` | One search across assets, glossary terms and business metrics |
| `GET` | `/search/nodes` | Semantic search over graph subjects, scoped to the workspace |
| `GET` | `/search/nodes/embedding` | What is stored about a node's embedding |
| `GET` | `/search/nodes/similar` | Subjects most like a given one, by meaning |

## services

| Method | Path | What it does |
|---|---|---|
| `GET` | `/services/{service}/alignments` | A source's classes set against the installed vocabularies: suggested SKOS mapping relations with their evidence, and the decisions made |
| `POST` | `/services/{service}/alignments` | Confirm or reject one suggested alignment, recorded with the person's name; a confirmation is written to the alignment store |
| `GET` | `/services/{service}/checks` | The expectations, mined rules and competency questions a scanned, sampled database proposes |
| `POST` | `/services/{service}/column-profile` | What each column of one scanned table holds — null fraction, distinct count, most frequent values, a kind guess; admin only, read only, bounded to 100,000 rows per column, and values only when includeValues is true |
| `GET` | `/services/{service}/coverage` | Each kept competency question compiled and run over the source's sample: how many are answered |
| `POST` | `/services/{service}/disconnect` | Disconnect a source: remove its saved connection and credential and mark it disconnected until a scan succeeds again (the scanned catalogue is kept) |
| `POST` | `/services/{service}/expectations` | Write the chosen expectations as the source pack's expectations and put them into effect |
| `GET` | `/services/{service}/intent` | A source's competency questions in words, where each stands, and whether the models may run |
| `POST` | `/services/{service}/intent` | Ratify, drop or add competency questions for a source, recorded with the person's name |
| `GET` | `/services/{service}/metrics` | A source's model metrics: declarations and axioms by kind, named individuals and instances apart |
| `GET` | `/services/{service}/model-findings` | A whole-model pass's cross-cutting findings for a source, each with the proposals it became and their live states |
| `POST` | `/services/{service}/model-findings` | Store a whole-model pass's findings, each decomposed into a draft class, placements or axiom proposals; refused until the questions are ratified |
| `POST` | `/services/{service}/ontology-proposal` | Propose a scanned database's tables, columns and keys as draft ontology terms in its own pack |
| `GET` | `/services/{service}/questions` | The questions a scanned source could not settle (a hierarchy, a link, a fixed list), with the answers already given |
| `POST` | `/services/{service}/questions` | Answer one question, recorded with the person's name; the answer approves or declines the proposals it groups |
| `POST` | `/services/{service}/row-preview` | The first rows of one scanned table, read live from the source — admin only, read only, a screenful unless a limit (at most 500) is asked for |
| `POST` | `/services/{service}/sample-loads` | Load a bounded sample of a scanned database's rows as instances of its approved classes |
| `POST` | `/services/{service}/send-to-vocabulary` | Send a scanned source's classes into a vocabulary a person curates, as draft terms in readable words; a class the vocabulary already names is reported, not sent again, and properties are counted, not sent |
| `GET` | `/services/{service}/stages` | Where a source's set-up has got to: its latest run, each stage's latest state in order, and where it resumes |
| `GET` | `/services/{service}/status` | Where a scanned database stands: its tables and keys, its terms by review status, and what is loaded |
| `GET` | `/services/{service}/vocabulary-candidates` | The schemes and concepts a scanned database's lookup tables already contain, as candidates - proposes only (admin only) |
| `GET` | `/services/{service}/wording` | Which of a source's terms a model may word (still the derived template), the ratified questions that aim it, and the wording proposals so far |
| `POST` | `/services/{service}/wording` | Store a model's wording and naming drafts as proposals naming the model; refused until the competency questions are ratified |
| `DELETE` | `/services/{service}/workspace` | Take a source off one workspace (its sample graph, its pack's graph and its pack); the facts, the scan and every other workspace are untouched |
| `POST` | `/services/{service}/workspace` | Add a scanned source to a chosen workspace: its sample graph, its pack graph and its pack |

## sources

| Method | Path | What it does |
|---|---|---|
| `GET` | `/sources` | Every registered source a term can cite |
| `POST` | `/sources` | Register a source a term can be cited against |

## sparql

| Method | Path | What it does |
|---|---|---|
| `POST` | `/sparql` | Run a SPARQL query |
| `GET` | `/sparql/protocol` | The W3C SPARQL 1.1 Protocol, query via URL — off unless SPARQL_ALLOW_GET=true, because a query in a URL lands in logs |
| `POST` | `/sparql/protocol` | The W3C SPARQL 1.1 Protocol: send application/sparql-query or a form, receive SPARQL Results (JSON, XML, CSV, TSV) by Accept. Same auth, workspace scope and budget as /sparql; SELECT and ASK |

## streaming

| Method | Path | What it does |
|---|---|---|
| `GET` | `/streaming/dead-letters` | Poisoned streamed messages, newest first |
| `POST` | `/streaming/dead-letters/{id}/replay` | Replays one dead letter after a mapping fix |
| `POST` | `/streaming/replay` | Replay a subscription's messages from a timestamp |
| `GET` | `/streaming/subscriptions` | Every registered subscription, without secrets |
| `POST` | `/streaming/subscriptions` | Register a streaming subscription |

## tables

| Method | Path | What it does |
|---|---|---|
| `GET` | `/tables` | List tables |
| `POST` | `/tables` | Create a table |
| `DELETE` | `/tables/{id}` | Delete a table |
| `GET` | `/tables/{id}` | Fetch a table |
| `PATCH` | `/tables/{id}` | Update a table |
| `GET` | `/tables/{id}/relationships` | List a table's relationships |
| `POST` | `/tables/{id}/relationships` | Relate two tables |

## tags

| Method | Path | What it does |
|---|---|---|
| `GET` | `/tags` | Tags |
| `DELETE` | `/tags/{fqn}` | Delete tag |
| `GET` | `/tags/{fqn}/usage` | Tag usage |

## teams

| Method | Path | What it does |
|---|---|---|
| `GET` | `/teams` | Every team, with its members |
| `POST` | `/teams` | Create or update a team, replacing its membership |
| `DELETE` | `/teams/{id}` | Delete a team; `409` with counts unless `reassignTo` is given |
| `GET` | `/teams/{id}/children` | Teams reporting into this one |

## test-cases

| Method | Path | What it does |
|---|---|---|
| `GET` | `/test-cases` | Test cases |
| `POST` | `/test-cases` | Create test case |
| `DELETE` | `/test-cases/{id}` | Delete test case |
| `GET` | `/test-cases/{id}/results` | Test results |
| `POST` | `/test-cases/{id}/results` | **Never bumps the entity version and emits no change event** (decision 2) |

## test-definitions

| Method | Path | What it does |
|---|---|---|
| `GET` | `/test-definitions` | Test definitions |
| `POST` | `/test-definitions` | Create test definition |
| `POST` | `/test-definitions/{id}/cadence` | **The whole point of the definition/case split** (decision 3a): one edit, and every case that inherited the ca |

## test-results

| Method | Path | What it does |
|---|---|---|
| `POST` | `/test-results/prune` | Prune test results |

## test-suites

| Method | Path | What it does |
|---|---|---|
| `POST` | `/test-suites` | Create test suite |

## threads

| Method | Path | What it does |
|---|---|---|
| `GET` | `/threads/{id}/posts` | A thread's replies, paginated |
| `POST` | `/threads/{id}/posts` | Reply to a thread |
| `POST` | `/threads/{id}/reopen` | Reopen a resolved thread |
| `POST` | `/threads/{id}/resolve` | Resolve a thread |

## usage

| Method | Path | What it does |
|---|---|---|
| `POST` | `/usage` | Record usage |
| `POST` | `/usage/prune` | Prune usage |
| `GET` | `/usage/{fqn}` | Asset popularity |
| `GET` | `/usage/{fqn}/rollups` | Asset rollups |

## users

| Method | Path | What it does |
|---|---|---|
| `GET` | `/users` | Every user, by id — an owner/reviewer picker's source list |
| `DELETE` | `/users/{id}` | Delete a user; `409` with counts unless `reassignTo` is given |
| `PUT` | `/users/{id}` | Create or rename a user; grants no roles |
| `GET` | `/users/{id}/change-proposals` | Every change proposal a user has made |
| `GET` | `/users/{id}/follows` | What this user follows |
| `PUT` | `/users/{id}/roles` | Replace a user's roles, invalidating cached authorization |

## validation

| Method | Path | What it does |
|---|---|---|
| `POST` | `/validation/assignments` | Put a finding on somebody's plate |
| `DELETE` | `/validation/assignments/{id}` | Take a finding off somebody's plate |
| `GET` | `/validation/expectations` | Every installed expectation, in words, with the last run's verdict on it |
| `GET` | `/validation/report` | Current constraint violations, worst first |
| `POST` | `/validation/runs` | Validate the estate against every shape and replace the queue |
| `GET` | `/validation/shapes` | The shapes graph as a document — the SHACL a validation pass actually runs |
| `POST` | `/validation/shapes/import` | Commit a candidate SHACL document, admin-only |
| `POST` | `/validation/shapes/preview` | Try a candidate SHACL document against the estate, writing nothing |
| `POST` | `/validation/shapes/seed` | Write the shapes the core entity model ships with |
| `POST` | `/validation/waivers` | Accept a violation, with a reason and an expiry |
| `DELETE` | `/validation/waivers/{id}` | Withdraw a waiver, returning the finding to the queue |

## virtual-graphs

| Method | Path | What it does |
|---|---|---|
| `GET` | `/virtual-graphs` | The newest version of each virtual graph (admin only) |
| `POST` | `/virtual-graphs/draft/query` | Answer a Cypher query from a source database through a draft mapping sent with the request: read-only, bounded by the row cap and statement timeout the caller chooses, nothing copied or stored (admin only) |
| `DELETE` | `/virtual-graphs/{slug}` | Remove every version of a virtual graph; the record of changes made through it is kept |
| `GET` | `/virtual-graphs/{slug}` | Every version of one virtual graph, newest first, with its review trail (admin only) |
| `PUT` | `/virtual-graphs/{slug}` | Save a mapping as a draft: edited in place while a draft, a new version once proposed or approved (admin only) |
| `GET` | `/virtual-graphs/{slug}/changes` | A virtual graph's proposed changes to its source, newest first |
| `POST` | `/virtual-graphs/{slug}/changes` | Compile a Cypher statement into a draft change to the source and read the row it would touch; writes nothing to the source |
| `GET` | `/virtual-graphs/{slug}/changes/{id}` | One proposed change to a source, with its statements and the row as it was |
| `POST` | `/virtual-graphs/{slug}/changes/{id}/decide` | Approve or reject a proposed change |
| `POST` | `/virtual-graphs/{slug}/changes/{id}/execute` | Run an approved change at the source in one transaction, if the row and the mapping are still what was reviewed |
| `POST` | `/virtual-graphs/{slug}/changes/{id}/propose` | Send a draft change for a decision |
| `POST` | `/virtual-graphs/{slug}/decide` | Approve or reject a proposed version: the reviewer's name and their reasons are both required (admin only) |
| `GET` | `/virtual-graphs/{slug}/grants` | What the role the source is reached as may change among the tables the newest version maps: its name, whether it is a superuser, and each writable table (admin only) |
| `GET` | `/virtual-graphs/{slug}/log` | The newest lines of the graph's query audit trail: who asked, when, a hash of the query, rows and source milliseconds, and the outcome (ok, refused, timeout, source_error) — never rows or parameter values (admin only) |
| `POST` | `/virtual-graphs/{slug}/propose` | Put the newest draft up for review; refused while it has findings (admin only) |
| `POST` | `/virtual-graphs/{slug}/query` | Answer a Cypher query from the source through the approved version, under the graph's own limits (which a request can only lower); refused if none is approved or the source has moved (admin only) |
| `POST` | `/virtual-graphs/{slug}/revalidate` | Compare the approved version with the scan as it is now: stale if a used column moved, restored if it moved back (admin only) |
| `POST` | `/virtual-graphs/{slug}/similar` | The rows of a class nearest to one row by an embedding the source holds (pgvector), through the approved version; returns ids ready to pass to a query as $ids (admin only) |
| `POST` | `/virtual-graphs/{slug}/validate` | Check the newest version against the catalogued scan of its source, listing every finding (admin only) |
| `GET` | `/virtual-graphs/{slug}/write-credential` | Who a virtual graph's source is written as, if a write credential is saved; never the password |
| `PUT` | `/virtual-graphs/{slug}/write-credential` | Save a write credential for a virtual graph's source, from its read connection's host and database |

## virtual-sources

| Method | Path | What it does |
|---|---|---|
| `POST` | `/virtual-sources/{source}/parse-ddl` | Read CREATE PROPERTY GRAPH text into a mapping, resolving every table and column against the source's scan; saves nothing, and a mistake comes back with its line and column (admin only) |
| `GET` | `/virtual-sources/{source}/schema` | The last scan of a source — tables, columns and types, keys, foreign keys — as the define screen draws it (admin only) |

## webhooks

| Method | Path | What it does |
|---|---|---|
| `DELETE` | `/webhooks/dead-letters` | Purge dead-lettered events older than a caller-named cutoff |
| `GET` | `/webhooks/dead-letters` | The dead-letter queue, filterable by endpoint and reason |
| `GET` | `/webhooks/endpoints` | Every registered webhook endpoint, without secrets |
| `POST` | `/webhooks/endpoints` | Register a webhook endpoint; the secret is write-only |
| `GET` | `/webhooks/events/{id}` | The status of one inbound event |
| `POST` | `/webhooks/mappings` | Register a new version of a payload-to-draft mapping |
| `GET` | `/webhooks/mappings/{name}` | The latest version of a mapping |
| `POST` | `/webhooks/mappings/{name}/dry-run` | Apply a mapping to a sample payload without writing anything |
| `GET` | `/webhooks/mappings/{name}/versions` | Every version of a mapping, newest first |
| `POST` | `/webhooks/receive/{path}` | Receive a webhook delivery; the raw body is verified before parsing |
| `POST` | `/webhooks/replay` | Replay a window of an endpoint's events, in sender-timestamp order |

## wording-proposals

| Method | Path | What it does |
|---|---|---|
| `PATCH` | `/wording-proposals/{id}` | Accept or reject a model's wording, recorded with the person's name; an accepted definition sits above the derivation |

## workspaces

| Method | Path | What it does |
|---|---|---|
| `GET` | `/workspaces` | Every provisioned customer workspace |
| `POST` | `/workspaces` | Provision a customer workspace, or return the one already there |
| `DELETE` | `/workspaces/{slug}` | Offboard a customer: removes the workspace boundary, not the facts behind it |
| `POST` | `/workspaces/{slug}/glossaries` | Record that a vocabulary (and its model records) belongs to a workspace; a vocabulary owned by other workspaces and without a pack is then no longer visible here (admin only) |
| `DELETE` | `/workspaces/{slug}/glossaries/{glossary}` | Take a vocabulary off a workspace; the vocabulary itself is untouched; 404 if it was not attached (admin only) |
| `GET` | `/workspaces/{slug}/graphs` | The graphs attached to a workspace, sorted |
| `POST` | `/workspaces/{slug}/graphs` | Record that an imported graph belongs to a workspace |
| `GET` | `/workspaces/{slug}/packs` | Which packs a workspace uses; empty means every installed pack |
| `POST` | `/workspaces/{slug}/packs` | Declare that a workspace uses an installed pack |
| `DELETE` | `/workspaces/{slug}/packs/{pack}` | Stop a workspace declaring a pack |
