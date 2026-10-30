// SORGENTE in chiaro del gioco "Il Caso Montefiori". Non pubblicare la cartella dev/.
// Caso: l'antiquario Ettore Montefiori è stato ucciso alle 23:40 del 12/10/2026 nel suo negozio. Il colpevole è Davide Costa.
const GAME = {
  id: "caso-montefiori",
  slug: "caso-montefiori",
  genere: "Giallo · Investigazione",
  descrizione: "Un antiquario è stato ucciso nel suo negozio. Interroga prove, tabulati e archivi di polizia per smascherare il colpevole.",
  titolo: "Il Caso Montefiori",
  logo: "🔍 CASO MONTEFIORI",
  tema: "noir",
  storageKey: "sql-escape-room-giallo-v1",
  premessa:
    "Sei l'ispettore Rinaldi. L'antiquario Ettore Montefiori è stato trovato morto nel suo negozio la mattina del 13 ottobre. " +
    "Il commissario ti ha chiuso nell'archivio della questura: la porta si apre solo se risolvi il caso.",
  startLabel: "Apri il fascicolo",
  fine: {
    tag: "Caso chiuso",
    titolo: "🔓 Davide Costa è il colpevole!",
    testo:
      "Il socio di Montefiori, sfruttando l'accesso al negozio, aveva spento la telecamera d'ingresso, si era procurato un alibi falso e " +
      "ha lasciato tracce ovunque. Con le tue query hai ricostruito tutto: la porta dell'archivio si apre e il commissario ti stringe la mano.",
  },
};

