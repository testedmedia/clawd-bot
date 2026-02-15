# Code Review Instructions for Jules

## Project Context
- **Project:** Clawd (Telegram AI Bot)
- **Stack:** Node.js (ESM), Telegraf v4, Anthropic SDK (Claude)
- **Focus Areas:** security, correctness, performance

## Review Priorities
1. Security vulnerabilities (OWASP top 10, injection, auth bypass, API key exposure)
2. Data integrity issues (missing validation, race conditions, unhandled promise rejections)
3. Breaking changes (API contracts, schema mismatches, Telegram API compatibility)
4. Performance regressions (memory leaks, blocking operations, unbounded message handling)

## What NOT to Flag
- Style/formatting preferences (handled by linter)
- Missing TypeScript types on internal functions
- Console.log statements in development branches
- Comments or documentation quality

## Adversarial Self-Critique
After your initial review, take the opposite position:
- For each issue you flagged: Is this actually a problem? Could there be a valid reason?
- For each pass: What did you miss? Re-examine the riskiest changes.
- Report both your initial findings AND your self-critique.

## Bot-Specific Checks
- Verify all user input is sanitized before processing
- Check for proper error handling in Telegram message handlers
- Ensure API keys and tokens are never logged or exposed in error messages
- Verify rate limiting and abuse prevention on bot commands
- Check for proper graceful shutdown handling

## Context Files
- `CLAUDE.md` -- Project architecture and conventions
- `CHANGELOG.md` -- Recent version history
- `docs/PROJECT_STATUS.md` -- Current milestone and known issues
