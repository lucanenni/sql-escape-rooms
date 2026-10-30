// Verifica: soluzioni SQL -> risposte attese, hash di sha256 e coerenza dei rooms.js generati.
const crypto = require("crypto");
const fs = require("fs");
const vm = require("vm");
const initSqlJs = require("sql.js");
const sha256 = require("../assets/hash.js");
const { STORIES, load, normalize, hashAnswer } = require("./build.js");

let fail = 0;
const check = (ok, msg) => { console.log(`${ok ? "OK  " : "FAIL"} ${msg}`); if (!ok) fail++; };

(async () => {
  for (const s of ["", "abc", "Perché è così? ✓", "x".repeat(200)])
    check(sha256(s) === crypto.createHash("sha256").update(s).digest("hex"), `sha256 ${JSON.stringify(s.slice(0, 12))}`);

  const SQL = await initSqlJs();
  for (const slug of STORIES) {
    const { GAME, LEVELS } = load(slug);
    check(GAME.id === slug && GAME.slug === slug && fs.existsSync(__dirname + `/../${slug}/index.html`), `${slug} metadati e pagina`);
    const built = vm.runInNewContext(fs.readFileSync(__dirname + `/../${slug}/rooms.js`, "utf8") + ";LEVELS");
    const builtRooms = built.flatMap((l) => l.rooms);
    const rooms = LEVELS.flatMap((l) => l.rooms);
    console.log(`--- ${GAME.id}: ${rooms.length} stanze`);
    for (const r of rooms) {
      const db = new SQL.Database();
      db.run(r.setup);
      const rows = db.exec(r.soluzione)[0]?.values ?? [];
      const got = rows.map((x) => normalize(String(x[0])));
      check(rows.length === 1 && r.risposte.some((a) => got[0].endsWith(normalize(a))), `${GAME.id} ${r.id} ${r.nome}: ${JSON.stringify(got)}`);
      const b = builtRooms.find((x) => x.id === r.id);
      const hashes = r.risposte.map((a) => hashAnswer(GAME.id, r.id, a));
      check(b && JSON.stringify(b.risposte) === JSON.stringify(hashes) && !("soluzione" in b), `${GAME.id} ${r.id} rooms generato aggiornato`);
    }
  }
  process.exit(fail ? 1 : 0);
})();
