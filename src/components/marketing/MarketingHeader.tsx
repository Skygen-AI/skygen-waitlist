"use client";
import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const menu = [
  { name: "Home", href: "/site" },
  { name: "Features", href: "/site/features" },
  { name: "Waitlist", href: "/site/waitlist" },
  { name: "Pricing", href: "/site/pricing" },
  { name: "Blog", href: "/site/blog" },
];

export default function MarketingHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      <nav data-state={menuOpen && "active"} className="fixed z-40 w-full px-2 group">
        <div className={cn("mx-auto mt-2 transition-all duration-300 px-6 lg:px-12", isScrolled ? "max-w-4xl bg-background/50 rounded-2xl border backdrop-blur-lg lg:px-5" : "max-w-6xl")}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/site" aria-label="home" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white">SkyGen</span>
              </Link>
              <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close Menu" : "Open Menu"} className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menu.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white hover:text-white/80 block duration-150">
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menu.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-white hover:text-white/80 block duration-150">
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Link href="/get-started" className={cn("text-white/90 text-sm", isScrolled ? "lg:inline-flex" : "hidden")}>Join Waitlis</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}


