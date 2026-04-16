# antigravity — AIエージェント紹介サイト 設計書

## コンセプト

Claude Codeライクなエージェント型AI「antigravity」のプロダクト紹介サイト。
ターミナル/ハッカー系のビジュアルで、AIの能力・使い方・デモを前面に出す。

---

## スタック

| 役割 | 技術 |
|------|------|
| Framework | Next.js 16 App Router + TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Font | Geist Mono (monospace) |
| Deploy | Vercel |

---

## ディレクトリ構成

```
antigravity/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       └── demo/route.ts        # デモ用 AI ストリーミングエンドポイント
├── components/
│   ├── TerminalCard.tsx          # 再利用ターミナルウィンドウ（self-introから流用）
│   ├── HeroSection.tsx           # キャッチコピー + タイピングアニメーション
│   ├── FeaturesSection.tsx       # 機能カード一覧
│   ├── DemoSection.tsx           # インタラクティブデモ（実際にAIに話しかける）
│   ├── HowItWorksSection.tsx     # 仕組み説明（ステップ図）
│   └── FooterSection.tsx
├── lib/
│   └── utils.ts
└── public/
```

---

## ページ構成（シングルページ）

### 1. Hero
- キャッチコピーをタイピングアニメーションで表示
- 例：`> antigravity --init` → `// エージェントが起動しました`
- CTA ボタン: 「デモを試す」「ドキュメント」

### 2. Features — `cat capabilities.txt`
AIエージェントとしての能力を6枚カードで表示：
- 自律タスク実行
- コード生成・修正
- ファイル操作
- Web検索・情報収集
- マルチステップ推論
- ツール呼び出し

### 3. Demo — `$ antigravity run`
実際にプロンプトを入力してAIのレスポンスをストリーミング表示するインタラクティブデモ。
ターミナル風UIで `>` プロンプトに入力 → AIが返答をタイピング表示。

### 4. How It Works — `cat architecture.md`
3ステップで仕組みを説明：
1. プロンプト入力
2. エージェントがツールを選択・実行
3. 結果を返却

### 5. Footer
- GitHub リンク
- ドキュメントリンク
- コピーライト

---

## デザイン詳細

self-introductionサイトと同じターミナル系テーマを継承：

| 要素 | 値 |
|------|----|
| 背景 | `#0d1117` |
| アクセント | マトリックスグリーン `oklch(0.87 0.29 145)` |
| フォント | Geist Mono 全面 |
| ターミナルカード | 赤/黄/緑ドット付き |

---

## データ取得 / API

### デモエンドポイント (`app/api/demo/route.ts`)
```
POST /api/demo
body: { prompt: string }
→ AI SDK でストリーミングレスポンス
```
- Vercel AI SDK (`ai` パッケージ) を使用
- モデル: Claude (Anthropic) または OpenAI GPT
- `streamText` でリアルタイムストリーミング

---

## 実装ステップ

1. `npx create-next-app@latest` で新規プロジェクト初期化
2. shadcn/ui 導入 (`npx shadcn@latest init -d`)
3. Framer Motion インストール
4. self-introduction の `TerminalCard.tsx` と `globals.css` を流用
5. `HeroSection` 実装（タイピングアニメーション）
6. `FeaturesSection` 実装（6枚カード）
7. `DemoSection` 実装（AI SDK ストリーミング）
8. `HowItWorksSection` 実装
9. `app/api/demo/route.ts` 実装
10. レスポンシブ対応・最終調整
11. Vercel デプロイ

---

## 環境変数

```env
ANTHROPIC_API_KEY=sk-ant-xxxx   # デモ用 Claude API キー
# または
OPENAI_API_KEY=sk-xxxx
```

---

## 検証方法

- `npm run dev` でローカル確認
- デモセクションでAIが実際に返答するか確認
- モバイル表示確認（Chrome DevTools）
- `vercel --prod` でデプロイ後、本番URLで動作確認
