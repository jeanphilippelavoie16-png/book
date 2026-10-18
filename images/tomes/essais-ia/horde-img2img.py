"""Repeindre une scène de page de titre par AI Horde (img2img), en gardant sa composition.
    python3 horde-img2img.py <modèle> <image source> <prompt.txt> <force 0-1> <sortie> [n]
La force (denoising) dit combien le générateur peut s'éloigner du dessin : 0,4 garde tout, 0,7 repeint beaucoup."""
import base64, io, json, subprocess, sys, time
from PIL import Image

def req(url, data=None):
    a = ['curl', '-sS', '-m', '120', '-H', 'apikey: 0000000000', '-H', 'Client-Agent: livre-chalet:1:jp',
         '-H', 'Content-Type: application/json', url]
    if data:
        a += ['-X', 'POST', '--data-binary', '@-']
    r = subprocess.run(a, capture_output=True, text=True, input=json.dumps(data) if data else None)
    return json.loads(r.stdout)

model, src, prompt_f, force, out = sys.argv[1:6]
n = int(sys.argv[6]) if len(sys.argv) > 6 else 2
im = Image.open(src).convert('RGB')
w, h = im.size
buf = io.BytesIO(); im.save(buf, 'WEBP', quality=92)
p = {'prompt': open(prompt_f, encoding='utf-8').read().strip(),
     'params': {'width': w, 'height': h, 'steps': 30, 'n': n, 'cfg_scale': 6, 'denoising_strength': float(force),
                'sampler_name': 'k_dpmpp_2m', 'karras': True},
     'source_image': base64.b64encode(buf.getvalue()).decode(), 'source_processing': 'img2img',
     'models': [model], 'r2': True, 'nsfw': False, 'censor_nsfw': True}
j = req('https://aihorde.net/api/v2/generate/async', p); print(j, flush=True)
i = j['id']; t0 = time.time()
while True:
    s = req(f'https://aihorde.net/api/v2/generate/check/{i}')
    print(int(time.time() - t0), s.get('wait_time'), s.get('queue_position'), s.get('done'), flush=True)
    if s.get('done') or s.get('faulted') or time.time() - t0 > 1500:
        break
    time.sleep(15)
s = req(f'https://aihorde.net/api/v2/generate/status/{i}')
for k, g in enumerate(s.get('generations', [])):
    subprocess.run(['curl', '-sS', '-m', '120', '-o', f'{out}-{k}.webp', g['img']]); print('ok', out, k, g.get('model'), flush=True)
