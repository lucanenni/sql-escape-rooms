# SQL Escape Rooms

**▶ Gioca online: <https://lucanenni.github.io/sql-escape-rooms/>**

Escape room e giochi investigativi per **imparare SQL giocando**. Ogni stanza ha un piccolo database SQLite che gira interamente nel browser
([sql.js](https://github.com/sql-js/sql-js)): si scrivono query in un terminale, si trova il codice nascosto nei dati e si apre la porta.
Nessun server, nessun backend.

## Le storie

| Storia | Genere | Stanze |
|---|---|---|
| [`villa-nera/`](villa-nera/) – *Il Mistero di Villa Nera* | Gotico · escape room | 15 |
| [`caso-montefiori/`](caso-montefiori/) – *Il Caso Montefiori* | Giallo · investigazione | 15 |
| [`stazione-orione/`](stazione-orione/) – *Stazione Orione* | Fantascienza · escape room | 15 |
| [`tesoro-del-corvo/`](tesoro-del-corvo/) – *Il Tesoro di Capitan Corvo* | Pirati · avventura | 15 |

Ogni storia ha **3 livelli da 5 stanze** con difficoltà crescente:

1. **Query di base** – `SELECT`, `WHERE`, `ORDER BY`, `LIMIT/OFFSET`, `LIKE`, `IN`, `BETWEEN`, `NULL`
2. **Aggregazioni** – `COUNT`, `SUM`, `AVG`, `MIN/MAX`, `GROUP BY`, `HAVING`, `COUNT(DISTINCT)`
3. **Join** – `JOIN`, `LEFT JOIN`, self join, join su più tabelle

Ogni stanza ha 3 indizi progressivi; il cronometro e i progressi sono salvati nel browser (`localStorage`).
Molti dati contengono "trappole" volute (es. massimo singolo vs totale, `COUNT(*)` vs `COUNT(DISTINCT …)`).

## Giocare

Servono solo un browser e una connessione internet (il motore SQL è caricato da cdnjs). Da questa cartella:

```bash
python3 -m http.server 8000
```

poi apri <http://localhost:8000>: la pagina `index.html` è il catalogo delle storie.

## Struttura

```
index.html            catalogo delle storie (generato)
assets/               motore condiviso: app.js, hash.js (SHA-256), style.css
<storia>/index.html   pagina della storia (generata)
<storia>/rooms.js     stanze, dati e risposte come hash (generato)
dev/stories/*.src.js  SORGENTI in chiaro: testi, dati, soluzioni SQL e risposte
dev/build.js          genera i file sopra dai sorgenti
dev/test.js           verifica che ogni soluzione SQL produca la risposta attesa
```

Le risposte nei `rooms.js` sono hash SHA-256 salati (`storia:stanza:risposta`), quindi non si leggono dal sorgente della pagina.
Gli indizi e i dati restano visibili: non sono pensati per resistere a chi vuole barare.

## Creare o modificare una storia

```bash
npm install     # una volta sola (serve solo sql.js per i test)
npm test        # rigenera tutto e verifica le soluzioni
```

1. Copia una storia di `dev/stories/` e modifica `GAME` (titolo, tema, testi finali) e `LEVELS` (stanze).
   Ogni stanza ha `setup` (SQL del database), `soluzione` (query risolutiva, solo nei test) e `risposte` (valori accettati, già normalizzati: minuscolo e senza accenti).
2. Aggiungi lo slug a `STORIES` in `dev/build.js`.
3. Per un tema grafico nuovo, aggiungi un blocco `body.<tema>` in `assets/style.css` e indica `tema` in `GAME`.
4. Esegui `npm test`. Gli id delle stanze sono assegnati in automatico dall'ordine.

Non pubblicare la cartella `dev/` insieme al sito: contiene le soluzioni in chiaro.

## Licenza

[MIT](LICENSE)
