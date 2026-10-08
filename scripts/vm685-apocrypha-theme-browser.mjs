/* Bounded VM-685 witness. Raw CDP avoids known Puppeteer callFunctionOn debt.
   No screenshots, external requests, live feedback, or exhaustive route matrix. */
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';

const root = process.cwd();
const profile = await mkdtemp(path.join(os.tmpdir(), 'vm685-edge-'));
const observations = { phases: [], blocked: [], errors: [], feedback: [], surfaces: [] };
let registryFails = false, feedbackFails = false, browser, browserCdp;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    if (pathname === '/__vm685_feedback') {
      let payload = ''; for await (const chunk of req) payload += chunk;
      observations.feedback.push({ fail: feedbackFails, bytes: payload.length });
      await delay(350); // bounded in-flight witness; never external transport
      res.writeHead(feedbackFails ? 500 : 200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: !feedbackFails })); return;
    }
    if (registryFails && pathname === '/data/apocrypha-source-registry.json') { res.writeHead(503).end('Local failure fixture'); return; }
    const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
    if (!file.startsWith(root + path.sep)) throw Error('outside workspace');
    const bytes = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(bytes);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const mark = label => { observations.phases.push(label); console.log('VM685 ' + label); };

class CDP {
  constructor(url) {
    this.socket = new WebSocket(url); this.pending = new Map(); this.listeners = new Map(); this.id = 0;
    this.ready = new Promise((resolve, reject) => { this.socket.addEventListener('open', resolve, { once: true }); this.socket.addEventListener('error', reject, { once: true }); });
    this.socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const request = this.pending.get(message.id); if (!request) return;
        clearTimeout(request.timer); this.pending.delete(message.id);
        message.error ? request.reject(Error(JSON.stringify(message.error))) : request.resolve(message.result);
      } else for (const listener of this.listeners.get(message.method) || []) listener(message.params);
    });
  }
  on(method, listener) { this.listeners.set(method, [...(this.listeners.get(method) || []), listener]); }
  async send(method, params = {}) {
    await this.ready;
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      const timer = setTimeout(() => { this.pending.delete(id); reject(Error('CDP timeout ' + method)); }, 10000);
      this.pending.set(id, { resolve, reject, timer }); this.socket.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression) {
    const result = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw Error(result.exceptionDetails.text + ' ' + result.exceptionDetails.exception?.description);
    return result.result.value;
  }
  close() { this.socket.close(); }
}
async function wait(cdp, expression, label = expression) {
  const end = Date.now() + 10000;
  while (Date.now() < end) { if (await cdp.eval(expression)) return; await delay(60); }
  throw Error('Waiting for ' + label);
}
async function page() {
  const target = await browserCdp.send('Target.createTarget', { url: 'about:blank' });
  const list = await (await fetch(`http://127.0.0.1:${browser.port}/json/list`)).json();
  const cdp = new CDP(list.find(item => item.id === target.targetId).webSocketDebuggerUrl);
  cdp.targetId = target.targetId;
  cdp.loads = new Set();
  cdp.on('Page.lifecycleEvent', event => { if(event.name==='load')cdp.loads.add(event.loaderId); });
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable'); await cdp.send('Network.enable');
  await cdp.send('Page.setLifecycleEventsEnabled', {enabled:true});
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Fetch.enable', { patterns: [{ urlPattern: '*' }] });
  cdp.on('Fetch.requestPaused', event => {
    const local = new URL(event.request.url).origin === origin;
    if (!local) observations.blocked.push(event.request.url);
    cdp.send(local ? 'Fetch.continueRequest' : 'Fetch.failRequest', local ? { requestId: event.requestId } : { requestId: event.requestId, errorReason: 'BlockedByClient' }).catch(error => observations.errors.push(error.message));
  });
  cdp.on('Runtime.exceptionThrown', event => observations.errors.push(event.exceptionDetails.text));
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `window.VM_FEEDBACK_CONFIG={endpoint:${JSON.stringify(origin + '/__vm685_feedback')},accessKey:'fixture-only',cooldownMs:5000};` });
  return cdp;
}
async function navigate(cdp, route, mode = 'registry') {
  const navigation = await cdp.send('Page.navigate', { url: origin + route });
  assert.ok(!navigation.errorText, navigation.errorText);
  // A same-path reload still has an old complete document for a short time.
  // Bind readiness to this navigation's loader, never the old pathname alone.
  if(navigation.loaderId) {
    const deadline=Date.now()+10000;
    while(!cdp.loads.has(navigation.loaderId)&&Date.now()<deadline)await delay(16);
    assert.ok(cdp.loads.has(navigation.loaderId),'new navigation load '+route);
  }
  await wait(cdp, `location.pathname===${JSON.stringify(route.split('?')[0].split('#')[0])} && document.readyState==='complete'`);
  if (route.startsWith('/apocrypha/')) await wait(cdp, `document.querySelector('[data-apoc-source-root]')?.dataset.renderMode===${JSON.stringify(mode)} && !!document.querySelector('.vm-utility > [data-vm-theme-toggle]')`);
  await cdp.eval('document.fonts.ready.then(()=>true)');
}
async function key(cdp, key, modifiers = 0) {
  await cdp.send('Page.bringToFront');
  const codes = { Tab: 9, Enter: 13, Escape: 27, ' ': 32 };
  await cdp.send('Input.dispatchKeyEvent', { type: key === 'Enter' ? 'keyDown' : 'rawKeyDown', text: key === 'Enter' ? '\r' : undefined, unmodifiedText: key === 'Enter' ? '\r' : undefined, key, code: key === ' ' ? 'Space' : key, windowsVirtualKeyCode: codes[key], modifiers });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key, code: key === ' ' ? 'Space' : key, windowsVirtualKeyCode: codes[key], modifiers });
}
async function click(cdp, selector) {
  await cdp.send('Page.bringToFront');
  await cdp.eval(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',inline:'nearest',behavior:'instant'})`);
  await delay(50);
  const rect = await cdp.eval(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...rect });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...rect });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...rect });
}
async function tabTo(cdp, selector, max = 180) {
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 1, y: 999 });
  for (let i = 0; i < max; i++) {
    await key(cdp, 'Tab');
    if (await cdp.eval(`document.activeElement.matches(${JSON.stringify(selector)})`)) {
      assert.ok(await cdp.eval(`document.activeElement.matches(':focus-visible')`), 'native focus-visible ' + selector);
      assert.ok(await cdp.eval(`(()=>{const s=getComputedStyle(document.activeElement);return (s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>0)||s.boxShadow!=='none'})()`), 'visible focus ' + selector);
      return;
    }
  }
  throw Error('Cannot reach by keyboard ' + selector);
}
async function theme(cdp, mode) {
  await cdp.send('Page.bringToFront');
  await cdp.eval('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
  const state = await cdp.eval(`(()=>{const t=document.querySelector('.vm-utility > [data-vm-theme-toggle]'),i=t.querySelector('.ms'),p=getComputedStyle(i,'::before'),r=i.getBoundingClientRect();return {mode:document.documentElement.dataset.vmTheme,saved:localStorage.getItem('vm_theme_mode_v1'),label:t.getAttribute('aria-label'),classes:i.className,glyph:p.content,font:p.fontFamily,box:[r.width,r.height],loaded:document.fonts.check('14px Mana'),faces:Array.from(document.fonts).filter(f=>/Mana|Outfit|Almendra|Cormorant|Lora|Plex/.test(f.family)).map(f=>({family:f.family,status:f.status})),resources:performance.getEntriesByType('resource').map(r=>r.name).filter(n=>/mana|woff/.test(n))}})()`);
  assert.equal(state.mode, mode); assert.equal(state.saved, mode);
  assert.equal(state.label, `Switch to ${mode === 'dark' ? 'light' : 'dark'} theme`);
  assert.ok(state.classes.includes(mode === 'dark' ? 'ms-w' : 'ms-b'));
  assert.equal(state.glyph.replaceAll('"', ''), mode === 'dark' ? '\ue600' : '\ue602');
  assert.ok(state.font.includes('Mana') && state.loaded && state.box.every(n => n > 0));
  assert.ok(state.faces.some(f => f.family.includes('Mana') && f.status === 'loaded'));
  for(const family of ['Almendra','Cormorant SC','Outfit','Lora','IBM Plex Mono']) assert.ok(state.faces.some(f=>f.family===family&&f.status==='loaded'),'loaded route font '+family);
  assert.ok(state.resources.some(n => n.includes('mana.woff')) && state.resources.some(n => n.includes('mana.min.css')));
  observations.surfaces.push({ glyph: state });
}

// Inspect complete repeated populations against actual painted surface owners.
async function surfaces(cdp, mode, label) {
  await cdp.send('Page.bringToFront');
  await cdp.eval('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
  const result = await cdp.eval(`(()=>{
    const structural=['.apoc-hero__copy','.apoc-hero__signal','.apoc-signal-item','.apoc-rail','.apoc-source-tome','.apoc-library-group','.apoc-library-summary','.apoc-shelf','.apoc-use-note'];
    const structures=structural.flatMap(selector=>Array.from(document.querySelectorAll(selector)).map(n=>{const s=getComputedStyle(n);return {selector,background:s.backgroundColor,image:s.backgroundImage,shadow:s.boxShadow,filter:s.backdropFilter}}));
    const rgb=v=>(v.match(/[\\d.]+/g)||[]).map(Number),blend=(f,b)=>f.slice(0,3).map((v,i)=>v*(f[3]??1)+b[i]*(1-(f[3]??1)));
    const lum=c=>c.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
    const ratio=(f,b)=>(Math.max(lum(f),lum(b))+.05)/(Math.min(lum(f),lum(b))+.05);
    const field=getComputedStyle(document.querySelector('.vm-bg')).backgroundImage;
    const stops=(field.match(/rgba?\\([^)]+\\)/g)||[]).map(rgb);if(!stops.length)stops.push(rgb(getComputedStyle(document.body).backgroundColor));
    const leafSelectors=['.apoc-hero h1','.apoc-hero p','.apoc-signal-item h3','.apoc-signal-item p','.apoc-section__head h2','.apoc-section__head p','.apoc-library-title','.apoc-library-desc','.apoc-shelf__bar','.apoc-source-card h4','.apoc-source-card p','.apoc-reference-card h4','.apoc-reference-card p','.apoc-source-tags li','.apoc-source-card .apoc-badge','.apoc-source-link','.apoc-shelf__count','.apoc-footer','.apoc-footer a','[data-apoc-source-status]','.apoc-method-note p','.apoc-rail a','.apoc-source-tome__scent','.apoc-return-link','.apoc-hero__status span','.apoc-registry-summary span','.apoc-library-desc strong'];
    const leaves=leafSelectors.flatMap(selector=>Array.from(document.querySelectorAll(selector)).filter(n=>n.textContent.trim()).map(n=>{let overlays=[],opaque=null;for(let p=n;p&&p!==document.body&&p!==document.documentElement;p=p.parentElement){const s=getComputedStyle(p),c=rgb(s.backgroundColor);if(c.length>=3&&(c[3]??1)>0){overlays.push(c);if((c[3]??1)===1){opaque=c;break}}}const fg=rgb(getComputedStyle(n).color);const bases=opaque?[opaque]:stops;const backgrounds=bases.map(b=>overlays.slice().reverse().reduce((a,f)=>blend(f,a),b));return {selector,text:n.textContent.trim().slice(0,50),color:getComputedStyle(n).color,backgrounds,contrast:Math.min(...backgrounds.map(b=>ratio(blend(fg,b),b)))}}));
    return {mode:document.documentElement.dataset.vmTheme,field,before:{content:getComputedStyle(document.querySelector('.vm-bg'),'::before').content,image:getComputedStyle(document.querySelector('.vm-bg'),'::before').backgroundImage},structures,leaves,actions:Array.from(document.querySelectorAll('.apoc-hero__actions a')).map(n=>({image:getComputedStyle(n).backgroundImage,shadow:getComputedStyle(n).boxShadow})),categories:Array.from(document.querySelectorAll('.apoc-library-summary')).map(n=>({text:n.innerText,title:n.querySelector('.apoc-library-title').textContent}))};
  })()`);
  observations.surfaces.push({ label, ...result });
  assert.equal(result.mode, mode);
  for (const owner of result.structures) {
    assert.ok(['rgba(0, 0, 0, 0)', 'transparent'].includes(owner.background), label + ' open background ' + JSON.stringify(owner));
    assert.equal(owner.image, 'none'); assert.equal(owner.shadow, 'none'); assert.equal(owner.filter, 'none');
  }
  for (const action of result.actions) { assert.equal(action.image, 'none'); assert.equal(action.shadow, 'none'); }
  for (const category of result.categories) assert.equal(category.text.split(category.title).length - 1, 1, 'one visible category title');
  if (mode === 'light') {
    assert.ok(result.field.includes('255, 248, 232'), 'painted light field');
    assert.equal(result.before.content, 'none', 'dark vignette is not painted in light');
    const failures=result.leaves.filter(leaf=>leaf.contrast<4.5); assert.deepEqual(failures, [], label + ' literal leaf contrast failures');
  }
  assert.ok(result.leaves.length >= 20, 'actual populated leaf witness');
}
async function archiveState(cdp) {
  return cdp.eval(`({hash:location.hash,open:Array.from(document.querySelectorAll('details')).map(n=>[n.id||n.dataset.sourceSubgroup,n.open]),current:Array.from(document.querySelectorAll('[aria-current]')).map(n=>[n.getAttribute('href'),n.getAttribute('aria-current')]),links:Array.from(document.querySelectorAll('.apoc-source-card a')).map(n=>n.href),counts:Array.from(document.querySelectorAll('.apoc-shelf__count')).map(n=>n.textContent)})`);
}
async function libraryContent(cdp) {
  // Compare individual semantic leaves: authored indentation inserts whitespace
  // between blocks while the registry producer joins those blocks directly.
  return cdp.eval(`({groups:Array.from(document.querySelectorAll('details.apoc-library-group')).map(n=>n.id),sources:Array.from(document.querySelectorAll('[data-source-id]')).map(n=>({id:n.dataset.sourceId,group:n.dataset.sourceGroup,type:n.dataset.sourceType,role:n.dataset.evidenceRole,status:n.dataset.verificationStatus,text:Array.from(n.querySelectorAll('h4,p,.apoc-badge,.apoc-source-tags li,a')).map(t=>t.textContent.replace(/\\s+/g,' ').trim()),links:Array.from(n.querySelectorAll('a')).map(a=>a.getAttribute('href'))})),counts:Array.from(document.querySelectorAll('[data-source-count]')).map(n=>[n.dataset.sourceCount,n.textContent.trim()])})`);
}
async function dialogStyles(cdp, selector, mode) {
  await cdp.send('Page.bringToFront');
  await cdp.eval('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
  const start = Date.now();
  const timing = await cdp.eval(`(()=>{const s=getComputedStyle(document.querySelector(${JSON.stringify(selector)}));return {property:s.transitionProperty,duration:s.transitionDuration,delay:s.transitionDelay,initial:s.backgroundColor}})()`);
  while (Date.now()-start < 500) {
    const bg = await cdp.eval(`getComputedStyle(document.querySelector(${JSON.stringify(selector)})).backgroundColor`);
    if (mode === 'light' ? bg === 'rgb(247, 237, 216)' : bg !== 'rgb(247, 237, 216)') break;
    await delay(16);
  }
  const state = await cdp.eval(`(()=>{
    const root=document.querySelector(${JSON.stringify(selector)}),s=getComputedStyle(root);
    const rgb=v=>{const c=(v.match(/[\\d.]+/g)||[]).map(Number);return v.startsWith('color(srgb')?c.map((v,i)=>i<3?v*255:v):c};
    const blend=(f,b)=>f.slice(0,3).map((v,i)=>v*(f[3]??1)+b[i]*(1-(f[3]??1)));
    const lum=c=>c.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
    const ratio=(f,b)=>(Math.max(lum(f),lum(b))+.05)/(Math.min(lum(f),lum(b))+.05);
    return {mode:document.documentElement.dataset.vmTheme,bg:s.backgroundColor,color:s.color,leaves:Array.from(root.querySelectorAll('h2,h3,p,dt,dd,label,button,input,select,textarea,small,span,a,strong')).filter(n=>n.getClientRects().length&&!n.matches('.ms')&&(n.textContent.trim()||n.matches('input,textarea'))).map(n=>{
      const s=getComputedStyle(n);let overlays=[];for(let p=n;p;p=p.parentElement){const c=rgb(getComputedStyle(p).backgroundColor);if(c.length>=3&&(c[3]??1)>0){overlays.push(c);if((c[3]??1)===1)break}}
      const bg=overlays.reverse().reduce((b,f)=>blend(f,b),[0,0,0]);return {tag:n.tagName,text:n.textContent.trim().slice(0,40),bg:s.backgroundColor,color:s.color,scheme:s.colorScheme,disabled:n.disabled??false,contrast:ratio(blend(rgb(s.color),bg),bg)};
    })};
  })()`);
  assert.equal(state.mode, mode);
  observations.surfaces.push({ dialog: selector, timing: { ...timing, elapsedMs: Date.now()-start, final: state.bg }, ...state });
  assert.ok(state.leaves.length > 3, 'actual dialog child population');
  if(mode==='light')assert.equal(state.bg,'rgb(247, 237, 216)');else assert.notEqual(state.bg,'rgb(247, 237, 216)');
  if (mode === 'light') {
    for (const leaf of state.leaves.filter(n => ['INPUT', 'SELECT', 'TEXTAREA'].includes(n.tag))) assert.equal(leaf.scheme, 'light', 'native theme');
    assert.deepEqual(state.leaves.filter(n=>!n.disabled&&n.contrast<4.5), [], 'actual dialog leaf contrast');
  }
}
async function contain(cdp, selector) {
  const r = await cdp.eval(`(()=>{const n=document.querySelector(${JSON.stringify(selector)}),r=n.getBoundingClientRect();return {width:innerWidth,height:innerHeight,scroll:document.documentElement.scrollWidth,left:r.left,right:r.right,top:r.top,bottom:r.bottom}})()`);
  assert.equal(r.width, 390); assert.ok(r.scroll <= r.width + 1, 'document containment ' + JSON.stringify(r));
  assert.ok(r.left >= -1 && r.right <= r.width + 1, selector + ' contained ' + JSON.stringify(r));
  observations.surfaces.push({ selector, containment: r });
}

try {
  mark('launch raw-CDP localhost Edge');
  const child = spawn(process.env.LIGHTHOUSE_CHROME_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', ['--headless=new', '--remote-debugging-port=0', '--remote-debugging-address=127.0.0.1', '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check', '--disable-background-networking', '--disable-component-update', 'about:blank'], { windowsHide: true, stdio: 'ignore' });
  browser = { child, port: null };
  for (let i = 0; i < 100; i++) { try { browser.port = Number((await readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]); break; } catch { await delay(50); } }
  assert.ok(browser.port, 'Edge DevTools ready');
  const version = await (await fetch(`http://127.0.0.1:${browser.port}/json/version`)).json(); browserCdp = new CDP(version.webSocketDebuggerUrl);
  const cdp = await page();
  await navigate(cdp, '/apocrypha/');
  await cdp.eval(`localStorage.setItem('vm685_unrelated','unchanged');localStorage.setItem('vm_reduce_motion','true')`);
  await cdp.eval(`import('/assets/js/shared/vm-clipboard.js').then(({getClipboard})=>{getClipboard().add({object:'card',name:'VM685 local fixture',id:'68500000-0000-4000-8000-000000000001',oracle_id:'68510000-0000-4000-8000-000000000001',mana_cost:'{2}',type_line:'Artifact',legalities:{commander:'legal'}},'finds');return true})`);
  const protectedStorage = await cdp.eval(`Object.fromEntries(Object.entries(localStorage).filter(([key])=>key!=='vm_theme_mode_v1'))`);
  mark('default dark; saved-light prepaint and loaded fonts');
  assert.equal(await cdp.eval('document.documentElement.dataset.vmTheme'), 'dark');
  await click(cdp, '.vm-utility > [data-vm-theme-toggle]'); await theme(cdp, 'light');
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `document.addEventListener('DOMContentLoaded',()=>{window.__vm685paint={mode:document.documentElement.dataset.vmTheme,surface:getComputedStyle(document.querySelector('.vm-bg')).backgroundImage}});` });
  await navigate(cdp, '/apocrypha/');
  assert.equal((await cdp.eval('window.__vm685paint')).mode, 'light');
  await theme(cdp, 'light'); await surfaces(cdp, 'light', 'registry opening');
  // Palette-only representative on the real node. The unchanged file-protocol
  // notice branch is source-preserved, not claimed as browser-executed here.
  const statusTone = await cdp.eval(`(()=>{const n=document.querySelector('[data-apoc-source-status]'),tone=n.dataset.tone;n.dataset.tone='notice';return tone})()`);
  const noticeStart = Date.now(),noticeTiming = await cdp.eval(`(()=>{const s=getComputedStyle(document.querySelector('[data-apoc-source-status]'));return {property:s.transitionProperty,duration:s.transitionDuration,delay:s.transitionDelay}})()`);
  let noticePalette;
  do {
    noticePalette = await cdp.eval(`(()=>{const s=getComputedStyle(document.querySelector('[data-apoc-source-status]'));return {fixture:'notice palette only',bg:s.backgroundColor,color:s.color}})()`);
    if(noticePalette.bg==='rgb(247, 237, 216)'&&noticePalette.color==='rgb(104, 88, 71)')break;
    await delay(16);
  } while(Date.now()-noticeStart<500);
  await cdp.eval(`document.querySelector('[data-apoc-source-status]').dataset.tone=${JSON.stringify(statusTone)}`);
  observations.surfaces.push({noticePalette,statusTone,timing:{...noticeTiming,elapsedMs:Date.now()-noticeStart}});
  assert.deepEqual(noticePalette,{fixture:'notice palette only',bg:'rgb(247, 237, 216)',color:'rgb(104, 88, 71)'});
  const registryContent = await libraryContent(cdp);
  const darkControl = await page(); await navigate(darkControl, '/apocrypha/');
  mark('compass, nested disclosure, hash, two-way open-state reversal');
  await click(cdp, '[data-source-tome][data-library-target="apoc-library-worldbuilding-lore"]');
  await wait(cdp, `location.hash==='#apoc-library-worldbuilding-lore' && document.querySelectorAll('details.apoc-library-group[open]').length===1`);
  await click(cdp, '#apoc-library-worldbuilding-lore .apoc-shelf > summary');
  const state = await archiveState(cdp);
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','dark')`);
  await wait(cdp, `document.documentElement.dataset.vmTheme==='dark'`); await theme(cdp, 'dark');
  assert.deepEqual(await archiveState(cdp), state); await surfaces(cdp, 'dark', 'registry reversal');
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','light')`);
  await wait(cdp, `document.documentElement.dataset.vmTheme==='light'`); assert.deepEqual(await archiveState(cdp), state);
  await surfaces(cdp, 'light', 'nested population');
  await navigate(cdp, '/apocrypha/#apoc-library-supplemental-references');
  assert.ok((await archiveState(cdp)).open.find(([id, open]) => id === 'apoc-library-supplemental-references' && open));
  await tabTo(cdp, '#apoc-library-supplemental-references > summary'); await key(cdp, 'Enter'); await key(cdp, 'Enter');
  await tabTo(cdp, '#apoc-library-supplemental-references .apoc-source-card a');
  mark('hints and shared dialogs with native keyboard focus and local mocked feedback');
  await click(cdp, '.vm-utility > [data-vm-theme-toggle]'); await click(cdp, '.vm-utility > [data-vm-theme-toggle]');
  await tabTo(cdp, '.vm-utility > [data-vm-theme-toggle]'); await key(cdp, 'Enter'); await theme(cdp, 'dark');
  await key(cdp, 'Enter'); await theme(cdp, 'light');
  for (const nav of ['home', 'archscry', 'maze', 'strategium', 'apocrypha']) {
    const selector = `.vm-nav > [data-vm-nav="${nav}"]`;
    await tabTo(cdp, selector);
    await delay(180);
    const hint = await cdp.eval(`(()=>{const n=document.querySelector(${JSON.stringify(selector)}),s=getComputedStyle(n.querySelector('.vm-nav-hint'));return {bg:s.backgroundColor,color:s.color,opacity:s.opacity,active:document.activeElement.outerHTML.slice(0,500),focused:n.matches(':focus-visible'),hover:n.matches(':hover'),display:s.display,transition:s.transitionDuration}})()`);
    observations.surfaces.push({ hint: nav, ...hint });
    assert.equal(hint.bg, 'rgb(247, 237, 216)'); assert.equal(hint.color, 'rgb(33, 27, 24)'); assert.equal(hint.opacity, '1', JSON.stringify(hint));
  }
  await tabTo(cdp, '#vm-clipboard-trigger'); await key(cdp, 'Enter');
  await wait(cdp, `document.querySelector('.vm-clipboard-dialog').open`);
  assert.ok(await cdp.eval(`document.querySelector('.vm-clipboard-dialog').contains(document.activeElement)`));
  await dialogStyles(cdp, '.vm-clipboard-dialog', 'light');
  await tabTo(cdp, '.vm-clipboard-section');
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','dark')`); await wait(cdp, `document.documentElement.dataset.vmTheme==='dark'`);
  await dialogStyles(cdp, '.vm-clipboard-dialog', 'dark');
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','light')`); await wait(cdp, `document.documentElement.dataset.vmTheme==='light'`);
  await dialogStyles(cdp, '.vm-clipboard-dialog', 'light');
  await key(cdp, 'Tab', 8); assert.ok(await cdp.eval(`document.querySelector('.vm-clipboard-dialog').contains(document.activeElement)`));
  await key(cdp, 'Escape'); assert.ok(await cdp.eval(`document.activeElement.id==='vm-clipboard-trigger'&&!document.querySelector('.vm-clipboard-dialog').open`));
  await tabTo(cdp, '#vm-feedback-trigger'); await key(cdp, 'Enter');
  await wait(cdp, `!document.querySelector('#vm-feedback-overlay').hidden`);
  await dialogStyles(cdp, '.vm-feedback-dialog', 'light');
  await click(cdp, '.vm-feedback-primary'); assert.equal(await cdp.eval(`document.querySelector('.vm-feedback-status').dataset.tone`), 'error');
  await tabTo(cdp, '.vm-feedback-field textarea'); await cdp.send('Input.insertText', { text: 'VM685 local mock only' });
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','dark')`); await wait(cdp, `document.documentElement.dataset.vmTheme==='dark'`);
  assert.equal(await cdp.eval(`document.querySelector('.vm-feedback-field textarea').value`), 'VM685 local mock only');
  await dialogStyles(cdp, '.vm-feedback-dialog', 'dark');
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','light')`); await wait(cdp, `document.documentElement.dataset.vmTheme==='light'`);
  await click(cdp, '.vm-feedback-primary'); assert.ok(await cdp.eval(`document.querySelector('.vm-feedback-primary').disabled`));
  await wait(cdp, `document.querySelector('.vm-feedback-status').dataset.tone==='success'`);
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','dark')`); await wait(cdp, `document.documentElement.dataset.vmTheme==='dark'`);
  assert.equal(await cdp.eval(`document.querySelector('.vm-feedback-status').dataset.tone`), 'success'); await dialogStyles(cdp, '.vm-feedback-dialog', 'dark');
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','light')`); await wait(cdp, `document.documentElement.dataset.vmTheme==='light'`);
  // The existing controller clamps cooldown to at least five seconds. Respect it
  // so this witnesses the provider error rather than the cooldown error.
  await delay(5100);
  feedbackFails = true; await click(cdp, '.vm-feedback-primary'); await wait(cdp, `document.querySelector('.vm-feedback-status').dataset.tone==='error'&&!document.querySelector('.vm-feedback-fallback').hidden`);
  assert.ok(await cdp.eval(`!document.querySelector('.vm-feedback-fallback').hidden`));
  await dialogStyles(cdp, '.vm-feedback-dialog', 'light');
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','dark')`); await wait(cdp, `document.documentElement.dataset.vmTheme==='dark'`);
  assert.equal(await cdp.eval(`document.querySelector('.vm-feedback-status').dataset.tone`), 'error'); await dialogStyles(cdp, '.vm-feedback-dialog', 'dark');
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','light')`); await wait(cdp, `document.documentElement.dataset.vmTheme==='light'`);
  observations.surfaces.push(await cdp.eval(`({feedbackStatus:document.querySelector('.vm-feedback-status').textContent,statusColor:getComputedStyle(document.querySelector('.vm-feedback-status')).color,field:getComputedStyle(document.querySelector('.vm-feedback-field textarea')).backgroundColor,dialog:getComputedStyle(document.querySelector('.vm-feedback-dialog')).backgroundColor})`));
  await key(cdp, 'Escape'); assert.ok(await cdp.eval(`document.querySelector('#vm-feedback-overlay').hidden&&document.activeElement.id==='vm-feedback-trigger'`));
  mark('390px measured compass/menu/dialog containment');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
  await navigate(cdp, '/apocrypha/'); await contain(cdp, '.apoc-page');
  await tabTo(cdp, '[data-source-tome][data-library-target="apoc-library-official-design"]');
  const railBefore = await cdp.eval(`(()=>{const n=document.querySelector('.apoc-source-compass__rail'),r=document.querySelector('[data-library-target="apoc-library-supplemental-references"]').getBoundingClientRect();return {scroll:n.scrollWidth,width:n.clientWidth,left:n.scrollLeft,farRight:r.right}})()`);
  assert.ok(railBefore.scroll > railBefore.width && railBefore.farRight > 390, 'initial internal compass overflow');
  for (let i=0;i<3;i++) await key(cdp, 'Tab');
  assert.ok(await cdp.eval(`document.activeElement.dataset.libraryTarget==='apoc-library-supplemental-references'`));
  assert.ok(await cdp.eval(`document.querySelector('.apoc-source-compass__rail').scrollLeft>${railBefore.left}`), 'native keyboard reached far-end scroll');
  // Native focus scrolling and existing proximity snapping must finish before
  // measuring the reached item; this does not move the rail programmatically.
  const scrollStart = Date.now();
  while (Date.now()-scrollStart < 1000) {
    if (await cdp.eval(`(()=>{const r=document.activeElement.getBoundingClientRect(),p=document.querySelector('.apoc-source-compass__rail').getBoundingClientRect();return r.left>=p.left-1&&r.right<=p.right+1})()`)) break;
    await delay(16);
  }
  const reached = await cdp.eval(`(()=>{const n=document.activeElement,r=n.getBoundingClientRect(),p=document.querySelector('.apoc-source-compass__rail').getBoundingClientRect(),s=getComputedStyle(n);return {width:innerWidth,documentScroll:document.documentElement.scrollWidth,left:r.left,right:r.right,railLeft:p.left,railRight:p.right,scroll:document.querySelector('.apoc-source-compass__rail').scrollLeft,focusVisible:n.matches(':focus-visible'),outline:s.outlineStyle,outlineWidth:s.outlineWidth}})()`);
  observations.surfaces.push({ compassScrollSettledMs: Date.now()-scrollStart, initial: railBefore, reached, limitation: reached.right>reached.railRight+1?'Inherited proximity snapping partly clips focused final tile; native focus/activation remain usable.':null });
  assert.ok(reached.documentScroll<=390&&reached.left>=reached.railLeft-1&&reached.left<reached.railRight&&reached.scroll>railBefore.left);
  assert.ok(reached.focusVisible&&reached.outline!=='none'&&parseFloat(reached.outlineWidth)>0);
  await key(cdp, 'Enter');
  assert.equal(await cdp.eval('location.hash'), '#apoc-library-supplemental-references');
  assert.ok(await cdp.eval(`document.querySelector('#apoc-library-supplemental-references').open&&document.querySelector('[data-library-target="apoc-library-supplemental-references"]').getAttribute('aria-current')==='true'`));
  await click(cdp, '[data-vm-menu-trigger]'); await contain(cdp, '.vm-menu-panel');
  await key(cdp, 'Escape'); assert.ok(await cdp.eval(`document.activeElement.matches('[data-vm-menu-trigger]')`));
  await click(cdp, '#vm-feedback-trigger'); await contain(cdp, '.vm-feedback-dialog'); await contain(cdp, '.vm-feedback-close'); await click(cdp, '.vm-feedback-close');
  assert.ok(await cdp.eval(`document.activeElement.id==='vm-feedback-trigger'`));
  await click(cdp, '#vm-clipboard-trigger'); await contain(cdp, '.vm-clipboard-dialog'); await contain(cdp, '[data-clipboard-action="close"]'); await click(cdp, '[data-clipboard-action="close"]');
  assert.ok(await cdp.eval(`document.activeElement.id==='vm-clipboard-trigger'`));
  await surfaces(cdp, 'light', '390px reference group');
  mark('real registry failure and no-JS fallback parity');
  registryFails = true; await navigate(cdp, '/apocrypha/', 'fallback');
  const fallbackContent = await libraryContent(cdp);
  assert.deepEqual(fallbackContent, registryContent, 'fallback and registry semantic/ordering parity');
  assert.equal(await cdp.eval(`document.querySelector('[data-apoc-source-status]').dataset.tone`), 'error');
  assert.equal(await cdp.eval(`document.querySelector('[data-apoc-source-status]').textContent`), 'The live source list could not be refreshed. The complete public source library remains available below.');
  await surfaces(cdp, 'light', 'load-failure fallback');
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','dark')`); await wait(cdp, `document.documentElement.dataset.vmTheme==='dark'`);
  await surfaces(cdp, 'dark', 'dark fallback');
  await cdp.send('Emulation.setScriptExecutionDisabled', { value: true });
  await cdp.send('Page.navigate', { url: origin + '/apocrypha/' }); await delay(500);
  const nojs = await cdp.eval(`({count:document.querySelectorAll('.apoc-source-card').length,theme:document.documentElement.dataset.vmTheme||null,mode:document.querySelector('[data-apoc-source-root]').dataset.renderMode,control:!!document.querySelector('[data-vm-theme-toggle]'),notice:Array.from(document.querySelectorAll('noscript .apoc-source-status')).map(n=>n.textContent.trim())})`);
  assert.equal(nojs.theme, null); assert.equal(nojs.count, 59); assert.equal(nojs.control, false); assert.deepEqual(await libraryContent(cdp), fallbackContent);
  assert.deepEqual(nojs.notice, ['JavaScript is off. The complete public source library remains available below.']);
  observations.surfaces.push({ noJS: nojs });
  await cdp.send('Emulation.setScriptExecutionDisabled', { value: false }); registryFails = false;
  mark('focused predecessor continuity, inert routes and Library alias');
  await darkControl.eval(`localStorage.setItem('vm_theme_mode_v1','light')`);
  for (const route of ['/index.html', '/terms/', '/privacy/', '/guide/', '/strategium/']) {
    await navigate(cdp, route); assert.equal(await cdp.eval('document.documentElement.dataset.vmTheme'), 'light');
    assert.ok(await cdp.eval(`!!document.querySelector('[data-vm-theme-toggle]')`));
  }
  await navigate(cdp, '/archscry/'); assert.equal(await cdp.eval(`document.documentElement.dataset.vmTheme||null`), null);
  assert.equal(await cdp.eval(`!!document.querySelector('[data-vm-theme-toggle]')`), false);
  await cdp.send('Page.navigate', { url: origin + '/library/' });
  await wait(cdp, `location.pathname==='/apocrypha/' && document.querySelector('[data-apoc-source-root]')?.dataset.renderMode==='registry'`);
  assert.equal(await cdp.eval('document.documentElement.dataset.vmTheme'), 'light');
  await darkControl.eval(`localStorage.removeItem('vm_theme_mode_v1')`); await wait(cdp, `document.documentElement.dataset.vmTheme==='dark'`);
  assert.deepEqual(await cdp.eval(`Object.fromEntries(Object.entries(localStorage).filter(([key])=>key!=='vm_theme_mode_v1'))`), protectedStorage);
  assert.equal(observations.feedback.length, 2); assert.deepEqual(observations.feedback.map(x => x.fail), [false, true]);
  assert.deepEqual(observations.errors, []);
  mark('PASS');
} catch (error) { observations.failure = error.stack; process.exitCode = 1; console.error(error); }
finally {
  observations.observedAt = new Date().toISOString();
  const output = process.env.VM685_EVIDENCE || path.join(os.tmpdir(), 'vm685-browser-observations.json');
  await writeFile(output, JSON.stringify(observations, null, 2)); console.log('Evidence: ' + output);
  if (observations.failure) await writeFile(output.replace(/\.json$/, '-failure-' + Date.now() + '.json'), JSON.stringify(observations, null, 2));
  if (browserCdp) { try { await browserCdp.send('Browser.close'); } catch {} browserCdp.close(); }
  browser?.child.kill(); await new Promise(resolve => server.close(resolve));
  // Only the known disposable profile generated above can be removed.
  if (path.dirname(profile) === os.tmpdir() && path.basename(profile).startsWith('vm685-edge-')) await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
