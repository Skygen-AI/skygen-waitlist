"use client";

import React, { useRef } from "react";
import Link from "next/link";
import AutoPlayVideo from "@/components/marketing/AutoPlayVideo";
import { motion, useScroll, useTransform } from "framer-motion";
import { Features } from "@/components/blocks/features-8";
import NotificationCenter from "@/components/ui/notification-center";
import { Browser } from "@/components/ui/browser-simulator";

export default function MarketingHomePage() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Fade to black animation - similar to main landing
  const fadeToBlack = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={container} className="relative">
      {/* Black overlay that fades in on scroll */}
      <motion.div 
        style={{ opacity: fadeToBlack }}
        className="fixed inset-0 bg-black z-30 pointer-events-none"
      />
      
      <motion.section 
        style={{ opacity: contentOpacity }}
        className="relative mx-auto max-w-6xl px-6 text-center h-screen flex flex-col justify-center -mt-24 z-20"
      >
        <div 
          style={{
            fontWeight: 510,
            fontSize: 'clamp(3rem, 6vw, 6rem)',
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-2">Your cross‑device AI assistant. The first of its kind.</h1>
        <p className="mt-6 text-white/80 max-w-4xl mx-auto text-lg">One AI that connects all your devices—phone, laptop, desktop, even your smart home—into one whole. Say a single voice command, and your devices work for you, wherever you are—together or one by one. They handle tasks and give you back time for what matters most—your life. Always with you. Always working. 25/8. SkyGen writes reports, schedules meetings, books doctor appointments, reserves tables, and prepares your home. Work, personal life, and daily tasks—handled in sync across devices—so you have time to enjoy life.</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/site/waitlist" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90">Want to try it? Join the waitlist</Link>
        </div>
      </motion.section>

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

          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">Cross-Device Web Control</h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">SkyGen can control your browser across all devices, helping you research, bookmark, and organize information seamlessly.</p>
            <div className="flex justify-center">
              <Browser />
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
          <h2 className="text-2xl font-semibold mb-6">See SkyGen in Action</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
            <AutoPlayVideo className="w-full h-full" poster="/images/demo-poster.jpg" webmSrc="/demo.webm" mp4Src="/demo.mp4" />
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
          <h2 className="text-3xl font-bold text-center mb-12">Smart Notifications</h2>
          <div className="flex justify-center">
            <NotificationCenter 
              cardTitle="Intelligent Alert System"
              cardDescription="SkyGen learns your patterns and sends smart, contextual notifications across all your devices."
              notificationTitle="SkyGen"
              notificationDescription="Your meeting prep is ready. Documents organized, agenda set."
              notificationTime="now"
            />
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


