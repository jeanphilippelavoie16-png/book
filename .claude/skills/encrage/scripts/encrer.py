"""encrer.py — la passe d'encrage d'un dessinateur professionnel sur un dessin au trait.

Entrée : un « dessin » = des aplats (formes fermées remplies, avec ou sans contour) et des traits
(polylignes ouvertes ou fermées), tels que les sort un décalque ou un dessin construit.
Sortie : le même dessin, encré proprement, en SVG.

La passe, dans l'ordre où un encreur la fait :
 1. jeter les miettes      — les traits trop courts pour dire quelque chose ;
 2. raccorder les coupures — deux bouts qui se font face et se touchent presque deviennent un seul trait ;
 3. fermer les jonctions   — un trait qui s'arrête juste avant un autre va le toucher ;
 4. enlever les doublons   — deux traits qui suivent le même chemin n'en font qu'un ;
 5. symétriser (option)    — une figure de face est symétrique : on fait la moyenne des deux moitiés ;
 6. lisser                 — courbure continue, sans bosse ni tremblé (Taubin, puis Bézier) ;
 7. encrer                 — un trait plein au milieu qui s'effile aux bouts, plus fort sur le contour
                             et du côté de l'ombre, plus fin sur les détails.
"""
import numpy as np, os, sys, json
from dataclasses import dataclass, field
from scipy.spatial import cKDTree
from scipy import ndimage as ndi
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'dessin-notice', 'scripts'))
from courbes import courbes, svg_d, _bez

NOIR = '#1A1A1A'

@dataclass
class Trait:
    pts: np.ndarray
    role: str = 'interieur'      # 'contour', 'interieur', 'detail'
    ferme: bool = False

@dataclass
class Aplat:
    pts: np.ndarray
    couleur: str = '#FFFFFF'
    contour: bool = True

@dataclass
class Dessin:
    aplats: list = field(default_factory=list)
    traits: list = field(default_factory=list)
    largeur: float = 100
    hauteur: float = 100

# ── outils de polyligne ───────────────────────────────────────────────────────
def longueur(P): return float(np.sum(np.linalg.norm(np.diff(P, axis=0), axis=1))) if len(P) > 1 else 0.0

def reech(P, pas, ferme=False):
    P = np.asarray(P, float)
    if ferme: P = np.vstack([P, P[:1]])
    d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(P, axis=0), axis=1))]
    if d[-1] < 1e-9: return P[:1]
    n = max(int(np.ceil(d[-1]/pas)), 2)
    s = np.linspace(0, d[-1], n + 1)
    Q = np.stack([np.interp(s, d, P[:, 0]), np.interp(s, d, P[:, 1])], 1)
    return Q[:-1] if ferme else Q

def taubin(P, it=12, lam=0.5, mu=-0.53, ferme=False):
    P = P.copy()
    if len(P) < 4: return P
    for _ in range(it):
        for f in (lam, mu):
            if ferme:
                L = 0.5*(np.roll(P, 1, 0) + np.roll(P, -1, 0)) - P
                P = P + f*L
            else:
                L = 0.5*(P[:-2] + P[2:]) - P[1:-1]
                P[1:-1] = P[1:-1] + f*L
    return P

def tangente_bout(P, bout, n=6):
    """Tangente sortante au bout 0 (début) ou 1 (fin)."""
    n = min(n, len(P)-1)
    if bout == 0: v = P[0] - P[n]
    else: v = P[-1] - P[-1-n]
    return v/(np.linalg.norm(v) + 1e-9)

def hermite(p0, t0, p1, t1, pas):
    d = np.linalg.norm(p1 - p0)
    if d < 1e-6: return np.array([p0])
    n = max(int(d/pas), 2); s = np.linspace(0, 1, n + 1)[1:-1, None]
    h00 = 2*s**3 - 3*s**2 + 1; h10 = s**3 - 2*s**2 + s; h01 = -2*s**3 + 3*s**2; h11 = s**3 - s**2
    return h00*p0 + h10*t0*d + h01*p1 + h11*t1*d

# ── 1–4 : nettoyer la structure ───────────────────────────────────────────────
def jeter_miettes(traits, lmin):
    return [t for t in traits if t.ferme or longueur(t.pts) >= lmin]

