# 💅 Lamilash Kari — Beauty Studio PWA

Премиальное веб-приложение для специалиста по ламинированию ресниц и бровей.

**Стек:** Next.js 14 · Tailwind CSS · Framer Motion · Supabase · Telegram Bot API

---

## 🚀 Быстрый старт

### Шаг 1 — Установить Node.js

Скачайте и установите Node.js LTS:
👉 https://nodejs.org/en/download

> Выберите **Windows Installer (.msi)** → LTS версию.
> После установки **перезапустите** PowerShell/терминал.

Проверьте установку:
```bash
node --version   # должно быть v18+ или v20+
npm --version    # должно быть 9+
```

---

### Шаг 2 — Установить зависимости

Откройте папку проекта в терминале:
```bash
cd "c:\Users\deffi\OneDrive\Desktop\Lamilash kari"
npm install
```

---

### Шаг 3 — Настроить переменные окружения

Скопируйте `.env.local.example` в `.env.local` и заполните:
```
NEXT_PUBLIC_SUPABASE_URL=https://ваш-проект.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш-anon-key
SUPABASE_SERVICE_ROLE_KEY=ваш-service-role-key
TELEGRAM_BOT_TOKEN=токен-бота-от-BotFather
TELEGRAM_OWNER_CHAT_ID=ваш-telegram-id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Без этих ключей** приложение всё равно запустится и покажет демо-данные.

---

### Шаг 4 — Запустить в режиме разработки

```bash
npm run dev
```

Откройте браузер: **http://localhost:3000**

---

## 🗄 Настройка Supabase

1. Создайте аккаунт на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Перейдите в **SQL Editor** → **New Query**
4. Вставьте содержимое файла `supabase/schema.sql` и нажмите **Run**
5. Скопируйте `URL` и `anon key` из **Settings → API** в `.env.local`

---

## 🤖 Настройка Telegram Bot

### Создать бота:
1. Найдите в Telegram **@BotFather**
2. Напишите `/newbot`
3. Придумайте имя и username для бота
4. Скопируйте токен в `TELEGRAM_BOT_TOKEN`

### Узнать свой Chat ID:
1. Напишите своему боту `/start`
2. Откройте в браузере:
   ```
   https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
   ```
3. Найдите `"chat":{"id":XXXXXXX}` — это ваш `TELEGRAM_OWNER_CHAT_ID`

### Подключить webhook (после деплоя):
```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -d "url=https://ваш-домен.com/api/telegram/webhook"
```

---

## 📱 Страницы приложения

| URL | Описание |
|-----|----------|
| `/` | Сплэш-экран с анимацией |
| `/home` | Главная страница |
| `/portfolio` | Галерея До/После |
| `/booking` | Запись (5 шагов) |
| `/reviews` | Отзывы клиентов |
| `/dashboard` | Личный кабинет |

---

## 🎨 Цветовая система

| Переменная | HEX | Применение |
|-----------|-----|-----------|
| `cream` | `#FDF8F3` | Фон страниц |
| `warm-beige` | `#F2E8DC` | Карточки, секции |
| `sand` | `#D4B896` | Границы, неактивные элементы |
| `cocoa` | `#8B6348` | Кнопки, акценты |
| `dark-cocoa` | `#5C3D2E` | Hover, тёмные акценты |
| `espresso` | `#2C1810` | Основной текст |
| `gold` | `#C9A96E` | Звёзды, декор |

---

## 📦 Деплой (Vercel)

```bash
npm install -g vercel
vercel
```

После деплоя добавьте все переменные из `.env.local` в **Vercel Dashboard → Settings → Environment Variables**.

---

## 📁 Структура проекта

```
app/
├── page.tsx              # Сплэш-экран
├── home/page.tsx         # Главная
├── portfolio/page.tsx    # Галерея
├── booking/page.tsx      # Запись
├── reviews/page.tsx      # Отзывы
├── dashboard/page.tsx    # Кабинет
└── api/
    ├── book/route.ts     # POST /api/book
    ├── slots/route.ts    # GET /api/slots
    └── telegram/webhook/ # Telegram бот
components/
├── BottomNav.tsx         # Нижняя навигация
├── BeforeAfterSlider.tsx # Слайдер До/После
└── ReviewsCarousel.tsx   # Карусель отзывов
lib/
├── supabase.ts           # Supabase клиент
├── telegram.ts           # Telegram хелпер
└── slots.ts              # Логика слотов
supabase/
└── schema.sql            # SQL схема для Supabase
```
