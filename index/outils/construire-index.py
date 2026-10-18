#!/usr/bin/env python3
# Construit l'index du Manuel du Nord : un fichier par tome et l'index général.
#
#   python index/outils/construire-index.py            -> écrit index/tome-1.json ... tome-6.json et index/general.json
#   python index/outils/construire-index.py --rapport  -> écrit aussi index/outils/rapport.txt (entrées vides, entrées trop larges)
#
# Le vocabulaire (ce qu'on indexe, et comment on le reconnaît dans le texte) est dans
# index/vocabulaire.txt. Ce script ne choisit pas les mots : il trouve où ils sont.
# Les ancres sont les titres (#, ##, ###, ####) et les étapes à libellé gras
# (« **5. Calculer.** » ou « 5. **Calculer.** ») des sections 5 et 9, tels qu'écrits dans le
# Markdown. Relancer le script après une réécriture de chapitre remet les ancres à jour.

import re, os, sys, json, glob, unicodedata, datetime

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.normpath(os.path.join(ICI, '..', '..'))
CHAP = os.path.join(RACINE, 'chapitres')
SORTIE = os.path.join(RACINE, 'index')
VOCAB = os.path.join(SORTIE, 'vocabulaire.txt')

TOMES = {1: 'Tenir', 2: 'Le corps', 3: 'Prélever', 4: 'De la bête au garde-manger',
         5: 'La forêt, le jardin et le chalet', 6: "L'atelier"}

MAX_ANCRES = 6
DEBUG = '--debug' in sys.argv
SEUIL = 3.0          # score minimal d'une ancre
SEUIL_FORT = 1.0     # score minimal quand le chapitre est désigné « fort » pour le terme
SEUIL_ENTREE = 4.5   # un tome sans chapitre fort pour ce terme ne le reçoit que sur une mention franche
# Le chapitre d'achat (00b) nomme presque tout une fois : il pèse moitié moins.
POIDS_CHAPITRE = {'00b': 0.5}


def tome_de(num):
    if num in ('00', '00b'):
        return 1
    n = int(num)
    return 1 if n <= 18 else 2 if n <= 40 else 3 if n <= 60 else 4 if n <= 81 else 5 if n <= 101 else 6


def cle_num(num):
    return -1 if num == '00' else (-0.5 if num == '00b' else int(num))


def norm(s):
    s = s.replace('’', "'").replace(' ', ' ').replace(' ', ' ')
    s = s.replace('œ', 'oe').replace('Œ', 'OE').replace('æ', 'ae').replace('Æ', 'AE')
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = s.replace('*', '').replace('_', ' ')
    return s.lower()


def brut(s):
    # texte en minuscules, accents gardés : pour les motifs qui commencent par « ~ » (maïs / mais)
    s = s.replace('’', "'").replace(' ', ' ').replace(' ', ' ').replace('*', '')
    return s.lower()


# ---------------------------------------------------------------- carte des ancres
RE_H = re.compile(r'^(#{1,4})\s+(.*?)\s*$')
RE_E1 = re.compile(r'^\*\*(\d+)\.\s+(.+?)\*\*')
RE_E2 = re.compile(r'^(\d+)\.\s+\*\*(.+?)\*\*')
RE_NOTE = re.compile(r'^\[\^[^\]]+\]:')


def section_a_etapes(h2):
    if not h2:
        return False
    t = h2.lower()
    return bool(re.match(r'^(5|9)[\.\s]', t)) or 'procédure' in t or 'variante' in t


def poids_section(h2):
    if not h2:
        return 0.7
    m = re.match(r'^(\d+)\.', h2)
    if not m:
        return 1.0
    return {'1': 0.3, '2': 0.6, '3': 1.0, '4': 0.35, '5': 1.15, '6': 0.8, '7': 0.9,
            '8': 1.15, '9': 1.15}.get(m.group(1), 1.0)


