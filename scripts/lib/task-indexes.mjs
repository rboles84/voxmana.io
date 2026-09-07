import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { readCorpus, comparePath, duplicates, ARCHIVE_ROOT, safePath } from "./task-history.mjs";

export const VIEWS = ["docs/kanban/board.md", "docs/handoffs/HANDOFF_INDEX.md"];
export const digest = text => crypto.createHash("sha256").update(text).digest("hex");
const normalize = text => text.replaceAll("\r\n", "\n");
const cell = value => String(value ?? "Unknown").replaceAll("|", "\\|").replace(/\r?\n/g, " ").replace(/[\u0000-\u001f]/g, "");
function linked(record, base) { return "[" + cell(record.title).replaceAll("[", "\\[").replaceAll("]", "\\]") + "](" + path.posix.relative(base, record.file) + ")"; }
function sealed(body) { return "<!-- task-view-sha256:" + digest(body) + " -->\n" + body; }
function intact(text) {
  const match = normalize(text).match(/^<!-- task-view-sha256:([0-9a-f]{64}) -->\n([\s\S]*)$/);
  return !!match && digest(match[2]) === match[1];
}
export function verifyArchives(root) {
  const file = ARCHIVE_ROOT + "/manifest.json", manifest = JSON.parse(fs.readFileSync(safePath(root, file), "utf8"));
  if (!/^[0-9a-f]{40}$/.test(manifest.revision) || manifest.files?.length !== 2) throw new Error("Invalid manual-view archive manifest.");
  for (const original of VIEWS) {
    const entry = manifest.files.find(f => f.source === original);
    if (!entry || !/^[0-9a-f]{64}$/.test(entry.sha256)) throw new Error("Missing archived manual view: " + original);
    const bytes = fs.readFileSync(safePath(root, ARCHIVE_ROOT + "/" + entry.archive));
    if (digest(bytes) !== entry.sha256) throw new Error("Archived manual-view hash mismatch: " + original);
  }
  return manifest;
}
export function generateViews(root) {
  const manifest = verifyArchives(root), corpus = readCorpus(root);
  if (!corpus.cards.length) throw new Error("No source cards; refusing destructive empty board generation.");
  const archiveNotice = "Historical manual views and index-only narrative: [archive](../archive/phase4-manual-views/README.md). Historical context never authorizes current state or admission.\n";
  let board = "# Vox Mana Kanban Board\n\nGenerated from individual cards. Do not edit; run npm run task -- indexes --write.\nDeclared state is not proof of admission, QA, Owner approval or integration. This is a projection of checkout sources; Git establishes committed history.\n\n" + archiveNotice +
    "\nProtected work remains governed by [AGENTS](../../AGENTS.md) and the [CRIT-001 incident authority](../incidents/CRIT-001-faction-semantic-readiness-integrity.md).\n";
  const groups = ["Backlog", "Ready", "In Progress", "Owner Review", "Accepted", "Integrated", "Blocked", "Deferred", "Done", "Unresolved"];
  for (const state of groups) {
    board += "\n## " + state + "\n\n| ID | Card | Declared status | Diagnostics |\n|---|---|---|---|\n";
    for (const c of corpus.cards.filter(c => (c.status ?? "Unresolved") === state).sort((a, b) => comparePath(a.id ?? "", b.id ?? "") || comparePath(a.file, b.file))) {
      const notes = [...c.diagnostics];
      if (duplicates(corpus.cards).some(d => d.files.includes(c.file))) notes.push("Duplicate ID; source path identifies this record.");
      board += "| " + cell(c.id) + " | " + linked(c, "docs/kanban") + " | " + cell(c.rawStatus) + " | " + cell(notes.join(" ")) + " |\n";
    }
  }
  let index = "# Vox Mana Agent Handoff Index\n\nGenerated from individual handoffs. Do not edit; run npm run task -- indexes --write.\nAuthored observations retain their original meaning; this view does not certify task state.\n\n" + archiveNotice +
    "\n| Authored / filename date | Agent | Handoff | Related task references | Diagnostics |\n|---|---|---|---|---|\n";
  for (const h of corpus.handoffs) index += "| " + cell(h.date ?? "Undated") + " (" + h.dateSource + ") | " + cell(h.agent) + " | " + linked(h, "docs/handoffs") + " | " + cell(h.directIds.join(", ")) + " | " + cell(h.diagnostics.join(" ")) + " |\n";
  const outputs = [sealed(board), sealed(index)];
  for (const output of outputs) if (!intact(output) || output.includes("\u0000")) throw new Error("Invalid candidate view output.");
  return { outputs, corpus, manifest };
}
function gitText(root, args) {
  try { return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); }
  catch { return null; }
}
function journalPath(root) {
  const gitPath = gitText(root, ["rev-parse", "--git-path", "task-index-transaction.json"]);
  if (!gitPath) throw new Error("Index writes require an identified Git worktree.");
  return path.resolve(root, gitPath.trim());
}
function recover(root, journal, io) {
  const data = JSON.parse(io.readFileSync(journal, "utf8"));
  if (data.root !== path.resolve(root) || data.files?.length !== 2 || data.files.some((f, i) => f.file !== VIEWS[i])) throw new Error("Invalid index-write recovery journal.");
  for (const f of data.files) {
    const current = io.readFileSync(safePath(root, f.file)).toString("base64");
    if (current !== f.before && current !== f.after) throw new Error("Interrupted write has subsequent manual changes; preserve/reconcile before recovery.");
  }
  for (const f of data.files) {
    const temporary = safePath(root, f.file) + ".task-index-tmp";
    if (io.existsSync(temporary)) {
      if (io.readFileSync(temporary).toString("base64") !== f.after) throw new Error("Unexpected recovery temporary content; preserve/reconcile it.");
    }
  }
  for (const f of data.files) io.writeFileSync(safePath(root, f.file), Buffer.from(f.before, "base64"));
  for (const f of data.files) {
    const temporary = safePath(root, f.file) + ".task-index-tmp";
    if (io.existsSync(temporary)) io.unlinkSync(temporary);
  }
  io.unlinkSync(journal);
}
export function indexes(root, { write = false, io = fs } = {}) {
  const journal = journalPath(root);
  if (io.existsSync(journal)) {
    if (!write) throw new Error("Interrupted index write; --check is read-only. Rerun --write to restore/rebuild the pair.");
    recover(root, journal, io);
  }
  const { outputs, corpus } = generateViews(root);
  const before = VIEWS.map(file => io.readFileSync(safePath(root, file)));
  const stale = VIEWS.filter((file, i) => normalize(before[i].toString()) !== outputs[i]);
  if (!write || !stale.length) return { kind: "index-freshness", fresh: !stale.length, stale, written: [], cards: corpus.cards.length, handoffs: corpus.handoffs.length };
  for (let i = 0; i < VIEWS.length; i++) {
    const old = before[i].toString();
    if (!intact(old)) {
      if (normalize(old).startsWith("<!-- task-view-sha256:")) throw new Error("Unexpected manual view edits; preserve/reconcile before overwriting " + VIEWS[i]);
      const committed = gitText(root, ["show", "HEAD:" + VIEWS[i]]);
      if (committed === null || normalize(old) !== normalize(committed)) throw new Error("Unexpected manual view edits; preserve/reconcile before overwriting " + VIEWS[i]);
    }
  }
  // Write-ahead recovery record: both old byte streams survive any failed pair update.
  const data = { root: path.resolve(root), files: VIEWS.map((file, i) => ({ file, before: before[i].toString("base64"), after: Buffer.from(outputs[i]).toString("base64") })) };
  const temps = VIEWS.map(file => safePath(root, file) + ".task-index-tmp");
  if (temps.some(temp => io.existsSync(temp))) throw new Error("Unexpected temporary view file; preserve/reconcile before writing.");
  io.writeFileSync(journal, JSON.stringify(data), { flag: "wx" });
  try {
    for (let i = 0; i < 2; i++) io.writeFileSync(temps[i], outputs[i], { flag: "wx" });
    for (let i = 0; i < 2; i++) {
      if (!io.readFileSync(safePath(root, VIEWS[i])).equals(before[i])) throw new Error("View changed during generation; refusing replacement.");
    }
    for (let i = 0; i < 2; i++) io.renameSync(temps[i], safePath(root, VIEWS[i]));
    io.unlinkSync(journal);
  } catch (error) {
    // An interrupted process leaves the journal; the next explicit write restores the pair.
    recover(root, journal, io);
    throw error;
  }
  return { kind: "index-freshness", fresh: true, stale: [], written: stale, cards: corpus.cards.length, handoffs: corpus.handoffs.length };
}
