"""Aperçu de la page de titre du tome 3 avec une image candidate : le titre, le sous-titre et la série des tomes posés
avec les règles CSS de design/outils/assembler-tome.py (page de titre), pour juger la lisibilité. Le sous-titre est
un texte provisoire. Ne sert qu'à juger ; rien de ceci n'entre dans le livre.
    python3 apercu_titre.py image.png sortie.png [dossier des polices Barlow Condensed]"""
import os, subprocess, sys, tempfile, glob
from PIL import Image

img, out = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
pol = sys.argv[3] if len(sys.argv) > 3 else None
faces = ""
if pol:
    for f in sorted(glob.glob(os.path.join(pol, "barlow-*.woff2"))):
        w = f.rsplit("-", 1)[1].split(".")[0]
        faces += f"@font-face{{font-family:'Barlow Condensed';font-weight:{w};src:url('file://{f}') format('woff2')}}\n"
tomes = ["Tenir", "Le corps", "Prélever", "De la bête au garde-manger", "La forêt, le jardin et le chalet", "L'atelier"]
serie = "".join(f'<div class="{"on" if i == 3 else ""}"><i>{i}</i><span>{n}</span></div>' for i, n in enumerate(tomes, 1))
html = f"""<!doctype html><html><head><meta charset="utf-8"><style>{faces}
body{{margin:0;width:780px;height:984px;position:relative;overflow:hidden;background:#15222B}}
.tp-img{{position:absolute;left:0;top:0;width:780px;height:984px;object-fit:cover;object-position:center top;display:block}}
.tp-sc{{position:absolute;left:0;top:12px;width:768px;height:960px;font-family:"Barlow Condensed",sans-serif}}
.tp-head{{position:absolute;left:56px;right:56px;top:52px;display:flex;justify-content:space-between;padding-bottom:12px;
  border-bottom:1px solid #4A6476;color:#E2E7EA;font-weight:600;font-size:16px;letter-spacing:.24em;text-transform:uppercase}}
.tp-haut{{position:absolute;left:50px;right:56px;top:104px;display:flex;flex-direction:column;color:#E2E7EA}}
.tp-title{{margin:0;font-weight:800;font-size:var(--tpt,236px);line-height:.84;letter-spacing:.01em;text-transform:uppercase}}
.tp-sous{{margin:26px 0 0 8px;max-width:380px;font-weight:500;font-size:23px;line-height:1.28;letter-spacing:.01em;color:#B9C7D1}}
.tp-bas{{position:absolute;left:176px;right:176px;bottom:40px;display:flex;flex-direction:column;gap:12px;color:#15222B}}
.tp-chap{{display:flex;justify-content:space-between;font-weight:700;font-size:14px;letter-spacing:.16em;text-transform:uppercase}}
.tp-serie{{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;font-weight:600;font-size:10.5px;line-height:1.15;letter-spacing:.03em;text-transform:uppercase}}
.tp-serie div{{display:flex;flex-direction:column;gap:4px}}
.tp-serie i{{display:block;height:20px;border:1px solid #15222B;font-style:normal;font-size:13px;line-height:20px;padding-left:6px}}
.tp-serie div.on i{{height:22px;border:0;background:#15222B;color:#fff;line-height:22px}}
</style></head><body><img class="tp-img" src="file://{img}"><div class="tp-sc">
<div class="tp-head"><span>Le Manuel du Nord</span><span>Tome 3</span></div>
<div class="tp-haut"><h1 class="tp-title">Prélever</h1><p class="tp-sous">(sous-titre provisoire) Lire le territoire, pister, le petit gibier, l'ours, le phoque, la truite, la pêche blanche.</p></div>
<div class="tp-bas"><div class="tp-chap"><span>Chapitres 41 à 60</span><span>20 chapitres</span></div><div class="tp-serie">{serie}</div></div></div>
<script>document.fonts.ready.then(()=>{{const h=document.querySelector('.tp-title');
for(let px=236;px>=60;px-=4){{h.style.setProperty('--tpt',px+'px');if(h.scrollWidth<=h.clientWidth+0.5&&h.getBoundingClientRect().height<=2*px*0.84+1)break;}}}});</script>
</body></html>"""
d = tempfile.mkdtemp()
open(os.path.join(d, "p.html"), "w", encoding="utf-8").write(html)
ch = sorted(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome"))[-1]
subprocess.run([ch, "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                "--virtual-time-budget=4000", "--window-size=780,1200", f"--screenshot={d}/s.png", f"file://{d}/p.html"],
               capture_output=True)
Image.open(f"{d}/s.png").convert("RGB").crop((0, 12, 768, 972)).save(out)
print(out)
