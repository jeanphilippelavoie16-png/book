"""Les mots qui se chevauchent dans un PDF : deux mots de lignes différentes dont les boîtes se recouvrent nettement
(un tableau sur le texte de l'autre colonne, une note sur un paragraphe). JP, 19 octobre 2026, p. 73 du tome 1 : « on
dirait que le tableau est enligné sur l'autre texte ».

    pdftotext -bbox livre/tome-1-lulu/interieur.pdf /tmp/bbox.html
    python3 design/outils/chevauchements.py /tmp/bbox.html

Ce qui n'est pas une faute et que le script laisse passer : le même mot deux fois au même endroit (le texte des
planches, doublé pour son halo) et les pages d'ouverture de chapitre (le grand numéro passe sous le bandeau, voulu).
"""
import re, sys, collections
html = open(sys.argv[1]).read()
pages = html.split('<page ')[1:]
res = collections.OrderedDict()
for n, pg in enumerate(pages, 1):
    ws = []
    for m in re.finditer(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)</word>', pg):
        x0, y0, x1, y1 = map(float, m.groups()[:4]); ws.append((x0, y0, x1, y1, m.group(5)))
    ws.sort(key=lambda w: w[0])
    paires = []
    for i, a in enumerate(ws):
        for b in ws[i + 1:]:
            if b[0] >= a[2]: break
            ox = min(a[2], b[2]) - max(a[0], b[0]); oy = min(a[3], b[3]) - max(a[1], b[1])
            ha, hb = a[3] - a[1], b[3] - b[1]
            if ox > 1.5 and oy > 0.35 * min(ha, hb) and abs(a[1] - b[1]) > 0.5:
                paires.append((a[4], b[4]))
            elif ox > 0.6 * min(a[2] - a[0], b[2] - b[0]) and oy > 0.6 * min(ha, hb) and a[4] != b[4]:
                paires.append((a[4], b[4]))
    paires = [p for p in paires if p[0] != p[1]]
    ouverture = sum(1 for p in paires if p[1] in ('TO', 'LIEU', 'M', 'E')) >= 3
    if paires and not ouverture and n != 1: res[n] = paires
for n, p in res.items():
    print(n, len(p), p[:4])
print('pages touchées :', len(res))
