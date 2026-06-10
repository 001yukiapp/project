const STORAGE_KEY = "project-control-mini-v2";
const DATA_VERSION = 5;

function task(id, title, note = "", priority = "mid") {
  return { id, title, note, status: "todo", priority, due: "" };
}

const defaultState = {
  dataVersion: DATA_VERSION,
  selectedProjectId: "p-photo",
  filter: "all",
  memo: "",
  ideas: [],
  projects: [
    {
      id: "p-photo",
      name: "写真図鑑（みっけ図鑑）",
      status: "最優先 / 検証中",
      mission: "現実世界で見つけた生き物をスマホで撮影し、自分だけの図鑑に追加していく収集型SNS/ネイティブアプリを作る。最初はAI APIを使わず、ユーザーがカテゴリを選ぶ方式でAPIコスト0円で検証する。Gotchaは参考事例として分析しつつ、丸パクリせず、日本の街歩き・猫・鳥・虫・地域チャレンジ文化と、集めた生き物が浮いて見える立体感のある「浮かぶコレクション図鑑」で差別化する。",
      nextAction: "Expoでネイティブアプリの画面モックを作り、写真撮影 → カテゴリ選択 → 図鑑カード保存 → チャレンジ投稿までの最小体験を作る。3D感/浮遊感はMVP後に段階導入し、まずは通常の写真保存と図鑑追加を優先する。",
      costLimit: "Apple Developer登録まではほぼ0円。AI APIは最初使わない。画像保存やログインもMVPでは最小限にして、必要になったらSupabase等を検討する。重い3D処理、本物の3Dモデル生成、AR配置はMVPではやらない。",
      link: "",
      tasks: [
        task("photo-p0-concept", "Phase 0: 写真図鑑の一言コンセプトを決める", "例「現実の生き物を見つけて、自分だけの図鑑を埋めるアプリ」", "high"),
        task("photo-p0-diff", "Phase 0: Gotchaの丸パクリにならない差別化を決める", "日本の街歩き、猫、鳥、虫、地域チャレンジ、SNS投稿、浮かぶコレクション図鑑に寄せる", "high"),
        task("photo-p0-category", "Phase 0: 最初の対象カテゴリを決める", "猫 / 犬 / 鳥 / 虫 / 爬虫類 / 両生類 / その他", "high"),
        task("photo-p0-name", "Phase 0: アプリ名候補を3〜5個出す", "みっけ図鑑、ねこみっけ、まちいきもの図鑑、いきものガチャ図鑑など", "mid"),
        task("photo-p0-target", "Phase 0: 最初のターゲットユーザーを決める", "女子高生/大学生、猫好き、散歩好き、親子、自然観察好きなど", "mid"),
        task("photo-p1-domestic", "Phase 1: 国内で近いアプリ/サービスを調べる", "動物図鑑、植物図鑑、写真投稿、ポケモンGO系、散歩アプリ", "high"),
        task("photo-p1-overseas", "Phase 1: 海外で近いアプリ/サービスを調べる", "Gotcha、iNaturalist、Seek、Pokémon GO系", "high"),
        task("photo-p1-sns", "Phase 1: X/TikTok/Instagramで動物写真が伸びている投稿を集める", "猫、鳥、虫、散歩、珍しい生き物、地域ネタ", "mid"),
        task("photo-p1-themes", "Phase 1: ユーザーが投稿したくなるテーマを20個出す", "今週の白猫、変な寝方の猫、雨の日のカエル、夕方のカラスなど", "mid"),
        task("photo-p1-collect", "Phase 1: 収集欲を刺激する要素を洗い出す", "図鑑埋め、レア度、バッジ、称号、連続発見、地域限定、期間限定", "mid"),
        task("photo-p1-location", "Phase 1: 位置情報の扱い方を決める", "詳細住所は出さず、市区町村や数km単位でぼかす", "high"),
        task("photo-p1-privacy", "Phase 1: プライバシー/安全リスクを洗い出す", "人の顔、車のナンバー、自宅特定、希少生物の位置情報、未成年利用", "high"),
        task("photo-gotcha-concept", "Phase 1.5: Gotchaのコンセプトを整理する", "現実世界の生き物をスマホで見つけて、図鑑/コレクションに追加していく体験を参考にする", "high"),
        task("photo-gotcha-flow", "Phase 1.5: Gotchaの主な体験フローを分解する", "発見 → 撮影/認識 → コレクション化 → 図鑑埋め → SNSで話題化、の流れを確認する", "high"),
        task("photo-gotcha-strong", "Phase 1.5: Gotchaの強そうな点を洗い出す", "収集欲、ポケモン的な図鑑埋め、現実世界との連動、SNS映え、誰でも参加できる分かりやすさ", "mid"),
        task("photo-gotcha-weak", "Phase 1.5: Gotchaの弱そうな点を仮説で洗い出す", "日本ローカライズ、地域性、猫/鳥/虫など日本の街歩き文脈、コミュニティ、チャレンジ性、プライバシー対応", "mid"),
        task("photo-gotcha-diff", "Phase 1.5: Gotchaと差別化するポイントを決める", "日本の街歩き、猫特化、週替わりチャレンジ、地域限定バッジ、SNS投稿テンプレ、親子/散歩/女子向けUI、浮遊感のあるコレクション演出", "high"),
        task("photo-gotcha-no-copy", "Phase 1.5: 絶対にコピーしない要素を明文化する", "名前、ロゴ、UI配置、文章、独自キャラクター、演出、ブランド表現は真似しない", "high"),
        task("photo-gotcha-abstract", "Phase 1.5: 参考にしてよい要素を明文化する", "現実の生き物を集める、図鑑を埋める、発見体験を楽しくする、チャレンジで投稿を促す、という抽象的な仕組み", "high"),
        task("photo-gotcha-market", "Phase 1.5: 日本版で先に取りにいく市場を決める", "まずは猫・鳥・虫・散歩・地域チャレンジ。広い動物図鑑ではなく、SNSで投稿されやすい身近な生き物から始める", "mid"),
        task("photo-gotcha-counter", "Phase 1.5: Gotchaが日本に来た場合の対抗策を考える", "日本語UI、地域イベント、猫チャレンジ、学校/親子/観光地向け、ローカルコミュニティで差別化", "mid"),
        task("photo-gotcha-mvp", "Phase 1.5: Gotchaより先に出すMVP範囲を決める", "AI高精度判定よりも、撮影→カテゴリ選択→図鑑追加→週間チャレンジ→共有を優先する", "high"),
        task("photo-gotcha-table", "Phase 1.5: Gotcha比較表を作る", "項目は、対象ユーザー、主な体験、対象生物、SNS性、AI依存度、収益化、地域性、差別化ポイント", "mid"),
        task("photo-gotcha-ui", "Phase 1.5: Gotcha風に見えすぎないUI方針を決める", "ポケモン風/海外アプリ風に寄せすぎず、日本の散歩・ガチャ・図鑑・チャレンジ感を出す", "high"),
        task("photo-gotcha-share", "Phase 1.5: Gotchaリサーチ結果をChatGPT連携テキストに出るようにする", "競合から学んだこと、真似しないこと、差別化方針が進捗共有に含まれるようにする", "mid"),
        task("photo-3d-direction", "Phase X: 3D感/浮遊感の方向性を言語化する", "「切り抜き図鑑」ではなく「浮かぶコレクション図鑑」。Gotchaは参考事例だが、こちらは立体感のある収集物体験を目指す", "high"),
        task("photo-3d-reference", "Phase X: 参考にする演出を整理する", "浮遊カード、パララックス、影、レイヤー分離、出現アニメーション", "mid"),
        task("photo-3d-no-copy", "Phase X: 参考にしない表現を整理する", "GotchaのUIやブランド表現を直接真似しない", "high"),
        task("photo-3d-priority", "Phase X: MVP後に追加する演出の優先順位を決める", "1.浮遊カード 2.レア度演出 3.出現演出 4.パララックス 5.展示棚UI", "mid"),
        task("photo-3d-card", "Phase X: 図鑑カードの3Dっぽい見せ方を考える", "生き物が背景から少し前に出ているように見せる", "mid"),
        task("photo-3d-rare", "Phase X: レア生物の特別演出を考える", "光、影、オーラ、きらめき、バッジ演出など", "mid"),
        task("photo-3d-found", "Phase X: 発見時アニメーションを考える", "撮影後に「みっけ！」→ 生き物がふわっと出現 → カード化", "mid"),
        task("photo-3d-gallery", "Phase X: 図鑑一覧ではなく“コレクション展示”の案を考える", "棚、カプセル、浮遊表示、カテゴリごとの展示感", "mid"),
        task("photo-3d-future", "Phase X: 将来的な本格3D化の条件を考える", "ユーザー反応が良い時だけ検討。本物の3Dモデル化は後回し", "mid"),
        task("photo-p2-screens", "Phase 2: MVPで絶対に必要な画面を決める", "ホーム / 撮影 / カテゴリ選択 / 図鑑一覧 / カード詳細 / チャレンジ", "high"),
        task("photo-p2-out", "Phase 2: MVPでやらない機能を決める", "AI高精度判定、AR、3Dモデル生成、重い3D処理、3Dモデル化、全国ランキング、課金、DM、フレンド", "high"),
        task("photo-p2-card", "Phase 2: 図鑑カードの項目を決める", "写真、カテゴリ、名前、レア度、日付、ざっくり場所、コメント、チャレンジ参加", "mid"),
        task("photo-p2-rare", "Phase 2: レア度ルールを仮決めする", "最初は手動/カテゴリ別固定でOK。C/B/A/Sなど", "mid"),
        task("photo-p2-challenge", "Phase 2: チャレンジ仕様を決める", "週替わりテーマ、投稿、投票、1位バッジ", "mid"),
        task("photo-p2-no-ai", "Phase 2: AIなしで成立する操作フローを書く", "撮影 → ユーザーがカテゴリ選択 → カード保存 → 図鑑に追加", "high"),
        task("photo-p2-ai-future", "Phase 2: 将来のAI導入方針を書く", "最初はAIなし。次にオンデバイスAI。詳細判定だけチケット制クラウドAI", "mid"),
        task("photo-p3-expo-prompt", "Phase 3: Expoプロジェクト作成用のプロンプトを作る", "", "mid"),
        task("photo-p3-home", "Phase 3: ホーム画面のモックを作る", "今日のみっけ、今週のチャレンジ、図鑑進捗", "mid"),
        task("photo-p3-camera", "Phase 3: 撮影画面のモックを作る", "カメラ起動、撮影ボタン、撮影後プレビュー", "mid"),
        task("photo-p3-category", "Phase 3: カテゴリ選択画面のモックを作る", "猫/犬/鳥/虫/爬虫類/両生類/その他", "mid"),
        task("photo-p3-list", "Phase 3: 図鑑一覧画面のモックを作る", "カード一覧、未発見枠、カテゴリフィルタ", "mid"),
        task("photo-p3-detail", "Phase 3: カード詳細画面のモックを作る", "写真、名前、レア度、日付、場所、コメント", "mid"),
        task("photo-p3-challenge", "Phase 3: チャレンジ画面のモックを作る", "今週のお題、投稿一覧、投票", "mid"),
        task("photo-p4-expo", "Phase 4: Expoでアプリ雛形を作る", "", "mid"),
        task("photo-p4-camera", "Phase 4: カメラ/画像選択の動作確認をする", "", "mid"),
        task("photo-p4-preview", "Phase 4: 撮った写真をアプリ内で表示する", "", "mid"),
        task("photo-p4-save-category", "Phase 4: カテゴリ選択を保存できるようにする", "", "mid"),
        task("photo-p4-save-card", "Phase 4: 図鑑カードをローカル保存する", "", "mid"),
        task("photo-p4-list-card", "Phase 4: 図鑑一覧にカードを表示する", "", "mid"),
        task("photo-p4-challenge", "Phase 4: チャレンジ投稿風の画面を作る", "", "mid"),
        task("photo-p4-chatgpt", "Phase 4: ChatGPTに進捗共有できるメモを残す", "", "mid"),
        task("photo-p5-test-friends", "Phase 5: 友達/知り合いに触ってもらう", "", "mid"),
        task("photo-p5-10people", "Phase 5: 10人に「撮って集めるのが楽しいか」を聞く", "", "mid"),
        task("photo-p5-photo-count", "Phase 5: 1週間で何枚撮られるかを見る", "", "mid"),
        task("photo-p5-category", "Phase 5: どのカテゴリが一番撮られるか見る", "", "mid"),
        task("photo-p5-challenge", "Phase 5: チャレンジのお題で投稿が増えるか見る", "", "mid"),
        task("photo-p5-no-ai", "Phase 5: AIなしでも遊べるか確認する", "", "mid"),
        task("photo-p5-boring", "Phase 5: つまらないポイントを洗い出す", "", "mid"),
        task("photo-p5-ui", "Phase 5: UIで迷う場所を直す", "", "mid"),
        task("photo-p6-x", "Phase 6: X用の紹介文を作る", "", "mid"),
        task("photo-p6-video", "Phase 6: TikTok/Instagram Reels向けの短い動画ネタを作る", "", "mid"),
        task("photo-p6-template", "Phase 6: 「今日のみっけ」投稿テンプレを作る", "", "mid"),
        task("photo-p6-cat", "Phase 6: 猫好きに刺さる投稿を作る", "", "mid"),
        task("photo-p6-local", "Phase 6: 地域ネタの投稿を作る", "", "mid"),
        task("photo-p6-weekly", "Phase 6: 週間チャレンジをSNSで告知する", "", "mid"),
        task("photo-p6-reflect", "Phase 6: 初期ユーザーの投稿をアプリ内に反映する方法を考える", "", "mid"),
        task("photo-p7-free-paid", "Phase 7: 無料版と有料版の差を決める", "保存数、限定バッジ、広告非表示、高精度判定、プロフィール装飾", "mid"),
        task("photo-p7-subscription", "Phase 7: 月額300〜500円で成立する特典を考える", "", "mid"),
        task("photo-p7-ticket", "Phase 7: 鑑定チケット制を検討する", "詳しい種類判定だけクラウドAIを使う", "mid"),
        task("photo-p7-limited", "Phase 7: 限定チャレンジ/限定バッジを考える", "", "mid"),
        task("photo-p7-collab", "Phase 7: 動物園/水族館/地域観光とのコラボ案を考える", "", "mid"),
        task("photo-p7-goods", "Phase 7: フォトブック/ステッカー/グッズ化を検討する", "", "mid"),
        task("photo-p7-ads", "Phase 7: 広告を入れるならどこに入れるか決める", "体験を壊さない場所だけ", "mid"),
        task("photo-p8-store", "Phase 8: App Store公開に必要なものをリスト化する", "", "mid"),
        task("photo-p8-privacy", "Phase 8: プライバシーポリシー草案を作る", "", "mid"),
        task("photo-p8-terms", "Phase 8: 利用規約草案を作る", "", "mid"),
        task("photo-p8-photo-location", "Phase 8: 位置情報/写真の取り扱い説明を書く", "", "mid"),
        task("photo-p8-screenshots", "Phase 8: スクリーンショットを用意する", "", "mid"),
        task("photo-p8-copy", "Phase 8: アプリ紹介文を作る", "", "mid"),
        task("photo-p8-testflight", "Phase 8: TestFlightでテストする", "", "mid"),
        task("photo-p8-freeze", "Phase 8: 初期リリースの機能を固定する", "", "mid"),
        task("photo-p9-retention", "Phase 9: 継続率を見る", "", "mid"),
        task("photo-p9-count", "Phase 9: 1人あたりの撮影枚数を見る", "", "mid"),
        task("photo-p9-challenge-rate", "Phase 9: チャレンジ参加率を見る", "", "mid"),
        task("photo-p9-share-rate", "Phase 9: SNS共有率を見る", "", "mid"),
        task("photo-p9-pay-click", "Phase 9: 課金導線のクリック率を見る", "", "mid"),
        task("photo-p9-popular", "Phase 9: 人気カテゴリを強化する", "", "mid"),
        task("photo-p9-remove", "Phase 9: 不人気機能を削る", "", "mid"),
        task("photo-p9-ai", "Phase 9: AI判定を入れるか判断する", "", "mid"),
        task("photo-v1-floating", "将来フェーズ: v1で浮遊カード演出を追加する", "本物の3Dではなく、CSS/React Nativeの影・レイヤー・軽いアニメーションで3Dっぽく見せる", "mid"),
        task("photo-v1-rare", "将来フェーズ: v1でレア度ごとの見た目差を追加する", "光、影、オーラ、きらめき、バッジなどで収集物っぽさを強める", "mid"),
        task("photo-v2-parallax", "将来フェーズ: v2でパララックス演出を検討する", "端末傾きやスクロールでカードに奥行きを出す。重くなるならやらない", "mid"),
        task("photo-v2-gallery", "将来フェーズ: v2でコレクション展示UIを検討する", "棚、カプセル、浮遊表示、カテゴリごとの展示感", "mid"),
        task("photo-v3-real-3d", "将来フェーズ: v3で本格3D化の必要性を判断する", "ユーザー反応と継続率が良い場合のみ検討。本物の3Dモデル自動生成は後回し", "mid")
      ]
    },
    {
      id: "p-toolnav",
      name: "工具ナビ（3DP含む）",
      status: "収益化候補 / リサーチ開始",
      mission: "車・DIY・整備・3Dプリント周辺で、「この作業にはどの工具が必要か」「代用品は何か」「3Dプリントで作れる治具はあるか」を調べられる工具ナビを作る。最初はアプリではなく、検索流入とアフィリエイト、3DPデータ販売、工具キット化まで狙える情報資産として始める。",
      nextAction: "車DIY/整備/3DPで困っている作業を50個リスト化し、それぞれに必要工具、代用品、危険ポイント、アフィリエイト候補、3DP化できる治具を整理する。",
      costLimit: "月0円スタート。最初はGitHub Pagesや静的サイト、スプレッドシート、記事化で検証。商品購入やサーバー課金は後回し。",
      link: "",
      tasks: [
        task("tool-p0-concept", "Phase 0: 工具ナビの一言コンセプトを決める", "例「作業名から必要工具・代用品・3DP治具・買うべき物がわかるナビ」", "high"),
        task("tool-p0-genre", "Phase 0: 対象ジャンルを決める", "車整備、バイク整備、3Dプリント治具、DIY工具、ガレージ用品", "high"),
        task("tool-p0-target", "Phase 0: 最初のターゲットを決める", "初心者DIY、車好き、3Dプリンタ持ち、工具を揃えたい人、旧車乗り", "mid"),
        task("tool-p0-3dp-scope", "Phase 0: 3DPをどこまで扱うか決める", "内装クリップ、位置決め治具、ホルダー、測定補助具、テンプレート、収納など", "mid"),
        task("tool-p0-3dp-ng", "Phase 0: 安全上扱わない3DP部品を決める", "ブレーキ、ステアリング、足回り、強度が必要な保安部品は基本NG/注意喚起", "high"),
        task("tool-p0-site-app", "Phase 0: 工具ナビをアプリにするかサイトにするか仮決めする", "最初は静的サイト/管理データでOK。反応があればPWA化", "mid"),
        task("tool-p1-categories", "Phase 1: 需要のある作業カテゴリを洗い出す", "オイル交換、ブレーキパッド、バッテリー、内装外し、電装、足回り、3DP補修", "high"),
        task("tool-p1-50-pains", "Phase 1: 車DIYでよく検索される困りごとを50個集める", "「工具 何が必要」「外れない」「サイズ」「トルク」「代用」「専用工具」", "high"),
        task("tool-p1-community", "Phase 1: みんカラ/X/YouTubeコメント/掲示板/知恵袋で困りごとを探す", "", "mid"),
        task("tool-p1-review", "Phase 1: Amazon/楽天/Yahoo等の商品レビューから不満を集める", "壊れる、サイズが合わない、安物買いの失敗、収納に困る", "mid"),
        task("tool-p1-3dp-30", "Phase 1: 3Dプリントで解決できそうな困りごとを30個集める", "クリップ、スペーサー、治具、ガイド、ケース、ホルダー、測定補助", "mid"),
        task("tool-p1-discontinued", "Phase 1: 廃盤部品と3DP代替の可能性を調べる", "ただし安全性/権利/強度に注意", "mid"),
        task("tool-p1-affiliate", "Phase 1: アフィリエイトで紹介しやすい商品カテゴリを洗い出す", "工具セット、トルクレンチ、ジャッキ、ウマ、内装剥がし、テスター、フィラメント", "mid"),
        task("tool-p1-price", "Phase 1: 単価が高い商品と買われやすい商品を分ける", "高単価=工具セット/ジャッキ、低単価=内装剥がし/クリップ/フィラメント等", "mid"),
        task("tool-p1-competitor", "Phase 1: 競合サイト/YouTube/ブログを調べる", "どこが弱いか、初心者に分かりにくい点を探す", "mid"),
        task("tool-p2-work-data", "Phase 2: 作業データの項目を決める", "作業名、難易度、必要工具、あると便利、消耗品、危険ポイント、想定時間", "high"),
        task("tool-p2-tool-data", "Phase 2: 工具データの項目を決める", "工具名、用途、サイズ、価格帯、代用品、失敗しやすい選び方、購入候補", "high"),
        task("tool-p2-3dp-data", "Phase 2: 3DPデータの項目を決める", "作れる物、用途、推奨素材、強度注意、印刷時間、STL有無、販売可否", "mid"),
        task("tool-p2-aff-data", "Phase 2: アフィリエイト管理項目を決める", "商品名、リンク、単価、想定CV、優先度、紹介記事", "mid"),
        task("tool-p2-safety", "Phase 2: 安全注意テンプレを作る", "ジャッキアップ、ブレーキ、電装、トルク管理、保安部品", "high"),
        task("tool-p2-search", "Phase 2: 工具ナビの検索カテゴリを決める", "作業から探す / 工具から探す / 3DPで作る / 初心者セット / 車種別", "mid"),
        task("tool-p3-work-50", "Phase 3: 作業50個のリストを作る", "", "high"),
        task("tool-p3-tool-100", "Phase 3: 工具100個のリストを作る", "", "high"),
        task("tool-p3-3dp-30", "Phase 3: 3DPで作れる候補30個のリストを作る", "", "mid"),
        task("tool-p3-beginner-set", "Phase 3: 初心者が最初に買うべき工具セットを作る", "", "mid"),
        task("tool-p3-safety-set", "Phase 3: 車整備の最低限安全セットを作る", "ジャッキ、ウマ、輪止め、手袋、保護メガネなど", "high"),
        task("tool-p3-material", "Phase 3: 3DP初心者向けの推奨素材を整理する", "PLA/PETG/ASA/PA系など。用途別に注意を書く", "mid"),
        task("tool-p3-3dp-ok-ng", "Phase 3: 3DPで作っていいもの/ダメなものリストを作る", "", "high"),
        task("tool-p3-title-20", "Phase 3: 最初の記事タイトルを20個作る", "", "mid"),
        task("tool-p3-card-30", "Phase 3: 最初の工具カードを30個作る", "", "mid"),
        task("tool-p4-static", "Phase 4: GitHub Pagesで動く静的な工具ナビページを作る", "", "mid"),
        task("tool-p4-search", "Phase 4: 作業名で検索できるようにする", "", "mid"),
        task("tool-p4-filter", "Phase 4: 工具カテゴリでフィルタできるようにする", "", "mid"),
        task("tool-p4-3dp-filter", "Phase 4: 3DP治具だけ絞り込めるようにする", "", "mid"),
        task("tool-p4-work-page", "Phase 4: 各作業ページに必要工具一覧を表示する", "", "mid"),
        task("tool-p4-tool-page", "Phase 4: 各工具ページに用途/選び方/注意/購入候補を表示する", "", "mid"),
        task("tool-p4-3dp-page", "Phase 4: 3DPページに推奨素材/注意点/印刷設定メモを表示する", "", "mid"),
        task("tool-p4-aff-dummy", "Phase 4: アフィリエイトリンクは最初ダミーでもOKにする", "", "mid"),
        task("tool-p4-json", "Phase 4: データをJSONで管理できるようにする", "", "mid"),
        task("tool-p4-chatgpt", "Phase 4: ChatGPTに渡せる進捗/商品リストを書き出せるようにする", "", "mid"),
        task("tool-p5-work-template", "Phase 5: 作業別の記事テンプレを作る", "結論、必要工具、代用品、手順概要、注意、購入候補、3DP候補", "mid"),
        task("tool-p5-tool-template", "Phase 5: 工具別の記事テンプレを作る", "何に使う、サイズの選び方、安物の注意、買うならどれ", "mid"),
        task("tool-p5-3dp-template", "Phase 5: 3DP治具の記事テンプレを作る", "何を解決する、素材、強度、印刷時間、STL、注意点", "mid"),
        task("tool-p5-10", "Phase 5: まず10記事分の構成を作る", "", "mid"),
        task("tool-p5-photo", "Phase 5: 写真が必要な記事をリスト化する", "", "mid"),
        task("tool-p5-own-photo", "Phase 5: 自分で撮れる写真とネット調査だけで書ける記事を分ける", "", "mid"),
        task("tool-p5-video", "Phase 5: YouTubeショート/TikTok用のネタに変換する", "", "mid"),
        task("tool-p5-x", "Phase 5: X投稿用の短文に変換する", "", "mid"),
        task("tool-p6-seo", "Phase 6: SEO向けキーワードを整理する", "「作業名 + 工具」「車種 + 工具」「3Dプリント + 治具」「代用」", "mid"),
        task("tool-p6-x-30", "Phase 6: Xで毎日投稿するネタを30個作る", "", "mid"),
        task("tool-p6-short-10", "Phase 6: YouTube Shorts/TikTok用に工具ネタを10個作る", "", "mid"),
        task("tool-p6-before-after", "Phase 6: 3DP作品のBefore/After投稿を作る", "", "mid"),
        task("tool-p6-failure", "Phase 6: 失敗談コンテンツを作る", "安物工具で失敗、サイズ違い、3DP素材選びミス", "mid"),
        task("tool-p6-weekly", "Phase 6: 検索流入用の記事を週1本出す計画を作る", "", "mid"),
        task("tool-p6-route", "Phase 6: SNSから工具ナビに飛ばす導線を作る", "", "mid"),
        task("tool-p6-search-console", "Phase 6: Google Search Consoleなど計測の準備をする", "", "mid"),
        task("tool-p7-aff-candidates", "Phase 7: アフィリエイト候補を洗い出す", "Amazon、楽天、Yahoo、工具専門店、3DP用品など。利用条件は最新情報を確認", "mid"),
        task("tool-p7-products-20", "Phase 7: まず紹介しやすい商品を20個選ぶ", "", "mid"),
        task("tool-p7-price-split", "Phase 7: 高単価工具と低単価消耗品を分ける", "", "mid"),
        task("tool-p7-beginner-page", "Phase 7: 「初心者工具セット」ページを作る", "", "mid"),
        task("tool-p7-3dp-starter", "Phase 7: 「3DPスターターセット」ページを作る", "", "mid"),
        task("tool-p7-shopping-list", "Phase 7: 「作業別買い物リスト」ページを作る", "", "mid"),
        task("tool-p7-stl", "Phase 7: 3DP STLデータ販売を検討する", "BOOTH、note、Gumroad等。利用条件は最新情報を確認", "mid"),
        task("tool-p7-product", "Phase 7: 3DP完成品販売を検討する", "小物、治具、ホルダー、収納。強度部品は避ける", "mid"),
        task("tool-p7-kit", "Phase 7: 工具キット化を検討する", "作業別セット、初心者セット、内装剥がしセットなど", "mid"),
        task("tool-p7-pdf", "Phase 7: 有料PDF/チェックリスト販売を検討する", "初心者工具リスト、作業前チェックリスト、3DP素材選び表", "mid"),
        task("tool-p7-sponsor", "Phase 7: スポンサー枠を検討する", "工具メーカー、3DPフィラメント、ショップ", "mid"),
        task("tool-p7-revenue", "Phase 7: 収益管理表を作る", "記事、リンク、クリック、売上、CV、改善メモ", "mid"),
        task("tool-p8-maintenance-note", "Phase 8: 整備情報の注意書きを作る", "作業は自己責任、重要保安部品は専門家へ、トルク値は整備書確認", "high"),
        task("tool-p8-3dp-note", "Phase 8: 3DP部品の注意書きを作る", "強度/耐熱/耐候/層間剥離/経年劣化に注意", "high"),
        task("tool-p8-aff-note", "Phase 8: アフィリエイト表記を入れる", "", "mid"),
        task("tool-p8-trademark", "Phase 8: 画像/メーカー名/商標の扱いを確認する", "", "mid"),
        task("tool-p8-compatible", "Phase 8: 互換部品や代替品の表現に注意する", "", "mid"),
        task("tool-p8-correction", "Phase 8: 誤情報を直す更新フローを作る", "", "mid"),
        task("tool-p8-source", "Phase 8: 参考元をメモできる欄を作る", "", "mid"),
        task("tool-p9-click", "Phase 9: クリック率を見る", "", "mid"),
        task("tool-p9-sales", "Phase 9: どの記事から売れているか見る", "", "mid"),
        task("tool-p9-rewrite", "Phase 9: 売れない記事を修正する", "", "mid"),
        task("tool-p9-keyword", "Phase 9: 検索キーワードを見て記事を追加する", "", "mid"),
        task("tool-p9-category", "Phase 9: よく見られる作業カテゴリを強化する", "", "mid"),
        task("tool-p9-3dp-demand", "Phase 9: 3DPデータの需要を見る", "", "mid"),
        task("tool-p9-sns", "Phase 9: SNSで反応が良いネタを記事化する", "", "mid"),
        task("tool-p9-pwa", "Phase 9: アプリ化/PWA化する価値があるか判断する", "", "mid"),
        task("tool-p9-revenue-goal", "Phase 9: 月1万円、月3万円、月10万円の収益目標に分けて改善する", "", "mid")
      ]
    },
    {
      id: "p-carapp",
      name: "車アプリ開発",
      status: "整理中",
      mission: "アライメント、メンテ記録、バネレート/固有振動数など、実際にアプリとして作る車系プロダクトを管理する。",
      nextAction: "工具ナビと混ざらないように境界を決め、最初に作る車アプリを1つに絞る",
      costLimit: "追加サーバーなし。PWA/ローカル保存で検証",
      link: "",
      tasks: [
        task("carapp-boundary", "工具ナビと車アプリ開発の境界を明文化する", "工具ナビ = 情報資産/検索流入/アフィリエイト/3DP販売寄り。車アプリ開発 = 測定・記録・計算などのアプリ本体寄り", "high"),
        task("carapp-alignment", "アライメントアプリ案を別タスクに分ける", "測定、記録、比較、調整メモなど", "mid"),
        task("carapp-maintenance", "メンテ記録アプリ案を別タスクに分ける", "整備履歴、距離、費用、次回交換目安など", "mid"),
        task("carapp-spring", "バネレート/固有振動数アプリ案を別タスクに分ける", "計算、測定、車両設定メモなど", "mid"),
        task("carapp-first-one", "最初に作る車アプリを1つに絞る", "作りやすさ × 欲しい人の強さ × 課金可能性で判断する", "high")
      ]
    },
    {
      id: "p-affiliate",
      name: "車アフィリエイト/廃盤部品",
      status: "収益化候補",
      mission: "廃盤部品・困ってる部品情報を集めて、検索流入/アフィリエイト/販売につなげる",
      nextAction: "需要がありそうな廃盤部品を20個リスト化する",
      costLimit: "月0円。まずは調査と記事/投稿だけ",
      link: "",
      tasks: [
        task("affiliate-car-model", "対象車種を絞る", "S2000 / M2 / 旧車 / 国産スポーツなど", "high"),
        task("affiliate-discontinued-20", "廃盤で困ってる部品を20個集める", "ヤフオク、みんカラ、X、掲示板、ショップ情報", "high"),
        task("affiliate-products", "アフィリエイト候補を調べる", "工具、消耗品、3Dプリント素材。工具ナビとは混ぜず、廃盤部品文脈に寄せる", "mid"),
        task("affiliate-first-article", "1記事目の構成を作る", "例：S2000で廃盤になりやすい部品まとめ", "mid")
      ]
    }
  ]
};

