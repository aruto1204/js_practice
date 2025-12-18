# JavaScript/TypeScript 学習教材

JavaScriptの復習からTypeScriptの習得までをカバーする段階的な学習教材リポジトリです。

## 📚 プロジェクト概要

このプロジェクトは、JavaScript の基礎知識を持つ方が TypeScript を効果的に習得するための体系的な学習教材です。実行可能なサンプルコード、練習問題、解答例を含む実践的な内容になっています。

### 対象者

- JavaScript の基礎知識はあるが、復習が必要な方
- TypeScript を初めて学ぶ方
- フロントエンド/バックエンド開発で TypeScript を活用したい方

### 学習の流れ

```
Part 1: JavaScript 復習編 → Part 2: TypeScript 基礎編 → Part 3: TypeScript 実践編
    (2〜3週間)                  (3〜4週間)                  (2〜3週間)
```

---

## 🗂️ ディレクトリ構成

```
js_practice/
├── docs/                        # ドキュメント
│   ├── requirements.md          # 要件定義書
│   ├── tech-stack.md            # 技術スタック詳細
│   ├── learning-guide.md        # 学習ガイド
│   ├── progress.md              # 学習進捗管理表
│   ├── javascript-best-practices.md  # JavaScript コーディング規約
│   └── typescript-best-practices.md  # TypeScript コーディング規約
├── part1-javascript/            # JavaScript 復習編
│   ├── chapter01-basics/        # 基本文法
│   ├── chapter02-functions/     # 関数
│   ├── chapter03-objects/       # オブジェクトと配列
│   ├── chapter04-classes/       # クラスとOOP
│   ├── chapter05-async/         # 非同期処理
│   └── chapter06-modules/       # モジュール
├── part2-typescript-basics/     # TypeScript 基礎編
│   ├── chapter01-intro/         # TypeScript入門
│   ├── chapter02-basic-types/   # 基本的な型
│   ├── chapter03-object-types/  # オブジェクトの型
│   ├── chapter04-function-types/# 関数の型
│   ├── chapter05-advanced-types/# 高度な型
│   └── chapter06-generics/      # ジェネリクス
├── part3-typescript-advanced/   # TypeScript 実践編
│   ├── chapter01-classes/       # クラスの型定義
│   ├── chapter02-type-operations/# 高度な型操作
│   ├── chapter03-type-definitions/# 型定義ファイル
│   └── chapter04-projects/      # 実践プロジェクト
├── package.json
├── tsconfig.json
└── CLAUDE.md
```

---

## 🚀 クイックスタート

### 1. 必要な環境

- **Node.js**: v18 以上（v20 LTS 推奨）
- **npm**: v9 以上
- **推奨エディタ**: Visual Studio Code

### 2. セットアップ

```bash
# リポジトリをクローン
git clone <repository-url>
cd js_practice

# パッケージのインストール
npm install
```

### 3. 動作確認

```bash
# JavaScript ファイルの実行
node part1-javascript/chapter01-basics/exercises/01-variables.js

# TypeScript ファイルの実行
npx ts-node part2-typescript-basics/chapter01-intro/exercises/01-hello.ts
```

---

## 📖 学習コンテンツ

### Part 1: JavaScript 復習編 ✅ 完了

ES6+ の文法、非同期処理、クラス、モジュールシステムを復習します。

| Chapter | 内容 | 重要度 |
|---------|------|--------|
| [Chapter 1](part1-javascript/chapter01-basics/README.md) | 基本文法（変数、データ型、演算子、条件分岐、ループ） | ★★★ |
| [Chapter 2](part1-javascript/chapter02-functions/README.md) | 関数（関数宣言、アロー関数、クロージャ） | ★★★★★ |
| [Chapter 3](part1-javascript/chapter03-objects/README.md) | オブジェクトと配列（配列メソッド、分割代入） | ★★★★ |
| [Chapter 4](part1-javascript/chapter04-classes/README.md) | クラスとオブジェクト指向（継承、静的メソッド） | ★★★★ |
| [Chapter 5](part1-javascript/chapter05-async/README.md) | 非同期処理（Promise、async/await、fetch API） | ★★★★★ |
| [Chapter 6](part1-javascript/chapter06-modules/README.md) | モジュール（import/export） | ★★★★ |

### Part 2: TypeScript 基礎編 ✅ 完了

TypeScript の型システム、インターフェース、ジェネリクスを学びます。

| Chapter | 内容 | 重要度 |
|---------|------|--------|
| [Chapter 1](part2-typescript-basics/chapter01-intro/README.md) | TypeScript 入門（環境構築、コンパイル） | ★★★ |
| [Chapter 2](part2-typescript-basics/chapter02-basic-types/README.md) | 基本的な型（プリミティブ型、配列、タプル） | ★★★★★ |
| [Chapter 3](part2-typescript-basics/chapter03-object-types/README.md) | オブジェクトの型（interface、type） | ★★★★★ |
| [Chapter 4](part2-typescript-basics/chapter04-function-types/README.md) | 関数の型（引数、戻り値、オーバーロード） | ★★★★ |
| [Chapter 5](part2-typescript-basics/chapter05-advanced-types/README.md) | 高度な型（ユニオン型、型ガード） | ★★★★ |
| [Chapter 6](part2-typescript-basics/chapter06-generics/README.md) | ジェネリクス（型パラメータ、制約） | ★★★★★ |

