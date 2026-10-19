# -*- coding: utf-8 -*-
"""Compte les jetons dépensés par Claude Code sur cet ordinateur, à partir des journaux de session
(~/.claude/projects/*/*.jsonl, agents et workflows compris).

    python design/outils/compter-jetons.py

Chaque appel au modèle est compté une fois (le même message peut s'écrire en plusieurs lignes ; on garde le plus
grand compte de chaque champ). Claude Code efface les journaux de plus de 30 jours par défaut (réglage
cleanupPeriodDays) : les plus vieilles sessions peuvent manquer.
"""
import collections, glob, json, os

RACINE = os.path.join(os.path.expanduser('~'), '.claude', 'projects')
CHAMPS = ('input_tokens', 'cache_creation_input_tokens', 'cache_read_input_tokens', 'output_tokens')
NOMS = {'input_tokens': 'Entrée hors cache', 'cache_creation_input_tokens': 'Contexte écrit en cache',
        'cache_read_input_tokens': 'Contexte relu (cache)', 'output_tokens': 'Produit par Claude'}

appels, jours = {}, collections.Counter()
for f in glob.glob(os.path.join(RACINE, '**', '*.jsonl'), recursive=True):
    with open(f, encoding='utf-8', errors='replace') as fh:
        for ligne in fh:
            if '"usage"' not in ligne:
                continue
            try:
                d = json.loads(ligne)
            except ValueError:
                continue
            m = d.get('message') or {}
            u = m.get('usage')
            if d.get('type') != 'assistant' or not isinstance(u, dict):
                continue
            cle = (m.get('id'), d.get('requestId'))
            c = appels.setdefault(cle, collections.Counter())
            if not c:
                jours[(d.get('timestamp') or '?')[:10]] += 1
            for k in CHAMPS:
                c[k] = max(c[k], u.get(k) or 0)

total = collections.Counter()
for c in appels.values():
    total.update(c)
print('%d appels, du %s au %s' % (len(appels), min(jours), max(jours)) if jours else 'aucun journal trouvé')
for k in CHAMPS:
    print('%-26s %18s' % (NOMS[k], format(total[k], ',').replace(',', ' ')))
print('%-26s %18s' % ('Total', format(sum(total.values()), ',').replace(',', ' ')))
