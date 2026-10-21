#!/bin/sh
# Pause : copie ce qui vit dans le scratchpad de la session (briefs, ancrages) dans _reprise/, puis pousse.
S=/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad
cd /home/user/book || exit 1
for d in planches-lot passe-t1; do
  mkdir -p _reprise/scratchpad/$d
  cp $S/$d/brief.md $S/$d/ancrages-*.json _reprise/scratchpad/$d/ 2>/dev/null
done
git add -A
git commit -q -m "Pause du 15 octobre : état des planches et de la passe du tome 1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_014xDY5FLxFXDJt3nYAYznSZ"
git push -q -u origin claude/adoring-goldberg-jqjbx1
