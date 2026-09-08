import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { contextPacket, readCorpus, validDate } from "./lib/task-history.mjs";
import { indexes } from "./lib/task-indexes.mjs";
import { validateAdmission, parseArgs as parseAdmissionArgs } from "./validate/validate-task-admission.mjs";

import { checkDelivery, renderStage } from "./lib/task-delivery.mjs";

const usage = [
  "npm run task -- context VM-### [--deep] [--card=repo/path.md] [--json]",
  "npm run task -- handoffs [--task=VM-###] [--date=YYYY-MM-DD] [--json]",
  "npm run task -- check VM-### --stage=admission --mode=start|continue [existing admission options] [--json]",
  "npm run task -- check VM-### --stage=candidate|integration|closeout [--observations=external.json] [--json]",
  "npm run task -- indexes --check|--write [--json]",
].join("\n");
function flags(args, allowed) {
  const result = {};
  for (const arg of args) {
    const match = arg.match(/^--([a-z-]+)(?:=(.*))?$/);
    if (!match || !allowed.includes(match[1]) || Object.hasOwn(result, match[1])) throw new Error("Unknown or duplicate argument: " + arg);
    const name = match[1], boolean = ["json", "deep", "check", "write"].includes(name);
    if (boolean ? match[2] !== undefined : !match[2]) throw new Error("Invalid argument: " + arg);
    result[name] = boolean ? true : match[2];
  }
  return result;
}
function render(packet) {
  if (packet.kind !== "task-context") return JSON.stringify(packet, null, 2);
  const lines = ["# " + packet.task + " — " + packet.mode + " context", "", packet.note, "", "## Retrieval disclosure", "", JSON.stringify(packet.disclosure, null, 2),
    "", "## Governing sources to read", "", ...packet.authorities.map(p => "- " + p), "", "## Fresh Git observations", "", JSON.stringify(packet.git, null, 2),
    "", "## Authored card (" + packet.card.provenance + ")", "", packet.card.text];
  for (const handoff of packet.handoffs) lines.push("", "## Handoff: " + handoff.file + " (" + handoff.provenance + ")", "", handoff.text);
  for (const source of packet.connectedSources) lines.push("", "## Referenced source: " + source.file, "", source.text);
  for (const card of packet.relatedCards) lines.push("", "## Related card: " + card.file, "", card.text ?? "Metadata only in focused mode; use --deep or inspect this source directly.");
  lines.push("", "## Additional directly related handoffs", "", ...packet.additionalHandoffs.map(h => "- " + h.file),
    "", "## Incidental references — not direct authority", "", JSON.stringify(packet.incidentalReferences, null, 2),
    "", "## Historical archives — not current authority", "", JSON.stringify(packet.archives, null, 2),
    "", "## Raw-source escape hatches", "", JSON.stringify(packet.rawSources, null, 2));
  return lines.join("\n");
}
export function run(args, { root = process.cwd(), stdout = console.log, stderr = console.error, admission = validateAdmission } = {}) {
  try {
    const [command, ...rest] = args;
    if (!command || command === "--help") { stdout(usage); return 0; }
    if (command === "check") {
      const [task, ...options] = rest, parsed = flags(options, ["stage", "mode", "branch", "dependency-task", "dependency-head", "owner-authorization", "observations", "json"]);
      if (["candidate", "integration", "closeout"].includes(parsed.stage)) {
        if (Object.keys(parsed).some(k => !["stage", "observations", "json"].includes(k))) throw new Error("Admission options cannot override delivery facts.");
        const result = checkDelivery({ root, task, stage: parsed.stage, observations: parsed.observations });
        stdout(parsed.json ? JSON.stringify(result, null, 2) : renderStage(result));
        return result.status === "PASS" ? 0 : 1;
      }
      if (parsed.stage !== "admission") {
        stdout(JSON.stringify({ kind: "unsupported-stage", stage: parsed.stage ?? null, message: "Unsupported stage; use admission, candidate, integration or closeout." }, null, 2));
        return 1;
      }
      const pass = options.filter(o => !o.startsWith("--stage="));
      const existing = parseAdmissionArgs(["--task=" + task, ...pass]);
      const result = admission({ repoRoot: root, ...existing.options });
      stdout(JSON.stringify(result, null, 2));
      return result.status === "PASS" || result.status === "ELIGIBLE" ? 0 : result.status === "RESUME" ? 2 : 1;
    }
    if (command === "indexes") {
      const parsed = flags(rest, ["check", "write", "json"]);
      if (Boolean(parsed.check) === Boolean(parsed.write)) throw new Error("Specify exactly one of --check or --write.");
      const result = indexes(root, { write: !!parsed.write });
      stdout(JSON.stringify(result, null, 2)); return result.fresh ? 0 : 1;
    }
    if (command === "context") {
      const [task, ...options] = rest, parsed = flags(options, ["deep", "card", "json"]);
      if (!task) throw new Error("A task ID is required.");
      const packet = contextPacket(root, task, parsed);
      stdout(parsed.json ? JSON.stringify(packet, null, 2) : render(packet));
      return packet.kind === "task-context" ? 0 : packet.kind === "ambiguous-task" ? 2 : 1;
    }
    if (command === "handoffs") {
      const parsed = flags(rest, ["task", "date", "json"]);
      if (parsed.task && !/^VM-\d+[A-Z]?$/i.test(parsed.task)) throw new Error("Expected an exact VM task ID.");
      if (parsed.date && (!/^\d{4}-\d{2}-\d{2}$/.test(parsed.date) || !validDate(parsed.date))) throw new Error("Expected a valid YYYY-MM-DD date.");
      const records = readCorpus(root).handoffs.filter(h => (!parsed.task || h.directIds.includes(parsed.task.toUpperCase())) && (!parsed.date || h.date?.slice(0, 10) === parsed.date));
      stdout(JSON.stringify({ kind: "handoff-list", count: records.length, records: records.map(({ text, links, relationshipLinks, mentionedIds, ...metadata }) => metadata),
        note: "Direct relationships only; context discloses incidental references. Source path is identity." }, null, 2));
      return 0;
    }
    throw new Error("Unknown task command: " + command);
  } catch (error) { stderr(JSON.stringify({ kind: "task-command-error", message: error.message })); return 1; }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let root = process.cwd();
  try { root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim(); } catch { /* commands will explain missing inputs */ }
  process.exitCode = run(process.argv.slice(2), { root });
}