def raccorder(traits, djoin, angle=40, pas=0.5):
    """Joint les bouts qui se font face (coupures du décalque) ; ferme les boucles presque fermées."""
    ca = np.cos(np.radians(angle))
    change = True
    while change:
        change = False
        bouts = []
        for i, t in enumerate(traits):
            if t.ferme or len(t.pts) < 3: continue
            for b in (0, 1):
                bouts.append((i, b, t.pts[0] if b == 0 else t.pts[-1], tangente_bout(t.pts, b)))
        cand = []
        for a in range(len(bouts)):
            for c in range(a+1, len(bouts)):
                i, bi, pi, ti = bouts[a]; j, bj, pj, tj = bouts[c]
                if i == j and bi == bj: continue
                v = pj - pi; d = np.linalg.norm(v)
                if d > djoin: continue
                if d > 0.3:
                    u = v/d
                    if ti @ u < ca or tj @ (-u) < ca: continue
                cand.append((d, a, c))
        cand.sort()
        for d, a, c in cand:
            i, bi, pi, ti = bouts[a]; j, bj, pj, tj = bouts[c]
            if i == j:   # fermer la boucle
                t = traits[i]
                P = t.pts if bi == 1 else t.pts[::-1]
                traits[i] = Trait(np.vstack([P, hermite(P[-1], ti, P[0], -tj, pas)]), t.role, True)
            else:
                A = traits[i].pts if bi == 1 else traits[i].pts[::-1]     # finit au bout a
                B = traits[j].pts if bj == 0 else traits[j].pts[::-1]     # commence au bout c
                pont = hermite(A[-1], ti, B[0], -tj, pas)
                role = traits[i].role if longueur(A) >= longueur(B) else traits[j].role
                traits[i] = Trait(np.vstack([A, pont, B]), role, False)
                traits.pop(j)
            change = True
            break
    return traits

def fermer_jonctions(traits, aplats, dsnap, angle=55):
    """Un bout libre qui s'arrête juste avant un autre trait (ou un contour) va le toucher."""
    ca = np.cos(np.radians(angle))
    cibles = [(k, t.pts) for k, t in enumerate(traits)] + [(-1 - k, a.pts) for k, a in enumerate(aplats) if a.contour]
    for i, t in enumerate(traits):
        if t.ferme or len(t.pts) < 3: continue
        for b in (0, 1):
            P = traits[i].pts
            p = P[0] if b == 0 else P[-1]; tg = tangente_bout(P, b)
            best = None
            for k, Q in cibles:
                if k == i:
                    # soi-même : seulement loin du bout
                    m = int(len(Q)*0.2)
                    Q = Q[m:] if b == 0 else Q[:-m] if m else Q
                    if len(Q) == 0: continue
                d = np.linalg.norm(Q - p, axis=1); j = int(np.argmin(d))
                if d[j] < 0.25 or d[j] > dsnap: continue
                u = (Q[j] - p)/d[j]
                if tg @ u < ca: continue
                if best is None or d[j] < best[0]: best = (d[j], Q[j])
            if best is not None:
                q = best[1]
                ext = np.linspace(p, q, max(int(best[0]/0.5), 2))[1:]
                traits[i] = Trait(np.vstack([ext[::-1], P]) if b == 0 else np.vstack([P, ext]), t.role, False)
    return traits

def enlever_doublons(traits, aplats, eps, frac=0.7, pas=0.5):
    """Un trait qui court à moins de eps d'un trait plus long (ou d'un contour) sur frac de sa longueur s'en va."""
    ordre = sorted(range(len(traits)), key=lambda k: -longueur(traits[k].pts))
    gardes = []; arbres = []
    for a in aplats:
        if a.contour: arbres.append(cKDTree(reech(a.pts, pas, True)))
    for k in ordre:
        t = traits[k]; Q = reech(t.pts, pas, t.ferme)
        doublon = False
        for tr in arbres:
            d, _ = tr.query(Q)
            if np.mean(d < eps) > frac: doublon = True; break
        if not doublon:
            gardes.append(t); arbres.append(cKDTree(Q))
    return gardes

# ── 5 : symétrie ──────────────────────────────────────────────────────────────
def miroir(P, cx): Q = P.copy(); Q[:, 0] = 2*cx - Q[:, 0]; return Q

def moyenne(A, B, n=None):
    n = n or max(len(A), len(B))
    A = reech(A, longueur(A)/n); B = reech(B, longueur(B)/n)
    m = min(len(A), len(B)); A = A[:m]; B = B[:m]
    if np.linalg.norm(A[0] - B[-1]) + np.linalg.norm(A[-1] - B[0]) < np.linalg.norm(A[0] - B[0]) + np.linalg.norm(A[-1] - B[-1]):
        B = B[::-1]
    return (A + B)/2

