// 練習問題 4: void型とnever型

/**
 * 問題 1: void 型の基本
 * 値を返さない関数を作成してください。
 */

// ここにコードを書く
function logMessage(message: string): void {
  console.log(message);
}
logMessage('Hello, TypeScript!');

/**
 * 問題 2: void 関数の return
 * void 関数での return の使い方を確認してください。
 */

// ここにコードを書く
function doSomething(): void {
  console.log('処理実行');
  // return; // OK
  // return undefined; // OK
  // return null; // エラー（strictNullChecks が有効な場合）
  // return 123; // エラー
}

doSomething();

/**
 * 問題 3: コンソール出力関数
 * 様々な形式でコンソールに出力する関数を作成してください。
 */

// ここにコードを書く
function logInfo(message: string): void {
  console.log(`[INFO] ${message}`);
}

function logError(message: string): void {
  console.error(`[ERROR] ${message}`);
}

function logWarning(message: string): void {
  console.warn(`[WARNING] ${message}`);
}

logInfo('アプリケーション起動');
logWarning('警告メッセージ');
logError('エラーが発生しました');
/**
 * 問題 4: 配列の forEach
 * 配列の各要素を処理する関数を作成してください。
 */

// ここにコードを書く
// function printNumbers(numbers: number[]): void {
//   numbers.forEach((num) => {
//     console.log(num);
//   });
// }

/**
 * 問題 5: never 型の基本
 * 例外を投げる関数を作成してください。
 */

// ここにコードを書く
// function throwError(message: string): never {
//   throw new Error(message);
// }

/**
 * 問題 6: 無限ループ
 * 決して終了しない関数を作成してください。
 */

// ここにコードを書く
// function infiniteLoop(): never {
//   while (true) {
//     // 処理
//   }
// }

/**
 * 問題 7: void vs never
 * 以下の関数の戻り値の型を正しく指定してください。
 */

// 値を返さないが、正常に終了する
function funcA() {
  console.log('実行');
}

// 常に例外を投げる
function funcB() {
  throw new Error('エラー');
}

// 条件によって例外を投げる
function funcC(value: number) {
  if (value < 0) {
    throw new Error('負の数は不正');
  }
  console.log(value);
}

/**
 * 問題 8: 網羅性チェック
 * すべてのケースを処理していることを保証してください。
 */

type Status = 'success' | 'error' | 'pending';

function handleStatus(status: Status): string {
  switch (status) {
    case 'success':
      return '成功';
    case 'error':
      return 'エラー';
    case 'pending':
      return '処理中';
    default:
      // ここにコードを書く
      // never 型を使って網羅性をチェック
      const exhaustiveCheck: never = status;
      throw new Error(`未処理のステータス: ${exhaustiveCheck}`);
  }
}

/**
 * 問題 9: アサーション関数
 * 条件が false の場合に例外を投げる関数を作成してください。
 */

// ここにコードを書く
// function assert(condition: boolean, message: string): asserts condition {
//   if (!condition) {
//     throw new Error(message);
//   }
// }

// 使用例
// function processValue(value: string | null) {
//   assert(value !== null, 'value は null であってはいけません');
//   console.log(value.toUpperCase()); // value は string 型として扱える
// }

/**
 * 問題 10: エラーハンドリング
 * エラーを投げる関数と、それをキャッチする関数を作成してください。
 */

// ここにコードを書く
function divide(a: number, b: number): number {
  if (b === 0) {
    // ここに never を返す関数を呼び出す
  }
  return a / b;
}

/**
 * 問題 11: 型ガードと never
 * 型の絞り込みで never 型になるケースを確認してください。
 */

function processValue(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else if (typeof value === 'number') {
    console.log(value.toFixed(2));
  } else {
    // ここでは value は never 型
    const neverValue: never = value;
    console.log('到達しない', neverValue);
  }
}

/**
 * 問題 12: コールバック関数の型
 * コールバック関数が void を返す場合の例を作成してください。
 */

// ここにコードを書く
// function forEach(arr: number[], callback: (item: number) => void): void {
//   for (const item of arr) {
//     callback(item);
//   }
// }

// 使用例
// forEach([1, 2, 3], (num) => {
//   console.log(num);
// });

/**
 * 問題 13: Promise と void
 * Promise<void> を返す非同期関数を作成してください。
 */

// ここにコードを書く
// async function saveData(data: string): Promise<void> {
//   console.log('データを保存中...');
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   console.log('保存完了');
// }

/**
 * 問題 14: イベントハンドラ
 * イベントハンドラ関数を作成してください（void を返す）。
 */

// ここにコードを書く
// function handleClick(event: { x: number; y: number }): void {
//   console.log(`クリック位置: (${event.x}, ${event.y})`);
// }

/**
 * 問題 15: never の実践的な使用
 * 想定外の値を処理する関数を作成してください。
 */

type Shape = 'circle' | 'square' | 'triangle';

function getArea(shape: Shape): number {
  switch (shape) {
    case 'circle':
      return Math.PI * 10 * 10;
    case 'square':
      return 10 * 10;
    case 'triangle':
      return (10 * 10) / 2;
    default:
      // ここにコードを書く
      // never 型を使って未処理のケースをチェック
      return assertNever(shape);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}
