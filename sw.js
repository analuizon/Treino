const BASE=new URL('./',self.location.href);
const CACHE='ritmo-v2-'+BASE.pathname;
const FILES=['./','index.html','style.css','app.js','model.js','icon.svg','manifest.webmanifest'].map(path=>new URL(path,BASE).href);
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ritmo-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(e.request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const clone=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,clone)))}return r}).catch(async()=>{const cached=await caches.match(e.request);if(cached)return cached;if(e.request.mode==='navigate')return caches.match(BASE.href);return Response.error()}))});
