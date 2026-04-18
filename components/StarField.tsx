"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface ShootingData {
  id: number;
  x: number;
  y: number;
  delay: number;
  length: number;
}

export function StarField() {
  const { theme } = useTheme();
  const [stars, setStars] = useState<StarData[]>([]);
  const [shooting, setShooting] = useState<ShootingData[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.3,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.5 + 0.3,
      }))
    );
    setShooting(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 65,
        y: 3 + Math.random() * 30,
        delay: i * 5 + Math.random() * 4,
        length: 80 + Math.random() * 80,
      }))
    );
  }, []);

  if (theme !== "dark" || stars.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* 星 */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
          }}
        >
          <div
            className="rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `star-twinkle ${star.duration}s ${star.delay}s ease-in-out infinite alternate`,
            }}
          />
        </div>
      ))}

      {/* 流れ星 */}
      {shooting.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animation: `shooting-star 12s ${s.delay}s linear infinite`,
          }}
        >
          <div
            style={{
              width: `${s.length}px`,
              height: "1.5px",
              background:
                "linear-gradient(to right, white, rgba(255,255,255,0.6) 40%, transparent)",
              transform: "rotate(-25deg)",
              transformOrigin: "left center",
              borderRadius: "2px",
            }}
          />
          {/* 光の玉 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "white",
              boxShadow: "0 0 4px 2px rgba(255,255,255,0.6)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
