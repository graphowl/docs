---
title: MCP tool reference
description: Every tool the GraphOWL MCP server offers, with its parameters. Generated from the server's own tools/list answer.
---

The server offers **102 tools**. This page is generated from the server's own `tools/list` answer, so it cannot drift from what an agent actually sees. See the [overview](../mcp-overview/) for how they fit together.

## `align_coverage`

How much of a vocabulary's saved model the workspace's alignments reach: each class and property aligned and accepted by a person, aligned only by proposals still waiting, or not reached at all (the list of what is left to align). Read-only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `glossary` | string | yes | The vocabulary's id (a UUID). |
| `workspace` | string | no | The customer's workspace slug (see `list_workspaces`). Required in a session scoped to one workspace. |

## `analytics`

Measure how connected a catalog asset's bounded neighbourhood is: each node's in/out degree, which nodes are orphaned (connected to nothing else within the walk), and which predicates were counted as structure. Use after `traverse` to quantify a neighbourhood it already showed you, not as a substitute for it.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `direction` | string | no | Defaults to upstream. |
| `fullyQualifiedName` | string | yes | The asset whose neighbourhood to measure. |
| `maxHops` | integer | no | Defaults to 2, capped at 6. |

## `analyze_impact`

What a change to this asset would affect: the assets downstream, the contracts that promise something about them, and the teams to tell.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `fullyQualifiedName` | string | yes | The asset being changed. |

## `assign_glossary_to_pack`

Attach a glossary to a pack, so its terms compile into the pack's own vocabulary. `glossary` may be the glossary's id or its name — a name that is absent or shared by more than one glossary is refused rather than guessed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `glossary` | string | yes | A glossary id or name. |
| `pack` | string | yes | The pack to attach it to. |

## `assign_pack_to_workspace`

Declare that a customer's workspace uses a pack. `workspace` may be the slug `list_workspaces` returns or the customer's display name — a name that is absent or shared by more than one workspace is refused rather than guessed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack to enable. |
| `workspace` | string | yes | A workspace slug or a customer's display name. |

## `assign_term_reviewer`

Replace a term's assigned reviewers. **Required before `decide_term` can approve anything** — approval needs an assigned reviewer, and there is no other way onto this surface to name one. Replaces the whole list; it does not add to it.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `reviewers` | array | yes | The complete new list of user ids who may approve this term. An empty array leaves it with none. |
| `termId` | string | yes | The term to assign reviewers to. |

## `audit_pack`

Structural and vocabulary-hygiene findings over a pack's own, **already-installed** ontology document. Different from `check_pack`, which only ever sees a model before it becomes a document — this looks at the file as it stands right now. Reports two kinds of finding: a class typed with the pack's own class marker but not `rdfs:Class`/`owl:Class` (or the reverse), which a standard reasoner will not recognise as a class at all; and a property the pack declares that nothing in the live graph ever asserts, which is either dead vocabulary or a sign the runtime reaches the same concept through a differently-namespaced predicate instead. Empty is a real answer — a clean pack. This does not write anything; propose any correction through `write_pack_ontology` as you would any other change, and say what changed and why. **Pass `workspace` to ask "which of this pack's properties does *one customer's* data use"** — without it a property another customer's data happens to assert reads as used for everyone, so a loader silently dropping it for one customer leaves no trace. Scoped, a declared-but-never-written property (a `filedDate`) surfaces as that customer's gap.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack to audit. |
| `workspace` | string | no | Optional — scope the property-usage check to one customer's own graphs, by the slug `list_workspaces` returns or their display name. Omit to ask whether a property is asserted anywhere in the deployment. |

## `calculate_risk`

Every open obligation for one subject — a due date and how many days remain (negative once overdue). No invented risk score: this reports the real, unweighted number a pack's own rules compute.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose obligations to check, e.g. "dairy". |
| `subject` | string | yes | The subject to check, as an IRI. |

## `check_model_data`

Run the model's own rules over its data — the generated individuals and any RDF loaded for it — and list each rule that is broken, by individual. Read-only. `refused` names the rules the engine could not run: those were NOT checked, so never read an empty `violations` as clean without reading `refused` too. The graph must have been generated from the model first.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose model's rules to run. |

## `check_pack`

Check a semantic model **before** it becomes a document. Reports what would be false rather than what would fail to compile: two `rdfs:domain` triples on one property are read by RDFS as *both*, so every subject of that property is inferred to be an instance of every named class at once — a shape that once manufactured 78 false type facts in this project's own pack. **Also catches a class placed under two classes the model declares disjoint** (`disjointnessViolation`): a class with two disjoint superclasses is unsatisfiable, so it can have no instances at all and a reasoner would silently retype every instance it does have. That check needs the model to carry `disjoint` — sets of local names, the shape `owl:AllDisjointClasses` and `owl:disjointWith` both lower to — and `suggest_owl_model` returns a model that already carries the pack's own. A set of fewer than two classes is reported as `disjointSetTooSmall`. Stores nothing and compiles nothing, so it is safe to call repeatedly while iterating.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `classes` | array | no |  |
| `dataProperties` | array | no |  |
| `namespace` | string | yes | The IRI prefix every term is minted under, ending in `#` or `/`. |
| `objectProperties` | array | no |  |

## `check_rewrite`

The only evidence a rewritten question is right: rewrite a SELECT through the ACCEPTED equivalences, run the original and the rewrite in the workspace, and compare the rows. `agree` is evidence; `differ` shows rows only one side has (a wrong or incomplete correspondence); `cannotCompare` says why (both empty - which proves nothing, the answer was cut short, not a SELECT). Both queries are reads. Remember the data lives in named graphs: write `GRAPH ?g { ... }`.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `direction` | string | no | Default leftToRight. |
| `query` | string | yes | A SPARQL SELECT written for one model. |
| `useDerived` | boolean | no |  |
| `workspace` | string | no | The customer's workspace slug (see `list_workspaces`). Required in a session scoped to one workspace. |

## `compile_pack`

Compile a semantic model to Turtle. Refuses a model the pre-compilation check calls fatal, and returns warnings otherwise — a parent imported from another vocabulary is ordinary and compiles. Given `packId` and `skosTurtle`, also reports what regenerating would change: terms added, changed, or **deprecated** (never deleted), and — for any file you pass — whether its triples differ from the generated ones. Writes nothing.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `classes` | array | no |  |
| `dataProperties` | array | no |  |
| `files` | array | no | Generated files paired with what is at their path today. Compared by triples, not bytes, so comments and ordering a person chose are not reported as changes. |
| `namespace` | string | yes | The IRI prefix every term is minted under, ending in `#` or `/`. |
| `objectProperties` | array | no |  |
| `packId` | string | no | The installed pack to diff against. Omit to just compile. |
| `skosTurtle` | string | no | The candidate SKOS document, required with `packId`: the concept diff is computed from it. |

## `create_glossary_term`

Propose a glossary term. It is created as a draft and never as approved — naming something is a governance act, and an agent proposing a name is useful where an agent ratifying one is not.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `confidence` | number | yes |  |
| `definition` | string | yes |  |
| `fullyQualifiedName` | string | yes |  |
| `name` | string | yes |  |
| `rationale` | string | yes |  |

## `create_pack`

Create a new, empty pack: a directory and a `pack.toml` header. Refuses if a pack by that id already exists — this never overwrites one. After creating, attach a glossary with `assign_glossary_to_pack` and author its vocabulary before installing it.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `description` | string | yes | What this pack is for, one sentence. |
| `namespace` | string | yes | The IRI prefix every term in this pack is minted under, ending in `#` or `/`. |
| `pack` | string | yes | The new pack's id — lower-case letters, digits, `-` and `_` only. |
| `prefix` | string | yes | The short prefix used in the pack's own vocabulary, e.g. "dairy". |

## `create_quality_test`

Propose a data-quality test for an asset. Results come from your test runner, not from here — an agent that both writes the test and reports its result is grading its own work.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `confidence` | number | yes |  |
| `expression` | string | yes |  |
| `fullyQualifiedName` | string | yes |  |
| `name` | string | yes |  |
| `rationale` | string | yes |  |

