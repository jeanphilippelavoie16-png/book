# Main 3D en volumes lissés (SDF), refermée autour d'un manche, rendue en trait au style du livre.
# Repère de la main droite : X vers les doigts, Y vers le pouce, Z vers le dos de la main ; en mm.
import numpy as np, itertools

def unit(v): v = np.asarray(v, float); return v / np.linalg.norm(v)
def rot(axis, deg):
    a = np.radians(deg); x, y, z = unit(axis); c, s = np.cos(a), np.sin(a); C = 1 - c
    return np.array([[c+x*x*C, x*y*C-z*s, x*z*C+y*s], [y*x*C+z*s, c+y*y*C, y*z*C-x*s], [z*x*C-y*s, z*y*C+x*s, c+z*z*C]])
def smin(a, b, k):
    h = np.clip(0.5 + 0.5*(b-a)/k, 0, 1); return b*(1-h) + a*h - k*h*(1-h)
def capsule(P, a, b, ra, rb):
    a = np.asarray(a, float); ba = np.asarray(b, float) - a; pa = P - a
    t = np.clip((pa @ ba) / (ba @ ba), 0, 1)
    return np.linalg.norm(pa - t[..., None]*ba, axis=-1) - (ra + (rb-ra)*t)
def ellipsoid(P, c, rad, R=np.eye(3)):
    q = (P - c) @ R; k0 = np.linalg.norm(q/rad, axis=-1); k1 = np.linalg.norm(q/rad**2, axis=-1)
    return k0*(k0-1)/np.maximum(k1, 1e-6)
def cylindre(P, c, axe, r, demi):
    axe = unit(axe); pc = P - c; h = pc @ axe
    rad = np.linalg.norm(pc - h[..., None]*axe, axis=-1) - r; dz = np.abs(h) - demi
    return np.linalg.norm(np.stack([np.maximum(rad, 0), np.maximum(dz, 0)], -1), axis=-1) + np.minimum(np.maximum(rad, dz), 0)

# ── anatomie : main d'homme adulte ─────────────────────────────────────────────
DOIGTS = [  # MCP, longueurs P1 P2 P3, rayons (base P1, PIP, DIP, bout), écart (°)
  dict(nom='index',  mcp=(92, 25, 1), L=(44, 25, 20), r=(10.0, 8.8, 7.6, 6.3), splay=5),
  dict(nom='majeur', mcp=(95,  6, 2), L=(49, 29, 21), r=(10.4, 9.2, 7.9, 6.5), splay=0),
  dict(nom='annul',  mcp=(90,-13, 1), L=(46, 28, 21), r=(9.8, 8.7, 7.5, 6.2), splay=-4),
  dict(nom='auric',  mcp=(79,-30, -1), L=(36, 21, 18), r=(8.6, 7.6, 6.6, 5.5), splay=-9),
]
COUPE_BRAS = 75
RAYON = 1.12      # doigts un peu plus pleins qu'au naturel : une notice simplifie et arrondit
LONG = 0.94
def style(D):
    D = dict(D); D['r'] = tuple(r*RAYON for r in D['r']); D['L'] = tuple(l*LONG for l in D['L']); return D
MANCHON = None   # abscisse du bord de la manche (mm), ou None
POUCE = dict(cmc=(20, 22, -8), L=(44, 32, 27), r=(12.0, 10.6, 9.4, 7.4))

def dorsal_de(pts, ax_final):
    d = unit(pts[-1] - pts[-2]); return unit(np.cross(d, ax_final))

def doigt_joints(D, ang):
    D = style(D)
    d = rot((0,0,1), D['splay']) @ np.array([1., 0, 0]); ax = np.array([0., 1, 0])   # flexion : x → -z
    pts = [np.array(D['mcp'], float)]
    for l, a in zip(D['L'], ang):
        d = rot(ax, a) @ d; pts.append(pts[-1] + l*d)
    return pts
