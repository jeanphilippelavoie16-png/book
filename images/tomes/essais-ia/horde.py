import json,sys,time,urllib.request
import subprocess
def req(url,data=None):
    a=['curl','-sS','-m','60','-H','apikey: 0000000000','-H','Client-Agent: livre-chalet:1:jp','-H','Content-Type: application/json',url]
    if data: a+=['-X','POST','--data',json.dumps(data)]
    return json.loads(subprocess.run(a,capture_output=True,text=True).stdout)
model,w,h,out=sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),sys.argv[4]
prompt=open('prompt.txt').read().strip()
p={'prompt':prompt,'params':{'width':w,'height':h,'steps':int(sys.argv[5]) if len(sys.argv)>5 else 25,'n':2,'cfg_scale':2.5 if 'Qwen' in model else 6, **({'sampler_name':'k_euler','scheduler':'simple'} if 'Qwen' in model else {})},'models':[model],'r2':True,'nsfw':False,'censor_nsfw':True}
j=req('https://aihorde.net/api/v2/generate/async',p); print(j); i=j['id']
t0=time.time()
while True:
    s=req(f'https://aihorde.net/api/v2/generate/check/{i}')
    print(int(time.time()-t0), s.get('wait_time'), s.get('queue_position'), s.get('done'), flush=True)
    if s.get('done') or s.get('faulted'): break
    time.sleep(15)
s=req(f'https://aihorde.net/api/v2/generate/status/{i}')
for k,g in enumerate(s['generations']):
    subprocess.run(['curl','-sS','-m','120','-o',f'{out}-{k}.webp',g['img']]); print('ok',out,k,g.get('model'))
