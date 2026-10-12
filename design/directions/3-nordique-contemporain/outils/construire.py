# -*- coding: utf-8 -*-
"""Compose interieur.html a partir du gabarit et des vrais fichiers .md du livre.

Le texte n'est jamais recopie a la main : les marqueurs {{65:5A:b0:i0-3}} du gabarit
tirent les blocs directement de chapitres/65-fumage-a-froid.md au moment de la
construction. Puis deux passes : typographie francaise (espaces fines insecables,
apostrophe, signe moins) et cesure (tirets conditionnels, dictionnaire fr).
"""
import re, sys, html, pathlib
import pyphen

ICI = pathlib.Path(__file__).resolve().parent
DIR = ICI.parent
LIVRE = DIR.parents[2]
CHAP = {'65': LIVRE / 'chapitres' / '65-fumage-a-froid.md',
        '00': LIVRE / 'chapitres' / '00-le-chapitre-principal.md'}

NNBSP, NBSP, SHY = ' ', ' ', '­'
HY = pyphen.Pyphen(lang='fr_FR', left=3, right=3)


# ---------------------------------------------------------------- markdown
def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'(?<!`)\[(À VÉRIFIER[^\]]*)\](?!`)', r'<span class="av">[\1]</span>', s)
    s = re.sub(r'`\[(À VÉRIFIER)\]`', r'<span class="av nw">[\1]</span>', s)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<em>\1</em>', s)
    return s


def sections(md):
    secs, cur, sec = {}, None, None
    for ln in md.split('\n'):
        m = re.match(r'^## (\d+)\. (.*)', ln)
        if m:
            sec = cur = m.group(1)
            secs[cur] = {'title': m.group(2).strip(), 'lines': []}
            continue
        if ln.startswith('## '):
            cur = None
            continue
        m = re.match(r'^### (.*)', ln)
        if m and sec and not ln.startswith('> '):
            t = m.group(1)
            mm = re.match(r'^([A-Z]) — (.*)', t)
            if mm:
                cur = sec + mm.group(1)
                title = mm.group(2)
            else:
                n = 1 + sum(1 for k in secs if k.startswith(sec + '.'))
                cur = f'{sec}.{n}'
                title = t
            secs[cur] = {'title': title, 'lines': []}
            continue
        if cur:
            secs[cur]['lines'].append(ln)
    return secs


def blocks(lines):
    out, i = [], 0
    while i < len(lines):
        ln = lines[i]
        if not ln.strip() or ln.strip() == '---':
            i += 1
            continue
        if ln.startswith('|'):
            tb = []
            while i < len(lines) and lines[i].startswith('|'):
                tb.append(lines[i]); i += 1
            out.append(('table', tb)); continue
        if ln.startswith('>'):
            q = []
            while i < len(lines) and lines[i].startswith('>'):
                q.append(re.sub(r'^> ?', '', lines[i])); i += 1
            out.append(('quote', q)); continue
        if ln.startswith('- '):
            items = []
            while i < len(lines) and (lines[i].startswith('- ') or (lines[i].startswith(' ') and lines[i].strip())):
                if lines[i].startswith('- '):
                    items.append(lines[i][2:])
                else:
                    items[-1] += ' ' + lines[i].strip()
                i += 1
            out.append(('ul', items)); continue
        if re.match(r'^\d+\. ', ln):
            items = []
            while i < len(lines) and (re.match(r'^\d+\. ', lines[i]) or (lines[i].startswith(' ') and lines[i].strip())):
                m = re.match(r'^(\d+)\. (.*)', lines[i])
                s = lines[i].strip()
                if m:
                    items.append({'n': int(m.group(1)), 'text': m.group(2), 'sub': [], 'tail': ''})
                elif s.startswith('- '):
                    items[-1]['sub'].append(s[2:])
                elif s.startswith('Dans le doute') or items[-1]['tail']:
                    items[-1]['tail'] += ' ' + s
                elif items[-1]['sub']:
                    items[-1]['sub'][-1] += ' ' + s
                else:
                    items[-1]['text'] += ' ' + s
                i += 1
            out.append(('ol', items)); continue
        p = []
        while i < len(lines) and lines[i].strip() and not re.match(r'^(- |\d+\. |\||>)', lines[i]):
            p.append(lines[i].strip()); i += 1
        out.append(('p', ' '.join(p)))
    return out


