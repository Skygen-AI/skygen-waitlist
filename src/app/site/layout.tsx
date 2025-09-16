"use client";
import React from "react";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import CookieBanner from "@/components/marketing/CookieBanner";
import Silk from "@/components/Silk";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen text-white">
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={3}
          scale={1.4}
          color="#333333"
          noiseIntensity={0.8}
          rotation={0.2}
        />
      </div>
      <MarketingHeader />
      <main className="pt-24">{children}</main>
      <MarketingFooter />
      <CookieBanner />
    </div>
  );
}