def pouce_joints(p, avec_axe=False):
    # p : (dir du métacarpe en angles sphériques az, el), flexion MCP, flexion IP, roulis
    az, el, mcp, ip, roll = p
    d = unit([np.cos(np.radians(el))*np.cos(np.radians(az)), np.cos(np.radians(el))*np.sin(np.radians(az)), -np.sin(np.radians(el))])
    # axe de flexion du pouce : perpendiculaire au métacarpe, tourné par le roulis (opposition)
    ref = unit(np.cross(d, [0, 0, 1])); ax = rot(d, roll) @ ref
    pts = [np.array(POUCE['cmc'], float)]; pts.append(pts[0] + POUCE['L'][0]*d)
    for l, a in zip(POUCE['L'][1:], (mcp, ip)):
        d = rot(ax, a) @ d; pts.append(pts[-1] + l*d)
    return (pts, ax) if avec_axe else pts

def finir(J, pp):
    """Ajoute le pouce, les normales dorsales et les ongles."""
    J['pouce'], axp = pouce_joints(pp, True)
    J['dors'] = {D['nom']: unit(np.cross(unit(J[D['nom']][3]-J[D['nom']][2]), [0, 1, 0])) for D in DOIGTS}
    J['dors']['pouce'] = unit(np.cross(unit(J['pouce'][3]-J['pouce'][2]), axp))
    J['ongles'] = ongles(J)
    return J

def pieces(J, manche=None, objets=()):
    """Composantes (identifiant, groupe, fonction P->sdf). Groupe 0 = paume et bras, 1..4 doigts,
    5 pouce, 9 manche ; identifiant d'une phalange = 10*groupe + rang."""
    T = J['pouce']
    def base(P):
        bras = np.maximum(capsule(P*np.array([1, 1, 1/0.68]), (-170, 0, 0), (6, 0, 0), 29, 26) * 0.75, -(P[..., 0] + COUPE_BRAS))
        paume = ellipsoid(P, np.array([46, -2, -3]), np.array([46, 38, 12.5]))
        b = smin(bras, paume, 16)
        for D in DOIGTS:
            b = smin(b, capsule(P, (16, 0.4*D['mcp'][1], 1), D['mcp'], 7.5, D['r'][0]*0.95), 7)
        b = smin(b, ellipsoid(P, np.array([44, -27, -8]), np.array([36, 12, 11])), 8)     # hypothénar
        Rt = np.stack([unit(T[1]-T[0]), unit(np.cross([0,0,1], T[1]-T[0])), [0,0,1]], 1)
        b = smin(b, ellipsoid(P, (T[0]+T[1])/2 + np.array([0, -4, -3]), np.array([27, 16, 13]), Rt), 9)  # thénar
        return smin(b, capsule(P, T[0], T[1], POUCE['r'][0], POUCE['r'][1]), 8)
    out = [(0, 0, base)]
    for g, D in enumerate(DOIGTS, 1):
        P_ = J[D['nom']]; r = style(D)['r']
        for k in range(3):
            out.append((10*g+k, g, lambda P, a=P_[k], b_=P_[k+1], ra=r[k], rb=r[k+1]: capsule(P, a, b_, ra, rb)))
    r = POUCE['r']
    for k in (1, 2):
        out.append((50+k, 5, lambda P, a=T[k], b_=T[k+1], ra=r[k], rb=r[k+1]: capsule(P, a, b_, ra, rb)))
    # ongles (groupe 6x : toujours dessinés) ; NAILS : liste (centre, axe long, normale dorsale, largeur)
    for k, (c, dl, dn, w) in enumerate(J.get('ongles', [])):
        Rm = np.stack([unit(dl), unit(np.cross(dn, dl)), unit(dn)], 1)
        out.append((60+k, 6, lambda P, c=c, Rm=Rm, w=w: ellipsoid(P, c, np.array([w*1.15, w, 1.1]), Rm)))
    if MANCHON:
        out.append((70, 7, lambda P: np.maximum(capsule(P*np.array([1, 1, 1/0.74]), (-200, 0, 0), (MANCHON, 0, 0), 34, 33)*0.8, -(P[..., 0] + COUPE_BRAS))))
    if manche is not None: out.append((9, 9, lambda P: cylindre(P, *manche)))
    for k, f in enumerate(objets): out.append((90+k, 9, f))
    return out