## `decide_alignment`

Record a PERSON's decision on a proposed correspondence. Call it only when the person has said, in this conversation, to accept or reject that one; a service account is refused. Accepting makes it usable for rewriting.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `accept` | boolean | yes | true to accept, false to reject. |
| `id` | string | yes |  |
| `workspace` | string | no | The customer's workspace slug (see `list_workspaces`). Required in a session scoped to one workspace. |

## `decide_axiom`

Accept or reject a proposed axiom. **Approving writes it** — rendered to Turtle and appended to the pack's `axioms.ttl`, refused the same way `write_pack_ontology` refuses a write that would drop triples already there. Ask the person first — show them the proposal and its evidence — and pass their name (`decidedBy`) and their words (`humanDecision`); refused without both. The receipt and the stored record name them.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `decidedBy` | string | yes | The person who decided — ask them; never yourself. |
| `humanDecision` | string | yes | What the person said, verbatim. |
| `proposalId` | string | yes | The axiom proposal to decide. |
| `state` | string | yes | approved or rejected. candidate is refused — nobody has looked at this yet is not a decision. |

## `decide_finding`

Record a decision on one finding — accept it or reject it. A rejection must say why: the reason is what stops the next run (or the next agent) re-raising a settled question. You decide as yourself; the receipt names you.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `decision` | string | yes | "pending" is the absence of a decision and cannot be sent. |
| `findingId` | string | yes | The finding's id, as `list_findings` reported it. |
| `reason` | string | no | Required for a rejection; optional for an acceptance. |

## `decide_model_health_finding`

Dismiss or accept one finding of the latest check, with a reason in a sentence. This is a person's decision: only make it when someone told you to, and say what you did. It removes the finding from the open list and deletes nothing; a person can take it back. Admin only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `decision` | string | yes |  |
| `key` | string | yes | The finding's `key`, exactly as `model_health` gave it. |
| `pack` | string | yes | The pack whose finding to decide. |
| `reason` | string | yes | Why, in a sentence (at most 500 characters). |

## `decide_relation`

Accept or reject a proposed SKOS relation — the decision half of `propose_relations`. Ask the person first — show them the proposal and its evidence — and pass their name (`decidedBy`) and their words (`humanDecision`); refused without both. The receipt and the stored record name them.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `decidedBy` | string | yes | The person who decided — ask them; never yourself. |
| `humanDecision` | string | yes | What the person said, verbatim. |
| `kind` | string | yes | broader, narrower, related, exactMatch, closeMatch, broadMatch, narrowMatch or relatedMatch — whatever kind the proposal named. |
| `state` | string | yes | approved or rejected. |
| `target` | string | yes | The relation's far end, exactly as proposed. |
| `termId` | string | yes | The term the relation belongs to. |

## `decide_term`

Move a term to a new lifecycle status — draft, inReview, approved or deprecated. Refused if the move is not in the transition matrix, if approval is attempted with no reviewer assigned (see `assign_term_reviewer`), or if the caller is not one of that term's assigned reviewers. Ask the person first — show them the proposal and its evidence — and pass their name (`decidedBy`) and their words (`humanDecision`); refused without both. The receipt and the stored record name them.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `decidedBy` | string | no | The person who decided — ask them; never yourself. |
| `humanDecision` | string | no | What the person said, verbatim. |
| `reason` | string | no | Why, recorded with the transition. Especially worth naming for a rejection back to draft. |
| `status` | string | yes | draft, inReview, approved or deprecated. |
| `successorTermId` | string | no | Only meaningful alongside deprecated: the term that replaces this one. |
| `termId` | string | yes | The term to move. |

## `decide_term_mapping`

Accept or reject a proposed correction to a term's OWL mapping — the decision half of `propose_term_mapping`. **Accepting applies it**, field by field, onto the term's current mapping. Ask the person first — show them the proposal and its evidence — and pass their name (`decidedBy`) and their words (`humanDecision`); refused without both. The receipt and the stored record name them.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `decidedBy` | string | yes | The person who decided — ask them; never yourself. |
| `humanDecision` | string | yes | What the person said, verbatim. |
| `proposalId` | string | yes | The mapping correction to decide. |
| `state` | string | yes | approved or rejected. |

## `declare_pack_query`

Register one named SPARQL query on a pack, so a finding rule can refer to it. Declaring is an upsert: re-declaring a name replaces its text. Every pattern must sit inside a `GRAPH ?g { }` block — a query without one matches nothing at all, silently, which reads exactly like a clean reconciliation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | The name a rule refers to, e.g. "missing-in-statement". Lower-case letters, digits and hyphens. |
| `pack` | string | yes | The pack to register the query on, e.g. "dairy-demo". |
| `query` | string | yes | The SPARQL text. |

## `deprecate_term`

Retire an approved term in favour of another — for two spellings of one concept, not for a term that turned out wrong. **Deprecates, never deletes**: findings cite a term by IRI, and a dangling citation is worse than a duplicate, so the IRI stays resolvable and the history stays readable. Pass `successorTermId` whenever there is a survivor — a reader told only "deprecated" has a dead end, one told what replaced it has a next step. Only an **approved** term can be retired; a draft was never current, and a definition that turned out wrong goes back to review instead (`update_term`), which is a different decision.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `reason` | string | no | Why it is being retired, recorded with the transition. Say which side live findings cite. |
| `successorTermId` | string | no | The term that replaces it — the spelling everything should cite from now on. Omit only when nothing replaces it. |
| `termId` | string | yes | The term to retire — the losing spelling. |

## `explain`

Explain why a fact holds — asserted directly, or derived by a chain of rules from other facts. Use the subject/predicate/object a previous tool call already returned. **The object may be a literal** (an ARN, an amount, a date) as well as an IRI: most facts in a domain pack are literal-valued, and a node-only object left "why does this hold" unanswerable for exactly the facts that matter.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `object` | string | yes | The fact's object — an IRI this deployment resolves, or the literal value itself (without quotes), e.g. `AA246E2A9C709`. |
| `predicate` | string | yes | The fact's predicate, as an IRI. |
| `subject` | string | yes | The fact's subject, as an IRI. |

## `explain_alignment`

Say in words why a correspondence holds: one stored correspondence by id, or a derived equivalence by its path (`derived:c2+c1+c3`), step by step. A chain is no stronger than its weakest step. Read-only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | A correspondence id, or `derived:` and the ids of its path joined by `+`. |
| `workspace` | string | no | The customer's workspace slug (see `list_workspaces`). Required in a session scoped to one workspace. |

## `explain_expectation`

One expectation and its offenders: for each, the focus node, the path, the constraint that failed, the message, the actual value, and the repair the validator already computed. Use it after `list_expectations` when an expectation reports a non-zero count and you need to know *which rows* — this is the difference between 'four invoices are wrong' and 'these four'. **The offenders come from the last stored run**, so run `run_validation` first if the data has changed since. Each offender carries the `workspace` its focus node resolves to, so an offender against another customer's data is told apart from yours; `null` means no workspace claims it — a single-tenant deployment, or a focus node no graph holds — never a wrong customer.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `shape` | string | yes | The expectation's own id, exactly as `list_expectations` reported it. It renders as `code:local`, not as a full IRI — pass it back verbatim rather than rebuilding it from the namespace. |

## `explain_lineage`

Where an asset's data comes from, or what it feeds. Each hop says who asserted it and how. A chain that runs into something you may not see stops there and says so — it is never joined across the gap.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `direction` | string | no | upstream (default) is where the data came from; downstream is what it feeds. |
| `fullyQualifiedName` | string | yes | The asset to walk from. |

## `extraction_schema`

What an extraction worker may assert against a pack's ontology — the subject types, the predicates with the shape of each one's object (a literal, or a reference to another subject), and the subject-predicate-object patterns the ontology's domains and ranges permit. Derived from the pack's own `ontology.ttl`, so it is what that pack actually declares rather than a general vocabulary. `notes` names what the ontology states and the schema could not express — a property with no readable domain, a range naming a class the document never declares. `extractableSubjectTypes` is the narrower list worth handing a model: a pack's finding rules and statutory provisions are classes too, and offering them invites a worker to extract things no document contains.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack id, e.g. `dairy`. |

