// 解答例 5: storage.js

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
