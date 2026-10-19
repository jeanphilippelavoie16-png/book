"""Les vignettes de fin de page (JP, 19 octobre 2026 : « trop de notes vertes, c'est pas beau non plus, faut trouver une
autre solution pour remplir les vides » ; il a choisi « une vignette » : un petit dessin gravé tiré de l'image du tome,
au centre du vide, comme dans les vieux livres, rien d'écrit).

Chaque vignette est une pastille ronde découpée dans l'image de titre du tome (images/tomes/titre-tome-N.jpg, la linogravure
retenue) : un ovale ou un rond, cerné d'un filet à l'encre du tome et d'un second filet fin à l'extérieur. Les
découpes sont données en coordonnées 768 × 960 (celles des retouches) ; l'image est en 3072 × 3840.

    python3 design/outils/vignettes.py N [--planche essai.png]

Écrit images/tomes/vignettes/tome-N-K.png (fond transparent, 300 ppp à la largeur donnée en pouces).
"""
import os, sys, argparse
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# (nom, boîte x0 y0 x1 y1 en 768 × 960, forme, largeur imprimée en po)
DECOUPES = {
    # JP, 19 octobre 2026 : « c'est les pastilles de rappel de la page principale » : des ronds
    1: [('chalet', (315, 665, 515, 865), 'rond', 1.7),
        ('lune', (480, 350, 690, 560), 'rond', 1.7),
        ('epinettes', (0, 700, 200, 900), 'rond', 1.7),
        ('vallee', (190, 450, 450, 710), 'rond', 1.7)],
}
ENCRE = {1: (10, 26, 41)}      # le ciel des couvertures (couverture.py) : l'encre sombre du tome
PPP = 300

def medaillon(img, boite, forme, largeur_po, encre):
    K = img.width / 768
    x0, y0, x1, y1 = [round(v * K) for v in boite]
    c = img.crop((x0, y0, x1, y1))
    W = round(largeur_po * PPP); H = round(W * c.height / c.width)
    if forme == 'rond':
        H = W
        s = min(c.width, c.height); c = c.crop(((c.width - s) // 2, (c.height - s) // 2, (c.width + s) // 2, (c.height + s) // 2))
    c = c.resize((W, H), Image.LANCZOS)
    m = 4                                         # suréchantillonnage des cercles
    f1 = round(0.012 * PPP)                       # le filet : 0,9 pt
    ecart = round(0.035 * PPP)                    # le second filet, à 2,5 pt
    f2 = max(1, round(0.004 * PPP))               # 0,3 pt
    P = ecart + f2 + 2
    out = Image.new('RGBA', (W + 2 * P, H + 2 * P), (0, 0, 0, 0))
    masque = Image.new('L', ((W) * m, (H) * m), 0)
    ImageDraw.Draw(masque).ellipse((0, 0, W * m - 1, H * m - 1), fill=255)
    masque = masque.resize((W, H), Image.LANCZOS)
    out.paste(c.convert('RGBA'), (P, P), masque)
    traits = Image.new('L', ((W + 2 * P) * m, (H + 2 * P) * m), 0)
    d = ImageDraw.Draw(traits)
    d.ellipse((P * m, P * m, (P + W) * m - 1, (P + H) * m - 1), outline=255, width=f1 * m)
    a = (P - ecart) * m
    d.ellipse((a, a, (W + 2 * P) * m - a - 1, (H + 2 * P) * m - a - 1), outline=255, width=f2 * m)
    traits = traits.resize(out.size, Image.LANCZOS)
    encre_img = Image.new('RGBA', out.size, encre + (255,))
    out = Image.composite(encre_img, out, traits)
    return out

if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('tome', type=int); ap.add_argument('--planche')
    o = ap.parse_args()
    img = Image.open(os.path.join(ROOT, 'images', 'tomes', f'titre-tome-{o.tome}.jpg')).convert('RGB')
    dst = os.path.join(ROOT, 'images', 'tomes', 'vignettes'); os.makedirs(dst, exist_ok=True)
    faits = []
    for k, (nom, boite, forme, lpo) in enumerate(DECOUPES[o.tome], 1):
        v = medaillon(img, boite, forme, lpo, ENCRE[o.tome])
        f = os.path.join(dst, f'tome-{o.tome}-{k}-{nom}.png'); v.save(f, dpi=(PPP, PPP)); faits.append(v)
        print(f, v.size)
    if o.planche:            # les vignettes sur une page blanche, à l'échelle (100 ppp), pour regarder
        e = 100 / PPP
        ims = [v.resize((round(v.width * e), round(v.height * e)), Image.LANCZOS) for v in faits]
        Wp = sum(i.width for i in ims) + 60 * (len(ims) + 1); Hp = max(i.height for i in ims) + 120
        pl = Image.new('RGB', (Wp, Hp), 'white'); x = 60
        for i in ims: pl.paste(i, (x, (Hp - i.height) // 2), i); x += i.width + 60
        pl.save(o.planche)
