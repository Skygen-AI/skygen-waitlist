import React from "react";

export default function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 py-10 text-white/80">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">© 2025 Speechka labs. All rights reserved.</p>
          <nav className="flex gap-6 text-sm">
            <a href="/site/legal/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/site/legal/terms" className="hover:text-white">Terms of Use</a>
            <a href="/site/legal/cookies" className="hover:text-white">Cookie Policy</a>
            <a href="/site/contacts" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}


