#!/usr/bin/env python3
# Vérifie que chaque ancre des fichiers index/tome-N.json se retrouve UNE fois, et une seule,
# dans le Markdown actuel des chapitres, par la méthode décrite dans index/lisez-moi.md.
#   python index/outils/verifier-ancres.py
import re, os, json, glob, sys

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.normpath(os.path.join(ICI, '..', '..'))
RE_H = re.compile(r'^(#{1,4})\s+(.*?)\s*$')


def trouver(lignes, ancre):
    """Rend la liste des numéros de ligne (1-based) qui correspondent à l'ancre."""
    chemin = ancre['chemin']
    cur = {1: None, 2: None, 3: None, 4: None}
    hits, code = [], False
    for i, l in enumerate(lignes):
        if l.startswith('```'):
            code = not code
            continue
        if code:
            continue
        m = RE_H.match(l)
        if m:
            niv, txt = len(m.group(1)), m.group(2)
            cur[niv] = txt
            for k in range(niv + 1, 5):
                cur[k] = None
            if 'titre' in ancre and txt == ancre['titre'] and niv == ancre['niveau']:
                if [cur[k] for k in (2, 3, 4) if cur[k]] == chemin:
                    hits.append(i + 1)
            continue
        if 'etape' in ancre:
            e = ancre['etape']
            n, lib = e['n'], re.escape(e['libelle'])
            if re.match(rf'^\*\*{n}\.\s+{lib}\*\*', l) or re.match(rf'^{n}\.\s+\*\*{lib}\*\*', l):
                if [cur[k] for k in (2, 3, 4) if cur[k]] == chemin:
                    hits.append(i + 1)
    return hits


def main():
    cache, erreurs, total = {}, 0, 0
    for f in sorted(glob.glob(os.path.join(RACINE, 'index', 'tome-*.json'))):
        d = json.load(open(f, encoding='utf-8'))
        for e in d['entrees']:
            for a in e.get('ancres', []):
                total += 1
                if a['fichier'] not in cache:
                    cache[a['fichier']] = open(os.path.join(RACINE, 'chapitres', a['fichier']), encoding='utf-8').read().split('\n')
                h = trouver(cache[a['fichier']], a)
                if len(h) != 1:
                    erreurs += 1
                    print(f"{os.path.basename(f)} « {e['terme']} » ch. {a['ch']} : {len(h)} correspondance(s) pour {a.get('titre') or a.get('etape')}")
    print(f'{total} ancres vérifiées, {erreurs} en défaut')
    sys.exit(1 if erreurs else 0)


if __name__ == '__main__':
    main()
