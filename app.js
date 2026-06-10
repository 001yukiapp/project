const STORAGE_KEY = "project-control-mini-v2";

const defaultState = {
  selectedProjectId: "p-mikke",
  filter: "all",
  memo: "",
  projects: [
    {
      id: "p-mikke",
      name: "みっけ図鑑",
      status: "最優先",
      mission: "現実の生き物を撮って、自分だけの図鑑を埋めるSNS/ネイティブアプリを作る",
      nextAction: "Expoで画面モック → 撮影 → 図鑑カード保存まで作る",
      costLimit: "Apple Developer登録まではほぼ0円。AI APIは最初使わない",
      link: "",
      tasks: [
        { id: makeId(), title: "アプリ名と世界観を仮決定", note: "みっけ図鑑 / ねこみっけ / まちいきもの図鑑", status: "todo", priority: "high", due: "" },
        { id: makeId(), title: "画面構成を決める", note: "ホーム / 撮影 / 図鑑 / チャレンジ / プロフィール", status: "todo", priority: "high", due: "" },
        { id: makeId(), title: "AIなしMVP仕様に固定", note: "ユーザーがカテゴリ選択。APIコスト0円で検証", status: "todo", priority: "high", due: "" },
        { id: makeId(), title: "Expoプロジェクト作成", note: "最初は見た目だけでOK", status: "todo", priority: "mid", due: "" },
        { id: makeId(), title: "図鑑カードの見た目を作る", note: "レア度 / 日付 / 場所ざっくり / コメント", status: "todo", priority: "mid", due: "" }
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
        { id: makeId(), title: "対象車種を絞る", note: "S2000 / M2 / 旧車 / 国産スポーツなど", status: "todo", priority: "high", due: "" },
        { id: makeId(), title: "廃盤で困ってる部品を20個集める", note: "ヤフオク、みんカラ、X、掲示板、ショップ情報", status: "todo", priority: "high", due: "" },
        { id: makeId(), title: "アフィリエイト候補を調べる", note: "工具、消耗品、代替部品、3Dプリント素材", status: "todo", priority: "mid", due: "" },
        { id: makeId(), title: "1記事目の構成を作る", note: "例：S2000で廃盤になりやすい部品まとめ", status: "todo", priority: "mid", due: "" }
      ]
    },
    {
      id: "p-carapp",
      name: "車アプリ開発",
      status: "整理中",
      mission: "アライメント、メンテ記録、バネ/固有振動数などの車系アプリを切り分ける",
      nextAction: "どれを最初に作るか1個に絞る",
      costLimit: "追加サーバーなし。PWA/ローカル保存で検証",
      link: "",
      tasks: [
        { id: makeId(), title: "候補機能を分ける", note: "アライメント / メンテ記録 / バネレート計算 / 固有振動数測定", status: "todo", priority: "high", due: "" },
        { id: makeId(), title: "一番売れそうな順に並べる", note: "作りやすさ × 欲しい人の強さ × 課金可能性", status: "todo", priority: "high", due: "" },
        { id: makeId(), title: "既存GitHubやメモのリンクを貼る", note: "探す時間を減らす", status: "todo", priority: "mid", due: "" },
        { id: makeId(), title: "1つだけMVP仕様を書く", note: "最初から全部入りにしない", status: "todo", priority: "mid", due: "" }
      ]
    }
  ]
};

let state = load();
let editingTaskId = null;

const $ = (id) => document.getElementById(id);

function makeId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return "id-" + Math.random().toString(36).slice(2) + Date.now();
}

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(defaultState);
    const parsed = JSON.parse(saved);
    return normalizeState(parsed);
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeState(s) {
  const d = structuredClone(defaultState);
  const merged = { ...d, ...s };
  if (!Array.isArray(merged.projects)) merged.projects = d.projects;
  merged.projects.forEach(p => {
    if (!Array.isArray(p.tasks)) p.tasks = [];
    p.tasks.forEach(t => {
      t.id ||= makeId();
      t.status ||= "todo";
      t.priority ||= "mid";
      t.note ||= "";
      t.due ||= "";
    });
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
$("copyForChatGPTBtn").onclick = copyPayload;
$("downloadProgressBtn").onclick = downloadProgressTxt;
$("selectPayloadBtn").onclick = () => {
  $("chatgptPayload").focus();
  $("chatgptPayload").select();
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
    state = normalizeState(imported);
    save();
    render();
    alert("インポート完了");
  } catch {
    alert("読み込めないJSONです");
  }
};

$("resetBtn").onclick = () => {
  if (!confirm("初期データに戻す？今のデータは消えます。先にバックアップ推奨。")) return;
  state = structuredClone(defaultState);
  save();
  render();
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

render();
