// 解答例 3: コンパイルの練習

/**
 * 問題 1: 基本的なコンパイル
 *
 * コマンド:
 * npx tsc solutions/03-compile.ts
 *
 * 生成されるファイル:
 * solutions/03-compile.js
 */

function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet('TypeScript'));

/**
 * 問題 2: 型エラーのあるコードをコンパイル
 *
 * 以下のコメントを外すとコンパイルエラーになります:
 */

// const num: number = '123';
// エラー: Type 'string' is not assignable to type 'number'

/**
 * 問題 3: コンパイル後の JavaScript を確認
 */

// アロー関数
const add = (a: number, b: number): number => {
  return a + b;
};

// クラス
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

const person = new Person('太郎');
console.log(person.greet());

// テンプレートリテラル
const message: string = `Result: ${add(5, 3)}`;
console.log(message);

/**
 * 問題 4: ターゲットバージョンの変更
 *
 * ES2022 でコンパイル:
 * npx tsc --target ES2022 solutions/03-compile.ts
 * → アロー関数やクラスがそのまま出力される
 *
 * ES5 でコンパイル:
 * npx tsc --target ES5 solutions/03-compile.ts
 * → アロー関数は function に変換される
 * → クラスはプロトタイプベースに変換される
 */

/**
 * 問題 5: ts-node で直接実行
 *
 * コマンド:
 * npx ts-node solutions/03-compile.ts
 *
 * コンパイルせずに直接実行されます。
 */

/**
 * 問題 6: 複数ファイルのコンパイル
 */

// helper.ts に分割する場合
export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP');
}

// 使用例
console.log(formatCurrency(1000));
console.log(formatDate(new Date()));

/**
 * 問題 7: ウォッチモードの使用
 *
 * コマンド:
 * npx tsc --watch solutions/03-compile.ts
 *
 * ファイルを保存するたびに自動的に再コンパイルされます。
 * Ctrl+C で終了します。
 */

/**
 * 問題 8: エラーがあってもコンパイル
 *
 * デフォルトの動作:
 * npx tsc solutions/03-compile.ts
 * → エラーがあっても .js ファイルは生成される
 *
 * エラー時にコンパイルしない:
 * npx tsc --noEmitOnError solutions/03-compile.ts
 * → エラーがある場合は .js ファイルが生成されない
 */

// 型エラーの例（コメントアウトしている）
// const wrongType: number = 'string';

/**
 * コンパイル結果の確認ポイント:
 *
 * 1. 型注釈は削除される
 * 2. インターフェースや型エイリアスは出力されない（型情報のみ）
 * 3. ターゲットバージョンに応じて構文が変換される
 * 4. import/export 文はモジュールシステムに応じて変換される
 */
