// Catalogue des Souhaits : tout le catalogue reste dans l'iPad, même sans réseau.
const VERSION = "souhaits-3bb939f879";
const COQUILLE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "rire.gif",
  "couverture.webp",
  "demo.jpg",
  "portraits/k1.jpg",
  "portraits/k2.jpg",
  "portraits/k3.jpg",
  "portraits/k4.jpg",
  "icones/apple-touch-icon.png",
  "icones/icone-192.png",
  "icones/icone-512.png",
  "planches/p00-b7c2934a.jpg",
  "planches/p01-88364c10.jpg",
  "planches/p02-0ebbec9b.jpg",
  "planches/p03-93028fb4.jpg",
  "planches/p04-16cf149e.jpg",
  "planches/p05-55b8ab76.jpg",
  "planches/p06-2a25a1a7.jpg",
  "planches/p07-23a41da3.jpg",
  "planches/p08-1d715f3f.jpg",
  "planches/p09-4f1ea770.jpg",
  "planches/p10-50b4f20c.jpg",
  "planches/p11-0a0e30a7.jpg",
  "planches/p12-216c1850.jpg",
  "planches/p13-36e67a6b.jpg",
  "planches/p14-502b3737.jpg",
  "planches/p15-a4e42a2d.jpg",
  "planches/p16-d68cebbf.jpg",
  "planches/p17-fd27b0b1.jpg"
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
  if (/\.mp4$/.test(new URL(req.url).pathname)) return;
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
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(url.host) || url.href.includes("gstatic.com/firebasejs/")) {
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
