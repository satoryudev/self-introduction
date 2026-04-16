# 佐藤琉惺 — 自己紹介サイト

ターミナル/ハッカー系デザインの自己紹介サイト。AtCoder・GitHub と動的連携。

🔗 **https://github.com/satoryudev/self-introduction**

---

## スタック

| 役割 | 技術 |
|------|------|
| Framework | Next.js 16 (Turbopack) + TypeScript |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui |
| Animation | Framer Motion |
| Font | Geist Mono |
| Deploy | Vercel |

---

## 機能

- **Hero** — `whoami` タイピングアニメーション
- **Skills** — スクロールトリガーのスキルバー
- **Projects** — TebikiChart・麻雀AI カード
- **AI哲学** — AIとの向き合い方・将来やりたいこと
- **AtCoder** — Rating・AC数をリアルタイム取得（1h キャッシュ）
- **GitHub** — 最新リポジトリ6件を動的表示
- **テーマ切り替え** — ダーク/ライトモード（右上ボタン）

---

## セットアップ

```bash
git clone git@github.com:satoryudev/self-introduction.git
cd self-introduction
npm install
```

`.env.local` を作成：

```env
ATCODER_USERNAME=your_atcoder_username
GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=              # オプション（レート制限回避）
```

```bash
npm run dev
# → http://localhost:3000
```

---

## デプロイ（Vercel）

```bash
vercel env add ATCODER_USERNAME
vercel env add GITHUB_USERNAME
vercel --prod
```

---

## ライセンス

MIT
