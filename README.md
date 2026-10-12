# GraphOWL documentation

Source of the documentation at <https://graphowl.app/docs>, built with [Astro Starlight](https://starlight.astro.build).

- Hand-written pages are in `src/content/docs/`.
- **Two pages are generated, never edited by hand:** `api/reference.md` (from `data/openapi.json`) and `ai/mcp-tools.md` (from `data/mcp-tools.json`). Run `python3 scripts/generate-reference.py`. The script fails if internal vocabulary survives.
- `scripts/fetch-mcp-tools.sh` refreshes the tool list from a running server (use the demo or a scratch server, never a customer's).
- `scripts/publish-site.sh` builds, link-checks and copies the output into the site repository.

```bash
npm install
npm run dev        # http://localhost:4321/docs/
npm run build
```

Every page is checked against the running product and says so where something is not built yet. Found a mistake? [Open an issue](https://github.com/graphowl/graphowl/issues/new/choose) or edit the page.

## Licence

Text: [CC BY 4.0](LICENSE). Code samples: Apache-2.0. The GraphOWL name and logos are not covered; see the [brand terms](https://github.com/graphowl/graphowl/blob/main/brand/README.md).