def ongles(J):
    res = []
    for D in DOIGTS:
        P = J[D['nom']]; d = unit(P[3]-P[2])
        dn = J['dors'][D['nom']]
        r = D['r'][3]; c = P[2] + 0.62*(P[3]-P[2]) + dn*(r*0.95 + 0.25*D['r'][2]*0.3)
        res.append((c, d, dn, r*0.82))
    T = J['pouce']; d = unit(T[3]-T[2]); dn = J['dors']['pouce']; r = POUCE['r'][3]
    res.append((T[2] + 0.6*(T[3]-T[2]) + dn*(r*1.0), d, dn, r*0.85))
    return res

def evaluer(P, pcs):
    ds = [(i, g, f(P)) for i, g, f in pcs]
    b = ds[0][2]; tot = b.copy(); groupes = {}
    for i, g, d in ds[1:]:
        if g in (6, 7, 9): continue
        groupes[g] = d if g not in groupes else smin(groupes[g], d, 2.2)
    for g, d in groupes.items(): tot = np.minimum(tot, smin(b, d, 8 if g < 5 else 8))
    for i, g, d in ds:
        if g in (6, 7, 9): tot = np.minimum(tot, d)
    ids = np.array([i for i, g, d in ds]); stack = np.stack([d - (2.0 if g in (1,2,3,4,5) else 0) for i, g, d in ds], 0)
    return tot, ids[np.argmin(stack, 0)]

def ajuster_doigts_surf(surf, plages=None, poids=(1.0, 1.0, 0.6), doigts=None):
    """surf(Q) : distance signée de Q à la surface de l'objet (positive dehors)."""
    res = {}
    for D in DOIGTS:
        if doigts and D['nom'] not in doigts: continue
        pl = (plages or {}).get(D['nom'], (range(0, 101, 4), range(0, 111, 4), range(0, 81, 5)))
        best = None
        for a in itertools.product(*pl):
            P = doigt_joints(D, a); err = 0
            for k in range(3):
                for t in np.linspace(0.15, 0.95, 5):
                    Q = P[k] + t*(P[k+1]-P[k]); rr = D['r'][k] + t*(D['r'][k+1]-D['r'][k])
                    g = surf(Q) - rr
                    err += (g*g if g > 0 else 25*g*g) * poids[k]
            if best is None or err < best[0]: best = (err, a)
        res[D['nom']] = best[1]
    return res

# ── ajustement de la prise autour du manche ───────────────────────────────────
def ajuster_doigts(C, axe, R):
    axe = unit(axe); res = {}
    def dist_axe(Q): q = Q - C; return np.linalg.norm(q - (q @ axe)[..., None]*axe, axis=-1)
    for D in DOIGTS:
        best = None
        for a in itertools.product(range(20, 101, 4), range(40, 111, 4), range(10, 81, 5)):
            P = doigt_joints(D, a); err = 0
            for k in range(3):
                for t in np.linspace(0.15, 0.95, 5):
                    Q = P[k] + t*(P[k+1]-P[k]); rr = D['r'][k] + t*(D['r'][k+1]-D['r'][k])
                    g = dist_axe(Q) - (R + rr)
                    err += (g*g if g > 0 else 25*g*g) * (1.0 if k < 2 else 0.6)
            if best is None or err < best[0]: best = (err, a)
        res[D['nom']] = best[1]
    return res

