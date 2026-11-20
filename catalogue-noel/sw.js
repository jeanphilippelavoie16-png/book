// Catalogue des Souhaits : tout le catalogue reste dans l'iPad, même sans réseau.
const VERSION = "souhaits-b1022f522b";
const COQUILLE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icones/apple-touch-icon.png",
  "icones/icone-192.png",
  "icones/icone-512.png",
  "planches/p00.jpg",
  "planches/p01.jpg",
  "planches/p02.jpg",
  "planches/p03.jpg",
  "planches/p04.jpg",
  "planches/p05.jpg",
  "planches/p06.jpg",
  "planches/p07.jpg",
  "planches/p08.jpg",
  "planches/p09.jpg",
  "planches/p10.jpg",
  "planches/p11.jpg",
  "planches/p12.jpg",
  "planches/p13.jpg",
  "planches/p14.jpg",
  "planches/p15.jpg",
  "planches/p16.jpg",
  "planches/p17.jpg",
  "planches/p18.jpg"
];
const EXTERNES = ["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(COQUILLE);
    await Promise.all(EXTERNES.map(u => c.add(new Request(u, { mode: "no-cors" })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // la page : le réseau d'abord (pour recevoir les mises à jour), le cache si on est hors ligne
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        const c = await caches.open(VERSION); c.put("index.html", r.clone());
        return r;
      } catch (_) {
        return (await caches.match("index.html")) || (await caches.match("./"));
      }
    })());
    return;
  }
  // images, polices, bibliothèque PDF : le cache d'abord, puis on le garnit
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(url.host)) {
    e.respondWith((async () => {
      const deja = await caches.match(req, { ignoreSearch: url.origin === location.origin });
      if (deja) return deja;
      try {
        const r = await fetch(req);
        if (r.ok || r.type === "opaque") { const c = await caches.open(VERSION); c.put(req, r.clone()); }
        return r;
      } catch (_) {
        return new Response("", { status: 504 });
      }
    })());
  }
});
