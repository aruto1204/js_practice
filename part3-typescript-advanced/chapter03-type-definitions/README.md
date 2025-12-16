# Chapter 3: 型定義ファイル

このチャプターでは、TypeScript の型定義ファイル（.d.ts）について学びます。型定義ファイルは、JavaScript ライブラリに型情報を追加し、TypeScript での利用を可能にする重要な仕組みです。

## 学習内容

1. .d.ts ファイルの役割
2. @types パッケージの利用
3. 自作の型定義ファイル
4. declare キーワード

## 1. .d.ts ファイルの役割

### 型定義ファイルとは

型定義ファイル（.d.ts）は、JavaScript コードに型情報を提供するファイルです。実装コードを含まず、型情報のみを宣言します。

```typescript
// math.js（JavaScript ファイル）
export function add(a, b) {
  return a + b;
}

// math.d.ts（型定義ファイル）
export function add(a: number, b: number): number;
```

### 型定義ファイルの特徴

- **実装を含まない**: 関数やクラスの型シグネチャのみを宣言
- **コンパイル対象外**: JavaScript にコンパイルされない
- **型チェックのみ**: TypeScript コンパイラが型チェックに使用

### 型定義ファイルが必要な場面

1. **JavaScript ライブラリを TypeScript で使用する**
   - lodash、jQuery など既存の JS ライブラリに型を提供

2. **グローバル変数の型を定義する**
   - `window` オブジェクトの拡張
   - カスタムグローバル変数

3. **モジュールの型情報を提供する**
   - npm パッケージの型定義
   - 社内ライブラリの型定義

## 2. @types パッケージの利用

### @types パッケージとは

DefinitelyTyped プロジェクトが提供する、JavaScript ライブラリの型定義パッケージです。

```bash
# インストール例
npm install --save-dev @types/node
npm install --save-dev @types/lodash
npm install --save-dev @types/react
```

### @types の仕組み

```typescript
// @types/node をインストール後
import * as fs from 'fs';

// fs の型情報が自動的に利用可能に
fs.readFile('path', 'utf8', (err, data) => {
  // err: NodeJS.ErrnoException | null
  // data: string
});
```

### 型定義の検索と確認

```typescript
// 型定義の場所を確認
// node_modules/@types/パッケージ名/index.d.ts

// 例: @types/node/fs.d.ts
declare module 'fs' {
  export function readFile(
    path: string,
    encoding: string,
    callback: (err: NodeJS.ErrnoException | null, data: string) => void
  ): void;
}
```

## 3. 自作の型定義ファイル

### 基本的な構造

```typescript
// mylib.js（JavaScript 実装）
export function greet(name) {
  return `Hello, ${name}!`;
}

export class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// mylib.d.ts（型定義）
export function greet(name: string): string;

export class User {
  name: string;
  age: number;
  constructor(name: string, age: number);
}
```

### モジュール型定義

```typescript
// types/custom-module.d.ts
declare module 'custom-module' {
  export interface Config {
    apiKey: string;
    timeout: number;
  }

  export function init(config: Config): void;
  export function getData(): Promise<any>;
}
```

### グローバル型定義

```typescript
// types/global.d.ts
declare global {
  interface Window {
    myAPI: {
      version: string;
      getData(): Promise<any>;
    };
  }

  const APP_VERSION: string;
}

export {}; // モジュールとして扱うために必要
```

### 名前空間の型定義

```typescript
// types/namespace.d.ts
declare namespace MyLibrary {
  interface Config {
    debug: boolean;
  }

  class Logger {
    constructor(config: Config);
    log(message: string): void;
  }

  function init(config: Config): void;
}
```

## 4. declare キーワード

### declare の役割

`declare` キーワードは、**どこか他の場所で定義されている値**の型情報を宣言します。実装は含みません。

### 変数の宣言

```typescript
// グローバル変数の型宣言
declare const API_KEY: string;
declare let isDebug: boolean;
declare var globalConfig: { timeout: number };

// 使用例
console.log(API_KEY); // OK: 型チェックされる
```

