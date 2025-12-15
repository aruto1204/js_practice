// 解答例 5: logger.js

export function log(message) {
  console.log(`[LOG] ${message}`);
}

export function error(message) {
  console.error(`[ERROR] ${message}`);
}

export function success(message) {
  console.log(`[SUCCESS] ✓ ${message}`);
}
