"use client";
import React from "react";

export default function WaitlistPage() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Join Waitlist</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder-white/60"
          required
        />
        <button type="submit" className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90">Join Waitlist</button>
        <a href="https://discord.com/oauth2/authorize" className="text-white/80 underline text-sm">Connect Discord</a>
        {status === "success" && <p className="text-green-400 text-sm">Thanks! We'll notify you.</p>}
        {status === "error" && <p className="text-red-400 text-sm">Please enter a valid email.</p>}
      </form>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Referral</h2>
        <div className="rounded-lg border border-white/15 bg-white/5 p-4">
          <p className="text-sm text-white/80">Your link: example.com/wl/abc123</p>
          <div className="mt-3 h-2 w-full rounded bg-white/10">
            <div className="h-2 w-2/12 rounded bg-white" />
          </div>
          <ul className="mt-3 text-sm text-white/80 list-disc pl-4">
            <li>1 invite — Early Access</li>
            <li>5 — Pro Trial</li>
            <li>20 — SkyRaffle</li>
          </ul>
        </div>
      </section>
    </div>
  );
}


