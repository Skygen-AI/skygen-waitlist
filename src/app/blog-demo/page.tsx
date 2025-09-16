import React from "react";
import BlogArticleTemplate from "@/components/BlogArticleTemplate";
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";

export default function BlogDemoPage() {
  const demoContent = (
    <div>
      <p className="text-xl mb-6">
        📚 Добро пожаловать в демонстрацию всех доступных компонентов и тегов для создания красивых статей блога SkyGen! 
        Эта страница показывает все возможности оформления контента.
      </p>
      
      <h2 className="text-2xl font-bold mb-4 text-white">📝 Заголовки и текст</h2>
      <p className="mb-4">
        Используйте различные уровни заголовков для структурирования контента:
      </p>
      
      <h3 className="text-xl font-semibold mb-3 text-gray-200">Это h3 заголовок</h3>
      <h4 className="text-lg font-medium mb-3 text-gray-300">Это h4 заголовок</h4>
      
      <p className="mb-4">
        Обычный параграф с <strong>жирным текстом</strong> и <code className="bg-gray-800 px-2 py-1 rounded text-sm">инлайн кодом</code>. 
        Также можно добавить <a href="#" className="text-blue-400 hover:underline">ссылки</a>.
      </p>
      
      <hr className="border-gray-700 my-8" />
      
      <h2 className="text-2xl font-bold mb-4 text-white">📋 Списки</h2>
      
      <h3 className="text-xl font-semibold mb-3 text-gray-200">Маркированный список:</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Первый элемент списка</li>
        <li><strong>Жирный элемент</strong> - с дополнительным описанием</li>
        <li>Элемент с <code className="bg-gray-800 px-1 rounded text-sm">инлайн кодом</code></li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 text-gray-200">Нумерованный список:</h3>
      <ol className="list-decimal pl-6 mb-6 space-y-2">
        <li>Первый пункт</li>
        <li>Второй пункт</li>
        <li>Третий пункт</li>
      </ol>
      
      <hr className="border-gray-700 my-8" />
      
      <h2 className="text-2xl font-bold mb-4 text-white">💬 Цитаты</h2>
      
      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-300">
        "Хороший дизайн — это не то, как что-то выглядит. Хороший дизайн — это то, как что-то работает."
        <footer className="text-sm mt-2 text-gray-400">— Стив Джобс</footer>
      </blockquote>
      
      <blockquote className="border-l-4 border-green-500 pl-4 my-6 italic text-gray-300">
        "Простота — это высшая форма изощренности."
        <footer className="text-sm mt-2 text-gray-400">— Леонардо да Винчи</footer>
      </blockquote>
      
      <hr className="border-gray-700 my-8" />
      
      <h2 className="text-2xl font-bold mb-4 text-white">💻 Код</h2>
      
      <h3 className="text-xl font-semibold mb-3 text-gray-200">CodeBlock компонент (Рекомендуется):</h3>
      
      <CodeBlock>
        <CodeBlockCode 
          language="tsx"
          theme="github-dark"
          code={`import { BlogArticleTemplate } from "@/components/BlogArticleTemplate";

const MyArticle = () => {
  return (
    <BlogArticleTemplate
      title="Заголовок статьи"
      author="Автор"
      publishedDate="Дата"
      thumbnailImage="/path/to/image.jpg"
      content={<YourContent />}
      tags={["тег1", "тег2"]}
    />
  );
};`}
        />
      </CodeBlock>
      
      <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-200">JavaScript пример:</h3>
      
      <CodeBlock>
        <CodeBlockCode 
          language="javascript"
          theme="github-dark"
          code={`const user = {
  name: "John Doe",
  age: 30,
  skills: ["React", "TypeScript", "Node.js"]
};

function greetUser(user) {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}`}
        />
      </CodeBlock>
      
      <hr className="border-gray-700 my-8" />
      
      <h2 className="text-2xl font-bold mb-4 text-white">🎨 Специальные блоки</h2>
      
      <div className="bg-gray-800 rounded-lg p-6 my-8">
        <h3 className="text-lg font-semibold mb-3 text-white">💡 Информационный блок</h3>
        <p className="text-gray-300">Используйте такие блоки для важной информации, которая должна выделяться из основного текста.</p>
      </div>
      
      <div className="bg-green-900/30 border border-green-600 rounded-lg p-6 my-8">
        <h3 className="text-lg font-semibold mb-3 text-green-400">✅ Совет</h3>
        <p className="text-green-200">Зеленые блоки отлично подходят для полезных советов, успешных примеров и положительной информации.</p>
      </div>
      
      <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-6 my-8">
        <h3 className="text-lg font-semibold mb-3 text-yellow-400">⚠️ Внимание</h3>
        <p className="text-yellow-200">Желтые блоки привлекают внимание к важным замечаниям, которые нужно учесть.</p>
      </div>
      
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-6 my-8">
        <h3 className="text-lg font-semibold mb-3 text-red-400">❌ Важно</h3>
        <p className="text-red-200">Красные блоки используются для критически важной информации или предупреждений об ошибках.</p>
      </div>
      
      <hr className="border-gray-700 my-8" />
      
      <h2 className="text-2xl font-bold mb-4 text-white">🔘 Кнопки</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <Button variant="default">Основная кнопка</Button>
        <Button variant="outline">Кнопка с обводкой</Button>
        <Button variant="secondary">Вторичная кнопка</Button>
        <Button variant="ghost">Прозрачная кнопка</Button>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <Button size="sm">Маленькая</Button>
        <Button size="default">Обычная</Button>
        <Button size="lg">Большая</Button>
      </div>
      
      <hr className="border-gray-700 my-8" />
      
      <h2 className="text-2xl font-bold mb-4 text-white">🖼️ Изображения</h2>
      
      <figure className="my-8">
        <img 
          src="/images/shortcuts-demo.png" 
          alt="Пример изображения"
          className="rounded-lg border border-gray-700 w-full max-w-md mx-auto block"
        />
        <figcaption className="text-sm text-gray-400 mt-2 text-center">
          Пример изображения с подписью
        </figcaption>
      </figure>
      
      <hr className="border-gray-700 my-8" />
      
      <h2 className="text-2xl font-bold mb-4 text-white">📊 Таблицы (HTML)</h2>
      
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-600 text-sm">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-600 px-4 py-2 text-left">Компонент</th>
              <th className="border border-gray-600 px-4 py-2 text-left">Назначение</th>
              <th className="border border-gray-600 px-4 py-2 text-left">Пример</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 px-4 py-2"><code>h2</code></td>
              <td className="border border-gray-600 px-4 py-2">Основные заголовки</td>
              <td className="border border-gray-600 px-4 py-2">Заголовки разделов</td>
            </tr>
            <tr className="bg-gray-900/50">
              <td className="border border-gray-600 px-4 py-2"><code>CodeBlock</code></td>
              <td className="border border-gray-600 px-4 py-2">Блоки кода</td>
              <td className="border border-gray-600 px-4 py-2">Примеры программирования</td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2"><code>blockquote</code></td>
              <td className="border border-gray-600 px-4 py-2">Цитаты</td>
              <td className="border border-gray-600 px-4 py-2">Важные высказывания</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <hr className="border-gray-700 my-8" />
      
      <h2 className="text-2xl font-bold mb-4 text-white">🎯 Заключение</h2>
      
      <p className="mb-4">
        Этот набор компонентов предоставляет все необходимые инструменты для создания 
        красивых, информативных и хорошо структурированных статей блога. 
      </p>
      
      <p className="mb-6">
        Полная документация доступна в файле <code className="bg-gray-800 px-2 py-1 rounded text-sm">BLOG_COMPONENTS_DOCS.md</code>.
      </p>
      
      <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6 my-8">
        <h3 className="text-lg font-semibold mb-3 text-blue-400">🚀 Готово к использованию!</h3>
        <p className="text-blue-200">
          Все компоненты протестированы и готовы для создания билдера статей. 
          Используйте эту страницу как референс при разработке.
        </p>
      </div>
    </div>
  );

  return (
    <BlogArticleTemplate
      slug="blog-demo"
      title="📚 Полный гайд по компонентам блога SkyGen"
      author="SkyGen Design Team"
      publishedDate="Сегодня"
      readTime="8 мин чтения"
      category="Демо"
      thumbnailImage="/images/accessibility-demo.jpg"
      content={demoContent}
      tags={["Документация", "Компоненты", "Блог", "UI/UX", "Гайд"]}
    />
  );
}
