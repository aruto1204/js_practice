# Chapter 1: TypeScript 入門

## 目次
1. [TypeScript とは何か](#1-typescript-とは何か)
2. [JavaScript との違い](#2-javascript-との違い)
3. [開発環境のセットアップ](#3-開発環境のセットアップ)
4. [コンパイルの仕組み](#4-コンパイルの仕組み)
5. [tsconfig.json の基本設定](#5-tsconfigjson-の基本設定)

---

## 1. TypeScript とは何か

TypeScript は、Microsoft が開発した **JavaScript のスーパーセット**です。

### TypeScript の特徴

- **静的型付け**: 変数や関数に型を指定できる
- **コンパイル時のエラー検出**: 実行前にバグを見つけられる
- **最新の JavaScript 機能**: ES6+ の機能を古いブラウザでも使える
- **優れた開発体験**: エディタの補完機能が強力
- **大規模開発に適している**: コードの保守性が向上

### なぜ TypeScript を使うのか？

```javascript
// JavaScript - 実行時にエラー
function greet(name) {
  return 'Hello, ' + name.toUpperCase();
}

greet(123); // 実行時エラー: name.toUpperCase is not a function
```

```typescript
// TypeScript - コンパイル時にエラー
function greet(name: string): string {
  return 'Hello, ' + name.toUpperCase();
}

greet(123); // コンパイルエラー: Argument of type 'number' is not assignable to parameter of type 'string'
```

---

## 2. JavaScript との違い

### 型注釈

TypeScript では変数や関数に型を明示できます。

```typescript
// TypeScript
let message: string = 'Hello';
let count: number = 42;
let isActive: boolean = true;

function add(a: number, b: number): number {
  return a + b;
}
```

```javascript
// JavaScript（型注釈なし）
let message = 'Hello';
let count = 42;
let isActive = true;

function add(a, b) {
  return a + b;
}
```

### インターフェース

オブジェクトの形状を定義できます。

```typescript
// TypeScript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com'
};
```

### クラスの型安全性

```typescript
// TypeScript
class Person {
  private name: string; // private, public, protected が使える

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}
```

### 型推論

明示的に型を書かなくても、TypeScript が自動で型を推論します。

```typescript
let num = 42;        // number 型と推論
let text = 'Hello';  // string 型と推論

num = 'text'; // エラー: Type 'string' is not assignable to type 'number'
```

---

## 3. 開発環境のセットアップ

### 前提条件

- Node.js v18 以上がインストールされていること

### TypeScript のインストール

```bash
# プロジェクトローカルにインストール（推奨）
npm install --save-dev typescript

# グローバルにインストール
npm install -g typescript

# バージョン確認
npx tsc --version
# または
tsc --version
```

### プロジェクトの初期化

```bash
# package.json を作成
npm init -y

# TypeScript をインストール
npm install --save-dev typescript

# tsconfig.json を生成
npx tsc --init
```

### エディタの設定

Visual Studio Code を使用する場合、TypeScript のサポートが組み込まれています。

**推奨拡張機能**:
- ESLint
- Prettier - Code formatter
- Error Lens（エラーを見やすく表示）

---

## 4. コンパイルの仕組み

TypeScript は最終的に JavaScript にコンパイルされます。

### 基本的なコンパイル

```bash
# 単一ファイルのコンパイル
npx tsc hello.ts

# 複数ファイルのコンパイル
npx tsc file1.ts file2.ts

# プロジェクト全体をコンパイル（tsconfig.json を使用）
npx tsc

# ウォッチモード（ファイル変更を監視）
npx tsc --watch
```

### コンパイルの流れ

```
TypeScript (.ts)
    ↓
[Type Checking] - 型エラーをチェック
    ↓
[Compilation] - JavaScript に変換
    ↓
JavaScript (.js)
```

### 例

```typescript
// hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet('TypeScript'));
```

コンパイル後:

```javascript
// hello.js
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet('TypeScript'));
```

### 実行方法

```bash
# 方法1: コンパイルしてから実行
npx tsc hello.ts
node hello.js

# 方法2: ts-node で直接実行（開発時に便利）
npx ts-node hello.ts
```

---

## 5. tsconfig.json の基本設定

`tsconfig.json` は TypeScript プロジェクトの設定ファイルです。

### 基本的な tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",              // 出力する JavaScript のバージョン
    "module": "commonjs",            // モジュールシステム
    "lib": ["ES2022"],               // 使用する標準ライブラリ
    "outDir": "./dist",              // 出力先ディレクトリ
    "rootDir": "./src",              // ソースファイルのルート
    "strict": true,                  // すべての厳密な型チェックを有効化
    "esModuleInterop": true,         // CommonJS と ES Module の互換性
    "skipLibCheck": true,            // .d.ts ファイルの型チェックをスキップ
    "forceConsistentCasingInFileNames": true  // ファイル名の大文字小文字を厳密に
  },
  "include": ["src/**/*"],           // コンパイル対象
  "exclude": ["node_modules", "dist"] // コンパイル除外
}
```

### 主要なオプション

#### target
出力する JavaScript のバージョンを指定します。

```json
"target": "ES2022"  // ES2022, ES2020, ES6, ES5 など
```

#### module
モジュールシステムを指定します。

```json
"module": "commonjs"  // commonjs, esnext, amd, umd など
```

#### strict
すべての厳密な型チェックを有効にします。

```json
"strict": true  // 以下がすべて有効になる
// "noImplicitAny": true
// "strictNullChecks": true
// "strictFunctionTypes": true
// "strictBindCallApply": true
// "strictPropertyInitialization": true
// "noImplicitThis": true
// "alwaysStrict": true
```

#### outDir と rootDir
出力先とソースのディレクトリを指定します。

```json
"outDir": "./dist",   // コンパイル後のファイルの出力先
"rootDir": "./src"    // ソースファイルの場所
```

### プロジェクト構造の例

```
my-project/
├── src/
│   ├── index.ts
│   ├── utils.ts
│   └── types.ts
├── dist/          # コンパイル後のファイルがここに生成される
├── node_modules/
├── package.json
└── tsconfig.json
```

### package.json のスクリプト設定

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/index.js",
    "ts-node": "ts-node src/index.ts"
  }
}
```

使用例:

```bash
npm run build   # TypeScript をコンパイル
npm run dev     # ウォッチモードで開発
npm run start   # コンパイル済みファイルを実行
npm run ts-node # ts-node で直接実行
```

---

## まとめ

| 項目 | 内容 |
|------|------|
| TypeScript とは | JavaScript のスーパーセット、静的型付け |
| 主な利点 | 型安全性、コンパイル時のエラー検出、優れた IDE サポート |
| インストール | `npm install --save-dev typescript` |
| コンパイル | `npx tsc` |
| 直接実行 | `npx ts-node file.ts` |
| 設定ファイル | `tsconfig.json` |

### TypeScript の開発フロー

1. `.ts` ファイルを作成
2. 型注釈を追加
3. `npx tsc` でコンパイル
4. 生成された `.js` ファイルを実行

または

1. `.ts` ファイルを作成
2. `npx ts-node file.ts` で直接実行（開発時）

---

## 練習問題

次のファイルで TypeScript の基本を練習しましょう：

1. `exercises/01-hello-typescript.ts` - 最初の TypeScript プログラム
2. `exercises/02-type-annotations.ts` - 型注釈の基本
3. `exercises/03-compile.ts` - コンパイルの練習
4. `exercises/04-tsconfig.ts` - tsconfig.json の設定
5. `exercises/05-javascript-comparison.ts` - JavaScript との比較