def lire_chapitre(chemin):
    num = os.path.basename(chemin).split('-')[0]
    lignes = open(chemin, encoding='utf-8').read().split('\n')
    ancres, cur, code = [], {1: None, 2: None, 3: None, 4: None}, False
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
            ancres.append({'type': 'titre', 'niveau': niv, 'texte': txt, 'ligne': i + 1,
                           'chemin': [cur[k] for k in (2, 3, 4) if cur[k]], 'h2': cur[2]})
            continue
        m = RE_E1.match(l) or RE_E2.match(l)
        if m and section_a_etapes(cur[2]):
            ancres.append({'type': 'etape', 'n': int(m.group(1)), 'texte': m.group(2).strip(),
                           'ligne': i + 1, 'chemin': [cur[k] for k in (2, 3, 4) if cur[k]], 'h2': cur[2]})
    for k, a in enumerate(ancres):
        fin = ancres[k + 1]['ligne'] - 1 if k + 1 < len(ancres) else len(lignes)
        corps = [x for x in lignes[a['ligne']:fin] if not RE_NOTE.match(x)]
        a['corps_n'] = norm(' '.join(corps))
        a['corps_b'] = brut(' '.join(corps))
        a['etiquette_n'] = norm(a['texte'])
        a['etiquette_b'] = brut(a['texte'])
        a['poids'] = poids_section(a['h2'])
    titre = ancres[0]['texte'] if ancres and ancres[0]['type'] == 'titre' and ancres[0]['niveau'] == 1 else num
    return num, {'fichier': os.path.basename(chemin), 'tome': tome_de(num), 'titre': titre,
                 'titre_n': norm(titre), 'titre_b': brut(titre), 'ancres': ancres}


# ---------------------------------------------------------------- vocabulaire
def lire_vocabulaire():
    entrees, renvois = [], []
    for no, l in enumerate(open(VOCAB, encoding='utf-8'), 1):
        l = l.rstrip('\n')
        if not l.strip() or l.lstrip().startswith('#'):
            continue
        if '->' in l and not re.search(r'\s\|\s', l):
            t, cibles = l.split('->', 1)
            renvois.append({'terme': t.strip(), 'voir': [c.strip() for c in cibles.split(';') if c.strip()]})
            continue
        champs = [c.strip() for c in re.split(r'\s\|\s', l)]
        while len(champs) < 5:
            champs.append('')
        terme, motifs, voir, forts, tomes = champs[:5]
        latin = None
        m = re.match(r'^(.*?)\s*\[(.+?)\]\s*$', terme)
        if m:
            terme, latin = m.group(1), m.group(2)
        pats = [p.strip() for p in motifs.split(';') if p.strip()] or [re.escape(norm(terme))]
        try:
            rx = [(True, re.compile(p[1:].strip())) if p.startswith('~') else (False, re.compile(p)) for p in pats]
        except re.error as e:
            sys.exit(f'vocabulaire.txt ligne {no} : motif invalide ({e})')
        entrees.append({'terme': terme + (f' ({latin})' if latin else ''), 'latin': latin, 'rx': rx,
                        'voir': [v.strip() for v in voir.split(';') if v.strip()],
                        'forts': [f.strip() for f in forts.split(',') if f.strip()],
                        'tomes': [int(t) for t in tomes.split(',') if t.strip()], 'ligne': no})
    return entrees, renvois


def compter(rx, texte_n, texte_b):
    return sum(len(r.findall(texte_b if b else texte_n)) for b, r in rx)


def ancre_sortie(num, c, a, score=None):
    d = {'ch': num, 'fichier': c['fichier']}
    if a['type'] == 'titre':
        d['titre'] = a['texte']
        d['niveau'] = a['niveau']
    else:
        d['etape'] = {'n': a['n'], 'libelle': a['texte']}
    d['chemin'] = a['chemin']
    d['ligne'] = a['ligne']
    if score is not None and DEBUG:
        d['score'] = round(score, 1)
    return d


