---
name: require-tests-before-deploy
enabled: true
event: stop
action: block
conditions:
  - field: transcript
    operator: not_contains
    pattern: pre-deploy|npm test|smoke-test|deploy\.sh
---

**TESTING NOT DETECTED**

You made code changes but no tests or deployment were run this session. Before finishing:

- If you changed code: run `npm test` or `node scripts/pre-deploy.js`
- If you're deploying: use `bash scripts/deploy.sh <version> <tag>`
- If this was research only: ignore this warning
