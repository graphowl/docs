---
title: "Formats and content types"
description: "The formats GraphOWL reads and writes."
---

| Format | Import | Export |
|---|---|---|
| Turtle | yes | yes |
| N-Triples | yes | yes |
| JSON-LD | yes | yes |
| N-Quads | no | yes |
| RDF/XML | no | no |
| TriG | no | no |
| JSON Lines | via the ingestion API | yes (`/graph/export/jsonl`) |
| CSV | via the ingestion API | yes (bulk-import files) |
| GraphML, JSON Graph | no | yes |
| Cypher statements | no | yes (`/graph/export/cypher`) |

Checked 12 October 2026 against the server. See [Standards](/reference/standards/) for the standards rows and [Export your data](/guides/export/) for the routes. Exports can be lossy for property-graph targets; `GET /graph/export/preview` reports what would be lost before you export.