def ancres_pour(e, chapitres, carte):
    cands = []
    for num in chapitres:
        c = carte[num]
        fac = POIDS_CHAPITRE.get(num, 1.0)
        if e['forts'] and num in e['forts']:
            fac = 2.0 if num == e['forts'][0] else 1.5
        if compter(e['rx'], c['titre_n'], c['titre_b']):
            fac *= 1.5
        for idx, a in enumerate(c['ancres']):
            lab = 1 if compter(e['rx'], a['etiquette_n'], a['etiquette_b']) else 0
            corps = min(compter(e['rx'], a['corps_n'], a['corps_b']), 8)
            if not lab and not corps:
                continue
            s = a['poids'] * (corps + 6 * lab) * fac
            seuil = SEUIL_FORT if num in e['forts'] else SEUIL
            if s >= seuil:
                cands.append((s, num, idx))
    cands.sort(key=lambda x: (-x[0], cle_num(x[1]), x[2]))
    choisis, parch = [], {}
    for s, num, idx in cands:
        lim = 3 if (e['forts'] and num == e['forts'][0]) else 2
        if parch.get(num, 0) >= lim:
            continue
        a = carte[num]['ancres'][idx]
        conflit = False
        for s2, n2, i2 in choisis:
            if n2 != num:
                continue
            b = carte[num]['ancres'][i2]
            # une étape et le titre qui la porte : une seule des deux
            if a['type'] == 'etape' and b['type'] == 'titre' and a['chemin'] and a['chemin'][-1] == b['texte']:
                conflit = True
            if b['type'] == 'etape' and a['type'] == 'titre' and b['chemin'] and b['chemin'][-1] == a['texte']:
                conflit = True
        if conflit:
            continue
        choisis.append((s, num, idx))
        parch[num] = parch.get(num, 0) + 1
        if len(choisis) >= MAX_ANCRES:
            break
    return choisis


def cle_tri(t):
    return re.sub(r"^(l'|le |la |les )", '', norm(t))


