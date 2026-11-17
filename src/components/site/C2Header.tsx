"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { cx } from "@/utils/format";
import { C2Logo } from "./C2Logo";
import { C2 } from "./links";

const NAV = [
  { href: C2.thobe, label: "Thobes" },
  { href: C2.shirt, label: "Shirts" },
  { href: C2.hat, label: "Hats" },
  { href: C2.story, label: "Our story" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function C2Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // On the homepage the bar floats over the hero photograph until you scroll.
  const overHero = pathname === C2.home && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cx(
          "sticky top-0 z-40 transition-colors duration-500",
          overHero ? "bg-transparent text-ink" : "bg-ivory/95 text-ink backdrop-blur-sm",
        )}
      >
        <div className="c2-shell flex h-[var(--c2-nav-h)] items-center justify-between gap-4">
          <Link href={C2.home} aria-label="ATHAR THOBES home" className="shrink-0">
            <C2Logo markClassName="text-maroon" />
          </Link>

          <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 gap-8 md:flex lg:gap-10">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="c2-caps c2-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-5 md:gap-7">
            <button type="button" onClick={open} className="c2-caps c2-link whitespace-nowrap" aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}>
              Bag <span className="tabular-nums">({count})</span>
            </button>
            <button
              type="button"
              className="c2-caps md:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="c2-menu"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="c2-menu"
              key="menu"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.6, ease }}
              className="absolute inset-x-0 top-full flex h-[calc(100dvh-var(--c2-nav-h))] flex-col justify-between bg-ivory px-5 pb-10 pt-8 text-ink md:hidden"
            >
              <nav aria-label="Mobile" className="flex flex-col">
                {NAV.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.07, duration: 0.6, ease }}
                    className="border-b border-line/70"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="c2-serif block py-5 text-[3.25rem] italic leading-none"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="c2-caps flex justify-between text-muted">
                <span>Minneapolis, Minnesota</span>
                <span>Est. 2026</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
