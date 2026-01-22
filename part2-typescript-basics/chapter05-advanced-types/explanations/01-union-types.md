# ユニオン型（Union Types）解説

## 概要

ユニオン型は、複数の型のいずれかを表現できる TypeScript の型システムです。`|` 演算子を使って複数の型を組み合わせることができます。

## 基本概念

### ユニオン型の宣言

```typescript
type ID = string | number;
```

この型は、`string` または `number` のどちらかの値を受け入れることができます。

## 各問題の解説

### 問題1: 基本的なユニオン型

```typescript
function toString(value: string | number): string {
  return String(value);
}
```

**ポイント:**
- `string | number` 型のパラメータを受け取る
- `String()` コンストラクタはどちらの型も文字列に変換できる
- 明示的な型チェックは不要

### 問題2: ID型の定義と型による分岐処理

```typescript
type ID = string | number;

function formatId(id: ID): string {
  if (typeof id === 'number') {
    return `ID-${id}`;
  }
  return id;
}
```

**ポイント:**
- カスタム型エイリアスでユニオン型を定義
- `typeof` 演算子による型ガードで型を絞り込み
- 絞り込み後は、その型固有のプロパティやメソッドに安全にアクセス可能

### 問題3: 配列のユニオン型

```typescript
function convertToStrings(arr: (number | string)[]): string[] {
  return arr.map((item) => String(item));
}
```

**ポイント:**
- `(number | string)[]` は各要素が number または string の配列
- `map()` メソッドで各要素を処理
- TypeScript は戻り値の型を `string[]` として推論

### 問題4: オブジェクトのユニオン型（判別可能なユニオン）

```typescript
type Success = {
  success: true;
  data: string;
};

type Error = {
  success: false;
  error: string;
};

type Result = Success | Error;

function getMessage(result: Result): string {
  if (result.success) {
    return `Success: ${result.data}`;
  }
  return `Error: ${result.error}`;
}
```

**ポイント:**
- **判別可能なユニオン（Discriminated Union）** のパターン
- `success` プロパティが **判別子（discriminant）** として機能
- TypeScript は判別子の値に基づいて型を自動的に絞り込む
- 絞り込み後は、各型固有のプロパティ（`data` や `error`）に安全にアクセス

### 問題5: null を含むユニオン型

```typescript
function getDisplayValue(value: string | null): string {
  return value ?? 'N/A';
}
```

**ポイント:**
- **Nullish Coalescing 演算子（`??`）** を使用
- `null` または `undefined` の場合のみデフォルト値を返す
- `||` 演算子と異なり、`''`、`0`、`false` などの falsy 値は通過

### 問題8: 複数のオブジェクト型のユニオン（kind プロパティによる判別）

```typescript
type Rectangle = {
  kind: 'rectangle';
  width: number;
  height: number;
};

type Circle = {
  kind: 'circle';
  radius: number;
};

type Shape = Rectangle | Circle;

function getArea(shape: Shape): number {
  if (shape.kind === 'rectangle') {
    return shape.width * shape.height;
  }
  return Math.PI * shape.radius ** 2;
}
```

**ポイント:**
- リテラル型 `'rectangle'` と `'circle'` を判別子として使用
- より明示的で読みやすいコードになる
- IDE の補完機能もより効果的に働く

### 問題10: APIレスポンスの型（switch文による型の絞り込み）

