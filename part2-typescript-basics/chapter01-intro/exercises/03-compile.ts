// 練習問題 3: コンパイルの練習

/**
 * 問題 1: 基本的なコンパイル
 *
 * このファイルをコンパイルしてみましょう。
 * ターミナルで以下を実行:
 * npx tsc exercises/03-compile.ts
 *
 * 生成された .js ファイルを確認してください。
 */

function greet(name: string): string {
  return `Hello, ${name}!`;
}

// console.log(greet('TypeScript'));

/**
 * 問題 2: 型エラーのあるコードをコンパイル
 *
 * 以下のコメントを外してコンパイルしてみてください。
 * どのようなエラーメッセージが表示されるか確認しましょう。
 */

// const num: number = '123'; // 型エラー

/**
 * 問題 3: コンパイル後の JavaScript を確認
 *
 * 以下の TypeScript のコードがどのような JavaScript になるか確認してください。
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
// console.log(person.greet());
// テンプレートリテラル

const message: string = `Result: ${add(5, 3)}`;

// console.log(message);

/**
 * 問題 4: ターゲットバージョンの変更
 *
 * 異なるターゲットバージョンでコンパイルしてみましょう。
 *
 * ES2022 でコンパイル:
 * npx tsc --target ES2022 exercises/03-compile.ts
 *
 * ES5 でコンパイル:
 * npx tsc --target ES5 exercises/03-compile.ts
 *
 * 生成された JavaScript を比較してください。
 */

/**
 * 問題 5: ts-node で直接実行
 *
 * コンパイルせずに直接実行してみましょう。
 * npx ts-node exercises/03-compile.ts
 */

/**
 * 問題 6: 複数ファイルのコンパイル
 *
 * 以下の helper 関数を別ファイルに分割してみましょう。
 */

// helper.ts に移動すべきコード
// export function formatCurrency(amount: number): string {
//   return `¥${amount.toLocaleString()}`;
// }

// export function formatDate(date: Date): string {
//   return date.toLocaleDateString('ja-JP');
// }

// このファイルから使用
// import { formatCurrency, formatDate } from './helper';
// console.log(formatCurrency(1000));
// console.log(formatDate(new Date()));

/**
 * 問題 7: ウォッチモードの使用
 *
 * ファイルの変更を監視してコンパイルしてみましょう。
 * npx tsc --watch exercises/03-compile.ts
 *
 * ファイルを編集して保存すると、自動的に再コンパイルされます。
 * Ctrl+C で終了できます。
 */

/**
 * 問題 8: エラーがあってもコンパイル
 *
 * --noEmitOnError オプションなしでコンパイルしてみましょう。
 */

// 以下のコメントを外す
// const wrongType: number = 'string'; // 型エラー

// npx tsc exercises/03-compile.ts
// エラーがあっても .js ファイルは生成される

// npx tsc --noEmitOnError exercises/03-compile.ts
// エラーがある場合は .js ファイルが生成されない
