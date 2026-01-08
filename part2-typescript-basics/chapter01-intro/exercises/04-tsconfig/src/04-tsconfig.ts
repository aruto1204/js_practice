// 練習問題 4: tsconfig.json の設定

/**
 * この練習問題では tsconfig.json の設定を体験します。
 * exercises/04-tsconfig/ ディレクトリで作業してください。
 */

/**
 * 問題 1: tsconfig.json の生成
 *
 * 以下のコマンドで tsconfig.json を生成してください。
 * npx tsc --init
 *
 * 生成されたファイルを確認してください。
 */

/**
 * 問題 2: strict モードの確認
 *
 * tsconfig.json の "strict": true の効果を確認してください。
 */

// strict: false の場合、以下のコードはエラーにならない
function display(value: any) {
  console.log(value.toUpperCase()); // any 型なので何でも許される
}

// strict: true の場合、より厳密な型チェックが行われる
function strictDisplay(value: string): void {
  console.log(value.toUpperCase()); // string 型のみ許される
}
/**
 * 問題 3: outDir と rootDir の設定
 *
 * tsconfig.json に以下を追加してください:
 * {
 *   "compilerOptions": {
 *     "outDir": "./dist",
 *     "rootDir": "./src"
 *   }
 * }
 *
 * src/ ディレクトリに .ts ファイルを作成し、
 * コンパイル後に dist/ ディレクトリに .js ファイルが生成されることを確認してください。
 */

/**
 * 問題 4: target の変更
 *
 * tsconfig.json の "target" を変更してみましょう。
 *
 * "target": "ES5"  - 古いブラウザ対応
 * "target": "ES2022" - 最新の JavaScript
 *
 * 以下のコードをコンパイルして、出力の違いを確認してください。
 */

const numbers = [1, 2, 3, 4, 5];

// アロー関数
const doubled = numbers.map((n) => n * 2);

// テンプレートリテラル
const message = `Doubled: ${doubled.join(', ')}`;

console.log(message);

/**
 * 問題 5: module の設定
 *
 * tsconfig.json の "module" を変更してみましょう。
 *
 * "module": "commonjs" - Node.js で使用
 * "module": "esnext"   - ES Modules で使用
 */

export function add(a: number, b: number): number {
  return a + b;
}

// コンパイル後の出力を比較してください

//

/**
 * 問題 7: strictNullChecks
 *
 * tsconfig.json の "strictNullChecks" の効果を確認してください。
 */

// strictNullChecks: false の場合
// function getLength1(str: string) {
//   return str.length; // null や undefined が渡される可能性がある
// }

// strictNullChecks: true の場合
function getLength2(str: string | null) {
  if (str === null) {
    return 0;
  }
  return str.length; // null チェック後なので安全
}

/**
 * 問題 8: カスタム tsconfig.json の作成
 *
 * 以下の要件を満たす tsconfig.json を作成してください:
 *
 * 1. ES2022 をターゲットにする
 * 2. src/ 配下のファイルをコンパイル
 * 3. dist/ にコンパイル結果を出力
 * 4. strict モードを有効にする
 * 5. ソースマップを生成する ("sourceMap": true)
 */

/**
 * 問題 9: 複数の tsconfig.json
 *
 * プロジェクトによっては、開発用と本番用で異なる設定を使うことがあります。
 *
 * tsconfig.json      - 基本設定
 * tsconfig.dev.json  - 開発用（extends を使用）
 * tsconfig.prod.json - 本番用（extends を使用）
 *
 * tsconfig.dev.json の例:
 * {
 *   "extends": "./tsconfig.json",
 *   "compilerOptions": {
 *     "sourceMap": true,
 *     "removeComments": false
 *   }
 * }
 */

/**
 * 問題 10: package.json のスクリプト
 *
 * package.json に以下のスクリプトを追加してください:
 * {
 *   "scripts": {
 *     "build": "tsc",
 *     "build:watch": "tsc --watch",
 *     "dev": "ts-node src/index.ts"
 *   }
 * }
 *
 * 実行方法:
 * npm run build        - コンパイル
 * npm run build:watch  - ウォッチモード
 * npm run dev          - ts-node で直接実行
 */
