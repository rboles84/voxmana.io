import { createHash } from "node:crypto";
import { readFile, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root=process.cwd(), host="127.0.0.1";
const artifactArg=process.argv.find(arg=>arg.startsWith("--artifact="));
const output=artifactArg?path.resolve(root,artifactArg.slice("--artifact=".length))
  :path.join(root,"tests/fixtures/vm678-session-launch-feasibility.json");
const navFile=path.join(root,"tests/fixtures/vm678-navigation-baseline.json");
const parityFile=path.join(root,"tests/fixtures/vm678-url-parity-baseline.json");
const semanticFile=path.join(root,"tests/fixtures/maze-semantic-state-contract-fixtures.js");
const PENDING="vm678_pending_launch",SHARED="vm678_shared_reading",FINDS="vm678_generic_find_rows";
const result={schemaVersion:2,task:"VM-678",experiment:"generic session-scoped native-navigation feasibility",
  genericOnly:true,actualProductFindsProof:false,
  mechanism:{source:"ordinary unmodified same-tab normal-reading anchor writes one sessionStorage record",
    destination:"capture, validate, immediately delete; use exact record only when validation and deletion succeed",
    recordFields:["version","readingId","fit","pathType","optional threadId","sourceContext.expectedNormalArchscry","sourceContext.sourceURL"],
    excluded:["preventDefault","pushState","reload orchestration","mechanism timers","unload hooks","TTL","random token","target change","second handoff persistence"]},
  environment:{},frozenEvidence:{},cases:{},failures:[],unavailable:[]};
const clone=v=>JSON.parse(JSON.stringify(v));
function fail(name,message,details){result.failures.push({name,message,...(details===undefined?{}:{details:clone(details)})})}
async function probe(name,fn){try{result.cases[name]={execution:"COMPLETED",...clone(await fn())}}
  catch(error){result.cases[name]={execution:"ERROR",error:String(error?.stack||error)};fail(name,"case execution failed",result.cases[name].error)}
  return result.cases[name]}
async function fileEvidence(file){const bytes=await readFile(file);return{path:path.relative(root,file).replaceAll("\\","/"),
  bytes:bytes.length,sha256:createHash("sha256").update(bytes).digest("hex")}}
async function findEdge(){for(const candidate of["C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe","C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"])
  try{await stat(candidate);return candidate}catch{}throw Error("Installed Edge unavailable")}
const tuple=r=>[r.fit,r.pathType,r.threadId||""].join("|");

const nav=JSON.parse(await readFile(navFile,"utf8"));
const normal=nav.coverage.catalogNavigationMatrix.records.filter(r=>r.contextMode==="normal-reading");
const rowA=normal.find(r=>r.pathType==="commanders-that-fit"&&r.threadId);
const rowD=normal.find(r=>r.identityKey===rowA.identityKey&&r.pathType!==rowA.pathType&&r.threadId)
  ||normal.find(r=>r.pathType!==rowA.pathType&&r.threadId);
const rowP=normal.find(r=>r.identityKey===rowA.identityKey&&r.pathType==="commanders-that-fit"&&!r.threadId);
if(!rowA||!rowD||!rowP)throw Error("Frozen baseline lacks required normal intents");
const asIntent=r=>({fit:r.identityKey,pathType:r.pathType,threadId:r.threadId,query:r.operatorQuery,display:r.display});
const intentA=asIntent(rowA),intentD=asIntent(rowD);
const intentP={fit:rowP.identityKey,pathType:rowP.pathType,query:rowP.operatorQuery,display:rowP.display};
const A={...intentA,readingId:"vm678-generic-a"},B={...intentA,readingId:"vm678-generic-b"},
 D={...intentD,readingId:"vm678-generic-a-different-path"},P={...intentP,readingId:"vm678-generic-parent-no-thread"};
const catalog=Object.fromEntries([intentA,intentD,intentP].map(r=>[tuple(r),r]));

function sourceHtml(){return `<!doctype html><html><body data-document-token="generic-archscry-document">
<p id="rendered"></p><a id="launch" href="#">Maze</a><a id="different" href="#">Different path</a><a id="parent" href="#">Parent path</a>
<script>(()=>{const KEY=${JSON.stringify(PENDING)},READINGS=${JSON.stringify({A,B,D,P})};
window.__writerErrors=[];window.__cleanupErrors=[];window.__contextMenus=0;
document.addEventListener("contextmenu",()=>window.__contextMenus++);
const hrefFor=r=>{const p=new URLSearchParams({from:"archscry",fit:r.fit,pathType:r.pathType});if(r.threadId)p.set("threadId",r.threadId);return"/maze/?"+p};
function bind(a){a.addEventListener("click",event=>{if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  if(a.target&&a.target!=="_self")return;const r=JSON.parse(a.dataset.reading);
  const pending={version:1,readingId:r.readingId,fit:r.fit,pathType:r.pathType,...(r.threadId?{threadId:r.threadId}:{}),
    sourceContext:{expectedNormalArchscry:true,sourceURL:location.href}};
  try{sessionStorage.setItem(KEY,JSON.stringify(pending))}catch(error){window.__writerErrors.push(String(error));throw error}})}
bind(document.querySelector("#launch"));bind(document.querySelector("#different"));bind(document.querySelector("#parent"));
window.__render=name=>{const r=READINGS[name],a=document.querySelector("#launch");document.querySelector("#rendered").textContent=r.readingId;
  a.dataset.reading=JSON.stringify(r);a.href=hrefFor(r);const d=document.querySelector("#different");
  d.dataset.reading=JSON.stringify(READINGS.D);d.href=hrefFor(READINGS.D);const p=document.querySelector("#parent");
  p.dataset.reading=JSON.stringify(READINGS.P);p.href=hrefFor(READINGS.P)};
window.__cancelNext=()=>document.querySelector("#launch").addEventListener("click",e=>e.preventDefault(),{once:true});
window.__breakGetter=()=>Object.defineProperty(window,"sessionStorage",{configurable:true,get(){throw new DOMException("source getter unavailable","SecurityError")}});
window.__breakSetItem=()=>{const s=sessionStorage;s.setItem=()=>{throw new DOMException("source setItem unavailable","QuotaExceededError")}};
window.__renderBWithCleanupAttempt=()=>{try{sessionStorage.removeItem(KEY)}catch(error){window.__cleanupErrors.push(String(error))}window.__render("B")};
window.__snapshot=()=>{let pending=null,storageError=null;try{pending=sessionStorage.getItem(KEY)}catch(error){storageError=String(error)}
 return{url:location.href,documentToken:document.body.dataset.documentToken,documentTimeOrigin:performance.timeOrigin,
 renderedReadingId:document.querySelector("#rendered").textContent,
 historyLength:history.length,historyState:history.state,pending,storageError,writerErrors:[...window.__writerErrors],
 cleanupErrors:[...window.__cleanupErrors],contextMenuCount:window.__contextMenus}};
window.__snapshotWithoutStorage=()=>({url:location.href,documentToken:document.body.dataset.documentToken,documentTimeOrigin:performance.timeOrigin,
 renderedReadingId:document.querySelector("#rendered").textContent,historyLength:history.length,historyState:history.state,
 writerErrors:[...window.__writerErrors],cleanupErrors:[...window.__cleanupErrors],contextMenuCount:window.__contextMenus});
window.__render("A");document.body.id="source-ready"})()</script></body></html>`}

function mazeHtml(url){const fault=url.searchParams.get("storageFault")||"";return `<!doctype html><html><body data-document-token="generic-maze-document">
<p id="association"></p><button id="persist">Persist generic row</button><script>(()=>{const KEY=${JSON.stringify(PENDING)},
SHARED=${JSON.stringify(SHARED)},FINDS=${JSON.stringify(FINDS)},CATALOG=${JSON.stringify(catalog)},fault=${JSON.stringify(fault)},errors=[];
const original=window.sessionStorage;
if(fault==="getter")Object.defineProperty(window,"sessionStorage",{configurable:true,get(){throw new DOMException("destination getter unavailable","SecurityError")}});
else if(fault==="getItem")original.getItem=()=>{throw new DOMException("destination getItem unavailable","SecurityError")};
else if(fault==="removeItem")original.removeItem=()=>{throw new DOMException("destination removeItem unavailable","SecurityError")};
const u=new URL(location.href);let storage=null,capturedRaw=null,captureSucceeded=false,deleteSucceeded=false;
try{storage=sessionStorage;capturedRaw=storage.getItem(KEY);captureSucceeded=true}catch(error){errors.push({phase:"capture",error:String(error)})}
if(storage)try{storage.removeItem(KEY);deleteSucceeded=true}catch(error){errors.push({phase:"delete",error:String(error)})}
const one=name=>{const v=u.searchParams.getAll(name);return v.length===1&&v[0]?v[0]:null};
const catalogIntent=r=>r?CATALOG[[r.fit,r.pathType,r.threadId||""].join("|")]||null:null;
function valid(r,incoming){if(!r||r.version!==1||typeof r.readingId!=="string"||!r.readingId)return false;
 const fit=one("fit"),pathType=one("pathType"),threadValues=u.searchParams.getAll("threadId");
 const threadId=threadValues.length===0?"":threadValues.length===1&&threadValues[0]?threadValues[0]:null;
 if(!fit||!pathType||threadId===null||one("from")!=="archscry")return false;
 if(r.fit!==fit||r.pathType!==pathType||(r.threadId||"")!==threadId||!catalogIntent(r))return false;
 const c=r.sourceContext;if(!c||c.expectedNormalArchscry!==true||typeof c.sourceURL!=="string")return false;
 let source;try{source=new URL(c.sourceURL)}catch{return false}
 if(source.origin!==location.origin||source.pathname!=="/archscry/")return false;
 if(incoming&&document.referrer!==source.href)return false;return true}
let parsed=null;if(capturedRaw!==null)try{parsed=JSON.parse(capturedRaw)}catch(error){errors.push({phase:"parse",error:String(error)})}
const pendingValid=valid(parsed,true),prior=history.state&&history.state.vm678Entry;
const retainedValid=capturedRaw===null&&captureSucceeded&&valid(prior,false);
let active=null,associationSource="public-blank";
if(pendingValid&&deleteSucceeded){active=parsed;associationSource="validated-pending";history.replaceState({vm678Entry:active},"",location.href)}
else if(retainedValid){active=prior;associationSource="retained-current-entry"}
const row=catalogIntent(active)||catalogIntent({fit:one("fit"),pathType:one("pathType"),threadId:one("threadId")});
document.querySelector("#association").textContent=active?active.readingId:"";
document.querySelector("#persist").addEventListener("click",()=>{const rows=JSON.parse(localStorage.getItem(FINDS)||"[]");
 rows.push({query:row?row.query:"",display:row?row.display:"",sourceContext:{readingId:active?active.readingId:""}});
 localStorage.setItem(FINDS,JSON.stringify(rows))});
window.__snapshot=()=>{let pending=null,pendingReadError=null;try{pending=sessionStorage.getItem(KEY)}catch(error){pendingReadError=String(error)}
 return{url:location.href,documentToken:document.body.dataset.documentToken,documentTimeOrigin:performance.timeOrigin,
 referrer:document.referrer,historyLength:history.length,
 historyState:history.state,capturedRaw,captureSucceeded,deleteSucceeded,pendingValid,pending,pendingReadError,associationSource,
 readingId:active?active.readingId:"",query:row?row.query:"",display:row?row.display:"",errors,opener:Boolean(window.opener),
 sharedReadingId:localStorage.getItem(SHARED)||"",genericRows:JSON.parse(localStorage.getItem(FINDS)||"[]")}};
document.body.id="maze-ready"})()</script></body></html>`}

function serve(){const server=http.createServer((request,response)=>{const url=new URL(request.url,"http://fixture.invalid");
 response.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"});
 response.end(url.pathname==="/maze/"?mazeHtml(url):sourceHtml())});
 return new Promise((resolve,reject)=>{server.once("error",reject);server.listen(0,host,()=>resolve(server))})}
async function pointer(page,selector="#launch",{button="left",modifiers=[]}={}){const element=await page.$(selector),box=await element?.boundingBox();
 if(!box)throw Error("Missing anchor "+selector);for(const m of modifiers)await page.keyboard.down(m);
 try{await page.mouse.click(box.x+box.width/2,box.y+box.height/2,{button})}finally{for(const m of[...modifiers].reverse())await page.keyboard.up(m)}}
const sourceSnapshot=page=>page.evaluate(()=>window.__snapshot());
async function mazeSnapshot(page){await page.waitForSelector("#maze-ready");return page.evaluate(()=>window.__snapshot())}
async function freshSource(browser,base,reading="A"){const page=await browser.newPage();await page.goto(base+"/archscry/",{waitUntil:"load"});
 await page.waitForSelector("#source-ready");if(reading!=="A")await page.evaluate(name=>window.__render(name),reading);return page}
async function clickNavigate(page,selector="#launch"){const nav=page.waitForNavigation({waitUntil:"load"});await pointer(page,selector);await nav;return mazeSnapshot(page)}
async function enterNavigate(page){await page.focus("#launch");const nav=page.waitForNavigation({waitUntil:"load"});await page.keyboard.press("Enter");await nav;return mazeSnapshot(page)}
async function targetGesture(browser,page,selector,options){const before=new Set(browser.targets());
 const waiting=browser.waitForTarget(t=>t.type()==="page"&&!before.has(t),{timeout:7000});await pointer(page,selector,options);
 const target=await waiting,child=await target.page();if(!child)throw Error("Native target had no page");return{page:child,snapshot:await mazeSnapshot(child)}}
function unchanged(a,b,pendingMayChange=false){return a.url===b.url&&a.documentToken===b.documentToken&&a.historyLength===b.historyLength
 &&a.documentTimeOrigin===b.documentTimeOrigin&&JSON.stringify(a.historyState)===JSON.stringify(b.historyState)
 &&(pendingMayChange||a.pending===b.pending)}

let server,launcher,browser;
try{
 const semantic=await import("file:///"+semanticFile.replaceAll("\\","/"));
 result.frozenEvidence.before={navigation:await fileEvidence(navFile),urlParity:await fileEvidence(parityFile),
  semanticFixtures:{...(await fileEvidence(semanticFile)),count:semantic.fixtures.length},
  navigationCounts:clone(nav.coverage.catalogNavigationMatrix.counts)};
 server=await serve();const base="http://"+host+":"+server.address().port,executable=await findEdge();
 launcher=await ChromeLauncher.launch({chromePath:executable,chromeFlags:["--headless=new","--no-sandbox"],logLevel:"silent"});
 browser=await puppeteer.connect({browserURL:"http://"+host+":"+launcher.port});
 result.environment={browser:await browser.version(),executable,platform:process.platform,loopbackOrigin:base};

 await probe("decisive-stale-a-source-storage-unavailable-same-url-same-tuple-b",async()=>{
  const page=await freshSource(browser,base);await page.evaluate(()=>window.__cancelNext());await pointer(page);
  const canceledA=await sourceSnapshot(page),pageErrors=[];page.on("pageerror",e=>pageErrors.push(String(e)));
  await page.evaluate(()=>{window.__breakGetter();window.__renderBWithCleanupAttempt()});
  const sourceB=await page.evaluate(()=>window.__snapshotWithoutStorage()),nav=page.waitForNavigation({waitUntil:"load"});
  await pointer(page);await nav;const beforeFind=await mazeSnapshot(page);await page.click("#persist");const afterFind=await mazeSnapshot(page);
  const row=afterFind.genericRows.at(-1),wrongA=afterFind.readingId===A.readingId&&row?.sourceContext?.readingId===A.readingId;
  const expectedBlank=afterFind.readingId===""&&!afterFind.historyState?.vm678Entry&&row?.sourceContext?.readingId==="";
  if(!expectedBlank)fail("decisive-stale-a-source-storage-unavailable-same-url-same-tuple-b",
    wrongA?"source B native launch consumed stale A and persisted generic wrong-A row":"storage-unavailable launch associated",{afterFind,row});
  await page.close();return{expected:"native navigation usable and public/unassociated",canceledA,
    sourceB:{...sourceB,sameURL:sourceB.url===canceledA.url,sameTuple:true,exactReadingId:B.readingId},
    faultTiming:"source getter unavailable before B render and cleanup attempt",pageErrors,destinationBeforeFind:beforeFind,
    destinationAfterFind:afterFind,genericPersistedRow:row,nativeNavigationUsable:afterFind.documentToken==="generic-maze-document",
    expectedBlank,observedWrongA:wrongA,conclusion:wrongA?
      "FAIL: same URL, tuple, normal context, and full referrer cannot distinguish stale A from actual B activation":expectedBlank?"PASS":"FAIL"}});

 await probe("ordinary-pointer-a-find-shared-b-reload-back-forward-successor",async()=>{
  const page=await freshSource(browser,base),source=await sourceSnapshot(page),initial=await clickNavigate(page);
  await page.evaluate((k,v)=>localStorage.setItem(k,v),SHARED,B.readingId);await page.click("#persist");const afterFind=await mazeSnapshot(page);
  await page.reload({waitUntil:"load"});const reload=await mazeSnapshot(page);
  await page.goBack({waitUntil:"load"});await page.waitForSelector("#source-ready");const back=await sourceSnapshot(page);
  await page.goForward({waitUntil:"load"});const forward=await mazeSnapshot(page);
  const next=new URL(base+"/maze/");for(const[k,v]of Object.entries({from:"archscry",fit:D.fit,pathType:D.pathType,threadId:D.threadId}))next.searchParams.set(k,v);
  await page.goto(next.href,{waitUntil:"load"});const successor=await mazeSnapshot(page),row=afterFind.genericRows.at(-1);
  const checks={consumedExactA:initial.readingId===A.readingId&&initial.pending===null,
   frozenQueryDisplay:initial.query===A.query&&initial.display===A.display,genericRowA:row?.sourceContext?.readingId===A.readingId,
   sharedBNoOverride:afterFind.sharedReadingId===B.readingId&&afterFind.readingId===A.readingId,
   reloadRetainsA:reload.readingId===A.readingId&&reload.associationSource==="retained-current-entry",
   backArchscryDOM:back.documentToken==="generic-archscry-document"&&back.url===source.url,
   forwardMazeA:forward.documentToken==="generic-maze-document"&&forward.readingId===A.readingId,
   successorBlank:successor.readingId===""&&!successor.historyState?.vm678Entry};
  for(const[k,v]of Object.entries(checks))if(!v)fail("ordinary-pointer-a-find-shared-b-reload-back-forward-successor",k);
  await page.close();return{source,initial,afterFind,genericPersistedRow:row,reload,back,forward,successor,checks,
   note:"generic row is experimental, not actual product Findings proof"}});

 await probe("ordinary-enter-a",async()=>{const page=await freshSource(browser,base),destination=await enterNavigate(page);
  const passed=destination.readingId===A.readingId&&destination.pending===null;if(!passed)fail("ordinary-enter-a","Enter did not consume A",destination);
  await page.close();return{destination,passed}});
 await probe("cancel-source-reload-retry-a",async()=>{const page=await freshSource(browser,base),before=await sourceSnapshot(page);
  await page.evaluate(()=>window.__cancelNext());await pointer(page);const canceled=await sourceSnapshot(page);
  await page.reload({waitUntil:"load"});const sourceReload=await sourceSnapshot(page),destination=await clickNavigate(page);
  const checks={canceledOnSource:unchanged(before,canceled,true),pendingA:JSON.parse(canceled.pending||"null")?.readingId===A.readingId,
   sourceReloadRetainsA:JSON.parse(sourceReload.pending||"null")?.readingId===A.readingId,
   sourceReloadCreatedNewDocument:sourceReload.documentTimeOrigin!==canceled.documentTimeOrigin,
   retryA:destination.readingId===A.readingId&&destination.pending===null};
  for(const[k,v]of Object.entries(checks))if(!v)fail("cancel-source-reload-retry-a",k);
  await page.close();return{before,canceled,sourceReload,destination,checks}});
 await probe("cancel-immediate-retry-a",async()=>{const page=await freshSource(browser,base),before=await sourceSnapshot(page);
  await page.evaluate(()=>window.__cancelNext());await pointer(page);const canceled=await sourceSnapshot(page);
  const destination=await clickNavigate(page),checks={canceledOnSameDocument:unchanged(before,canceled,true),
   pendingA:JSON.parse(canceled.pending||"null")?.readingId===A.readingId,
   retryA:destination.readingId===A.readingId&&destination.pending===null};
  for(const[k,v]of Object.entries(checks))if(!v)fail("cancel-immediate-retry-a",k);
  await page.close();return{before,canceled,destination,checks}});
 await probe("canceled-source-back-forward",async()=>{const page=await browser.newPage();
  await page.goto(base+"/start/",{waitUntil:"load"});const start=await sourceSnapshot(page);
  await page.goto(base+"/archscry/",{waitUntil:"load"});await page.evaluate(()=>window.__cancelNext());await pointer(page);
  const canceled=await sourceSnapshot(page);await page.goBack({waitUntil:"load"});const back=await sourceSnapshot(page);
  await page.goForward({waitUntil:"load"});const forward=await sourceSnapshot(page);
  const observation={start,canceled,back,forward,pendingAfterForward:JSON.parse(forward.pending||"null")?.readingId||"",
   canceledDocumentRestored:forward.documentTimeOrigin===canceled.documentTimeOrigin};
  await page.close();return observation});
 await probe("different-eligible-path-replaces-canceled-a",async()=>{const page=await freshSource(browser,base);
  await page.evaluate(()=>window.__cancelNext());await pointer(page);const canceledA=await sourceSnapshot(page),destination=await clickNavigate(page,"#different");
  const passed=destination.readingId===D.readingId&&destination.query===D.query&&destination.display===D.display&&destination.pending===null;
  if(!passed)fail("different-eligible-path-replaces-canceled-a","frozen projection changed",destination);
  await page.close();return{canceledA,destination,passed}});
 await probe("same-tuple-b-ordinary-replaces-canceled-a",async()=>{const page=await freshSource(browser,base);
  await page.evaluate(()=>window.__cancelNext());await pointer(page);const canceledA=await sourceSnapshot(page);
  await page.evaluate(()=>window.__render("B"));const source=await sourceSnapshot(page),destination=await clickNavigate(page);
  await page.click("#persist");const afterFind=await mazeSnapshot(page),row=afterFind.genericRows.at(-1);
  const passed=destination.readingId===B.readingId&&row?.sourceContext?.readingId===B.readingId;
  if(!passed)fail("same-tuple-b-ordinary-replaces-canceled-a","ordinary B ownership failed",{destination,row});
  await page.close();return{canceledA,source,destination,genericPersistedRow:row,passed}});
 await probe("optional-thread-parent",async()=>{const page=await freshSource(browser,base),destination=await clickNavigate(page,"#parent");
  const passed=destination.readingId===P.readingId&&destination.query===P.query&&destination.display===P.display
   &&!new URL(destination.url).searchParams.has("threadId");
  if(!passed)fail("optional-thread-parent","no-thread canonical parent failed",destination);
  await page.close();return{destination,passed}});
 await probe("direct-paste-a-url-after-canceled-a-same-tab",async()=>{const page=await freshSource(browser,base);
  await page.evaluate(()=>window.__cancelNext());await pointer(page);const canceledA=await sourceSnapshot(page),url=new URL(base+"/maze/");
  for(const[k,v]of Object.entries({from:"archscry",fit:A.fit,pathType:A.pathType,threadId:A.threadId}))url.searchParams.set(k,v);
  await page.goto(url.href,{waitUntil:"load"});const destination=await mazeSnapshot(page),passed=destination.readingId===""&&!destination.historyState?.vm678Entry;
  if(!passed)fail("direct-paste-a-url-after-canceled-a-same-tab","same-tab direct paste consumed stale A",destination);
  await page.close();return{canceledA,destination,expected:"public blank",passed}});

 await probe("native-ctrl-middle-shift-after-canceled-a",async()=>{const page=await freshSource(browser,base);
  await page.evaluate(()=>window.__cancelNext());await pointer(page);const canceled=await sourceSnapshot(page);
  const ctrl=await targetGesture(browser,page,"#launch",{modifiers:["Control"]}),afterCtrl=await sourceSnapshot(page);
  const middle=await targetGesture(browser,page,"#different",{button:"middle"}),afterMiddle=await sourceSnapshot(page);
  const shift=await targetGesture(browser,page,"#launch",{modifiers:["Shift"]}),afterShift=await sourceSnapshot(page);
  const destinations={ctrl:ctrl.snapshot,middle:middle.snapshot,shiftWindowGesture:shift.snapshot};
  const sourceChecks={ctrl:unchanged(canceled,afterCtrl),middle:unchanged(canceled,afterMiddle),shift:unchanged(canceled,afterShift)};
  const destinationChecks=Object.fromEntries(Object.entries(destinations).map(([k,v])=>[k,v.readingId===""&&v.pending===null&&v.opener===false&&v.historyLength===1&&v.referrer===canceled.url]));
  const distinctQueries=ctrl.snapshot.query!==middle.snapshot.query,tabsKeptOpen=!ctrl.page.isClosed()&&!middle.page.isClosed();
  for(const[k,v]of Object.entries({...sourceChecks,...destinationChecks,distinctQueries,tabsKeptOpen}))if(!v)fail("native-ctrl-middle-shift-after-canceled-a",k);
  await Promise.all([ctrl.page.close(),middle.page.close(),shift.page.close(),page.close()]);
  return{canceled,ctrl:{destination:ctrl.snapshot,source:afterCtrl},middle:{destination:middle.snapshot,source:afterMiddle},
   shiftWindowGesture:{destination:shift.snapshot,source:afterShift,classification:"native Shift gesture; not context-menu New Window"},
   sourceChecks,destinationChecks,distinctQueries,comparisonTabsKeptOpenDuringMeasurement:tabsKeptOpen}});

 await probe("meta-windows-native-semantics-after-canceled-a",async()=>{const page=await freshSource(browser,base);
  await page.evaluate(()=>window.__cancelNext());await pointer(page);const before=await sourceSnapshot(page),targets=new Set(browser.targets());
  const targetP=browser.waitForTarget(t=>t.type()==="page"&&!targets.has(t),{timeout:2500}).then(target=>({kind:"new-target",target})).catch(()=>({kind:"no-new-target"}));
  const navP=page.waitForNavigation({waitUntil:"load",timeout:2500}).then(()=>({kind:"same-tab-navigation"})).catch(()=>({kind:"no-same-tab-navigation"}));
  await pointer(page,"#launch",{modifiers:["Meta"]});const[targetResult,navResult]=await Promise.all([targetP,navP]);let destination=null;
  if(targetResult.target){const child=await targetResult.target.page();if(child){destination=await mazeSnapshot(child);await child.close()}}
  else if(navResult.kind==="same-tab-navigation")destination=await mazeSnapshot(page);
  const after=page.url().includes("/archscry/")?await sourceSnapshot(page):null;
  if(destination?.readingId)fail("meta-windows-native-semantics-after-canceled-a","Meta destination consumed stale pending A",destination);
  if(after&&!unchanged(before,after))fail("meta-windows-native-semantics-after-canceled-a","source changed without navigation",{before,after});
  const classification=targetResult.kind==="new-target"?"Meta opened new target":navResult.kind==="same-tab-navigation"?"Meta navigated same tab":"Meta produced no navigation";
  await page.close();return{platform:process.platform,canceledA:before,after,targetOutcome:targetResult.kind,navigationOutcome:navResult.kind,
   destination,classification,macOSCmdNewTabProof:"UNAVAILABLE: this is Windows Meta behavior only"}});

 await probe("context-menu-new-tab-and-new-window-after-canceled-a",async()=>{const page=await freshSource(browser,base);
  await page.evaluate(()=>window.__cancelNext());await pointer(page);const before=await sourceSnapshot(page),targets=new Set(browser.targets());
  const attempt=browser.waitForTarget(t=>t.type()==="page"&&!targets.has(t),{timeout:1500}).then(()=>"unexpected-target").catch(()=>"no-target-from-right-click");
  await pointer(page,"#launch",{button:"right"});const targetObservation=await attempt,after=await sourceSnapshot(page);
  const reason="headless Edge exposed actual right-click but Puppeteer cannot select browser-chrome context-menu commands";
  result.unavailable.push({capability:"context-menu New Tab",status:"UNAVAILABLE",reason},{capability:"context-menu New Window",status:"UNAVAILABLE",reason});
  const sourceUnchangedAfterRightClick=unchanged(before,after);
  if(!sourceUnchangedAfterRightClick)fail("context-menu-new-tab-and-new-window-after-canceled-a","right-click changed source state",{before,after});
  await page.close();return{boundedAttempt:"actual right-click on unmodified anchor after canceled pending A",
   canceledA:before,afterRightClick:after,rightClickReachedPage:after.contextMenuCount===before.contextMenuCount+1,
   targetObservation,sourceUnchanged:sourceUnchangedAfterRightClick,newTab:"UNAVAILABLE",newWindow:"UNAVAILABLE",substitutionsUsed:[],
   note:"No Target.createTarget, newPage, window.open, target change, or Shift substitution"}});

 await probe("invalid-pending-matrix",async()=>{const replacements={malformedJson:"{",
  wrongVersion:{version:2,...A,sourceContext:{expectedNormalArchscry:true,sourceURL:base+"/archscry/"}},
  emptyReadingId:{version:1,...A,readingId:"",sourceContext:{expectedNormalArchscry:true,sourceURL:base+"/archscry/"}},
  wrongSourceURL:{version:1,...A,sourceContext:{expectedNormalArchscry:true,sourceURL:base+"/archscry/?other=1"}},
  abnormalContext:{version:1,...A,sourceContext:{expectedNormalArchscry:false,sourceURL:base+"/archscry/"}}},observations={};
  for(const[name,replacement]of Object.entries(replacements)){const page=await freshSource(browser,base);
   await page.evaluate((key,value)=>document.querySelector("#launch").addEventListener("click",()=>sessionStorage.setItem(key,typeof value==="string"?value:JSON.stringify(value)),{once:true}),PENDING,replacement);
   observations[name]=await clickNavigate(page);await page.close()}
  const duplicate=await freshSource(browser,base);await duplicate.evaluate(()=>document.querySelector("#launch").href+="&fit=RG");
  observations.duplicateSelector=await clickNavigate(duplicate);await duplicate.close();
  const unknown=await freshSource(browser,base);await unknown.evaluate(()=>{const a=document.querySelector("#launch"),r=JSON.parse(a.dataset.reading);
   const old=r.threadId;r.threadId="not-in-catalog";a.dataset.reading=JSON.stringify(r);a.href=a.href.replace(old,r.threadId)});
  observations.catalogInvalid=await clickNavigate(unknown);await unknown.close();
  const allPublicBlank=Object.values(observations).every(v=>v.readingId===""&&!v.historyState?.vm678Entry);
  if(!allPublicBlank)fail("invalid-pending-matrix","one or more invalid cases associated",observations);return{observations,allPublicBlank}});

 await probe("storage-failure-matrix",async()=>{const observations={};
  for(const sourceFault of["getter","setItem"]){const page=await freshSource(browser,base),errors=[];page.on("pageerror",e=>errors.push(String(e)));
   await page.evaluate(fault=>fault==="getter"?window.__breakGetter():window.__breakSetItem(),sourceFault);
   const nav=page.waitForNavigation({waitUntil:"load"});await pointer(page);await nav;
   observations["source-"+sourceFault]={errors,destination:await mazeSnapshot(page)};await page.close()}
  for(const destinationFault of["getter","getItem","removeItem"]){const page=await freshSource(browser,base);
   await page.evaluate(fault=>document.querySelector("#launch").href+="&storageFault="+fault,destinationFault);
   observations["destination-"+destinationFault]={destination:await clickNavigate(page)};await page.close()}
  for(const[name,o]of Object.entries(observations)){o.blank=o.destination.readingId===""&&!o.destination.historyState?.vm678Entry;
   o.nativeNavigationUsable=o.destination.documentToken==="generic-maze-document";
   if(!o.blank||!o.nativeNavigationUsable)fail("storage-failure-matrix",name+" not usable and blank",o)}
  return{observations,allUsableAndBlank:Object.values(observations).every(o=>o.blank&&o.nativeNavigationUsable)}});

 result.frozenEvidence.after={navigation:await fileEvidence(navFile),urlParity:await fileEvidence(parityFile),
  semanticFixtures:{...(await fileEvidence(semanticFile)),count:semantic.fixtures.length}};
 result.frozenEvidence.unchanged={navigation:result.frozenEvidence.before.navigation.sha256===result.frozenEvidence.after.navigation.sha256,
  urlParity:result.frozenEvidence.before.urlParity.sha256===result.frozenEvidence.after.urlParity.sha256,
  semanticFixtures:result.frozenEvidence.before.semanticFixtures.sha256===result.frozenEvidence.after.semanticFixtures.sha256,
  expectedCounts:nav.coverage.catalogNavigationMatrix.counts.normalReading===501&&nav.coverage.catalogNavigationMatrix.counts.identityExplore===501&&semantic.fixtures.length===18};
}catch(error){fail("harness","browser experiment could not complete",String(error?.stack||error))}
finally{if(browser)await browser.close().catch(()=>{});if(launcher){try{await launcher.kill()}catch{}}if(server)await new Promise(resolve=>server.close(resolve))}

const decisive=result.cases["decisive-stale-a-source-storage-unavailable-same-url-same-tuple-b"];
result.viable=result.failures.length===0&&result.unavailable.length===0;
result.status=result.failures.length?"STOP_FAILED":result.unavailable.length?"STOP_INCOMPLETE":"CONDITIONALLY_VIABLE_EDGE_ONLY";
result.decisiveFinding=decisive?.conclusion||"Decisive case did not complete.";
result.recommendation=result.failures.length?"STOP: do not adopt this sessionStorage launch mechanism; association safety is disproved or required evidence failed."
 :result.unavailable.length?"STOP: context-menu New Tab/New Window remain unavailable, so full feasibility cannot be claimed."
 :"Conditional Edge-only feasibility; requires independent RobQA and Owner review.";
await writeFile(output,JSON.stringify(result,null,2)+"\n");
console.log(JSON.stringify({status:result.status,viable:result.viable,failures:result.failures.length,unavailable:result.unavailable.length,
 decisiveFinding:result.decisiveFinding,artifact:path.relative(root,output).replaceAll("\\","/")},null,2));
