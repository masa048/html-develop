# html 開発環境

html 開発環境のテンプレート

## 開発環境構築手順

1. node.js インストール（バージョンは.node-version を参照）
2. コマンド`npm i`を実行
3. コマンド`npm run dev:vite`を実行
4. Live Server を起動（vs code の画面右下`Port:5555`を押下）

## フォルダ構成

- src : バンドル前の css(scss) と js ファイル
- dist : サーバの web ルートに相当するフォルダ
- dist/08hs : 制作物のフォルダ
- dist/08hs/assets : バンドル後のファイル格納フォルダ。build 時に全消去されるため基本的にこの中のファイルは手動で更新しない。

## VS Code 拡張機能

以下の 4 つを有効にしてください。ワークスペース推奨設定としています。

- EditorConfig for VS Code
- ESLint
- Prettier - Code formatter
- Live Server

## 保存時コード自動整形

`.vscode/settings.json`にてファイル保存時にコード自動整形する設定にしています。  
一時的に OFF にしたい場合は`"editor.formatOnSave": false,`にしてください。
