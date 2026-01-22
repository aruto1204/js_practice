# 型アサーション（Type Assertion）解説

## 概要

型アサーション（Type Assertion）は、TypeScript コンパイラに「この値は特定の型である」と明示的に伝える機能です。型ガードとは異なり、ランタイムでの型チェックは行わず、コンパイル時の型情報のみを変更します。

## 基本概念

### 型アサーションの構文

```typescript
// as 構文（推奨）
const value = someValue as string;

// アングルブラケット構文（JSX では使用不可）
const value = <string>someValue;
```

## 各問題の解説

### 問題1: 基本的な型アサーション

```typescript
function toUpperCase(value: unknown): string {
  return (value as string).toUpperCase();
}
```

**ポイント:**
- `unknown` 型から `string` 型へアサーション
- TypeScript に「この値は string である」と伝える
- ランタイムでの検証は行われない
- 誤った型アサーションは実行時エラーの原因になる

**警告:**
```typescript
toUpperCase(123); // コンパイルは通るが、実行時エラー
// TypeError: value.toUpperCase is not a function
```

### 問題2: DOM要素の型アサーション

```typescript
function disableButton(id: string): void {
  const button = document.getElementById(id) as HTMLButtonElement;
  button.disabled = true;
}
```

**ポイント:**
- `getElementById` は `HTMLElement | null` を返す
- `HTMLButtonElement` にアサーションすることで `disabled` プロパティにアクセス可能
- DOM操作で頻繁に使用されるパターン
- 要素が存在しない、または異なる型の場合は実行時エラー

**より安全な書き方:**
```typescript
function disableButton(id: string): void {
  const button = document.getElementById(id);
  if (button instanceof HTMLButtonElement) {
    button.disabled = true;
  }
}
```

### 問題3: API レスポンスの型アサーション

```typescript
type User = {
  name: string;
  email: string;
};

function parseUserResponse(response: any): User {
  return response as User;
}
```

**ポイント:**
- `any` 型から具体的な型へのアサーション
- API レスポンスの型付けに使用
- 実際のデータ構造を信頼している前提
- バリデーションと組み合わせるべき

**より安全な実装:**
```typescript
function parseUserResponse(response: any): User {
  if (
    typeof response === 'object' &&
    response !== null &&
    typeof response.name === 'string' &&
    typeof response.email === 'string'
  ) {
    return response as User;
  }
  throw new Error('Invalid user response');
}
```

### 問題4-5: as const アサーション

```typescript
const COLORS = {
  RED: '#FF0000',
  GREEN: '#00FF00',
  BLUE: '#0000FF',
} as const;

const SIZES = ['small', 'medium', 'large'] as const;
```

**ポイント:**
- **定数アサーション（const assertion）**: `as const`
- オブジェクトや配列を deeply readonly にする
- 値をリテラル型として推論
- イミュータブルな定数の定義に最適

**as const の効果:**
```typescript
// 通常の定義
const colors1 = { RED: '#FF0000' };
// colors1 の型: { RED: string }
// colors1.RED = '#000000'; // OK

// as const を使用
const colors2 = { RED: '#FF0000' } as const;
// colors2 の型: { readonly RED: '#FF0000' }
// colors2.RED = '#000000'; // エラー

// 配列の場合
const sizes1 = ['small', 'medium'];
// sizes1 の型: string[]

const sizes2 = ['small', 'medium'] as const;
// sizes2 の型: readonly ['small', 'medium']
```

### 問題6: 非 null アサーション

```typescript
function getLength(str: string | null): number {
  return str!.length;
}
```

**ポイント:**
- **非 null アサーション演算子（Non-null Assertion Operator）**: `!`
- 値が `null` または `undefined` でないことを保証
- `str!` は `str` から `null` と `undefined` を除外
- 使用には注意が必要（実際に null の場合は実行時エラー）

**警告:**
```typescript
getLength(null); // 実行時エラー
// TypeError: Cannot read property 'length' of null
```

**より安全な書き方:**
```typescript
function getLength(str: string | null): number {
  if (str === null) {
    throw new Error('String is null');
  }
  return str.length;
}
```

### 問題7: ジェネリクスと型アサーション

```typescript
function first<T>(arr: T[]): T {
  return arr[0] as T;
}
```

**ポイント:**
- `arr[0]` は `T | undefined` 型
- `as T` でアサーションして `T` 型として扱う
- 配列が空の場合は `undefined` が返される
- 配列に要素が存在することを保証する前提

**より安全な実装:**
```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0]; // アサーションなし
}

// または例外を投げる
function first<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }
  return arr[0];
}
```

### 問題8: オブジェクトの型アサーション

```typescript
type Config = {
  host: string;
  port: number;
  debug: boolean;
};

function loadConfig(jsonString: string): Config {
  return JSON.parse(jsonString) as Config;
}
```

**ポイント:**
- `JSON.parse()` は `any` 型を返す
- アサーションで具体的な型を指定
- JSON データの構造を信頼している前提
- バリデーションライブラリ（zod, yup など）の使用を検討

### 問題12: const アサーションとオブジェクト

```typescript
const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

type Route = (typeof ROUTES)[keyof typeof ROUTES];
// Route = '/' | '/about' | '/contact'
```

**ポイント:**
- `as const` でリテラル型を保持
- `typeof ROUTES` で値から型を抽出
- `keyof typeof ROUTES` でキーのユニオン型を取得
- `(typeof ROUTES)[keyof typeof ROUTES]` で値のユニオン型を取得

