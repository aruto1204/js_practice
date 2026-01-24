# Chapter 6: ジェネリクス - 解説ドキュメント

このフォルダには、Chapter 6 の exercises（練習問題）に対する詳細な解説ドキュメントが含まれています。

## ドキュメント一覧

### [01-basic-generics.md](./01-basic-generics.md)
**ジェネリクスの基本**

型パラメータを使った再利用可能なコードの書き方について解説しています。

**主なトピック:**
- ジェネリック関数の基本構文
- 型パラメータの命名規則
- 複数の型パラメータの使用
- ジェネリックインターフェースと型エイリアス
- Result 型と Maybe 型のパターン
- `any` との違いと利点

### [02-generic-constraints.md](./02-generic-constraints.md)
**ジェネリック制約**

`extends` キーワードを使って型パラメータに制限を設ける方法について解説しています。

**主なトピック:**
- プロパティ制約（`T extends { prop: type }`）
- `keyof` を使ったキー制約
- インターフェース制約
- ユニオン型・交差型制約
- コンストラクタ型の制約
- `infer` キーワードの使用

### [03-generic-classes.md](./03-generic-classes.md)
**ジェネリッククラス**

クラスに型パラメータを導入して、再利用可能なデータ構造を実装する方法について解説しています。

**主なトピック:**
- 基本的なコンテナクラス（Box, Container）
- データ構造の実装（Stack, Queue, TreeNode）
- デザインパターン（Optional, Result, Observer, Builder）
- ジェネリッククラスの継承
- 遅延評価とイベントシステム

### [04-utility-types.md](./04-utility-types.md)
**ユーティリティ型の活用**

TypeScript 組み込みのユーティリティ型を使った実践的な型操作について解説しています。

**主なトピック:**
- `Partial`, `Required`, `Readonly` の使用
- `Pick`, `Omit` によるプロパティの選択/除外
- `Record` によるマッピング型
- `Extract`, `Exclude`, `NonNullable` による型フィルタリング
- `ReturnType`, `Parameters` による関数型の操作
- カスタムユーティリティ型の作成

### [05-advanced-generics.md](./05-advanced-generics.md)
**高度なジェネリクスパターン**

条件型、Mapped Types、infer キーワードなどを組み合わせた高度な型操作について解説しています。

**主なトピック:**
- 条件型（Conditional Types）の基本と応用
- `infer` キーワードによる型の推論
- Mapped Types とキーのリマッピング
- テンプレートリテラル型
- `DeepPartial`, `DeepReadonly` などの再帰的型
- `UnionToIntersection` などの高度な型変換
- 型安全なパスアクセス関数の実装

## 学習の進め方

### 推奨される学習順序

1. **ジェネリクスの基本** - 型パラメータの概念を理解する
2. **ジェネリック制約** - 型パラメータに制限を設ける方法を学ぶ
3. **ジェネリッククラス** - クラスでジェネリクスを活用する
4. **ユーティリティ型** - 組み込み型を使いこなす
5. **高度なジェネリクス** - 条件型や Mapped Types を活用する

### 各ドキュメントの構成

各解説ドキュメントは以下の構成になっています：

1. **概要** - その機能の全体像
2. **基本概念** - 基礎的な知識と構文
3. **各問題の解説** - exercises ファイルの各問題の詳細な説明
4. **ベストプラクティス** - 実践的な使い方と推奨パターン
5. **よくある間違いと解決策** - 典型的なミスとその対処法
6. **まとめ** - 重要なポイントの復習

## 活用方法

### 1. exercises と並行して学習

```bash
# exercises ファイルを開く
code part2-typescript-basics/chapter06-generics/exercises/01-basic-generics.ts

# 対応する解説を開く
code part2-typescript-basics/chapter06-generics/explanations/01-basic-generics.md
```

### 2. 問題を解いてから解説を読む

1. exercises ファイルの問題を自分で解いてみる
2. 実装が完了したら解説を読んで理解を深める
3. ベストプラクティスを確認し、コードを改善する

### 3. リファレンスとして使用

- 特定の機能の使い方を忘れた時
- より良い実装方法を探している時
- コードレビューの参考資料として

## 各トピックの関連性

```
ジェネリクスの基本
       ↓
ジェネリック制約 ←→ ユーティリティ型
       ↓                ↓
ジェネリッククラス ←→ 高度なジェネリクス
```

### 重要な組み合わせ

