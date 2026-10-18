"""Construit catalogue.json, la bibliothèque des mains Adobe Stock 116570613 (JP, 18 octobre 2026 : « les bonnes
mains »), à partir du fichier acheté : images/bibliotheque-mains/adobe-116570613/AdobeStock_116570613.ai.

Chaque main (ou paire de mains qui se touchent) devient une entrée : ses tracés (rôle 'main' ou 'objet'), sa boîte,
la coupe de l'avant-bras (le plus long segment droit du contour) et l'axe de l'objet tenu (analyse en composantes
principales des points de l'objet). Les noms et descriptions vivent dans noms.json (écrit à la main) et sont
fusionnés ici. Le moteur est stock.js ; la feuille des ids, images/planches-src/_palette-mains-stock.js.

    pip install svgpathtools numpy      (seulement pour reconstruire)
    python3 -I .claude/skills/planches/scripts/mains/stock/construire.py
"""
import json, math, os, re
import numpy as np
from svgpathtools import parse_path, Line

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.abspath(os.path.join(ICI, *[".."] * 6))
AI = os.path.join(RACINE, "images", "bibliotheque-mains", "adobe-116570613", "AdobeStock_116570613.ai")


def lire():
    s = open(AI, "rb").read().decode("latin-1")
    s = s[s.find("%%EndPageSetup"):s.find("%%PageTrailer")]
    num = re.compile(r"-?(\d+\.?\d*|\.\d+)")
    pile, d, out, coul = [], [], [], (0, 0, 0, 0)
    for t in s.split():
        if num.fullmatch(t): pile.append(t); continue
        if t == "mo": d.append("M" + " ".join(pile[-2:]))
        elif t == "li": d.append("L" + " ".join(pile[-2:]))
        elif t == "cv": d.append("C" + " ".join(pile[-6:]))
        elif t == "cp": d.append("Z")
        elif t == "cmyk": coul = tuple(float(x) for x in pile[-4:])
        elif t in ("f", "ef"):
            if d and not d[0].startswith("M6000 6000"):
                main = coul[3] > 0.3 and abs(coul[0] - coul[1]) < 0.15     # la peau : presque noir, ou la main grise
                out.append({"role": "main" if main else "objet", "regle": "evenodd" if t == "ef" else "nonzero",
                            "d": " ".join(d), "gris": main and coul[3] < 0.6})
            d = []
        elif t in ("np", "clp"): d = []
        pile = []
    return out


def boite(p):
    x0, x1, y0, y1 = parse_path(p["d"]).bbox()
    return [x0, y0, x1, y1]


def regrouper(ch, touche=4.0):
    """Les tracés qui se touchent vont ensemble (une main et son objet, les morceaux d'un objet, deux mains en
    cœur ou la poignée de main) ; un objet qui ne touche rien va à la main la plus proche."""
    n = len(ch); parent = list(range(n))
    def f(i):
        while parent[i] != i: parent[i] = parent[parent[i]]; i = parent[i]
        return i
    B = [boite(c) for c in ch]; P = [points(c["d"], 300) for c in ch]
    def dist(i, j):
        return float(np.min(np.linalg.norm(P[i][:, None, :] - P[j][None, :, :], axis=2)))
    def dedans(a, b):
        return a[0] >= b[0] and a[1] >= b[1] and a[2] <= b[2] and a[3] <= b[3]
    for i in range(n):
        for j in range(i + 1, n):
            a, b = B[i], B[j]
            if not (a[0] - touche < b[2] and b[0] - touche < a[2] and a[1] - touche < b[3] and b[1] - touche < a[3]): continue
            if dedans(a, b) or dedans(b, a) or dist(i, j) < touche: parent[f(i)] = f(j)
    for i in range(n):                                   # un groupe sans main rejoint la main la plus proche
        if any(ch[k]["role"] == "main" for k in range(n) if f(k) == f(i)): continue
        mains = [k for k in range(n) if ch[k]["role"] == "main"]
        parent[f(i)] = f(min(mains, key=lambda k: dist(i, k)))
    g = {}
    for i in range(n): g.setdefault(f(i), []).append(i)
    return [[ch[i] for i in sorted(v)] for v in g.values()]