let state = load();
let editingTaskId = null;
let editingIdeaId = null;
let ideaSaveMode = "close";

const $ = (id) => document.getElementById(id);

function makeId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return "id-" + Math.random().toString(36).slice(2) + Date.now();
}

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return normalizeState(structuredClone(defaultState));
    const parsed = JSON.parse(saved);
    const migrated = normalizeState(migrateState(parsed));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    return normalizeState(structuredClone(defaultState));
  }
}

function migrateState(savedState) {
  const base = structuredClone(defaultState);
  if (!savedState || typeof savedState !== "object") return base;

  const savedProjects = Array.isArray(savedState.projects) ? savedState.projects : [];
  const canonicalIds = new Set(base.projects.map(p => p.id));
  const usedSavedProjects = new Set();

  const aliases = {
    "p-photo": ["p-photo", "p-mikke"],
    "p-toolnav": ["p-toolnav"],
    "p-carapp": ["p-carapp"],
    "p-affiliate": ["p-affiliate"]
  };

  const migratedProjects = base.projects.map(defaultProject => {
    const candidates = aliases[defaultProject.id] || [defaultProject.id];
    const savedProject = savedProjects.find(p =>
      candidates.includes(p.id) ||
      (defaultProject.id === "p-photo" && /みっけ|写真図鑑/.test(p.name || "")) ||
      (defaultProject.id === "p-toolnav" && /工具ナビ/.test(p.name || ""))
    );

    if (!savedProject) return defaultProject;
    usedSavedProjects.add(savedProject);

    return {
      ...savedProject,
      id: defaultProject.id,
      name: defaultProject.name,
      status: defaultProject.status,
      mission: defaultProject.mission,
      nextAction: defaultProject.nextAction,
      costLimit: defaultProject.costLimit,
      link: savedProject.link || defaultProject.link,
      tasks: mergeTasks(defaultProject.tasks, savedProject.tasks || [])
    };
  });

  const customProjects = savedProjects
    .filter(p => !usedSavedProjects.has(p))
    .filter(p => !canonicalIds.has(p.id) && p.id !== "p-mikke")
    .map(p => ({ ...p, tasks: Array.isArray(p.tasks) ? p.tasks : [] }));

  const selectedProjectId = savedState.selectedProjectId === "p-mikke"
    ? "p-photo"
    : (migratedProjects.some(p => p.id === savedState.selectedProjectId) ? savedState.selectedProjectId : base.selectedProjectId);

  return {
    ...base,
    ...savedState,
    dataVersion: DATA_VERSION,
    selectedProjectId,
    projects: [...migratedProjects, ...customProjects],
    ideas: Array.isArray(savedState.ideas) ? savedState.ideas : []
  };
}

