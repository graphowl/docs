---
title: "Cookbook: rules and compliance"
description: "Say which records break which rule, and why, with constraints, expectations and waivers."
---

**The question.** Which records break which rule, and has anyone accepted the exception?

Three tools, from simplest to most specific.

## 1. A constraint

A **shape** states what data must look like. For example, a quality test value must be present and numeric, or a lot must name a farm. Import shapes with `POST /validation/shapes/import`; preview them first with `POST /validation/shapes/preview` to see what would change.

## 2. Run validation

```bash
curl -X POST "$URL/validation/runs" -H "Authorization: Bearer $TOKEN" -H "x-graphowl-workspace: dairy-coop"
curl "$URL/validation/report?limit=20" -H "Authorization: Bearer $TOKEN" -H "x-graphowl-workspace: dairy-coop"
```

The report lists violations worst first, with total and paging. An empty report with `computedAt: null` means it has not run, not that the data is clean.

## 3. Record a decision, not a silence

When a violation is accepted, record a **waiver** (`/validation/waivers`) with the reason. A waived violation stays visible as a decision, so the exception is auditable instead of invisible.

## 4. Expectations

An **expectation** is a named quality check with a pass and fail count, for example "every lot has a farm". They are listed at `/validation/expectations`, and `preview_expectations` and `explain_expectation` from an agent show what a check would do and why.

## 5. A threshold that is a fact

The dairy data has a limit of 400,000 for somatic cell count. Keep the limit as a parameter of the pack (it is an example, not a regulatory value) rather than in query text, so the rule and its threshold are reviewed like any other model change.

## What this shows

- A rule is data, with an author and a review, like everything else.
- Validation never changes the data; it reports.
- A decision (waiver) is a fact too, so the history of "we knew and accepted it" is queryable.

See [Reason and validate](/guides/reasoning-and-validation/) for the routes.
