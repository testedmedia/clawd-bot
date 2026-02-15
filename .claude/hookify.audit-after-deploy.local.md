---
name: audit-after-deploy
enabled: true
event: bash
pattern: deploy\.sh
action: notify
---

**POST-DEPLOY AUDIT REQUIRED**

After deployment, verify:
1. Smoke tests pass: `npm run test:smoke` or `node scripts/smoke-test.js`
2. Site/service is accessible and responding
3. No errors in logs
4. Commit with version: `v<version>: <title>`