const LEVELS = [
  {
    id: 1,
    nome: "La Scena del Crimine",
    concetti: "SELECT · WHERE · ORDER BY · LIMIT/OFFSET · LIKE · IN · BETWEEN · NULL",
    intro:
      "Via Aurora 12, Antichità Montefiori. Il corpo è stato portato via ma la bottega è piena di indizi. Raccogli e filtra le prove con le query di base.",
    rooms: [
      {
        nome: "Il Negozio",
        concetti: "SELECT · WHERE · AND",
        storia:
          "Il negozio è sottosopra. Il vice-ispettore ti consegna l'inventario aggiornato: alcuni pezzi risultano spariti. " +
          "«Un ladro da quattro soldi si porta via una tabacchiera. Se il movente è il furto, manca qualcosa di molto più prezioso».",
        obiettivo:
          "Trova l'oggetto <b>mancante</b> (<code>stato = 'mancante'</code>) con un <b>valore superiore a 5000</b> euro. Il suo nome è il codice.",
        indizi: [
          "Guarda la tabella con <code>SELECT * FROM inventario;</code>.",
          "Filtra lo stato: <code>WHERE stato = 'mancante'</code>.",
          "Aggiungi la soglia di valore con <code>AND valore &gt; 5000</code>.",
        ],
        risposte: ["breguet", "orologio breguet"],
        placeholder: "Oggetto rubato",
        soluzione: "SELECT oggetto FROM inventario WHERE stato='mancante' AND valore>5000",
        setup: `
          CREATE TABLE inventario (id INTEGER PRIMARY KEY, oggetto TEXT, categoria TEXT, valore INTEGER, stato TEXT);
          INSERT INTO inventario VALUES
            (1,'Vaso Ming','ceramica',12000,'presente'),
            (2,'Orologio Breguet','orologeria',18500,'mancante'),
            (3,'Specchio veneziano','arredo',3200,'presente'),
            (4,'Tabacchiera d''argento','argenteria',450,'mancante'),
            (5,'Statuina in bronzo','scultura',2800,'mancante'),
            (6,'Violino Guarneri','strumenti',25000,'presente'),
            (7,'Candeliere','argenteria',300,'presente'),
            (8,'Tappeto persiano','arredo',6500,'presente');`,
      },
      {
        nome: "Il Medico Legale",
        concetti: "ORDER BY · LIMIT",
        storia:
          "Il medico legale ti consegna quattro stime dell'ora del decesso, ottenute con metodi diversi. " +
          "«Non sono tutte affidabili allo stesso modo: ogni stima ha un indice di attendibilità. Fidati della migliore».",
        obiettivo:
          "Trova l'<b>ora stimata del decesso</b> (<code>orario_stimato</code>) con l'<b>attendibilità più alta</b>. Il codice è l'orario nel formato <code>HH:MM</code>.",
        indizi: [
          "Guarda tutte le stime: <code>SELECT * FROM rilievi;</code>.",
          "Ordina per attendibilità decrescente: <code>ORDER BY attendibilita DESC</code>.",
          "Prendi solo la prima riga con <code>LIMIT 1</code>.",
        ],
        risposte: ["23:40"],
        placeholder: "Orario (HH:MM)",
        soluzione: "SELECT orario_stimato FROM rilievi ORDER BY attendibilita DESC LIMIT 1",
        setup: `
          CREATE TABLE rilievi (id INTEGER PRIMARY KEY, metodo TEXT, orario_stimato TEXT, attendibilita INTEGER);
          INSERT INTO rilievi VALUES
            (1,'Temperatura corporea','23:40',90),
            (2,'Rigor mortis','22:30',60),
            (3,'Livor mortis','00:20',55),
            (4,'Contenuto gastrico','22:50',40);`,
      },
      {
        nome: "Le Impronte nel Retrobottega",
        concetti: "LIKE · IN · AND",
        storia:
          "Nel retrobottega, accanto alla porta sul vicolo, la scientifica ha rilevato diverse impronte di scarpa. " +
          "«Cerco quella lasciata nel fango rosso, trovata nel retrobottega, rilevata in modo chiaro: ci dice la misura dell'assassino».",
        obiettivo:
          "Trova la <b>misura</b> della scarpa: descrizione che <b>contiene «fango»</b>, luogo <b>retrobottega</b> e qualità <b>alta o ottima</b>.",
        indizi: [
          "Cerca una parola nel testo con <code>descrizione LIKE '%fango%'</code>.",
          "Per accettare più valori: <code>qualita IN ('alta', 'ottima')</code>.",
          "Metti tutto insieme con <code>AND</code> e aggiungi <code>luogo = 'retrobottega'</code>.",
        ],
        risposte: ["43"],
        placeholder: "Misura scarpa",
        soluzione: "SELECT misura FROM tracce WHERE descrizione LIKE '%fango%' AND luogo='retrobottega' AND qualita IN ('alta','ottima')",
        setup: `
          CREATE TABLE tracce (id INTEGER PRIMARY KEY, tipo TEXT, descrizione TEXT, luogo TEXT, qualita TEXT, misura INTEGER);
          INSERT INTO tracce VALUES
            (1,'impronta','scarpa con fango rosso','retrobottega','alta',43),
            (2,'impronta','scarpa con fango rosso','retrobottega','scarsa',41),
            (3,'impronta','scarpa pulita','ingresso','ottima',44),
            (4,'impronta','scarpa con fango rosso','vicolo','ottima',40),
            (5,'impronta','guanto di lattice','retrobottega','alta',9),
            (6,'impronta','scarpa con fango scuro','retrobottega','media',42);`,
      },
      {
        nome: "Le Testimonianze",
        concetti: "BETWEEN · <> · AND",
        storia:
          "I vicini hanno visto una macchina nel vicolo dietro il negozio. «Ma attento: la signora Conti vede complotti ovunque, " +
          "non la considero attendibile. E la macchina che cerchi è passata poco prima di mezzanotte».",
        obiettivo:
          "Trova la <b>targa</b> avvistata nel <b>vicolo</b> tra le <b>23:30 e le 23:59</b> (estremi inclusi) da un testimone <b>diverso da Livia Conti</b>.",
        indizi: [
          "Guarda i dati con <code>SELECT * FROM avvistamenti;</code>. Le ore sono testo nel formato HH:MM.",
          "Per un intervallo: <code>ora BETWEEN '23:30' AND '23:59'</code>.",
          "Escludi la signora con <code>testimone &lt;&gt; 'Livia Conti'</code> e aggiungi <code>luogo = 'vicolo'</code>.",
        ],
        risposte: ["gh482kl"],
        placeholder: "Targa",
        soluzione: "SELECT targa FROM avvistamenti WHERE luogo='vicolo' AND ora BETWEEN '23:30' AND '23:59' AND testimone<>'Livia Conti'",
        setup: `
          CREATE TABLE avvistamenti (id INTEGER PRIMARY KEY, testimone TEXT, ora TEXT, luogo TEXT, targa TEXT);
          INSERT INTO avvistamenti VALUES
            (1,'Livia Conti','23:35','vicolo','XX111AA'),
            (2,'Mario Fabbri','22:50','vicolo','AB123CD'),
            (3,'Antonio Riva','23:42','vicolo','GH482KL'),
            (4,'Sonia Greco','23:50','piazza','ZZ999ZZ'),
            (5,'Mario Fabbri','00:10','vicolo','TT555TT');`,
      },
      {
        nome: "L'Archivio dei Precedenti",
        concetti: "ORDER BY · LIMIT/OFFSET · IS NOT NULL",
        storia:
          "In archivio trovi i precedenti penali dei sospettati. «Interessano solo i furti con una condanna accertata: " +
          "se la condanna è vuota il caso fu archiviato. Fra questi, mi serve il SECONDO più recente».",
        obiettivo:
          "Fra i precedenti per <b>furto</b> con <b>condanna nota</b> (<code>condanna_mesi</code> non <code>NULL</code>), trova il <b>secondo più recente</b>. " +
          "Il codice è il nome della persona.",
        indizi: [
          "Filtra: <code>WHERE reato = 'furto' AND condanna_mesi IS NOT NULL</code>.",
          "Ordina dal più recente: <code>ORDER BY anno DESC</code>.",
          "Salta il primo con <code>LIMIT 1 OFFSET 1</code>.",
        ],
        risposte: ["roberto sala", "sala"],
        placeholder: "Nome",
        soluzione: "SELECT nome FROM precedenti WHERE reato='furto' AND condanna_mesi IS NOT NULL ORDER BY anno DESC LIMIT 1 OFFSET 1",
        setup: `
          CREATE TABLE precedenti (id INTEGER PRIMARY KEY, nome TEXT, reato TEXT, anno INTEGER, condanna_mesi INTEGER);
          INSERT INTO precedenti VALUES
            (1,'Roberto Sala','furto',2019,12),
            (2,'Davide Costa','furto',2022,NULL),
            (3,'Paolo Gentile','furto',2021,8),
            (4,'Giulia Ferrara','furto',2015,6),
            (5,'Marta Bellini','truffa',2023,10),
            (6,'Roberto Sala','rissa',2024,3),
            (7,'Davide Costa','truffa',2020,NULL);`,
      },
    ],
  },
  {
    id: 2,
    nome: "Il Laboratorio",
    concetti: "COUNT · SUM · AVG · MIN/MAX · GROUP BY · HAVING",
    intro:
      "Le prove raccolte vanno analizzate. Messaggi, soldi, riprese e campioni: conta, somma, media e confronta per capire chi ha fatto cosa.",
    rooms: [
      {
        nome: "I Tabulati Telefonici",
        concetti: "COUNT · WHERE · GROUP BY · HAVING",
        storia:
          "Dal telefono della vittima sono stati estratti tutti i messaggi dell'ultima settimana. " +
          "«Qualcuno lo tempestava: più di dieci messaggi diretti a lui. Ma conta solo ciò che ha RICEVUTO Montefiori, non i messaggi che si scambiavano gli altri».",
        obiettivo:
          "Trova il <b>mittente</b> che ha inviato <b>più di 10 messaggi</b> a <b>Ettore Montefiori</b> (<code>destinatario = 'Ettore Montefiori'</code>).",
        indizi: [
          "Prima filtra i messaggi per destinatario con <code>WHERE destinatario = 'Ettore Montefiori'</code>.",
          "Raggruppa per mittente e conta: <code>GROUP BY mittente</code>, <code>COUNT(*)</code>.",
          "Filtra i gruppi con <code>HAVING COUNT(*) &gt; 10</code>.",
        ],
        risposte: ["ferrara", "giulia ferrara"],
        placeholder: "Mittente",
        soluzione: "SELECT mittente FROM messaggi WHERE destinatario='Ettore Montefiori' GROUP BY mittente HAVING COUNT(*)>10",
        setup: (() => {
          const gruppi = [
            ["Giulia Ferrara", "Ettore Montefiori", 12],
            ["Davide Costa", "Ettore Montefiori", 4],
            ["Roberto Sala", "Ettore Montefiori", 2],
            ["Paolo Gentile", "Ettore Montefiori", 7],
            ["Paolo Gentile", "Marta Bellini", 8],
          ];
          let id = 0;
          const righe = [];
          for (const [m, d, n] of gruppi)
            for (let i = 0; i < n; i++) { id++; righe.push(`(${id},'${m}','${d}','2026-10-${String(6 + (id % 7)).padStart(2, "0")}')`); }
          return `CREATE TABLE messaggi (id INTEGER PRIMARY KEY, mittente TEXT, destinatario TEXT, giorno TEXT);
                  INSERT INTO messaggi VALUES ${righe.join(",")};`;
        })(),
      },
      {
        nome: "Le Telecamere",
        concetti: "MAX · GROUP BY · ORDER BY",
        storia:
          "Il negozio ha 4 telecamere, ognuna registra un fotogramma ogni quarto d'ora. Una si è fermata troppo presto: qualcuno l'ha spenta. " +
          "«Chi sa quando si è fermata ogni camera, sa dov'è entrato l'assassino».",
        obiettivo:
          "Per ogni telecamera calcola l'<b>ultimo fotogramma</b> (<code>MAX(ora)</code>). Trova la telecamera il cui ultimo fotogramma è il <b>più antico</b>.",
        indizi: [
          "Raggruppa per telecamera: <code>SELECT telecamera, MAX(ora) FROM fotogrammi GROUP BY telecamera;</code>",
          "Confronta gli ultimi fotogrammi: chi smette per primo ha il valore più basso.",
          "<code>ORDER BY MAX(ora) ASC LIMIT 1</code> ti dà la telecamera.",
        ],
        risposte: ["ingresso"],
        placeholder: "Telecamera",
        soluzione: "SELECT telecamera FROM fotogrammi GROUP BY telecamera ORDER BY MAX(ora) ASC LIMIT 1",
        setup: (() => {
          const orari = (fine) => {
            const out = [];
            for (let m = 22 * 60; m <= fine; m += 15) out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
            return out;
          };
          const camere = { Ingresso: 23 * 60 + 15, Retro: 23 * 60 + 45, Vicolo: 23 * 60 + 45, Cassa: 23 * 60 + 30 };
          let id = 0;
          const righe = [];
          for (const [c, fine] of Object.entries(camere)) for (const o of orari(fine)) righe.push(`(${++id},'${c}','${o}')`);
          righe.push(`(${++id},'Retro','23:59')`);
          return `CREATE TABLE fotogrammi (id INTEGER PRIMARY KEY, telecamera TEXT, ora TEXT);
                  INSERT INTO fotogrammi VALUES ${righe.join(",")};`;
        })(),
      },
      {
        nome: "Il Conto Corrente",
        concetti: "SUM · GROUP BY · ORDER BY",
        storia:
          "Gli estratti conto della vittima mostrano molti pagamenti. «Non farti abbagliare dal bonifico più grande: " +
          "chi ha incassato di più in totale, un po' alla volta, ha il movente migliore».",
        obiettivo:
          "Trova il <b>beneficiario</b> con la <b>somma totale</b> più alta tra i movimenti in uscita. Attenzione: il pagamento singolo più alto <b>non</b> è quello giusto.",
        indizi: [
          "Somma per beneficiario: <code>SELECT beneficiario, SUM(importo) FROM movimenti GROUP BY beneficiario;</code>",
          "Controlla anche <code>MAX(importo)</code> per vedere il trucco.",
          "<code>ORDER BY SUM(importo) DESC LIMIT 1</code> per il totale più alto.",
        ],
        risposte: ["davide costa", "costa"],
        placeholder: "Beneficiario",
        soluzione: "SELECT beneficiario FROM movimenti GROUP BY beneficiario ORDER BY SUM(importo) DESC LIMIT 1",
        setup: `
          CREATE TABLE movimenti (id INTEGER PRIMARY KEY, beneficiario TEXT, importo INTEGER, data TEXT);
          INSERT INTO movimenti VALUES
            (1,'Davide Costa',4000,'2026-07-10'),(2,'Davide Costa',4000,'2026-08-10'),(3,'Davide Costa',4000,'2026-09-10'),
            (4,'Roberto Sala',9000,'2026-09-25'),
            (5,'Giulia Ferrara',3000,'2026-08-01'),(6,'Giulia Ferrara',3000,'2026-09-01'),
            (7,'Marta Bellini',1800,'2026-07-30'),(8,'Marta Bellini',1800,'2026-08-30'),(9,'Marta Bellini',1800,'2026-09-30');`,
      },
      {
        nome: "Il Registro Acquisti",
        concetti: "SUM · COUNT · HAVING",
        storia:
          "Il registro delle vendite del negozio. «Cerco un cliente anomalo: ha speso moltissimo, ma in pochissimi acquisti. " +
          "Più di 5000 euro in totale e meno di 3 acquisti: un collezionista ossessionato da un solo pezzo».",
        obiettivo:
          "Trova il <b>cliente</b> con una spesa <b>totale superiore a 5000</b> euro e <b>meno di 3 acquisti</b>.",
        indizi: [
          "Raggruppa per cliente: <code>GROUP BY cliente</code>, e guarda <code>SUM(importo)</code> e <code>COUNT(*)</code>.",
          "Nella clausola <code>HAVING</code> puoi usare più condizioni con <code>AND</code>.",
          "<code>HAVING SUM(importo) &gt; 5000 AND COUNT(*) &lt; 3</code>.",
        ],
        risposte: ["paolo gentile", "gentile"],
        placeholder: "Cliente",
        soluzione: "SELECT cliente FROM acquisti GROUP BY cliente HAVING SUM(importo)>5000 AND COUNT(*)<3",
        setup: `
          CREATE TABLE acquisti (id INTEGER PRIMARY KEY, cliente TEXT, importo INTEGER, data TEXT);
          INSERT INTO acquisti VALUES
            (1,'Paolo Gentile',4200,'2026-05-03'),(2,'Paolo Gentile',3100,'2026-09-20'),
            (3,'Roberto Sala',2500,'2026-03-02'),(4,'Roberto Sala',1800,'2026-06-10'),(5,'Roberto Sala',900,'2026-08-14'),
            (6,'Davide Costa',1500,'2026-02-01'),(7,'Davide Costa',2500,'2026-04-11'),(8,'Davide Costa',1200,'2026-07-07'),(9,'Davide Costa',1300,'2026-09-01'),
            (10,'Giulia Ferrara',4500,'2026-01-15'),
            (11,'Livia Conti',200,'2026-05-05'),(12,'Livia Conti',150,'2026-06-06'),(13,'Livia Conti',90,'2026-08-08');`,
      },
      {
        nome: "L'Analisi del DNA",
        concetti: "AVG · COUNT · HAVING · ORDER BY",
        storia:
          "Il laboratorio ha confrontato il DNA trovato sull'arma con quello dei sospettati: ogni persona può essere stata testata più volte. " +
          "«Un singolo test può essere un falso positivo. Fidati solo di chi è stato testato almeno due volte, e guarda la media».",
        obiettivo:
          "Trova la <b>persona</b> con la <b>compatibilità media più alta</b> tra chi è stato testato <b>almeno 2 volte</b>.",
        indizi: [
          "<code>SELECT persona, AVG(compatibilita), COUNT(*) FROM campioni GROUP BY persona;</code>",
          "Scarta i test singoli con <code>HAVING COUNT(*) &gt;= 2</code>.",
          "<code>ORDER BY AVG(compatibilita) DESC LIMIT 1</code>.",
        ],
        risposte: ["davide costa", "costa"],
        placeholder: "Persona",
        soluzione: "SELECT persona FROM campioni GROUP BY persona HAVING COUNT(*)>=2 ORDER BY AVG(compatibilita) DESC LIMIT 1",
        setup: `
          CREATE TABLE campioni (id INTEGER PRIMARY KEY, persona TEXT, reperto TEXT, compatibilita REAL);
          INSERT INTO campioni VALUES
            (1,'Davide Costa','manico del fermacarte',0.91),(2,'Davide Costa','bicchiere',0.88),
            (3,'Roberto Sala','bicchiere',0.55),(4,'Roberto Sala','maniglia',0.60),(5,'Roberto Sala','manico del fermacarte',0.58),
            (6,'Giulia Ferrara','bicchiere',0.30),(7,'Giulia Ferrara','maniglia',0.35),
            (8,'Paolo Gentile','manico del fermacarte',0.97),
            (9,'Marta Bellini','bicchiere',0.40),(10,'Marta Bellini','maniglia',0.45),(11,'Marta Bellini','scrivania',0.42);`,
      },
    ],
  },
  {
    id: 3,
    nome: "La Questura",
    concetti: "JOIN · LEFT JOIN · più tabelle",
    intro:
      "Hai quasi tutti i pezzi, ma i dati sono sparsi in archivi diversi. Collegali con i JOIN per inchiodare il colpevole.",
    rooms: [
      {
        nome: "Il Registro Auto",
        concetti: "JOIN",
        storia:
          "Hai la targa dell'auto vista nel vicolo: <code>GH482KL</code>. L'archivio dei veicoli contiene solo l'ID del proprietario; " +
          "i nomi sono in un'altra tabella. «A chi è intestata?»",
        obiettivo:
          "Trova il <b>nome del proprietario</b> del veicolo con targa <b>GH482KL</b>, unendo <code>veicoli</code> e <code>persone</code>.",
        indizi: [
          "Collega le tabelle: <code>FROM veicoli v JOIN persone p ON v.persona_id = p.id</code>.",
          "Filtra la targa: <code>WHERE v.targa = 'GH482KL'</code>.",
          "Seleziona <code>p.nome</code>.",
        ],
        risposte: ["davide costa", "costa"],
        placeholder: "Proprietario",
        soluzione: "SELECT p.nome FROM veicoli v JOIN persone p ON v.persona_id=p.id WHERE v.targa='GH482KL'",
        setup: `
          CREATE TABLE persone (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);
          CREATE TABLE veicoli (targa TEXT PRIMARY KEY, persona_id INTEGER, modello TEXT, colore TEXT);
          INSERT INTO persone VALUES
            (1,'Ettore Montefiori','vittima'),(2,'Giulia Ferrara','ex moglie'),(3,'Davide Costa','socio'),
            (4,'Marta Bellini','commessa'),(5,'Roberto Sala','antiquario rivale'),(6,'Livia Conti','vicina'),(7,'Paolo Gentile','cliente');
          INSERT INTO veicoli VALUES
            ('GH482KL',3,'Fiat Panda','blu'),('AB123CD',5,'Audi A4','nera'),('XX111AA',6,'Fiat 500','bianca'),
            ('TT555TT',2,'Mini Cooper','rossa'),('ZZ999ZZ',4,'Ford Fiesta','grigia');`,
      },
      {
        nome: "L'Agenda della Vittima",
        concetti: "JOIN · WHERE · ORDER BY · LIMIT",
        storia:
          "L'agenda di Montefiori segna gli appuntamenti con l'ID della persona incontrata. " +
          "«Con chi aveva fissato l'ULTIMO appuntamento del 12 ottobre? Era l'ultima persona a vederlo vivo, a meno di sorprese».",
        obiettivo:
          "Trova il <b>nome</b> della persona con cui era fissato l'<b>ultimo appuntamento</b> (ora più tarda) del <b>2026-10-12</b>.",
        indizi: [
          "Unisci con le persone: <code>FROM appuntamenti a JOIN persone p ON a.persona_id = p.id</code>.",
          "Filtra il giorno: <code>WHERE a.data = '2026-10-12'</code>.",
          "<code>ORDER BY a.ora DESC LIMIT 1</code>.",
        ],
        risposte: ["roberto sala", "sala"],
        placeholder: "Nome",
        soluzione: "SELECT p.nome FROM appuntamenti a JOIN persone p ON a.persona_id=p.id WHERE a.data='2026-10-12' ORDER BY a.ora DESC LIMIT 1",
        setup: `
          CREATE TABLE persone (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);
          CREATE TABLE appuntamenti (id INTEGER PRIMARY KEY, persona_id INTEGER, data TEXT, ora TEXT, motivo TEXT);
          INSERT INTO persone VALUES
            (1,'Ettore Montefiori','vittima'),(2,'Giulia Ferrara','ex moglie'),(3,'Davide Costa','socio'),
            (4,'Marta Bellini','commessa'),(5,'Roberto Sala','antiquario rivale'),(6,'Livia Conti','vicina'),(7,'Paolo Gentile','cliente');
          INSERT INTO appuntamenti VALUES
            (1,7,'2026-10-12','18:00','ritiro quadro'),
            (2,2,'2026-10-12','20:30','documenti divorzio'),
            (3,5,'2026-10-12','22:30','trattativa Breguet'),
            (4,3,'2026-10-11','21:00','inventario'),
            (5,4,'2026-10-13','09:00','apertura negozio');`,
      },
      {
        nome: "Le Telefonate",
        concetti: "JOIN · COUNT · GROUP BY",
        storia:
          "Il registro delle chiamate contiene solo gli ID. «Voglio sapere chi Montefiori chiamava più spesso nell'ultima settimana, " +
          "non chi chiamava lui. Chi riceve molte telefonate dalla vittima sapeva cose che altri non sapevano».",
        obiettivo:
          "Trova la <b>persona</b> che ha <b>ricevuto più chiamate dalla vittima</b> (<code>da_id = 1</code>). Inserisci il suo nome.",
        indizi: [
          "Unisci il destinatario: <code>FROM chiamate c JOIN persone p ON c.a_id = p.id</code>.",
          "Solo le chiamate della vittima: <code>WHERE c.da_id = 1</code>.",
          "<code>GROUP BY p.nome ORDER BY COUNT(*) DESC LIMIT 1</code>.",
        ],
        risposte: ["marta bellini", "bellini"],
        placeholder: "Nome",
        soluzione: "SELECT p.nome FROM chiamate c JOIN persone p ON c.a_id=p.id WHERE c.da_id=1 GROUP BY p.nome ORDER BY COUNT(*) DESC LIMIT 1",
        setup: (() => {
          const gruppi = [[1, 4, 6], [1, 3, 3], [1, 5, 2], [1, 7, 2], [1, 2, 1], [3, 1, 9], [2, 1, 4]];
          let id = 0;
          const righe = [];
          for (const [da, a, n] of gruppi) for (let i = 0; i < n; i++) righe.push(`(${++id},${da},${a},'2026-10-${String(6 + (id % 7)).padStart(2, "0")}')`);
          return `
            CREATE TABLE persone (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);
            CREATE TABLE chiamate (id INTEGER PRIMARY KEY, da_id INTEGER, a_id INTEGER, giorno TEXT);
            INSERT INTO persone VALUES
              (1,'Ettore Montefiori','vittima'),(2,'Giulia Ferrara','ex moglie'),(3,'Davide Costa','socio'),
              (4,'Marta Bellini','commessa'),(5,'Roberto Sala','antiquario rivale'),(6,'Livia Conti','vicina'),(7,'Paolo Gentile','cliente');
            INSERT INTO chiamate VALUES ${righe.join(",")};`;
        })(),
      },
      {
        nome: "Gli Alibi",
        concetti: "LEFT JOIN · IS NULL",
        storia:
          "Ogni sospettato doveva fornire un alibi, registrato in una tabella a parte. «Qualcuno non ne ha presentato nessuno: " +
          "non basta un JOIN normale, perché scarterebbe proprio chi non ha righe. E non contare la vittima!»",
        obiettivo:
          "Trova la persona <b>senza alcun alibi registrato</b> (e che non sia la <b>vittima</b>, <code>ruolo &lt;&gt; 'vittima'</code>). Inserisci il suo cognome.",
        indizi: [
          "Usa <code>FROM persone p LEFT JOIN alibi a ON a.persona_id = p.id</code>: mantiene tutte le persone, con <code>NULL</code> dove manca l'alibi.",
          "Tieni solo le righe senza corrispondenza: <code>WHERE a.id IS NULL</code>.",
          "Escludi la vittima con <code>AND p.ruolo &lt;&gt; 'vittima'</code>.",
        ],
        risposte: ["bellini", "marta bellini"],
        placeholder: "Cognome",
        soluzione:
          "SELECT p.nome FROM persone p LEFT JOIN alibi a ON a.persona_id=p.id WHERE a.id IS NULL AND p.ruolo<>'vittima'",
        setup: `
          CREATE TABLE persone (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);
          CREATE TABLE alibi (id INTEGER PRIMARY KEY, persona_id INTEGER, descrizione TEXT);
          INSERT INTO persone VALUES
            (1,'Ettore Montefiori','vittima'),(2,'Giulia Ferrara','ex moglie'),(3,'Davide Costa','socio'),
            (4,'Marta Bellini','commessa'),(5,'Roberto Sala','antiquario rivale'),(6,'Livia Conti','vicina'),(7,'Paolo Gentile','cliente');
          INSERT INTO alibi VALUES
            (1,2,'Serata a casa con la sorella'),(2,3,'A casa a guardare la partita'),
            (3,5,'Cena in hotel con un cliente'),(4,6,'A casa a letto'),(5,7,'Al cinema');`,
      },
      {
        nome: "Il Verbale Finale",
        concetti: "JOIN su condizioni multiple",
        storia:
          "Ultima prova. Ogni sospettato ha dichiarato dove si trovava alle 23:40. Le celle telefoniche dicono dove si trovava davvero il suo cellulare. " +
          "«Se i due luoghi non coincidono, quella persona ha mentito. E ha mentito proprio all'ora del delitto».",
        obiettivo:
          "Trova la persona il cui <b>luogo dichiarato</b> (<code>dichiarazioni.luogo</code>) è <b>diverso</b> dal luogo registrato dalla cella " +
          "(<code>celle.luogo_cella</code>) <b>alle 23:40</b>. Inserisci il <b>cognome</b>.",
        indizi: [
          "Unisci le tre tabelle: <code>persone p JOIN dichiarazioni d ON d.persona_id = p.id JOIN celle c ON c.persona_id = p.id</code>.",
          "Considera solo l'ora del delitto: <code>c.ora = '23:40'</code>.",
          "Cerca la discrepanza: <code>d.luogo &lt;&gt; c.luogo_cella</code>.",
        ],
        risposte: ["costa", "davide costa"],
        placeholder: "Cognome del colpevole",
        soluzione:
          "SELECT p.nome FROM persone p JOIN dichiarazioni d ON d.persona_id=p.id JOIN celle c ON c.persona_id=p.id " +
          "WHERE c.ora='23:40' AND d.luogo<>c.luogo_cella",
        setup: `
          CREATE TABLE persone (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);
          CREATE TABLE dichiarazioni (id INTEGER PRIMARY KEY, persona_id INTEGER, luogo TEXT);
          CREATE TABLE celle (id INTEGER PRIMARY KEY, persona_id INTEGER, ora TEXT, luogo_cella TEXT);
          INSERT INTO persone VALUES
            (1,'Ettore Montefiori','vittima'),(2,'Giulia Ferrara','ex moglie'),(3,'Davide Costa','socio'),
            (4,'Marta Bellini','commessa'),(5,'Roberto Sala','antiquario rivale'),(6,'Livia Conti','vicina'),(7,'Paolo Gentile','cliente');
          INSERT INTO dichiarazioni VALUES
            (1,2,'Casa'),(2,3,'Casa'),(3,5,'Hotel Centrale'),(4,6,'Casa'),(5,7,'Cinema');
          INSERT INTO celle VALUES
            (1,2,'23:40','Casa'),(2,3,'23:40','Via Aurora (negozio)'),(3,5,'23:40','Hotel Centrale'),
            (4,6,'23:40','Casa'),(5,7,'23:40','Cinema'),
            (6,5,'22:30','Via Aurora (negozio)'),(7,3,'21:00','Casa'),(8,2,'21:00','Via Roma');`,
      },
    ],
  },
];

// Gli id sono assegnati automaticamente in base all'ordine.
LEVELS.flatMap((l) => l.rooms).forEach((r, i) => (r.id = i + 1));

module.exports = { GAME, LEVELS };