### Part 3: TypeScript 実践編 ✅ 完了

高度な型操作と実践的なプロジェクトを通じて、実務レベルのTypeScriptスキルを習得します。

| Chapter | 内容 | 重要度 |
|---------|------|--------|
| [Chapter 1](part3-typescript-advanced/chapter01-classes/README.md) | クラスの型定義（アクセス修飾子、抽象クラス） | ★★★★ |
| [Chapter 2](part3-typescript-advanced/chapter02-type-operations/README.md) | 高度な型操作（Mapped Types、Conditional Types） | ★★★ |
| [Chapter 3](part3-typescript-advanced/chapter03-type-definitions/README.md) | 型定義ファイル（.d.ts、@types） | ★★★ |
| [Chapter 4](part3-typescript-advanced/chapter04-projects/README.md) | 実践プロジェクト（DOM操作、API通信） | ★★★★★ |

---

## 💻 コマンド一覧

### JavaScript

```bash
# JavaScript ファイルを実行
node ファイル名.js
```

### TypeScript

```bash
# ts-node で直接実行
npx ts-node ファイル名.ts

# コンパイルしてから実行
npx tsc ファイル名.ts
node ファイル名.js

# プロジェクト全体をコンパイル
npm run build

# ウォッチモード（変更を監視）
npx tsc --watch
```

### リント・フォーマット

```bash
# ESLint でチェック
npm run lint

# Prettier でフォーマット
npm run format
```

---

## 📝 学習の進め方

### 1日の推奨学習サイクル（約80分）

1. **📖 概念を読む**（15分）
   各章のREADME.mdで理論を理解

2. **💻 コードを写経**（20分）
   サンプルコードを実際に入力して実行

3. **🧪 練習問題を解く**（30分）
   exercises/ の問題に取り組む

4. **🔍 解答を確認**（10分）
   solutions/ と比較、理解を深める

5. **📝 振り返り**（5分）
   [docs/progress.md](docs/progress.md) に学習内容を記録

### 詳細な学習ガイド

より詳しい学習方法については、[docs/learning-guide.md](docs/learning-guide.md) を参照してください。

---

## 🎯 学習目標

### JavaScript 復習編修了時

- ✅ ES6+ の文法を理解し使いこなせる
- ✅ 非同期処理を適切に扱える
- ✅ クラスベースのオブジェクト指向を理解している
- ✅ モジュールシステムを使った開発ができる

### TypeScript 基礎編修了時

- ✅ TypeScript の基本的な型システムを理解している
- ✅ 型安全なコードを書ける
- ✅ インターフェースとジェネリクスを活用できる
- ✅ 型推論を理解し活用できる

### TypeScript 実践編修了時

- ✅ 高度な型操作ができる
- ✅ 実際のプロジェクトで TypeScript を活用できる
- ✅ 既存の JavaScript ライブラリに型定義を追加できる
- ✅ 型安全な Web アプリケーションを開発できる

---

## 📊 学習進捗

全教材完了状態です！🎉

| パート | 完了 | 進行中 | 未着手 | 進捗率 |
|--------|------|--------|--------|--------|
| Part 1: JavaScript 復習編 | 6 | 0 | 0 | 100% |
| Part 2: TypeScript 基礎編 | 6 | 0 | 0 | 100% |
| Part 3: TypeScript 実践編 | 4 | 0 | 0 | 100% |
| **合計** | **16** | **0** | **0** | **100%** |

詳細な進捗管理は [docs/progress.md](docs/progress.md) で確認できます。

---

## 🛠️ 技術スタック

### 主要技術

- **JavaScript**: ES2022+ (ES13+)
- **TypeScript**: 5.x
- **Node.js**: v18.x LTS 以上（v20.x LTS 推奨）

### 開発ツール

- **TypeScript コンパイラ**: tsc
- **TypeScript 実行**: ts-node
- **リンター**: ESLint
- **フォーマッター**: Prettier

詳細は [docs/tech-stack.md](docs/tech-stack.md) を参照してください。

---

## 📚 参考リソース

### 公式ドキュメント

- [MDN Web Docs](https://developer.mozilla.org/ja/) - JavaScript リファレンス
- [TypeScript 公式](https://www.typescriptlang.org/docs/) - TypeScript ドキュメント
- [Node.js 公式](https://nodejs.org/) - Node.js ドキュメント

### 学習サイト

- [JavaScript.info](https://ja.javascript.info/) - JavaScript チュートリアル
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) - TypeScript 詳細解説
- [Type Challenges](https://github.com/type-challenges/type-challenges) - TypeScript 型パズル

---

## 🤝 コントリビューション

改善提案やバグ報告は Issue または Pull Request でお願いします。

---

## 📄 ライセンス

MIT License

---

## 📞 サポート

質問や不明点がある場合は、各章の README.md のコメント欄や Issue で質問してください。

---

**Happy Coding! 🎉**