## `find_evidence`

Walk a finding's evidence graph — what supports it, beyond the flat evidence list the rule that raised it named. Includes a near-miss candidate when one exists (a plausible match the rule found no edge to).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `findingId` | string | yes | The finding's own id (a UUID). |
| `maxHops` | integer | no | Defaults to 2, capped at 6. |

## `generate_model_graph`

Write a pack's saved model into its schema and individuals graphs, replacing the last generation. Idempotent, but it changes what every query sees - say so to the person. Admin only. It generates the SAVED version; unsaved edits in the Model tab are not included.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose model to generate from. |

## `get_asset_context`

Everything the catalog knows about one asset, filtered to what the caller is permitted to see. `related` lists catalog- hierarchy children only — it is not the whole picture. A value in `properties` can itself be a domain-pack subject's IRI (a handle into the graph proper, e.g. a customer's own `recipient`); pass such a value to `traverse` to walk further than this tool alone reaches.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `fullyQualifiedName` | string | yes | The asset's fully qualified name, e.g. warehouse.retail.public.orders |

## `get_governance_context`

How this asset must be handled: its classifications, which columns are masked and why, how long it is retained, and what you are permitted to do with it. Masked columns are named — you are told they exist even when you cannot read them.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `fullyQualifiedName` | string | yes | The asset to describe the handling rules for. |

## `get_interview_state`

Read where one discovery interview stands: the session, how many answers stand, the latest version of each artefact the gated interview produced (scope, competency-question contract, requirements, evidence, assessment of the existing model, gaps, candidates, proposals, validation) and the gaps still open. Read-only. Omit `session` for the most recent one you may see. To propose a change to the model from what it found, use `propose_model_changes`; nothing here applies anything.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose interview to read. |
| `session` | string | no | A session id from `list_interviews`. Omit for the latest. |

## `get_ontology_model`

Read the model behind a pack: its classes, properties, rules, individuals and table mappings, with the saved `version` and the `generatedVersion` the graph was last built from. Read-only — a change to the model is made by a person in the Model tab, so propose it in words rather than trying to write it. `generatedVersion` behind `version` means the graph an agent queries is out of date.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose model to read. |

## `import_data_dry_run`

Check a Turtle document the way an import would - parse it, validate each subject against the shapes the server holds - and report what would land, what is already there and what would be rejected, WITHOUT writing anything. Always do this before asking a person to load data. The document's IRIs must be in namespaces the store already knows.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `turtle` | string | yes | The Turtle document to check. |

## `install_pack`

Load a pack into the graph. **The only step that projects an ontology into it** — a term that is approved, merged and not installed exists in the glossary and nowhere a query can reach. Returns what the loader actually landed: `landed: 0` with a large `skipped` means every subject was already there, which is what re-installing an unchanged pack always looks like. Read that number rather than the absence of an error.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack to load. |

## `link_lineage`

Suggest that one asset feeds another. Always creates a proposal, whatever you have been granted: a wrong lineage edge propagates silently through every impact analysis downstream of it.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `confidence` | number | yes |  |
| `fullyQualifiedName` | string | yes | The downstream asset. |
| `rationale` | string | yes |  |
| `upstreamFqn` | string | yes |  |

## `list_alignments`

List the correspondences between two models that a workspace has stored: each with its kind (`s:s`, `s:c`, `c:s`, `c:c`, derived from the two sides), relation, confidence, status (`proposed`, `accepted`, `rejected`), both sides in words, and whether a query can be rewritten through it (only an accepted equivalence can). Read-only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `relation` | string | no |  |
| `status` | string | no |  |
| `text` | string | no | Only correspondences whose id or either side contains this text (case-insensitive): the way to narrow a plain-language question to candidates before choosing among them by id. |
| `workspace` | string | no | The customer's workspace slug (see `list_workspaces`). Required in a session scoped to one workspace. |

## `list_axioms`

Every axiom proposed for a pack, with its state (candidate, approved, rejected), who proposed and decided it, and the evidence. Read this before asking a person to decide: a candidate is waiting for them, an approved one is already in `axioms.ttl` and reaches the graph at the next `install_pack`.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose axiom queue to read. |

## `list_expectations`

List every SHACL expectation this deployment holds, in words: its business name, why it exists, what it targets, what it requires, and how the last stored run judged it (violations, warnings, info). Start here when asked 'is this data OK' — the name and the description are written for a business reader, and the counts are what the last pass found. The expectations are deployment-wide (a shape is a pack-level rule, identical for every caller). An empty list means no shapes are installed, which is a real answer, not a failure. Feed an expectation's `id` to `explain_expectation` to see who broke it, or to `run_validation` to recompute the counts against fresh data.

## `list_findings`

List the findings queue, newest first — every recorded conclusion this deployment's pack rules have raised, including rejected ones with their reasons. Start here when asked to investigate findings; feed a finding's id to `find_evidence` to walk what it rests on. This lists across every customer's graphs at once — the same posture `reconcile`'s unscoped default has. Each finding carries a `workspace` (slug + display name), resolved from its own subject rather than asserted, so a deployment holding more than one customer's data can be told apart without guessing from a subject's spelling. `null` means no workspace claims it — a single-tenant deployment, or a subject whose graph was never attached — never a wrong customer. **Pass `workspace` whenever the question is about one customer**, or you will be reading every customer's queue and filtering by eye.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | no | Optional — narrow to one pack, e.g. "dairy". |
| `status` | string | no | Optional — narrow to one review state. Omit to see all. |
| `workspace` | string | no | Optional — narrow to one customer, by the slug `list_workspaces` returns or their display name. Omit to list every customer's findings. |

## `list_imports`

List import sources with their live fact count — the way to see what data is actually loaded, and to spot the same file landed twice under two sources before it doubles every finding. **Pass `workspace` whenever the question is about one customer**, or you will be reading every customer's sources and filtering by eye: that is how an investigation into one customer concluded only one of their datasets was loaded when all seven of them were present. Resolve the customer's name to a slug with `list_workspaces` first. Omitting it lists the whole deployment, which is what an operator wants and almost never what a question about a named customer wants.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspace` | string | no | Narrow to one customer's own graphs — the slug `list_workspaces` returns for them. An unknown slug lists nothing rather than everything. |

## `list_interviews`

List the discovery interviews of a pack's vocabulary that you may see (your own; an admin sees all), newest first, with their status. Read-only. An empty list means there are none yet, not that the pack does not exist.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose interviews to list. |

## `list_model_health_runs`

List a pack's check runs, newest first, with how many findings each held and what it skipped. Read-only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose runs to list. |

## `list_pack_queries`

List one pack's registered named queries and the bindings each requires — how to find out what `run_pack_query` can be asked before asking it.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack to list, e.g. "dairy". |

## `list_packs`

Every pack this deployment knows about, on disk or installed. Use this before `create_pack` to check a name is not already taken, and before `assign_glossary_to_pack` or `install_pack` to confirm the target pack exists.

## `list_term_amendments`

Every revision of one term's definition, synonyms or abbreviations, most recent first: what it said before, what it says now, who decided it (`<person> (relayed by <principal>)`) and their words. Empty for a term never revised after approval.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `termId` | string | yes | The term — its id. |

## `list_uploaded_files`

List every dataset uploaded into the connected application — the registers, statements, payments and receipt files a client has uploaded for a period, with client, period, kind, name and row count, never the rows themselves. **Call this before answering a question about a client's uploaded data, before proposing terms meant to fit real columns, and before building an ontology meant to fit real data**: the data is the evidence a proposal has to be justified against, and a term nothing in it supports is a guess. Returns nothing when this deployment has no connected-application URL configured, which is said explicitly rather than reported as an empty list.

## `list_users`

Every user this deployment knows — the ids `assign_term_reviewer` takes. **Call this before assigning a reviewer**: `assign_term_reviewer` takes user ids and nothing else on this surface listed them, so the one technically-enforced gate in the deployment was unreachable without already knowing an id. Admin-only; a non-admin gets not-found, never an empty list.

## `list_virtual_graphs`

List a workspace's virtual graphs — the mappings that let a source database be asked questions in place, nothing copied. Each has its name, source, version, status (`draft`, `proposed`, `approved`, `stale`), its classes with their properties and its relationships: the names a query may use. Only an `approved` graph can be queried. Read-only; administrators only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspace` | string | no | The customer's workspace slug (see `list_workspaces`). Required in a session scoped to one workspace. |

