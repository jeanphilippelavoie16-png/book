import json, collections
for fn in ['series60.json','series0.json']:
    d=json.load(open(fn))
    rows=d['outputs']['hourly']
    daily=collections.OrderedDict()
    temps=collections.defaultdict(list)
    for r in rows:
        t=r['time']  # 20050101:0010
        day=t[:8]
        daily[day]=daily.get(day,0)+r['P']/1000.0  # kWh for 1 kWp
        temps[day].append(r['T2m'])
    days=list(daily.keys())
    vals=[daily[k] for k in days]
    # December days
    dec=[(k,daily[k]) for k in days if k[4:6]=='12']
    decv=[v for k,v in dec]
    print(fn,'Dec days',len(decv),'mean',sum(decv)/len(decv),'min',min(decv),'max',max(decv))
    under=[v for v in decv if v<0.5]
    print(' Dec days <0.5 kWh/kWp',len(under), len(under)/len(decv))
    under2=[v for v in decv if v<0.25]
    print(' Dec days <0.25',len(under2), len(under2)/len(decv))
    # worst 7-day window within Nov15-Jan15
    idx={k:i for i,k in enumerate(days)}
    worst=(9,None); worst3=(9,None); worst10=(9,None)
    for i in range(len(days)-10):
        k=days[i]
        mm=k[4:6]
        if mm in ('11','12','01'):
            w=sum(vals[i:i+7])/7
            if w<worst[0]: worst=(w,k)
            w3=sum(vals[i:i+3])/3
            if w3<worst3[0]: worst3=(w3,k)
            w10=sum(vals[i:i+10])/10
            if w10<worst10[0]: worst10=(w10,k)
    print(' worst 3-day avg',worst3,' worst 7-day avg',worst,' worst10',worst10)
    # monthly mean by month
    mon=collections.defaultdict(list)
    for k,v in zip(days,vals): mon[k[4:6]].append(v)
    print(' ', {m: round(sum(v)/len(v),2) for m,v in sorted(mon.items())})
    # per-year december means
    yr=collections.defaultdict(list)
    for k,v in dec: yr[k[:4]].append(v)
    print(' Dec by year', {y: round(sum(v)/len(v),2) for y,v in sorted(yr.items())})
    # temps
    tmin={k:min(v) for k,v in temps.items()}
    allmin=min(tmin.values()); print(' min T2m', allmin)
