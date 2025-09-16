import React from "react";
import { Blog8 } from "@/components/ui/blog8";

const posts = [
  {
    id: "welcome",
    title: "Welcome to SkyGen: Революция в области ИИ-ассистентов",
    summary: "Новое поколение AI-ассистентов для автоматизации рутинных задач и повышения продуктивности с полным контролем над данными.",
    label: "Product Updates",
    author: "Команда SkyGen",
    published: "15 Мар 2024",
    url: "/site/blog/welcome",
    image: "/images/accessibility-demo.jpg",
    tags: ["Product Updates", "AI", "Запуск"],
  },
  {
    id: "use-cases",
    title: "5 способов использования SkyGen для ежедневной продуктивности",
    summary: "Практические сценарии применения SkyGen: от автоматизации email до анализа документов и создания презентаций.",
    label: "Use Cases",
    author: "Алексей Петров", 
    published: "20 Мар 2024",
    url: "/site/blog/use-cases",
    image: "/images/shortcuts-demo.png",
    tags: ["Use Cases", "Productivity", "Автоматизация"],
  },
  {
    id: "ai-insights",
    title: "Приватный ИИ: Почему это критически важно в 2024 году",
    summary: "Анализ важности конфиденциальности в эпоху ИИ. Почему приватность не должна быть компромиссом при использовании AI-технологий.",
    label: "AI Insights",
    author: "Мария Иванова",
    published: "25 Мар 2024", 
    url: "/site/blog/ai-insights",
    image: "/images/recording-demo.jpg",
    tags: ["AI Insights", "Privacy", "Безопасность"],
  },
  {
    id: "automation-guide",
    title: "Автоматизация рабочих процессов с помощью SkyGen: Полное руководство",
    summary: "Руководство по настройке автоматизации рабочих процессов. Создание workflows для документов, проектов и анализа данных.",
    label: "Tutorials",
    author: "Дмитрий Козлов",
    published: "30 Мар 2024",
    url: "/site/blog/automation-guide",
    image: "/images/systemEvents-demo.avif",
    tags: ["Tutorials", "Automation", "Workflows"],
  },
  {
    id: "ai-ethics",
    title: "Этика ИИ и ответственная разработка: Наши принципы",
    summary: "Наш подход к этичной разработке AI-систем. Принципы прозрачности, справедливости и защиты прав пользователей.",
    label: "Philosophy",
    author: "София Белова",
    published: "5 Апр 2024",
    url: "/site/blog/ai-ethics",
    image: "/images/keychain-demo.jpg",
    tags: ["Ethics", "AI Philosophy", "Responsible AI"],
  },
  {
    id: "productivity-tips",
    title: "10 продвинутых техник повышения продуктивности с ИИ-ассистентами",
    summary: "Экспертные советы по эффективному использованию AI-помощников. Продвинутые техники и стратегии оптимизации работы.",
    label: "Tips & Tricks",
    author: "Игорь Смирнов",
    published: "10 Апр 2024",
    url: "/site/blog/productivity-tips",
    image: "/images/terminal-demo.png",
    tags: ["Productivity", "Tips", "Advanced"],
  },
  {
    id: "future-of-ai",
    title: "Будущее ИИ: Тренды и прогнозы на ближайшие 5 лет",
    summary: "Обзор ключевых трендов в развитии ИИ. Мультимодальные модели, автономные агенты и влияние на экономику.",
    label: "Research",
    author: "Андрей Волков",
    published: "15 Апр 2024",
    url: "/site/blog/future-of-ai",
    image: "/images/notifications-demo.png",
    tags: ["Research", "Future Tech", "Trends"],
  },
  {
    id: "getting-started",
    title: "Первые шаги с SkyGen: Руководство для начинающих",
    summary: "Пошаговое руководство для новых пользователей. Настройка проекта, создание запросов и интеграция в workflow.",
    label: "Getting Started",
    author: "Екатерина Попова",
    published: "20 Апр 2024",
    url: "/site/blog/getting-started",
    image: "/images/calendar-demo.png",
    tags: ["Getting Started", "Tutorial", "Beginners"],
  },
];

export default function BlogFeedPage() {
  return (
    <Blog8 
      heading="Blog"
      description="Insights, tutorials, and updates about SkyGen, automation, and the future of productivity"
      posts={posts}
    />
  );
}


