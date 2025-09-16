# 📝 Документация по компонентам блога SkyGen

## 🎯 Обзор

Эта документация описывает все доступные теги и компоненты для создания красивых статей в блоге SkyGen. Используйте эти элементы для создания богатого контента с правильной типографикой и стилизацией.

---

## 🏗️ Базовая структура

### BlogArticleTemplate

Основной шаблон для статей блога.

```tsx
<BlogArticleTemplate
  slug="article-slug"
  title="Заголовок статьи"
  author="Автор"
  publishedDate="Дата публикации"
  readTime="Время чтения"
  category="Категория"
  thumbnailImage="/path/to/image.jpg"
  content={<YourContent />}
  tags={["тег1", "тег2", "тег3"]}
/>
```

**Параметры:**
- `slug` - URL статьи
- `title` - Заголовок статьи (отображается крупно в хиро)
- `author` - Автор статьи (по умолчанию: "SkyGen Team")
- `publishedDate` - Дата публикации
- `readTime` - Примерное время чтения (например: "5 мин чтения")
- `category` - Категория статьи (отображается как бейдж)
- `thumbnailImage` - Путь к изображению для хиро-секции
- `content` - JSX-контент статьи
- `tags` - Массив тегов для статьи

---

## 📰 Контентные элементы

### 1. Заголовки

```tsx
<h2>Основной заголовок раздела</h2>
<h3>Подзаголовок</h3>
<h4>Вспомогательный заголовок</h4>
```

**Стили:**
- `h2` - белый цвет, крупный шрифт, жирный
- `h3` - серый цвет, средний размер
- `h4` - серый цвет, небольшой размер

### 2. Параграфы

```tsx
<p>Обычный текст параграфа с автоматическими отступами.</p>
<p className="text-xl mb-6">Увеличенный параграф для акцента.</p>
```

### 3. Списки

#### Маркированный список
```tsx
<ul>
  <li>Элемент списка</li>
  <li><strong>Жирный элемент</strong> - с описанием</li>
  <li>Еще один элемент</li>
</ul>
```

#### Нумерованный список
```tsx
<ol>
  <li>Первый пункт</li>
  <li>Второй пункт</li>
  <li>Третий пункт</li>
</ol>
```

### 4. Цитаты

```tsx
<blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-300">
  "Текст цитаты"
  <footer className="text-sm mt-2 text-gray-400">— Автор цитаты</footer>
</blockquote>
```

**Варианты цветов:**
- `border-blue-500` - синяя полоса
- `border-green-500` - зеленая полоса
- `border-yellow-500` - желтая полоса
- `border-red-500` - красная полоса

---

## 💻 Код и технические элементы

### 1. CodeBlock (Рекомендуемый)

```tsx
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block";

<CodeBlock>
  <CodeBlockCode 
    language="tsx"
    theme="github-dark"
    code={`const example = "Ваш код здесь";`}
  />
</CodeBlock>
```

**Параметры CodeBlockCode:**
- `language` - язык программирования (tsx, javascript, python, etc.)
- `theme` - тема подсветки (github-dark, github-light, etc.)
- `code` - строка с кодом

### 2. Inline код

```tsx
<code className="bg-gray-800 px-2 py-1 rounded text-sm">инлайн код</code>
```

---

## 🎨 Специальные блоки

### 1. Информационный блок

```tsx
<div className="bg-gray-800 rounded-lg p-6 my-8">
  <h3 className="text-lg font-semibold mb-3 text-white">💡 Важная информация</h3>
  <p className="text-gray-300">Содержимое информационного блока</p>
</div>
```

### 2. Предупреждение

```tsx
<div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-6 my-8">
  <h3 className="text-lg font-semibold mb-3 text-yellow-400">⚠️ Внимание</h3>
  <p className="text-yellow-200">Текст предупреждения</p>
</div>
```

### 3. Успех/Совет

```tsx
<div className="bg-green-900/30 border border-green-600 rounded-lg p-6 my-8">
  <h3 className="text-lg font-semibold mb-3 text-green-400">✅ Совет</h3>
  <p className="text-green-200">Полезный совет или информация об успехе</p>
</div>
```

### 4. Ошибка/Опасность

```tsx
<div className="bg-red-900/30 border border-red-600 rounded-lg p-6 my-8">
  <h3 className="text-lg font-semibold mb-3 text-red-400">❌ Важно</h3>
  <p className="text-red-200">Критическая информация</p>
</div>
```

---

## 🔗 Ссылки и кнопки

### 1. Обычные ссылки

```tsx
<a href="/path" className="text-blue-400 hover:underline">Текст ссылки</a>
```

### 2. Внешние ссылки

```tsx
<a 
  href="https://example.com" 
  target="_blank" 
  className="text-blue-400 hover:underline"
>
  Внешняя ссылка
</a>
```

### 3. Кнопки

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Основная кнопка</Button>
<Button variant="outline">Кнопка с обводкой</Button>
<Button variant="secondary">Вторичная кнопка</Button>
<Button variant="ghost">Прозрачная кнопка</Button>
```

---

## 🖼️ Изображения

### 1. Обычное изображение

```tsx
<img 
  src="/images/example.jpg" 
  alt="Описание изображения"
  className="rounded-lg border border-gray-700 my-6"
/>
```

### 2. Изображение с подписью

```tsx
<figure className="my-8">
  <img 
    src="/images/example.jpg" 
    alt="Описание"
    className="rounded-lg border border-gray-700 w-full"
  />
  <figcaption className="text-sm text-gray-400 mt-2 text-center">
    Подпись к изображению
  </figcaption>
</figure>
```

---

## 📏 Разделители и отступы

### 1. Горизонтальная линия

```tsx
<hr className="border-gray-700 my-8" />
```

### 2. Пустое пространство

```tsx
<div className="my-8"></div>  {/* Большой отступ */}
<div className="my-4"></div>  {/* Средний отступ */}
<div className="my-2"></div>  {/* Маленький отступ */}
```

---

## 🎯 Лучшие практики

### 1. Структура статьи
```
1. Вводный параграф (text-xl)
2. Основные заголовки (h2)
3. Подразделы (h3)
4. Списки для перечислений
5. Код-блоки для примеров
6. Информационные блоки для важной информации
7. Заключительный параграф
```

### 2. Типографика
- Используйте **жирный текст** для акцентов
- Используйте `инлайн код` для технических терминов
- Добавляйте отступы между разделами
- Используйте списки вместо длинных параграфов

### 3. Цветовая схема
- Белый (`text-white`) - заголовки h2
- Серый светлый (`text-gray-300`) - основной текст
- Серый темный (`text-gray-400`) - вспомогательный текст
- Синий (`text-blue-400`) - ссылки
- Цветные блоки для категоризации информации

---

## 📋 Шаблон для быстрого старта

```tsx
const articleContent = (
  <div>
    <p className="text-xl mb-6">
      Вводный параграф статьи с кратким описанием темы.
    </p>
    
    <h2>Основной раздел</h2>
    <p>Текст раздела...</p>
    
    <h3>Подраздел</h3>
    <ul>
      <li>Элемент списка</li>
      <li>Еще один элемент</li>
    </ul>
    
    <div className="bg-gray-800 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-3 text-white">💡 Важно</h3>
      <p className="text-gray-300">Важная информация</p>
    </div>
    
    <CodeBlock>
      <CodeBlockCode 
        language="tsx"
        theme="github-dark"
        code={`// Ваш код здесь`}
      />
    </CodeBlock>
    
    <p>Заключительный параграф.</p>
  </div>
);
```

---

*Документация обновлена: Март 2024*
*Версия: 1.0*
