# Pose les notes de JP (traits au crayon et note écrite) sur l'image de la page, pour que Claude les lise.
# 1. ArtifactData list, collection « annotations », out_dir livre/relecture/db  (un JSON par page annotée)
# 2. python3 design/outils/relecture/notes-sur-pages.py [--tome N] [--tout]
#    → livre/relecture/notes/tN-pNNN.png, plus livre/relecture/notes/index.md
# --tout montre aussi les traits déjà appliqués (en vert pâle).
import glob, json, os, sys, textwrap
from PIL import Image, ImageChops, ImageDraw, ImageFont
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
O = f'{R}/livre/relecture'
W, H, PAR, K = 1100, 1375, 5, 1100 / 1000   # K : px par unité de page (largeur 1000)
args = sys.argv[1:]
tome = int(args[args.index('--tome') + 1]) if '--tome' in args else None
tout = '--tout' in args

def charger(f):
    o = json.load(open(f, encoding='utf-8'))
    return o['data'] if 'traits' not in o and isinstance(o.get('data'), dict) else o

def page(t, p):
    k, j = (p - 1) // PAR, (p - 1) % PAR
    return Image.open(f'{O}/site/pages/t{t}/{k:03d}.webp').convert('RGB').crop((0, j * H, W, (j + 1) * H))

def police(taille):
    for f in ('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'):
        if os.path.exists(f): return ImageFont.truetype(f, taille)
    return ImageFont.load_default()

docs = [charger(f) for f in glob.glob(f'{O}/db/**/*.json', recursive=True)]
docs = [d for d in docs if 'tome' in d and (tome is None or d['tome'] == tome)]
docs.sort(key=lambda d: (d['tome'], d['page']))
os.makedirs(f'{O}/notes', exist_ok=True)
lignes = ['# Notes de JP\n', '| Page | Traits à faire | Note | Image |', '| --- | ---: | --- | --- |']
for d in docs:
    traits = [t for t in d.get('traits', []) if tout or not t.get('f')]
    note = (d.get('note') or '').strip() if (tout or not d.get('noteFaite')) else ''
    if not traits and not note: continue
    im = page(d['tome'], d['page'])
    calque = Image.new('RGB', im.size, 'white'); dr = ImageDraw.Draw(calque)
    for t in sorted(traits, key=lambda t: t.get('o') != 'h'):   # surligneur d'abord, stylo par-dessus
        pts = [tuple(int(v) / 10 * K for v in c.split(',')) for c in t['p'].split()]
        coul = ('#D9F2DF' if t['o'] == 'h' else '#7BBF92') if t.get('f') else t['c']
        w = max(1, round(t['w'] * K))
        if len(pts) == 1: x, y = pts[0]; dr.ellipse((x - w / 2, y - w / 2, x + w / 2, y + w / 2), fill=coul)
        else: dr.line(pts, fill=coul, width=w, joint='curve')
    im = ImageChops.multiply(im, calque)
    if note:
        f = police(26); txt = textwrap.wrap('Note : ' + note, 70)
        bas = Image.new('RGB', (W, 30 + 36 * len(txt)), '#FFF6D6'); db = ImageDraw.Draw(bas)
        for i, l in enumerate(txt): db.text((24, 15 + 36 * i), l, fill='#1A2228', font=f)
        tot = Image.new('RGB', (W, H + bas.height), 'white'); tot.paste(im, (0, 0)); tot.paste(bas, (0, H)); im = tot
    nom = f"t{d['tome']}-p{d['page']:03d}.png"
    im.save(f'{O}/notes/{nom}')
    lignes.append(f"| T{d['tome']} p. {d['page']} | {sum(not t.get('f') for t in traits)} | {note.replace('|', '/')[:80]} | {nom} |")
open(f'{O}/notes/index.md', 'w', encoding='utf-8').write('\n'.join(lignes) + '\n')
print(len(lignes) - 3, 'page(s) annotée(s) dans livre/relecture/notes/')
