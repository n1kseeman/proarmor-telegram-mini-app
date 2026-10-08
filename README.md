# ProArmor Telegram Mini App

Мобильное мини-приложение для Telegram-бота [@proarmorbot](https://t.me/proarmorbot). Проект статический: сборка и внешние зависимости не нужны.

**Демо:** https://n1kseeman.github.io/proarmor-telegram-mini-app/

## Возможности

- каталог ключевых услуг и фильтры;
- подробные карточки услуг;
- форма расчёта стоимости;
- получение профиля пользователя из Telegram;
- передача заявки боту через `Telegram.WebApp.sendData` при запуске из кнопки клавиатуры;
- адаптация под safe area и Telegram Mini Apps SDK;
- автоматическая публикация на GitHub Pages.

## Локальный запуск

```bash
python3 -m http.server 4173 --directory .
```

## Подключение к @proarmorbot

После публикации скопируйте HTTPS-адрес GitHub Pages и откройте [@BotFather](https://t.me/BotFather):

1. `/mybots` → `@proarmorbot` → **Bot Settings**.
2. **Configure Mini App** → **Enable Mini App** → укажите URL GitHub Pages.
3. **Menu Button** → задайте текст `Открыть ProArmor` и тот же URL.

Telegram также поддерживает `/setmenubutton`. Для получения заявок без отдельного сервера запускайте Mini App из кнопки клавиатуры типа `web_app`: в этом режиме `sendData` передаёт JSON в сервисном сообщении `web_app_data`. При запуске из меню для обработки заявок потребуется небольшой сервер бота и проверка `initData` на серверной стороне.

## Публикация

Workflow `.github/workflows/deploy-pages.yml` публикует содержимое репозитория на GitHub Pages после каждого push в `main`.
