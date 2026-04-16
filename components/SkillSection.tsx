"use client";

import { motion } from "framer-motion";
import { TerminalCard } from "./TerminalCard";

const SKILLS = [
  { name: "C++", level: 95, category: "language" },
  { name: "競技プログラミング (AtCoder)", level: 88, category: "competitive" },
  { name: "Python", level: 78, category: "language" },
  { name: "機械学習 / AI", level: 72, category: "ai" },
  { name: "TypeScript / Next.js", level: 65, category: "web" },
  { name: "Git / GitHub", level: 85, category: "tool" },
];

const CATEGORY_COLOR: Record<string, string> = {
  language: "bg-primary",
  competitive: "bg-[oklch(0.75_0.29_145)]",
  ai: "bg-[oklch(0.65_0.20_200)]",
  web: "bg-[oklch(0.65_0.20_260)]",
  tool: "bg-[oklch(0.65_0.15_80)]",
};

interface SkillBarProps {
  name: string;
  level: number;
  category: string;
  index: number;
}

function SkillBar({ name, level, category, index }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="space-y-1.5"
    >
      <div className="flex justify-between items-center text-sm">
        <span className="text-foreground">{name}</span>
        <span className="text-primary text-xs font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.2, duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${CATEGORY_COLOR[category] ?? "bg-primary"}`}
        />
      </div>
    </motion.div>
  );
}

export function SkillSection() {
  return (
    <section className="px-4 py-16 max-w-3xl mx-auto w-full">
      <TerminalCard title="~ $ cat skills.txt" delay={0.1}>
        <div className="mb-4 text-xs text-muted-foreground">
          <span className="text-primary">$</span> cat skills.txt
        </div>
        <div className="space-y-4">
          {SKILLS.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              category={skill.category}
              index={i}
            />
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
          <span className="text-primary">note:</span> レベルは主観的な自己評価です
        </div>
      </TerminalCard>
    </section>
  );
}
