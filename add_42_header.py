#!/usr/bin/env python3
"""
Script to add or update 42 standard headers in C/C++ source and header files.
Usage:
    ./add_42_header.py <file1> <file2> ...
    ./add_42_header.py <directory>
"""

import os
import sys
import time
import re

DEFAULT_USER = os.environ.get("USER", "kgan")
DEFAULT_MAIL = os.environ.get("MAIL", f"{DEFAULT_USER}@student.42singapore.sg")

HEADER_BORDER = "/* " + "*" * 74 + " */"
HEADER_EMPTY  = "/* " + " " * 74 + " */"

def generate_header(filename, user, mail, created=None, updated=None):
    now = time.strftime("%Y/%m/%d %H:%M:%S")
    created = created or now
    updated = updated or now

    basename = os.path.basename(filename)
    by_field = f"{user} <{mail}>"

    l1  = HEADER_BORDER
    l2  = HEADER_EMPTY
    l3  = "/*                                                        :::      ::::::::   */"
    l4  = f"/*   {basename[:43]:<51}:+:      :+:    :+:   */"
    l5  = "/*                                                    +:+ +:+         +:+     */"
    l6  = f"/*   By: {by_field[:43]:<43}+#+  +:+       +#+        */"
    l7  = "/*                                                +#+#+#+#+#+   +#+           */"
    l8  = f"/*   Created: {created} by {user[:18]:<18}#+#    #+#             */"
    l9  = f"/*   Updated: {updated} by {user[:17]:<17}###   ########.fr       */"
    l10 = HEADER_EMPTY
    l11 = HEADER_BORDER

    return "\n".join([l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11])

def process_file(filepath, user, mail):
    if not os.path.isfile(filepath):
        return

    with open(filepath, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()

    lines = content.splitlines()
    has_header = False
    created_date = None

    if len(lines) >= 11 and lines[0] == HEADER_BORDER and lines[10] == HEADER_BORDER:
        has_header = True
        # Try to extract the original created timestamp
        match = re.search(r"Created:\s+(\d{4}/\d{2}/\d{2} \d{2}:\d{2}:\d{2})", lines[7])
        if match:
            created_date = match.group(1)

    new_header = generate_header(filepath, user, mail, created=created_date)

    if has_header:
        # Keep everything after the 11-line header
        rest = lines[11:]
        # If there's an extra blank line right after header, keep it clean
        if rest and rest[0] == "":
            rest = rest[1:]
        new_content = new_header + "\n\n" + "\n".join(rest)
        if rest:
            new_content += "\n"
        print(f"[UPDATED] {filepath}")
    else:
        # Prepend header
        new_content = new_header + "\n\n" + content
        if not content.endswith("\n"):
            new_content += "\n"
        print(f"[ADDED]   {filepath}")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <file or dir> [file2 ...]")
        sys.exit(1)

    user = os.environ.get("USER", DEFAULT_USER)
    mail = os.environ.get("MAIL", DEFAULT_MAIL)

    targets = []
    for arg in sys.argv[1:]:
        if os.path.isdir(arg):
            for root, _, files in os.walk(arg):
                for f in sorted(files):
                    if f.endswith((".c", ".h")):
                        targets.append(os.path.join(root, f))
        elif os.path.isfile(arg):
            targets.append(arg)
        else:
            print(f"[WARN] Target not found: {arg}")

    if not targets:
        print("No matching files found.")
        return

    for t in targets:
        process_file(t, user, mail)

if __name__ == "__main__":
    main()
