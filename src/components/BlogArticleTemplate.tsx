import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share } from "lucide-react";

interface BlogArticleTemplateProps {
  slug: string;
  title: string;
  author?: string;
  publishedDate?: string;
  readTime?: string;
  category?: string;
  thumbnailImage: string;
  content: React.ReactNode;
  tags?: string[];
}

const BlogArticleTemplate: React.FC<BlogArticleTemplateProps> = ({
  slug,
  title,
  author = "SkyGen Team",
  publishedDate = "March 2024",
  readTime = "5 min read",
  category = "Blog",
  thumbnailImage,
  content,
  tags = [],
}) => {
  return (
    <article className="min-h-screen">
      {/* Half-screen hero section with gradient overlay */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${thumbnailImage})` }}
        />
        
        {/* Gradient overlay - darker at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
        
        {/* Back navigation */}
        <div className="absolute top-8 left-8 z-10">
          <Link 
            href="/site/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Hero content - positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Category badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 uppercase tracking-wider">
                {category}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            
            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="relative bg-black">
        <div className="max-w-4xl mx-auto px-8 py-16">
          {/* Article content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed">
              {content}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Share this article</h3>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                  <Share className="w-4 h-4" />
                  <span>Share on X</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                  <Share className="w-4 h-4" />
                  <span>Share on Discord</span>
                </button>
              </div>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-16 text-center">
            <Link 
              href="/site/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogArticleTemplate;
