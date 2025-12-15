# 🛠️ 技術スタック

## 概要

このプロジェクトで使用する技術スタックとツールについてまとめています。

---

## 1. 言語

### JavaScript
- **バージョン**: ES2022+ (ES13+)
- **用途**: Part 1 の学習教材
- **特徴**:
  - 動的型付け言語
  - ブラウザとNode.jsで実行可能
  - プロトタイプベースのオブジェクト指向

### TypeScript
- **バージョン**: 5.x（最新安定版）
- **用途**: Part 2, Part 3 の学習教材
- **特徴**:
  - JavaScript のスーパーセット
  - 静的型付けによる型安全性
  - コンパイル時のエラー検出

---

## 2. ランタイム環境

### Node.js
- **推奨バージョン**: v18.x LTS 以上（v20.x LTS 推奨）
- **用途**: JavaScript/TypeScript の実行環境
- **インストール方法**:

```bash
# Homebrew（macOS）
brew install node

# nvm（バージョン管理推奨）
nvm install 20
nvm use 20

# 直接ダウンロード
# https://nodejs.org/ からダウンロード
```

### npm
- **バージョン**: Node.js に同梱（v9.x 以上）
- **用途**: パッケージ管理
- **代替**: yarn, pnpm

---

## 3. 開発ツール

### コードエディタ

#### Visual Studio Code（推奨）
- **ダウンロード**: https://code.visualstudio.com/
- **推奨拡張機能**:

| 拡張機能 | 用途 |
|---------|------|
| ESLint | JavaScript/TypeScript のリンター |
| Prettier | コードフォーマッター |
| TypeScript Importer | 自動インポート |
| Error Lens | インラインエラー表示 |
| Code Runner | コード実行 |
| Japanese Language Pack | 日本語化 |

#### 設定ファイル（.vscode/settings.json）
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

---

## 4. パッケージ・ライブラリ

### package.json
```json
{
  "name": "js-practice",
  "version": "1.0.0",
  "description": "JavaScript/TypeScript 学習教材",
  "type": "module",
  "scripts": {
    "start": "node",
    "ts": "ts-node",
    "build": "tsc",
    "lint": "eslint . --ext .js,.ts",
    "format": "prettier --write \"**/*.{js,ts,json,md}\""
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "ts-node": "^10.9.0",
    "@types/node": "^20.10.0",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.13.0",
    "@typescript-eslint/parser": "^6.13.0",
    "prettier": "^3.1.0"
  }
}
```

### 各パッケージの役割

| パッケージ | 役割 |
|-----------|------|
| typescript | TypeScript コンパイラ |
| ts-node | TypeScript の直接実行 |
| @types/node | Node.js の型定義 |
| eslint | コード品質チェック |
| @typescript-eslint/* | TypeScript 用 ESLint プラグイン |
| prettier | コードフォーマット |

---

## 5. TypeScript 設定

### tsconfig.json
```json
{
  "compilerOptions": {
    // 基本設定
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    
    // 出力設定
    "outDir": "./dist",
    "rootDir": "./",
    
    // 厳格な型チェック
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    
    // 追加チェック
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    
    // その他
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": [
    "part2-typescript-basics/**/*.ts",
    "part3-typescript-advanced/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### 設定オプションの解説

| オプション | 説明 |
|-----------|------|
| target | コンパイル後の JavaScript バージョン |
| module | モジュールシステム |
| strict | 厳格モード（すべての厳格チェックを有効化） |
| noImplicitAny | 暗黙の any を禁止 |
| strictNullChecks | null/undefined の厳格チェック |
| noUnusedLocals | 未使用のローカル変数を禁止 |
| esModuleInterop | CommonJS/ESModule の相互運用 |

---

## 6. リンター・フォーマッター設定

### ESLint（.eslintrc.json）
```json
{
  "env": {
    "node": true,
    "es2022": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-console": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### Prettier（.prettierrc）
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## 7. Git 設定

### .gitignore
```
# 依存関係
node_modules/

# ビルド出力
dist/
*.js.map

# 環境ファイル
.env
.env.local

# エディタ
.vscode/
!.vscode/settings.json
!.vscode/extensions.json
.idea/

# OS
.DS_Store
Thumbs.db

# ログ
*.log
npm-debug.log*
```

---

## 8. 実行コマンド一覧

### JavaScript
```bash
# JavaScript ファイルを実行
node ファイル名.js

# ES Modules として実行
node --experimental-specifier-resolution=node ファイル名.js
```

### TypeScript
```bash
# ts-node で直接実行
npx ts-node ファイル名.ts

# コンパイルしてから実行
npx tsc ファイル名.ts
node ファイル名.js

# プロジェクト全体をコンパイル
npx tsc

# ウォッチモード（変更を監視）
npx tsc --watch
```

### リント・フォーマット
```bash
# ESLint でチェック
npm run lint

# Prettier でフォーマット
npm run format
```

---

## 9. 推奨開発フロー

```
1. コードを書く
     ↓
2. 保存時に自動フォーマット（Prettier）
     ↓
3. ESLint でエラーチェック
     ↓
4. TypeScript コンパイル
     ↓
5. 実行・テスト
     ↓
6. Git コミット
```

---

## 10. バージョン互換性マトリックス

| Node.js | TypeScript | ESLint | 備考 |
|---------|------------|--------|------|
| v18.x | 5.0+ | 8.x | LTS（推奨） |
| v20.x | 5.0+ | 8.x | 最新 LTS |
| v21.x | 5.0+ | 8.x | Current |

---

## 参考リンク

- [Node.js 公式](https://nodejs.org/)
- [TypeScript 公式](https://www.typescriptlang.org/)
- [ESLint 公式](https://eslint.org/)
- [Prettier 公式](https://prettier.io/)
- [MDN Web Docs](https://developer.mozilla.org/ja/)
