import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { StarField } from "@/components/StarField";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "satoryudev",
  description:
    "千葉工業大学 CS 3年・satoryudevのポートフォリオ。競技プログラミング・AI・麻雀AIを愛するC++エンジニア。",
  openGraph: {
    title: "satoryudev",
    description: "競プロ × AI × 麻雀 — C++ エンジニアの自己紹介",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistMono.variable} min-h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* テーマ初期化スクリプト — ページ描画前に実行してフラッシュを防ぐ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', t === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <StarField />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