function mergeTasks(defaultTasks, savedTasks) {
  const savedById = new Map(savedTasks.filter(t => t?.id).map(t => [t.id, t]));
  const savedByTitle = new Map(savedTasks.filter(t => t?.title).map(t => [t.title, t]));
  const usedSavedTasks = new Set();

  const merged = defaultTasks.map(defaultTask => {
    const savedTask = savedById.get(defaultTask.id) || savedByTitle.get(defaultTask.title);
    if (savedTask) usedSavedTasks.add(savedTask);
    return {
      ...defaultTask,
      status: savedTask?.status || defaultTask.status,
      due: savedTask?.due || defaultTask.due,
      priority: savedTask?.priority || defaultTask.priority,
      note: defaultTask.note || savedTask?.note || ""
    };
  });

  const customTasks = savedTasks
    .filter(t => !usedSavedTasks.has(t))
    .filter(t => t?.title && !defaultTasks.some(d => d.id === t.id || d.title === t.title));

  return [...merged, ...customTasks];
}

function normalizeState(s) {
  const d = structuredClone(defaultState);
  const merged = { ...d, ...s };
  merged.dataVersion = DATA_VERSION;
  if (!Array.isArray(merged.projects)) merged.projects = d.projects;
  merged.projects.forEach(p => {
    p.id ||= makeId();
    p.name ||= "無題プロジェクト";
    p.status ||= "";
    p.mission ||= "";
    p.nextAction ||= "";
    p.costLimit ||= "";
    p.link ||= "";
    if (!Array.isArray(p.tasks)) p.tasks = [];
    p.tasks.forEach(t => {
      t.id ||= makeId();
      t.title ||= "無題タスク";
      t.status ||= "todo";
      t.priority ||= "mid";
      t.note ||= "";
      t.due ||= "";
    });
  });
  if (!Array.isArray(merged.ideas)) merged.ideas = [];
  merged.ideas.forEach(idea => {
    idea.id ||= makeId();
    idea.title ||= "無題アイデア";
    idea.note ||= "";
    idea.projectId ||= "uncategorized";
    idea.projectName = idea.projectId === "uncategorized"
      ? "未分類"
      : (merged.projects.find(p => p.id === idea.projectId)?.name || idea.projectName || "未分類");
    idea.priority ||= "mid";
    idea.status ||= "inbox";
    idea.createdAt ||= new Date().toISOString();
    idea.updatedAt ||= idea.createdAt;
  });
  return merged;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateChatGPTPayload();
}