**型の抽出ステップ:**
```typescript
// 1. オブジェクトの型を取得
type RoutesType = typeof ROUTES;
// { readonly HOME: '/'; readonly ABOUT: '/about'; readonly CONTACT: '/contact' }

// 2. キーのユニオン型を取得
type RoutesKeys = keyof typeof ROUTES;
// 'HOME' | 'ABOUT' | 'CONTACT'

// 3. 値のユニオン型を取得
type Route = (typeof ROUTES)[keyof typeof ROUTES];
// '/' | '/about' | '/contact'
```

### 問題14: satisfies 演算子（TypeScript 4.9+）

```typescript
type Config2 = {
  host: string;
  port: number;
  features: Record<string, boolean>;
};

const config2 = {
  host: 'localhost',
  port: 3000,
  features: {
    auth: true,
    logging: false,
  },
} satisfies Config2;
```

**ポイント:**
- **satisfies 演算子**: 型チェックを行いつつ、リテラル型を保持
- 型アサーション（`as`）よりも安全
- 型チェックに失敗するとコンパイルエラー
- より詳細な型情報を保持

**as との違い:**
```typescript
// as を使用
const config1 = {
  host: 'localhost',
  port: 3000,
  features: { auth: true },
} as Config2;
// config1.host の型: string
// config1.features.auth の型: boolean

// satisfies を使用
const config2 = {
  host: 'localhost',
  port: 3000,
  features: { auth: true },
} satisfies Config2;
// config2.host の型: 'localhost'（リテラル型）
// config2.features.auth の型: true（リテラル型）

// ❌ 型エラーを検出
const config3 = {
  host: 123, // エラー: number は string に割り当てできない
  port: 3000,
  features: { auth: true },
} satisfies Config2;
```

### 問題15: 安全な型アサーション

```typescript
function safeAsString(value: unknown): string {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string');
  }
  return value as string;
}
```

**ポイント:**
- 型ガードと型アサーションを組み合わせる
- ランタイムでの検証を行ってからアサーション
- エラー処理を明示的に行う
- **推奨パターン**: 常に検証してからアサーション

## 型アサーションのベストプラクティス

### 1. 可能な限り型ガードを使用する

```typescript
// ❌ 悪い例: 型アサーションのみ
function process(value: unknown): void {
  const str = value as string;
  console.log(str.toUpperCase());
}

// ✅ 良い例: 型ガードで検証
function process(value: unknown): void {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  }
}
```

### 2. 型アサーションの前に検証する

```typescript
// ❌ 悪い例: 検証なし
const user = apiResponse as User;

// ✅ 良い例: 検証してからアサーション
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj
  );
}

if (isUser(apiResponse)) {
  const user = apiResponse as User;
}
```

### 3. as const を活用する

```typescript
// ❌ 悪い例: 型が広すぎる
const STATUS_CODES = {
  OK: 200,
  NOT_FOUND: 404,
};
// STATUS_CODES.OK の型: number

// ✅ 良い例: リテラル型を保持
const STATUS_CODES = {
  OK: 200,
  NOT_FOUND: 404,
} as const;
// STATUS_CODES.OK の型: 200
```

### 4. 非 null アサーションは慎重に使用

```typescript
// ❌ 悪い例: 非 null アサーションの乱用
function getUser(id: string) {
  return users.find(u => u.id === id)!;
}

// ✅ 良い例: null チェックを行う
function getUser(id: string) {
  const user = users.find(u => u.id === id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
```

### 5. satisfies を優先する（TypeScript 4.9+）

```typescript
// ❌ 型情報が失われる
const config = {
  host: 'localhost',
  port: 3000,
} as Config;
// config.host の型: string

// ✅ リテラル型を保持
const config = {
  host: 'localhost',
  port: 3000,
} satisfies Config;
// config.host の型: 'localhost'
```

## 型アサーションの危険性

### 1. 型安全性の破壊

```typescript
const num: number = 123;
const str = num as any as string; // コンパイルは通る
console.log(str.toUpperCase()); // 実行時エラー
```

### 2. null/undefined の見落とし

```typescript
function getElement(id: string) {
  return document.getElementById(id) as HTMLButtonElement;
  // 要素が存在しない場合、null がアサーションされる
}

const button = getElement('myButton');
button.disabled = true; // button が null の場合エラー
```

### 3. 構造の不一致

```typescript
interface User {
  name: string;
  age: number;
}

const data = { name: 'Alice' }; // age がない
const user = data as User; // コンパイルは通る
console.log(user.age); // undefined（実行時エラーではないが予期しない動作）
```

## 実践的なユースケース

### 1. DOM操作

```typescript
const input = document.querySelector('#email') as HTMLInputElement;
const value = input.value;
```

### 2. 型ガードの補完

```typescript
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // 明示的にアサーション
    const str = value as string;
    return str.toUpperCase();
  }
  return value * 2;
}
```

### 3. 定数の定義

```typescript
const ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
} as const;
```

### 4. JSON データの型付け

```typescript
const data: unknown = JSON.parse(jsonString);
if (isValidData(data)) {
  const typedData = data as MyType;
  // typedData を使用
}
```

## まとめ

型アサーションは強力な機能ですが、慎重に使用する必要があります：

**使用すべき場面:**
- DOM操作で具体的な要素型が必要な場合
- TypeScript が型を正確に推論できない場合
- 定数の定義（`as const`）
- 検証済みのデータの型付け

**避けるべき場面:**
- 型ガードで代替できる場合
- 外部データの検証なしでの使用
- 型の不一致を無理やり解決する場合

**推奨事項:**
- 可能な限り型ガードを使用
- アサーション前に検証を行う
- `satisfies` 演算子を活用（TypeScript 4.9+）
- 非 null アサーション（`!`）は最小限に

型アサーションは「最後の手段」として使用し、型安全性を最大限に保つよう心がけましょう。