## `list_workspaces`

Every workspace this deployment has provisioned — one per customer on a multi-tenant deployment. Call this before `reconcile` to resolve a customer's name to the slug it takes as `workspace`.

## `load_source_sample`

Load a bounded sample of a scanned database's rows into its own graph (`graph:import:sample-{service}`), as instances of the classes a person has approved — only approved tables and columns load, and a reference lands on a row that is itself loaded. Uses the connection saved for the service on the Connectors screen: name the service, never a password. At most 10,000 facts; a reload replaces the previous sample and writes nothing when the database has not changed. Next: run reasoning and validation over it.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `service` | string | yes | The service name the database was scanned and saved under. |
| `tables` | array | no | Tables to load (`orders` or `shop.orders`). Omit to load every table whose class is approved. |

## `merge_pack`

Merge a pack's own **approved glossary** into its installed ontology — the step between a term being approved and it being installed. The source is the pack's glossary projected to OWL by `suggest_owl_model`, whose kind decisions a person recorded through `propose_terms`/`decide_term`, so this applies decided mappings rather than inventing them. **It cannot clear the gate**: a mapping the plan leaves undecided (a real glossary-vs-ontology conflict) is refused, named, for a person. **The hand-authored `ontology.ttl` is not regenerated** — a compiled model cannot express every construct, so the merge lands in the installed ontology graph additively; `lost` names what the model could not carry. Admin-only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose approved glossary to merge. |

## `model_coverage`

List what a pack's model still lacks, by the view of the Model tab where each gap is fixed: properties with no domain or range, classes no individual is typed by, properties nothing uses, rules that can never fire, questions with no query. Read-only. An empty list means the model has no such gap, not that it is correct - read `check_model_data` and `run_competency_questions` too.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose model to inspect. |

## `model_diff`

What changed between two saved versions of a pack's model: classes, properties, rules, questions, individuals and mappings added, removed or changed (with the fields that differ). Read-only. Use it to say what an edit did, or to find which version introduced a problem; versions are the numbers `get_ontology_model` reports as `version`.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `from` | integer | yes | The older version. |
| `pack` | string | yes | The pack whose model to compare. |
| `to` | integer | yes | The newer version. |

## `model_health`

Read what the latest check of a pack's model found: findings in the three boxes (competency questions, classes and properties, individuals), each with a stable `key`, a severity (`bad` is wrong, `warn` is unfinished) and where it is; what was resolved since the run before; whether the model was saved after the run (`stale`); and the decisions people made. Read-only. `{"checked": false}` means the model was never checked - that is not a clean model; ask an admin to run `run_model_check`. `skipped` lists what a run could not do (a graph that would not generate, a question that did not run): read it before trusting an empty list.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose model to read. |
| `run` | string | no | A run id from `list_model_health_runs`, for an earlier run. Omit for the latest. |

## `pack_context`

Read everything that already exists in a pack and its glossary **before proposing anything into them**: the pack's ontology document (its existing classes, object properties and data properties), and the glossary's terms with their mapping decisions, asserted relations, and proposals still awaiting a person. Proposing without reading this is how a duplicate `Invoice`, a `issuedBy` mapped two different ways, or a relation already in the queue gets proposed. Reads nothing sensitive, writes nothing. Call it first; call it again before a second batch, because approvals may have landed between batches.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `glossaryId` | string | no | The glossary to read — an id or a name. Optional when `pack` resolves to one. |
| `pack` | string | no | The pack to read, e.g. "dairy". Omit it only when you are proposing into a glossary no pack uses yet. |

## `pipeline_status`

**Ask what is waiting for a person before doing anything else.** Read-only. This is how you resume after a human gate: never take "I approved it" as proof, because a person saying they clicked something and the deployment showing it are different facts and only one is checkable. Answers all four gates at once — proposals awaiting review, terms approved but not merged into the ontology file, a file ahead of the installed graph, and findings awaiting a decision. Branch on `nextGate`, not on the prose. A settled deployment answers `waiting: false` rather than an empty object, so "nothing to do" and "the read failed" cannot be confused. Calling it twice changes nothing.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | Which pack's pipeline to report on. |

## `preview_expectations`

Check a candidate SHACL document against one workspace's data without writing anything — how an agent iterates on an expectation before asking an admin to commit it. A document that fails to parse is a normal, successful outcome (`kind: "syntaxError"`), not an error. **Two limits you must know: it does not evaluate `sh:sparql` constraints**, so a document whose whole point is a `sh:sparql` check will preview as clean and can still fail on the real run; and it reads one workspace's graphs only when you name one. Treat a clean preview as 'the structural constraints hold', never as 'this will pass'.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `document` | string | yes | The candidate SHACL document itself. |
| `format` | string | no | How to read `document`. Defaults to `turtle`. |
| `workspace` | string | no | Check against one customer's own graphs — the slug `list_workspaces` returns for them. Omit to check against the whole deployment. |

## `propose_alignment`

PROPOSE that two things mean the same (or are related). It is stored as `proposed` and waits for a person; nothing is applied and nothing is rewritten through it until a person accepts it. Each side is a structured expression, never a string: `{"form":"class","iri":"…"}`, `and`/`or` (`of`: [...]), `some`/`all` (`property`, `filler`), `hasValue` (`property`, `value`), `inverse`, `objectProperty`, `dataProperty`, `individual`. A computed match is never an `equivalent`: use `closeMatch`.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `correspondence` | object | yes | {id, left, right, relation (equivalent\|subsumes\|subsumedBy\|closeMatch), confidence (0..1), origin (curated\|human\|computed)} |
| `workspace` | string | no | The customer's workspace slug (see `list_workspaces`). Required in a session scoped to one workspace. |

## `propose_axiom`

Propose a structural OWL axiom for a pack — inverseOf, equivalentClass, sameAs, disjointWith, allDisjointClasses, hasKey, propertyChainAxiom, a subClassOf restriction (someValuesFrom, allValuesFrom, hasValue), a property characteristic (transitive, symmetric, functional, inverseFunctional) or subPropertyOf. **Queued for a person, never applied** — ask the person, then `decide_axiom`. `subject`/`object`/every list member is a reference: a pack-local name (`hasFinding`) or an absolute IRI into a vocabulary this deployment does not own. Not covered: asymmetric/reflexive/irreflexive, equivalentProperty, propertyDisjointWith, differentFrom, cardinality and class expressions beyond a single restriction — the reasoner entails nothing from them yet.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `axiomType` | string | yes | inverseOf, equivalentClass, sameAs, disjointWith, allDisjointClasses, hasKey, propertyChainAxiom, subClassOfRestriction, propertyCharacteristic or subPropertyOf. |
| `chain` | array | no | propertyChainAxiom only, in composition order. At least two — a chain of one property is not a chain. |
| `characteristic` | string | no | propertyCharacteristic only: transitive, symmetric, functional or inverseFunctional. |
| `filler` | string | no | subClassOfRestriction only: the class the restriction's values must come from — or, for hasValue, the individual that is the value. |
| `members` | array | no | allDisjointClasses only. At least two — one class cannot be disjoint from itself. |
| `object` | string | no | Required for inverseOf, equivalentClass, sameAs, disjointWith and subPropertyOf (the super-property). |
| `onProperty` | string | no | subClassOfRestriction only: the property the restriction constrains. |
| `pack` | string | yes | The pack this axiom belongs to. |
| `passage` | string | yes | What the source actually says — the ontology document, the statute, the pack file. |
| `properties` | array | no | hasKey only. At least one. |
| `reasoning` | string | yes | Why the axiom follows from that passage. Required — a passage alone makes the reviewer reconstruct your argument. |
| `restrictionKind` | string | no | subClassOfRestriction only: someValuesFrom, allValuesFrom or hasValue. |
| `subject` | string | no | Required for every shape except allDisjointClasses, which has no single subject. |