function currentProject() {
  return state.projects.find(p => p.id === state.selectedProjectId) || state.projects[0];
}

function render() {
  if (!currentProject() && state.projects.length) state.selectedProjectId = state.projects[0].id;

  renderSummary();
  renderProgressBoard();
  renderTabs();
  renderProjectEditor();
  renderTasks();
  renderIdeas();

  $("globalMemo").value = state.memo || "";
  updateChatGPTPayload();
}

function allTasks() {
  return state.projects.flatMap(p => (p.tasks || []).map(t => ({...t, projectName: p.name})));
}

function renderSummary() {
  const tasks = allTasks();
  const active = tasks.filter(t => t.status !== "done").length;
  const done = tasks.filter(t => t.status === "done").length;
  const rate = tasks.length ? Math.round(done / tasks.length * 100) : 0;
  $("projectCount").textContent = state.projects.length;
  $("activeTaskCount").textContent = active;
  $("doneRate").textContent = rate + "%";
}

function projectRate(project) {
  const tasks = project.tasks || [];
  const done = tasks.filter(t => t.status === "done").length;
  return tasks.length ? Math.round(done / tasks.length * 100) : 0;
}

function renderProgressBoard() {
  const board = $("progressBoard");
  board.innerHTML = state.projects.map(project => {
    const rate = projectRate(project);
    const todoTasks = (project.tasks || []).slice(0, 8);
    return `
      <article class="progress-card">
        <div class="progress-title-row">
          <p class="progress-title">${escapeHtml(project.name)}</p>
          <span class="badge">${rate}%</span>
        </div>
        <p class="progress-sub">${escapeHtml(project.nextAction || project.mission || "")}</p>
        <div class="progressbar"><span style="width:${rate}%"></span></div>
        <div class="checklist">
          ${todoTasks.length ? todoTasks.map(t => `
            <label class="check-row ${t.status === "done" ? "done" : ""}">
              <input type="checkbox" ${t.status === "done" ? "checked" : ""} onchange="toggleTaskDone('${project.id}', '${t.id}', this.checked)" />
              <span>${escapeHtml(t.title)}</span>
            </label>
          `).join("") : `<p class="empty">タスクなし</p>`}
        </div>
      </article>
    `;
  }).join("");
}