### 関数の宣言

```typescript
// グローバル関数の型宣言
declare function fetchData(url: string): Promise<any>;
declare function $(selector: string): HTMLElement;

// 使用例
const data = await fetchData('/api/users'); // OK
const element = $('#app'); // OK
```

### クラスの宣言

```typescript
// グローバルクラスの型宣言
declare class EventEmitter {
  on(event: string, callback: Function): void;
  emit(event: string, ...args: any[]): void;
}

// 使用例
const emitter = new EventEmitter();
emitter.on('data', (data) => console.log(data));
```

### モジュールの宣言

```typescript
// モジュール全体の型宣言
declare module 'my-module' {
  export interface User {
    id: number;
    name: string;
  }

  export function getUser(id: number): Promise<User>;
}

// 使用例
import { getUser } from 'my-module';
const user = await getUser(1); // User 型
```

### 外部モジュールの宣言（ワイルドカード）

```typescript
// CSS モジュールの型宣言
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// 画像ファイルの型宣言
declare module '*.png' {
  const src: string;
  export default src;
}

// 使用例
import styles from './App.css'; // { [className: string]: string }
import logo from './logo.png'; // string
```

### declare global での拡張

```typescript
// 既存のグローバル型を拡張
declare global {
  interface Array<T> {
    first(): T | undefined;
    last(): T | undefined;
  }

  interface String {
    toTitleCase(): string;
  }
}

// 使用例
const arr = [1, 2, 3];
arr.first(); // 1
arr.last(); // 3

const str = "hello world";
str.toTitleCase(); // "Hello World"
```

### namespace との組み合わせ

```typescript
// jQuery のような名前空間ライブラリの型定義
declare namespace $ {
  function ajax(url: string, settings?: AjaxSettings): Promise<any>;

  interface AjaxSettings {
    method?: string;
    headers?: Record<string, string>;
  }
}

declare function $(selector: string): HTMLElement;

// 使用例
const element = $('.container');
$.ajax('/api/data', { method: 'GET' });
```

## 実践的なパターン

### 1. 既存 JavaScript ライブラリの型定義

```typescript
// types/legacy-library.d.ts
declare module 'legacy-library' {
  export interface Options {
    timeout?: number;
    retries?: number;
  }

  export class Client {
    constructor(options?: Options);
    connect(): Promise<void>;
    disconnect(): void;
  }

  export function createClient(options?: Options): Client;
}
```

### 2. 環境変数の型定義

```typescript
// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    API_URL: string;
    API_KEY: string;
    PORT?: string;
  }
}

// 使用例
const apiUrl = process.env.API_URL; // string
const nodeEnv = process.env.NODE_ENV; // 'development' | 'production' | 'test'
```

### 3. カスタムウィンドウオブジェクト

```typescript
// types/window.d.ts
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;

    dataLayer?: any[];
  }
}

export {};

// 使用例
window.gtag?.('event', 'page_view', { page_path: '/home' });
```

## 演習ファイル

1. **01-dts-basics.ts** - 型定義ファイルの基本（15問）
2. **02-types-packages.ts** - @types パッケージの利用（15問）
3. **03-custom-definitions.ts** - 自作の型定義ファイル（15問）
4. **04-declare-keyword.ts** - declare キーワード（15問）
5. **05-advanced-patterns.ts** - 実践的なパターン（15問）

## 次のステップ

型定義ファイルをマスターすることで、以下が可能になります：

1. **既存ライブラリの型安全な利用** - JavaScript ライブラリを TypeScript で安全に使用
2. **カスタム型定義の作成** - 社内ライブラリや独自モジュールの型定義
3. **グローバル環境の型安全化** - window オブジェクトや環境変数の型定義
4. **サードパーティライブラリへの貢献** - DefinitelyTyped への型定義の提供

次のチャプターでは、これまで学んだ知識を活用した実践的なプロジェクトに取り組みます。
