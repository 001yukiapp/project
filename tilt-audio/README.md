# Tilt Audio PWA

iPhone実機で、画面を見ずに目標角へ近づける音UIを検証するための静的PWAです。既存アプリへ組み込む前の単独検証用です。

## 表示バージョン

v004

## GitHub Pages URL

https://001yukiapp.github.io/project/tilt-audio/

CSSとJavaScriptは `index.html` 内に収め、manifest、Service Worker、アイコンは相対パスで参照しています。

## 起動

GitHub PagesのHTTPS URLをiPhone Safariで開きます。必要に応じて共有メニューからホーム画面に追加します。iOSのモーションセンサー権限は「センサーと音を開始」のタップ中に要求されます。

ローカル確認では次のように配信できます。

```powershell
cd C:\Users\doiyu\project
python -m http.server 8080
```

その場合は `http://localhost:8080/tilt-audio/` を開きます。

## 操作

1. `beta` または `gamma` を選びます。初期値は左右傾きの `gamma` です。
2. 「センサーと音を開始」を押します。
3. 任意の姿勢で「現在角を0°に設定」を押します。
4. 目標角と許容差を入力します。
5. 傾けて音の変化を確認します。
6. 「停止」でセンサー監視と音を止めます。

## 音とフィルタ

誤差は `filteredRelativeAngle - targetAngle` です。マイナス側は450Hz、プラス側は1050Hzの短いビープを鳴らします。ビープ間隔は `sqrt(abs(error) / FAR_ERROR_DEG)` で変化させ、近傍100msから遠方700msまで連続的に広げています。線形より目標近くの変化が分かりやすいため、この初期値にしています。

平滑化は角度差を正規化してから指数移動平均します。`SMOOTHING_ALPHA = 0.34` で、瞬間ノイズは抑えつつ反応の遅れを小さめにしています。

目標内は進入側を許容差、退出側を `許容差 + max(0.18deg, 許容差の35%)` にしてヒステリシスを持たせています。目標内に300msとどまると連続音へ切り替わります。

## 調整箇所

音程、ビープ長、間隔、許容差、保持時間、センサータイムアウト、平滑化係数は [index.html](./index.html) 内の `CONFIG` にまとめています。Service Workerを更新するときは [sw.js](./sw.js) の `CACHE_NAME` を変更してください。

## 制約

実機のモーションセンサーはHTTPSまたはホーム画面追加版で確認してください。PCブラウザではシミュレーションモードで音判定のみ確認できます。


