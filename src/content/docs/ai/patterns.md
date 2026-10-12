---
title: "Agent patterns"
description: "How to build agents that use GraphOWL without becoming a source of unreviewed claims."
---

## An agent that proposes, a human that approves

Let the agent call `propose_*` tools (terms, relations, axioms, metadata changes). Each creates a **proposal** that appears in the review queue. A person approves or rejects it with a reason. An agent that cannot change what the graph claims, only suggest, is one you can leave running.

## Give each agent the least it needs

An agent's **grant** lists the capabilities it may use (for example, record an investigation, propose a description). A call outside the grant is refused, and the refusal is recorded. Grant read-only agents nothing beyond reading.

## Let it remember, on the record

`record_memory` and `record_investigation` keep what an agent learned attached to the asset it concerned, with who wrote it and how sure they were. `recall_memory` returns those notes with the author, the confidence, whether the asset has changed since, and whether anyone disagrees. The next session starts informed instead of blank.

## Make answers traceable

Prefer tools that return their evidence (`explain`, `find_evidence`, `get_asset_context`) and have the agent cite it. A derived fact is marked derived; an agent should say so rather than present it as stated.

## Scope by workspace

Run an agent in a session scoped to the one workspace it serves.
