import React from "react";
import { PricingSection } from "@/components/ui/pricing";

export default function PricingPage() {
  const plans = [
    {
      name: "Personal",
      info: "Free basics for individuals",
      price: { monthly: 0, yearly: 0 },
      features: [
        { text: "Basic tasks" },
        { text: "Email assistance" },
        { text: "Cross-device sync" },
      ],
      btn: { text: "Coming soon", href: "/site/waitlist" },
    },
    {
      name: "Pro",
      info: "Advanced integrations and automations",
      price: { monthly: 29, yearly: 290 },
      features: [
        { text: "Travel and bookings" },
        { text: "Smart home" },
        { text: "Research tools" },
      ],
      btn: { text: "Join Waitlist", href: "/site/waitlist" },
      highlighted: true,
    },
    {
      name: "Business",
      info: "Teams & APIs",
      price: { monthly: 99, yearly: 990 },
      features: [
        { text: "Team workspaces" },
        { text: "Admin controls" },
        { text: "API access" },
      ],
      btn: { text: "Contact Sales", href: "/site/contacts" },
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <PricingSection heading="Pricing" description="MVP — Coming soon" plans={plans as any} />
    </div>
  );
}