def chamfer(A, B):
    ta, tb = cKDTree(A), cKDTree(B)
    return 0.5*(tb.query(A)[0].mean() + ta.query(B)[0].mean())

def symetriser_traits(traits, cx, seuil, pas=0.5):
    S = [reech(t.pts, pas, t.ferme) for t in traits]
    M = [miroir(s, cx) for s in S]
    fait = set(); out = []
    for i in range(len(S)):
        if i in fait: continue
        best = None
        for j in range(len(S)):
            if j in fait: continue
            if traits[j].ferme != traits[i].ferme: continue
            r = longueur(S[j])/max(longueur(S[i]), 1e-6)
            if r < 0.5 or r > 2.0: continue
            c = chamfer(S[i], M[j])
            if best is None or c < best[0]: best = (c, j)
        if best is None or best[0] > seuil:
            out.append(traits[i]); fait.add(i); continue
        j = best[1]
        if j == i:      # trait central : on le rend symétrique de lui-même
            out.append(Trait(moyenne(S[i], M[i]), traits[i].role, traits[i].ferme)); fait.add(i)
        else:
            m = moyenne(S[i], M[j])
            out.append(Trait(m, traits[i].role, traits[i].ferme)); out.append(Trait(miroir(m, cx), traits[j].role, traits[j].ferme))
            fait.update((i, j))
    return out

def symetriser_aplat(a, cx, res=0.5):
    """Moyenne du champ de distance de la forme et de son miroir : une forme symétrique, sans couture."""
    from skimage.draw import polygon as poly
    from skimage import measure
    P = np.vstack([a.pts, miroir(a.pts, cx)])
    x0, y0 = P.min(0) - 4; x1, y1 = P.max(0) + 4
    W = int((x1 - x0)/res) + 1; H = int((y1 - y0)/res) + 1
    m = np.zeros((H, W), bool)
    rr, cc = poly((a.pts[:, 1] - y0)/res, (a.pts[:, 0] - x0)/res, m.shape); m[rr, cc] = True
    sdf = ndi.distance_transform_edt(~m) - ndi.distance_transform_edt(m)
    # miroir autour de cx dans la grille
    xs = x0 + np.arange(W)*res; xm = 2*cx - xs
    idx = np.clip(np.round((xm - x0)/res).astype(int), 0, W-1)
    sym = 0.5*(sdf + sdf[:, idx])
    cs = measure.find_contours(sym, 0.0)
    if not cs: return a
    c = max(cs, key=len)
    return Aplat(np.stack([x0 + c[:, 1]*res, y0 + c[:, 0]*res], 1), a.couleur, a.contour)

# ── 6 : lisser ────────────────────────────────────────────────────────────────
def lisser(P, ferme, pas=0.5, it=14, tol=0.35):
    Q = reech(P, pas, ferme)
    if len(Q) < 4: return Q, []
    Q = taubin(Q, it, ferme=ferme)
    cs = courbes(Q, tol, ferme, sigma=0.3)
    return Q, cs

def echantillonner(cs, pas=0.25):
    pts = []
    for P in cs:
        L = np.linalg.norm(P[3] - P[0]) + np.linalg.norm(P[1] - P[0]) + np.linalg.norm(P[2] - P[3])
        n = max(int(L/pas), 2)
        pts.append(_bez(P, np.linspace(0, 1, n, endpoint=False)))
    if cs: pts.append(cs[-1][3][None])
    return np.vstack(pts) if pts else np.zeros((0, 2))

# ── 7 : encrer ────────────────────────────────────────────────────────────────
POIDS = {'contour': 1.35, 'interieur': 1.0, 'detail': 0.75}

def normales(C, ferme):
    if ferme: T = np.roll(C, -1, 0) - np.roll(C, 1, 0)
    else: T = np.gradient(C, axis=0)
    T /= np.linalg.norm(T, axis=1, keepdims=True) + 1e-9
    return np.stack([-T[:, 1], T[:, 0]], 1)

def profil(C, w, ferme, effiler=True, lumiere=None, n_ext=None):
    s = np.r_[0, np.cumsum(np.linalg.norm(np.diff(C, axis=0), axis=1))]; L = s[-1] if len(s) else 0
    W = np.full(len(C), w)
    if effiler and not ferme and L > 0:
        Lt = min(0.25*L, 8.0)
        ss = lambda x: np.clip(x, 0, 1)**2*(3 - 2*np.clip(x, 0, 1))
        W = w*(0.28 + 0.72*ss(s/Lt)*ss((L - s)/Lt))
    if lumiere is not None and n_ext is not None:
        W = W*(1 + 0.32*np.clip(n_ext @ lumiere, 0, None) - 0.12*np.clip(-(n_ext @ lumiere), 0, None))
    return W