window.toggleTaskDone = (projectId, taskId, checked) => {
  const project = state.projects.find(p => p.id === projectId);
  const task = project?.tasks?.find(t => t.id === taskId);
  if (!task) return;
  task.status = checked ? "done" : "todo";
  save();
  render();
};

function renderTabs() {
  const tabs = $("projectTabs");
  tabs.innerHTML = "";
  state.projects.forEach(project => {
    const btn = document.createElement("button");
    btn.className = "tab" + (project.id === state.selectedProjectId ? " active" : "");
    btn.textContent = project.name;
    btn.onclick = () => {
      state.selectedProjectId = project.id;
      save();
      render();
    };
    tabs.appendChild(btn);
  });
}

function renderProjectEditor() {
  const p = currentProject();
  const el = $("projectEditor");
  if (!p) {
    el.innerHTML = `<p class="empty">プロジェクトを追加して始めよう。</p>`;
    return;
  }

  el.innerHTML = `
    <div class="panel-head">
      <h2>現在のプロジェクト</h2>
      <span class="badge">${escapeHtml(p.status || "未設定")}</span>
    </div>

    <div class="field">
      <label>名前
        <input id="projectName" value="${escapeAttr(p.name)}" />
      </label>
    </div>

    <div class="grid2">
      <label>状態
        <input id="projectStatus" value="${escapeAttr(p.status || "")}" placeholder="検証中 / 開発中 / 保留" />
      </label>
      <label>リンク
        <input id="projectLink" value="${escapeAttr(p.link || "")}" placeholder="GitHubやメモのURL" />
      </label>
    </div>

    <div class="field">
      <label>目的
        <textarea id="projectMission">${escapeHtml(p.mission || "")}</textarea>
      </label>
    </div>

    <div class="field">
      <label>次の一手
        <textarea id="projectNextAction">${escapeHtml(p.nextAction || "")}</textarea>
      </label>
    </div>

    <div class="field">
      <label>コスト上限
        <input id="projectCostLimit" value="${escapeAttr(p.costLimit || "")}" placeholder="例：月0円、年99ドルまで" />
      </label>
    </div>

    <div class="project-actions">
      <button id="saveProjectBtn" class="primary">保存</button>
      <button id="openLinkBtn" class="ghost">リンクを開く</button>
      <button id="deleteProjectBtn" class="danger">削除</button>
    </div>
  `;

  $("saveProjectBtn").onclick = () => {
    p.name = $("projectName").value.trim() || "無題プロジェクト";
    p.status = $("projectStatus").value.trim();
    p.link = $("projectLink").value.trim();
    p.mission = $("projectMission").value.trim();
    p.nextAction = $("projectNextAction").value.trim();
    p.costLimit = $("projectCostLimit").value.trim();
    save();
    render();
  };

  $("openLinkBtn").onclick = () => {
    if (!p.link) return alert("リンクがまだ入ってない");
    window.open(p.link, "_blank", "noopener,noreferrer");
  };

  $("deleteProjectBtn").onclick = () => {
    if (state.projects.length <= 1) return alert("最低1つは残しておこう");
    if (!confirm(`「${p.name}」を削除する？`)) return;
    state.projects = state.projects.filter(x => x.id !== p.id);
    state.selectedProjectId = state.projects[0]?.id;
    save();
    render();
  };
}