## `propose_metadata_change`

Suggest a description, tags, or an owner for an asset. Creates a proposal for a human to accept unless you hold a direct-apply capability. Say why — a suggestion that does not explain itself is one nobody can review.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `confidence` | number | yes |  |
| `field` | string | yes |  |
| `fullyQualifiedName` | string | yes |  |
| `rationale` | string | yes | Why you believe this. Required. |
| `value` | any | yes | The proposed value. |

## `propose_model_changes`

Propose a change to a pack's model. Send the WHOLE proposed model (start from `get_ontology_model`'s `model`, change it, send it back) and one sentence saying why. NOTHING IS APPLIED: a person sees the proposal as a diff in the Model tab and chooses whether to load it into their draft. The model must pass the same checks a save does; if it does not, the problems come back by field so you can fix them. `get_ontology_model`'s `version` is recorded - a proposal made against an older version is shown as stale.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `model` | object | yes | The whole proposed model. |
| `pack` | string | yes | The pack whose model to change. |
| `summary` | string | yes | One sentence: why the model should change. |

## `propose_relations`

Propose a batch of SKOS relations, each with the passage and the reasoning a reviewer will check. **No confidence score** — what is checkable is the evidence. Returns one outcome per relation, including which ones would close a cycle in the hierarchy; that one you can act on by proposing the other direction instead. Proposals are invisible to the vocabulary until a person approves them.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `relations` | array | yes |  |

## `propose_rule`

Propose a finding rule. **It must come with the data it claims to detect on and the exact subjects it claims to find**, and it is run against them before being registered — a rule that parses, runs and returns the *wrong* rows looks like a working rule until somebody has to explain a finding that has no explanation. `expects` is exact: a rule that finds the right subjects and three others will raise false findings. Write the fixture in TriG — every rule in this pack is graph-scoped, so default-graph data matches none of them.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `evidence` | array | no | Predicate/variable pairs projected onto each finding. Every variable named here must be one the query SELECTs — a name the query does not project binds nothing, and the finding then carries less evidence than it claims to with no error anywhere to say so. Bind the *records* a conclusion rests on, not only the numbers read off them: a variable bound to a node is projected as a graph reference a reviewer can walk to (`dsc:evidence`), where a literal is kept as text (`dsc:evidenceValue`). A rule comparing two amounts should bind both amounts *and* the row the differing one came from, or `which record disagrees` has no answer beyond a number. |
| `fixtureDocument` | string | yes | A self-contained TriG document. Required. |
| `fixtureExpects` | array | no | Exactly the subjects the rule must bind on that document — no more and no fewer. An empty list is a legitimate claim: `this must not fire on clean data`. |
| `governedBy` | string | yes | The provision it rests on. A finding that cannot name its authority is not defensible. |
| `label` | string | yes | Its stable identifier. |
| `pack` | string | yes | The pack this rule belongs to. |
| `query` | string | yes | The SPARQL, inline. |
| `requires` | array | no | Classes the rule cannot conclude anything without, so `ran and found nothing` and `could not run` stay different answers. |
| `subjectVar` | string | yes | The variable naming the subject a finding is raised against. It must be one the query actually SELECTs — a misspelled one binds nothing and would otherwise look like finding nothing. |
| `summary` | string | yes | What it detects, written for whoever reviews the rule. |

## `propose_source_ontology`

Turn a database a connector run has scanned into draft ontology terms, in its own pack (`source-{service}`, created on first use): a class per table, a data property per column (ranged by its XSD type), an object property per foreign key (domain and range from the key). Deterministic — no model involved. Every term lands as a DRAFT with its OWL mapping and where it came from; nothing is approved. Safe to re-run: existing terms are reported, not duplicated. Next: review the terms (a person approves), merge the pack's ontology, install it.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `service` | string | yes | The service name the connector run catalogued the database under (see `search_assets` with kind `service`). |

## `propose_source_vocabulary`

Read the first-pass vocabulary a scanned database already contains: the small tables other tables point at become concept SCHEMES, their rows CONCEPTS (code, label, definition if the table has one), a self-referencing column a HIERARCHY (broader), and a table that is only two keys a RELATION between two tables. Tables that were considered and left out come back with the reason. Read-only and it only PROPOSES: turn the ones a person wants into terms with `propose_terms`. Needs a scanned service with a saved connection.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `service` | string | yes | The scanned service (as `register_source` / the connector run named it). |

## `propose_term_mapping`

Propose a correction to a term's OWL mapping — what kind of OWL thing it is (class, individual, objectProperty, dataProperty, annotationProperty, datatype) and its domain, range or class. **Queued for a person, never applied.** Use this instead of `update_term` for any mapping conclusion you reached by reading: a SKOS import stamps every concept a bare `class`, so a statutory provision that is really an individual of `StatutoryProvision`, or a relation that is really an `objectProperty`, is a wrong guess this corrects. Only the fields you name change; the rest are left alone, so correcting a kind will not erase a domain somebody chose. One open correction per term.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `domain` | string | no | A property's domain. Only valid on a property. |
| `instanceOf` | string | no | An individual's class. Only valid on an individual. |
| `owlKind` | string | no | class, objectProperty, dataProperty, individual, annotationProperty or datatype. Omit to leave the kind as it is. |
| `passage` | string | yes | What the source actually says — the ontology document, the statute, the pack file. |
| `range` | string | no | A property's range — a term name, an IRI, or an xsd: datatype. Only valid on a property. |
| `reasoning` | string | yes | Why the correction follows from that passage. Required — a passage alone makes the reviewer reconstruct your argument. |
| `termId` | string | yes | The term to correct. |

## `propose_terms`

Propose a batch of terms into one glossary, as drafts. Returns one outcome per term — stored, already exists, or refused with what to fix — never one verdict for the batch. Nothing here approves a term: naming is a governance act, and a person decides. **`domain`, `range`, `owlKind` and `instanceOf` are axioms, and approving the term approves them** — there is no second gate. So state them in the message that asks for approval: not "I propose a term `pan`" but "a data property `pan`, `rdfs:domain RegisteredPerson`, `rdfs:range xsd:string`". A reviewer told only the name is deciding on statements they cannot see, which is exactly what was reported here on 7 September 2026. **Every term carries its `owlKind`** — a SKOS concept does not say whether it is a class, an object property, a data property or an individual, so you must: read the term's role in the source and decide. **Read `pack_context` first** and do not propose what is already there, already mapped, or already awaiting review. **Place every term you propose.** `broader` and `related` take a term's *name*, exactly as `domain` does, and resolve against this glossary including terms proposed elsewhere in this same call, in either order — so a class and its parent can be sent together without you knowing either id. An `individual`'s `instanceOf` still proposes `broader` to that class on its own. All of these land as **candidates** awaiting review, never assertions: naming is a governance act either way. **A definition that says "a kind of X", or "the general category covering X and Y", is a hierarchy stated in prose — and prose is not a graph.** Measured here on 8 September 2026: `RegisteredPerson` was defined as covering `Supplier` and `Recipient`, both existed, and neither carried an edge to it, because placement was a second tool call and stating a `domain` was a word. Do not leave a term flat because nothing forced you to place it. A genuine root has no `broader`, and that is a decision worth saying out loud rather than a default to fall into. **The answer tells you what did not resolve**: a `stored` outcome carries `unplaced` naming every placement that matched no term, with the field it came from — fix the name and re-send, or place it with `propose_relations`. Use `propose_relations` for what this cannot express: a relation between two terms that already exist, a `related` you want to argue for from a quoted passage, or a match into another vocabulary.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `glossaryId` | string | yes | The glossary to propose into — its id, or its exact name (e.g. `Dairy_Demo`). A name is resolved automatically; if it does not match exactly one glossary, the call comes back not found. |
| `terms` | array | yes | The terms. Send all of them in one call — the per-item outcomes are what make that safe. |

