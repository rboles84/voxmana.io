import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
const prompts = ['board', 'docs', 'json', 'plan', 'preflight', 'test'].map(n => `.codex/prompts/${n}.md`);
const skills = ['robdev', 'robqa'].flatMap(n => [`.agents/skills/${n}/SKILL.md`, `.agents/skills/${n}/${n}.md`]);
const entries = ['AGENTS.md', ...prompts, ...skills, 'docs/reference/workflow.md', 'README.md', 'docs/README.md', 'docs/reference/README.md', '.github/pull_request_template.md'];
// Bounded navigation checks, not a general Markdown parser or policy engine.
// Skip code fences so example links do not become operational dependencies.
const prose = text => text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
const slug = text => text.toLowerCase().replace(/[\p{P}\p{S}]/gu, ch => ch === '-' || ch === '_' ? ch : '').replace(/\s/g, '-');
function anchors(text) {
  const seen = new Map();
  return new Set([...prose(text).matchAll(/^#{1,6}\s+(.+?)\s*#*$/gm)].map(m => {
    const id = slug(m[1]); const count = seen.get(id) || 0; seen.set(id, count + 1);
    return count ? `${id}-${count}` : id;
  }));
}
function links(file) {
  return [...prose(read(file)).matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)].map(m => m[1]);
}
function local(file, href) {
  if (/^[a-z]+:/i.test(href)) return null;
  const [target, fragment] = href.split('#');
  return { file: path.posix.normalize(path.posix.join(path.posix.dirname(file), target || path.posix.basename(file))), fragment };
}
test('operational pointers resolve to repository files and real section anchors', () => {
  const failures = [];
  for (const file of entries) for (const href of links(file)) {
    const target = local(file, href);
    if (!target) continue;
    if (!fs.existsSync(path.join(root, target.file))) failures.push(`${file}: missing ${href}`);
    else if (target.fragment && !anchors(read(target.file)).has(decodeURIComponent(target.fragment))) failures.push(`${file}: missing anchor ${href}`);
  }
  assert.deepEqual(failures, []);
});
test('every common operational entry can reach the existing workflow, retrieval and governing gates', () => {
  const targets = ['docs/reference/workflow.md', 'docs/reference/task-context.md', 'docs/dev/RobDevPass.md', 'docs/qa/RobQAPass.md'];
  for (const start of ['AGENTS.md', ...prompts]) {
    const visited = new Set(); const pending = [start];
    while (pending.length) {
      const file = pending.shift();
      if (visited.has(file)) continue;
      visited.add(file);
      // Follow only the bounded operating navigation set, not arbitrary task/history graphs.
      if (!entries.includes(file)) continue;
      for (const href of links(file)) {
        const target = local(file, href);
        if (target && fs.existsSync(path.join(root, target.file))) pending.push(target.file);
      }
    }
    for (const target of targets) assert.ok(visited.has(target), `${start} cannot reach ${target}`);
  }
});
test('legacy AGENTS responsibility anchors still route to canonical workflow sections', () => {
  for (const anchor of ['optional-work-intake-triage', 'single-active-work-branch-and-worktree', 'required-agent-handoff', 'final-git-reporting-contract', 'mandatory-pre-flight-review']) {
    assert.ok(anchors(read('AGENTS.md')).has(anchor), anchor);
    assert.ok(links('AGENTS.md').includes(`docs/reference/workflow.md#${anchor}`), anchor);
  }
});
test('specialist trigger navigation remains reachable without loading specialist contracts globally', () => {
  const workflowLinks = links('docs/reference/workflow.md');
  for (const source of ['source-generated-guardrails.md#work-mode-rules', 'semantic-readiness-contract.md', '../incidents/CRIT-001-drift-control-template.md', '../sirf/SIRF-README.md', '../dev/RobDevPass.md#5-vox-mana-authority-router']) {
    assert.ok(workflowLinks.includes(source), source);
  }
});
test('common entries no longer demand full indexes or duplicate mandatory usage-guide reads', () => {
  for (const file of [...entries, 'docs/dev/RobDevPass.md']) {
    const text = read(file);
    assert.doesNotMatch(text, /(?:read|review) (?:the )?(?:entire|complete|full) (?:board|handoff.index)/i, file);
    assert.doesNotMatch(text, /read the handoff index and/i, file);
    assert.doesNotMatch(text, /read \[rob(?:dev|qa)\.md\]\([^)]+\) completely/i, file);
    assert.doesNotMatch(text, /(?:manually (?:update|maintain)|hand.edit) (?:the )?(?:board|handoff.index)/i, file);
  }
});
test('compatibility guides point directly to full governing contracts and remain optional navigation', () => {
  for (const [role, gate] of [['robdev', 'dev/RobDevPass.md'], ['robqa', 'qa/RobQAPass.md']]) {
    assert.ok(links(`.agents/skills/${role}/SKILL.md`).includes(`../../../docs/${gate}`));
    assert.match(read(`.agents/skills/${role}/SKILL.md`), /full governing/);
    assert.match(read(`.agents/skills/${role}/SKILL.md`), /optional navigation/);
  }
});

