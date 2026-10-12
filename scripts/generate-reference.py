#!/usr/bin/env python3
"""Generates the API reference and the MCP tool reference from the published data files.

  data/openapi.json     the public API description (copied from the hub's api/openapi.json)
  data/mcp-tools.json   the server's own `tools/list` answer (scripts/fetch-mcp-tools.sh)

Nothing in the two generated pages is typed by hand. Sentences that carry internal or domain-specific
vocabulary are dropped, and the script fails if anything of that kind survives in its output.
"""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "src/content/docs"
INTERNAL = re.compile(r"Epic \d|Plan \d|plans/|Slice [A-Z0-9]\b|Phase \d|graph_owl|graph-owl|\bgst\b|GSTIN|\bGST\b|ReconNow|reco-?now|Surya|CLAUDE", re.I)


def clean(text):
    """Keeps the sentences that are safe to publish; collapses whitespace."""
    flat = re.sub(r"\s+", " ", text).strip()
    sentences = re.split(r"(?<=[.!?])\s+(?=[A-Z`*(])", flat)
    return " ".join(s for s in sentences if not INTERNAL.search(s)).strip()


def cell(text):
    return clean(text).replace("|", "\\|")


def api_reference():
    spec = json.loads((ROOT / "data/openapi.json").read_text())
    groups = defaultdict(list)
    for path, ops in sorted(spec["paths"].items()):
        section = path.strip("/").split("/")[0] or "root"
        for method, op in ops.items():
            if method in ("get", "post", "put", "patch", "delete") and isinstance(op, dict):
                groups[section].append((method.upper(), path, cell(op.get("summary", ""))))
    out = ["---", "title: API reference", "description: Every route of the GraphOWL HTTP API, grouped by area. Generated from the published OpenAPI description.", "---", "",
           f"{sum(len(v) for v in groups.values())} operations in {len(groups)} areas, generated from [`openapi.json`](https://github.com/graphowl/graphowl/blob/main/api/openapi.json). Request and response shapes are in that file; paste it into any OpenAPI viewer for the full detail.", ""]
    for section in sorted(groups):
        out += [f"## {section}", "", "| Method | Path | What it does |", "|---|---|---|"]
        out += [f"| `{m}` | `{p}` | {s} |" for m, p, s in groups[section]]
        out.append("")
    (DOCS / "api/reference.md").write_text("\n".join(out))


def type_of(schema):
    if "type" in schema:
        t = schema["type"]
        return " or ".join(t) if isinstance(t, list) else t
    return "object" if "properties" in schema else "any"


def mcp_tools():
    tools = sorted(json.loads((ROOT / "data/mcp-tools.json").read_text())["result"]["tools"], key=lambda t: t["name"])
    out = ["---", "title: MCP tool reference", "description: Every tool the GraphOWL MCP server offers, with its parameters. Generated from the server's own tools/list answer.", "---", "",
           f"The server offers **{len(tools)} tools**. This page is generated from the server's own `tools/list` answer, so it cannot drift from what an agent actually sees. See the [overview](../mcp-overview/) for how they fit together.", ""]
    for t in tools:
        out += [f"## `{t['name']}`", "", clean(t.get("description", "")), ""]
        props = t.get("inputSchema", {}).get("properties", {})
        required = set(t.get("inputSchema", {}).get("required", []))
        if props:
            out += ["| Parameter | Type | Required | Description |", "|---|---|---|---|"]
            out += [f"| `{n}` | {type_of(s)} | {'yes' if n in required else 'no'} | {cell(s.get('description', ''))} |" for n, s in props.items()]
            out.append("")
    (DOCS / "ai/mcp-tools.md").write_text("\n".join(out))


def main():
    api_reference()
    mcp_tools()
    leaks = [str(p) for p in (DOCS / "api/reference.md", DOCS / "ai/mcp-tools.md") if INTERNAL.search(p.read_text())]
    if leaks:
        sys.exit(f"internal vocabulary survived in: {leaks}")
    print("generated api/reference.md and ai/mcp-tools.md")


main()
