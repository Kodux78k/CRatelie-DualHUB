const CACHE_NAME = "cr-infodose-cache-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./apps/apps.json",
  "./apps/CostaRibeiro-ORc.html",
  "./apps/CATCR.html",
  "./apps/CostaRibero-Cotar0.html",
  "./apps/CatCostaRibeiro.html",
  "./apps/CR-orcamento.html",
  "./apps/CostaRibeiro-Cotar-v0.html",
  "./icons/icon-180.png",
  "./icons/icon-181.png",
  "./icons/icon-182.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e)=>{
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (e)=>{
  e.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.map(k=>k!==CACHE_NAME && caches.delete(k)))
    ).then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch", (e)=>{
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
