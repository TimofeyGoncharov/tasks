import "dotenv/config";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!BOT_TOKEN) {
  console.error("Нет TELEGRAM_BOT_TOKEN в .env");
  process.exit(1);
}

const rl = readline.createInterface({ input, output });

const url = await rl.question("Вставь localtunnel URL (https://xxx.loca.lt): ");
await rl.close();

if (!url.startsWith("https://")) {
  console.error("Неверный URL. Нужен https://...");
  process.exit(1);
}

const body = {
  ...(CHAT_ID ? { chat_id: Number(CHAT_ID) } : {}),
  menu_button: {
    type: "web_app",
    text: "Открыть Todo",
    web_app: { url }
  }
};

const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
});

const data = await res.json();

if (!data.ok) {
  console.error("Ошибка Telegram API:", data);
  process.exit(1);
}

console.log("Готово! Mini App обновлён:", url);
