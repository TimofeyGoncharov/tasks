type TelegramWebApp = {
  initDataUnsafe?: any;
  themeParams?: Record<string, string>;
  colorScheme?: "light" | "dark";
  expand?: () => void;
  ready?: () => void;
  share?: (text: string) => void;

  MainButton?: {
    setText: (t: string) => void;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

export function getWebApp(): TelegramWebApp | null {
  return window.Telegram?.WebApp ?? null;
}

export function applyTelegramThemeToCssVars() {
  const wa = getWebApp();
  const root = document.documentElement;

  const tp = wa?.themeParams ?? {};

  // Telegram кидает цвета в разных ключах (bg_color/text_color/button_color и т.д.)
  const bg = tp.bg_color ?? "#0b0f14";
  const text = tp.text_color ?? "#e6eef7";
  const hint = tp.hint_color ?? "#7d8a99";
  const button = tp.button_color ?? "#2ea6ff";
  const buttonText = tp.button_text_color ?? "#ffffff";

  root.style.setProperty("--tma-bg", bg);
  root.style.setProperty("--tma-text", text);
  root.style.setProperty("--tma-hint", hint);
  root.style.setProperty("--tma-btn", button);
  root.style.setProperty("--tma-btn-text", buttonText);
}

export function setupMainButton(onClearDone: () => void) {
  const wa = getWebApp();
  const mb = wa?.MainButton;
  if (!wa || !mb) return () => {};

  const handler = () => onClearDone();

  mb.setText("Очистить выполненные");
  mb.show();
  mb.onClick(handler);

  return () => {
    mb.offClick(handler);
    mb.hide();
  };
}

export function shareTasksText() {
  const wa = getWebApp();
  wa?.share?.("Посмотри мой список задач!");
}
