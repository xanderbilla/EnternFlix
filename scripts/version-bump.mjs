#!/usr/bin/env node
/**
 * Compute next semver version for a given environment.
 *
 * Usage:
 *   node scripts/version-bump.mjs --env <dev|prod> [--bump <auto|major|minor|patch>] [--write] [--messages "<commit subjects>"]
 *
 * Behaviour:
 * - Reads `.version.<env>` (creates 0.1.0 if absent).
 * - When --bump=auto (default), the bump type is derived from commit
 *   message subjects passed via --messages or read from stdin.
 *   Highest-precedence type wins:  major > feat > fix/patch/chore/docs.
 *   Defaults to "patch" if nothing matched.
 * - Prints a single line to stdout:  next=<x.y.z> bump=<type> prev=<x.y.z>
 * - With --write, writes the new version back to `.version.<env>` (with
 *   trailing newline).
 *
 * Exit codes:
 *   0 success, 2 invalid input.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const SEMVER_RE = /^(\d+)\.(\d+)\.(\d+)$/;

function parseArgs(argv) {
  const args = { env: null, bump: "auto", write: false, messages: "" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--env") args.env = argv[++i];
    else if (a === "--bump") args.bump = argv[++i];
    else if (a === "--write") args.write = true;
    else if (a === "--messages") args.messages = argv[++i] ?? "";
  }
  return args;
}

function fail(msg, code = 2) {
  console.error(`[version-bump] ${msg}`);
  process.exit(code);
}

function readVersion(file) {
  if (!existsSync(file)) return "0.1.0";
  const raw = readFileSync(file, "utf8").trim();
  if (!SEMVER_RE.test(raw)) fail(`Invalid version in ${file}: "${raw}"`);
  return raw;
}

function detectBumpFromMessages(messages) {
  const lines = messages
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  let best = null;
  const rank = { major: 3, minor: 2, patch: 1 };
  for (const line of lines) {
    const head = line.toLowerCase().split(":")[0].trim();
    let kind = null;
    if (head === "major" || head.endsWith("!")) kind = "major";
    else if (head === "feat" || head === "feature") kind = "minor";
    else if (
      head === "fix" ||
      head === "patch" ||
      head === "chore" ||
      head === "docs"
    )
      kind = "patch";
    if (kind && (best === null || rank[kind] > rank[best])) best = kind;
  }
  return best ?? "patch";
}

function applyBump(version, kind) {
  const m = SEMVER_RE.exec(version);
  if (!m) fail(`Invalid current version: ${version}`);
  let [, x, y, z] = m.map(Number);
  switch (kind) {
    case "major":
      x += 1;
      y = 0;
      z = 0;
      break;
    case "minor":
    case "feat":
    case "feature":
      y += 1;
      z = 0;
      kind = "minor";
      break;
    case "patch":
    case "fix":
    case "chore":
    case "docs":
      z += 1;
      kind = "patch";
      break;
    default:
      fail(`Unknown bump type: ${kind}`);
  }
  return { next: `${x}.${y}.${z}`, kind };
}

const args = parseArgs(process.argv.slice(2));
if (args.env !== "dev" && args.env !== "prod") {
  fail("--env must be 'dev' or 'prod'");
}

const versionFile = resolve(repoRoot, `.version.${args.env}`);
const prev = readVersion(versionFile);

let bumpKind = args.bump;
if (bumpKind === "auto") bumpKind = detectBumpFromMessages(args.messages);

const { next, kind } = applyBump(prev, bumpKind);

if (args.write) writeFileSync(versionFile, `${next}\n`, "utf8");

process.stdout.write(`next=${next} bump=${kind} prev=${prev}\n`);
