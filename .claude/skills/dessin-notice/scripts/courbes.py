"""courbes.py — d'un tracé tremblé à quelques courbes de Bézier franches (algorithme de Schneider).

Un trait d'illustrateur tient en peu de courbes : chaque courbe cubique couvre un long morceau
du contour, et les angles vrais restent des angles. C'est ce qui fait la différence entre un
trait « encré » et un trait décalqué pixel par pixel.

    from courbes import trait_net
    d = trait_net(points, tol=0.9, ferme=True)   # -> chaîne SVG « M … C … Z »
"""
import numpy as np

def _bez(P, t):
    t = np.asarray(t)[:, None]; mt = 1 - t
    return mt**3*P[0] + 3*mt**2*t*P[1] + 3*mt*t**2*P[2] + t**3*P[3]
def _bez1(P, t):
    t = np.asarray(t)[:, None]; mt = 1 - t
    return 3*mt**2*(P[1]-P[0]) + 6*mt*t*(P[2]-P[1]) + 3*t**2*(P[3]-P[2])
def _bez2(P, t):
    t = np.asarray(t)[:, None]
    return 6*(1-t)*(P[2]-2*P[1]+P[0]) + 6*t*(P[3]-2*P[2]+P[1])

def _param(D):
    d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(D, axis=0), axis=1))]
    return d / d[-1] if d[-1] > 0 else d

def _ajuste(D, u, t1, t2):
    A1 = (3*(1-u)**2*u)[:, None]*t1; A2 = (3*(1-u)*u**2)[:, None]*t2
    C = np.array([[np.sum(A1*A1), np.sum(A1*A2)], [np.sum(A1*A2), np.sum(A2*A2)]])
    B0 = _bez(np.array([D[0], D[0], D[-1], D[-1]]), u)
    X = np.array([np.sum(A1*(D-B0)), np.sum(A2*(D-B0))])
    det = C[0, 0]*C[1, 1] - C[0, 1]*C[1, 0]
    seg = np.linalg.norm(D[-1]-D[0])
    if abs(det) > 1e-12:
        a1 = (X[0]*C[1, 1] - X[1]*C[0, 1]) / det; a2 = (C[0, 0]*X[1] - C[1, 0]*X[0]) / det
    else: a1 = a2 = seg/3
    if a1 < 1e-3*seg or a2 < 1e-3*seg: a1 = a2 = seg/3
    return np.array([D[0], D[0]+a1*t1, D[-1]+a2*t2, D[-1]])

def _newton(P, D, u):
    q = _bez(P, u) - D; q1 = _bez1(P, u); q2 = _bez2(P, u)
    num = np.sum(q*q1, 1); den = np.sum(q1*q1, 1) + np.sum(q*q2, 1)
    return np.clip(np.where(np.abs(den) > 1e-12, u - num/den, u), 0, 1)

def _fit(D, t1, t2, tol, out):
    if len(D) == 2:
        dist = np.linalg.norm(D[1]-D[0])/3
        out.append(np.array([D[0], D[0]+t1*dist, D[1]+t2*dist, D[1]])); return
    u = _param(D); P = _ajuste(D, u, t1, t2)
    err = np.linalg.norm(_bez(P, u) - D, axis=1); i = int(np.argmax(err))
    if err[i] < tol: out.append(P); return
    if err[i] < tol*4:
        for _ in range(12):
            u = _newton(P, D, u); P = _ajuste(D, u, t1, t2)
            err = np.linalg.norm(_bez(P, u) - D, axis=1); i = int(np.argmax(err))
            if err[i] < tol: out.append(P); return
    i = min(max(i, 1), len(D)-2)
    tc = D[i-1] - D[i+1]; tc /= np.linalg.norm(tc) + 1e-12
    _fit(D[:i+1], t1, tc, tol, out); _fit(D[i:], -tc, t2, tol, out)

def _unit(v): return v / (np.linalg.norm(v) + 1e-12)

def coins(D, angle=55, pas=6):
    """Indices des angles vrais (changement de direction > angle°, mesuré sur ±pas points)."""
    n = len(D); res = []
    for i in range(pas, n-pas):
        a = _unit(D[i]-D[i-pas]); b = _unit(D[i+pas]-D[i])
        if np.degrees(np.arccos(np.clip(a@b, -1, 1))) > angle: res.append(i)
    # garder un seul indice par grappe
    out = []
    for i in res:
        if not out or i - out[-1] > 2*pas: out.append(i)
    return out

def reechantillonner(D, pas=0.6):
    d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(D, axis=0), axis=1))]
    if d[-1] < pas*3: return D
    s = np.arange(0, d[-1], pas)
    return np.stack([np.interp(s, d, D[:, 0]), np.interp(s, d, D[:, 1])], 1)

def adoucir(D, sigma_mm=1.2, pas=0.6, ferme=False):
    from scipy.ndimage import gaussian_filter1d
    s = sigma_mm/pas; mode = 'wrap' if ferme else 'nearest'
    E = np.stack([gaussian_filter1d(D[:, 0], s, mode=mode), gaussian_filter1d(D[:, 1], s, mode=mode)], 1)
    if not ferme: E[0] = D[0]; E[-1] = D[-1]
    return E

def courbes(D, tol=0.9, ferme=False, angle=55, sigma=1.2):
    """Liste de courbes cubiques (4 points chacune) qui suivent D à tol près."""
    D = np.asarray(D, float)
    if ferme and np.linalg.norm(D[0]-D[-1]) < 1e-6: D = D[:-1]
    D = reechantillonner(np.vstack([D, D[:1]]) if ferme else D)
    if ferme: D = D[:-1]
    D = adoucir(D, sigma, ferme=ferme)
    if ferme and np.linalg.norm(D[0]-D[-1]) > 1e-6: D = np.vstack([D, D[:1]])
    cs = coins(D, angle)
    if ferme:
        if cs:   # repartir d'un coin
            k = cs[0]; D = np.vstack([D[k:-1], D[:k+1]]); cs = [c - k if c >= k else c - k + len(D) - 1 for c in cs]
        else:
            k = len(D)//2; cs = [k]
    bornes = [0] + sorted(c for c in cs if 0 < c < len(D)-1) + [len(D)-1]
    out = []
    for a, b in zip(bornes[:-1], bornes[1:]):
        seg = D[a:b+1]
        if len(seg) < 2: continue
        t1 = _unit(seg[min(2, len(seg)-1)] - seg[0]); t2 = _unit(seg[max(-3, -len(seg))] - seg[-1])
        if not (a in cs or a == 0 and not ferme):   # tangente continue sur une jointure lisse
            pass
        _fit(seg, t1, t2, tol, out)
    return out

def svg_d(cs, ferme=False, k=1.0):
    if not cs: return ''
    s = f'M{cs[0][0][0]*k:.2f},{cs[0][0][1]*k:.2f}'
    for P in cs: s += f' C{P[1][0]*k:.2f},{P[1][1]*k:.2f} {P[2][0]*k:.2f},{P[2][1]*k:.2f} {P[3][0]*k:.2f},{P[3][1]*k:.2f}'
    return s + (' Z' if ferme else '')

def trait_net(D, tol=0.9, ferme=False, angle=55):
    return svg_d(courbes(D, tol, ferme, angle), ferme)