function renderTasks() {
  const p = currentProject();
  const list = $("taskList");
  if (!p) return;

  const tasks = [...(p.tasks || [])]
    .filter(t => state.filter === "all" ? true : t.status === state.filter)
    .sort((a, b) => {
      const order = { doing: 0, todo: 1, done: 2 };
      const pr = { high: 0, mid: 1, low: 2 };
      return (order[a.status] ?? 9) - (order[b.status] ?? 9) || (pr[a.priority] ?? 9) - (pr[b.priority] ?? 9);
    });

  if (!tasks.length) {
    list.innerHTML = `<p class="empty">タスクなし。今やる1個だけ追加しよう。</p>`;
    return;
  }

  list.innerHTML = tasks.map(t => `
    <article class="task ${t.status === "done" ? "done" : ""}">
      <div class="task-top">
        <div>
          <p class="task-title">${escapeHtml(t.title)}</p>
          ${t.note ? `<p class="task-note">${escapeHtml(t.note)}</p>` : ""}
        </div>
      </div>
      <div class="badges">
        <span class="badge ${escapeAttr(t.priority)}">${priorityLabel(t.priority)}</span>
        <span class="badge">${statusLabel(t.status)}</span>
        ${t.due ? `<span class="badge">期限 ${escapeHtml(t.due)}</span>` : ""}
      </div>
      <div class="task-actions">
        <button onclick="setTaskStatus('${t.id}', 'todo')">未着手</button>
        <button onclick="setTaskStatus('${t.id}', 'doing')">作業中</button>
        <button onclick="setTaskStatus('${t.id}', 'done')">完了</button>
        <button onclick="editTask('${t.id}')" class="ghost">編集</button>
        <button onclick="deleteTask('${t.id}')" class="danger">削除</button>
      </div>
    </article>
  `).join("");
}

