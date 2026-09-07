import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { idFromFilename, section } from "./task-admission-record.mjs";

export const CARD_ROOTS = ["backlog", "ready", "in-progress", "blocked", "done"].map(s => "docs/kanban/" + s);
export const ARCHIVE_ROOT = "docs/archive/phase4-manual-views";
export const AUTHORITIES = ["AGENTS.md", "docs/reference/workflow.md", "docs/reference/task-context.md", "docs/dev/RobDevPass.md", "docs/qa/RobQAPass.md"];
export const comparePath = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const norm = t => t.replace(/^\uFEFF/, "").replaceAll("\r\n", "\n");
const ids = text => [...new Set((text.match(/(?<![A-Za-z0-9])VM-\d+[A-Z]?(?![A-Za-z0-9])/gi) ?? []).map(x => x.toUpperCase()))];
export function safePath(root, file) {
  if (typeof file !== "string" || path.isAbsolute(file) || /^[A-Za-z]:/.test(file) || file.includes("\\") || file.split("/").some(x => x === ".." || x === "." || x === "")) throw new Error("Unsafe source path: " + file);
  const base = path.resolve(root), target = path.resolve(base, file);
  if (!target.startsWith(base + path.sep)) throw new Error("Source escapes repository: " + file);
  let current = base;
  for (const part of file.split("/")) {
    current = path.join(current, part);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw new Error("Symlink source: " + file);
  }
  return target;
}
export function sourceText(root, file) { return norm(fs.readFileSync(safePath(root, file), "utf8")); }
function metadata(text, name) {
  const header = text.split(/^## /m)[0];
  const values = [...header.matchAll(new RegExp("^" + name + ":\\s*(.*?)\\s*$", "gim"))].map(m => m[1].replace(/^\x60(.*)\x60$/, "$1"));
  if (values.length === 1) return values[0];
  const lines = text.split("\n"), i = lines.findIndex(l => l.toLowerCase() === "## " + name.toLowerCase());
  return values.length > 1 ? null : i < 0 ? null : lines.slice(i + 1).find(l => l.trim()) ?? null;
}
export function validDate(raw) {
  const m = String(raw ?? "").match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):?(\d{2})(?::(\d{2}))?(Z|[+-]\d{2}:\d{2})?)?$/);
  if (!m) return null;
  const [, y, mo, d, h = "00", mi = "00", s = "00", zone = "Z"] = m;
  const calendar = new Date(Date.UTC(+y, +mo - 1, +d));
  if (calendar.getUTCFullYear() !== +y || calendar.getUTCMonth() !== +mo - 1 || calendar.getUTCDate() !== +d || +h > 23 || +mi > 59 || +s > 59) return null;
  const value = y + "-" + mo + "-" + d + "T" + h + ":" + mi + ":" + s + zone;
  const time = Date.parse(value);
  return Number.isFinite(time) ? { value, time } : null;
}
export function linksFrom(text, file) {
  const links = [];
  for (const m of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    if (/^(?:[a-z]+:|#|\/)/i.test(target)) continue;
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), target.split("#")[0]));
    if (!resolved.startsWith("../") && resolved.endsWith(".md")) links.push(resolved);
  }
  return [...new Set(links)].sort(comparePath);
}
function relationshipText(text) {
  const lines = text.split("\n"), result = [];
  let related = false;
  for (const line of lines) {
    if (/^#{1,6} /.test(line)) related = /^#{1,6} .*(?:related|evidence|decision|predecessor|successor|dependenc|supersed|reject|subsystem|histor|plan)/i.test(line);
    if (related || /^(?:Related[^:]*|Evidence|Decisions|Dependencies|Predecessor|Successor|Plan|Subsystem history):/i.test(line)) result.push(line);
  }
  return result.join("\n");
}
export function parseHistorical(text, file, kind) {
  text = norm(text);
  const diagnostics = [], heading = text.match(/^# (.+)$/m)?.[1] ?? null;
  const explicit = metadata(text, "ID"), filenameId = idFromFilename(file);
  const headingId = ids(heading ?? "")[0] ?? null;
  const id = explicit?.toUpperCase() ?? filenameId ?? headingId;
  const actualId = id || headingId || null;
  if (!explicit && actualId) diagnostics.push("Identity displayed from " + (filenameId ? "filename" : "heading") + "; not admission metadata.");
  if (explicit && filenameId && explicit.toUpperCase() !== filenameId) diagnostics.push("Conflicting declared and filename identity.");
  const title = metadata(text, "Title") ?? heading ?? path.posix.basename(file);
  const rawStatus = metadata(text, "Status");
  const statusMatch = rawStatus?.match(/^(Owner Review|In Progress|Integrated|Accepted|Deferred|Blocked|Backlog|Ready|Done)(?=$|\s*[-—/:])/i);
  const states = ["Owner Review", "In Progress", "Integrated", "Accepted", "Deferred", "Blocked", "Backlog", "Ready", "Done"];
  const status = statusMatch ? states.find(s => s.toLowerCase() === statusMatch[1].toLowerCase()) : null;
  if (kind === "card" && !status) diagnostics.push("Unresolved declared lifecycle; folder is location only.");
  if (rawStatus && status && rawStatus !== status) diagnostics.push("Legacy status retained verbatim: " + rawStatus);
  const authoredDate = metadata(text, "Date"), authored = validDate(authoredDate);
  const fm = path.posix.basename(file).match(/^(\d{4}-\d{2}-\d{2})(?:-(\d{2})(\d{2}))?(?:-|\.md)/);
  const filenameDate = fm ? validDate(fm[1] + (fm[2] ? " " + fm[2] + ":" + fm[3] : "")) : null;
  const date = authored ?? filenameDate;
  if (authoredDate && !authored) diagnostics.push("Invalid authored date; filename fallback or undated ordering used.");
  const relatedText = relationshipText(text), relatedIds = ids(relatedText);
  const fnIds = [...path.posix.basename(file).matchAll(/(?:^|-)vm-?(\d+)([a-z]?)(?=-|\.md$)/gi)].map(m => "VM-" + m[1] + m[2].toUpperCase());
  const directIds = [...new Set([...fnIds, ...ids(heading ?? ""), ...relatedIds])];
  return { kind, file, id: actualId, title, status, rawStatus, date: date?.value ?? null, dateTime: date?.time ?? null,
    dateSource: authored ? "authored" : filenameDate ? "filename" : "undated", agent: metadata(text, "Agent") ?? metadata(text, "Agent name"),
    text, diagnostics, links: linksFrom(text, file), relationshipLinks: linksFrom(relatedText, file), directIds, mentionedIds: ids(text) };
}
function enumerate(root, directory) {
  const absolute = safePath(root, directory);
  if (!fs.existsSync(absolute)) return [];
  const result = [];
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true }).sort((a, b) => comparePath(a.name, b.name))) {
    const file = directory + "/" + entry.name;
    if (entry.isSymbolicLink()) throw new Error("Symlink prevents source enumeration: " + file);
    if (entry.isDirectory()) result.push(...enumerate(root, file));
    else if (entry.isFile() && entry.name.endsWith(".md") && file !== "docs/handoffs/HANDOFF_INDEX.md") result.push(file);
  }
  return result;
}
export function readCorpus(root) {
  for (const directory of ["docs/kanban", "docs/handoffs"]) if (!fs.existsSync(safePath(root, directory))) throw new Error("Unavailable source category: " + directory);
  const cards = CARD_ROOTS.flatMap(p => enumerate(root, p)).map(p => parseHistorical(sourceText(root, p), p, "card"));
  const handoffs = enumerate(root, "docs/handoffs").map(p => parseHistorical(sourceText(root, p), p, "handoff")).sort(handoffOrder);
  return { cards, handoffs };
}
export function handoffOrder(a, b) {
  if (a.dateTime !== b.dateTime) {
    if (a.dateTime === null) return 1;
    if (b.dateTime === null) return -1;
    return b.dateTime - a.dateTime;
  }
  return comparePath(a.file, b.file);
}
export function duplicates(cards) {
  const groups = new Map();
  for (const card of cards) if (card.id) groups.set(card.id, [...(groups.get(card.id) ?? []), card.file]);
  return [...groups].filter(([, files]) => files.length > 1).map(([id, files]) => ({ id, files }));
}
export function observeGit(root) {
  const unavailable = [];
  const read = (category, args) => {
    try { return execFileSync("git", args, { cwd: root, encoding: "utf8", timeout: 15000, maxBuffer: 8 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] }).trimEnd(); }
    catch { unavailable.push(category); return null; }
  };
  return { head: read("local HEAD", ["rev-parse", "HEAD"]), branch: read("local branch", ["branch", "--show-current"]),
    status: read("working-tree provenance", ["status", "--porcelain=v1", "-z", "--untracked-files=all"]),
    main: read("local main", ["rev-parse", "--verify", "refs/heads/main"]),
    remoteTrackingMain: read("remote-tracking main", ["rev-parse", "--verify", "refs/remotes/origin/main"]),
    remoteMain: read("live remote main", ["ls-remote", "origin", "refs/heads/main"]),
    unavailable };
}
function provenance(file, status) {
  if (status === null) return "unavailable";
  const tokens = status.split("\0");
  for (let i = 0; i < tokens.length; i++) {
    const row = tokens[i], xy = row.slice(0, 2), current = row.slice(3);
    const prior = /[RC]/.test(xy) ? tokens[++i] : null;
    if (current === file || prior === file) return xy === "??" ? "untracked" : "modified";
  }
  return "committed";
}
const present = (record, status, body = true) => ({ ...record, text: body ? record.text : undefined, provenance: provenance(record.file, status) });
export function archivalContext(root, task, deep) {
  const manifestPath = ARCHIVE_ROOT + "/manifest.json", absolute = safePath(root, manifestPath);
  if (!fs.existsSync(absolute)) return { sources: [], excerpts: [], unavailable: ["archived manual views"] };
  const manifest = JSON.parse(fs.readFileSync(absolute, "utf8"));
  const sources = manifest.files.map(f => ({ file: ARCHIVE_ROOT + "/" + f.archive, revision: manifest.revision, sha256: f.sha256, authority: "historical context only" }));
  const excerpts = [];
  if (deep) for (const source of sources) {
    const lines = sourceText(root, source.file).split("\n");
    lines.forEach((text, i) => { if (ids(text).includes(task)) excerpts.push({ file: source.file, line: i + 1, text, authority: "historical observation; not task/admission authority" }); });
  }
  return { sources, excerpts, unavailable: [] };
}
export function contextPacket(root, task, { deep = false, card: selectedPath, git = observeGit(root), corpus = readCorpus(root) } = {}) {
  task = String(task).toUpperCase();
  if (!/^VM-\d+[A-Z]?$/.test(task)) throw new Error("Expected exact VM task ID.");
  const matches = corpus.cards.filter(c => c.id === task);
  if (selectedPath) safePath(root, selectedPath);
  const selected = selectedPath ? matches.find(c => c.file === selectedPath) : matches.length === 1 ? matches[0] : null;
  if (!selected) return { kind: matches.length ? "ambiguous-task" : "missing-task", task, matches: matches.map(c => c.file),
    selectedPath: selectedPath ?? null, disclosure: { includedDirectHandoffs: 0, additionalDirectHandoffs: null, incidentalReferences: null, directlyReferencedPlans: null, ambiguousHistoricalRecords: matches.map(c => c.file), deepAvailable: true, unavailableSourceCategories: ["task-specific retrieval: no unique selected source", ...git.unavailable] }, note: "No record selected. --card selects a matching source for reading only; never for admission.", exhaustive: false };
  const cardLinks = new Set(selected.links);
  const roots = corpus.handoffs.filter(h => h.directIds.includes(task) || cardLinks.has(h.file) || h.relationshipLinks.includes(selected.file)).sort(handoffOrder);
  const decisive = new Set([...cardLinks, ...roots.flatMap(h => h.relationshipLinks)]);
  const direct = corpus.handoffs.filter(h => roots.includes(h) || decisive.has(h.file)).sort(handoffOrder);
  const included = deep ? direct : direct.filter((h, i) => i < 3 || decisive.has(h.file));
  const additional = direct.filter(h => !included.includes(h));
  const incidental = corpus.handoffs.filter(h => !direct.includes(h) && h.mentionedIds.includes(task));
  const sourceLinks = new Set([...selected.links, ...roots.flatMap(h => h.relationshipLinks)]);
  const declared = section(selected.text, "Delivery") ?? "";
  const relations = ids(relationshipText(selected.text) + "\n" + (declared.match(/^Dependencies:.*$/m)?.[0] ?? "") + (deep ? "\n" + roots.map(h => relationshipText(h.text)).join("\n") : ""));
  const relatedCards = corpus.cards.filter(c => c.file !== selected.file && (sourceLinks.has(c.file) || relations.includes(c.id)));
  const ambiguous = duplicates(corpus.cards).filter(d => d.id === task || relations.includes(d.id) || d.files.some(f => sourceLinks.has(f)));
  const connected = [], unavailable = [...git.unavailable];
  for (const file of [...sourceLinks].sort(comparePath)) {
    if (file === selected.file || corpus.handoffs.some(h => h.file === file) || corpus.cards.some(c => c.file === file) || AUTHORITIES.includes(file) || file === "docs/kanban/board.md" || file === "docs/handoffs/HANDOFF_INDEX.md" || file.startsWith(ARCHIVE_ROOT + "/")) continue;
    if (!file.startsWith("docs/")) continue;
    try { connected.push({ file, text: sourceText(root, file), provenance: provenance(file, git.status), relationship: "explicit one-hop reference; not traversed further" }); }
    catch { unavailable.push("referenced source: " + file); }
  }
  const archives = archivalContext(root, task, deep);
  unavailable.push(...archives.unavailable);
  const plans = connected.filter(r => r.file.startsWith("docs/plans/"));
  return { kind: "task-context", task, mode: deep ? "deep" : "focused", exhaustive: false,
    note: "Selected context, not complete project history. Targeted retrieval is an optimization layer, not an information boundary.",
    card: present(selected, git.status), git, authorities: AUTHORITIES,
    handoffs: included.map(h => present(h, git.status)), additionalHandoffs: additional.map(h => present(h, git.status, false)),
    incidentalReferences: incidental.map(h => ({ ...present(h, git.status, false), excerpts: deep ? h.text.split("\n").filter(l => ids(l).includes(task)) : undefined, authority: "incidental mention; not direct task authority" })),
    relatedCards: relatedCards.map(c => present(c, git.status, deep)), connectedSources: connected, archives,
    disclosure: { includedDirectHandoffs: included.length, additionalDirectHandoffs: additional.length, incidentalReferences: incidental.length,
      directlyReferencedPlans: plans.length, ambiguousHistoricalRecords: ambiguous, deepAvailable: true, unavailableSourceCategories: [...new Set(unavailable)],
      expansionBoundary: "One hop from the selected card and directly related handoffs; no transitive task-graph traversal." },
    rawSources: { cards: CARD_ROOTS, handoffs: "docs/handoffs/", plans: "docs/plans/", archives: ARCHIVE_ROOT, repository: ".", gitHistory: "git log / git show", note: "All original sources remain directly inspectable." } };
}
