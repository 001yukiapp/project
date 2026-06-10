# Project Control Mini v2

3つのプロジェクトをダーッと見て、チェックした進捗をChatGPTに共有しやすくする軽量PWAです。

## 初期プロジェクト

1. みっけ図鑑
2. 車アフィリエイト/廃盤部品
3. 車アプリ開発

## できること

- 全プロジェクトの進捗を1画面で確認
- チェックボックスでタスク完了
- プロジェクトごとの目的、次の一手、コスト上限、リンク管理
- タスク追加・編集・削除
- JSONバックアップ / インポート
- ChatGPT共有用テキストの自動生成
- 進捗TXT保存
- localStorage保存
- PWA対応

## 使い方

`index.html` をブラウザで開けば動きます。

GitHub Pagesで公開した場合は、次のURLでアクセスできます。

```text
https://001yukiapp.github.io/project/
```

「ChatGPT連携」のコピーを押して、このチャットに貼ると、ChatGPTが現在の進捗を前提に次の判断をできます。

## GitHub Pagesで公開する手順

1. GitHubのリポジトリ `001yukiapp/project` を開く
2. `Settings` → `Pages` を開く
3. `Build and deployment` の `Source` を `Deploy from a branch` にする
4. `Branch` を `main`、フォルダを `/ (root)` にする
5. `Save` を押す
6. 数分後に `https://001yukiapp.github.io/project/` を開いて確認する

## ファイル構成

```text
index.html
styles.css
app.js
manifest.webmanifest
icon.svg
sw.js
README.md
```

アプリ本体はリポジトリ直下で動く構成です。CSS、JavaScript、manifest、Service Workerは相対パスで参照しているため、GitHub Pagesの `/project/` 配下でも動く想定です。

## データ保存について

データはブラウザの `localStorage` に保存されます。サーバーや外部APIには送信しません。

ブラウザを変えたり、別端末で開いたりすると保存データは共有されません。必要な場合は、JSONバックアップを書き出してから別環境でインポートしてください。

## 注意

完全自動でChatGPTへ送信はしません。データはブラウザ内に保存されます。