function renderIdeas() {
  const list = $("ideaList");
  if (!list) return;
  const ideas = [...(state.ideas || [])]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  if (!ideas.length) {
    list.innerHTML = `<p class="empty">まだアイデアなし。右下の「＋アイデア」から思いつきを入れよう。</p>`;
    return;
  }

  list.innerHTML = ideas.map(idea => `
    <article class="idea ${idea.status === "converted" ? "converted" : ""}">
      <p class="idea-title">${escapeHtml(idea.title)}</p>
      <div class="idea-meta">
        <span class="badge">${escapeHtml(projectNameForIdea(idea.projectId, idea.projectName))}</span>
        <span class="badge ${escapeAttr(idea.priority)}">${priorityLabel(idea.priority)}</span>
        <span class="badge">${idea.status === "converted" ? "タスク化済み" : "未タスク化"}</span>
        <span class="badge">${formatDateTime(idea.createdAt)}</span>
      </div>
      ${idea.note ? `<p class="idea-note">${escapeHtml(idea.note)}</p>` : ""}
      <div class="idea-actions">
        <button onclick="editIdea('${idea.id}')" class="ghost">編集</button>
        <button onclick="convertIdeaToTask('${idea.id}')" class="primary" ${idea.status === "converted" ? "disabled" : ""}>タスク化</button>
        <button onclick="deleteIdea('${idea.id}')" class="danger">削除</button>
      </div>
    </article>
  `).join("");
}

function openIdeaDialog(idea = null) {
  editingIdeaId = idea?.id || null;
  ideaSaveMode = "close";
  populateIdeaProjects(idea?.projectId || currentProject()?.id || "uncategorized");
  $("ideaDialogTitle").textContent = idea ? "アイデア編集" : "アイデア追加";
  $("ideaTitle").value = idea?.title || "";
  $("ideaNote").value = idea?.note || "";
  $("ideaPriority").value = idea?.priority || "mid";
  $("saveIdeaContinueBtn").style.display = idea ? "none" : "";
  $("ideaDialog").showModal();
  $("ideaTitle").focus();
}

function populateIdeaProjects(selectedId = "uncategorized") {
  const select = $("ideaProject");
  select.innerHTML = [
    ...state.projects.map(p => `<option value="${escapeAttr(p.id)}">${escapeHtml(p.name)}</option>`),
    `<option value="uncategorized">未分類</option>`
  ].join("");
  select.value = selectedId;
  if (!select.value) select.value = "uncategorized";
}

function projectNameForIdea(projectId, fallback = "") {
  if (projectId === "uncategorized") return "未分類";
  return state?.projects?.find(p => p.id === projectId)?.name || fallback || "未分類";
}

function saveIdea({ keepOpen = false } = {}) {
  const title = $("ideaTitle").value.trim();
  if (!title) return false;

  const now = new Date().toISOString();
  const projectId = $("ideaProject").value || "uncategorized";
  const data = {
    title,
    note: $("ideaNote").value.trim(),
    projectId,
    projectName: projectNameForIdea(projectId),
    priority: $("ideaPriority").value,
    updatedAt: now
  };

  if (editingIdeaId) {
    const idea = state.ideas.find(i => i.id === editingIdeaId);
    if (idea) Object.assign(idea, data);
  } else {
    state.ideas.push({
      id: makeId(),
      ...data,
      status: "inbox",
      createdAt: now
    });
  }

  save();
  render();
  showToast("保存しました");

  if (keepOpen && !editingIdeaId) {
    $("ideaTitle").value = "";
    $("ideaNote").value = "";
    $("ideaPriority").value = "mid";
    $("ideaTitle").focus();
  } else {
    $("ideaDialog").close();
  }
  return true;
}

window.editIdea = (id) => {
  const idea = state.ideas.find(i => i.id === id);
  if (idea) openIdeaDialog(idea);
};

window.deleteIdea = (id) => {
  const idea = state.ideas.find(i => i.id === id);
  if (!idea) return;
  if (!confirm(`「${idea.title}」を削除する？`)) return;
  state.ideas = state.ideas.filter(i => i.id !== id);
  save();
  render();
  showToast("削除しました");
};

window.convertIdeaToTask = (id) => {
  const idea = state.ideas.find(i => i.id === id);
  if (!idea || idea.status === "converted") return;

  let projectId = idea.projectId;
  if (projectId === "uncategorized" || !state.projects.some(p => p.id === projectId)) {
    projectId = chooseProjectForIdea();
    if (!projectId) return;
  }

  const project = state.projects.find(p => p.id === projectId);
  if (!project) return;

  project.tasks.push({
    id: makeId(),
    title: idea.title,
    note: idea.note,
    status: "todo",
    priority: idea.priority,
    due: ""
  });
  idea.status = "converted";
  idea.projectId = project.id;
  idea.projectName = project.name;
  idea.updatedAt = new Date().toISOString();
  state.selectedProjectId = project.id;
  save();
  render();
  showToast("タスク化しました");
};

