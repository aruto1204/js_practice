# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 言語設定

- このプロジェクトでは基本的に日本語でやり取りを行う
- コードのコメントやドキュメントも日本語で記述する

## プロジェクト概要

JavaScript の復習から TypeScript の習得までをカバーする段階的な学習教材リポジトリです。

### 学習の流れ

1. **Part 1: JavaScript 復習編** - ES6+ の文法、非同期処理、クラス、モジュールの復習
2. **Part 2: TypeScript 基礎編** - 型システムの基本、インターフェース、ジェネリクス
3. **Part 3: TypeScript 実践編** - 高度な型操作、実践的なプロジェクト

## コードの実行方法

- JavaScript ファイルの実行: `node filename.js`
- TypeScript ファイルの実行: `npx ts-node filename.ts`
- TypeScript のコンパイル: `npx tsc filename.ts`

## ディレクトリ構成

```
js_practice/
├── docs/requirements.md         # 要件定義書
├── part1-javascript/            # JavaScript 復習編
├── part2-typescript-basics/     # TypeScript 基礎編
├── part3-typescript-advanced/   # TypeScript 実践編
├── package.json
└── tsconfig.json
```

## 開発環境

- Node.js v18 以上
- TypeScript 5.x
- 推奨エディタ: Visual Studio Code

## 作業時の注意事項

### 作業開始前

**作業を行うときは必ず docs/ 配下のドキュメントを確認してから作業を開始すること**

- [docs/requirements.md](docs/requirements.md) - プロジェクト要件と学習コンテンツ構成
- [docs/tech-stack.md](docs/tech-stack.md) - 技術スタックと設定詳細
- [docs/learning-guide.md](docs/learning-guide.md) - 学習の進め方とベストプラクティス
- [docs/javascript-best-practices.md](docs/javascript-best-practices.md) - JavaScript コーディング規約
- [docs/typescript-best-practices.md](docs/typescript-best-practices.md) - TypeScript コーディング規約

### 作業終了後

**作業終了時には必ず [docs/progress.md](docs/progress.md) に作業内容を反映すること**

- 完了した項目のステータスを更新（⬜ 未着手 → ✅ 完了）
- 完了日を記入
- 必要に応じてメモ欄に学習内容や気づきを記録

**作業終了時には GitHub CLI を使用してリポジトリに変更を反映すること**

- `git add` で変更をステージング
- `git commit` で適切なコミットメッセージとともにコミット
- `git push origin main` で GitHub に反映
