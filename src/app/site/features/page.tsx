import React from "react";

const features = [
  { title: "Email & Tasks", desc: "Drafts, follow-ups, and reminders handled automatically." },
  { title: "Bookings & Travel", desc: "Search, compare, and book with your preferences." },
  { title: "Smart Home", desc: "Orchestrate devices with natural commands." },
  { title: "Research & Insights", desc: "Summaries, comparisons, and insights on demand." },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Features</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="text-white/80 mt-2 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Daily Productivity</h2>
        <p className="text-white/80 max-w-3xl">Wake up, SkyGen briefs your day, prepares drafts, books your ride, and adjusts your home. You review and approve, SkyGen executes.</p>
      </section>
    </div>
  );
}


