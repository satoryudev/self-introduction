"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { prompt: "$ whoami", output: "佐藤 琉惺 / Ryusei Sato", color: "text-primary" },
  { prompt: "$ cat affiliation.txt", output: "千葉工業大学 情報科学科 3年", color: "text-foreground" },
  { prompt: "$ cat motto.txt", output: "競プロ × AI × 麻雀 — コードで世界を攻略する", color: "text-foreground" },
  { prompt: "$ echo $LOVES", output: "C++ | AtCoder | Hackathon | Mahjong AI", color: "text-primary" },
];

const TYPING_SPEED = 40;
const LINE_PAUSE = 400;

function useTypewriter(lines: typeof LINES) {
  const [displayedLines, setDisplayedLines] = useState<
    { prompt: string; output: string; color: string; done: boolean }[]
  >([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [phase, setPhase] = useState<"prompt" | "pause" | "output" | "complete">("prompt");

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];

    if (phase === "prompt") {
      if (currentChar < line.prompt.length) {
        const t = setTimeout(() => setCurrentChar((c) => c + 1), TYPING_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pause"), LINE_PAUSE);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pause") {
      setPhase("output");
      return;
    }

    if (phase === "output") {
      if (currentChar < line.prompt.length + line.output.length) {
        const t = setTimeout(() => setCurrentChar((c) => c + 1), TYPING_SPEED);
        return () => clearTimeout(t);
      } else {
        setDisplayedLines((prev) => [
          ...prev,
          { ...line, done: true },
        ]);
        const t = setTimeout(() => {
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
          setPhase("prompt");
        }, LINE_PAUSE);
        return () => clearTimeout(t);
      }
    }
  }, [currentLine, currentChar, phase, lines]);

  const activeLine =
    currentLine < lines.length
      ? {
          ...lines[currentLine],
          promptText: lines[currentLine].prompt.slice(
            0,
            phase === "prompt" || phase === "pause"
              ? currentChar
              : lines[currentLine].prompt.length
          ),
          outputText:
            phase === "output"
              ? lines[currentLine].output.slice(
                  0,
                  currentChar - lines[currentLine].prompt.length
                )
              : "",
          done: false,
        }
      : null;

  return { displayedLines, activeLine };
}

export function HeroSection() {
  const { displayedLines, activeLine } = useTypewriter(LINES);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.87 0.29 145) 1px, transparent 1px), linear-gradient(90deg, oklch(0.87 0.29 145) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Header badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <span className="text-xs text-primary border border-primary/40 rounded px-3 py-1 bg-primary/5">
            ターミナルセッション開始 — 2026-04-17
          </span>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-md border border-border bg-card shadow-2xl shadow-black/60 overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--terminal-header)] border-b border-border">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 text-xs text-muted-foreground">
              ryusei@cit:~
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm space-y-3 min-h-[280px]">
            {/* Completed lines */}
            {displayedLines.map((line, i) => (
              <div key={i} className="space-y-0.5">
                <div className="text-primary">{line.prompt}</div>
                <div className={line.color}>{line.output}</div>
              </div>
            ))}

            {/* Active typing line */}
            {activeLine && (
              <div className="space-y-0.5">
                <div className="text-primary">
                  {activeLine.promptText}
                  <span className="cursor-blink">▊</span>
                </div>
                {activeLine.outputText && (
                  <div className={activeLine.color}>{activeLine.outputText}</div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.8 }}
          className="flex flex-col items-center mt-12 gap-2"
        >
          <span className="text-xs text-muted-foreground">scroll down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