def render_ul(items, cls='dash'):
    items = [re.sub(r'^\*\*(.+?)\*\*\s*([.:])\s*', lambda m: '**' + m.group(1) + (' :' if m.group(2) == ':' else '.') + '** ', t) for t in items]
    return f'<ul class="{cls}">' + ''.join(f'<li>{inline(t)}</li>' for t in items) + '</ul>'


def render_ol(items):
    h = '<ol class="steps">'
    for it in items:
        h += f'<li><span class="n">{it["n"]}</span>{inline(it["text"])}'
        if it['sub']:
            h += render_ul(it['sub'])
        if it['tail']:
            h += f'<span class="tail">{inline(it["tail"].strip())}</span>'
        h += '</li>'
    return h + '</ol>'


def render_table(tb, cls=''):
    rows = [[c.strip() for c in r.strip().strip('|').split('|')] for r in tb]
    head, body = rows[0], [r for r in rows[2:]]
    h = f'<table class="{cls}"><colgroup>' + ''.join(f'<col class="c{k}">' for k in range(len(head))) + '</colgroup>'
    h += '<thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in head) + '</tr></thead><tbody>'
    for r in body:
        h += '<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>'
    return h + '</tbody></table>'


def danger_points(q):
    """Decoupe la citation DANGER en titre + points numerotes."""
    paras, cur = [], []
    for ln in q:
        if not ln.strip():
            if cur: paras.append(' '.join(cur)); cur = []
        else:
            cur.append(ln.strip())
    if cur: paras.append(' '.join(cur))
    title, pts = '', []
    for p in paras:
        if p.startswith('###'):
            title = re.sub(r'^###\s*⚠?\s*DANGER\s*—?\s*', '', p).strip()
            continue
        m = re.match(r'^\*\*(\d+)\. (.+?)\*\*\s*(.*)$', p)
        if m:
            pts.append({'n': m.group(1), 't': m.group(2), 'body': m.group(3)})
        elif pts:
            pts[-1]['body'] += '\n' + p
    return title, pts


def render_points(pts):
    h = ''
    for p in pts:
        body = ''.join(f'<p>{inline(x)}</p>' for x in p['body'].split('\n') if x.strip())
        if p.get('suite'):
            h += f'<div class="dp suite">{body}</div>'
        else:
            h += (f'<div class="dp"><h4><span class="dn">{p["n"]}</span>{inline(p["t"])}</h4>{body}</div>')
    return h


def words_slice(text, spec):
    """Coupe un paragraphe au mot pres ; referme et rouvre le gras et l'italique coupes."""
    a, b = spec[1:].split('-')
    w = text.split(' ')
    a = int(a)
    stop = int(b) + 1 if b else None
    pre, piece = ' '.join(w[:a]), ' '.join(w[a:stop])
    def odd(t, m):
        if m == '**':
            return t.count('**') % 2 == 1
        return t.replace('**', '').count('*') % 2 == 1
    for m in ('**', '*'):
        if odd(pre, m):
            piece = m + piece
    for m in ('*', '**'):
        if odd(piece, m):
            piece = piece + m
    return piece