function chooseProjectForIdea() {
  const lines = state.projects.map((p, index) => `${index + 1}: ${p.name}`).join("\n");
  const answer = prompt(`タスク化するプロジェクト番号を入力してください。\n${lines}`, "1");
  if (!answer) return "";
  const index = Number(answer) - 1;
  return state.projects[index]?.id || "";
}

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1700);
}

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function openTaskDialog(task = null) {
  editingTaskId = task?.id || null;
  $("taskDialogTitle").textContent = task ? "タスク編集" : "タスク追加";
  $("taskTitle").value = task?.title || "";
  $("taskNote").value = task?.note || "";
  $("taskStatus").value = task?.status || "todo";
  $("taskPriority").value = task?.priority || "high";
  $("taskDue").value = task?.due || "";
  $("taskDialog").showModal();
}

window.editTask = (id) => {
  const p = currentProject();
  const task = p.tasks.find(t => t.id === id);
  if (task) openTaskDialog(task);
};

window.deleteTask = (id) => {
  const p = currentProject();
  const task = p.tasks.find(t => t.id === id);
  if (!task) return;
  if (!confirm(`「${task.title}」を削除する？`)) return;
  p.tasks = p.tasks.filter(t => t.id !== id);
  save();
  render();
};

window.setTaskStatus = (id, status) => {
  const p = currentProject();
  const task = p.tasks.find(t => t.id === id);
  if (!task) return;
  task.status = status;
  save();
  render();
};

function addProject() {
  const name = prompt("プロジェクト名は？", "新規プロジェクト");
  if (!name) return;
  const project = {
    id: makeId(),
    name: name.trim(),
    status: "検証中",
    mission: "",
    nextAction: "",
    costLimit: "できるだけ0円",
    link: "",
    tasks: []
  };
  state.projects.push(project);
  state.selectedProjectId = project.id;
  save();
  render();
}

function makeChatGPTText() {
  const now = new Date();
  const lines = [];
  lines.push("【プロジェクト進捗共有】");
  lines.push(`更新日時: ${now.toLocaleString("ja-JP")}`);
  lines.push("");
  lines.push("この進捗を前提に、次に何をやるべきか判断して。終わっているものは完了扱い、未完了は次タスク候補として見て。");
  lines.push("");

  state.projects.forEach((p, index) => {
    const rate = projectRate(p);
    lines.push(`## ${index + 1}. ${p.name}（${p.status || "未設定"} / ${rate}%）`);
    if (p.mission) lines.push(`目的: ${p.mission}`);
    if (p.nextAction) lines.push(`次の一手: ${p.nextAction}`);
    if (p.costLimit) lines.push(`コスト上限: ${p.costLimit}`);
    if (p.link) lines.push(`リンク: ${p.link}`);
    lines.push("タスク:");
    (p.tasks || []).forEach(t => {
      const mark = t.status === "done" ? "x" : " ";
      const status = statusLabel(t.status);
      const priority = priorityLabel(t.priority).replace("優先度 ", "");
      const due = t.due ? ` / 期限:${t.due}` : "";
      lines.push(`- [${mark}] ${t.title}（${status} / 優先度:${priority}${due}）`);
      if (t.note) lines.push(`  メモ: ${t.note}`);
    });
    lines.push("");
  });

  const inboxIdeas = (state.ideas || []).filter(idea => idea.status !== "converted");
  if (inboxIdeas.length) {
    lines.push("## アイデア箱（未タスク化）");
    lines.push("次タスクにするべきアイデアを優先度とプロジェクト文脈で判断して。");
    inboxIdeas
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .forEach(idea => {
        const priority = priorityLabel(idea.priority).replace("優先度 ", "");
        lines.push(`- ${idea.title}（${projectNameForIdea(idea.projectId, idea.projectName)} / 優先度:${priority} / 作成:${formatDateTime(idea.createdAt)}）`);
        if (idea.note) lines.push(`  メモ: ${idea.note}`);
      });
    lines.push("");
  }

  if (state.memo) {
    lines.push("## 全体メモ");
    lines.push(state.memo);
  }

  return lines.join("\n");
}

function updateChatGPTPayload() {
  const el = $("chatgptPayload");
  if (el) el.value = makeChatGPTText();
}

async function copyPayload() {
  const text = makeChatGPTText();
  try {
    await navigator.clipboard.writeText(text);
    alert("コピーした。ChatGPTにそのまま貼ればOK。");
  } catch {
    const el = $("chatgptPayload");
    el.focus();
    el.select();
    document.execCommand("copy");
    alert("選択した。コピーできてなければ手動でコピーして。");
  }
}

function downloadProgressTxt() {
  const blob = new Blob([makeChatGPTText()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `project-progress-for-chatgpt-${new Date().toISOString().slice(0,10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function priorityLabel(v) {
  return ({ high: "優先度 高", mid: "優先度 中", low: "優先度 低" })[v] || "優先度";
}

function statusLabel(v) {
  return ({ todo: "未着手", doing: "作業中", done: "完了" })[v] || "未設定";
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(str = "") {
  return escapeHtml(str);
}

$("addProjectBtn").onclick = addProject;
$("addTaskBtn").onclick = () => openTaskDialog();
$("openIdeaBtn").onclick = () => openIdeaDialog();
$("quickIdeaBtn").onclick = () => openIdeaDialog();
$("copyForChatGPTBtn").onclick = copyPayload;
$("downloadProgressBtn").onclick = downloadProgressTxt;
$("selectPayloadBtn").onclick = () => {
  $("chatgptPayload").focus();
  $("chatgptPayload").select();
};

$("saveIdeaBtn").onclick = () => {
  ideaSaveMode = "close";
};

$("saveIdeaContinueBtn").onclick = () => {
  ideaSaveMode = "continue";
};

$("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const p = currentProject();
  const data = {
    title: $("taskTitle").value.trim(),
    note: $("taskNote").value.trim(),
    status: $("taskStatus").value,
    priority: $("taskPriority").value,
    due: $("taskDue").value
  };

  if (!data.title) return;

  if (editingTaskId) {
    const task = p.tasks.find(t => t.id === editingTaskId);
    Object.assign(task, data);
  } else {
    p.tasks.push({ id: makeId(), ...data });
  }

  save();
  $("taskDialog").close();
  render();
});

$("ideaForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.submitter?.value === "cancel") {
    $("ideaDialog").close();
    return;
  }
  saveIdea({ keepOpen: ideaSaveMode === "continue" });
});

document.querySelectorAll(".filter").forEach(btn => {
  btn.onclick = () => {
    state.filter = btn.dataset.filter;
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    save();
    renderTasks();
  };
});

$("globalMemo").addEventListener("input", () => {
  state.memo = $("globalMemo").value;
  save();
});

$("exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `project-control-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

$("importFile").onchange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const imported = JSON.parse(text);
    if (!Array.isArray(imported.projects)) throw new Error("bad file");
    state = normalizeState(migrateState(imported));
    save();
    render();
    alert("インポート完了");
  } catch {
    alert("読み込めないJSONです");
  }
};

$("resetBtn").onclick = () => {
  if (!confirm("初期データに戻す？今のデータは消えます。先にバックアップ推奨。")) return;
  state = normalizeState(structuredClone(defaultState));
  save();
  render();
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

render();
