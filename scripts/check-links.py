#!/usr/bin/env python3
"""Fails if any internal link or asset in dist/ points at a file that does not exist."""
import re, sys
from pathlib import Path
dist = Path(__file__).resolve().parent.parent / "dist"
missing = set()
for page in dist.rglob("*.html"):
    for href in re.findall(r'(?:href|src)="(/docs/[^"#?]*)', page.read_text()):
        target = dist / href[len("/docs/"):]
        if not (target.is_file() or (target / "index.html").is_file()):
            missing.add((str(page.relative_to(dist)), href))
for page, href in sorted(missing):
    print(f"{page}: {href}")
sys.exit(1 if missing else 0)
