import os,re,json,hashlib,glob,sys
from PIL import Image
ROOT='/home/user/book'; OUT=sys.argv[1]
def tome(ch):
    for t,(a,b) in enumerate([(0,18),(19,40),(41,60),(61,81),(82,101),(102,112)],1):
        if a<=ch<=b: return t
    return 0
chap={}
for f in glob.glob(ROOT+'/chapitres/*.md'):
    b=os.path.basename(f); m=re.match(r'(\d+)b?-(.*)\.md',b)
    if m: chap.setdefault(int(m.group(1)),m.group(2).replace('-',' '))
best={}
for d in ['validees','a-valider']:
    for f in glob.glob(f'{ROOT}/images/{d}/planche-*.png'):
        b=os.path.basename(f)[8:-4]
        m=re.match(r'(\d+-\d+[a-z]?)-(.*)',b) or re.match(r'(\d+-\d+[a-z]?)$',b)
        if not m: continue
        ref=m.group(1)
        if ref not in best or os.path.getmtime(f)>os.path.getmtime(best[ref][0]): best[ref]=(f,d,b)
items=[]
for ref,(f,d,b) in best.items():
    svg=None
    for c in [f'{ROOT}/images/planche-{b}.svg',f'{ROOT}/images/planches/planche-{b}.svg',f'{ROOT}/images/a-valider/planche-{b}.svg']:
        if os.path.exists(c): svg=c;break
    titre=''
    if svg:
        t=open(svg,encoding='utf8',errors='ignore').read()
        t2=re.sub(r'<[^>]+>','',t).replace('&#39;',"'").replace('&apos;',"'").replace('&amp;','&')
        m=re.search(r'Planche\s+'+re.escape(ref)+r'\s*[—–-]\s*([^\n.]+)',t2)
        if m: titre=m.group(1).strip()
    if not titre:
        titre=re.sub(r'^\d+-\d+[a-z]?-?','',b).replace('-',' ').capitalize()
    h=hashlib.md5(open(f,'rb').read()).hexdigest()[:10]
    ch=int(ref.split('-')[0])
    im=Image.open(f).convert('L')
    w=1100
    if im.width>w: im=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
    im.save(f'{OUT}/img/{ref}.jpg','JPEG',quality=72,optimize=True)
    items.append(dict(ref=ref,titre=titre,ch=ch,chapitre=chap.get(ch,''),tome=tome(ch),dossier=d,v=h,w=im.width,h=im.height))
def key(r):
    a,b=r['ref'].split('-'); n=int(re.match(r'\d+',b).group()); return (int(a),n,b)
items.sort(key=key)
json.dump(items,open(f'{OUT}/planches.json','w'),ensure_ascii=False)
print(len(items))
