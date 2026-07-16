# Waypoint — запуск в бой (пошагово)

Код готов на 100%: онбординг → генерация ИИ → превью → дашборд, авторизация (магия-ссылка + Google),
подписки и оплата (Lemon Squeezy), почта, хранилище документов, ИИ-коуч. Дизайн не менялся.

Осталось только **подключить внешние сервисы и заполнить `.env.local`** — это делаешь ты (аккаунты
на меня оформить нельзя). Ниже — точные шаги. Всё бесплатно на старте.

---

## Шаг 1. Supabase — база, авторизация, почта, хранилище

1. Зайди на https://supabase.com → **New project**. Придумай пароль к БД, регион — ближе к тебе.
2. Когда проект создастся: **SQL Editor → New query** → вставь весь файл `supabase/schema.sql`
   из этого проекта → **Run**. Это создаст таблицы, безопасность (RLS), триггеры и хранилище.
3. **Project Settings → API** — скопируй в `.env.local`:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` ключ → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` ключ (секретный!) → `SUPABASE_SERVICE_ROLE_KEY`
4. **Authentication → Sign In / Providers**: убедись, что **Email** включён (магия-ссылка работает сразу).
   Google — по желанию: включи провайдер Google и вставь Client ID/Secret из Google Cloud Console.
5. Почта: Supabase сам шлёт письма со ссылкой для входа. Для теста ничего не нужно.
   Для продакшена позже подключишь свой SMTP (Authentication → Emails) — но это необязательно для запуска.

## Шаг 2. Anthropic — искусственный интеллект

У тебя ключ уже есть. Вставь его в `.env.local`:
- `ANTHROPIC_API_KEY=sk-ant-...`

Модель уже настроена (`claude-opus-4-8`), ключ работает только на сервере и в браузер не попадает.

## Шаг 3. Lemon Squeezy — подписки и оплата

1. https://lemonsqueezy.com → зарегистрируй магазин (Store). Они сами берут на себя налоги/VAT.
2. **Products → New Product**: подписка, $19/месяц (как на странице `/pricing`). Опубликуй.
3. Собери значения в `.env.local`:
   - **Settings → API** → создай ключ → `LEMONSQUEEZY_API_KEY`
   - ID магазина (Settings → General или в URL) → `LEMONSQUEEZY_STORE_ID`
   - ID варианта продукта (на странице продукта, вкладка Variant) → `LEMONSQUEEZY_VARIANT_ID`
4. **Settings → Webhooks → Add endpoint**:
   - URL: `https://ТВОЙ-ДОМЕН/api/webhooks/lemonsqueezy` (локально webhook не сработает — только на деплое)
   - События: все `subscription_*`
   - Signing secret придумай сам → тот же вставь в `LEMONSQUEEZY_WEBHOOK_SECRET`

> Пока не заполнил Lemon Squeezy — приложение всё равно работает: онбординг, ИИ и дашборд живут,
> просто кнопка оплаты вернёт «Payments not configured». Можно подключить оплату позже.

## Шаг 4. Локальный запуск

```
npm install       # если ещё не ставил
npm run dev
```
Открой http://localhost:3000 — пройди онбординг, войди по магия-ссылке, проверь дашборд и ИИ-коуча.

## Шаг 5. Деплой на Vercel + домен

1. Залей код на GitHub, потом https://vercel.com → **Import Project**.
2. В **Settings → Environment Variables** вставь ВСЕ переменные из `.env.local`
   (и поменяй `NEXT_PUBLIC_SITE_URL` на боевой адрес).
3. Deploy. Привяжи свой домен в **Settings → Domains**.
4. Вернись в Supabase → **Authentication → URL Configuration** и добавь боевой URL
   (`Site URL` и `Redirect URLs`: `https://ТВОЙ-ДОМЕН/auth/callback`).
5. Проверь, что webhook Lemon Squeezy указывает на боевой домен (Шаг 3.4).

---

### Что уже сделано в коде (трогать не нужно)
- `src/app/(funnel)/*` — экраны из дизайна: hero, онбординг, генерация, превью.
- `src/components/dashboard/dashboard-app.tsx` — дашборд с сохранением в БД, загрузкой файлов, ИИ-коучем.
- `src/app/api/ai` — сервер ИИ (генерация роадмапа + чат-коуч).
- `src/app/api/checkout`, `api/billing`, `api/webhooks/lemonsqueezy` — оплата и подписки.
- `src/lib/supabase/*`, `src/proxy.ts` — авторизация и защита `/app`.
- `supabase/schema.sql` — вся база, безопасность и хранилище.
