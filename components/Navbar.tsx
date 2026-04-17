"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#ai", label: "ai" },
  { href: "#atcoder", label: "atcoder" },
  { href: "#github", label: "github" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-35% 0px -60% 0px" }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-md border-b border-border shadow-sm shadow-black/10"
          : ""
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
        {/* ロゴ */}
        <a
          href="#"
          className="text-sm font-mono text-primary hover:opacity-70 transition-opacity shrink-0"
        >
          <span className="text-muted-foreground">~/</span>satoryudev
        </a>

        {/* ナビリンク */}
        <nav className="hidden sm:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-mono px-2.5 py-1 rounded transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* テーマ切り替え */}
        {mounted ? (
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-md border border-border bg-card/60 px-2.5 py-1 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors shrink-0"
            aria-label="テーマ切り替え"
          >
            <span>{theme === "dark" ? "☀" : "☾"}</span>
            <span className="hidden sm:inline">
              {theme === "dark" ? "light" : "dark"}
            </span>
          </button>
        ) : (
          <div className="w-16 h-7" />
        )}
      </div>
    </motion.header>
  );
}
