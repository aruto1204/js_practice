// 練習問題 4: string.js
// 文字列操作関数を実装してエクスポートしてください

// ここにコードを書く
export function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function reverse(str) {
  return str.split('').reverse().join('');
}