## `query_graph`

Ask the graph directly, in SPARQL, for questions the other tools do not shape. Results are filtered to what you may see. Prefer the task-shaped tools where one fits — this one makes you do the traversal yourself. Import-sourced facts (anything from a pack or a connector) live in named graphs, not the default graph — wrap patterns in `GRAPH ?g { ... }` to reach them; a bare `{ ?s ?p ?o }` with no GRAPH clause only matches schema/vocabulary facts and returns an empty, valid-looking answer for everything else. `GRAPH <exact-iri> { ... }` with a literal graph name is unreliable here — use a variable and `FILTER(CONTAINS(STR(?g), "..."))` instead. This is also how to find data `traverse`/`analytics` cannot reach: an unmatched invoice with no edge into any customer's connected subgraph is still real, imported data — take a source name from `list_imports` and filter on it this way to see everything that source loaded, whether or not anything points to it. **Pass `workspace` whenever the question is about a named customer.** Without it this reads every customer's facts at once, and the answer is then only as narrow as a filter you had to know the shape of — which is how an investigation into one customer concluded only one of their datasets was loaded while all seven of them sat in the store. Resolve the name with `list_workspaces` first.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | A SPARQL SELECT or ASK query. |
| `workspace` | string | no | Run against one customer's own graphs — the slug `list_workspaces` returns for them. An unknown slug returns no rows rather than every customer's. |

## `query_graph_cypher`

Ask the same store in **Cypher**, as a property graph. Same facts as `query_graph`, same authorization, a different reading: a subject is a node with labels and a property map, and a relationship is a typed edge. **Choosing between this and `query_graph` (SPARQL).** They read one store, so neither is ever *wrong* — the question is which asks your question more directly. Reach for Cypher when the question is about the **shape of connections**: a variable-length path (`MATCH (a)-[*1..4]->(b)`), whether two things are connected at all, or a pattern over a neighbourhood. Those need recursion in SPARQL and are awkward to write and read. Reach for `query_graph` (SPARQL) when the question involves **reasoning or provenance**: what was derived versus asserted, which named graph or source asserted a fact, entailment, or anything citing a statutory rule. A named graph is a first-class RDF idea with no Cypher equivalent here — a property graph has nowhere to name one, so this reads across every graph at once and cannot tell you which source a fact came from. **When neither clearly applies, use `query_graph`**: it is the store's native reading, and the reasoning and provenance layers only exist there. Unlike `query_graph`, no `GRAPH ?g { ... }` wrapper is needed or possible — every graph is already in view. **Pass `workspace` whenever the question is about a named customer**, for the same reason `query_graph` says so: without it this reads every customer's facts at once. Resolve the name with `list_workspaces` first.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | A read-only Cypher query. `MATCH ... RETURN ...`; write clauses are refused. |
| `workspace` | string | no | Run against one customer's own graphs — the slug `list_workspaces` returns for them. An unknown slug returns no rows rather than every customer's. |

## `query_virtual_graph`

Ask a source database a question in place, through a virtual graph's approved mapping, in Cypher (`MATCH (l:MilkLot)-[:hasFarm]->(f:Farm) WHERE f.region = $region RETURN l.lot_id, f.name`). Read-only, under the graph's own row, time, hop and cost limits; every attempt is audited as hashes and counts. Use `list_virtual_graphs` first for the class, property and relationship names; a sensitive property is refused. Answers are rows from the live source — not the managed graph, and not reasoned over. Administrators only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `graph` | string | yes | The virtual graph's name, from `list_virtual_graphs`. |
| `language` | string | no | Default `cypher`. `gql` accepts GQL spellings (GRAPH g, ->{1,6}, IN UNNEST(x)); `sparql` takes a SELECT over a basic graph pattern, in any namespace (the local names are read). |
| `params` | object | no | Values for the query's `$name` parameters: a text, a whole number, or a list of one kind. Not used with SPARQL. |
| `query` | string | yes | The Cypher text; values go in `params` as `$name`, never into the text. |
| `workspace` | string | no | The customer's workspace slug. Required in a session scoped to one workspace. |

## `question_coverage`

For each competency question of a pack's model: what stands behind it (the classes, properties and rules recorded as made for it, and whether each is finished), the requirements the question states with the role each plays (explicit, implicit, derived) and whether a person confirmed them, which of those the model covers, and whether the question's query answered in the latest model check. Structure, requirements and answerability are separate facts. Requirements nobody confirmed are proposals: a figure from them measures agreement, not correctness. Read-only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose model to inspect. |

## `read_uploaded_file`

Read one uploaded dataset in full — its headers and rows, as the connected application itself parsed and stored them. Use the exact `clientId`, `periodId` and `kind` from `list_uploaded_files` — never invent one. `rowLimit` is present when the connected application's own preview cap truncated `rows` below `totalRows`. This dataset is *not* in the graph and is not a catalog asset: reading it here answers a question about the file, and getting its contents into the graph is still `register_source` and the pack pipeline.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `clientId` | string | yes | The clientId from `list_uploaded_files`. |
| `kind` | string | yes | The kind from `list_uploaded_files`, e.g. books, statements, payments, receipts. |
| `periodId` | string | yes | The periodId from `list_uploaded_files`. |

## `recall_memory`

Why this asset is the way it is: decisions, incidents, caveats and rationale people recorded about it. Each result says who wrote it, how sure they were, whether the asset has changed since, and whether anyone disagrees.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `fullyQualifiedName` | string | yes | The asset to recall knowledge about. |
| `query` | string | no | Optional words to rank against. Omit to get everything recorded about the asset. |

## `reconcile`

Run a pack's registered rules and record what they conclude as findings — the same computation the console's "Run reconciliation" button triggers. Admin-only: this writes to the review queue, unlike every other tool on this surface. **On a multi-tenant deployment, pass `workspace`** — call `list_workspaces` first to resolve a customer's name to its slug. Omitting it reconciles the whole store, every customer's data at once, which is very rarely what you want once more than one customer's facts are loaded.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack to reconcile, e.g. "dairy". |
| `workspace` | string | no | Narrow to one customer's own graphs — the slug `list_workspaces` returns for them. Omit only on a deployment where every graph belongs to one customer. |

## `record_investigation`

Record what you investigated, what you found, and what you checked. Evidence is required: a finding nobody can verify is a claim, not an investigation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `confidence` | number | yes |  |
| `evidence` | array | yes | The assets, tests or queries you examined. |
| `findings` | string | yes |  |
| `fullyQualifiedName` | string | yes |  |
| `rationale` | string | yes |  |

## `record_memory`

Record something you learned about an asset so the next agent — or person — does not have to rediscover it. Below 0.8 confidence this becomes a proposal rather than an assertion, whatever you have been granted.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `confidence` | number | yes | How sure you are. Required — an unlabelled agent memory would rank alongside a person's. |
| `content` | string | yes |  |
| `fullyQualifiedName` | string | yes |  |
| `rationale` | string | yes | What led you to this. Required. |

## `register_source`

