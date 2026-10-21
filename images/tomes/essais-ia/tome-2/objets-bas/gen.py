"""Faire générer un objet par AI Horde (Flux.1-Schnell par défaut), texte seul ou img2img.
    python3 gen.py PROMPT.txt SORTIE W H [n] [modele] [source.png force]
Les images arrivent en SORTIE-0.webp, SORTIE-1.webp…"""
import base64, io, json, subprocess, sys, time
from PIL import Image

def req(url, data=None):
    a = ['curl', '-sS', '-m', '120', '-H', 'apikey: 0000000000', '-H', 'Client-Agent: livre-chalet:1:jp',
         '-H', 'Content-Type: application/json', url]
    if data:
        a += ['-X', 'POST', '--data-binary', '@-']
    for essai in range(10):
        r = subprocess.run(a, capture_output=True, text=True, input=json.dumps(data) if data else None)
        try:
            return json.loads(r.stdout)
        except Exception:
            time.sleep(20)
    raise SystemExit('réseau : ' + r.stdout[:200] + r.stderr[:200])

pf, out, w, h = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
n = int(sys.argv[5]) if len(sys.argv) > 5 else 2
model = sys.argv[6] if len(sys.argv) > 6 else 'Flux.1-Schnell fp8 (Compact)'
flux = 'Flux' in model
p = {'prompt': open(pf, encoding='utf-8').read().strip(),
     'params': ({'width': w, 'height': h, 'steps': 4, 'n': n, 'cfg_scale': 1, 'sampler_name': 'k_euler'} if flux else
                {'width': w, 'height': h, 'steps': 30, 'n': n, 'cfg_scale': 6, 'sampler_name': 'k_dpmpp_2m', 'karras': True}),
     'models': [model], 'r2': True, 'nsfw': False, 'censor_nsfw': True}
if len(sys.argv) > 8:
    im = Image.open(sys.argv[7]).convert('RGB').resize((w, h), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'WEBP', quality=92)
    p['params']['denoising_strength'] = float(sys.argv[8])
    p['source_image'] = base64.b64encode(buf.getvalue()).decode(); p['source_processing'] = 'img2img'
for essai in range(30):
    j = req('https://aihorde.net/api/v2/generate/async', p); print(j, flush=True)
    if 'id' in j: break
    if j.get('rc') == 'CorruptPrompt': raise SystemExit('texte refusé')
    time.sleep(30)
i = j['id']; t0 = time.time()
while True:
    s = req(f'https://aihorde.net/api/v2/generate/check/{i}')
    print(int(time.time() - t0), s.get('wait_time'), s.get('queue_position'), s.get('done'), flush=True)
    if s.get('done') or s.get('faulted') or time.time() - t0 > 2400:
        break
    time.sleep(20)
s = req(f'https://aihorde.net/api/v2/generate/status/{i}')
for k, g in enumerate(s.get('generations', [])):
    subprocess.run(['curl', '-sS', '-m', '120', '-o', f'{out}-{k}.webp', g['img']]); print('ok', out, k, g.get('model'), g.get('seed'), flush=True)
