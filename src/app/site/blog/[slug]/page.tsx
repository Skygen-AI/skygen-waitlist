import React from "react";
import BlogArticleTemplate from "@/components/BlogArticleTemplate";

// Mock data for different articles
const articlesData: Record<string, any> = {
  welcome: {
    title: "Welcome to SkyGen",
    author: "SkyGen Team",
    publishedDate: "15 Mar 2024",
    readTime: "3 min read",
    category: "Product Updates",
    thumbnailImage: "/images/accessibility-demo.jpg",
    tags: ["Product Updates", "AI", "Launch"],
    content: (
      <div>
        <p>Welcome to SkyGen - the next generation of AI-powered productivity tools designed to revolutionize how you work and interact with technology.</p>
        
        <h2>What is SkyGen?</h2>
        <p>SkyGen is an innovative AI assistant that seamlessly integrates into your workflow, providing intelligent automation and insights to boost your productivity. Our mission is to make AI accessible, private, and truly useful for everyday tasks.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li><strong>Private AI</strong> - Your data stays secure and private</li>
          <li><strong>Smart Automation</strong> - Automate repetitive tasks effortlessly</li>
          <li><strong>Cross-Platform</strong> - Works on desktop and web</li>
          <li><strong>Intuitive Interface</strong> - Designed for ease of use</li>
        </ul>
        
        <p>We're excited to have you on this journey with us. Stay tuned for more updates and features coming your way!</p>
      </div>
    ),
  },
  "use-cases": {
    title: "Top 5 Use Cases for SkyGen",
    author: "SkyGen Team",
    publishedDate: "20 Mar 2024",
    readTime: "7 min read",
    category: "Use Cases",
    thumbnailImage: "/images/shortcuts-demo.png",
    tags: ["Use Cases", "Productivity", "Automation"],
    content: (
      <div>
        <p>Discover how SkyGen can transform your daily workflow with these practical use cases that deliver immediate value.</p>
        
        <h2>1. Email Management</h2>
        <p>Automatically categorize, prioritize, and draft responses to your emails. SkyGen learns your communication style and helps maintain professional correspondence effortlessly.</p>
        
        <h2>2. Document Processing</h2>
        <p>Extract key information from PDFs, contracts, and reports. Generate summaries, create action items, and organize documents intelligently.</p>
        
        <h2>3. Meeting Assistance</h2>
        <p>Transcribe meetings, generate notes, and create follow-up tasks. Never miss important details or action items again.</p>
        
        <h2>4. Code Review & Documentation</h2>
        <p>Analyze code for best practices, generate documentation, and suggest improvements. Perfect for development teams looking to maintain code quality.</p>
        
        <h2>5. Research & Analysis</h2>
        <p>Quickly research topics, analyze data trends, and compile comprehensive reports. Turn hours of research into minutes of focused insights.</p>
        
        <p>These are just the beginning. SkyGen adapts to your unique needs and continues to learn from your workflows.</p>
      </div>
    ),
  },
  "ai-insights": {
    title: "Private AI: Why It Matters",
    author: "SkyGen Team",
    publishedDate: "25 Mar 2024",
    readTime: "5 min read",
    category: "AI Insights",
    thumbnailImage: "/images/recording-demo.jpg",
    tags: ["AI Insights", "Privacy", "Security"],
    content: (
      <div>
        <p>In an era where data privacy is paramount, understanding the importance of private AI becomes crucial for both individuals and organizations.</p>
        
        <h2>What is Private AI?</h2>
        <p>Private AI refers to artificial intelligence systems that process and analyze data without compromising user privacy. This means your sensitive information never leaves your control or gets stored on external servers.</p>
        
        <h2>The Privacy Challenge</h2>
        <p>Traditional AI services often require uploading your data to cloud servers for processing. This creates several concerns:</p>
        <ul>
          <li>Data breaches and unauthorized access</li>
          <li>Compliance with regulations like GDPR</li>
          <li>Loss of control over sensitive information</li>
          <li>Potential misuse of personal or business data</li>
        </ul>
        
        <h2>SkyGen's Approach</h2>
        <p>At SkyGen, we've designed our AI to prioritize privacy from the ground up:</p>
        <ul>
          <li><strong>Local Processing</strong> - AI runs on your device when possible</li>
          <li><strong>Encrypted Communications</strong> - All data transfers are encrypted</li>
          <li><strong>No Data Storage</strong> - We don't store your personal data</li>
          <li><strong>Transparent Practices</strong> - Clear policies on data handling</li>
        </ul>
        
        <h2>The Future of AI</h2>
        <p>We believe that powerful AI and strong privacy are not mutually exclusive. The future belongs to AI systems that respect user privacy while delivering exceptional capabilities.</p>
        
        <p>Join us in building a more private, secure, and trustworthy AI future.</p>
      </div>
    ),
  },
};

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const articleData = articlesData[slug];

  // Fallback for articles not in our data
  if (!articleData) {
    return (
      <BlogArticleTemplate
        slug={slug}
        title={slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
        thumbnailImage="/images/accessibility-demo.jpg"
        content={
          <div>
            <p>This article is coming soon. We're working on bringing you valuable insights and updates.</p>
            <p>In the meantime, check out our other articles or get started with SkyGen today!</p>
          </div>
        }
      />
    );
  }

  return (
    <BlogArticleTemplate
      slug={slug}
      title={articleData.title}
      author={articleData.author}
      publishedDate={articleData.publishedDate}
      readTime={articleData.readTime}
      category={articleData.category}
      thumbnailImage={articleData.thumbnailImage}
      content={articleData.content}
      tags={articleData.tags}
    />
  );
}


