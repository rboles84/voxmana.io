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
