"use client";

import { motion } from "framer-motion";
import { TerminalCard } from "./TerminalCard";
import { Badge } from "@/components/ui/badge";

const PROJECTS = [
  {
    name: "TebikiChart",
    slug: "tebiki-chart",
    description:
      "Webサイトのチュートリアルをノーコードでかんたんに作成できるアプリ。操作手順を誰でも直感的に作れる。",
    tags: ["ノーコード", "チュートリアル", "Web", "ハッカソン"],
    status: "WIP",
    statusColor: "text-[#ffbd2e]",
    repo: null,
  },
  {
    name: "麻雀AI",
    slug: "mahjong-ai",
    description:
      "強化学習を用いた麻雀対戦AI。状態空間の設計から報酬設計まで自力で実装。ハッカソン出展作品。",
    tags: ["Python", "強化学習", "AI", "ハッカソン"],
    status: "Active",
    statusColor: "text-primary",
    repo: null,
  },
  {
    name: "AtCoder 解法集",
    slug: "competitive-solutions",
    description:
      "AtCoderで解いた問題の解法・考察メモ。データ構造・グラフ・DP など幅広いアルゴリズムを網羅。",
    tags: ["C++", "競技プログラミング", "アルゴリズム"],
    status: "Ongoing",
    statusColor: "text-primary",
    repo: null,
  },
];

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
      className="group relative rounded-md border border-border bg-card p-4 hover:border-primary/40 hover:bg-card/80 transition-all duration-200 hover:shadow-md hover:shadow-primary/5 overflow-hidden"
    >
      {/* 左ボーダーアクセント */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/0 group-hover:bg-primary/40 transition-all duration-200" />
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-primary text-xs">./</span>
          <span className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </span>
        </div>
        <span className={`text-xs font-mono ${project.statusColor}`}>
          [{project.status}]
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs px-2 py-0 bg-secondary text-muted-foreground border border-border/60 font-mono"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

export function ProjectSection() {
  return (
    <section className="px-4 py-16 max-w-3xl mx-auto w-full">
      <TerminalCard title="~ $ ls projects/" delay={0.1}>
        <div className="mb-4 text-xs text-muted-foreground">
          <span className="text-primary">$</span> ls -la projects/
          <br />
          <span className="text-muted-foreground/60">
            total {PROJECTS.length} entries
          </span>
        </div>
        <div className="space-y-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </TerminalCard>
    </section>
  );
}
