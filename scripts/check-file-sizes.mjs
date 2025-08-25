#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd(), "src");
const exts = new Set([".ts", ".tsx", ".css"]);
const maxLines = Number(process.env.MAX_LINES || 400);
const warnLines = Number(process.env.WARN_LINES || 350);

/**
 * Recursively walk directory and collect file paths matching extensions
 */
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else if (exts.has(path.extname(e.name))) files.push(full);
  }
  return files;
}

function countLines(file) {
  const content = fs.readFileSync(file, "utf8");
  // Normalize newlines and split
  return content.split(/\r?\n/).length;
}

const files = fs.existsSync(root) ? walk(root) : [];
const warnings = [];
const errors = [];

for (const f of files) {
  const lines = countLines(f);
  if (lines > maxLines) errors.push({ file: f, lines });
  else if (lines >= warnLines) warnings.push({ file: f, lines });
}

if (warnings.length) {
  console.log("\nFile size warnings (line count approaching limit):");
  for (const w of warnings) {
    console.log(
      `- ${path.relative(process.cwd(), w.file)}: ${
        w.lines
      } lines (warn ≥ ${warnLines})`
    );
  }
}

if (errors.length) {
  console.error("\nFile size violations:");
  for (const e of errors) {
    console.error(
      `- ${path.relative(process.cwd(), e.file)}: ${
        e.lines
      } lines (max ${maxLines})`
    );
  }
  console.error(
    "\nTip: Split large components into smaller files; extract data to content modules; use composition."
  );
  process.exit(1);
}

console.log(
  `\n✅ File size check passed. (${files.length} files scanned; limit ${maxLines} lines)`
);
