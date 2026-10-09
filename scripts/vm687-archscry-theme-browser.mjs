import assert from "node:assert/strict";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import puppeteer from "puppeteer-core";

// Puppeteer owns lifecycle and native input only. Product reads use direct
// CDPSession Runtime.evaluate; no page.evaluate/$eval/waitForFunction helpers.
const ROOT=process.cwd();
const EDGE=process.env.LIGHTHOUSE_CHROME_PATH||"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT=process.env.VM687_EVIDENCE||"C:\\Users\\obake\\.codex\\visualizations\\2026\\10\\09\\01a11f20-e75a-7931-89b2-d181603236f9\\vm687-alternate-development-browser.json";
const profile=await mkdtemp(path.join(os.tmpdir(),"vm687-edge-"));
const mime={".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".woff":"font/woff",".woff2":"font/woff2",".png":"image/png",".jpg":"image/jpeg",".webp":"image/webp"};
const evidence={task:"VM-687",priorAttempts:[
  {transport:"hand-rolled WebSocket raw CDP",result:"FAIL/unavailable",reason:"Runtime.evaluate timed out before DOM read"},
  {transport:"hand-rolled WebSocket causal check",result:"FAIL/unavailable",reason:"removing document.fonts.ready did not restore Runtime.evaluate"}
],attempt:{transport:"Puppeteer-Core lifecycle + native input + direct CDPSession.send Runtime.evaluate",result:"PENDING"},phases:[],observations:[],blockedRequests:[],errors:[],feedback:[]};
const mark=name=>{evidence.phases.push({name,at:new Date().toISOString()});console.log("VM687 "+name)};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const certified=JSON.parse(await readFile(path.join(ROOT,"docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json"),"utf8"));
const jund=certified.rows.find(row=>row.identity_key==="JUND")?.result;
const yore=certified.rows.find(row=>row.identity_key==="YORE")?.result;
assert.equal(jund?.faction,"JUND","certified Jund close result at rows[].result");
assert.equal(yore?.result_state,"insufficient","certified bounded Yore recovery result at rows[].result");
let feedbackError=false,browser;
const contexts=[];

function localFile(url){
  const rel=decodeURIComponent(url.split("?")[0]).replace(/^\/+/,"")||"index.html";
  const file=path.resolve(ROOT,rel.endsWith("/")?rel+"index.html":rel);
  if(!file.startsWith(path.resolve(ROOT)+path.sep))throw Error("outside fixture root");
  return file;
}
const server=http.createServer(async(req,res)=>{
  try{
    if(req.url==="/__blank.html"){res.writeHead(200,{"content-type":"text/html"});res.end("<!doctype html>");return}
    if(req.url==="/__feedback"){
      let body="";for await(const part of req)body+=part;
      evidence.feedback.push({outcome:feedbackError?"error":"success",bytes:body.length});
      res.writeHead(feedbackError?503:200,{"content-type":"application/json"});
      res.end(JSON.stringify(feedbackError?{success:false,message:"controlled failure"}:{success:true}));return
    }
    const file=localFile(req.url||"/");await stat(file);
    res.writeHead(200,{"content-type":mime[path.extname(file).toLowerCase()]||"application/octet-stream","cache-control":"no-store"});
    res.end(await readFile(file));
  }catch{res.writeHead(404);res.end("Not found")}
});
await new Promise(r=>server.listen(0,"127.0.0.1",r));
const origin="http://127.0.0.1:"+server.address().port;

async function read(client,expression){
  const answer=await client.send("Runtime.evaluate",{expression,awaitPromise:true,returnByValue:true});
  if(answer.exceptionDetails)throw Error(answer.exceptionDetails.exception?.description||answer.exceptionDetails.text);
  return answer.result.value;
}
async function wait(client,expression,label,timeout=10000){
  const end=Date.now()+timeout;
  while(Date.now()<end){if(await read(client,expression))return;await sleep(50)}
  throw Error("Timed out waiting for "+label);
}
async function newContext(){const context=await browser.createBrowserContext();contexts.push(context);return context}
async function fresh(context,width=1440,height=1000,options={}){
  const page=await context.newPage();await page.setViewport({width,height,deviceScaleFactor:1});
  const client=await page.createCDPSession();
  await client.send("Runtime.enable");await client.send("Page.enable");await client.send("Fetch.enable",{patterns:[{urlPattern:"*"}]});
  client.on("Fetch.requestPaused",async event=>{
    try{
      const local=new URL(event.request.url).origin===origin&&!((options.blockChart)&&/\/assets\/js\/vendor\/chart\.umd\.js(?:\?|$)/.test(event.request.url));
      if(!local)evidence.blockedRequests.push(event.request.url);
      await client.send(local?"Fetch.continueRequest":"Fetch.failRequest",local?{requestId:event.requestId}:{requestId:event.requestId,errorReason:"BlockedByClient"});
    }catch(error){evidence.errors.push("Fetch: "+error.message)}
  });
  page.on("pageerror",error=>evidence.errors.push(error.message));
  await client.send("Page.addScriptToEvaluateOnNewDocument",{source:"window.VM_FEEDBACK_CONFIG={endpoint:"+JSON.stringify(origin+"/__feedback")+",accessKey:'fixture',cooldownMs:0,timeoutMs:2000};window.__vm687Paint=[];new PerformanceObserver(l=>window.__vm687Paint.push(...l.getEntries().map(e=>({name:e.name,theme:document.documentElement.dataset.vmTheme||null})))).observe({type:'paint',buffered:true});document.addEventListener('DOMContentLoaded',()=>window.__vm687Dom={theme:document.documentElement.dataset.vmTheme||null,scheme:document.documentElement.style.colorScheme||null},{once:true});"});
  return{page,client}
}
async function nav(ctx,route,ready="document.readyState==='complete'"){
  await ctx.page.goto(origin+route,{waitUntil:"load",timeout:10000});await wait(ctx.client,ready,route)
}
async function seed(ctx,values){
  await nav(ctx,"/__blank.html");
  await read(ctx.client,"(()=>{for(const [k,v] of Object.entries("+JSON.stringify(values)+")){if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}return true})()")
}
async function center(ctx,selector){
  return read(ctx.client,"(()=>{const n=document.querySelector("+JSON.stringify(selector)+");if(!n)return null;n.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});const r=n.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,w:r.width,h:r.height}})()")
}
async function click(ctx,selector){
  const p=await center(ctx,selector);assert.ok(p&&p.w>0&&p.h>0,"visible "+selector);
  await ctx.page.mouse.move(p.x,p.y);await ctx.page.mouse.down();await ctx.page.mouse.up()
}
async function hover(ctx,selector){const p=await center(ctx,selector);assert.ok(p,selector);await ctx.page.mouse.move(p.x,p.y)}
async function tabTo(ctx,selector,limit=180){
  await ctx.page.mouse.move(1,1);
  for(let i=0;i<limit;i++){await ctx.page.keyboard.press("Tab");if(await read(ctx.client,"document.activeElement?.matches("+JSON.stringify(selector)+")")){assert.ok(await read(ctx.client,"document.activeElement.matches(':focus-visible')"));return}}
  throw Error("native Tab cannot reach "+selector)
}
async function theme(ctx,mode){
  const value=await read(ctx.client,"document.fonts.ready.then(()=>{const t=document.querySelector('.vm-utility > [data-vm-theme-toggle]'),i=t?.querySelector('.ms'),p=i&&getComputedStyle(i,'::before'),glyph=p?.content||'',nodes=[document.body,document.querySelector('h1'),document.querySelector('p')].filter(Boolean),routeFonts=[...new Set(nodes.map(n=>getComputedStyle(n).fontFamily))],faces=[...document.fonts].filter(f=>/Mana|Outfit|Almendra|Cormorant|Lora|Plex/.test(f.family)).map(f=>[f.family,f.status]),resources=performance.getEntriesByType('resource').map(x=>x.name);return{mode:document.documentElement.dataset.vmTheme,saved:localStorage.getItem('vm_theme_mode_v1'),scheme:document.documentElement.style.colorScheme,label:t?.getAttribute('aria-label'),classes:i?.className,glyph,glyphCode:glyph.codePointAt(1),font:p?.fontFamily,loaded:document.fonts.check('14px Mana'),routeFonts,faces,resources}})");
  assert.equal(value.mode,mode);assert.equal(value.saved,mode);assert.equal(value.scheme,mode);
  const next=mode==="dark"?"light":"dark";assert.equal(value.label,"Switch to "+next+" theme");
  assert.ok(value.classes.includes(next==="light"?"ms-w":"ms-b"));assert.equal(value.glyphCode,next==="light"?0xe600:0xe602);
  assert.ok(/Mana/.test(value.font)&&value.loaded&&value.faces.some(([f,s])=>/Mana/.test(f)&&s==="loaded"));
  assert.ok(value.resources.some(x=>/mana\.min\.css/i.test(x))&&value.resources.some(x=>/mana\.woff/i.test(x)));
  assert.ok(value.resources.some(x=>/\.woff2(?:\?|$)/i.test(x)),"self-hosted WOFF2 requested");
  assert.ok(value.faces.some(([family,status])=>status==="loaded"&&!/Mana/.test(family)&&value.routeFonts.some(stack=>stack.includes(family))),"loaded self-hosted text face is actually used by route text");
  evidence.observations.push({kind:"theme",...value})
}
async function paint(ctx,label,selectors){
  const value=await read(ctx.client,"(()=>{const ss="+JSON.stringify(selectors)+",vis=n=>n&&n.getClientRects().length&&getComputedStyle(n).visibility!=='hidden',rgba=v=>{const m=String(v).match(/[\\d.]+/g);return m&&m.length>=3?[+m[0],+m[1],+m[2],m[3]===undefined?1:+m[3]]:null},clear=v=>{const c=rgba(v);return !c||c[3]===0},contrast=(a,b)=>{const x=rgba(a),y=rgba(b);if(!x||!y||x[3]===0||y[3]===0)return null;const f=c=>{const q=c/255;return q<=.03928?q/12.92:Math.pow((q+.055)/1.055,2.4)},la=.2126*f(x[0])+.7152*f(x[1])+.0722*f(x[2]),lb=.2126*f(y[0])+.7152*f(y[1])+.0722*f(y[2]);return(Math.max(la,lb)+.05)/(Math.min(la,lb)+.05)},stops=image=>[...String(image).matchAll(/rgba?\\([^)]*\\)/g)].map(m=>m[0]).filter(v=>!clear(v)),layer=(p,pseudo='')=>{const s=getComputedStyle(p,pseudo);return{pseudo,content:s.content,color:s.backgroundColor,image:s.backgroundImage}},painted=l=>!clear(l.color)||l.image!=='none',owner=n=>{for(let p=n;p;p=p.parentElement){const layers=[layer(p),layer(p,'::before'),layer(p,'::after')].filter((l,i)=>painted(l)&&(i===0||!['none','normal'].includes(l.content)));if(layers.length)return{tag:p.tagName,cls:p.className,layers}}return null},rows=[];for(const sel of ss)for(const root of document.querySelectorAll(sel)){if(!vis(root))continue;for(const n of[root,...root.querySelectorAll('strong,small,p,span,label,button,a,input,textarea,select')]){if(!vis(n)||n.closest('[hidden],.hidden,.card-preview-overlay[aria-hidden=\"true\"]')||n.matches('.ms,img,svg,canvas')||n.closest('.identity-atlas-card-pips,.mana-pips,.vm-tag-row'))continue;const text=(n.value||n.textContent||'').replace(/\\s+/g,' ').trim(),s=getComputedStyle(n),o=owner(n),backgrounds=o?.layers.flatMap(l=>[...(!clear(l.color)?[l.color]:[]),...stops(l.image)])||[],ratios=backgrounds.map(bg=>contrast(s.color,bg)).filter(Number.isFinite);if(text)rows.push({sel,tag:n.tagName,text:text.slice(0,80),color:s.color,fontSize:parseFloat(s.fontSize),fontWeight:parseInt(s.fontWeight)||400,owner:o,artwork:o?.layers.some(l=>/url\\(/.test(l.image))||false,gradient:o?.layers.some(l=>/gradient\\(/.test(l.image))||false,gradientUncovered:o?.layers.some(l=>/gradient\\(/.test(l.image)&&stops(l.image).length===0)||false,minContrast:ratios.length?Math.min(...ratios):null})}}return{theme:document.documentElement.dataset.vmTheme,width:innerWidth,scroll:document.documentElement.scrollWidth,rows,native:[...document.querySelectorAll('input,textarea,select,button')].filter(vis).map(n=>getComputedStyle(n).colorScheme)}})()");
  assert.ok(selectors.every(selector=>value.rows.some(row=>row.sel===selector)),label+" every selected seam is visible and has literal descendants");
  assert.ok(value.rows.every(x=>x.owner),label+" literal descendants resolve paint owners");
  assert.ok(value.scroll<=value.width+1,label+" document containment");if(value.theme==="light")assert.ok(value.native.every(x=>x==="light"));
  if(value.theme==="light"){
    const neutral=value.rows.filter(x=>!x.artwork);
    assert.ok(neutral.every(x=>x.color!=="rgb(205, 198, 184)"&&x.color!=="rgb(255, 255, 255)"),label+" has no retained pale/dark-theme literal child");
    assert.ok(neutral.every(x=>!x.gradientUncovered),label+" gradient owners expose stable computed stops");
    assert.ok(neutral.every(x=>x.minContrast!==null),label+" neutral owners expose a composited solid/gradient background");
    assert.ok(neutral.every(x=>x.minContrast>=((x.fontSize>=24||(x.fontSize>=18.66&&x.fontWeight>=700))?3:4.5)),label+" neutral literal text meets computed WCAG-sized contrast");
    assert.ok(neutral.filter(x=>["STRONG","SMALL"].includes(x.tag)).every(x=>x.minContrast>=4.5),label+" repeated strong/small text meets readable computed contrast");
  }
  evidence.observations.push({kind:"paint",label,...value})
}
async function contain(ctx,selectors){
  const value=await read(ctx.client,"(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,items:"+JSON.stringify(selectors)+".map(selector=>{const n=document.querySelector(selector),r=n?.getBoundingClientRect();return{selector,exists:!!n,left:r?.left,right:r?.right}})}))()");
  assert.equal(value.width,390);assert.ok(value.scroll<=391);
  for(const x of value.items){assert.ok(x.exists,x.selector);assert.ok(x.left>=-1&&x.right<=391,"contained "+x.selector)}
  evidence.observations.push({kind:"containment",...value})
}
async function requested(ctx,label,patterns){
  const resources=await read(ctx.client,"performance.getEntriesByType('resource').map(x=>x.name)");
  for(const pattern of patterns)assert.ok(resources.some(url=>url.includes(pattern)),label+" requested "+pattern);
  evidence.observations.push({kind:"resources",label,matched:patterns})
}
const chartState="(()=>{const c=document.querySelector('#dossierManaRadar'),x=c&&window.Chart?.getChart(c);return{panels:document.querySelectorAll('[data-dossier-panel]').length,visible:[...document.querySelectorAll('[data-dossier-panel]')].filter(n=>!n.hidden).map(n=>n.dataset.dossierPanel),component:document.querySelector('#dossierComponentToggle')?.checked,composite:document.querySelector('#dossierCompositeToggle')?.checked,pinned:document.querySelector('[data-dossier-axis-index].is-active')?.dataset.dossierAxisIndex||null,chart:x&&{id:x.id,data:x.data.datasets.map(d=>({label:d.label,data:[...d.data],borderColor:d.borderColor,backgroundColor:d.backgroundColor,composite:!!d._vmComposite})),labels:[...x.data.labels],active:x.getActiveElements(),grid:x.options.scales.r.grid.color,ticks:x.options.scales.r.ticks.color,points:x.options.scales.r.pointLabels.color}}})()";

try{
  mark("launch one approved alternate");await stat(EDGE);
  browser=await puppeteer.launch({executablePath:EDGE,headless:true,userDataDir:profile,protocolTimeout:10000,args:["--no-first-run","--no-default-browser-check","--disable-background-networking","--disable-component-update"]});

  mark("saved-light Jund composed dossier and chart continuity");
  const savedContext=await newContext();const saved=await fresh(savedContext);await seed(saved,{vm_theme_mode_v1:"light",vm_archscry_saved_reading_v1:JSON.stringify(jund),vm687_unrelated:"unchanged",vm_reduce_motion:"true"});
  await nav(saved,"/archscry/","!!document.querySelector('#result:not(.hidden) #dossierManaRadar')&&!!window.Chart?.getChart(document.querySelector('#dossierManaRadar'))");
  assert.deepEqual(await read(saved.client,"window.__vm687Dom"),{theme:"light",scheme:"light"});
  await wait(saved.client,"window.__vm687Paint.some(x=>x.name==='first-contentful-paint')","non-vacuous first contentful paint");
  const firstPaint=await read(saved.client,"window.__vm687Paint");assert.ok(firstPaint.length>0&&firstPaint.some(x=>x.name==="first-paint")&&firstPaint.some(x=>x.name==="first-contentful-paint")&&firstPaint.every(x=>x.theme==="light"));await theme(saved,"light");
  await requested(saved,"Archscry",["/assets/css/theme-pages.css?v=vm687","/assets/js/shared/vm-theme.js?v=vm687","/assets/js/archscry/index.js?v=vm687"]);
  const initial=await read(saved.client,chartState);assert.ok(initial.chart&&initial.panels>=7&&initial.visible.includes("placement"));
  await click(saved,"[data-dossier-axis-index='1']");await click(saved,"#dossierComponentToggle");await click(saved,"#dossierCompositeToggle");
  const selected=await read(saved.client,chartState);assert.equal(selected.pinned,"1");
  await click(saved,".vm-utility > [data-vm-theme-toggle]");await theme(saved,"dark");const dark=await read(saved.client,chartState);
  assert.equal(dark.chart.id,selected.chart.id);assert.deepEqual(dark.chart.data,selected.chart.data);assert.deepEqual(dark.chart.active,selected.chart.active);
  assert.equal(dark.pinned,selected.pinned);assert.equal(dark.component,selected.component);assert.equal(dark.composite,selected.composite);assert.notEqual(dark.chart.grid,selected.chart.grid);assert.notEqual(dark.chart.points,selected.chart.points);
  await click(saved,".vm-utility > [data-vm-theme-toggle]");await theme(saved,"light");assert.equal((await read(saved.client,chartState)).chart.grid,selected.chart.grid);
  const peer=await fresh(savedContext);await nav(peer,"/__blank.html");await read(peer.client,"localStorage.setItem('vm_theme_mode_v1','dark')");
  await wait(saved.client,"document.documentElement.dataset.vmTheme==='dark'","cross-tab dark");await theme(saved,"dark");
  await read(peer.client,"localStorage.setItem('vm_theme_mode_v1','light')");await wait(saved.client,"document.documentElement.dataset.vmTheme==='light'","cross-tab light");await theme(saved,"light");
  await read(saved.client,"localStorage.setItem('vm_theme_mode_v1','dark');window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}))");
  await wait(saved.client,"document.documentElement.dataset.vmTheme==='dark'","pageshow refresh");await theme(saved,"dark");
  await click(saved,".vm-utility > [data-vm-theme-toggle]");await theme(saved,"light");
  await paint(saved,"saved Jund dossier",[".guild-banner",".dossier-console","#dossier-panel-placement",".vm-controls",".app-footer",".vm-topbar"]);

  mark("fresh Archscry flow, Atlas, Colorless and reset seams");
  const flowContext=await newContext();const flow=await fresh(flowContext);await seed(flow,{vm_theme_mode_v1:"light",vm687_unrelated:"unchanged"});await nav(flow,"/archscry/","!!document.querySelector('[data-action=\"start-quick-flow\"]')");
  await click(flow,'[data-action="start-quick-flow"]');await wait(flow.client,"document.querySelectorAll('#answer-grid [data-action=\"answer-quick-question\"]').length>=3","first question");
  const question=await read(flow.client,"(()=>({progress:document.querySelector('#progress-copy').textContent.trim(),title:document.querySelector('#question-title').textContent.trim(),count:document.querySelectorAll('#answer-grid [data-action=\"answer-quick-question\"]').length,template:document.querySelector('#answer-grid').dataset.answerCount}))()");
  assert.ok(question.title&&question.count>=3);assert.equal(question.template,String(question.count));await click(flow,'#answer-grid [data-action="answer-quick-question"]');
  await wait(flow.client,"document.querySelector('#progress-copy').textContent.includes('Question 2')||!document.querySelector('#quick-transition').classList.contains('hidden')","answer advances");
  await click(flow,'[data-action="quick-back"]');await wait(flow.client,"document.querySelector('#question-title').textContent==="+JSON.stringify(question.title),"Back restores");await click(flow,'[data-action="quick-back"]');await wait(flow.client,"!document.querySelector('#landing').classList.contains('hidden')","Back landing");
  await nav(flow,"/archscry/?explore=atlas","document.querySelectorAll('.identity-atlas-card').length===37");
  assert.deepEqual(await read(flow.client,"(()=>({cards:document.querySelectorAll('.identity-atlas-card').length,groups:document.querySelectorAll('.identity-atlas-group').length,dest:+document.querySelector('[data-identity-atlas]').dataset.destinationCount,commander:+document.querySelector('[data-identity-atlas]').dataset.commanderIdentityCount,expressions:+document.querySelector('[data-identity-atlas]').dataset.strixhavenExpressionCount}))()"),{cards:37,groups:7,dest:37,commander:32,expressions:5});
  await paint(flow,"Atlas",[".identity-atlas-hero",".identity-atlas-group:not([hidden])",".identity-atlas-card",".identity-atlas-pager"]);
  await nav(flow,"/archscry/?explore=colorless","!!document.querySelector('[data-identity-explore]')&&!!document.querySelector('#dossierManaRadar')");
  const colorless=await read(flow.client,"(()=>({name:document.querySelector('.guild-name')?.textContent.trim(),colors:document.querySelectorAll('.guild-banner .ms').length,placement:!!document.querySelector('[data-dossier-panel=\"placement\"]'),saved:localStorage.getItem('vm_archscry_saved_reading_v1')}))()");
  assert.match(colorless.name,/Colorless/i);assert.equal(colorless.colors,0);assert.equal(colorless.placement,false);assert.equal(colorless.saved,null);

  await seed(flow,{vm_theme_mode_v1:"light",vm_archscry_saved_reading_v1:JSON.stringify(jund),vm687_unrelated:"unchanged"});await nav(flow,"/archscry/","!!document.querySelector('[data-action=\"retake\"]')");
  flow.page.once("dialog",d=>d.accept());await click(flow,'[data-action="retake"]');await wait(flow.client,"!document.querySelector('#landing').classList.contains('hidden')","Retake landing");assert.equal(await read(flow.client,"JSON.parse(localStorage.getItem('vm_archscry_saved_reading_v1')).faction"),"JUND");
  await nav(flow,"/archscry/","!!document.querySelector('[data-action=\"forget-saved-reading\"]')");await click(flow,'[data-action="forget-saved-reading"]');await wait(flow.client,"localStorage.getItem('vm_archscry_saved_reading_v1')===null","Forget");
  await flow.page.reload({waitUntil:"load",timeout:10000});await wait(flow.client,"!document.querySelector('#landing').classList.contains('hidden')","forgotten absent");assert.equal(await read(flow.client,"localStorage.getItem('vm687_unrelated')"),"unchanged");

  await seed(flow,{vm_theme_mode_v1:"light",vm_archscry_saved_reading_v1:JSON.stringify(yore)});await nav(flow,"/archscry/","!!document.querySelector('#result-inner [data-result-state],#result-inner [data-action=\"start-result-refinement\"],#result-inner [data-action=\"revisit-result-answer\"]')");
  const recoveryState=await read(flow.client,"(()=>({text:document.querySelector('#result-inner')?.textContent.replace(/\\s+/g,' ').trim(),refine:!!document.querySelector('[data-action=\"start-result-refinement\"], [data-action=\"revisit-result-answer\"]')}))()");
  assert.match(recoveryState.text,/unable|insufficient|refin|direction/i);assert.ok(recoveryState.refine||/cannot responsibly|try again/i.test(recoveryState.text));await paint(flow,"bounded Yore recovery",["#result-inner"]);
  const legacy={...jund,source_mode:"legacy",legacy_result:true};await seed(flow,{vm_theme_mode_v1:"light",vm_archscry_saved_reading_v1:JSON.stringify(legacy)});await nav(flow,"/archscry/","!!document.querySelector('.bounded-result-shell[data-result-state=\"unknown\"]')");
  assert.match(await read(flow.client,"document.querySelector('.bounded-result-shell').textContent.replace(/\\s+/g,' ').trim()"),/Legacy reading.*Jund.*answer.*unavailable/i);await paint(flow,"legacy saved-reading recovery",[".bounded-result-shell"]);
  await nav(flow,"/archscry/?explore=not-a-real-identity","!!document.querySelector('.identity-atlas-recovery')");
  assert.match(await read(flow.client,"document.querySelector('.identity-atlas-recovery').textContent.trim()"),/requested identity was unavailable/i);assert.equal(await read(flow.client,"document.querySelectorAll('.identity-atlas-card').length"),37);await paint(flow,"invalid identity recovery",[".identity-atlas-recovery",".identity-atlas-group:not([hidden])"]);

  const fallbackContext=await newContext();const fallback=await fresh(fallbackContext,1440,1000,{blockChart:true});await seed(fallback,{vm_theme_mode_v1:"light",vm_archscry_saved_reading_v1:JSON.stringify(jund)});await nav(fallback,"/archscry/","!document.querySelector('[data-dossier-radar-fallback]').hidden");
  const fallbackState=await read(fallback.client,"(()=>({text:document.querySelector('[data-dossier-radar-fallback]').textContent.trim(),canvas:document.querySelector('#dossierManaRadar').hidden,disabled:[...document.querySelectorAll('.vm-controls input')].every(n=>n.disabled)}))()");
  assert.match(fallbackState.text,/Radar preview unavailable/);assert.equal(fallbackState.canvas,true);assert.equal(fallbackState.disabled,true);await paint(fallback,"chart unavailable recovery",[".vm-dossier-radar-panel","[data-dossier-radar-fallback]",".vm-matrix-summary-card"]);
  await fallbackContext.close();

  mark("native preview/dialog, Clipboard, feedback and narrow containment");
  await nav(saved,"/archscry/?panel=starter-cards","!!document.querySelector('[data-dossier-panel=\"starter-cards\"]')");await wait(saved.client,"!!document.querySelector('[data-dossier-panel=\"starter-cards\"] [data-card-preview-name]')","card fixture");
  const card='[data-dossier-panel="starter-cards"] [data-card-preview-name]';await hover(saved,card);await wait(saved.client,"document.querySelector('.card-preview-overlay')?.classList.contains('is-visible')","hover preview");
  await saved.page.mouse.move(1,1);await tabTo(saved,card);await wait(saved.client,"document.querySelector('.card-preview-overlay')?.classList.contains('is-visible')","focus preview");await saved.page.keyboard.press("Enter");
  await wait(saved.client,"document.querySelector('.archscry-card-dialog')?.open","card dialog");assert.ok(await read(saved.client,"/Loading verified card data/.test(document.querySelector('[data-card-dialog-content]').textContent)||!!document.querySelector('[data-card-dialog-ready]')"));
  await wait(saved.client,"!!document.querySelector('[data-card-dialog-ready],.archscry-card-dialog-status')","detail terminal");await saved.page.keyboard.press("Escape");await wait(saved.client,"!document.querySelector('.archscry-card-dialog')?.open","dialog Escape");assert.ok(await read(saved.client,"document.activeElement?.matches('[data-card-preview-name]')"));
  await saved.page.keyboard.press("Enter");await wait(saved.client,"document.querySelector('.archscry-card-dialog')?.open","card dialog reopens");await click(saved,".archscry-card-dialog-close");await wait(saved.client,"!document.querySelector('.archscry-card-dialog')?.open","Close button");assert.ok(await read(saved.client,"document.activeElement?.matches('[data-card-preview-name]')"));
  await tabTo(saved,"#vm-clipboard-trigger");await saved.page.keyboard.press("Enter");await wait(saved.client,"document.querySelector('#vm-clipboard-panel')?.open","Clipboard");assert.match(await read(saved.client,"document.querySelector('.vm-clipboard-empty')?.textContent||''"),/Add a card/);await saved.page.keyboard.press("Escape");assert.equal(await read(saved.client,"document.activeElement?.id"),"vm-clipboard-trigger");
  await tabTo(saved,"#vm-feedback-trigger");await saved.page.keyboard.press("Enter");await wait(saved.client,"!document.querySelector('#vm-feedback-overlay').hidden","feedback");await click(saved,".vm-feedback-primary");await wait(saved.client,"document.querySelector('.vm-feedback-status').dataset.tone==='error'","empty feedback");
  await click(saved,".vm-feedback-field textarea:not(.vm-feedback-manual-copy)");await saved.page.keyboard.type("VM687 local witness");await click(saved,".vm-feedback-primary");await wait(saved.client,"document.querySelector('.vm-feedback-status').dataset.tone==='success'","feedback success");
  feedbackError=true;await sleep(5100);await click(saved,".vm-feedback-primary");await wait(saved.client,"document.querySelector('.vm-feedback-status').dataset.tone==='error'","feedback error");assert.deepEqual(evidence.feedback.map(x=>x.outcome),["success","error"]);await saved.page.keyboard.press("Escape");
  await flow.page.setViewport({width:390,height:844,deviceScaleFactor:1});await seed(flow,{vm_theme_mode_v1:"light",vm_archscry_saved_reading_v1:JSON.stringify(jund)});await nav(flow,"/archscry/?panel=starter-cards","!!document.querySelector('[data-dossier-panel=\"starter-cards\"]')");await click(flow,"[data-vm-menu-trigger]");await contain(flow,[".app",".vm-menu-panel",".dossier-console",'[data-dossier-panel="starter-cards"]']);await flow.page.keyboard.press("Escape");

  mark("Reading Guide static and exact four-step late walkthrough");
  const guideContext=await newContext();const guide=await fresh(guideContext);await seed(guide,{vm_theme_mode_v1:"light",vm687_unrelated:"unchanged"});await nav(guide,"/guide/reading/","!!document.querySelector('#reading-guide-main')");await theme(guide,"light");
  await requested(guide,"Reading Guide",["/assets/css/theme-pages.css?v=vm687","/assets/js/shared/vm-theme.js?v=vm687","/assets/js/guide/reading-walkthrough.js"]);
  assert.equal(await read(guide.client,"document.querySelectorAll('.driver-popover.vm-guide-walkthrough-popover').length"),0);assert.equal(await read(guide.client,"document.querySelectorAll('.reading-dossier-roles > div').length"),7);
  await paint(guide,"Reading Guide",[".reading-guide-hero",".reading-guide-section",".reading-intent-grid article",".reading-next-actions",".maze-footer.guide-footer"]);
  const links=await read(guide.client,"[...document.querySelectorAll('a[href]')].map(a=>new URL(a.href).pathname)");assert.ok(links.some(x=>x.includes('/archscry/'))&&links.some(x=>x.includes('/maze/'))&&links.some(x=>x.includes('/guide/')));
  await nav(guide,"/guide/reading/?guided=dossier-reading","!!document.querySelector('.driver-popover.vm-guide-walkthrough-popover')");
  const escapeHistory=await read(guide.client,"({length:history.length,path:location.pathname})");
  assert.deepEqual(await read(guide.client,"['#reading-placement-meaning','#reading-where-to-start','#dossier-map','#reading-next'].map(s=>!!document.querySelector(s))"),[true,true,true,true]);assert.match(await read(guide.client,"document.activeElement?.getAttribute('aria-label')||''"),/Next/);
  await click(guide,".driver-popover-next-btn");await wait(guide.client,"/Choose where to start/.test(document.querySelector('.driver-popover-title').textContent)","Next");await click(guide,".driver-popover-prev-btn");await wait(guide.client,"/Understand what/.test(document.querySelector('.driver-popover-title').textContent)","Previous");
  await guide.page.keyboard.press("Escape");await wait(guide.client,"!document.querySelector('.driver-popover.vm-guide-walkthrough-popover')&&!location.search.includes('guided')","Escape cleanup");assert.equal(await read(guide.client,"document.activeElement?.id"),"placement-meaning-title");assert.deepEqual(await read(guide.client,"({length:history.length,path:location.pathname})"),escapeHistory);
  await nav(guide,"/guide/reading/?guided=dossier-reading","!!document.querySelector('.driver-popover.vm-guide-walkthrough-popover')");const doneHistory=await read(guide.client,"({length:history.length,path:location.pathname})");for(let i=0;i<4;i++)await click(guide,".driver-popover-next-btn");await wait(guide.client,"!document.querySelector('.driver-popover.vm-guide-walkthrough-popover')&&!location.search.includes('guided')","Done cleanup");assert.equal(await read(guide.client,"document.activeElement?.id"),"reading-guide-title");assert.deepEqual(await read(guide.client,"({length:history.length,path:location.pathname})"),doneHistory);
  await guide.page.setViewport({width:390,height:844,deviceScaleFactor:1});await seed(guide,{vm_theme_mode_v1:"light"});await nav(guide,"/guide/reading/?guided=dossier-reading","!!document.querySelector('.driver-popover.vm-guide-walkthrough-popover')");await contain(guide,["#reading-guide-main",".driver-popover.vm-guide-walkthrough-popover"]);

  mark("unconverted Maze isolation and storage continuity");
  await nav(saved,"/maze/");assert.equal(await read(saved.client,"document.documentElement.dataset.vmTheme||null"),null);assert.equal(await read(saved.client,"!!document.querySelector('[data-vm-theme-toggle]')"),false);assert.equal(await read(saved.client,"localStorage.getItem('vm_theme_mode_v1')"),"light");assert.equal(await read(saved.client,"localStorage.getItem('vm687_unrelated')"),"unchanged");
  await savedContext.close();await flowContext.close();await guideContext.close();
  assert.deepEqual(evidence.errors,[]);evidence.attempt.result="PASS"
}catch(error){evidence.attempt.result="FAIL";evidence.attempt.failure=error.stack||String(error);process.exitCode=1;console.error(error)}
finally{
  evidence.observedAt=new Date().toISOString();await writeFile(OUT,JSON.stringify(evidence,null,2));console.log("Evidence: "+OUT);
  for(const context of contexts){try{await context.close()}catch{}}if(browser)await browser.close();await new Promise(r=>server.close(r));await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100})
}
