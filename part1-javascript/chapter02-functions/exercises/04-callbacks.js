// 練習問題 4: コールバック関数
// 難易度: ⭐⭐⭐

/*
問題1: シンプルなコールバック関数を使う
*/

// コールバック関数を受け取り、実行する関数 execute を作成

function execute(callback) {
  console.log('処理開始');
  // ここでコールバックを実行
  console.log('処理終了');
}

execute(() => {
  console.log('コールバック実行中');
});



/*
問題2: 配列のforEachを使う
*/

const fruits = ['りんご', 'バナナ', 'オレンジ'];

// forEach を使って、各果物に '好き:' をつけて表示
// 例: '好き: りんご'

// ここにコードを書いてください




/*
問題3: mapを使って配列を変換
*/

const numbers = [1, 2, 3, 4, 5];

// map を使って、各要素を2倍にした新しい配列を作成
const doubled = /* ここにコードを書く */;

console.log(doubled); // [2, 4, 6, 8, 10]



/*
問題4: filterを使って配列をフィルタリング
*/

const ages = [15, 22, 18, 30, 12, 25];

// filter を使って、20歳以上の年齢だけを抽出
const adults = /* ここにコードを書く */;

console.log(adults); // [22, 30, 25]



/*
問題5: findを使って要素を検索
*/

const users = [
  { name: '太郎', age: 25 },
  { name: '花子', age: 30 },
  { name: '次郎', age: 22 },
];

// find を使って、年齢が30のユーザーを見つける
const user30 = /* ここにコードを書く */;

console.log(user30); // { name: '花子', age: 30 }



/*
問題6: カスタムコールバック関数を持つ関数を作成
*/

// 配列と変換関数を受け取り、各要素を変換した新しい配列を返す関数 transform を作成

function transform(arr, callback) {
  // ここにコードを書く
}

const nums = [1, 2, 3, 4, 5];

const squared = transform(nums, (n) => n * n);
console.log(squared); // [1, 4, 9, 16, 25]

const strings = transform(nums, (n) => `数字: ${n}`);
console.log(strings); // ['数字: 1', '数字: 2', ...]



/*
問題7: フィルタリング関数を作成
*/

// 配列と条件関数を受け取り、条件を満たす要素だけを返す関数 filterArray を作成

function filterArray(arr, callback) {
  // ここにコードを書く
}

const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = filterArray(numbers2, (n) => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const greaterThanFive = filterArray(numbers2, (n) => n > 5);
console.log(greaterThanFive); // [6, 7, 8, 9, 10]



/*
問題8: reduceを使って合計を計算
*/

const prices = [100, 200, 300, 400, 500];

// reduce を使って合計金額を計算
const total = /* ここにコードを書く */;

console.log(total); // 1500



/*
問題9: 実践問題 - 配列操作の組み合わせ
*/

const products = [
  { name: 'りんご', price: 100, inStock: true },
  { name: 'バナナ', price: 80, inStock: false },
  { name: 'オレンジ', price: 120, inStock: true },
  { name: 'ぶどう', price: 200, inStock: true },
];

// 在庫がある商品の価格の合計を計算
// ヒント: filter と reduce を組み合わせる

const totalInStock = /* ここにコードを書く */;

console.log(totalInStock); // 420



/*
問題10: 実践問題 - ソート
*/

const students = [
  { name: '太郎', score: 85 },
  { name: '花子', score: 92 },
  { name: '次郎', score: 78 },
  { name: '美咲', score: 95 },
];

// sort を使って、スコアの高い順に並び替え
// ヒント: sort((a, b) => b.score - a.score)

const sortedStudents = /* ここにコードを書く */;

console.log(sortedStudents);
// [{ name: '美咲', score: 95 }, { name: '花子', score: 92 }, ...]
