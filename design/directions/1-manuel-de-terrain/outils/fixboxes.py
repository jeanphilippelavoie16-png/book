import pypdf, sys
from pypdf.generic import RectangleObject
O=r"C:\Users\jeanp\New folder\design\directions\1-manuel-de-terrain"
def fix(name, specs):
    r=pypdf.PdfReader(O+"\\"+name); w=pypdf.PdfWriter()
    for p,(W,H,trim) in zip(r.pages, specs):
        p.mediabox=RectangleObject([0,0,W,H]); p.cropbox=RectangleObject([0,0,W,H])
        p.bleedbox=RectangleObject([0,0,W,H]); p.trimbox=RectangleObject(trim)
        w.add_page(p)
    w.add_metadata({"/Title": name.replace(".pdf","")+" — Le Grand Livre du Chalet, direction 1 : manuel de terrain"})
    with open(O+"\\"+name,"wb") as f: w.write(f)
R=(585,738,[0,9,576,729]); V=(585,738,[9,9,585,729])
fix("interieur.pdf",[R,V,R,V,R,V,R,R,R])   # 65-1 65-2 65-3 65-6 65-7 65-12 65-13 00-7 73-5
F=(585,738,[0,9,576,729]); FULL=(1238.4,738,[9,9,1229.4,729])
if "couvertures" in sys.argv: fix("couvertures.pdf",[F,F,F,F,FULL])
for n in ["interieur.pdf"]:
    r=pypdf.PdfReader(O+"\\"+n); print(n,[(float(p.mediabox.width),float(p.mediabox.height),[float(x) for x in p.trimbox]) for p in r.pages][:2], len(r.pages))
