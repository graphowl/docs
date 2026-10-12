---
title: "Cookbook: agent memory"
description: "Let an assistant remember what it learned, on the record, and recall it next session."
---

**The question.** How does an assistant keep what it learned about an asset, so the next session starts informed, and a person can see who said what and how sure they were?

## 1. Connect and look around

From an MCP client: `list_workspaces`, then `search_assets` with a word from your domain, then `get_asset_context` on what it finds. See [Connect a client](/ai/connect-a-client/).

## 2. Record what was learned

When the assistant works out something about an asset (a decision, an incident, a caveat), it calls `record_memory` with the asset's fully qualified name and the note. The memory is stored **against the asset**, with who wrote it and how sure they were.

For a longer piece of work, `record_investigation` keeps the whole trail: what was asked, what was found, and what is still open.

## 3. Recall it next time

`recall_memory` takes the asset's name and optional words to rank against. Each result says **who wrote it, how sure they were, whether the asset has changed since, and whether anyone disagrees**. A memory about a column that has since been dropped says so.

## 4. Keep it honest

- The agent's **grant** must include `recordMemory` (and `recordInvestigation`); without it the call is refused, and the refusal is recorded.
- Memories are claims, not facts about the world. Change what the graph *asserts* only through [proposals a person approves](/ai/patterns/).

## What this shows

Memory that is attributable, dated and contradictable is context an organisation can trust. A pile of notes in a prompt is none of these.
