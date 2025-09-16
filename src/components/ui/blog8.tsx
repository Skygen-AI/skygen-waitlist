
"use client";

import { Card } from "@/components/ui/card";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  tags?: string[];
}

interface Blog8Props {
  heading?: string;
  description?: string;
  posts?: Post[];
}

const Blog8 = ({
  heading = "Blog Posts",
  description = "Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.",
  posts = [
    {
      id: "post-1",
      title:
        "Building Modern UIs: A Deep Dive into Shadcn and React Components",
      summary:
        "Join us for an in-depth exploration of building modern user interfaces using shadcn/ui and React. Learn best practices and advanced techniques.",
      label: "Web Design",
      author: "Sarah Chen",
      published: "15 Feb 2024",
      url: "https://shadcnblocks.com",
      image: "/images/block/placeholder-dark-1.svg",
      tags: ["Web Design", "UI Development"],
    },
    {
      id: "post-2",
      title: "Mastering Tailwind CSS: From Basics to Advanced Techniques",
      summary:
        "Discover how to leverage the full power of Tailwind CSS to create beautiful, responsive websites with clean and maintainable code.",
      label: "Web Design",
      author: "Michael Park",
      published: "22 Feb 2024",
      url: "https://shadcnblocks.com",
      image: "/images/block/placeholder-dark-1.svg",
      tags: ["Web Design", "CSS"],
    },
  ],
}: Blog8Props) => {
  return (
    <section className="pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {(heading || description) && (
          <div className="text-center mb-16">
            {heading && (
              <h1 className="mx-auto mb-6 text-pretty text-5xl font-bold md:text-6xl lg:text-7xl lg:max-w-3xl">
                {heading}
              </h1>
            )}
            {description && (
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
                {description}
              </p>
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
          className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div>
            {posts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.25, 0, 1]
              }}
            >
              <Card
                className="border-0 bg-transparent shadow-none py-6 sm:py-8 md:py-10 lg:py-12"
              >
              <div className="grid gap-y-6 sm:grid-cols-12 sm:gap-x-8 sm:gap-y-0 md:items-center md:gap-x-12 lg:gap-x-16 max-w-6xl mx-auto">
                <div className="sm:col-span-7">
                  <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl mb-4">
                    <a
                      href={post.url}
                      target="_blank"
                      className="hover:underline"
                    >
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-muted-foreground md:text-lg">
                    {post.summary}
                  </p>
                  <div className="mt-6 flex items-center text-sm md:mt-8">
                    <span className="text-muted-foreground">
                      {post.published}
                    </span>
                  </div>
                </div>
                <div className="order-first sm:order-last sm:col-span-5">
                  <a href={post.url} target="_blank" className="block">
                    <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                      />
                    </div>
                  </a>
                </div>
              </div>
              </Card>
              
              {/* Divider between posts */}
              {index < posts.length - 1 && (
                <hr className="border-gray-700 my-0" />
              )}
            </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { Blog8 };