Record where a body of terms comes from, before extracting any: a statute, a return format, an API schema, an existing ontology. Returns the source id to cite terms against. **A source whose licence would attach to everything derived from it is refused by name** — an existing ontology or a domain glossary is copied, so its licence travels; a statute or a specification is read, and reading one creates no obligation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `columnMapping` | object | no | Optional — how the loader's columns map to the pack predicates this source justifies, e.g. `{"LOT": "dairy:lotId"}`. Recorded so provenance is column-level rather than only source-graph-level: 'why is this value here' can name the column it came from. Omit for a source registered from a citation alone. |
| `contact` | string | no | Required for `licenceRequired`: who to ask. |
| `content` | string | no | The source text, hashed so a later change is visible. Omit if you only have the citation. |
| `effectiveDate` | string | no | ISO date the content took effect. For a dated provision this is the whole point. |
| `jurisdiction` | string | no | Which body of law or practice it belongs to. |
| `kind` | string | yes | legalStatute, regulation, notification, circular, technicalSpecification, businessDocument, domainGlossary, expertInput, databaseSchema, apiSpecification or existingOntology. |
| `licence` | string | yes | An SPDX identifier, e.g. `CC0-1.0`, `GPL-3.0`. Say what it actually is: guessing permissive is how a copyleft licence reaches a pack. |
| `licenceKind` | string | yes | permissive, attributionRequired or licenceRequired. Required — a manifest that omits this refuses rather than being guessed permissive. `licenceRequired` is this project's marker for copyleft and source-available terms, and it is the one a derivation is refused for. |
| `notice` | string | no | Required for `attributionRequired`: the notice that must be surfaced wherever a term from this source is displayed. |
| `publisher` | string | yes | Who published it — the authority the terms rest on. |
| `title` | string | yes | The source's own title. |
| `uri` | string | no | Where it can be found again. |
| `version` | string | no | The publisher's own version string, verbatim. |

## `replay_import`

Re-run one customer's period through the connected application's own loader — the operation that makes a loader fix take effect. **GraphOWL cannot do this itself**: it holds facts, not the uploaded file, so replaying from its own store would replay the old output. The connected application holds the rows and its reconcile re-runs the current loader over them (delete-then-import per source, then the findings pass) — the console's "Run reconciliation" button. Returns the application's report verbatim: read `ok`/`error` and the per-source `ingested` counts, never the absence of an error. Admin-only: this writes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `clientId` | string | yes | The clientId from `list_uploaded_files`. |
| `periodId` | string | yes | The periodId from `list_uploaded_files`. |

## `resolve_entity`

Given a name or id from unstructured text, find which real catalog assets it most likely refers to. Each candidate carries a similarity score (0 to 1), not a relevance rank — use this to link a mention to a real entity, not to browse the catalog (that is what `search_assets` is for).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `limit` | integer | no | How many candidates to return. Defaults to 25, capped at 100. |
| `query` | string | yes | The name or id to resolve. |

## `resolve_user`

The users whose id, display name or email match a query — resolving a reviewer from a name or address you already have, without enumerating every user in the deployment. Same gate as `list_users`: admin-only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | A user id, display name or email — or a part of a name or email. |

## `review_proposals`

Everything waiting for a human decision — undecided terms, and proposed relations with the evidence for each. Read this before summarising to a person: it is the whole queue, so a summary built from it is not missing half.

## `rewrite_query`

Rewrite a SPARQL read query written for one model into the other, through the workspace's ACCEPTED equivalences. Runs nothing: it returns the new query and a report of which correspondences were used, or a refusal with the reason (a refusal is an answer, not a failure — do not run a refused rewrite). Show the rewritten query to the person before running it.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `direction` | string | no | Which side of the correspondences the query is written in; default leftToRight. |
| `query` | string | yes | A SPARQL SELECT, CONSTRUCT or ASK query. |
| `useDerived` | boolean | no | Also rewrite through the equivalences the accepted ones imply. |
| `workspace` | string | no | The customer's workspace slug (see `list_workspaces`). Required in a session scoped to one workspace. |

## `run_competency_questions`

Run every competency question of a pack's model and report, for each, how many rows it returned — or that it failed, and why. Read-only. **Zero rows is a finding, not a pass**: the data may not be loaded or attached to the workspace, or the graph may be behind the model (compare `version` and `generatedVersion` from `get_ontology_model`). Pass `workspace` to ask what one customer can see.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose questions to run. |
| `workspace` | string | no | A workspace slug, to narrow the answer to what it can see. |

## `run_model_check`

Check a pack's SAVED model now: generate its graph, run every competency question and evaluate the record, then keep the run. It replaces the last generation, so it changes what every query sees - say so to the person. Admin only. Unsaved edits in the Model tab are not included. Returns the run's summary; read the findings with `model_health`. Pass `workspace` to run the questions as one customer sees the data.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose model to check. |
| `workspace` | string | no | A workspace slug, to run the questions as that customer sees the data. |

## `run_pack_query`

Run one of a pack's registered named queries — a bound lookup (e.g. "which provision is in force on this invoice's own date"), not free-hand SPARQL. Prefer this over `query_graph` when a pack declares a query shaped for your question; it already carries the right joins and the right idiom for "as of" comparisons.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `bindings` | object | no |  |
| `pack` | string | yes | The pack the query belongs to, e.g. "dairy". |
| `query` | string | yes | The query's own name, e.g. "provision-in-force". |

## `run_reasoning`

Run the OWL 2 RL reasoner for one customer: over that workspace's readable graphs, writing — and replacing — only that customer's own conclusions (`graph:reasoning-{workspace}`). The same run as the console's Run reasoning button. Run it after `install_pack`, so an approved axiom entails something; then query the conclusions with `query_graph`/`query_graph_cypher` scoped to the same workspace. Refused, naming the first offending axiom, when the ontology is outside OWL 2 RL — pass `force: true` only after telling the person the result will be partial.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `force` | boolean | no | Reason past an out-of-profile refusal; the report lists what was ignored. |
| `workspace` | string | yes | The customer's workspace slug (see `list_workspaces`). |

## `run_rule`

Evaluate one named rule from a pack and record what it concludes as findings — the single-rule counterpart to `reconcile`, for re-checking one rule rather than the whole pack. Admin-only: this writes to the review queue, unlike every other tool on this surface but `reconcile`.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `label` | string | yes | The rule's own label, e.g. "dairy:ColdChainBreach". |
| `pack` | string | yes | The pack the rule belongs to, e.g. "dairy". |

## `run_validation`

Run the SHACL validation pass and replace the stored queue, then report what it found. **This writes** — it recomputes every expectation against the current data and replaces the findings `explain_expectation` reads back — so it is admin-gated. Pass `workspace` whenever the question is about one customer, or the pass reads every customer's graphs at once; resolve a name to a slug with `list_workspaces` first. The result reports how many shapes ran, how many could not compile (reported, not hidden — a pass over eighteen of twenty shapes looks clean for the two that did not run), and whether a `sh:sparql` constraint was cut short by the query budget. After running, use `explain_expectation` to see the offenders.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `workspace` | string | no | Narrow the pass to one customer's own graphs — the slug `list_workspaces` returns for them. Omit to read the whole deployment. |

## `search_assets`

Find assets by name or description. Returns ranked hits, each with a trust summary saying whether it is certified, owned, and tested — so a choice between similarly-named tables can be made on more than the name.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `kind` | string | no | Optional asset kind to restrict to, e.g. table, column, dashboard. |
| `limit` | integer | no | How many hits to return. Defaults to 25, capped at 100. |
| `query` | string | yes | Words to match against names and descriptions. |

## `search_nodes`

Find graph subjects by what they mean, not by keyword. Searches the nodes the graph actually holds — invoices, suppliers, filings — which is a different and much larger population than `search_assets`, whose subject is the catalog's own asset records. Each hit says whether it is an `instance` (data) or `vocabulary` (a class or property definition); instances always rank first, because an ontology term's written definition otherwise outranks the data it describes. `available: false` means semantic search is switched off for this deployment — which is not the same as nothing matching.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `limit` | integer | no | How many to return. Defaults to 10. |
| `query` | string | yes | What to look for, in words. Meaning, not keywords — "suppliers who never filed" works without those words appearing. |

## `similar_nodes`

Subjects most like one you already have, by meaning. Costs no model call — the vector is already stored. Returns nothing when the subject itself has never been embedded, which `considered: 0` distinguishes from "nothing resembles it".

| Parameter | Type | Required | Description |
|---|---|---|---|
| `limit` | integer | no | How many to return. Defaults to 10. |
| `subject` | string | yes | The subject to find neighbours of, as `namespace:name` or an IRI. |

## `suggest_owl_model`

