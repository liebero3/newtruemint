#!/usr/bin/env python3

from __future__ import annotations

import re
from pathlib import Path
from typing import Iterable


HEADER_WITH_BOLD = re.compile(r"^\s*#{1,6}\s+.*\*\*.*\*\*.*$")
FULL_LINE_BOLD   = re.compile(r"^\s*\*\*[^*]+\*\*\s*$")


def fix_line(line: str) -> str:
    """Wendet die beiden Ersetzungsregeln auf eine Zeile an."""
    if HEADER_WITH_BOLD.match(line):
        # Alle Fettschrift-Marker entfernen
        return line.replace("**", "")
    if FULL_LINE_BOLD.match(line):
        # Fettschrift entfernen und als H3-Überschrift ausgeben
        content = line.strip()
        content = content[2:-2].strip()      # umschließende ** entfernen
        return f"### {content}\n"
    return line


def process_file(path: Path) -> None:
    """Liest die Datei, transformiert alle Zeilen und überschreibt die Datei."""
    original_lines = path.read_text(encoding="utf-8").splitlines(keepends=True)
    new_lines = [fix_line(l) for l in original_lines]

    if new_lines != original_lines:
        path.write_text("".join(new_lines), encoding="utf-8")
        print(f"✔  {path}")
    else:
        print(f"—  {path} (unverändert)")


def all_md_files(root: Path) -> Iterable[Path]:
    """Alle Markdown-Dateien im Verzeichnisbaum liefern."""
    yield from root.rglob("*.md")


if __name__ == "__main__":
    root_dir = Path.cwd()
    for md_file in all_md_files(root_dir):
        process_file(md_file)
