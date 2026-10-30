const SQLJS_BASE = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/";
const STORAGE_KEY = GAME.storageKey;
document.title = `${GAME.titolo} – Escape Room SQL`;
document.body.classList.add(GAME.tema);
const ROOMS = LEVELS.flatMap((l) => l.rooms.map((r) => ({ ...r, livello: l })));
const MAX_ROWS = 200;

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
document.querySelector("#logo").textContent = GAME.logo;
const normalize = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");

// ---- stato persistente ----
function freshState() { return { solved: [], hints: {}, startedAt: null, finishedAt: null }; }
function loadState() {
  try { return { ...freshState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; } catch { return freshState(); }
}
let state = loadState();
const saveState = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {} };

// ---- database ----
let SQL, db;
function openDb(room) {
  if (db) db.close();
  db = new SQL.Database();
  db.run(room.setup);
}
function schemaHtml() {
  const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")[0]?.values.flat() ?? [];
  return tables.map((t) => {
    const cols = db.exec(`PRAGMA table_info("${t}")`)[0].values;
    return `<button class="tname" data-table="${esc(t)}" title="Inserisci SELECT * FROM ${esc(t)}">${esc(t)}</button>
      <table>${cols.map((c) => `<tr><td>${esc(c[1])}</td><td>${esc(c[2] || "")}</td></tr>`).join("")}</table>`;
  }).join("");
}

// ---- timer ----
let timerId;
function startTimer() {
  clearInterval(timerId);
  const el = $("#timer");
  const tick = () => {
    if (!state.startedAt) { el.textContent = "00:00"; return; }
    const s = Math.floor(((state.finishedAt ?? Date.now()) - state.startedAt) / 1000);
    el.textContent = fmtTime(s);
  };
  tick();
  if (!state.finishedAt) timerId = setInterval(tick, 1000);
}
const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// ---- header ----
function renderHeader(current) {
  $("#steps").innerHTML = LEVELS.map((l) => `<span class="lvl" title="${esc(l.nome)}">L${l.id}</span>` + l.rooms.map((r) => {
    const done = state.solved.includes(r.id);
    const unlocked = r.id === 1 || state.solved.includes(r.id - 1);
    const cls = ["step", done && "done", r.id === current && "current", !unlocked && "locked"].filter(Boolean).join(" ");
    return `<a class="${cls}" href="#/room/${r.id}" title="${esc(r.nome)}">${done ? "✓" : r.id}</a>`;
  }).join("")).join('<span class="sep"></span>');
}

// ---- pagine ----
function renderHome() {
  renderHeader(0);
  const started = state.startedAt && !state.finishedAt;
  const next = ROOMS.find((r) => !state.solved.includes(r.id));
  $("#app").innerHTML = `
    <div class="center">
      <div class="tag">Escape room in SQL</div>
      <h1>${esc(GAME.titolo)}</h1>
      <p>${esc(GAME.premessa)} Attraversa ${LEVELS.length} livelli e ${ROOMS.length} stanze: in ognuna interroga il database con query SQL per trovare il codice che apre la porta.</p>
      <div class="levels-list">${LEVELS.map((l) => `<div class="card"><div class="tag">Livello ${l.id}</div><h2>${esc(l.nome)}</h2><div class="muted">${esc(l.concetti)}</div>
        <ul>${l.rooms.map((r) => `<li>${esc(r.nome)}</li>`).join("")}</ul></div>`).join("")}</div>
      <div class="row" style="justify-content:center">
        ${state.finishedAt
          ? `<a class="btn gold" href="#/end">Rivedi il finale</a>`
          : `<a class="btn gold" href="#/room/${next ? next.id : 1}" id="start">${started || state.solved.length ? "Continua" : esc(GAME.startLabel)}</a>`}
        ${state.startedAt ? `<button class="ghost" id="reset-all">Ricomincia da zero</button>` : ""}
      </div>
      <p class="muted" style="margin-top:32px"><a href="../index.html" style="color:var(--accent-2)">← Tutte le storie</a></p>
    </div>`;
  $("#start")?.addEventListener("click", () => {
    if (!state.startedAt) { state.startedAt = Date.now(); saveState(); startTimer(); }
  });
  $("#reset-all")?.addEventListener("click", () => {
    if (confirm("Cancellare tutti i progressi?")) { state = freshState(); saveState(); startTimer(); route(); }
  });
}