def ruban(C, W, ferme):
    N = normales(C, ferme)
    G = C + N*(W[:, None]/2); D = C - N*(W[:, None]/2)
    if ferme:
        return 'M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in G) + ' Z M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in D[::-1]) + ' Z'
    # bouts arrondis
    def cap(p, n, r, sens):
        a0 = np.arctan2(n[1], n[0]); ang = np.linspace(a0, a0 + sens*np.pi, 7)[1:-1]
        return p + r*np.stack([np.cos(ang), np.sin(ang)], 1)
    fin = cap(C[-1], N[-1], W[-1]/2, -1); debut = cap(C[0], -N[0], W[0]/2, -1)
    pts = np.vstack([G, fin, D[::-1], debut])
    return 'M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in pts) + ' Z'

def encrer(d: Dessin, echelle=1.0, sym=None, lmin=3.0, djoin=4.0, dsnap=3.0, eps=1.3, lumiere=(0.55, 0.83)):
    """Passe complète ; les distances sont dans les unités du dessin. sym = abscisse de l'axe ou None."""
    traits = [Trait(np.asarray(t.pts, float), t.role, t.ferme) for t in d.traits]
    aplats = [Aplat(np.asarray(a.pts, float), a.couleur, a.contour) for a in d.aplats]
    traits = jeter_miettes(traits, lmin)
    traits = raccorder(traits, djoin)
    traits = enlever_doublons(traits, aplats, eps)
    if sym is not None:
        aplats = [symetriser_aplat(a, sym) for a in aplats]
        traits = symetriser_traits(traits, sym, seuil=2.5)
        traits = enlever_doublons(traits, aplats, eps*0.8)
    traits = fermer_jonctions(traits, aplats, dsnap)
    traits = jeter_miettes(traits, lmin)
    L = np.array(lumiere, float); L /= np.linalg.norm(L)
    out = []
    for a in aplats:
        Q, cs = lisser(a.pts, True, it=24, tol=0.3)
        if not cs: continue
        out.append(f'<path d="{svg_d(cs, True)}" fill="{a.couleur}" stroke="none"/>')
    for a in aplats:
        if not a.contour: continue
        Q, cs = lisser(a.pts, True, it=24, tol=0.3)
        if not cs: continue
        C = echantillonner(cs)
        if len(C) < 5: continue
        # normale extérieure : le contour tourne-t-il dans le sens direct ?
        aire = np.sum(C[:-1, 0]*C[1:, 1] - C[1:, 0]*C[:-1, 1])/2
        N = normales(C, True)*(1 if aire > 0 else -1)
        W = profil(C, POIDS['contour']*echelle, True, effiler=False, lumiere=L, n_ext=-N)
        out.append(f'<path d="{ruban(C, W, True)}" fill="{NOIR}" fill-rule="evenodd" stroke="none"/>')
    for t in traits:
        Q, cs = lisser(t.pts, t.ferme)
        if not cs: continue
        C = echantillonner(cs)
        if len(C) < 3: continue
        w = POIDS.get(t.role, 1.1)*echelle
        if t.role == 'interieur':     # un long trait pèse plus qu'un petit détail
            Lc = longueur(C); w = w*(0.78 + 0.22*np.clip((Lc - 8)/40, 0, 1))
        W = profil(C, w, t.ferme)
        out.append(f'<path d="{ruban(C, W, t.ferme)}" fill="{NOIR}" fill-rule="evenodd" stroke="none"/>')
    return out

def svg(fichier, l, h, groupes, fond='#FFFFFF'):
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {l:.0f} {h:.0f}" width="{l:.0f}" height="{h:.0f}"><rect width="{l:.0f}" height="{h:.0f}" fill="{fond}"/>']
    for (x, y, els) in groupes:
        s.append(f'<g transform="translate({x:.1f},{y:.1f})">'); s += els; s.append('</g>')
    s.append('</svg>')
    open(fichier + '.svg', 'w').write('\n'.join(s))
    import subprocess
    subprocess.run(['node', '/home/user/book/.claude/skills/planches/scripts/rendre-planche.js', fichier + '.svg', fichier + '.png'], capture_output=True)
    return fichier + '.png'
