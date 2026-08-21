#!/usr/bin/env node
/**
 * Fails if any local href/src in index.html, brief.html or demos/*.html points at a file
 * that does not exist.
 *
 * Script bodies are stripped before scanning. They contain strings like
 * href="' + x + '" that look like references but are built at runtime.
 *
 * Usage:  node scripts/check-links.mjs [rootDir]
 * Exit 0 = every local reference resolves.
 * Exit 1 = broken references, listed on stderr.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? ".");

function htmlFiles() {
  const files = [];
  if (fs.existsSync(path.join(root, "index.html"))) files.push("index.html");
  if (fs.existsSync(path.join(root, "brief.html"))) files.push("brief.html");

  const demos = path.join(root, "demos");
  if (fs.existsSync(demos)) {
    for (const f of fs.readdirSync(demos).sort()) {
      if (f.endsWith(".html")) files.push(path.join("demos", f));
    }
  }
  return files;
}

const files = htmlFiles();

if (files.length === 0) {
  console.error(`check-links: no HTML files found under ${root}`);
  process.exit(1);
}

const broken = [];
let checked = 0;

for (const rel of files) {
  const source = fs
    .readFileSync(path.join(root, rel), "utf8")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  for (const match of source.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const ref = match[1];

    // External and non-file schemes are out of scope.
    if (/^(https?:|mailto:|tel:|data:|\/\/)/i.test(ref)) continue;

    checked++;

    const target = path.normalize(
      path.join(path.dirname(path.join(root, rel)), ref.split("?")[0])
    );

    if (!fs.existsSync(target)) broken.push(`${rel} -> ${ref}`);
  }
}

if (broken.length > 0) {
  console.error(`check-links: ${broken.length} broken reference(s)\n`);
  for (const entry of broken) console.error(`  ${entry}`);
  console.error("");
  process.exit(1);
}

console.log(
  `check-links: ${checked} local reference(s) across ${files.length} file(s) — all resolve.`
);