function renderRoom(id) {
  const room = ROOMS.find((r) => r.id === id);
  if (!room) return (location.hash = "#/");
  if (id > 1 && !state.solved.includes(id - 1)) return (location.hash = `#/room/${ROOMS.find((r) => !state.solved.includes(r.id)).id}`);
  if (!state.startedAt) { state.startedAt = Date.now(); saveState(); startTimer(); }
  openDb(room);
  renderHeader(id);

  const solved = state.solved.includes(id);
  const shown = state.hints[id] ?? 0;
  $("#app").innerHTML = `
    ${LEVELS.find((l) => l.rooms[0].id === id) ? `<div class="card level-banner"><div class="tag">Livello ${room.livello.id}</div><h2>${esc(room.livello.nome)}</h2><p>${esc(room.livello.intro)}</p><div class="muted">Concetti: ${esc(room.livello.concetti)}</div></div>` : ""}
    <div class="tag">Livello ${room.livello.id} · Stanza ${id} di ${ROOMS.length} · ${esc(room.concetti)}</div>
    <h1>${esc(room.nome)}</h1>
    <div class="layout">
      <div class="side">
        <div class="card">
          <div class="story">${room.storia}</div>
          <h2>Obiettivo</h2>
          <div>${room.obiettivo}</div>
        </div>
        <div class="card schema"><h2>Database</h2><div id="schema">${schemaHtml()}</div></div>
        <div class="card">
          <h2>Indizi</h2>
          <div id="hints">${room.indizi.slice(0, shown).map((h, i) => `<div class="hint"><b>${i + 1}.</b> ${h}</div>`).join("")}</div>
          <button class="ghost" id="hint-btn" ${shown >= room.indizi.length ? "disabled" : ""}>Mostra indizio (${shown}/${room.indizi.length})</button>
        </div>
      </div>
      <div class="card">
        <h2>Terminale SQL</h2>
        <textarea class="sql" id="sql" spellcheck="false" autocomplete="off" placeholder="SELECT * FROM ...;"></textarea>
        <div class="row">
          <button id="run">▶ Esegui</button>
          <button class="ghost" id="reset-db" title="Ripristina i dati originali">Ripristina database</button>
          <span class="kbd">Ctrl/⌘ + Invio</span>
        </div>
        <div class="results" id="results"></div>
        <div class="lock">
          <input class="answer" id="answer" placeholder="${esc(room.placeholder)}" autocomplete="off" ${solved ? "disabled" : ""}>
          <button class="gold" id="unlock" ${solved ? "disabled" : ""}>🔒 Apri la porta</button>
        </div>
        <div class="feedback ${solved ? "ok" : ""}" id="feedback">${solved ? "Porta già aperta!" : ""}</div>
        ${solved ? `<a class="btn gold" href="${id < ROOMS.length ? `#/room/${id + 1}` : "#/end"}">Avanti →</a>` : ""}
      </div>
    </div>`;

  const sqlEl = $("#sql");
  sqlEl.focus();
  $("#schema").addEventListener("click", (e) => {
    const t = e.target.closest("[data-table]")?.dataset.table;
    if (t) { sqlEl.value = `SELECT * FROM ${t};`; runQuery(); }
  });
  $("#run").addEventListener("click", runQuery);
  sqlEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); runQuery(); }
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart: s, selectionEnd: en } = sqlEl;
      sqlEl.setRangeText("  ", s, en, "end");
    }
  });
  $("#reset-db").addEventListener("click", () => {
    openDb(room); $("#schema").innerHTML = schemaHtml();
    $("#results").innerHTML = `<div class="msg info">Database ripristinato.</div>`;
  });
  $("#hint-btn").addEventListener("click", () => {
    const n = (state.hints[id] ?? 0) + 1;
    state.hints[id] = n; saveState();
    $("#hints").insertAdjacentHTML("beforeend", `<div class="hint"><b>${n}.</b> ${room.indizi[n - 1]}</div>`);
    $("#hint-btn").textContent = `Mostra indizio (${n}/${room.indizi.length})`;
    if (n >= room.indizi.length) $("#hint-btn").disabled = true;
  });
  const tryUnlock = () => {
    const given = normalize($("#answer").value);
    const fb = $("#feedback");
    if (!given) return;
    if (room.risposte.includes(sha256(`${GAME.id}:${id}:${given}`))) {
      if (!state.solved.includes(id)) state.solved.push(id);
      if (state.solved.length === ROOMS.length) state.finishedAt = Date.now();
      saveState(); startTimer();
      fb.className = "feedback ok";
      fb.textContent = "🔓 Click! La porta si apre...";
      setTimeout(() => (location.hash = id < ROOMS.length ? `#/room/${id + 1}` : "#/end"), 900);
    } else {
      fb.className = "feedback err";
      fb.textContent = "Il lucchetto non si muove. Riprova.";
      const el = $("#answer"); el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake");
    }
  };
  $("#unlock").addEventListener("click", tryUnlock);
  $("#answer").addEventListener("keydown", (e) => e.key === "Enter" && tryUnlock());
}

