import fs from "node:fs";
import path from "node:path";

export const TASK_ID = /^VM-\d+[A-Z]?$/;
export const CLOSED = new Set(["Done", "Integrated", "Deferred"]);
export function section(text, name) {
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  const start = lines.findIndex((line) => line === "## " + name);
  if (start < 0) return null;
  let end = start + 1;
  while (end < lines.length && !/^#{1,2} /.test(lines[end])) end++;
  return lines.slice(start + 1, end).join("\n").trim();
}
export function field(text, name, required = true) {
  const matches = [...text.matchAll(new RegExp("^" + name + ":\\s*(.*?)\\s*$", "gm"))];
  if (matches.length > 1 || (required && matches.length !== 1)) throw new Error("Expected one " + name + " field");
  return matches[0]?.[1].replace(/^\x60(.*)\x60$/, "$1") ?? "";
}
export function idFromFilename(file) {
  return path.posix.basename(file).match(/^(VM-\d+[a-z]?)(?=-|\.md$)/i)?.[1].toUpperCase() ?? "";
}
export function declaresId(text, task) {
  return [...text.matchAll(/^ID:\s*\x60?([^\x60\s]+)\x60?\s*$/gm)].some((m) => m[1].toUpperCase() === task);
}
export function lstatIfPresent(file) {
  try { return fs.lstatSync(file); } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") return null;
    throw error;
  }
}
export function parseScope(text, repoRoot) {
  const body = section(text, "Admission Scope");
  if (!body) throw new Error("Missing Admission Scope");
  const entries = body.split("\n").filter((line) => line.trim()).map((line) => {
    const match = line.match(/^- \x60([^\x60]+)\x60$/);
    if (!match) throw new Error("Admission Scope requires one literal backtick-quoted path per bullet");
    const value = match[1].replaceAll("\\", "/");
    if (value !== value.trim() || /[\x00-\x1f:*?[\]{}]/.test(value) || value.startsWith("/") ||
        value.split("/").some((part, index, all) => part === "." || part === ".." || part === ".git" ||
          (part === "" && index !== all.length - 1)) || !value.replaceAll("/", "")) {
      throw new Error("Invalid scope path: " + value);
    }
    const directory = value.endsWith("/");
    const absolute = path.resolve(repoRoot, value);
    let cursor = absolute;
    while (cursor !== path.resolve(repoRoot)) {
      if (lstatIfPresent(cursor)?.isSymbolicLink()) throw new Error("Symlink in scope path: " + value);
      const parent = path.dirname(cursor);
      if (parent === cursor) throw new Error("Scope escapes repository: " + value);
      cursor = parent;
    }
    if (fs.existsSync(absolute) && fs.statSync(absolute).isDirectory() !== directory) throw new Error("Ambiguous file/directory scope: " + value);
    return value;
  });
  if (new Set(entries.map((entry) => entry.replace(/\/$/, ""))).size !== entries.length) throw new Error("Duplicate or ambiguous scope entries");
  return entries;
}
export function inScope(file, scope) {
  return scope.some((entry) => entry.endsWith("/") ? file.startsWith(entry) : file === entry);
}
export function parseRecord(text, file, repoRoot) {
  const id = field(text, "ID").toUpperCase();
  if (!TASK_ID.test(id) || (idFromFilename(file) && idFromFilename(file) !== id)) throw new Error("Conflicting task identity: " + file);
  const delivery = section(text, "Delivery");
  if (!delivery || field(delivery, "Record version") !== "1") throw new Error("Missing/unsupported admission record: " + file);
  const result = {
    id, file, text: text.replaceAll("\r\n", "\n"), status: field(text, "Status"),
    branch: field(delivery, "Branch"), baseline: field(delivery, "Admission baseline"),
    dependencies: field(delivery, "Dependencies"), decisions: field(delivery, "Decisions"),
    dependencyHead: field(delivery, "Dependency head", false),
    authorization: field(delivery, "Owner authorization", false), scope: parseScope(text, repoRoot),
  };
  if (!/^[0-9a-f]{40}$/.test(result.baseline)) throw new Error("Admission baseline must be an exact SHA");
  if (!result.branch || result.branch === "PENDING" || result.branch === "main") throw new Error("Missing/invalid task branch");
  if (!inScope(file, result.scope)) throw new Error("Admission Scope must include its own card");
  if (result.dependencies !== "None") {
    if (!TASK_ID.test(result.dependencies) || !/^[0-9a-f]{40}$/.test(result.dependencyHead) || !result.authorization ||
        /^(PENDING|NONE|UNKNOWN)$/i.test(result.authorization)) throw new Error("Incomplete dependency exception");
  } else if (result.dependencyHead || result.authorization) throw new Error("Unexpected dependency exception fields");
  return result;
}
export function immutableRecord(record) {
  return JSON.stringify([record.id, record.branch, record.baseline, record.dependencies, record.dependencyHead, record.authorization]);
}
export function withoutScopeDecision(text) {
  let skipping = false;
  return text.split("\n").filter((line) => {
    if (line === "## Admission Scope") { skipping = true; return false; }
    if (skipping && /^#{1,2} /.test(line)) skipping = false;
    return !skipping;
  }).join("\n").replace(/^Decisions:.*$/m, "Decisions:").trim();
}