Draft an OWL `SemanticModel` from a pack's SKOS glossary, deterministically — the same glossary always yields the same model, so a person diffs a candidate rather than reviewing a file. **Read the pack's own documents first**: the ontology's declared `owl:Class`/ `owl:ObjectProperty`/`owl:DatatypeProperty`/`owl:NamedIndividual`, its `rdfs:domain`/`rdfs:range`/`rdfs:subClassOf`, and the classes its law types terms as instances of, all outrank anything derived from the glossary. Each decision carries a `tier`: `evidence` (a person's recorded mapping, or a declaration in the pack's own files — **not up for a vote, and not worth asking a model about**), `inference` (a heuristic over the glossary's structure, which can be wrong), or `noSignal` (nothing decided it — the residue a model drafts). Branch on `tier`, not on the prose `reason`. `skos:broader` becomes `rdfs:subClassOf` **only when the parent is also a class**, and a property with no declared domain gets none rather than a guess (RDFS reads two domains as their intersection). Read-only: it writes nothing and decides nothing. To accept a suggestion, propose it through `propose_term_mapping` / `propose_axiom` and let a person `decide_*` — an agent must not clear its own gate.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack whose glossary to draft a model from. |

## `sync_definitions`

Bring a pack's `glossary.ttl` and `ontology.ttl` definitions into line with its glossary's approved terms, one literal at a time — nothing else in either file changes, and an edit that cannot be proven to change only that definition is reported and not written. **A dry run unless `apply` is true**: it lists each definition a document states differently (what the file says, what the approved term says). Approving a term and amending its wording already do this for the term concerned; use this for drift that predates that, or when a document could not be edited at the time. It does not add a class a term has not been merged into the ontology as (that is `merge_pack`, because approval does not decide the OWL shape), skips a term with no wording, and does not install — run `install_pack` afterwards to project the changed documents into the graph.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `apply` | boolean | no | Write the changes. Omit or false to only report them. |
| `pack` | string | yes | The pack whose documents to bring into line. |
| `termIds` | array | no | Narrow to these terms. Omit for every drifted definition. |

## `traverse`

Walk a bounded neighbourhood outward from a subject, within a hop limit. Accepts a catalog asset's fully qualified name, or the IRI of a domain-pack subject directly (an invoice, a taxpayer) — including one found as a value inside another asset's own `properties` (e.g. a customer's `recipient` handle). An asset name is tried first; a name that names no asset is walked as a subject instead. `direction: upstream` (the default) follows edges that point into the subject — what feeds it, what was asserted about it. `downstream` follows edges pointing out of it. Empty is a correct, complete answer for the direction that has no edges; if the subject is expected to be connected, try the other direction before concluding it is not.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `direction` | string | no | Defaults to upstream (incoming edges — what points at this subject). downstream follows outgoing edges instead. |
| `fullyQualifiedName` | string | yes | The asset name or subject IRI to walk outward from. |
| `maxHops` | integer | no | Defaults to 2, capped at 6. |

## `update_term`

Correct a term's own fields — its definition, synonyms, abbreviations, or its owlKind mapping (domain/range/instanceOf). **On a draft or in-review term, any of them.** On an **approved** term the owlKind mapping can be corrected on its own — importing a pack's SKOS glossary creates every term `approved` with a bare `class` mapping, because a SKOS concept says nothing about what OWL thing it becomes, and an identifier like a tax number typed `class` would otherwise be baked into the ontology. **Its definition, synonyms and abbreviations are a person's decision**: ask the person, then send `decidedBy` (their name) and `humanDecision` (their words) with the change. It is applied, the term stays approved and its version moves, and what it said before, who decided and their words are kept. Refused without both. A **deprecated** term's wording is never revised — create a successor instead. `glossary.ttl` is refreshed by `write_pack_glossary`; an ontology comment already written is not rewritten by `merge_pack`, which only appends. Only the fields you send change; omit a field to leave it as is. **`owlKind`, when sent, replaces the whole mapping** — send `domain`/`range`/`instanceOf` again alongside it even where they are unchanged.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `abbreviations` | array | no | Replaces the whole list. Omit to leave it as is. |
| `decidedBy` | string | no | The person who decided an approved term's wording change — ask them; never yourself. |
| `definition` | string | no | Replaces the definition. Omit to leave it as is. |
| `domain` | string | no | A property's domain — a term name in this glossary, or a full IRI. Only read when `owlKind` is also sent. |
| `humanDecision` | string | no | What the person said, verbatim. |
| `instanceOf` | string | no | An individual's class. Only read when `owlKind` is also sent. |
| `owlKind` | string | no | class, objectProperty, dataProperty or individual. Omit entirely to leave the mapping as is. |
| `range` | string | no | A property's range — a term name or IRI for an object property, an `xsd:` datatype for a data property. Only read when `owlKind` is also sent. |
| `synonyms` | array | no | Replaces the whole list. Omit to leave it as is. |
| `termId` | string | yes | The term to correct — its id, as returned by `propose_terms` or `review_proposals`. |

## `validate_extraction`

Check one import source's facts against its pack's declared schema: every `(subject, predicate)` whose subject is not of a type the predicate is declared on, and every predicate the pack declares with no domain at all. **This is how the ARN defect becomes visible before it recurs** — 17 facts asserted a property on invoice lines that the ontology declares only on filings, and nothing consulted the schema to say so. The schema is read from the pack's own `ontology.ttl`, never the installed model, so a domain that has been written down but not yet installed still constrains the check. Read-only: it reports what a source already wrote. `source` is a value from `list_imports`.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pack` | string | yes | The pack id, e.g. `dairy-demo`. |
| `source` | string | yes | The import source to check, as `list_imports` reported it. |
| `workspace` | string | no | Optional — narrow to one customer's own graphs. The slug `list_workspaces` returns. |

## `write_pack_expectations`

Write a pack's SHACL expectations and **install them** — the missing half of the expectation surface: `preview_expectations` and `run_validation` existed, but nothing on this surface could install a shape. The document is imported into the shapes graph (what makes a shape live) and written to the pack's `expectations.ttl` (the durable source beside it), with the same refuse-to-drop guard `write_pack_ontology` uses. A document that does not parse is refused before either half runs, so a file holding shapes that never took effect cannot exist. Admin-only.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `document` | string | yes | The complete SHACL document, in Turtle. |
| `force` | boolean | no | Write even though triples already in the file would be dropped. A deliberate act, not a retry. |
| `pack` | string | yes | The pack whose expectations to write. |

## `write_pack_glossary`

Write a pack's own `glossary.ttl` — the SKOS half, symmetric with `write_pack_ontology`. **Read the current file first and append to it**: this replaces the document, and one that would drop concepts already there is refused and names them. `force` overrides that; never send it to get past a refusal you did not expect. Writes a file and projects nothing — `install_pack` is what reaches the graph.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `force` | boolean | no | Write even though concepts already in the file would be dropped. A deliberate act, not a retry. |
| `pack` | string | yes | The pack whose glossary.ttl to write. |
| `turtle` | string | yes | The complete SKOS document, not a fragment. |

## `write_pack_ontology`

Write a compiled ontology to a pack's own `ontology.ttl` — the step between `compile_pack` and anything a person can see. `compile_pack` returns Turtle and installs nothing, so without this the last hop was a human copying a textarea into a file. **It appends to a real file that a person wrote.** A document that would drop triples already there is refused and names them, because regenerating a pack's ontology from its glossary alone once replaced 25 hand-authored classes, their prose and every property with a domain — and reported success. Pass the whole document you intend the file to contain, not just your additions. Writing does **not** load it into the graph; `install_pack` does.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `document` | string | no | Which of the pack's ontology documents to write, e.g. "law.ttl". Omit for the pack's main `ontology.ttl`. A name the pack does not carry yet creates that document and registers it, so `install_pack` loads it rather than leaving a file nothing reads. |
| `force` | boolean | no | Write even though it drops triples the file already has. **Never send this to get past a refusal you did not expect** — the refusal names what would be lost, and losing it is a decision for a person. |
| `pack` | string | yes | The installed pack whose ontology.ttl to write. |
| `turtle` | string | yes | The complete document. Read the current one first and append to it — this replaces the file. |
