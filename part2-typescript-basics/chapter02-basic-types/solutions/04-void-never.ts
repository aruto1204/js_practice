// 解答例 4: void型とnever型

/**
 * 問題 1: void 型の基本
 */

function logMessage(message: string): void {
  console.log(message);
}

logMessage('Hello, TypeScript!');

/**
 * 問題 2: void 関数の return
 */

function doSomething(): void {
  console.log('処理実行');
  return; // OK
  // return undefined; // OK
  // return null; // エラー（strictNullChecks が有効な場合）
  // return 123; // エラー
}

/**
 * 問題 3: コンソール出力関数
 */

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
 */

function printNumbers(numbers: number[]): void {
  numbers.forEach((num) => {
    console.log(num);
  });
}

printNumbers([1, 2, 3, 4, 5]);

/**
 * 問題 5: never 型の基本
 */

function throwError(message: string): never {
  throw new Error(message);
}

// throwError('エラーが発生しました');

/**
 * 問題 6: 無限ループ
 */

function infiniteLoop(): never {
  while (true) {
    // 処理（実際には使わない）
  }
}

/**
 * 問題 7: void vs never
 */

// 値を返さないが、正常に終了する
function funcA(): void {
  console.log('実行');
}

// 常に例外を投げる
function funcB(): never {
  throw new Error('エラー');
}

// 条件によって例外を投げる
function funcC(value: number): void {
  if (value < 0) {
    throw new Error('負の数は不正');
  }
  console.log(value);
}

/**
 * 問題 8: 網羅性チェック
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
      const exhaustiveCheck: never = status;
      throw new Error(`未処理のステータス: ${exhaustiveCheck}`);
  }
}

console.log(handleStatus('success')); // 成功

/**
 * 問題 9: アサーション関数
 */

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function processValue(value: string | null): void {
  assert(value !== null, 'value は null であってはいけません');
  console.log(value.toUpperCase()); // value は string 型として扱える
}

processValue('hello'); // HELLO
// processValue(null); // エラー: value は null であってはいけません

/**
 * 問題 10: エラーハンドリング
 */

function fail(message: string): never {
  throw new Error(message);
}

function divide(a: number, b: number): number {
  if (b === 0) {
    fail('0で割ることはできません');
  }
  return a / b;
}

console.log(divide(10, 2)); // 5
// console.log(divide(10, 0)); // エラー: 0で割ることはできません

/**
 * 問題 11: 型ガードと never
 */

function processValue2(value: string | number): void {
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

processValue2('hello'); // HELLO
processValue2(42); // 42.00

/**
 * 問題 12: コールバック関数の型
 */

function forEach(arr: number[], callback: (item: number) => void): void {
  for (const item of arr) {
    callback(item);
  }
}

forEach([1, 2, 3], (num) => {
  console.log(num * 2);
});

/**
 * 問題 13: Promise と void
 */

async function saveData(data: string): Promise<void> {
  console.log('データを保存中...');
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('保存完了:', data);
}

saveData('test data');

/**
 * 問題 14: イベントハンドラ
 */

function handleClick(event: { x: number; y: number }): void {
  console.log(`クリック位置: (${event.x}, ${event.y})`);
}

handleClick({ x: 100, y: 200 });

/**
 * 問題 15: never の実践的な使用
 */

type Shape = 'circle' | 'square' | 'triangle';

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

function getArea(shape: Shape): number {
  switch (shape) {
    case 'circle':
      return Math.PI * 10 * 10;
    case 'square':
      return 10 * 10;
    case 'triangle':
      return (10 * 10) / 2;
    default:
      return assertNever(shape); // すべてのケースを処理していることを保証
  }
}

console.log(getArea('circle')); // 314.159...
console.log(getArea('square')); // 100
console.log(getArea('triangle')); // 50
