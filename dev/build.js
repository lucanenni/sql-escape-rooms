// Genera, a partire da dev/stories/*.src.js:
//  - <slug>/rooms.js   (risposte come hash SHA-256 salato "gioco:stanza:risposta", soluzioni rimosse)
//  - <slug>/index.html (pagina della storia)
//  - index.html        (catalogo delle storie)
const fs = require("fs");
const path = require("path");
const sha256 = require("../assets/hash.js");

const ROOT = path.join(__dirname, "..");
const STORIES = ["villa-nera", "caso-montefiori", "stazione-orione", "tesoro-del-corvo"];
const load = (slug) => require(`./stories/${slug}.src.js`);

const normalize = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
const hashAnswer = (gameId, roomId, ans) => sha256(`${gameId}:${roomId}:${normalize(ans)}`);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function buildLevels({ GAME, LEVELS }) {
  return LEVELS.map((l) => ({
    ...l,
    rooms: l.rooms.map(({ soluzione, risposte, ...r }) => ({ ...r, risposte: risposte.map((a) => hashAnswer(GAME.id, r.id, a)) })),
  }));
}

const storyPage = (GAME) => `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(GAME.titolo)} – Escape Room SQL</title>
  <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
  <header>
    <a class="logo" href="#/" id="logo"></a>
    <span id="timer">00:00</span>
    <nav class="steps" id="steps"></nav>
  </header>
  <main id="app"><div class="center"><p>Caricamento del motore SQL…</p></div></main>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js"></script>
  <script src="../assets/hash.js"></script>
  <script src="rooms.js"></script>
  <script src="../assets/app.js"></script>
</body>
</html>
`;

function catalogPage(defs) {
  const cards = defs.map(({ GAME, LEVELS }) => {
    const n = LEVELS.reduce((t, l) => t + l.rooms.length, 0);
    return `      <a class="card story-card" href="${GAME.slug}/" data-key="${esc(GAME.storageKey)}" data-total="${n}">
        <div class="tag">${esc(GAME.genere)}</div>
        <h2>${esc(GAME.titolo)}</h2>
        <p>${esc(GAME.descrizione)}</p>
        <div class="muted">${LEVELS.length} livelli · ${n} stanze</div>
        <div class="spacer"></div>
        <div class="progress"><i></i></div>
        <div class="muted progress-label">Non iniziata</div>
      </a>`;
  }).join("\n");
  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SQL Escape Rooms</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <header><a class="logo" href="./">🧩 SQL ESCAPE ROOMS</a></header>
  <main>
    <div class="center" style="margin-bottom:0">
      <div class="tag">Impara SQL giocando</div>
      <h1>Scegli la tua storia</h1>
      <p>Ogni stanza ha un piccolo database SQLite che gira nel tuo browser. Scrivi le query, trova il codice, apri la porta.
      Tre livelli per storia: query di base, aggregazioni, join.</p>
    </div>
    <div class="catalog">
${cards}
    </div>
  </main>
  <script>
    document.querySelectorAll(".story-card").forEach((a) => {
      try {
        const s = JSON.parse(localStorage.getItem(a.dataset.key));
        const done = s && s.solved ? s.solved.length : 0;
        const total = Number(a.dataset.total);
        if (done) {
          a.querySelector(".progress > i").style.width = (100 * done / total) + "%";
          a.querySelector(".progress-label").textContent = done === total ? "Completata ✓" : done + " / " + total + " stanze";
        }
      } catch (e) {}
    });
  </script>
</body>
</html>
`;
}

if (require.main === module) {
  const defs = STORIES.map(load);
  for (const def of defs) {
    const { GAME } = def;
    const levels = buildLevels(def);
    fs.mkdirSync(path.join(ROOT, GAME.slug), { recursive: true });
    fs.writeFileSync(
      path.join(ROOT, GAME.slug, "rooms.js"),
      "// FILE GENERATO da dev/build.js — non modificare a mano.\n" +
        "const GAME = " + JSON.stringify(GAME, null, 1) + ";\n" +
        "const LEVELS = " + JSON.stringify(levels, null, 1) + ";\n"
    );
    fs.writeFileSync(path.join(ROOT, GAME.slug, "index.html"), storyPage(GAME));
    console.log(`${GAME.slug}/ generato: ${levels.reduce((n, l) => n + l.rooms.length, 0)} stanze`);
  }
  fs.writeFileSync(path.join(ROOT, "index.html"), catalogPage(defs));
  console.log("index.html (catalogo) generato");
}
module.exports = { STORIES, load, normalize, hashAnswer };
