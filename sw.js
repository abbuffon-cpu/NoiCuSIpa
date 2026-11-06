const V='cedolini-v8',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'],OPT=['lib/pdf.min.js','lib/pdf.worker.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})));await Promise.allSettled(OPT.map(u=>c.add(u)))}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
const shell=e.request.mode==='navigate'||(u.origin===location.origin&&/(\/|index\.html)$/.test(u.pathname));
if(shell){e.respondWith(fetch(u.href,{cache:'no-cache'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(h=>h||caches.match('index.html'))));return}
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit);return hit||net}))});
