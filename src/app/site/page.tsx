"use client";

import React, { useRef } from "react";
import Link from "next/link";
import AutoPlayVideo from "@/components/marketing/AutoPlayVideo";
import { motion, useScroll, useTransform } from "framer-motion";
import { Features } from "@/components/blocks/features-8";
import TimeLine_01 from "@/components/ui/release-time-line";
import AboutSection2 from "@/components/ui/about-section-2";

export default function MarketingHomePage() {
  const container = useRef<HTMLDivElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Video scroll animation
  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: videoContainer,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Fade to black animation - similar to main landing
  const fadeToBlack = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Video scale animation - starts at 0.75x, stays 0.75x until 30%, then scales to 1.5x at 50% and stays 1.5x
  const videoScale = useTransform(videoScrollProgress, [0, 0.35, 0.45, 1], [0.75, 0.75, 1, 1]);

  return (
    <div ref={container} className="relative">
      {/* Black overlay that fades in on scroll */}
      <motion.div 
        style={{ opacity: fadeToBlack, backgroundColor: '#1a1a1a' }}
        className="fixed inset-0 z-30 pointer-events-none"
      />
      
      <motion.section 
        style={{ opacity: contentOpacity }}
        className="relative mx-auto max-w-6xl px-6 text-center h-[40vh] md:h-[35vh] lg:h-[40vh] flex flex-col justify-start pt-8 z-20"
      >
        <div 
          style={{
            fontWeight: 510,
            fontSize: 'clamp(2.4rem, 4.8vw, 4.8rem)',
            lineHeight: '1.1',
            background: 'linear-gradient(-120deg, #ffffff 0%, #ffffff 30%,rgb(151, 151, 151) 50%, #ffffff 70%, #ffffff 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            animation: 'shine 2s linear infinite',
            paddingBottom: '0.1em'
          }}
          className="text-7xl lg:text-8xl font-bold"
        >
          SkyGen
        </div>
        <p className="mt-4 text-white/80 max-w-4xl mx-auto text-lg">Your cross‑device AI assistant that seamlessly connects and controls all your devices with natural voice commands. The first unified AI system that works everywhere you are.</p>
      </motion.section>

      {/* Video section - part of hero */}
      <motion.div
        ref={videoContainer}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
        className="relative z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-32 mb-8 md:mb-16"
      >
        <section className="mx-auto max-w-6xl px-4 md:px-6">
          <motion.div 
            initial={{ scale: 0.75 }}
            style={{ scale: videoScale, backgroundColor: '#1a1a1a' }}
            className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl origin-center"
          >
            <AutoPlayVideo className="w-full h-full" poster="/images/demo-poster.jpg" webmSrc="/demo.webm" mp4Src="/demo.mp4" />
          </motion.div>
          <div className="mt-8 flex items-center justify-center">
            <Link href="/site/waitlist" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90">Want to try it? Join the waitlist</Link>
          </div>
        </section>
      </motion.div>

      {/* Timeline section - moved right after video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
        className="relative z-40"
      >
        <TimeLine_01 
          title="SkyGen Key Features"
          description="Discover the powerful capabilities that make SkyGen the world's first truly unified cross-device AI assistant."
          entries={[
            {
              icon: () => <div className="w-4 h-4 bg-green-500 rounded-full" />,
              title: "Voice Intelligence",
              subtitle: "Natural Language Processing",
              description: "Advanced voice recognition and natural language understanding that works seamlessly across all your devices with context awareness.",
              items: [
                "Multi-language voice commands",
                "Context-aware responses",
                "Continuous conversation flow",
                "Offline voice processing",
                "Custom voice training"
              ],
              image: "/images/audioInput-demo.png"
            },
            {
              icon: () => <div className="w-4 h-4 bg-blue-500 rounded-full" />,
              title: "Smart Automation",
              subtitle: "Cross-Platform Integration",
              description: "Intelligent automation that learns your patterns and seamlessly controls all your devices - from smartphones to smart homes.",
              items: [
                "Smart home integration",
                "Cross-device synchronization",
                "Predictive automation",
                "Custom workflow creation",
                "Enterprise-grade security"
              ],
              image: "/images/systemEvents-demo.avif"
            },
            {
              icon: () => <div className="w-4 h-4 bg-purple-500 rounded-full" />,
              title: "Universal Access",
              subtitle: "Everywhere You Need It",
              description: "Complete accessibility across all platforms and devices with real-time sync, ensuring your AI assistant is always available when you need it.",
              items: [
                "Cross-platform availability",
                "Real-time device synchronization",
                "Cloud-based intelligence",
                "Offline functionality",
                "Developer API access"
              ],
              image: "/images/accessibility-demo.jpg",
              button: {
                url: "/site/waitlist",
                text: "Experience SkyGen"
              }
            }
          ]}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
        className="relative z-40"
      >
        <Features />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
        className="relative z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-16"
      >
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Demo scenario — How it works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">In the air</h3>
              <p className="text-white/80">Give a voice command from your phone, and SkyGen writes reports on your desktop, updates presentations on your laptop, and schedules meetings in your calendar—all ready when you land.</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">At home</h3>
              <p className="text-white/80">One command, and SkyGen runs your smart home—blinds go down, oven warms up, deliveries are confirmed—your evening is set.</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">In chats</h3>
              <p className="text-white/80">On phone and desktop, across WhatsApp, Telegram, and Slack, SkyGen filters noise, replies in your style, and gives a clear summary—so you never miss what matters.</p>
            </div>
          </div>

        </section>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
        className="relative z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-16"
      >
        <section className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-white/80 max-w-3xl mb-8 text-lg text-center mx-auto">SkyGen is the personal AI assistant that lives across all your devices and acts as one. From work to home, from travel to chats—it handles the tasks, so you get back your time.</p>
          <div className="text-center">
            <Link href="/site/waitlist" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90">Join the waitlist</Link>
          </div>
        </section>
      </motion.div>
    </div>
  );
}


