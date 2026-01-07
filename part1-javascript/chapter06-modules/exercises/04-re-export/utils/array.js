// 練習問題 4: array.js
// 配列操作関数を実装してエクスポートしてください

// ここにコードを書く
export function shuffle(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function unique(arr) {
  return [...new Set(arr)];
}
