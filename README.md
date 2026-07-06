# レシピカードメーカー

料理名・材料・作り方を入力するだけで、見た目の良いレシピカードを作れる Web アプリです。

## 機能

- 料理名、説明、人数、準備/調理時間、写真、材料、作り方の入力
- カードのアクセントカラーを選択可能
- レシピはバックエンドAPI（recipe-card-api: FastAPI + SQLite、`/api/recipes`）に保存され、サイドバーから呼び出し・編集・削除が可能
- 完成したカードを PNG 画像としてダウンロード
- ブラウザの印刷機能でカードのみを印刷

## セットアップ

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## 設計ドキュメント

- [A4シートテンプレート構想](docs/sheet-template-design.md) — 1枚複数レシピのA4シートをテンプレート＋JSONで生成する構想

## 主な技術

- React + TypeScript + Vite
- [html-to-image](https://github.com/bubkoo/html-to-image)（カードの PNG 書き出し）
