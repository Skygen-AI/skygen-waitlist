"use client";
import React from "react";

export default function ContactSalesPage() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Contact Sales</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder-white/60"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder-white/60"
          required
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full min-h-32 rounded-md border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder-white/60"
          required
        />
        <button type="submit" className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90">Send</button>
        {status === "success" && <p className="text-green-400 text-sm">Thanks! We'll get back to you.</p>}
        {status === "error" && <p className="text-red-400 text-sm">Please fill out all fields correctly.</p>}
      </form>

      <div className="mt-10 flex gap-4 text-white/80">
        <a className="underline" href="https://discord.gg/">Discord</a>
        <a className="underline" href="https://twitter.com/">Twitter</a>
        <a className="underline" href="https://t.me/">Telegram</a>
      </div>
    </div>
  );
}


