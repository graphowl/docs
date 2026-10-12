---
title: "Agent patterns"
description: "How to build agents that use GraphOWL without becoming a source of unreviewed claims."
---

![Proposals flow to a review queue, then to the approved model, then to the graph](/brand/review-flow.svg)

## An agent that proposes, a human that approves

Let the agent call `propose_*` tools (terms, relations, axioms, metadata changes). Each creates a **proposal** that appears in the review queue. A person approves or rejects it with a reason. An agent that cannot change what the graph claims, only suggest, is one you can leave running.

A loop that works:

1. `search_assets` / `get_asset_context` to read what exists.
2. `query_graph` to check a hypothesis against the data.
3. `propose_terms` or `propose_relations` with the evidence it found.
4. A person reviews and decides (`decide_term`, `decide_relation`); the agent can read the outcome next session.

## Give each agent the least it needs

An agent's **grant** lists the capabilities it may use (for example, record an investigation, propose a description). A call outside the grant is refused, and the refusal is recorded. Grant read-only agents nothing beyond reading. Grants are managed under `/agents/grants`.

## Let it remember, on the record

`record_memory` and `record_investigation` keep what an agent learned attached to the asset it concerned, with who wrote it and how sure they were. `recall_memory` returns those notes with the author, the confidence, whether the asset has changed since, and whether anyone disagrees. The next session starts informed instead of blank. See the [agent memory cookbook](/cookbooks/agent-memory/).

## Make answers traceable

Prefer tools that return their evidence (`explain`, `find_evidence`, `get_asset_context`) and have the agent cite it. A derived fact is marked derived; an agent should say so rather than present it as stated.

## Validate before it answers

`run_validation` and `list_findings` tell an agent whether the data it is about to cite is currently valid, so it can say "this record has an open violation" instead of stating it as clean.

## Scope by workspace

Run an agent in a session scoped to the one workspace it serves, so it cannot read another team's data.

## What to avoid

- **Letting an agent write straight to the graph.** Use proposals.
- **One shared credential for every agent.** Give each its own identity and grant, so a refusal or a bad proposal is attributable.
- **Treating a memory as a fact.** A memory is a claim with an author; the graph asserts only what a person approved.