def ajuster_pouce(J, C, axe, R, cible, poids_cible=6.0, cible_ip=None, surf=None, depart=None):
    from scipy.optimize import minimize
    axe = unit(axe) if axe is not None else None
    def dist_axe(Q): q = Q - C; return np.linalg.norm(q - (q @ axe)[..., None]*axe, axis=-1)
    segs = []
    for D in DOIGTS:
        F = J[D['nom']]
        for j in range(3): segs.append((F[j], F[j+1], D['r'][j], D['r'][j+1]))
    A = np.array([s[0] for s in segs]); B = np.array([s[1] for s in segs])
    ra = np.array([s[2] for s in segs]); rb = np.array([s[3] for s in segs])
    def seg_dist(Q):   # distance de Q à la surface de chaque phalange
        ba = B - A; t = np.clip(np.einsum('ij,ij->i', Q - A, ba) / np.einsum('ij,ij->i', ba, ba), 0, 1)
        return np.linalg.norm(Q - A - t[:, None]*ba, axis=1) - (ra + (rb-ra)*t)
    def f(p):
        T = pouce_joints(p); err = 0.0
        for k in range(1, 3):
            for t in np.linspace(0.1, 1.0, 6):
                Q = T[k] + t*(T[k+1]-T[k]); rr = POUCE['r'][k] + t*(POUCE['r'][k+1]-POUCE['r'][k])
                if R is not None:
                    g = dist_axe(Q) - (R + rr)
                    err += 25*g*g if g < 0 else 0.04*g*g
                if surf is not None:
                    g = surf(Q) - rr
                    err += 25*g*g if g < 0 else 0.0
                dd = seg_dist(Q) - rr - 0.5
                err += 30*np.sum(np.minimum(dd, 0)**2)
        pulpe = T[3] - 0.35*(T[3]-T[2])
        err += poids_cible*np.sum((pulpe - cible)**2)
        if cible_ip is not None: err += 6.0*np.sum((T[2] - cible_ip)**2)
        # limites articulaires douces
        az, el, mcp, ip, roll = p
        for v, lo, hi in ((mcp, -5, 60), (ip, -10, 80), (el, -20, 90)):
            if v < lo: err += 5*(lo-v)**2
            if v > hi: err += 5*(v-hi)**2
        return err
    best = None
    for p0 in (depart or itertools.product((15, 30, 45, 60), (20, 40, 60), (10, 35), (20, 45), (-60, -20, 20, 60))):
        r = minimize(f, np.array(p0, float), method='Powell', options=dict(maxiter=4000, xtol=0.5, ftol=0.5))
        if best is None or r.fun < best.fun: best = r
    return tuple(best.x)

# ── rendu ─────────────────────────────────────────────────────────────────────
def rendre(pcs, Rv, cadre, px=0.5, w0=-250, w1=250):
    """Rv : lignes = axes u (droite), v (bas), w (profondeur, vers l'avant) en coordonnées main.
    cadre : (umin, umax, vmin, vmax). Rend profondeur, identifiant et masque."""
    u = np.arange(cadre[0], cadre[1], px); v = np.arange(cadre[2], cadre[3], px)
    U, V = np.meshgrid(u, v); n = U.size
    O = np.stack([U.ravel(), V.ravel(), np.full(n, w0)], -1) @ Rv
    dirw = Rv[2]
    t = np.zeros(n); alive = np.ones(n, bool); hit = np.zeros(n, bool)
    for it in range(220):
        idx = np.nonzero(alive)[0]
        if not len(idx): break
        P = O[idx] + t[idx, None]*dirw
        d, _ = evaluer(P, pcs)
        h = d < 0.05; hit[idx[h]] = True; alive[idx[h]] = False
        t[idx] += np.maximum(d*0.8, 0.05)
        far = t[idx] > (w1 - w0); alive[idx[far]] = False
    P = O + t[:, None]*dirw
    _, ids = evaluer(P[hit], pcs)
    ident = np.full(n, -1); ident[hit] = ids
    depth = np.where(hit, t, np.inf)
    return depth.reshape(U.shape), ident.reshape(U.shape), hit.reshape(U.shape)

# ── du rendu au trait ─────────────────────────────────────────────────────────
from skimage import measure

