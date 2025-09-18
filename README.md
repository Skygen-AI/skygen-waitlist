# Skygen Waitlist

📋 **Waitlist приложение Skygen с Tauri**

## Особенности
- ✅ Современный waitlist интерфейс
- ✅ Нативная производительность на Desktop
- ✅ Размер приложения ~10MB (вместо 150MB+ у Electron)
- ✅ Rust backend для безопасности
- ✅ Интеграция с Skygen API
- ✅ Кросс-платформенная поддержка

## Установка и запуск

### Требования
- Windows 10/11, macOS 10.15+, или Linux
- Node.js 18+
- Rust (для разработки)

### Разработка
```bash
npm install
npm run tauri:dev
```

### Сборка для продакшена
```bash
npm run tauri:build
```

Создаст установщик в `src-tauri/target/release/bundle/`

## Структура
```
skygen-waitlist/
├── src/               # Next.js frontend
├── src-tauri/         # Rust backend
│   ├── src/           # Rust код
│   ├── python/        # Python automation
│   └── icons/         # Иконки приложения
└── package.json       # Зависимости
```

## Функции waitlist приложения
- ✅ Регистрация в очереди ожидания
- ✅ Уведомления о статусе
- ✅ Интеграция с сайтом Skygen
- ✅ Оффлайн поддержка
- ✅ Автоматические обновления