// FILE GENERATO da dev/build.js — non modificare a mano.
const GAME = {
 "id": "caso-montefiori",
 "slug": "caso-montefiori",
 "genere": "Giallo · Investigazione",
 "descrizione": "Un antiquario è stato ucciso nel suo negozio. Interroga prove, tabulati e archivi di polizia per smascherare il colpevole.",
 "titolo": "Il Caso Montefiori",
 "logo": "🔍 CASO MONTEFIORI",
 "tema": "noir",
 "storageKey": "sql-escape-room-giallo-v1",
 "premessa": "Sei l'ispettore Rinaldi. L'antiquario Ettore Montefiori è stato trovato morto nel suo negozio la mattina del 13 ottobre. Il commissario ti ha chiuso nell'archivio della questura: la porta si apre solo se risolvi il caso.",
 "startLabel": "Apri il fascicolo",
 "fine": {
  "tag": "Caso chiuso",
  "titolo": "🔓 Davide Costa è il colpevole!",
  "testo": "Il socio di Montefiori, sfruttando l'accesso al negozio, aveva spento la telecamera d'ingresso, si era procurato un alibi falso e ha lasciato tracce ovunque. Con le tue query hai ricostruito tutto: la porta dell'archivio si apre e il commissario ti stringe la mano."
 }
};
const LEVELS = [
 {
  "id": 1,
  "nome": "La Scena del Crimine",
  "concetti": "SELECT · WHERE · ORDER BY · LIMIT/OFFSET · LIKE · IN · BETWEEN · NULL",
  "intro": "Via Aurora 12, Antichità Montefiori. Il corpo è stato portato via ma la bottega è piena di indizi. Raccogli e filtra le prove con le query di base.",
  "rooms": [
   {
    "nome": "Il Negozio",
    "concetti": "SELECT · WHERE · AND",
    "storia": "Il negozio è sottosopra. Il vice-ispettore ti consegna l'inventario aggiornato: alcuni pezzi risultano spariti. «Un ladro da quattro soldi si porta via una tabacchiera. Se il movente è il furto, manca qualcosa di molto più prezioso».",
    "obiettivo": "Trova l'oggetto <b>mancante</b> (<code>stato = 'mancante'</code>) con un <b>valore superiore a 5000</b> euro. Il suo nome è il codice.",
    "indizi": [
     "Guarda la tabella con <code>SELECT * FROM inventario;</code>.",
     "Filtra lo stato: <code>WHERE stato = 'mancante'</code>.",
     "Aggiungi la soglia di valore con <code>AND valore &gt; 5000</code>."
    ],
    "placeholder": "Oggetto rubato",
    "setup": "\n          CREATE TABLE inventario (id INTEGER PRIMARY KEY, oggetto TEXT, categoria TEXT, valore INTEGER, stato TEXT);\n          INSERT INTO inventario VALUES\n            (1,'Vaso Ming','ceramica',12000,'presente'),\n            (2,'Orologio Breguet','orologeria',18500,'mancante'),\n            (3,'Specchio veneziano','arredo',3200,'presente'),\n            (4,'Tabacchiera d''argento','argenteria',450,'mancante'),\n            (5,'Statuina in bronzo','scultura',2800,'mancante'),\n            (6,'Violino Guarneri','strumenti',25000,'presente'),\n            (7,'Candeliere','argenteria',300,'presente'),\n            (8,'Tappeto persiano','arredo',6500,'presente');",
    "id": 1,
    "risposte": [
     "0c29e03074f2231a80d073b4b14f1221b6ec77c12c0f46552f9aa9c30834601d",
     "5f3ac0ea2bc946c17537b58aa4a4201c6a21a84d4782fb02e28860b44da7d685"
    ]
   },
   {
    "nome": "Il Medico Legale",
    "concetti": "ORDER BY · LIMIT",
    "storia": "Il medico legale ti consegna quattro stime dell'ora del decesso, ottenute con metodi diversi. «Non sono tutte affidabili allo stesso modo: ogni stima ha un indice di attendibilità. Fidati della migliore».",
    "obiettivo": "Trova l'<b>ora stimata del decesso</b> (<code>orario_stimato</code>) con l'<b>attendibilità più alta</b>. Il codice è l'orario nel formato <code>HH:MM</code>.",
    "indizi": [
     "Guarda tutte le stime: <code>SELECT * FROM rilievi;</code>.",
     "Ordina per attendibilità decrescente: <code>ORDER BY attendibilita DESC</code>.",
     "Prendi solo la prima riga con <code>LIMIT 1</code>."
    ],
    "placeholder": "Orario (HH:MM)",
    "setup": "\n          CREATE TABLE rilievi (id INTEGER PRIMARY KEY, metodo TEXT, orario_stimato TEXT, attendibilita INTEGER);\n          INSERT INTO rilievi VALUES\n            (1,'Temperatura corporea','23:40',90),\n            (2,'Rigor mortis','22:30',60),\n            (3,'Livor mortis','00:20',55),\n            (4,'Contenuto gastrico','22:50',40);",
    "id": 2,
    "risposte": [
     "4d9429d4ad57355307412ee34f6db1ccd8870c46fc54917dba283f78e40508d7"
    ]
   },
   {
    "nome": "Le Impronte nel Retrobottega",
    "concetti": "LIKE · IN · AND",
    "storia": "Nel retrobottega, accanto alla porta sul vicolo, la scientifica ha rilevato diverse impronte di scarpa. «Cerco quella lasciata nel fango rosso, trovata nel retrobottega, rilevata in modo chiaro: ci dice la misura dell'assassino».",
    "obiettivo": "Trova la <b>misura</b> della scarpa: descrizione che <b>contiene «fango»</b>, luogo <b>retrobottega</b> e qualità <b>alta o ottima</b>.",
    "indizi": [
     "Cerca una parola nel testo con <code>descrizione LIKE '%fango%'</code>.",
     "Per accettare più valori: <code>qualita IN ('alta', 'ottima')</code>.",
     "Metti tutto insieme con <code>AND</code> e aggiungi <code>luogo = 'retrobottega'</code>."
    ],
    "placeholder": "Misura scarpa",
    "setup": "\n          CREATE TABLE tracce (id INTEGER PRIMARY KEY, tipo TEXT, descrizione TEXT, luogo TEXT, qualita TEXT, misura INTEGER);\n          INSERT INTO tracce VALUES\n            (1,'impronta','scarpa con fango rosso','retrobottega','alta',43),\n            (2,'impronta','scarpa con fango rosso','retrobottega','scarsa',41),\n            (3,'impronta','scarpa pulita','ingresso','ottima',44),\n            (4,'impronta','scarpa con fango rosso','vicolo','ottima',40),\n            (5,'impronta','guanto di lattice','retrobottega','alta',9),\n            (6,'impronta','scarpa con fango scuro','retrobottega','media',42);",
    "id": 3,
    "risposte": [
     "cb6390765bdbbda02f840aeac84d914938b95b69083c0e8ddc6dfc997c79b44c"
    ]
   },
   {
    "nome": "Le Testimonianze",
    "concetti": "BETWEEN · <> · AND",
    "storia": "I vicini hanno visto una macchina nel vicolo dietro il negozio. «Ma attento: la signora Conti vede complotti ovunque, non la considero attendibile. E la macchina che cerchi è passata poco prima di mezzanotte».",
    "obiettivo": "Trova la <b>targa</b> avvistata nel <b>vicolo</b> tra le <b>23:30 e le 23:59</b> (estremi inclusi) da un testimone <b>diverso da Livia Conti</b>.",
    "indizi": [
     "Guarda i dati con <code>SELECT * FROM avvistamenti;</code>. Le ore sono testo nel formato HH:MM.",
     "Per un intervallo: <code>ora BETWEEN '23:30' AND '23:59'</code>.",
     "Escludi la signora con <code>testimone &lt;&gt; 'Livia Conti'</code> e aggiungi <code>luogo = 'vicolo'</code>."
    ],
    "placeholder": "Targa",
    "setup": "\n          CREATE TABLE avvistamenti (id INTEGER PRIMARY KEY, testimone TEXT, ora TEXT, luogo TEXT, targa TEXT);\n          INSERT INTO avvistamenti VALUES\n            (1,'Livia Conti','23:35','vicolo','XX111AA'),\n            (2,'Mario Fabbri','22:50','vicolo','AB123CD'),\n            (3,'Antonio Riva','23:42','vicolo','GH482KL'),\n            (4,'Sonia Greco','23:50','piazza','ZZ999ZZ'),\n            (5,'Mario Fabbri','00:10','vicolo','TT555TT');",
    "id": 4,
    "risposte": [
     "a10f63afffbc56190f85ef0d6d41276b2f386e4fecb631f254a7ffef8711033c"
    ]
   },
   {
    "nome": "L'Archivio dei Precedenti",
    "concetti": "ORDER BY · LIMIT/OFFSET · IS NOT NULL",
    "storia": "In archivio trovi i precedenti penali dei sospettati. «Interessano solo i furti con una condanna accertata: se la condanna è vuota il caso fu archiviato. Fra questi, mi serve il SECONDO più recente».",
    "obiettivo": "Fra i precedenti per <b>furto</b> con <b>condanna nota</b> (<code>condanna_mesi</code> non <code>NULL</code>), trova il <b>secondo più recente</b>. Il codice è il nome della persona.",
    "indizi": [
     "Filtra: <code>WHERE reato = 'furto' AND condanna_mesi IS NOT NULL</code>.",
     "Ordina dal più recente: <code>ORDER BY anno DESC</code>.",
     "Salta il primo con <code>LIMIT 1 OFFSET 1</code>."
    ],
    "placeholder": "Nome",
    "setup": "\n          CREATE TABLE precedenti (id INTEGER PRIMARY KEY, nome TEXT, reato TEXT, anno INTEGER, condanna_mesi INTEGER);\n          INSERT INTO precedenti VALUES\n            (1,'Roberto Sala','furto',2019,12),\n            (2,'Davide Costa','furto',2022,NULL),\n            (3,'Paolo Gentile','furto',2021,8),\n            (4,'Giulia Ferrara','furto',2015,6),\n            (5,'Marta Bellini','truffa',2023,10),\n            (6,'Roberto Sala','rissa',2024,3),\n            (7,'Davide Costa','truffa',2020,NULL);",
    "id": 5,
    "risposte": [
     "2b3fc23d67e82154b7b7da79253df1c14cec875471ab42d0b6f397d58d2855c7",
     "b4082a171957c01c1740e40d517c9fc4bc4739b0224cb387b92a3d576df21dc4"
    ]
   }
  ]
 },
 {
  "id": 2,
  "nome": "Il Laboratorio",
  "concetti": "COUNT · SUM · AVG · MIN/MAX · GROUP BY · HAVING",
  "intro": "Le prove raccolte vanno analizzate. Messaggi, soldi, riprese e campioni: conta, somma, media e confronta per capire chi ha fatto cosa.",
  "rooms": [
   {
    "nome": "I Tabulati Telefonici",
    "concetti": "COUNT · WHERE · GROUP BY · HAVING",
    "storia": "Dal telefono della vittima sono stati estratti tutti i messaggi dell'ultima settimana. «Qualcuno lo tempestava: più di dieci messaggi diretti a lui. Ma conta solo ciò che ha RICEVUTO Montefiori, non i messaggi che si scambiavano gli altri».",
    "obiettivo": "Trova il <b>mittente</b> che ha inviato <b>più di 10 messaggi</b> a <b>Ettore Montefiori</b> (<code>destinatario = 'Ettore Montefiori'</code>).",
    "indizi": [
     "Prima filtra i messaggi per destinatario con <code>WHERE destinatario = 'Ettore Montefiori'</code>.",
     "Raggruppa per mittente e conta: <code>GROUP BY mittente</code>, <code>COUNT(*)</code>.",
     "Filtra i gruppi con <code>HAVING COUNT(*) &gt; 10</code>."
    ],
    "placeholder": "Mittente",
    "setup": "CREATE TABLE messaggi (id INTEGER PRIMARY KEY, mittente TEXT, destinatario TEXT, giorno TEXT);\n                  INSERT INTO messaggi VALUES (1,'Giulia Ferrara','Ettore Montefiori','2026-10-07'),(2,'Giulia Ferrara','Ettore Montefiori','2026-10-08'),(3,'Giulia Ferrara','Ettore Montefiori','2026-10-09'),(4,'Giulia Ferrara','Ettore Montefiori','2026-10-10'),(5,'Giulia Ferrara','Ettore Montefiori','2026-10-11'),(6,'Giulia Ferrara','Ettore Montefiori','2026-10-12'),(7,'Giulia Ferrara','Ettore Montefiori','2026-10-06'),(8,'Giulia Ferrara','Ettore Montefiori','2026-10-07'),(9,'Giulia Ferrara','Ettore Montefiori','2026-10-08'),(10,'Giulia Ferrara','Ettore Montefiori','2026-10-09'),(11,'Giulia Ferrara','Ettore Montefiori','2026-10-10'),(12,'Giulia Ferrara','Ettore Montefiori','2026-10-11'),(13,'Davide Costa','Ettore Montefiori','2026-10-12'),(14,'Davide Costa','Ettore Montefiori','2026-10-06'),(15,'Davide Costa','Ettore Montefiori','2026-10-07'),(16,'Davide Costa','Ettore Montefiori','2026-10-08'),(17,'Roberto Sala','Ettore Montefiori','2026-10-09'),(18,'Roberto Sala','Ettore Montefiori','2026-10-10'),(19,'Paolo Gentile','Ettore Montefiori','2026-10-11'),(20,'Paolo Gentile','Ettore Montefiori','2026-10-12'),(21,'Paolo Gentile','Ettore Montefiori','2026-10-06'),(22,'Paolo Gentile','Ettore Montefiori','2026-10-07'),(23,'Paolo Gentile','Ettore Montefiori','2026-10-08'),(24,'Paolo Gentile','Ettore Montefiori','2026-10-09'),(25,'Paolo Gentile','Ettore Montefiori','2026-10-10'),(26,'Paolo Gentile','Marta Bellini','2026-10-11'),(27,'Paolo Gentile','Marta Bellini','2026-10-12'),(28,'Paolo Gentile','Marta Bellini','2026-10-06'),(29,'Paolo Gentile','Marta Bellini','2026-10-07'),(30,'Paolo Gentile','Marta Bellini','2026-10-08'),(31,'Paolo Gentile','Marta Bellini','2026-10-09'),(32,'Paolo Gentile','Marta Bellini','2026-10-10'),(33,'Paolo Gentile','Marta Bellini','2026-10-11');",
    "id": 6,
    "risposte": [
     "ebc963fae044988a3bf002b9ccf26bc1f0e5733d2ce5a13ef4b4a74b0e878d61",
     "07d7d97115a63ff70c04daf6c634a51e91438273b49e87a56ae2c400d0c3d9fd"
    ]
   },
   {
    "nome": "Le Telecamere",
    "concetti": "MAX · GROUP BY · ORDER BY",
    "storia": "Il negozio ha 4 telecamere, ognuna registra un fotogramma ogni quarto d'ora. Una si è fermata troppo presto: qualcuno l'ha spenta. «Chi sa quando si è fermata ogni camera, sa dov'è entrato l'assassino».",
    "obiettivo": "Per ogni telecamera calcola l'<b>ultimo fotogramma</b> (<code>MAX(ora)</code>). Trova la telecamera il cui ultimo fotogramma è il <b>più antico</b>.",
    "indizi": [
     "Raggruppa per telecamera: <code>SELECT telecamera, MAX(ora) FROM fotogrammi GROUP BY telecamera;</code>",
     "Confronta gli ultimi fotogrammi: chi smette per primo ha il valore più basso.",
     "<code>ORDER BY MAX(ora) ASC LIMIT 1</code> ti dà la telecamera."
    ],
    "placeholder": "Telecamera",
    "setup": "CREATE TABLE fotogrammi (id INTEGER PRIMARY KEY, telecamera TEXT, ora TEXT);\n                  INSERT INTO fotogrammi VALUES (1,'Ingresso','22:00'),(2,'Ingresso','22:15'),(3,'Ingresso','22:30'),(4,'Ingresso','22:45'),(5,'Ingresso','23:00'),(6,'Ingresso','23:15'),(7,'Retro','22:00'),(8,'Retro','22:15'),(9,'Retro','22:30'),(10,'Retro','22:45'),(11,'Retro','23:00'),(12,'Retro','23:15'),(13,'Retro','23:30'),(14,'Retro','23:45'),(15,'Vicolo','22:00'),(16,'Vicolo','22:15'),(17,'Vicolo','22:30'),(18,'Vicolo','22:45'),(19,'Vicolo','23:00'),(20,'Vicolo','23:15'),(21,'Vicolo','23:30'),(22,'Vicolo','23:45'),(23,'Cassa','22:00'),(24,'Cassa','22:15'),(25,'Cassa','22:30'),(26,'Cassa','22:45'),(27,'Cassa','23:00'),(28,'Cassa','23:15'),(29,'Cassa','23:30'),(30,'Retro','23:59');",
    "id": 7,
    "risposte": [
     "37d5e66dbf393c8598c21241c89ce9beaaa980e55d12898809504d8c6f289dff"
    ]
   },
   {
    "nome": "Il Conto Corrente",
    "concetti": "SUM · GROUP BY · ORDER BY",
    "storia": "Gli estratti conto della vittima mostrano molti pagamenti. «Non farti abbagliare dal bonifico più grande: chi ha incassato di più in totale, un po' alla volta, ha il movente migliore».",
    "obiettivo": "Trova il <b>beneficiario</b> con la <b>somma totale</b> più alta tra i movimenti in uscita. Attenzione: il pagamento singolo più alto <b>non</b> è quello giusto.",
    "indizi": [
     "Somma per beneficiario: <code>SELECT beneficiario, SUM(importo) FROM movimenti GROUP BY beneficiario;</code>",
     "Controlla anche <code>MAX(importo)</code> per vedere il trucco.",
     "<code>ORDER BY SUM(importo) DESC LIMIT 1</code> per il totale più alto."
    ],
    "placeholder": "Beneficiario",
    "setup": "\n          CREATE TABLE movimenti (id INTEGER PRIMARY KEY, beneficiario TEXT, importo INTEGER, data TEXT);\n          INSERT INTO movimenti VALUES\n            (1,'Davide Costa',4000,'2026-07-10'),(2,'Davide Costa',4000,'2026-08-10'),(3,'Davide Costa',4000,'2026-09-10'),\n            (4,'Roberto Sala',9000,'2026-09-25'),\n            (5,'Giulia Ferrara',3000,'2026-08-01'),(6,'Giulia Ferrara',3000,'2026-09-01'),\n            (7,'Marta Bellini',1800,'2026-07-30'),(8,'Marta Bellini',1800,'2026-08-30'),(9,'Marta Bellini',1800,'2026-09-30');",
    "id": 8,
    "risposte": [
     "9d82765ffd0ffed46fdd0466cea046237342078510cccc06f846815a4af43768",
     "734c2b52f773e17040995f8e821de6703c0ab9bc2e5847616599b028a21a3bd3"
    ]
   },
   {
    "nome": "Il Registro Acquisti",
    "concetti": "SUM · COUNT · HAVING",
    "storia": "Il registro delle vendite del negozio. «Cerco un cliente anomalo: ha speso moltissimo, ma in pochissimi acquisti. Più di 5000 euro in totale e meno di 3 acquisti: un collezionista ossessionato da un solo pezzo».",
    "obiettivo": "Trova il <b>cliente</b> con una spesa <b>totale superiore a 5000</b> euro e <b>meno di 3 acquisti</b>.",
    "indizi": [
     "Raggruppa per cliente: <code>GROUP BY cliente</code>, e guarda <code>SUM(importo)</code> e <code>COUNT(*)</code>.",
     "Nella clausola <code>HAVING</code> puoi usare più condizioni con <code>AND</code>.",
     "<code>HAVING SUM(importo) &gt; 5000 AND COUNT(*) &lt; 3</code>."
    ],
    "placeholder": "Cliente",
    "setup": "\n          CREATE TABLE acquisti (id INTEGER PRIMARY KEY, cliente TEXT, importo INTEGER, data TEXT);\n          INSERT INTO acquisti VALUES\n            (1,'Paolo Gentile',4200,'2026-05-03'),(2,'Paolo Gentile',3100,'2026-09-20'),\n            (3,'Roberto Sala',2500,'2026-03-02'),(4,'Roberto Sala',1800,'2026-06-10'),(5,'Roberto Sala',900,'2026-08-14'),\n            (6,'Davide Costa',1500,'2026-02-01'),(7,'Davide Costa',2500,'2026-04-11'),(8,'Davide Costa',1200,'2026-07-07'),(9,'Davide Costa',1300,'2026-09-01'),\n            (10,'Giulia Ferrara',4500,'2026-01-15'),\n            (11,'Livia Conti',200,'2026-05-05'),(12,'Livia Conti',150,'2026-06-06'),(13,'Livia Conti',90,'2026-08-08');",
    "id": 9,
    "risposte": [
     "907afc63dac975cba803b403e0166a2c8237b5efe8f276a43a2b459cec544880",
     "d53a55d0d8791af3151af3a063ffc947ed8c91fa9a344165b265758898608ab9"
    ]
   },
   {
    "nome": "L'Analisi del DNA",
    "concetti": "AVG · COUNT · HAVING · ORDER BY",
    "storia": "Il laboratorio ha confrontato il DNA trovato sull'arma con quello dei sospettati: ogni persona può essere stata testata più volte. «Un singolo test può essere un falso positivo. Fidati solo di chi è stato testato almeno due volte, e guarda la media».",
    "obiettivo": "Trova la <b>persona</b> con la <b>compatibilità media più alta</b> tra chi è stato testato <b>almeno 2 volte</b>.",
    "indizi": [
     "<code>SELECT persona, AVG(compatibilita), COUNT(*) FROM campioni GROUP BY persona;</code>",
     "Scarta i test singoli con <code>HAVING COUNT(*) &gt;= 2</code>.",
     "<code>ORDER BY AVG(compatibilita) DESC LIMIT 1</code>."
    ],
    "placeholder": "Persona",
    "setup": "\n          CREATE TABLE campioni (id INTEGER PRIMARY KEY, persona TEXT, reperto TEXT, compatibilita REAL);\n          INSERT INTO campioni VALUES\n            (1,'Davide Costa','manico del fermacarte',0.91),(2,'Davide Costa','bicchiere',0.88),\n            (3,'Roberto Sala','bicchiere',0.55),(4,'Roberto Sala','maniglia',0.60),(5,'Roberto Sala','manico del fermacarte',0.58),\n            (6,'Giulia Ferrara','bicchiere',0.30),(7,'Giulia Ferrara','maniglia',0.35),\n            (8,'Paolo Gentile','manico del fermacarte',0.97),\n            (9,'Marta Bellini','bicchiere',0.40),(10,'Marta Bellini','maniglia',0.45),(11,'Marta Bellini','scrivania',0.42);",
    "id": 10,
    "risposte": [
     "68254eacf168d970b4b28f522ba26561a86c3fc4162971d78146018ad32a4bf4",
     "ad77e2b90d41a3162acd8353043da66886f1bdfd0b4da582ad5080e86d545cac"
    ]
   }
  ]
 },
 {
  "id": 3,
  "nome": "La Questura",
  "concetti": "JOIN · LEFT JOIN · più tabelle",
  "intro": "Hai quasi tutti i pezzi, ma i dati sono sparsi in archivi diversi. Collegali con i JOIN per inchiodare il colpevole.",
  "rooms": [
   {
    "nome": "Il Registro Auto",
    "concetti": "JOIN",
    "storia": "Hai la targa dell'auto vista nel vicolo: <code>GH482KL</code>. L'archivio dei veicoli contiene solo l'ID del proprietario; i nomi sono in un'altra tabella. «A chi è intestata?»",
    "obiettivo": "Trova il <b>nome del proprietario</b> del veicolo con targa <b>GH482KL</b>, unendo <code>veicoli</code> e <code>persone</code>.",
    "indizi": [
     "Collega le tabelle: <code>FROM veicoli v JOIN persone p ON v.persona_id = p.id</code>.",
     "Filtra la targa: <code>WHERE v.targa = 'GH482KL'</code>.",
     "Seleziona <code>p.nome</code>."
    ],
    "placeholder": "Proprietario",
    "setup": "\n          CREATE TABLE persone (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);\n          CREATE TABLE veicoli (targa TEXT PRIMARY KEY, persona_id INTEGER, modello TEXT, colore TEXT);\n          INSERT INTO persone VALUES\n            (1,'Ettore Montefiori','vittima'),(2,'Giulia Ferrara','ex moglie'),(3,'Davide Costa','socio'),\n            (4,'Marta Bellini','commessa'),(5,'Roberto Sala','antiquario rivale'),(6,'Livia Conti','vicina'),(7,'Paolo Gentile','cliente');\n          INSERT INTO veicoli VALUES\n            ('GH482KL',3,'Fiat Panda','blu'),('AB123CD',5,'Audi A4','nera'),('XX111AA',6,'Fiat 500','bianca'),\n            ('TT555TT',2,'Mini Cooper','rossa'),('ZZ999ZZ',4,'Ford Fiesta','grigia');",
    "id": 11,
    "risposte": [
     "10e3932bec8cdbef573279eed6560246d3253eab8ca7750c2d2011a67bf225d2",
     "041b36edfeaa26d277bfffcba8e083691a530b0f78b8778136c5736a59a381a1"
    ]
   },
   {
    "nome": "L'Agenda della Vittima",
    "concetti": "JOIN · WHERE · ORDER BY · LIMIT",
    "storia": "L'agenda di Montefiori segna gli appuntamenti con l'ID della persona incontrata. «Con chi aveva fissato l'ULTIMO appuntamento del 12 ottobre? Era l'ultima persona a vederlo vivo, a meno di sorprese».",
    "obiettivo": "Trova il <b>nome</b> della persona con cui era fissato l'<b>ultimo appuntamento</b> (ora più tarda) del <b>2026-10-12</b>.",
    "indizi": [
     "Unisci con le persone: <code>FROM appuntamenti a JOIN persone p ON a.persona_id = p.id</code>.",
     "Filtra il giorno: <code>WHERE a.data = '2026-10-12'</code>.",
     "<code>ORDER BY a.ora DESC LIMIT 1</code>."
    ],
    "placeholder": "Nome",
    "setup": "\n          CREATE TABLE persone (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);\n          CREATE TABLE appuntamenti (id INTEGER PRIMARY KEY, persona_id INTEGER, data TEXT, ora TEXT, motivo TEXT);\n          INSERT INTO persone VALUES\n            (1,'Ettore Montefiori','vittima'),(2,'Giulia Ferrara','ex moglie'),(3,'Davide Costa','socio'),\n            (4,'Marta Bellini','commessa'),(5,'Roberto Sala','antiquario rivale'),(6,'Livia Conti','vicina'),(7,'Paolo Gentile','cliente');\n          INSERT INTO appuntamenti VALUES\n            (1,7,'2026-10-12','18:00','ritiro quadro'),\n            (2,2,'2026-10-12','20:30','documenti divorzio'),\n            (3,5,'2026-10-12','22:30','trattativa Breguet'),\n            (4,3,'2026-10-11','21:00','inventario'),\n            (5,4,'2026-10-13','09:00','apertura negozio');",
    "id": 12,
    "risposte": [
     "637c8f3798ca66357475b2520de850cd662cf4c6dfba5d636d4fda94ff489db4",
     "7944a52161cf68c240395939d8cf05b3be83cc062a54f77c6d2afc936078cc18"
    ]
   },
   {
    "nome": "Le Telefonate",
    "concetti": "JOIN · COUNT · GROUP BY",
    "storia": "Il registro delle chiamate contiene solo gli ID. «Voglio sapere chi Montefiori chiamava più spesso nell'ultima settimana, non chi chiamava lui. Chi riceve molte telefonate dalla vittima sapeva cose che altri non sapevano».",
    "obiettivo": "Trova la <b>persona</b> che ha <b>ricevuto più chiamate dalla vittima</b> (<code>da_id = 1</code>). Inserisci il suo nome.",
    "indizi": [
     "Unisci il destinatario: <code>FROM chiamate c JOIN persone p ON c.a_id = p.id</code>.",
     "Solo le chiamate della vittima: <code>WHERE c.da_id = 1</code>.",
     "<code>GROUP BY p.nome ORDER BY COUNT(*) DESC LIMIT 1</code>."
    ],
    "placeholder": "Nome",
    "setup": "\n            CREATE TABLE persone (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);\n            CREATE TABLE chiamate (id INTEGER PRIMARY KEY, da_id INTEGER, a_id INTEGER, giorno TEXT);\n            INSERT INTO persone VALUES\n              (1,'Ettore Montefiori','vittima'),(2,'Giulia Ferrara','ex moglie'),(3,'Davide Costa','socio'),\n              (4,'Marta Bellini','commessa'),(5,'Roberto Sala','antiquario rivale'),(6,'Livia Conti','vicina'),(7,'Paolo Gentile','cliente');\n            INSERT INTO chiamate VALUES (1,1,4,'2026-10-07'),(2,1,4,'2026-10-08'),(3,1,4,'2026-10-09'),(4,1,4,'2026-10-10'),(5,1,4,'2026-10-11'),(6,1,4,'2026-10-12'),(7,1,3,'2026-10-06'),(8,1,3,'2026-10-07'),(9,1,3,'2026-10-08'),(10,1,5,'2026-10-09'),(11,1,5,'2026-10-10'),(12,1,7,'2026-10-11'),(13,1,7,'2026-10-12'),(14,1,2,'2026-10-06'),(15,3,1,'2026-10-07'),(16,3,1,'2026-10-08'),(17,3,1,'2026-10-09'),(18,3,1,'2026-10-10'),(19,3,1,'2026-10-11'),(20,3,1,'2026-10-12'),(21,3,1,'2026-10-06'),(22,3,1,'2026-10-07'),(23,3,1,'2026-10-08'),(24,2,1,'2026-10-09'),(25,2,1,'2026-10-10'),(26,2,1,'2026-10-11'),(27,2,1,'2026-10-12');",
    "id": 13,
    "risposte": [
     "d32c26d5ada7749f2c50f4e2e414cca73d290453e4c583d74af88fa3cb01e7cb",
     "d576ffe261ccbf12194febee81d9cb73e6064652231870156a7748395ff80994"
    ]
   },
   {
    "nome": "Gli Alibi",
    "concetti": "LEFT JOIN · IS NULL",
    "storia": "Ogni sospettato doveva fornire un alibi, registrato in una tabella a parte. «Qualcuno non ne ha presentato nessuno: non basta un JOIN normale, perché scarterebbe proprio chi non ha righe. E non contare la vittima!»",
    "obiettivo": "Trova la persona <b>senza alcun alibi registrato</b> (e che non sia la <b>vittima</b>, <code>ruolo &lt;&gt; 'vittima'</code>). Inserisci il suo cognome.",
    "indizi": [
     "Usa <code>FROM persone p LEFT JOIN alibi a ON a.persona_id = p.id</code>: mantiene tutte le persone, con <code>NULL</code> dove manca l'alibi.",
     "Tieni solo le righe senza corrispondenza: <code>WHERE a.id IS NULL</code>.",
     "Escludi la vittima con <code>AND p.ruolo &lt;&gt; 'vittima'</code>."
    ],
    "placeholder": "Cognome",
    "setup": "\n          CREATE TABLE persone (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);\n          CREATE TABLE alibi (id INTEGER PRIMARY KEY, persona_id INTEGER, descrizione TEXT);\n          INSERT INTO persone VALUES\n            (1,'Ettore Montefiori','vittima'),(2,'Giulia Ferrara','ex moglie'),(3,'Davide Costa','socio'),\n            (4,'Marta Bellini','commessa'),(5,'Roberto Sala','antiquario rivale'),(6,'Livia Conti','vicina'),(7,'Paolo Gentile','cliente');\n          INSERT INTO alibi VALUES\n            (1,2,'Serata a casa con la sorella'),(2,3,'A casa a guardare la partita'),\n            (3,5,'Cena in hotel con un cliente'),(4,6,'A casa a letto'),(5,7,'Al cinema');",
    "id": 14,
    "risposte": [
     "281d25e70b4e976385417da44b296d9e907400af297c84ae426286df07a5c40a",
     "ac8fc035ea167cd3e455b415dbc152993a1b63dd6b93ea69152f1c337fe38c23"
    ]
   },
   {
    "nome": "Il Verbale Finale",
    "concetti": "JOIN su condizioni multiple",
    "storia": "Ultima prova. Ogni sospettato ha dichiarato dove si trovava alle 23:40. Le celle telefoniche dicono dove si trovava davvero il suo cellulare. «Se i due luoghi non coincidono, quella persona ha mentito. E ha mentito proprio all'ora del delitto».",
    "obiettivo": "Trova la persona il cui <b>luogo dichiarato</b> (<code>dichiarazioni.luogo</code>) è <b>diverso</b> dal luogo registrato dalla cella (<code>celle.luogo_cella</code>) <b>alle 23:40</b>. Inserisci il <b>cognome</b>.",
    "indizi": [
     "Unisci le tre tabelle: <code>persone p JOIN dichiarazioni d ON d.persona_id = p.id JOIN celle c ON c.persona_id = p.id</code>.",
     "Considera solo l'ora del delitto: <code>c.ora = '23:40'</code>.",
     "Cerca la discrepanza: <code>d.luogo &lt;&gt; c.luogo_cella</code>."
    ],
    "placeholder": "Cognome del colpevole",
    "setup": "\n          CREATE TABLE persone (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);\n          CREATE TABLE dichiarazioni (id INTEGER PRIMARY KEY, persona_id INTEGER, luogo TEXT);\n          CREATE TABLE celle (id INTEGER PRIMARY KEY, persona_id INTEGER, ora TEXT, luogo_cella TEXT);\n          INSERT INTO persone VALUES\n            (1,'Ettore Montefiori','vittima'),(2,'Giulia Ferrara','ex moglie'),(3,'Davide Costa','socio'),\n            (4,'Marta Bellini','commessa'),(5,'Roberto Sala','antiquario rivale'),(6,'Livia Conti','vicina'),(7,'Paolo Gentile','cliente');\n          INSERT INTO dichiarazioni VALUES\n            (1,2,'Casa'),(2,3,'Casa'),(3,5,'Hotel Centrale'),(4,6,'Casa'),(5,7,'Cinema');\n          INSERT INTO celle VALUES\n            (1,2,'23:40','Casa'),(2,3,'23:40','Via Aurora (negozio)'),(3,5,'23:40','Hotel Centrale'),\n            (4,6,'23:40','Casa'),(5,7,'23:40','Cinema'),\n            (6,5,'22:30','Via Aurora (negozio)'),(7,3,'21:00','Casa'),(8,2,'21:00','Via Roma');",
    "id": 15,
    "risposte": [
     "14ef9e031d28582dab96b8215cd8e88e740579acd16b228163af3e7f2a749ac0",
     "24d9141ca8245c0db3473faadd5d8b579c791e838940ac7c8281055131705d86"
    ]
   }
  ]
 }
];
