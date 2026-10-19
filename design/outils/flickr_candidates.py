"""Les candidates « wow » de Flickr, sans clé d'API (JP, 19 octobre 2026 : « je veux des belles photos » ; la clé d'API
demande le plan Pro, JP a choisi « Flickr sans clé »). Lit les pages de recherche publiques de Flickr (triées par
« interestingness », licences Creative Commons seulement), garde les photos dont la licence permet le recadrage (pas de
« ND »), et fait des planches contact numérotées pour que JP choisisse. Rien ne se télécharge en pleine résolution ici.

    python3 design/outils/flickr_candidates.py DOSSIER "requête 1" "requête 2" ...

Écrit DOSSIER/candidates.json et DOSSIER/planche-NN.jpg (20 photos par planche).
"""
import os, re, sys, json, time, subprocess, urllib.parse
from PIL import Image, ImageDraw, ImageFont

UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
LICENCES = {1: 'CC BY-NC-SA 2.0', 2: 'CC BY-NC 2.0', 4: 'CC BY 2.0', 5: 'CC BY-SA 2.0', 9: 'CC0', 10: 'Marque du domaine public'}

def page(q, n=1):
    url = 'https://www.flickr.com/search/?' + urllib.parse.urlencode(
        dict(text=q, license='1,2,4,5,9,10', sort='interestingness-desc', media='photos', page=n))
    s = subprocess.run(['curl', '-sS', '-L', '-m', '40', '-A', UA, url], capture_output=True, text=True).stdout
    m = re.search(r'modelExport:\s*(\{.*?\}),\s*auth:', s, re.S)
    if not m:
        return []
    out = []
    def walk(o):
        if isinstance(o, dict):
            if 'sizes' in o and 'license' in o and 'id' in o:
                out.append(o)
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)
    walk(json.loads(m.group(1)))
    return out

def main():
    dst, reqs = sys.argv[1], sys.argv[2:]
    os.makedirs(os.path.join(dst, 'apercus'), exist_ok=True)
    vus, cands = set(), []
    for q in reqs:
        for n in (1, 2):
            for o in page(q, n):
                if o['id'] in vus or o.get('license') not in LICENCES:
                    continue
                sz = o['sizes'].get('data', {})
                if not sz:
                    continue
                w, k = max((v['data']['width'], k) for k, v in sz.items())
                v = sz[k]['data']
                vus.add(o['id'])
                cands.append(dict(id=o['id'], owner=o.get('ownerNsid'), titre=o.get('title', ''), licence=LICENCES[o['license']],
                                  requete=q, apercu='https:' + v['url'], w=v['width'], h=v['height'],
                                  page=f"https://www.flickr.com/photos/{o.get('ownerNsid')}/{o['id']}/"))
            time.sleep(2)
        print(q, len(cands), flush=True)
    for c in cands:
        f = os.path.join(dst, 'apercus', c['id'] + '.jpg')
        if not os.path.exists(f):
            subprocess.run(['curl', '-sS', '-m', '40', '-A', UA, '-o', f, c['apercu']])
            time.sleep(0.3)
    json.dump(cands, open(os.path.join(dst, 'candidates.json'), 'w'), ensure_ascii=False, indent=1)
    fnt = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 26)
    W, H, cols = 420, 300, 5
    for p in range(0, len(cands), 20):
        lot = cands[p:p + 20]
        pl = Image.new('RGB', (cols * (W + 8) + 8, 4 * (H + 8) + 8), 'white'); d = ImageDraw.Draw(pl)
        for i, c in enumerate(lot):
            try:
                im = Image.open(os.path.join(dst, 'apercus', c['id'] + '.jpg')).convert('RGB')
            except Exception:
                continue
            im.thumbnail((W, H)); x = 8 + (i % cols) * (W + 8); y = 8 + (i // cols) * (H + 8)
            pl.paste(im, (x + (W - im.width) // 2, y + (H - im.height) // 2))
            c['no'] = p + i + 1
            d.rectangle((x, y, x + 52, y + 34), fill='black'); d.text((x + 6, y + 3), str(p + i + 1), fill='white', font=fnt)
        pl.save(os.path.join(dst, f'planche-{p // 20 + 1:02d}.jpg'), quality=82)
    json.dump(cands, open(os.path.join(dst, 'candidates.json'), 'w'), ensure_ascii=False, indent=1)
    print('candidates :', len(cands))

if __name__ == '__main__':
    main()
