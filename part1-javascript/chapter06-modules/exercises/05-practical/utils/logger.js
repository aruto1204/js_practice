// 練習問題 5: logger.js
// log, error, success 関数を実装して名前付きエクスポートしてください

// ここにコードを書く
export function log(message) {
  console.log(`[LOG] ${message}`);
}

export function error(message) {
  console.error(`[ERROR] ${message}`);
}

export function success(message) {
  console.log(`[SUCCESS] ✓ ${message}`);
}
