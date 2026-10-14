# Monte livre/relecture/site/index.html à partir du gabarit et des rapports d'assemblage des tomes.
# Usage : python3 design/outils/relecture/monter.py 1,2,3,4,5,6 [édition]
import json, os, re, sys
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
dispo = [int(x) for x in sys.argv[1].split(',')]
edition = sys.argv[2] if len(sys.argv) > 2 else '2026-10-14'
tomes = {}
for t in range(1, 7):
    txt = open(f'{R}/livre/tome-{t}/rapport.md', encoding='utf-8').read()
    titre = re.search(r'^# Tome \d+ · (.+?) —', txt, re.M).group(1)
    n = int(re.search(r'(\d+) pages, [\d.]+ Mo', txt).group(1))
    ch = []
    for m in re.finditer(r'^\| (\d+)(?:–(\d+))? \| ch\. ([^|]+?) \| \d+ \|$', txt, re.M):
        num, _, nom = m.group(3).partition(' — ')
        ch.append([int(m.group(1)), int(m.group(2) or m.group(1)), num, nom])
    tomes[t] = {'titre': titre, 'pages': n, 'chapitres': ch}
g = open(f'{R}/design/outils/relecture/gabarit.html', encoding='utf-8').read()
g = g.replace('/*TOMES*/{}', json.dumps(tomes, ensure_ascii=False))
g = g.replace('/*DISPO*/[1]', json.dumps(dispo)).replace('/*EDITION*/', edition)
os.makedirs(f'{R}/livre/relecture/site', exist_ok=True)
open(f'{R}/livre/relecture/site/index.html', 'w', encoding='utf-8').write(g)
print('livre/relecture/site/index.html :', len(g), 'octets, tomes', dispo, 'édition', edition)
