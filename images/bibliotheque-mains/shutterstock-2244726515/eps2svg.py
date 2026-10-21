import sys,re
s=open(sys.argv[1],'rb').read().decode('latin-1')
s=s[s.find('%%EndPageSetup'):s.find('%%PageTrailer')]
toks=s.split()
stack=[];d=[];paths=[];col='#000'
for t in toks:
    if re.fullmatch(r'-?(\d+\.?\d*|\.\d+)',t): stack.append(t); continue
    if t=='mo': d.append('M'+' '.join(stack[-2:]))
    elif t=='li': d.append('L'+' '.join(stack[-2:]))
    elif t=='cv': d.append('C'+' '.join(stack[-6:]))
    elif t=='cp': d.append('Z')
    elif t=='rgb': r,g,b=[float(x) for x in stack[-3:]]; col='#%02x%02x%02x'%(int(r*255),int(g*255),int(b*255))
    elif t in ('f','fi','F'):
        if d: paths.append((col,' '.join(d)))
        d=[]
    elif t=='np': d=[]
    elif t=='clp': d=[]
    elif t in ('s','S','sf'): d=[]
    stack=[]
out=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3662.28 1499.43" width="3662" height="1499">']
for c,p in paths: out.append(f'<path fill="{c}" fill-rule="nonzero" d="{p}"/>')
out.append('</svg>')
open(sys.argv[2],'w').write('\n'.join(out)); print(len(paths))
