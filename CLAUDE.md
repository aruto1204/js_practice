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
