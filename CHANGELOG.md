# Changelog

All notable changes to Clawd will be documented in this file.

## 2026-02-14 — v1.0 "First Light"

**Deployed:** Feb 14, 2026 - 12:00 PM CT
**Lines:** +1200 / -0 | **Files:** 8

### Added
- Telegram bot powered by Claude Sonnet 4.5 via Anthropic SDK
- In-memory conversation history per chat (20 message window, resets on restart)
- Auto-chunking for Telegram's 4096 char message limit
- Graceful shutdown on SIGINT/SIGTERM
- Bot commands: `/start` (reset + greeting), `/clear` (wipe history), `/help` (command list)
- X/Twitter research skill (`skills/x-research/`) — full CLI for real-time X research
  - `search` — query recent tweets with sort, filters, pagination, quick mode, quality mode
  - `thread` — fetch full conversation threads by root tweet ID
  - `profile` — user profile + recent tweets lookup
  - `tweet` — single tweet fetch by ID
  - `watchlist` — monitor key accounts (add/remove/check)
  - `cache` — file-based 15min TTL cache to avoid duplicate API calls
  - `--save` flag to persist research as markdown drafts
  - `--markdown` and `--json` output formats
  - Cost tracking per search (estimated X API spend)
- Telegram and markdown formatters for tweet output
- CLAUDE.md project documentation
- npm scripts: `start`, `dev` (--watch), `test`, `test:smoke`