def fragment(chap, key, *specs):
    secs = sections(CHAP[chap].read_text(encoding='utf-8'))
    s = secs[key]
    if specs and specs[0] == 'title':
        if key == '8' or s['title'].upper().startswith('DANGER'):
            q = [b for b in blocks(s['lines']) if b[0] == 'quote'][0][1]
            return inline(danger_points(q)[0])
        return inline(re.sub(r'\s*—\s*\*\*.*$', '', s['title']))
    bl = blocks(s['lines'])
    if chap == '65' and key == '8':
        q = [b for b in bl if b[0] == 'quote'][0][1]
        title, pts = danger_points(q)
        pts = [dict(p) for p in pts]
        if specs and specs[0].startswith('i'):
            a, b = specs[0][1:].split('-')
            pts = pts[int(a):int(b) + 1]
        if len(specs) > 1 and specs[1].startswith('w'):
            if specs[1].startswith('w0-'):
                pts[-1]['body'] = words_slice(pts[-1]['body'], specs[1])
            else:
                pts[0]['body'] = words_slice(pts[0]['body'], specs[1])
                pts[0]['suite'] = True
        return render_points(pts)
    sel = list(range(len(bl)))
    items = None
    wspec = None
    for sp in specs:
        if sp.startswith('b'):
            if '-' in sp:
                a, b = sp[1:].split('-'); sel = list(range(int(a), int(b) + 1))
            else:
                sel = [int(sp[1:])]
        elif sp.startswith('i'):
            a, b = sp[1:].split('-'); items = (int(a), int(b))
        elif sp.startswith('w'):
            wspec = sp
        elif sp.startswith('r'):
            a, b = sp[1:].split('-'); items = (int(a), int(b))
    h = ''
    for k in sel:
        kind, data = bl[k]
        if kind == 'p':
            txt = data
            cls = ''
            if wspec:
                txt = words_slice(txt, wspec)
                if not wspec.startswith('w0-'):
                    cls = ' class="suite"'
            m = re.match(r'^\*\*([^*]+)\*\*$', txt)
            h += f'<p class="lab">{inline(m.group(1))}</p>' if m else f'<p{cls}>{inline(txt)}</p>'
        elif kind == 'ul':
            its = list(data[items[0]:items[1] + 1] if items else data)
            first_suite = False
            if wspec:
                if wspec.startswith('w0-'):
                    its[-1] = words_slice(its[-1], wspec)
                else:
                    its[0] = words_slice(its[0], wspec); first_suite = True
            u = render_ul(its)
            if first_suite:
                u = u.replace('<li>', '<li class="suite">', 1)
            h += u
        elif kind == 'ol':
            its = [dict(x) for x in (data[items[0]:items[1] + 1] if items else data)]
            if wspec:
                its[-1]['text'] = words_slice(its[-1]['text'], wspec)
                its[-1]['sub'], its[-1]['tail'] = [], ''
            for sp in specs:
                if sp.startswith('s'):
                    its[-1]['sub'], its[-1]['tail'] = its[-1]['sub'][:int(sp[1:])], ''
                if sp.startswith('x'):
                    its[-1]['sub'][-1] = words_slice(its[-1]['sub'][-1], 'w' + sp[1:])
            h += render_ol(its)
        elif kind == 'table':
            tb = data[:2] + (data[2 + items[0]:2 + items[1] + 1] if items else data[2:])
            h += render_table(tb, 'mat' if key == '4' else '')
    return h


# ---------------------------------------------------------------- typographie
def typo_text(s, hyph):
    s = s.replace("'", '’')
    s = re.sub(r'«\s*', '«' + NNBSP, s)
    s = re.sub(r'\s*»', NNBSP + '»', s)
    s = re.sub(r'[  ]+([;:!?])', NNBSP + r'\1', s)
    s = re.sub(r'(?<![\w\d−])-(\d)', '−' + r'\1', s)
    for _ in range(2):
        s = re.sub(r'(\d) (\d{3})(?!\d)', r'\1' + NNBSP + r'\2', s)
    s = re.sub(r'(\d)[  ](°C|%|°)', r'\1' + NNBSP + r'\2', s)
    s = re.sub(r'(\d)[  ](kg|g|m|mm|cm|h|min|L|ppm|pi|po|cc|jours?|heures?|minutes?|semaines?|fois|ans?)(?![\w])', r'\1' + NBSP + r'\2', s)
    s = re.sub(r'(\d) à (\d)', r'\1' + NBSP + 'à' + NBSP + r'\2', s)
    s = re.sub(r' —', NBSP + '—', s)
    s = re.sub(r'\b(ch\.|Ch\.|p\.|n°) (\d)', r'\1' + NBSP + r'\2', s)
    if hyph:
        s = re.sub(r"[A-Za-zÀ-ÖØ-öø-ÿœŒ]{8,}", lambda m: m.group(0) if m.group(0).isupper() else HY.inserted(m.group(0), hyphen=SHY), s)
    return s


def typo_html(h, hyph=True):
    parts = re.split(r'(<[^>]+>)', h)
    skip = 0
    for k, p in enumerate(parts):
        if p.startswith('<'):
            if re.match(r'<(style|script)\b', p): skip += 1
            elif re.match(r'</(style|script)>', p): skip -= 1
            continue
        if skip or not p:
            continue
        parts[k] = typo_text(p, hyph)
    return ''.join(parts)


def construire(tpl, out):
    t = (ICI / tpl).read_text(encoding='utf-8')

    def rep(m):
        a = m.group(1).split(':')
        return typo_html(fragment(a[0], a[1], *a[2:]), hyph=True)

    head, body = t.split('<body', 1)
    body = re.sub(r'\{\{([^}]+)\}\}', rep, body)
    body = typo_html(body, hyph=False)
    (DIR / out).write_text(head + '<body' + body, encoding='utf-8')
    print('ecrit', out)


if __name__ == '__main__':
    construire('interieur.tpl.html', 'interieur.html')
