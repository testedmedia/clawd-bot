# Clawd — Telegram AI Bot

## Project
Telegram bot powered by Claude. Direct, concise assistant for research, coding, business, and general questions. Runs as a long-lived Node.js process.

## Stack
- **Runtime**: Node.js (ESM)
- **Telegram**: Telegraf v4
- **AI**: Anthropic SDK → Claude Sonnet 4.5
- **Skills**: Modular skill system in `skills/`

## Key Files
```
index.js        — Main bot entry point, message handling, Claude integration
package.json    — Dependencies (telegraf, @anthropic-ai/sdk)
skills/         — Pluggable skill modules
  x-research/   — X/Twitter research skill (search, analyze, format)
commands/       — Command handlers (future)
lib/            — Shared utilities (future)
```

## Running
```bash
npm start       # Production
npm run dev     # Development (--watch)
```

## Environment Variables
- `TELEGRAM_BOT_TOKEN` — From @BotFather
- `ANTHROPIC_API_KEY` — Anthropic API key

## Architecture
- In-memory conversation history per chat (Map, 20 messages max)
- Resets on restart (no persistence)
- 4096 char Telegram message limit — auto-chunks long responses
- Graceful shutdown on SIGINT/SIGTERM

## Commands
- `/start` — Reset conversation, greeting
- `/clear` — Clear conversation history
- `/help` — Show available commands

## Deployment
Deploy protocol defined in `~/CLAUDE.md`.
This is a PM2-managed process. Deploy via: `bash scripts/deploy.sh <version> <tag>`
Production: `pm2 restart clawd` (via deploy script only)

## Test Commands
```bash
npm test                    # Pre-deploy checks
npm run test:smoke          # Post-deploy smoke tests
```
