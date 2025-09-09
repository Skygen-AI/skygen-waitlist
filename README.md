# Skygen Windows

🪟 **Desktop версия Skygen для Windows с Tauri**

## Особенности
- ✅ Нативная производительность на Windows
- ✅ Размер приложения ~10MB (вместо 150MB+ у Electron)
- ✅ Rust backend для безопасности
- ✅ Полная интеграция с Windows API
- ✅ Python automation backend

## Установка и запуск

### Требования
- Windows 10/11
- Node.js 18+
- Rust (для разработки)
- Python 3.8+ (для automation features)

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
skygen-windows/
├── src/               # Next.js frontend
├── src-tauri/         # Rust backend
│   ├── src/           # Rust код
│   ├── python/        # Python automation
│   └── icons/         # Иконки приложения
└── package.json       # Зависимости
```

## Windows-специфичные функции
- ✅ Системные уведомления
- ✅ Автозапуск с Windows
- ✅ Системный трей
- ✅ Глобальные hotkeys
- ✅ Desktop automation через Python