def lisser(pts, k=5, ferme=False):
    if len(pts) < 2*k+1: return pts
    if ferme:
        ext = np.vstack([pts[-k:], pts, pts[:k]])
    else:
        ext = np.vstack([np.repeat(pts[:1], k, 0), pts, np.repeat(pts[-1:], k, 0)])
    ker = np.ones(2*k+1)/(2*k+1)
    out = np.stack([np.convolve(ext[:, j], ker, 'valid') for j in range(2)], -1)
    if not ferme: out[0] = pts[0]; out[-1] = pts[-1]
    return out

def chaikin(pts, n=2, ferme=False):
    for _ in range(n):
        if len(pts) < 3: break
        q = 0.75*pts[:-1] + 0.25*pts[1:]; r = 0.25*pts[:-1] + 0.75*pts[1:]
        new = np.empty((2*len(q), 2)); new[0::2] = q; new[1::2] = r
        pts = np.vstack([pts[:1], new, pts[-1:]]) if not ferme else new
    return pts

def traits(depth, ident, hit, px, cadre, seuil_meme=4.0, seuil_autre=0.8, long_min=3.0, avec_objet=True):
    H, W = hit.shape
    def depth_at(y, x):
        yi = np.clip(np.round(y).astype(int), 0, H-1); xi = np.clip(np.round(x).astype(int), 0, W-1)
        return depth[yi, xi], ident[yi, xi]
    def to_mm(c): return np.stack([cadre[0] + c[:, 1]*px, cadre[2] + c[:, 0]*px], -1)
    sil = [to_mm(c - 1) for c in measure.find_contours(np.pad(hit.astype(float), 1), 0.5) if len(c) > 8]
    lignes = []
    grp = lambda i: -1 if i < 0 else (i if i in (0, 9) else (9 if 90 <= i < 100 else i // 10))
    for idv in np.unique(ident[hit]):
        for c in measure.find_contours((ident == idv).astype(float), 0.5):
            if len(c) < 6: continue
            tg = np.gradient(c, axis=0); nn = np.stack([-tg[:, 1], tg[:, 0]], -1)
            nn /= np.maximum(np.linalg.norm(nn, axis=-1, keepdims=True), 1e-6)
            dA, iA = depth_at(c[:, 0] - 1.6*nn[:, 0], c[:, 1] - 1.6*nn[:, 1])
            dB, iB = depth_at(c[:, 0] + 1.6*nn[:, 0], c[:, 1] + 1.6*nn[:, 1])
            # quel côté est l'intérieur de idv ?
            inA = iA == idv
            dI = np.where(inA, dA, dB); dO = np.where(inA, dB, dA); iO = np.where(inA, iB, iA)
            gI = grp(idv); gO = np.array([grp(x) for x in iO])
            jump = np.abs(dI - dO)
            ok = np.isfinite(dO) & (iO >= 0) & (iO > idv)
            meme = (gO == gI) | (gO == 0) | (gI == 0)
            objet = ((gO == 9) | (gI == 9))
            garder = ok & ~(objet & ~avec_objet) & ((objet & avec_objet) | (gO == 6) | (gI == 6) | (gO == 7) | (gI == 7) | (~meme & (jump > seuil_autre)) | ((gI >= 1) & (gI <= 5) & (gO >= 1) & (gO <= 5) & (gI != gO)) | (meme & (jump > seuil_meme)))
            # bouche les petits trous et enlève les bouts isolés (un trait de notice est continu)
            from scipy.ndimage import binary_closing, binary_opening
            garder = binary_closing(garder, np.ones(9, bool)) & ok
            garder = binary_opening(garder, np.ones(5, bool))
            # découpe en séquences
            run = []
            for k in range(len(c)):
                if garder[k]: run.append(c[k])
                elif run:
                    if len(run)*px > long_min: lignes.append(to_mm(np.array(run)))
                    run = []
            if run and len(run)*px > long_min: lignes.append(to_mm(np.array(run)))
    return sil, lignes

def svg_chemin(pts, ferme=False):
    s = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    return s + (' Z' if ferme else '')