def main():
    rapport = '--rapport' in sys.argv
    carte = {}
    for f in sorted(glob.glob(os.path.join(CHAP, '*.md'))):
        num, c = lire_chapitre(f)
        carte[num] = c
    entrees, renvois = lire_vocabulaire()
    noms = [e['terme'] for e in entrees]
    doublons = {n for n in noms if noms.count(n) > 1}
    if doublons:
        sys.exit('Termes en double dans vocabulaire.txt : ' + ', '.join(sorted(doublons)))
    # un renvoi peut nommer le terme sans son nom latin : « Gélinotte huppée »
    complet = {}
    for e in entrees:
        complet[e['terme']] = e['terme']
    for e in entrees:
        sans_latin = e['terme'][:-(len(e['latin']) + 3)] if e['latin'] else e['terme']
        complet.setdefault(sans_latin, e['terme'])
        complet.setdefault(re.sub(r'\s*\([^)]*\)', '', e['terme']).strip(), e['terme'])
        complet.setdefault(sans_latin.split(', ')[0], e['terme'])
    inconnus = []
    for e in entrees:
        inconnus += [f"{e['terme']} -> {v}" for v in e['voir'] if v not in complet]
        e['voir'] = [complet[v] for v in e['voir'] if v in complet]
    for r in renvois:
        inconnus += [f"{r['terme']} -> {v}" for v in r['voir'] if v not in complet]
        r['voir'] = [complet[v] for v in r['voir'] if v in complet]
    if inconnus:
        print('Renvois vers un terme absent du vocabulaire :\n  ' + '\n  '.join(inconnus))
    par_tome = {t: [n for n in sorted(carte, key=cle_num) if carte[n]['tome'] == t] for t in TOMES}
    trouve = {}   # terme -> {tome: [(score, num, idx)]}
    for e in entrees:
        trouve[e['terme']] = {}
        for t in TOMES:
            if e['tomes'] and t not in e['tomes']:
                continue
            ch = ancres_pour(e, par_tome[t], carte)
            if ch and not any(carte[n]['tome'] == t for n in e['forts']) and ch[0][0] < SEUIL_ENTREE:
                ch = []
            if ch:
                trouve[e['terme']][t] = ch
    # présence par tome, pour les renvois
    presents = {t: {e['terme'] for e in entrees if t in trouve[e['terme']]} for t in TOMES}
    date = datetime.date.today().isoformat()
    general = []
    for t in TOMES:
        sortie = []
        for e in entrees:
            ch = trouve[e['terme']].get(t)
            if not ch:
                continue
            ici = [v for v in e['voir'] if v in presents[t]]
            ailleurs = []
            for v in e['voir']:
                if v in presents[t]:
                    continue
                tt = [u for u in TOMES if v in presents[u]]
                if tt:
                    ailleurs.append({'terme': v, 'tomes': tt})
            d = {'terme': e['terme']}
            if e['latin']:
                d['latin'] = e['latin']
            d['voir_aussi'] = ici
            if ailleurs:
                d['voir_aussi_ailleurs'] = ailleurs
            d['ancres'] = [ancre_sortie(num, carte[num], carte[num]['ancres'][idx], s) for s, num, idx in ch]
            sortie.append(d)
        for r in renvois:
            cibles = [v for v in r['voir'] if v in presents[t]]
            if cibles:
                sortie.append({'terme': r['terme'], 'voir': cibles})
        sortie.sort(key=lambda d: cle_tri(d['terme']))
        doc = {'tome': t, 'titre': TOMES[t], 'chapitres': par_tome[t], 'etabli_le': date,
               'nombre_entrees': len(sortie), 'entrees': sortie}
        with open(os.path.join(SORTIE, f'tome-{t}.json'), 'w', encoding='utf-8') as o:
            json.dump(doc, o, ensure_ascii=False, indent=1)
            o.write('\n')
        print(f'tome {t} : {len(sortie)} entrées')
    # index général
    for e in entrees:
        tt = trouve[e['terme']]
        if not tt:
            continue
        def force(t):
            base = sum(s for s, _, _ in tt[t])
            if e['forts'] and carte.get(e['forts'][0], {}).get('tome') == t:
                base += 1000
            return base
        ordre = sorted(tt, key=lambda t: -force(t))
        lignes = []
        for t in ordre:
            chs = []
            for s, num, idx in tt[t]:
                if num not in chs:
                    chs.append(num)
            # chapitres en ordre de numéro ; « principal » = celui qui porte le mieux le terme dans ce tome
            lignes.append({'tome': t, 'chapitres': sorted(chs, key=cle_num), 'principal': chs[0]})
        d = {'terme': e['terme']}
        if e['latin']:
            d['latin'] = e['latin']
        d['tomes'] = lignes
        general.append(d)
    tous = set().union(*presents.values())
    for r in renvois:
        cibles = [v for v in r['voir'] if v in tous]
        if cibles:
            general.append({'terme': r['terme'], 'voir': cibles})
    general.sort(key=lambda d: cle_tri(d['terme']))
    with open(os.path.join(SORTIE, 'general.json'), 'w', encoding='utf-8') as o:
        json.dump({'titre': 'Table générale des six tomes', 'etabli_le': date,
                   'nombre_entrees': len(general), 'entrees': general}, o, ensure_ascii=False, indent=1)
        o.write('\n')
    print(f'général : {len(general)} entrées')
    if rapport:
        with open(os.path.join(ICI, 'rapport.txt'), 'w', encoding='utf-8') as o:
            vides = [e for e in entrees if not trouve[e['terme']]]
            o.write(f'ENTRÉES SANS AUCUNE ANCRE ({len(vides)})\n')
            for e in vides:
                o.write(f"  l.{e['ligne']} {e['terme']}\n")
            o.write('\nENTRÉES PRÉSENTES DANS 5 TOMES OU PLUS (trop larges ?)\n')
            for e in entrees:
                if len(trouve[e['terme']]) >= 5:
                    o.write(f"  {e['terme']} : tomes {sorted(trouve[e['terme']])}\n")
            o.write('\nRENVOIS SANS CIBLE\n')
            for e in entrees:
                for v in e['voir']:
                    if v not in tous:
                        o.write(f"  {e['terme']} -> {v}\n")
            for r in renvois:
                for v in r['voir']:
                    if v not in tous:
                        o.write(f"  {r['terme']} -> {v}\n")


if __name__ == '__main__':
    main()
