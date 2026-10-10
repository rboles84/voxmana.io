// Local-only VM-688 review fixture. Product files remain unchanged on disk.
// Run from the repository root; use the printed isolated origin with native CUA.
import http from "node:http";
import path from "node:path";
import { readFile, stat, writeFile } from "node:fs/promises";

const root = process.cwd();
const corpus = JSON.parse(await readFile(path.join(root, "data/scryfall/raw/oracle-cards.json"), "utf8"));
const names = ["Sol Ring", "Delver of Secrets // Insectile Aberration", "Wastes"];
const cards = names.map(name => {
  const source = corpus.find(card => card.name === name);
  if (!source) throw new Error(`Missing canonical fixture card: ${name}`);
  const card = structuredClone(source);
  // Geometry witness only: same-origin image placeholder, no artwork fidelity claim.
  if (card.image_uris) card.image_uris = { normal: "/__vm688/card.svg" };
  card.card_faces?.forEach(face => {
    if (face.image_uris) face.image_uris = { normal: "/__vm688/card.svg" };
  });
  return card;
});
const ledger = [];
const mime = { ".html":"text/html", ".js":"text/javascript", ".mjs":"text/javascript", ".css":"text/css", ".json":"application/json", ".svg":"image/svg+xml", ".jpg":"image/jpeg", ".png":"image/png", ".webp":"image/webp", ".woff":"font/woff", ".woff2":"font/woff2" };
const bootstrap = `<script>
// Fixture transport and observation only; no product functions or storage are replaced.
window.VM_FEEDBACK_CONFIG={endpoint:'/__vm688/feedback',accessKey:'local-fixture',cooldownMs:0,timeoutMs:2000};
const fixtureFetch=window.fetch.bind(window);
window.fetch=(input,options)=>{
  const raw=typeof input==='string'?input:input.url||String(input);
  const url=new URL(raw,location.href);
  if(url.hostname==='api.scryfall.com')return fixtureFetch('/__vm688/scryfall'+url.pathname+url.search,options);
  if(url.origin!==location.origin)return Promise.reject(new Error('VM688 blocked external transport'));
  return fixtureFetch(input,options);
};
document.addEventListener('DOMContentLoaded',()=>{
  document.documentElement.dataset.vm688DomTheme=document.documentElement.dataset.vmTheme||'none';
},{once:true});
new PerformanceObserver(list=>{
  for(const entry of list.getEntries()){
    if(entry.name==='first-contentful-paint'){
      document.documentElement.dataset.vm688FcpTheme=document.documentElement.dataset.vmTheme||'none';
      document.documentElement.dataset.vm688Fcp=String(entry.startTime);
    }
  }
}).observe({type:'paint',buffered:true});
</script>`;

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", "http://127.0.0.1");
  const entry = { at:new Date().toISOString(), method:request.method, path:url.pathname, query:url.search };
  ledger.push(entry);
  response.setHeader("Cache-Control", "no-store");
  // Only this isolated test origin can receive fetch/form/beacon data.
  response.setHeader("Content-Security-Policy", "connect-src 'self'; img-src 'self' data:; form-action 'self'");
  const json = (value, status=200) => {
    entry.status=status;
    response.writeHead(status, {"Content-Type":"application/json"}).end(JSON.stringify(value));
  };
  try {
    if (url.pathname === "/__vm688/ledger") return json(ledger);
    if (url.pathname === "/__vm688/feedback") {
      let body=""; for await (const chunk of request) body+=chunk;
      const failed=body.includes("VM688 controlled error");
      entry.fixture=failed?"feedback-error":"feedback-success";
      return json(failed?{success:false,message:"Controlled local error"}:{success:true},failed?503:200);
    }
    if (url.pathname.startsWith("/__vm688/scryfall/")) {
      const query=url.searchParams.get("q")||url.searchParams.get("fuzzy")||"";
      entry.fixture="canonical-card-list";
      // Native UI selects these queries; no hidden mode/result manipulation.
      await new Promise(resolve=>setTimeout(resolve,500));
      if (query.includes("mv=99")) {
        entry.fixture="zero";
        return json({object:"error",code:"not_found",status:404,details:"Your query did not match any cards."},404);
      }
      if (query.includes("mv=98")) {
        entry.fixture="error";
        return json({object:"error",status:503,details:"Controlled local Scryfall error."},503);
      }
      if (/\/(named|random)$/.test(url.pathname)) return json(cards[0]);
      return json({object:"list",total_cards:cards.length,has_more:false,data:cards});
    }
    if (url.pathname === "/__vm688/card.svg") {
      entry.status=200;
      return response.writeHead(200,{"Content-Type":"image/svg+xml"}).end('<svg xmlns="http://www.w3.org/2000/svg" width="488" height="680" viewBox="0 0 488 680"><rect width="488" height="680" rx="24" fill="#26231c"/><rect x="20" y="20" width="448" height="640" rx="20" fill="#b09b68"/><text x="244" y="340" text-anchor="middle" font-size="28" fill="#26231c">Local theme fixture</text></svg>');
    }
    const relative=decodeURIComponent(url.pathname).replace(/^\/+/,"")||"index.html";
    let file=path.resolve(root,relative);
    if (!file.startsWith(root+path.sep)) return response.writeHead(403).end("Forbidden");
    if ((await stat(file)).isDirectory()) file=path.join(file,"index.html");
    let body=await readFile(file);
    if (path.extname(file)===".html") body=Buffer.from(body.toString().replace(/<head>/i,"<head>"+bootstrap));
    entry.status=200;
    response.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream"}).end(body);
  } catch { entry.status=404; response.writeHead(404).end("Not found"); }
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
console.log(JSON.stringify({origin:`http://127.0.0.1:${server.address().port}`,pid:process.pid,fixtures:names,source:"data/scryfall/raw/oracle-cards.json",mutations:"transport mock and DOM readiness/paint observations only"}));
if (process.env.VM688_LEDGER_PATH) {
  const save = () => writeFile(process.env.VM688_LEDGER_PATH,JSON.stringify(ledger,null,2));
  process.on("SIGINT",()=>{save().finally(()=>server.close(()=>process.exit(0)));});
  process.on("SIGTERM",()=>{save().finally(()=>server.close(()=>process.exit(0)));});
}
