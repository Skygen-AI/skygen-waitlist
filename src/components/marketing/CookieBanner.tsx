"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CookieBannerProps = {
  className?: string;
};

export default function CookieBanner({ className }: CookieBannerProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent_v1");
      if (!consent) {
        setVisible(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const accept = React.useCallback(() => {
    try {
      localStorage.setItem("cookie_consent_v1", "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "px-4 pb-4",
        className
      )}
      role="region"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-5xl rounded-xl border border-white/20 bg-black/80 p-4 backdrop-blur-sm">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/90">
            We use cookies to improve your experience. By using our site, you agree to our
            <a className="underline ml-1" href="/site/legal/cookies">Cookie Policy</a>.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={accept} className="bg-white text-black hover:bg-white/90">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


