---
name: enforce-deploy-script
enabled: true
event: bash
pattern: pm2\s+restart|pm2\s+start|git\s+push
action: block
---

**DEPLOYMENT PROTOCOL VIOLATION**

Never restart processes directly. ALL deployments MUST go through:

```
bash scripts/deploy.sh <version> <tag>
```

Deploy protocol defined in ~/CLAUDE.md.
