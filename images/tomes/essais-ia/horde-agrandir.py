"""Agrandir ×4 une image choisie par AI Horde (RealESRGAN_x4plus, par la file des interrogations).
    python3 horde-agrandir.py <image source> <sortie.png>
768 × 960 devient 3072 × 3840 : 8 × 10 po à 384 ppp."""
import base64, io, json, subprocess, sys, time
from PIL import Image

def req(url, data=None):
    a = ['curl', '-sS', '-m', '120', '-H', 'apikey: 0000000000', '-H', 'Client-Agent: livre-chalet:1:jp',
         '-H', 'Content-Type: application/json', url]
    if data:
        a += ['-X', 'POST', '--data-binary', '@-']
    r = subprocess.run(a, capture_output=True, text=True, input=json.dumps(data) if data else None)
    return json.loads(r.stdout)

src, out = sys.argv[1:3]
buf = io.BytesIO(); Image.open(src).convert('RGB').save(buf, 'WEBP', quality=95)
j = req('https://aihorde.net/api/v2/interrogate/async',
        {'source_image': base64.b64encode(buf.getvalue()).decode(), 'forms': [{'name': 'RealESRGAN_x4plus'}]})
print(j, flush=True)
i = j['id']; t0 = time.time()
while time.time() - t0 < 1800:
    s = req(f'https://aihorde.net/api/v2/interrogate/status/{i}')
    print(int(time.time() - t0), s.get('state'), flush=True)
    if s.get('state') == 'done':
        url = s['forms'][0]['result']['RealESRGAN_x4plus']
        tmp = out + '.webp'
        subprocess.run(['curl', '-sS', '-m', '300', '-o', tmp, url], check=True)
        Image.open(tmp).convert('RGB').save(out); print('ok', out, Image.open(out).size, flush=True)
        break
    if s.get('state') in ('faulted', 'cancelled'):
        sys.exit('échec : ' + json.dumps(s))
    time.sleep(15)
