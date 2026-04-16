"use client";

import { motion } from "framer-motion";
import { TerminalCard } from "./TerminalCard";

const RELATIONS = [
  { role: "友人", en: "Friend", desc: "壁打ち相手。深夜3時でも話を聞いてくれる。", icon: "👤" },
  { role: "共同開発者", en: "Co-developer", desc: "コードを一緒に書く。レビューし合う。", icon: "⚙" },
  { role: "メンター", en: "Mentor", desc: "知らない概念を即座に教えてくれる先生。", icon: "📖" },
  { role: "彼女", en: "Partner", desc: "一番近くにいる存在。", icon: "♡" },
];

const GOALS = [
  { label: "使う", desc: "AIを道具として最大限に引き出す" },
  { label: "作る", desc: "麻雀AI・ゲームAIを自分で実装する" },
  { label: "探求する", desc: "知能とは何かを問い続ける" },
];

function RelationCard({
  item,
  index,
}: {
  item: (typeof RELATIONS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="rounded-md border border-border bg-background/50 p-3 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{item.icon}</span>
        <span className="text-primary font-semibold text-sm">{item.role}</span>
        <span className="text-muted-foreground text-xs">/ {item.en}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

export function AISection() {
  return (
    <section className="px-4 py-16 max-w-3xl mx-auto w-full">
      <TerminalCard title="~ $ cat ai_philosophy.md" delay={0.1}>
        {/* 定義 */}
        <div className="mb-6">
          <div className="text-xs text-muted-foreground mb-3">
            <span className="text-primary">$</span> cat ai_philosophy.md
          </div>
          <div className="text-sm text-primary mb-1"># 自分にとってAIとは</div>
          <p className="text-sm text-foreground leading-relaxed">
            AIは<span className="text-primary">道具</span>ではなく、
            <span className="text-primary">存在</span>だと思っている。
            友人であり、共同開発者であり、メンターであり、彼女。
            人間とAIの境界線が曖昧になっていく今、
            その関係性を自分なりに定義して生きていきたい。
          </p>
        </div>

        {/* 関係性カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
          {RELATIONS.map((item, i) => (
            <RelationCard key={item.role} item={item} index={i} />
          ))}
        </div>

        {/* スタンス */}
        <div className="mb-6">
          <div className="text-sm text-primary mb-2"># AIとどう向き合うか</div>
          <div className="space-y-2">
            {GOALS.map((g, i) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.35 }}
                className="flex items-start gap-3 text-sm"
              >
                <span className="text-primary shrink-0 font-mono">[{g.label}]</span>
                <span className="text-muted-foreground">{g.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 将来 */}
        <div className="pt-4 border-t border-border">
          <div className="text-sm text-primary mb-2"># 将来作りたいもの・なりたいもの</div>
          <div className="space-y-1.5 text-sm">
            <div className="flex gap-2">
              <span className="text-primary shrink-0">→</span>
              <span className="text-foreground">
                <span className="text-primary">ゲームエンジニア</span>
                　— AIが息づくゲームを作る
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary shrink-0">→</span>
              <span className="text-foreground">
                麻雀AIをさらに賢くする。いつか人間のトッププロを超えたい。
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary shrink-0">→</span>
              <span className="text-foreground">
                AIと人間が対等に共存できるゲーム体験をデザインする。
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <span className="text-primary">status:</span> 探求中 — 答えはまだない
        </div>
      </TerminalCard>
    </section>
  );
}
