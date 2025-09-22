# Multi-stage build для оптимизации размера образа
FROM node:18-alpine AS builder

# Устанавливаем зависимости для сборки
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

# Production образ
FROM node:18-alpine AS runner

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Копируем собранное приложение
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Создаем директории для SQLite базы данных
RUN mkdir -p /app/data
RUN chown -R nextjs:nodejs /app

# Переключаемся на пользователя nextjs
USER nextjs

# Открываем порт
EXPOSE 3000

# Переменные окружения
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_PATH=/app/data/waitlist.db

# Команда запуска
CMD ["npm", "start"]
