"""Reprendre une tâche AI Horde déjà lancée (après un redémarrage du conteneur), par son identifiant.
    python3 horde-reprendre.py <id> <sortie>     écrit <sortie>-0.webp, <sortie>-1.webp…"""
import json, subprocess, sys, time

def req(url):
    r = subprocess.run(['curl', '-sS', '-m', '120', '-H', 'Client-Agent: livre-chalet:1:jp', url], capture_output=True, text=True)
    return json.loads(r.stdout)

i, out = sys.argv[1:3]
t0 = time.time()
while True:
    try:
        s = req(f'https://aihorde.net/api/v2/generate/check/{i}')
    except Exception as e:
        print('erreur', e, flush=True); time.sleep(20); continue
    print(int(time.time() - t0), s.get('wait_time'), s.get('queue_position'), s.get('done'), flush=True)
    if s.get('done') or s.get('faulted') or time.time() - t0 > 1800:
        break
    time.sleep(20)
s = req(f'https://aihorde.net/api/v2/generate/status/{i}')
for k, g in enumerate(s.get('generations', [])):
    subprocess.run(['curl', '-sS', '-m', '120', '-o', f'{out}-{k}.webp', g['img']]); print('ok', out, k, g.get('model'), flush=True)