function runQuery() {
  const out = $("#results");
  const sql = $("#sql").value.trim();
  if (!sql) { out.innerHTML = `<div class="msg info">Scrivi una query SQL.</div>`; return; }
  try {
    const sets = db.exec(sql);
    const changes = db.getRowsModified();
    if (!sets.length) {
      out.innerHTML = `<div class="msg info">Query eseguita${changes ? ` (${changes} righe modificate)` : ""}. Nessun risultato da mostrare.</div>`;
    } else {
      out.innerHTML = sets.map(({ columns, values }) => `
        <table><thead><tr>${columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
        <tbody>${values.slice(0, MAX_ROWS).map((r) => `<tr>${r.map((v) => v === null ? `<td class="null">NULL</td>` : `<td>${esc(v)}</td>`).join("")}</tr>`).join("")}</tbody></table>
        <div class="msg info">${values.length} righe${values.length > MAX_ROWS ? ` (mostrate le prime ${MAX_ROWS})` : ""}</div>`).join("");
    }
    $("#schema").innerHTML = schemaHtml();
  } catch (e) {
    out.innerHTML = `<div class="msg err">Errore SQL: ${esc(e.message)}</div>`;
  }
}

function renderEnd() {
  if (state.solved.length < ROOMS.length) return (location.hash = "#/");
  renderHeader(0);
  const hints = Object.values(state.hints).reduce((a, b) => a + b, 0);
  $("#app").innerHTML = `
    <div class="center">
      <div class="tag">${esc(GAME.fine.tag)}</div>
      <h1>${esc(GAME.fine.titolo)}</h1>
      <p>${esc(GAME.fine.testo)}</p>
      <div class="stats">
        <div><b>${fmtTime(Math.floor((state.finishedAt - state.startedAt) / 1000))}</b>tempo</div>
        <div><b>${hints}</b>indizi usati</div>
      </div>
      <button class="gold" id="again">Gioca di nuovo</button>
    </div>`;
  $("#again").addEventListener("click", () => { state = freshState(); saveState(); startTimer(); location.hash = "#/"; });
}

function route() {
  const m = location.hash.match(/^#\/room\/(\d+)/);
  if (m) renderRoom(Number(m[1]));
  else if (location.hash === "#/end") renderEnd();
  else renderHome();
  window.scrollTo(0, 0);
}

(async function init() {
  try {
    SQL = await initSqlJs({ locateFile: (f) => SQLJS_BASE + f });
  } catch (e) {
    $("#app").innerHTML = `<div class="center"><h1>Errore</h1><p>Impossibile caricare il motore SQL (serve connessione a internet): ${esc(e.message)}</p></div>`;
    return;
  }
  startTimer();
  window.addEventListener("hashchange", route);
  route();
})();
