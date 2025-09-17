"use client";

import React, { useRef } from "react";
import Link from "next/link";
import AutoPlayVideo from "@/components/marketing/AutoPlayVideo";
import { motion, useScroll, useTransform } from "framer-motion";
import { Features } from "@/components/blocks/features-8";
import NotificationCenter from "@/components/ui/notification-center";
import { Browser } from "@/components/ui/browser-simulator";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Terminal, TypingAnimation } from "@/components/ui/terminal";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import { BonusesIncentivesCard } from "@/components/ui/animated-dashboard-card";

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
          <h2 className="text-3xl font-bold text-center mb-12">Command Line Interface</h2>
          <p className="text-white/80 text-center mb-8 max-w-2xl mx-auto">SkyGen provides powerful CLI tools for developers and power users to automate complex workflows.</p>
          <div className="flex justify-center">
            <Terminal sequence>
              <TypingAnimation>$ skygen init</TypingAnimation>
              <TypingAnimation>✓ Initializing SkyGen workspace...</TypingAnimation>
              <TypingAnimation>✓ Setting up AI models...</TypingAnimation>
              <TypingAnimation>✓ Configuring device connections...</TypingAnimation>
              <TypingAnimation>✓ SkyGen ready to go!</TypingAnimation>
              <TypingAnimation>$ skygen task --create 'Book flight to NYC'</TypingAnimation>
              <TypingAnimation>✓ Task created and assigned to travel agent</TypingAnimation>
            </Terminal>
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
          <h2 className="text-3xl font-bold text-center mb-12">Explore SkyGen Features</h2>
          <BentoGrid>
            <BentoCard
              name="Voice Commands"
              className="col-span-1"
              background={<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />}
              Icon={() => <div className="w-6 h-6 bg-blue-500 rounded-full" />}
              description="Control all your devices with natural voice commands"
              href="/site/features"
              cta="Learn more"
            />
            <BentoCard
              name="Smart Automation"
              className="col-span-2"
              background={<div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20" />}
              Icon={() => <div className="w-6 h-6 bg-green-500 rounded-full" />}
              description="AI-powered automation that learns your patterns and preferences"
              href="/site/features"
              cta="Discover"
            />
            <BentoCard
              name="Cross-Platform"
              className="col-span-2"
              background={<div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20" />}
              Icon={() => <div className="w-6 h-6 bg-orange-500 rounded-full" />}
              description="Seamlessly work across desktop, mobile, and smart home devices"
              href="/site/features"
              cta="See how"
            />
            <BentoCard
              name="Privacy First"
              className="col-span-1"
              background={<div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />}
              Icon={() => <div className="w-6 h-6 bg-purple-500 rounded-full" />}
              description="Your data stays yours, with end-to-end encryption"
              href="/site/features"
              cta="Security"
            />
          </BentoGrid>
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Real-time Activity Feed</h2>
              <p className="text-white/80 mb-8">See SkyGen in action as it completes tasks across your ecosystem. Live updates keep you informed of every automation.</p>
              <div className="max-w-md">
                <AnimatedList>
                  <AnimatedListItem>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Email draft completed</span>
                    </div>
                  </AnimatedListItem>
                  <AnimatedListItem>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Calendar updated</span>
                    </div>
                  </AnimatedListItem>
                  <AnimatedListItem>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Smart home configured</span>
                    </div>
                  </AnimatedListItem>
                  <AnimatedListItem>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Travel booking initiated</span>
                    </div>
                  </AnimatedListItem>
                </AnimatedList>
              </div>
            </div>
            <div className="flex justify-center">
              <BonusesIncentivesCard 
                bonusText="Tasks Completed"
                incentivesText="Time Saved"
                bonusesValue={1247}
                incentivesValue={89}
              />
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


