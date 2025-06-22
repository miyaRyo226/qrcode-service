# WIFIのQRコードを簡単に作ってくれるやつです。

1. ssidとssidのパスワードを入力します。
2. 作成ボタンをクリックします。
3. 下にQRコードが表示されるのでスクショしたりして読み込みます。

以上で終わりです！！

## 技術スタック

### フロントエンド
- **Next.js** (v15.3.3) - React フレームワーク
- **React** (v19.1.0) - UI ライブラリ
- **TypeScript** (v5.8.3) - 型安全な JavaScript
- **qrcode.react** (v4.2.0) - QRコード生成ライブラリ
- **React Icons** (v5.5.0) - アイコンライブラリ
- **CSS Modules** - スタイリング

### 国際化
- **@formatjs/intl-localematcher** (v0.6.1) - ロケール選択
- **negotiator** (v1.0.0) - HTTP ネゴシエーション
- **Zod** (v3.25.67) - スキーマ検証（i18n ファイル用）

### PWA・サービスワーカー
- **next-pwa** (v5.6.0) - PWA 対応

### 開発ツール
- **Biome** (v1.9.4) - リンター・フォーマッター
- **Lefthook** (v1.11.13) - Git フック管理
- **tsx** (v4.20.3) - TypeScript 実行環境

### インフラ・開発環境
- **Node.js** (v22.x) - ランタイム
- **Docker** - コンテナ化
- **Dev Container** - 開発環境の標準化

### サポート言語
- 日本語 (ja)
- 英語 (en)