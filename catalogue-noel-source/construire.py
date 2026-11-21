"""Reconstruit catalogue-noel/index.html et sw.js à partir de gabarit.html et produits.json.

    python3 catalogue-noel-source/construire.py

Les planches d'images (catalogue-noel/planches/) et les icônes sont déjà dans le dépôt :
ce script ne les touche pas. Pour retirer un jouet, l'enlever de produits.json ; pour changer
l'interface, modifier gabarit.html ; puis relancer le script et pousser.
"""
import json, os, hashlib

ICI = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(os.path.dirname(ICI), "catalogue-noel")
produits = json.load(open(os.path.join(ICI, "produits.json")))
data = json.dumps(produits, ensure_ascii=False).replace("</", "<\\/")
corps = open(os.path.join(ICI, "gabarit.html")).read().replace("/*PRODUITS*/", data)
lignes = corps.split("\n")
corps = "\n".join(l for l in lignes if not l.startswith("<title>") and "claude:viewport-fit-sides" not in l and "apple-mobile-web-app-capable" not in l)
planches = sorted("planches/" + f for f in os.listdir(os.path.join(APP, "planches")) if f.endswith(".jpg"))

tete = """<!doctype html>
<html lang="fr-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<title>Catalogue des Souhaits</title>
<meta name="description" content="Le catalogue de Noël où les enfants entourent leurs cadeaux.">
<meta name="theme-color" content="#C8302A">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Souhaits">
<link rel="apple-touch-icon" href="icones/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="icones/icone-192.png">
<link rel="manifest" href="manifest.webmanifest">
<style>[hidden]{display:none!important} html,body{margin:0;height:100%}</style>
</head>
<body>
"""
pied = """
<script>
if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
</script>
</body>
</html>
"""
CFG = os.path.join("/home/user/book/catalogue-noel-source" if not os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)), "firebase.json")) else os.path.dirname(os.path.abspath(__file__)), "firebase.json")
if os.path.exists(CFG):
    cfg = json.load(open(CFG))
    if cfg.get("config", {}).get("apiKey") and cfg.get("famille"):
        tete = tete.replace("<body>\n", "<body>\n<script>window.FIREBASE_FAMILLE = " + json.dumps(cfg) + ";</script>\n", 1)
index = tete + corps + pied
open(os.path.join(APP, "index.html"), "w").write(index)

# ---- travailleur hors ligne : la version change à chaque construction ----
h = hashlib.sha1(index.encode())
for p in planches:
    h.update(open(os.path.join(APP, p), "rb").read())
if os.path.exists(os.path.join(APP, "rire.gif")):
    h.update(open(os.path.join(APP, "rire.gif"), "rb").read())
version = h.hexdigest()[:10]
coquille = ["./", "index.html", "manifest.webmanifest", "rire.gif", "icones/apple-touch-icon.png", "icones/icone-192.png", "icones/icone-512.png"] + planches
sw = """// Catalogue des Souhaits : tout le catalogue reste dans l'iPad, même sans réseau.
const VERSION = "souhaits-%s";
const COQUILLE = %s;
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
  if (url.origin === location.origin || /fonts\\.(googleapis|gstatic)\\.com|cdnjs\\.cloudflare\\.com/.test(url.host) || url.href.includes("gstatic.com/firebasejs/")) {
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
""" % (version, json.dumps(coquille, indent=2))
open(os.path.join(APP, "sw.js"), "w").write(sw)
print("app:", version, len(index) // 1024, "Ko de page,", len(planches), "planches")
