# 🚀 Skygen Waitlist Deployment Guide

Простой и надежный способ развернуть waitlist систему на любом сервере с Docker.

## 🎯 Особенности

- **SQLite база данных** - легко переносить между системами
- **Docker контейнеризация** - быстрое развертывание
- **Password-less аутентификация** через magic links
- **Реферальная система** с автоматическим подсчетом
- **Автоматические миграции** базы данных
- **Готовые скрипты** для управления

## 📋 Предварительные требования

- Docker и Docker Compose
- Домен (для production)
- SMTP сервер для отправки email

## 🚀 Быстрый старт

### 1. Клонирование и настройка

```bash
git clone <repository>
cd skygen-waitlist

# Копируем пример конфигурации
cp env.example .env.production

# Редактируем настройки
nano .env.production
```

### 2. Настройка окружения

Обязательные параметры в `.env.production`:

```bash
# Database
DATABASE_PATH=/app/data/waitlist.db

# Security
NEXTAUTH_SECRET=your-super-secret-key-min-32-chars

# Email (для magic links)
EMAIL_FROM=noreply@yourdomain.com
EMAIL_SERVER_HOST=smtp.mailgun.org
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-smtp-user
EMAIL_SERVER_PASSWORD=your-smtp-password

# App
NEXTAUTH_URL=https://yourdomain.com
APP_URL=https://yourdomain.com
```

### 3. Развертывание

```bash
# Разворачиваем на production
./scripts/deploy.sh production

# Или на staging
./scripts/deploy.sh staging
```

Готово! 🎉 Приложение доступно на порту 80.

## 🛠️ Управление

### Мониторинг

```bash
# Просмотр логов
docker-compose logs -f waitlist

# Статус сервисов
docker-compose ps

# Проверка здоровья
curl http://localhost/api/health
```

### База данных

```bash
# Подключение к базе
./scripts/db-shell.sh

# Создание бэкапа
./scripts/backup-db.sh

# Просмотр статистики
./scripts/db-shell.sh
> SELECT COUNT(*) as total_users FROM users;
> SELECT COUNT(*) as verified_users FROM users WHERE email_verified = 1;
```

### Обновление

```bash
# Получить новую версию
git pull origin main

# Пересобрать и перезапустить
./scripts/deploy.sh production
```

## 📊 Структура данных

База данных автоматически создается при первом запуске:

- **users** - пользователи waitlist
- **magic_links** - токены для аутентификации
- **sessions** - активные сессии
- **referrals** - реферальные связи
- **payments** - отслеживание платежей

## 🔧 API Endpoints

- `POST /api/waitlist/join` - регистрация в waitlist
- `GET/POST /api/waitlist/verify` - подтверждение email
- `GET /api/waitlist/dashboard` - данные dashboard
- `GET /api/health` - проверка здоровья

## 🛡️ Безопасность

- Password-less система (только magic links)
- Сессии с автоматическим истечением
- Хеширование токенов
- HTTPS обязателен для production
- Ограничения базы данных (CHECK constraints)

## 📁 Файловая структура

```
/app/
  ├── data/              # SQLite база данных
  │   └── waitlist.db
  ├── backups/           # Автоматические бэкапы
  └── ...
```

## 🌍 Production настройки

### Nginx (рекомендуемый reverse proxy)

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Автоматические бэкапы

```bash
# Добавить в crontab
0 2 * * * /path/to/skygen-waitlist/scripts/backup-db.sh
```

## 🆘 Устранение неисправностей

### Проблемы с базой данных

```bash
# Проверить файл базы
ls -la data/waitlist.db

# Проверить права доступа
docker-compose exec waitlist ls -la /app/data/

# Пересоздать базу (ОСТОРОЖНО!)
rm data/waitlist.db
docker-compose restart waitlist
```

### Проблемы с email

```bash
# Проверить переменные окружения
docker-compose exec waitlist env | grep EMAIL

# Тестовая отправка (в логах появится URL)
curl -X POST http://localhost/api/waitlist/join \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Проблемы с Docker

```bash
# Пересобрать образ
docker-compose build --no-cache waitlist

# Очистить volumes
docker-compose down -v
docker-compose up -d
```

## 📈 Масштабирование

SQLite отлично подходит для waitlist до ~100k пользователей. Для больших нагрузок:

1. Переход на PostgreSQL
2. Добавление Redis для сессий
3. Балансировка нагрузки

## 📞 Поддержка

- Проверьте логи: `docker-compose logs waitlist`
- Здоровье системы: `curl http://localhost/api/health`
- База данных: `./scripts/db-shell.sh`

---

💡 **Совет**: Регулярно создавайте бэкапы командой `./scripts/backup-db.sh` перед важными обновлениями!
