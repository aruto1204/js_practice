# 要件定義書：JavaScript/TypeScript学習教材

## 1. プロジェクト概要

### 1.1 目的
JavaScript の復習を経て TypeScript を効果的に習得するための、段階的な学習教材を作成する。

### 1.2 対象者
- JavaScript の基礎知識はあるが、復習が必要な方
- TypeScript を初めて学ぶ方
- フロントエンド/バックエンド開発で TypeScript を活用したい方

### 1.3 学習の流れ
```
JavaScript 復習編 → TypeScript 基礎編 → TypeScript 実践編
```

---

## 2. 学習コンテンツ構成

### 2.1 JavaScript 復習編（Part 1）

#### Chapter 1: 基本文法の復習
- 変数宣言（var, let, const）
- データ型（プリミティブ型、参照型）
- 演算子
- 条件分岐（if, switch）
- ループ（for, while, for...of, for...in）

#### Chapter 2: 関数
- 関数宣言と関数式
- アロー関数
- デフォルト引数
- スプレッド演算子と残余引数
- コールバック関数
- クロージャ

#### Chapter 3: オブジェクトと配列
- オブジェクトの作成と操作
- 配列メソッド（map, filter, reduce, find, forEach など）
- 分割代入（デストラクチャリング）
- スプレッド演算子

#### Chapter 4: クラスとオブジェクト指向
- クラスの基本構文
- コンストラクタ
- インスタンスメソッドとプロパティ
- 継承（extends）
- 静的メソッドとプロパティ
- getter / setter

#### Chapter 5: 非同期処理
- コールバック関数
- Promise
- async / await
- エラーハンドリング（try-catch）
- fetch API

#### Chapter 6: モジュール
- import / export
- デフォルトエクスポート
- 名前付きエクスポート
- モジュールのベストプラクティス

---

### 2.2 TypeScript 基礎編（Part 2）

#### Chapter 1: TypeScript 入門
- TypeScript とは何か
- JavaScript との違い
- 開発環境のセットアップ
- コンパイルの仕組み（tsc）
- tsconfig.json の基本設定

#### Chapter 2: 基本的な型
- プリミティブ型（string, number, boolean, null, undefined）
- 配列型
- タプル型
- any 型と unknown 型
- void 型と never 型
- 型推論

#### Chapter 3: オブジェクトの型
- オブジェクト型の定義
- インターフェース（interface）
- 型エイリアス（type）
- interface と type の使い分け
- オプショナルプロパティ
- readonly プロパティ

#### Chapter 4: 関数の型
- 関数の引数と戻り値の型定義
- オプショナル引数
- デフォルト引数
- 残余引数の型
- オーバーロード

#### Chapter 5: 型の高度な使い方
- ユニオン型（Union Types）
- 交差型（Intersection Types）
- リテラル型
- 型ガード
- 型アサーション

#### Chapter 6: ジェネリクス
- ジェネリクスの基本
- ジェネリック関数
- ジェネリッククラス
- ジェネリック制約（extends）
- 複数の型パラメータ

---

### 2.3 TypeScript 実践編（Part 3）

#### Chapter 1: クラスの型定義
- クラスの型注釈
- アクセス修飾子（public, private, protected）
- 抽象クラス
- implements によるインターフェース実装

#### Chapter 2: 高度な型操作
- Mapped Types
- Conditional Types
- Template Literal Types
- ユーティリティ型（Partial, Required, Pick, Omit など）

#### Chapter 3: 型定義ファイル
- .d.ts ファイルの役割
- @types パッケージの利用
- 自作の型定義ファイル
- declare キーワード

#### Chapter 4: 実践的なプロジェクト
- DOM 操作と型
- イベントハンドリングの型
- API 通信と型定義
- 小規模アプリケーションの作成

---

## 3. 技術要件

### 3.1 開発環境
- Node.js（v18 以上推奨）
- npm または yarn
- TypeScript（最新安定版）
- Visual Studio Code（推奨エディタ）

### 3.2 必要なパッケージ
```json
{
  "devDependencies": {
    "typescript": "^5.x",
    "ts-node": "^10.x",
    "@types/node": "^20.x"
  }
}
```

### 3.3 実行方法
- JavaScript: `node ファイル名.js`
- TypeScript: `npx ts-node ファイル名.ts` または `tsc && node ファイル名.js`

---

## 4. ディレクトリ構成

```
js_practice/
├── docs/
│   └── requirements.md          # この要件定義書
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

## 5. 各教材の形式

### 5.1 ファイル構成（各チャプター内）
- `README.md`: 概念説明とサンプルコード
- `exercises/`: 練習問題
- `solutions/`: 解答例

### 5.2 教材の特徴
- 実行可能なサンプルコード
- 段階的な難易度設定
- 実践的な例題
- 日本語での詳細な解説

---

## 6. 学習目標

### 6.1 JavaScript 復習編修了時
- ES6+ の文法を理解し使いこなせる
- 非同期処理を適切に扱える
- クラスベースのオブジェクト指向を理解している
- モジュールシステムを使った開発ができる

### 6.2 TypeScript 基礎編修了時
- TypeScript の基本的な型システムを理解している
- 型安全なコードを書ける
- インターフェースとジェネリクスを活用できる
- 型推論を理解し活用できる

### 6.3 TypeScript 実践編修了時
- 高度な型操作ができる
- 実際のプロジェクトで TypeScript を活用できる
- 既存の JavaScript ライブラリに型定義を追加できる
- 型安全な Web アプリケーションを開発できる

---

## 7. 今後の拡張予定（オプション）

- React + TypeScript 編
- Node.js + TypeScript 編
- テスティング（Jest）との統合
- ESLint / Prettier の設定

---

## 8. 更新履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2024-12-15 | 1.0.0 | 初版作成 |
