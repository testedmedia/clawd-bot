import { Telegraf } from "telegraf";
import Anthropic from "@anthropic-ai/sdk";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// In-memory conversation history per chat (resets on restart)
const conversations = new Map();
const MAX_HISTORY = 20;

const SYSTEM_PROMPT = `You are Clawd, a sharp and direct AI assistant on Telegram. You help with research, coding, business strategy, and general questions. Keep responses concise — this is a chat app, not an essay platform. Use markdown sparingly (Telegram supports bold, italic, code blocks). If you don't know something, say so.`;

function getHistory(chatId) {
  if (!conversations.has(chatId)) conversations.set(chatId, []);
  return conversations.get(chatId);
}

function trimHistory(history) {
  while (history.length > MAX_HISTORY) history.shift();
}

// /start
bot.start((ctx) => {
  conversations.delete(ctx.chat.id);
  ctx.reply("Clawd online. What do you need?");
});

// /clear — reset conversation
bot.command("clear", (ctx) => {
  conversations.delete(ctx.chat.id);
  ctx.reply("Conversation cleared.");
});

// /help
bot.command("help", (ctx) => {
  ctx.reply(
    "Commands:\n" +
    "/clear — Reset conversation history\n" +
    "/help — Show this message\n\n" +
    "Just send a message and I'll respond."
  );
});

// Handle all text messages
bot.on("text", async (ctx) => {
  const chatId = ctx.chat.id;
  const userMessage = ctx.message.text;

  // Skip if it's a command (handled above)
  if (userMessage.startsWith("/")) return;

  const history = getHistory(chatId);
  history.push({ role: "user", content: userMessage });
  trimHistory(history);

  try {
    const response = await claude.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: history,
    });

    const reply = response.content[0].text;
    history.push({ role: "assistant", content: reply });
    trimHistory(history);

    // Telegram has a 4096 char limit per message
    if (reply.length > 4000) {
      const chunks = reply.match(/.{1,4000}/gs) || [reply];
      for (const chunk of chunks) {
        await ctx.reply(chunk);
      }
    } else {
      await ctx.reply(reply);
    }
  } catch (err) {
    console.error(`[clawd] Error for chat ${chatId}:`, err.message);
    ctx.reply("Something broke. Try again.");
  }
});

// Launch
bot.launch();
console.log("[clawd] Bot started");

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
