// 練習問題 5: storage.js
// save, load 関数を実装して名前付きエクスポートしてください

// ここにコードを書く
const storage = new Map();

export function save(key, data) {
  storage.set(key, JSON.stringify(data));
  console.log(`[Storage] データを保存しました: ${key}`);
}

export function load(key) {
  const data = storage.get(key);
  if (data) {
    console.log(`[Storage] データを読み込みました: ${key}`);
    return JSON.parse(data);
  }
  console.log(`[Storage] データが見つかりません: ${key}`);
  return null;
}
