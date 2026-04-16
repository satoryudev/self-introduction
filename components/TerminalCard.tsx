"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function TerminalCard({
  title,
  children,
  className,
  delay = 0,
}: TerminalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "rounded-md border border-border bg-card overflow-hidden shadow-lg shadow-black/40",
        className
      )}
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[oklch(0.17_0.01_255)] border-b border-border">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-muted-foreground select-none">
          {title}
        </span>
      </div>
      {/* Content */}
      <div className="p-5 relative">{children}</div>
    </motion.div>
  );
}
