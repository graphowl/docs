---
title: MCP tools by family
description: The MCP tools grouped by what an agent uses them for.
---

The 101 tools, grouped by purpose. The first sentence of each description is shown; the [full reference](/ai/mcp-tools/) has every parameter.

## Remember

3 tools.

| Tool | What it does |
|---|---|
| [`recall_memory`](/ai/mcp-tools/#recall_memory) | Why this asset is the way it is: decisions, incidents, caveats and rationale people recorded about it. |
| [`record_investigation`](/ai/mcp-tools/#record_investigation) | Record what you investigated, what you found, and what you checked. |
| [`record_memory`](/ai/mcp-tools/#record_memory) | Record something you learned about an asset so the next agent — or person — does not have to rediscover it. |

## Query

8 tools.

| Tool | What it does |
|---|---|
| [`check_rewrite`](/ai/mcp-tools/#check_rewrite) | The only evidence a rewritten question is right: rewrite a SELECT through the ACCEPTED equivalences, run the original and the rewrite in the workspace, and compare the rows. |
| [`declare_pack_query`](/ai/mcp-tools/#declare_pack_query) | Register one named SPARQL query on a pack, so a finding rule can refer to it. |
| [`list_pack_queries`](/ai/mcp-tools/#list_pack_queries) | List one pack's registered named queries and the bindings each requires — how to find out what `run_pack_query` can be asked before asking it. |
| [`query_graph`](/ai/mcp-tools/#query_graph) | Ask the graph directly, in SPARQL, for questions the other tools do not shape. |
| [`query_graph_cypher`](/ai/mcp-tools/#query_graph_cypher) | Ask the same store in **Cypher**, as a property graph. |
| [`query_virtual_graph`](/ai/mcp-tools/#query_virtual_graph) | Ask a source database a question in place, through a virtual graph's approved mapping, in Cypher (`MATCH (l:MilkLot)-[:hasFarm]->(f:Farm) WHERE f.region = $region RETURN l.lot_id, f.name`). |
| [`rewrite_query`](/ai/mcp-tools/#rewrite_query) | Rewrite a SPARQL read query written for one model into the other, through the workspace's ACCEPTED equivalences. |
| [`run_pack_query`](/ai/mcp-tools/#run_pack_query) | Run one of a pack's registered named queries — a bound lookup (e.g. |

## Reason and validate

23 tools.

| Tool | What it does |
|---|---|
| [`calculate_risk`](/ai/mcp-tools/#calculate_risk) | Every open obligation for one subject — a due date and how many days remain (negative once overdue). |
| [`check_model_data`](/ai/mcp-tools/#check_model_data) | Run the model's own rules over its data — the generated individuals and any RDF loaded for it — and list each rule that is broken, by individual. |
| [`check_pack`](/ai/mcp-tools/#check_pack) | Check a semantic model **before** it becomes a document. |
| [`create_quality_test`](/ai/mcp-tools/#create_quality_test) | Propose a data-quality test for an asset. |
| [`decide_finding`](/ai/mcp-tools/#decide_finding) | Record a decision on one finding — accept it or reject it. |
| [`decide_model_health_finding`](/ai/mcp-tools/#decide_model_health_finding) | Dismiss or accept one finding of the latest check, with a reason in a sentence. |
| [`explain`](/ai/mcp-tools/#explain) | Explain why a fact holds — asserted directly, or derived by a chain of rules from other facts. |
| [`explain_alignment`](/ai/mcp-tools/#explain_alignment) | Say in words why a correspondence holds: one stored correspondence by id, or a derived equivalence by its path (`derived:c2+c1+c3`), step by step. |
| [`explain_expectation`](/ai/mcp-tools/#explain_expectation) | One expectation and its offenders: for each, the focus node, the path, the constraint that failed, the message, the actual value, and the repair the validator already computed. |
| [`explain_lineage`](/ai/mcp-tools/#explain_lineage) | Where an asset's data comes from, or what it feeds. |
| [`list_expectations`](/ai/mcp-tools/#list_expectations) | List every SHACL expectation this deployment holds, in words: its business name, why it exists, what it targets, what it requires, and how the last stored run judged it (violations, warnings, info). |
| [`list_findings`](/ai/mcp-tools/#list_findings) | List the findings queue, newest first — every recorded conclusion this deployment's pack rules have raised, including rejected ones with their reasons. |
| [`list_model_health_runs`](/ai/mcp-tools/#list_model_health_runs) | List a pack's check runs, newest first, with how many findings each held and what it skipped. |
| [`model_health`](/ai/mcp-tools/#model_health) | Read what the latest check of a pack's model found: findings in the three boxes (competency questions, classes and properties, individuals), each with a stable `key`, a severity (`bad` is wrong, `warn` is unfinished) and where it is; what was resolved since the run before; whether the model was saved after the run (`stale`); and the decisions people made. |
| [`preview_expectations`](/ai/mcp-tools/#preview_expectations) | Check a candidate SHACL document against one workspace's data without writing anything — how an agent iterates on an expectation before asking an admin to commit it. |
| [`reconcile`](/ai/mcp-tools/#reconcile) | Run a pack's registered rules and record what they conclude as findings — the same computation the console's "Run reconciliation" button triggers. |
| [`run_competency_questions`](/ai/mcp-tools/#run_competency_questions) | Run every competency question of a pack's model and report, for each, how many rows it returned — or that it failed, and why. |
| [`run_model_check`](/ai/mcp-tools/#run_model_check) | Check a pack's SAVED model now: generate its graph, run every competency question and evaluate the record, then keep the run. |
| [`run_reasoning`](/ai/mcp-tools/#run_reasoning) | Run the OWL 2 RL reasoner for one customer: over that workspace's readable graphs, writing — and replacing — only that customer's own conclusions (`graph:reasoning-{workspace}`). |
| [`run_rule`](/ai/mcp-tools/#run_rule) | Evaluate one named rule from a pack and record what it concludes as findings — the single-rule counterpart to `reconcile`, for re-checking one rule rather than the whole pack. |
| [`run_validation`](/ai/mcp-tools/#run_validation) | Run the SHACL validation pass and replace the stored queue, then report what it found. |
| [`validate_extraction`](/ai/mcp-tools/#validate_extraction) | Check one import source's facts against its pack's declared schema: every `(subject, predicate)` whose subject is not of a type the predicate is declared on, and every predicate the pack declares with no domain at all. |
| [`write_pack_expectations`](/ai/mcp-tools/#write_pack_expectations) | Write a pack's SHACL expectations and **install them** — the missing half of the expectation surface: `preview_expectations` and `run_validation` existed, but nothing on this surface could install a shape. |

## Model (propose and decide)

34 tools.

| Tool | What it does |
|---|---|
| [`align_coverage`](/ai/mcp-tools/#align_coverage) | How much of a vocabulary's saved model the workspace's alignments reach: each class and property aligned and accepted by a person, aligned only by proposals still waiting, or not reached at all (the list of what is left to align). |
| [`assign_glossary_to_pack`](/ai/mcp-tools/#assign_glossary_to_pack) | Attach a glossary to a pack, so its terms compile into the pack's own vocabulary. |
| [`assign_pack_to_workspace`](/ai/mcp-tools/#assign_pack_to_workspace) | Declare that a customer's workspace uses a pack. |
| [`assign_term_reviewer`](/ai/mcp-tools/#assign_term_reviewer) | Replace a term's assigned reviewers. |
| [`create_glossary_term`](/ai/mcp-tools/#create_glossary_term) | Propose a glossary term. |
| [`decide_alignment`](/ai/mcp-tools/#decide_alignment) | Record a PERSON's decision on a proposed correspondence. |
| [`decide_axiom`](/ai/mcp-tools/#decide_axiom) | Accept or reject a proposed axiom. |
| [`decide_relation`](/ai/mcp-tools/#decide_relation) | Accept or reject a proposed SKOS relation — the decision half of `propose_relations`. |
| [`decide_term`](/ai/mcp-tools/#decide_term) | Move a term to a new lifecycle status — draft, inReview, approved or deprecated. |
| [`decide_term_mapping`](/ai/mcp-tools/#decide_term_mapping) | Accept or reject a proposed correction to a term's OWL mapping — the decision half of `propose_term_mapping`. |
| [`deprecate_term`](/ai/mcp-tools/#deprecate_term) | Retire an approved term in favour of another — for two spellings of one concept, not for a term that turned out wrong. |
| [`extraction_schema`](/ai/mcp-tools/#extraction_schema) | What an extraction worker may assert against a pack's ontology — the subject types, the predicates with the shape of each one's object (a literal, or a reference to another subject), and the subject-predicate-object patterns the ontology's domains and ranges permit. |
| [`generate_model_graph`](/ai/mcp-tools/#generate_model_graph) | Write a pack's saved model into its schema and individuals graphs, replacing the last generation. |
| [`get_ontology_model`](/ai/mcp-tools/#get_ontology_model) | Read the model behind a pack: its classes, properties, rules, individuals and table mappings, with the saved `version` and the `generatedVersion` the graph was last built from. |
| [`link_lineage`](/ai/mcp-tools/#link_lineage) | Suggest that one asset feeds another. |
| [`list_alignments`](/ai/mcp-tools/#list_alignments) | List the correspondences between two models that a workspace has stored: each with its kind (`s:s`, `s:c`, `c:s`, `c:c`, derived from the two sides), relation, confidence, status (`proposed`, `accepted`, `rejected`), both sides in words, and whether a query can be rewritten through it (only an accepted equivalence can). |
| [`list_axioms`](/ai/mcp-tools/#list_axioms) | Every axiom proposed for a pack, with its state (candidate, approved, rejected), who proposed and decided it, and the evidence. |
| [`list_term_amendments`](/ai/mcp-tools/#list_term_amendments) | Every revision of one term's definition, synonyms or abbreviations, most recent first: what it said before, what it says now, who decided it (`<person> (relayed by <principal>)`) and their words. |
| [`model_coverage`](/ai/mcp-tools/#model_coverage) | List what a pack's model still lacks, by the view of the Model tab where each gap is fixed: properties with no domain or range, classes no individual is typed by, properties nothing uses, rules that can never fire, questions with no query. |
| [`model_diff`](/ai/mcp-tools/#model_diff) | What changed between two saved versions of a pack's model: classes, properties, rules, questions, individuals and mappings added, removed or changed (with the fields that differ). |
| [`propose_alignment`](/ai/mcp-tools/#propose_alignment) | PROPOSE that two things mean the same (or are related). |
| [`propose_axiom`](/ai/mcp-tools/#propose_axiom) | Propose a structural OWL axiom for a pack — inverseOf, equivalentClass, sameAs, disjointWith, allDisjointClasses, hasKey, propertyChainAxiom, a subClassOf restriction (someValuesFrom, allValuesFrom, hasValue), a property characteristic (transitive, symmetric, functional, inverseFunctional) or subPropertyOf. |
| [`propose_metadata_change`](/ai/mcp-tools/#propose_metadata_change) | Suggest a description, tags, or an owner for an asset. |
| [`propose_model_changes`](/ai/mcp-tools/#propose_model_changes) | Propose a change to a pack's model. |
| [`propose_relations`](/ai/mcp-tools/#propose_relations) | Propose a batch of SKOS relations, each with the passage and the reasoning a reviewer will check. |
| [`propose_rule`](/ai/mcp-tools/#propose_rule) | Propose a finding rule. |
| [`propose_source_ontology`](/ai/mcp-tools/#propose_source_ontology) | Turn a database a connector run has scanned into draft ontology terms, in its own pack (`source-{service}`, created on first use): a class per table, a data property per column (ranged by its XSD type), an object property per foreign key (domain and range from the key). |
| [`propose_source_vocabulary`](/ai/mcp-tools/#propose_source_vocabulary) | Read the first-pass vocabulary a scanned database already contains: the small tables other tables point at become concept SCHEMES, their rows CONCEPTS (code, label, definition if the table has one), a self-referencing column a HIERARCHY (broader), and a table that is only two keys a RELATION between two tables. |
| [`propose_term_mapping`](/ai/mcp-tools/#propose_term_mapping) | Propose a correction to a term's OWL mapping — what kind of OWL thing it is (class, individual, objectProperty, dataProperty, annotationProperty, datatype) and its domain, range or class. |
| [`propose_terms`](/ai/mcp-tools/#propose_terms) | Propose a batch of terms into one glossary, as drafts. |
| [`review_proposals`](/ai/mcp-tools/#review_proposals) | Everything waiting for a human decision — undecided terms, and proposed relations with the evidence for each. |
| [`suggest_owl_model`](/ai/mcp-tools/#suggest_owl_model) | Draft an OWL `SemanticModel` from a pack's SKOS glossary, deterministically — the same glossary always yields the same model, so a person diffs a candidate rather than reviewing a file. |
| [`sync_definitions`](/ai/mcp-tools/#sync_definitions) | Bring a pack's `glossary.ttl` and `ontology.ttl` definitions into line with its glossary's approved terms, one literal at a time — nothing else in either file changes, and an edit that cannot be proven to change only that definition is reported and not written. |
| [`update_term`](/ai/mcp-tools/#update_term) | Correct a term's own fields — its definition, synonyms, abbreviations, or its owlKind mapping (domain/range/instanceOf). |

## Packs and sources

20 tools.

| Tool | What it does |
|---|---|
| [`audit_pack`](/ai/mcp-tools/#audit_pack) | Structural and vocabulary-hygiene findings over a pack's own, **already-installed** ontology document. |
| [`compile_pack`](/ai/mcp-tools/#compile_pack) | Compile a semantic model to Turtle. |
| [`create_pack`](/ai/mcp-tools/#create_pack) | Create a new, empty pack: a directory and a `pack.toml` header. |
| [`import_data_dry_run`](/ai/mcp-tools/#import_data_dry_run) | Check a Turtle document the way an import would - parse it, validate each subject against the shapes the server holds - and report what would land, what is already there and what would be rejected, WITHOUT writing anything. |
| [`install_pack`](/ai/mcp-tools/#install_pack) | Load a pack into the graph. |
| [`list_imports`](/ai/mcp-tools/#list_imports) | List import sources with their live fact count — the way to see what data is actually loaded, and to spot the same file landed twice under two sources before it doubles every finding. |
| [`list_packs`](/ai/mcp-tools/#list_packs) | Every pack this deployment knows about, on disk or installed. |
| [`list_uploaded_files`](/ai/mcp-tools/#list_uploaded_files) | **Call this before answering a question about a client's uploaded data, before proposing terms meant to fit real columns, and before building an ontology meant to fit real data**: the data is the evidence a proposal has to be justified against, and a term nothing in it supports is a guess. |
| [`list_users`](/ai/mcp-tools/#list_users) | Every user this deployment knows — the ids `assign_term_reviewer` takes. |
| [`list_virtual_graphs`](/ai/mcp-tools/#list_virtual_graphs) | List a workspace's virtual graphs — the mappings that let a source database be asked questions in place, nothing copied. |
| [`load_source_sample`](/ai/mcp-tools/#load_source_sample) | Load a bounded sample of a scanned database's rows into its own graph (`graph:import:sample-{service}`), as instances of the classes a person has approved — only approved tables and columns load, and a reference lands on a row that is itself loaded. |
| [`merge_pack`](/ai/mcp-tools/#merge_pack) | Merge a pack's own **approved glossary** into its installed ontology — the step between a term being approved and it being installed. |
| [`pack_context`](/ai/mcp-tools/#pack_context) | Read everything that already exists in a pack and its glossary **before proposing anything into them**: the pack's ontology document (its existing classes, object properties and data properties), and the glossary's terms with their mapping decisions, asserted relations, and proposals still awaiting a person. |
| [`read_uploaded_file`](/ai/mcp-tools/#read_uploaded_file) | Use the exact `clientId`, `periodId` and `kind` from `list_uploaded_files` — never invent one. |
| [`register_source`](/ai/mcp-tools/#register_source) | Record where a body of terms comes from, before extracting any: a statute, a return format, an API schema, an existing ontology. |
| [`replay_import`](/ai/mcp-tools/#replay_import) | Admin-only: this writes. |
| [`resolve_entity`](/ai/mcp-tools/#resolve_entity) | Given a name or id from unstructured text, find which real catalog assets it most likely refers to. |
| [`resolve_user`](/ai/mcp-tools/#resolve_user) | The users whose id, display name or email match a query — resolving a reviewer from a name or address you already have, without enumerating every user in the deployment. |
| [`write_pack_glossary`](/ai/mcp-tools/#write_pack_glossary) | Write a pack's own `glossary.ttl` — the SKOS half, symmetric with `write_pack_ontology`. |
| [`write_pack_ontology`](/ai/mcp-tools/#write_pack_ontology) | Write a compiled ontology to a pack's own `ontology.ttl` — the step between `compile_pack` and anything a person can see. |

## Find and read

13 tools.

| Tool | What it does |
|---|---|
| [`analytics`](/ai/mcp-tools/#analytics) | Measure how connected a catalog asset's bounded neighbourhood is: each node's in/out degree, which nodes are orphaned (connected to nothing else within the walk), and which predicates were counted as structure. |
| [`analyze_impact`](/ai/mcp-tools/#analyze_impact) | What a change to this asset would affect: the assets downstream, the contracts that promise something about them, and the teams to tell. |
| [`find_evidence`](/ai/mcp-tools/#find_evidence) | Walk a finding's evidence graph — what supports it, beyond the flat evidence list the rule that raised it named. |
| [`get_asset_context`](/ai/mcp-tools/#get_asset_context) | Everything the catalog knows about one asset, filtered to what the caller is permitted to see. |
| [`get_governance_context`](/ai/mcp-tools/#get_governance_context) | How this asset must be handled: its classifications, which columns are masked and why, how long it is retained, and what you are permitted to do with it. |
| [`get_interview_state`](/ai/mcp-tools/#get_interview_state) | Read where one discovery interview stands: the session, how many answers stand, the latest version of each artefact the gated interview produced (scope, competency-question contract, requirements, evidence, assessment of the existing model, gaps, candidates, proposals, validation) and the gaps still open. |
| [`list_interviews`](/ai/mcp-tools/#list_interviews) | List the discovery interviews of a pack's vocabulary that you may see (your own; an admin sees all), newest first, with their status. |
| [`list_workspaces`](/ai/mcp-tools/#list_workspaces) | Every workspace this deployment has provisioned — one per customer on a multi-tenant deployment. |
| [`pipeline_status`](/ai/mcp-tools/#pipeline_status) | **Ask what is waiting for a person before doing anything else.** Read-only. |
| [`search_assets`](/ai/mcp-tools/#search_assets) | Find assets by name or description. |
| [`search_nodes`](/ai/mcp-tools/#search_nodes) | Find graph subjects by what they mean, not by keyword. |
| [`similar_nodes`](/ai/mcp-tools/#similar_nodes) | Subjects most like one you already have, by meaning. |
| [`traverse`](/ai/mcp-tools/#traverse) | Walk a bounded neighbourhood outward from a subject, within a hop limit. |
