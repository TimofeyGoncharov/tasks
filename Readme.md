# Тестовое задание для супергерл

Небольшое, но полнофункциональное Web-приложение:

- Работает в браузере и внутри Telegram Mini App
- Хранит задачи через mock REST API (MirageJS)
- Подстраивается под Telegram themeParams через CSS-переменные
- Поддерживает: добавление, удаление, отметку выполнено, фильтры, поиск
- Реализует Share + Telegram MainButton (очистка выполненных)

## Стек

- React + TypeScript
- Zustand
- Ant Design
- MirageJS (mock REST API)
- Vite

## Функциональность

Задача содержит:

- `text` (текст)
- `done` (статус)
- `createdAt` (дата создания ISO)
- `tag` (цветовая метка)

Операции:

- Добавление (валидация)
- Отметка выполнено (перечеркивание)
- Удаление
- Фильтрация: Все / Активные / Выполненные
- Поиск по тексту

TMA:

- Применение `themeParams` в CSS vars (`--tma-bg`, `--tma-text`, и т.д.)
- Кнопка “Поделиться” через `Telegram.WebApp.share()`
- Использование `MainButton` для очистки выполненных задач

## Важно про API (MirageJS)

API эмулируется **внутри приложения** и доступно по `/api`:

- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

В production-режиме мок тоже будет работать, потому что это client-side mock.
Если захочешь реальный backend, Mirage можно отключить и заменить API-base. В коде захардкодил дев запуск

## Установка и запуск (локально)

Docker: dev
Development режим (Vite dev server + hot reload)

Этот режим запускает Vite dev server внутри контейнера (слушает 5173).
Сдела акой dockerfile для разработки, потому что есть hot reload и можно монтировать исходники.

docker compose up --build

Открыть в браузере:
http://localhost:5173

### Подготовка к старту

1. Настройка переменных окружения. Добавить свои токены бота

```bash
cp .env.example .env
```

### Установка в режиме разработки

```bash
npm i
```

```bash
npm run dev
```


# Запуск как Telegram Mini App (локально)

1. Собрать и запустить preview

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

2. Поднять публичный HTTPS (localtunnel)

```bash
npm install -g localtunnel
lt --port 4173
```

Ты получишь ссылку вида:

https://xxxx.loca.lt


3. Обновить кнопку Mini App у бота

```bash
npm run lt:update
```
Вставь ссылку из localtunnel.

4. Открыть приложение в Telegram

Открой Telegram → своего бота → Menu → Открыть Todo