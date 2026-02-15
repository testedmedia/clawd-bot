---
name: codex-review-gate
enabled: true
event: bash
pattern: deploy\.sh
action: warn
---

**CODEX 5.3 REVIEW GATE**

Before deploying, run the Codex code review:

```
bash ~/.openclaw/scripts/codex-review.sh
```

This sends your changes to GPT-5.3 Codex for automated bug, security, and logic review.

Debug Trifecta Stack:
1. Opus 4.6 writes the code
2. Codex 5.3 reviews pre-deploy (this gate)
3. Greptile audits the PR on GitHub (@greptile)

If Codex flags CRITICAL issues, the deploy will be blocked.