```typescript
type Loading = {
  status: 'loading';
};

type SuccessResponse = {
  status: 'success';
  data: any;
};

type ErrorResponse = {
  status: 'error';
  message: string;
};

type ApiState = Loading | SuccessResponse | ErrorResponse;

function renderState(state: ApiState): string {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Success: ${JSON.stringify(state.data)}`;
    case 'error':
      return `Error: ${state.message}`;
  }
}
```

**ポイント:**
- `switch` 文でも型の絞り込みが機能
- 各 `case` 内では対応する型として扱われる
- **網羅性チェック（Exhaustiveness Checking）**: すべてのケースを処理しないとコンパイルエラー

### 問題11: 関数のユニオン型

```typescript
function resolve<T>(valueOrFn: T | (() => T)): T {
  if (typeof valueOrFn === 'function') {
    return (valueOrFn as () => T)();
  }
  return valueOrFn;
}
```

**ポイント:**
- 関数型もユニオン型に含められる
- `typeof` で関数かどうかを判定
- 型アサーション `as () => T` が必要（TypeScript は関数の詳細な型を推論できない場合がある）
- **遅延評価（Lazy Evaluation）** パターンの実装に便利

### 問題12: 型述語（Type Predicate）を使った配列のフィルタリング

```typescript
function filterStrings(arr: (string | number)[]): string[] {
  return arr.filter((item): item is string => typeof item === 'string');
}

function filterNumbers(arr: (string | number)[]): number[] {
  return arr.filter((item): item is number => typeof item === 'number');
}
```

**ポイント:**
- `item is string` は **型述語（Type Predicate）**
- `filter()` の戻り値の型を正確に推論させる
- 型述語なしでは `(string | number)[]` のまま

### 問題15: 複雑な判別可能なユニオンとバリデーション

```typescript
type NumberInput = {
  type: 'number';
  value: number;
  min?: number;
  max?: number;
};

type TextInput = {
  type: 'text';
  value: string;
  maxLength?: number;
};

type CheckboxInput = {
  type: 'checkbox';
  checked: boolean;
};

type Input = NumberInput | TextInput | CheckboxInput;

function validate(input: Input): boolean {
  if (input.type === 'number') {
    if (input.min !== undefined && input.value < input.min) return false;
    if (input.max !== undefined && input.value > input.max) return false;
    return true;
  } else if (input.type === 'text') {
    if (input.maxLength !== undefined && input.value.length > input.maxLength) {
      return false;
    }
    return true;
  } else {
    return true; // checkbox は常に有効
  }
}
```

**ポイント:**
- 各型が異なる検証ロジックを持つ
- `type` プロパティで型を判別
- オプショナルプロパティ（`?`）の存在チェックには `!== undefined` を使用
- フォーム入力などの実践的なユースケース

## ベストプラクティス

### 1. 判別可能なユニオンを使用する

オブジェクトのユニオン型には、判別子となるプロパティを含めると型の絞り込みが容易になります。

```typescript
// 推奨
type Result =
  | { success: true; data: string }
  | { success: false; error: string };

// 非推奨（判別が困難）
type Result = {
  data?: string;
  error?: string;
};
```

### 2. 型ガードを活用する

型の絞り込みには適切な型ガードを使用しましょう。

```typescript
// typeof - プリミティブ型
if (typeof value === 'string') { /* ... */ }

// instanceof - クラスインスタンス
if (value instanceof Date) { /* ... */ }

// in - プロパティの存在チェック
if ('bark' in animal) { /* ... */ }

// 判別子プロパティ
if (result.success) { /* ... */ }
```

### 3. 網羅性チェックを活用する

`switch` 文や `if-else` 文ですべてのケースを処理することを確認しましょう。

```typescript
function handleState(state: ApiState): string {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Data: ${state.data}`;
    case 'error':
      return `Error: ${state.message}`;
    // default: がなければ、すべてのケースを処理していることが保証される
  }
}
```

### 4. ユニオン型は適度に使う

ユニオン型が複雑になりすぎないよう注意しましょう。

```typescript
// 適度
type Status = 'pending' | 'success' | 'error';

// 複雑すぎる可能性
type Value = string | number | boolean | null | undefined | object | symbol;
```

## まとめ

ユニオン型は TypeScript の強力な機能で、以下のような利点があります：

- **柔軟性**: 複数の型を受け入れる柔軟なAPIを設計できる
- **型安全性**: 型ガードを使って安全に型を絞り込める
- **表現力**: 判別可能なユニオンで複雑な状態を明示的に表現できる
- **保守性**: 網羅性チェックにより、すべてのケースを処理することが保証される

適切に使用することで、より安全で保守しやすいコードを書くことができます。