def points(d, n=400):
    P = parse_path(d); L = P.length()
    return np.array([[P.point(P.ilength(L * k / n)).real, P.point(P.ilength(L * k / n)).imag] for k in range(n)])


def coupe(mains, b):
    """La coupe de l'avant-bras : le bord de la boîte que le contour touche sur la plus grande largeur (l'avant-bras
    sort par là, coupé droit ou arrondi) ; rend ses deux bouts, sur le contour."""
    x0, y0, x1, y1 = b; tol = 0.06 * max(x1 - x0, y1 - y0)
    pts = np.vstack([points(c["d"], 800) for c in mains])
    best = None
    for ax, v in ((0, x0), (0, x1), (1, y0), (1, y1)):
        q = pts[np.abs(pts[:, ax] - v) < tol]
        if len(q) < 2: continue
        autre = 1 - ax; i0, i1 = np.argmin(q[:, autre]), np.argmax(q[:, autre])
        large = q[i1, autre] - q[i0, autre]
        if best is None or large > best[0]: best = (large, q[i0], q[i1])
    if best is None: return None
    return [[round(float(best[1][0]), 1), round(float(best[1][1]), 1)], [round(float(best[2][0]), 1), round(float(best[2][1]), 1)]]


def axe(objets):
    pts = np.vstack([points(c["d"], 200) for c in objets])
    m = pts.mean(axis=0); u, s, vt = np.linalg.svd(pts - m, full_matrices=False)
    v = vt[0]; proj = (pts - m) @ v; larg = (pts - m) @ vt[1]
    ang = math.degrees(math.atan2(v[1], v[0]))
    if ang > 90: ang -= 180
    if ang <= -90: ang += 180
    return {"x": round(float(m[0]), 1), "y": round(float(m[1]), 1), "angle": round(ang, 1),
            "longueur": round(float(proj.max() - proj.min()), 1), "largeur": round(float(larg.max() - larg.min()), 1)}


if __name__ == "__main__":
    ch = lire()
    groupes = regrouper(ch)
    items = []
    for g in groupes:
        bb = [boite(c) for c in g]
        b = [min(x[0] for x in bb), min(x[1] for x in bb), max(x[2] for x in bb), max(x[3] for x in bb)]
        items.append({"boite": [round(v, 1) for v in b], "chemins": g})
    # les rangées : bandes de y qui se chevauchent
    items.sort(key=lambda it: it["boite"][1])
    rangs = []
    for it in items:
        if rangs and (it["boite"][1] + it["boite"][3]) / 2 < rangs[-1]["y1"]: rangs[-1]["l"].append(it); rangs[-1]["y1"] = max(rangs[-1]["y1"], it["boite"][3])
        else: rangs.append({"y1": it["boite"][3], "l": [it]})
    noms = json.load(open(os.path.join(ICI, "noms.json"))) if os.path.exists(os.path.join(ICI, "noms.json")) else {}
    cat = {}
    for r, rg in enumerate(rangs, 1):
        rg["l"].sort(key=lambda it: ((it["boite"][0] + it["boite"][2]) / 2 // 120, it["boite"][1]))
        for c, it in enumerate(rg["l"], 1):
            i = f"{r}-{c:02d}"
            mains = [x for x in it["chemins"] if x["role"] == "main"]
            objets = [x for x in it["chemins"] if x["role"] == "objet"]
            e = {"boite": it["boite"], "coupe": coupe(mains, it["boite"]), "objet": axe(objets) if objets else None,
                 "chemins": [{k: v for k, v in x.items() if k != "gris" or v} for x in it["chemins"]]}
            e.update(noms.get(i, {}))
            cat[i] = e
    json.dump(cat, open(os.path.join(ICI, "catalogue.json"), "w"), ensure_ascii=False, separators=(",", ":"))
    print(len(cat), "mains ;", [len(r["l"]) for r in rangs], "par rangée")