1. **ジェネリクス + 制約**
   - 型パラメータに必要な構造を保証
   - `keyof` と組み合わせて型安全なプロパティアクセス

2. **ジェネリッククラス + デザインパターン**
   - Result/Option パターンでエラーハンドリング
   - Observer パターンでリアクティブプログラミング
   - Builder パターンで複雑なオブジェクト構築

3. **ユーティリティ型 + 型変換**
   - `Partial` + `Required` で柔軟なフォーム型
   - `Pick` + `Omit` で API レスポンスの型定義
   - `ReturnType` + `Parameters` で関数型の操作

## よくある質問

### Q: ジェネリクスと `any` の違いは？

**any:**
- 型情報が完全に失われる
- 型チェックがスキップされる
- IDE のサポートが限定的

**ジェネリクス:**
- 型情報が保持される
- 型安全性が維持される
- IDE の補完やリファクタリングが効く

```typescript
// any を使った場合
function identityAny(value: any): any {
  return value;
}
const result1 = identityAny('hello'); // result1: any

// ジェネリクスを使った場合
function identity<T>(value: T): T {
  return value;
}
const result2 = identity('hello'); // result2: string
```

### Q: 型パラメータはいつ使うべき？

**使うべき場面:**
- 入力と出力で同じ型を維持したい場合
- 複数の型で再利用したいコードがある場合
- コレクション操作（配列、Map など）
- データ構造の実装

**使わなくてよい場面:**
- 単一の型でしか使わない関数
- 型パラメータが戻り値に影響しない場合
- 単純な関数で型推論が十分な場合

### Q: `extends` の意味は？

ジェネリクスでの `extends` は「制約」を表します：

```typescript
// T は { length: number } を持つ型に制限される
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}
```

クラスの継承とは異なり、「T は〜を満たす型である」という意味になります。

### Q: ユーティリティ型を自作する方法は？

Mapped Types と条件型を使います：

```typescript
// すべてのプロパティを nullable にする
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// 関数プロパティのみを抽出
type FunctionProps<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};
```

## 実践への応用

これらのジェネリクスの知識は、以下のような実践的な場面で活用できます：

### 1. API クライアント

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// 使用例
const userResponse = await fetchData<User>('/api/users/1');
const postsResponse = await fetchData<Post[]>('/api/posts');
```

### 2. 状態管理

```typescript
class Store<State> {
  private state: State;
  private listeners: Array<(state: State) => void> = [];

  constructor(initialState: State) {
    this.state = initialState;
  }

  getState(): State {
    return this.state;
  }

  setState(updater: Partial<State> | ((prev: State) => Partial<State>)): void {
    const updates = typeof updater === 'function' ? updater(this.state) : updater;
    this.state = { ...this.state, ...updates };
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener: (state: State) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}
```

### 3. フォームバリデーション

```typescript
type ValidationRule<T> = (value: T) => string | null;

interface FormField<T> {
  value: T;
  rules: ValidationRule<T>[];
  errors: string[];
}

function validateField<T>(field: FormField<T>): FormField<T> {
  const errors = field.rules
    .map(rule => rule(field.value))
    .filter((error): error is string => error !== null);

  return { ...field, errors };
}
```

### 4. データ変換パイプライン

```typescript
type Transformer<Input, Output> = (input: Input) => Output;

function pipe<A, B>(t1: Transformer<A, B>): Transformer<A, B>;
function pipe<A, B, C>(t1: Transformer<A, B>, t2: Transformer<B, C>): Transformer<A, C>;
function pipe<A, B, C, D>(
  t1: Transformer<A, B>,
  t2: Transformer<B, C>,
  t3: Transformer<C, D>
): Transformer<A, D>;
function pipe(...transformers: Transformer<any, any>[]): Transformer<any, any> {
  return (input) => transformers.reduce((acc, t) => t(acc), input);
}
```

## まとめ

Chapter 6 のジェネリクスをマスターすることで、以下のことができるようになります：

- ✅ 型安全で再利用可能な関数やクラスを作成できる
- ✅ TypeScript の型システムを最大限に活用できる
- ✅ 複雑な型変換を宣言的に表現できる
- ✅ デザインパターンを型安全に実装できる
- ✅ より保守しやすく、自己文書化されたコードを書ける

ジェネリクスは TypeScript の最も強力な機能の一つです。これらの概念をしっかり理解することで、プロフェッショナルレベルの TypeScript コードを書けるようになります。