function section(file, heading) {
  const text = read(file);
  const lines = text.split('\n');
  const start = lines.findIndex(line => /^#{1,6} /.test(line) && line.replace(/^#+ /, '') === heading);
  assert.ok(start >= 0, `missing ${heading}`);
  const depth = lines[start].match(/^#+/)[0].length;
  const end = lines.findIndex((line, i) => i > start && new RegExp(`^#{1,${depth}} `).test(line));
  return lines.slice(start + 1, end < 0 ? undefined : end).join('\n');
}

test('admission sequence authors the card and regenerates derived views, never a manual board', () => {
  const admission = section('docs/reference/workflow.md', 'Task Admission');
  assert.match(admission, /authoritative admission card -> regenerate\/check derived views/);
  assert.match(admission, /task-context\.md#generated-views-and-safe-replacement/);
  assert.doesNotMatch(admission, /(?:the )?card and board\s*->/);
  for (const file of entries) {
    assert.doesNotMatch(prose(read(file)), /(?:create\/update|create|update|maintain)\s+(?:the\s+)?(?:card and board|board and card)\b/i, file);
  }
});

test('preflight consumes the context packet before triggered expansion instead of category rereads', () => {
  const workflow = 'docs/reference/workflow.md';
  const preflight = section(workflow, 'Mandatory Pre-Flight Review');
  assert.match(preflight, /context packet/);
  assert.match(preflight, /Do not separately reread handoffs, related cards or plans already supplied/);
  assert.match(preflight, /Expand only when disclosure/);
  assert.doesNotMatch(preflight, /Review relevant handoffs, cards, plans/);
  const reading = section(workflow, 'Required Reading Model');
  assert.match(reading, /npm run task -- context VM-###/);
  assert.match(reading, /Included authored sources fulfill the corresponding reading/);
  assert.match(reading, /--deep/);
  assert.match(reading, /raw-source inspection/);
  assert.match(reading, /optimization layer, not an information boundary/);
});

test('ordinary implementation loads RobDev and leaves RobQA for its actual stage', () => {
  const reading = section('docs/reference/workflow.md', 'Required Reading Model');
  const transition = reading.indexOf('At test selection, candidate QA or Owner Review preparation');
  assert.ok(transition > 0);
  assert.match(reading.slice(0, transition), /RobDev skill/);
  assert.doesNotMatch(reading.slice(0, transition), /RobQA skill/);
  assert.match(reading.slice(transition), /RobQA skill/);
  assert.match(reading, /Do not preload RobQA for ordinary implementation/);
  assert.match(reading, /A QA task may enter here directly/);
});

test('admission owns discovery and RESUME while human isolation authority stays explicit', () => {
  const ownership = section('docs/reference/workflow.md', 'Single Active Work Branch And Worktree');
  assert.match(ownership, /Admission owns same-task discovery/);
  assert.match(ownership, /RESUME[\s\S]*never authorizes another admission/);
  assert.match(ownership, /Human authority remains required/);
  assert.match(ownership, /exact-SHA review isolation/);
  assert.doesNotMatch(ownership, /List the repository|Identify every existing branch|Before running any branch/);
  const admission = section('docs/reference/workflow.md', 'Task Admission');
  assert.match(admission, /The validator inspects existing cards/);
  assert.doesNotMatch(admission, /Inspect existing cards, relevant branches, and registered worktrees first/);
});

test('durable protection and reusable admission examples do not carry transition task state', () => {
  const workflow = read('docs/reference/workflow.md');
  assert.doesNotMatch(workflow, /VM-625/);
  assert.doesNotMatch(workflow, /Current and proposed GitHub enforcement as of|Configured now|Deferred transition|Proposed protection at that gate/);
  const protection = section('docs/reference/workflow.md', 'Main Protection And Exceptions');
  assert.match(protection, /Verify actual current settings/);
  assert.match(protection, /Configuration changes require explicit authority/);
  const admission = section('docs/reference/workflow.md', 'Task Admission');
  assert.match(admission, /--task=VM-### --mode=start --branch=codex\/vm-###-<purpose>/);
  assert.match(admission, /--task=VM-### --mode=continue/);
  assert.doesNotMatch(admission, /--task=VM-\d+/);
});

test('delivery routes remain canonical and stage invocation is explicit', () => {
  for (const anchor of ['ship-vm-', 'accept-vm-', 'reject-vm--reason']) {
    assert.ok(links('AGENTS.md').includes(`docs/reference/workflow.md#${anchor}`));
  }
  assert.match(section('docs/reference/workflow.md', 'Required Reading Model'), /read-only delivery checks/);
  // Unknown-stage/admission behavior remains covered by task-context; delivery has focused fixtures.
  assert.ok(links('docs/reference/workflow.md').includes('task-context.md#focused-and-deep-rehydration'));
});
