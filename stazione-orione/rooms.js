// FILE GENERATO da dev/build.js — non modificare a mano.
const GAME = {
 "id": "stazione-orione",
 "slug": "stazione-orione",
 "genere": "Fantascienza · Escape room",
 "descrizione": "Anno 2147: un guasto al reattore ha sigillato la stazione spaziale. Sblocca i moduli interrogando i database di bordo e raggiungi la capsula di salvataggio.",
 "titolo": "Stazione Orione",
 "logo": "🚀 STAZIONE ORIONE",
 "tema": "scifi",
 "storageKey": "sql-escape-room-orione-v1",
 "premessa": "Anno 2147. Sei l'ingegnere di bordo della stazione Orione. Un guasto al reattore ha fatto scattare la quarantena e il computer di bordo, ORION, ha sigillato ogni modulo. Hai poco tempo: per raggiungere una capsula di salvataggio devi sbloccare i moduli uno alla volta, interrogando i database di bordo.",
 "startLabel": "Avvia la sequenza di fuga",
 "fine": {
  "tag": "Evacuazione completata",
  "titolo": "🛰 Capsula Gamma in orbita!",
  "testo": "Il computer ORION ha riconosciuto l'unica capsula davvero funzionante: pronta, ancorata a un modulo pressurizzato e con il serbatoio carico. I motori si accendono, la stazione si allontana alle tue spalle e il reattore si spegne in un lampo silenzioso."
 }
};
const LEVELS = [
 {
  "id": 1,
  "nome": "Il Modulo Abitativo",
  "concetti": "SELECT · WHERE · ORDER BY · LIMIT/OFFSET · LIKE · IN · BETWEEN · NULL",
  "intro": "Le luci d'emergenza sono rosse e il computer ripete l'allarme. Parti dagli alloggi: filtra i dati di bordo per trovare i primi codici.",
  "rooms": [
   {
    "nome": "Il Corridoio d'Ingresso",
    "concetti": "SELECT · WHERE · AND",
    "storia": "Il portello alle tue spalle si chiude con un sibilo. Il pannello di controllo mostra tutte le porte del modulo: solo una è <b>bloccata</b> ma accessibile al tuo livello di autorizzazione (<b>2 o inferiore</b>). È quella che il computer aprirà con il suo codice.",
    "obiettivo": "Trova la porta con <code>stato = 'bloccata'</code> e <code>livello_accesso</code> <b>minore o uguale a 2</b>. Il suo <code>codice</code> è la chiave.",
    "indizi": [
     "Vedi tutte le porte con <code>SELECT * FROM porte;</code>.",
     "Filtra lo stato: <code>WHERE stato = 'bloccata'</code>.",
     "Aggiungi <code>AND livello_accesso &lt;= 2</code>."
    ],
    "placeholder": "Codice porta",
    "setup": "\n          CREATE TABLE porte (id INTEGER PRIMARY KEY, nome TEXT, stato TEXT, livello_accesso INTEGER, codice TEXT);\n          INSERT INTO porte VALUES\n            (1,'Portello A','aperta',1,'1204'),\n            (2,'Portello B','bloccata',4,'8855'),\n            (3,'Portello C','bloccata',2,'7391'),\n            (4,'Portello D','aperta',2,'5520'),\n            (5,'Portello E','bloccata',5,'3017'),\n            (6,'Portello F','aperta',3,'9942');",
    "id": 1,
    "risposte": [
     "b770a100e4986f4e725d6319d9a4509b2a62b0b23cae800a0652d9234b63e243"
    ]
   },
   {
    "nome": "La Mensa",
    "concetti": "ORDER BY · LIMIT · WHERE",
    "storia": "Nella mensa un frigorifero a cella è sigillato. La serratura chiede il nome dell'articolo <b>quasi esaurito</b>: quello con la scorta più bassa, ma ancora disponibile. Ciò che è già a zero non conta.",
    "obiettivo": "Trova l'<b>articolo</b> con la <b>quantità più bassa</b> tra quelli con <b>quantità maggiore di 0</b>.",
    "indizi": [
     "Escludi gli esauriti: <code>WHERE quantita &gt; 0</code>.",
     "Ordina in modo crescente: <code>ORDER BY quantita ASC</code>.",
     "<code>LIMIT 1</code> per il primo."
    ],
    "placeholder": "Articolo",
    "setup": "\n          CREATE TABLE scorte (id INTEGER PRIMARY KEY, articolo TEXT, quantita INTEGER, unita TEXT);\n          INSERT INTO scorte VALUES\n            (1,'Acqua',480,'litri'),(2,'Barretta proteica',120,'pezzi'),(3,'Caffè',3,'kg'),\n            (4,'Zucchero',0,'kg'),(5,'Sale',0,'kg'),(6,'Tè',14,'kg'),(7,'Zuppa liofilizzata',60,'buste');",
    "id": 2,
    "risposte": [
     "60a87ce316377a3240d1d01bcb6ea9d8e643c1890c1c7e080a7fbee2f620acdd"
    ]
   },
   {
    "nome": "Il Diario di Bordo",
    "concetti": "LIKE · IN · AND",
    "storia": "Il diario di bordo registra ogni anomalia. «Cerca la perdita di pressione grave: quella segnalata come alta o critica. Il settore indicato è dove la paratia di emergenza si è chiusa».",
    "obiettivo": "Trova il <b>settore</b> del messaggio che <b>contiene «perdita»</b> con gravità <b>alta o critica</b>.",
    "indizi": [
     "Cerca nel testo: <code>messaggio LIKE '%perdita%'</code>.",
     "Gravità tra più valori: <code>gravita IN ('alta', 'critica')</code>.",
     "Combina con <code>AND</code> e seleziona <code>settore</code>."
    ],
    "placeholder": "Settore",
    "setup": "\n          CREATE TABLE log_bordo (id INTEGER PRIMARY KEY, ora TEXT, settore TEXT, messaggio TEXT, gravita TEXT);\n          INSERT INTO log_bordo VALUES\n            (1,'02:10','A1','Piccola perdita d''olio nel compressore','bassa'),\n            (2,'03:45','B2','Perdita di refrigerante sotto controllo','media'),\n            (3,'04:20','D4','Perdita di pressione nella paratia','critica'),\n            (4,'04:55','E5','Aumento anomalo di temperatura','critica'),\n            (5,'05:30','C3','Vibrazioni nel giroscopio','alta');",
    "id": 3,
    "risposte": [
     "3d8a6b57999afa8bd4d6949732a05b92742ca7cc3dfd1d5b4511026a2d4fcd7a"
    ]
   },
   {
    "nome": "I Sensori d'Ossigeno",
    "concetti": "BETWEEN · <> · AND",
    "storia": "I sensori d'ossigeno dei moduli segnalano valori preoccupanti. «Cerca un modulo con ossigeno tra 15 e 18 (zona rischiosa ma ancora respirabile). La Serra l'ho già controllata: ignorala».",
    "obiettivo": "Trova il <b>modulo</b> con sensore di tipo <b>ossigeno</b>, valore <b>tra 15 e 18</b> (estremi inclusi), diverso da <b>Serra</b>.",
    "indizi": [
     "Filtra il tipo: <code>tipo = 'ossigeno'</code>.",
     "Intervallo: <code>valore BETWEEN 15 AND 18</code>.",
     "Escludi la Serra con <code>modulo &lt;&gt; 'Serra'</code>."
    ],
    "placeholder": "Modulo",
    "setup": "\n          CREATE TABLE sensori (id INTEGER PRIMARY KEY, modulo TEXT, tipo TEXT, valore REAL, ora TEXT);\n          INSERT INTO sensori VALUES\n            (1,'Serra','ossigeno',16.5,'06:00'),\n            (2,'Laboratorio','ossigeno',17.2,'06:00'),\n            (3,'Mensa','ossigeno',20.9,'06:00'),\n            (4,'Hangar','ossigeno',14.1,'06:00'),\n            (5,'Laboratorio','temperatura',16.0,'06:00');",
    "id": 4,
    "risposte": [
     "5b0948c0a851b60159eae8a72ee5d1662d8c0d21183d6f35c98b65f129b6c432"
    ]
   },
   {
    "nome": "Il Registro dell'Equipaggio",
    "concetti": "ORDER BY · LIMIT/OFFSET · IS NOT NULL",
    "storia": "Per sbloccare il ponte servono le credenziali del terzo ufficiale più anziano <b>con badge attivo</b>. Chi ha il badge vuoto (<code>NULL</code>) è stato disattivato dal sistema e non conta.",
    "obiettivo": "Fra chi ha un <b>badge</b> (non <code>NULL</code>), trova il <b>terzo</b> per anzianità (<code>anni_servizio</code> più alti). Il codice è il suo <b>cognome</b>.",
    "indizi": [
     "Escludi i disattivati: <code>WHERE badge IS NOT NULL</code>.",
     "Ordina per anzianità decrescente: <code>ORDER BY anni_servizio DESC</code>.",
     "Per il terzo: <code>LIMIT 1 OFFSET 2</code>."
    ],
    "placeholder": "Cognome",
    "setup": "\n          CREATE TABLE equipaggio (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT, anni_servizio INTEGER, badge TEXT);\n          INSERT INTO equipaggio VALUES\n            (1,'Wei Chen','Comandante',25,'B1'),\n            (2,'Luis Ibarra','Medico',22,NULL),\n            (3,'Ada Okafor','Pilota',19,'B3'),\n            (4,'Ana Novak','Ingegnere',17,'B4'),\n            (5,'Marco Rossi','Tecnico',14,'B5'),\n            (6,'Yuki Tanaka','Biologa',12,'B6');",
    "id": 5,
    "risposte": [
     "54f5562435bceae45a31aff8f89d3613298c4c5a662c6934ab5ca75a31ca322b",
     "267f993578ee7d9f29a1b4b5196cb2e4c1ebd637ce2710d60f3333538801977e"
    ]
   }
  ]
 },
 {
  "id": 2,
  "nome": "La Sala Macchine",
  "concetti": "COUNT · SUM · AVG · MIN/MAX · GROUP BY · HAVING",
  "intro": "Scendi nella sala macchine. Qui i dati sono migliaia di letture: devi riassumerle con le funzioni aggregate per capire cosa si sta rompendo.",
  "rooms": [
   {
    "nome": "I Pannelli Solari",
    "concetti": "COUNT · WHERE · GROUP BY · HAVING",
    "storia": "I pannelli solari alimentano le paratie. «Cerca l'array con più di 4 pannelli GUASTI. Gli altri hanno pochi guasti: non farti ingannare da chi ha tanti pannelli in totale».",
    "obiettivo": "Trova l'<b>array</b> con <b>più di 4 pannelli guasti</b> (<code>stato = 'guasto'</code>).",
    "indizi": [
     "Prima filtra i guasti con <code>WHERE stato = 'guasto'</code>.",
     "Raggruppa per array: <code>GROUP BY array</code>.",
     "<code>HAVING COUNT(*) &gt; 4</code>."
    ],
    "placeholder": "Array",
    "setup": "CREATE TABLE pannelli (id INTEGER PRIMARY KEY, \"array\" TEXT, stato TEXT);\n                  INSERT INTO pannelli VALUES (1,'Alfa','guasto'),(2,'Alfa','guasto'),(3,'Alfa','guasto'),(4,'Alfa','ok'),(5,'Alfa','ok'),(6,'Alfa','ok'),(7,'Alfa','ok'),(8,'Alfa','ok'),(9,'Beta','guasto'),(10,'Beta','guasto'),(11,'Beta','ok'),(12,'Beta','ok'),(13,'Beta','ok'),(14,'Beta','ok'),(15,'Gamma','guasto'),(16,'Gamma','guasto'),(17,'Gamma','guasto'),(18,'Gamma','guasto'),(19,'Gamma','ok'),(20,'Gamma','ok'),(21,'Gamma','ok'),(22,'Gamma','ok'),(23,'Gamma','ok'),(24,'Gamma','ok'),(25,'Gamma','ok'),(26,'Gamma','ok'),(27,'Delta','guasto'),(28,'Delta','guasto'),(29,'Delta','guasto'),(30,'Delta','guasto'),(31,'Delta','guasto'),(32,'Delta','guasto'),(33,'Delta','ok');",
    "id": 6,
    "risposte": [
     "a704262c796059ff87fb5ed34b6ae37f4e8982f88cea231059a91175ebee6c2d"
    ]
   },
   {
    "nome": "Il Reattore",
    "concetti": "AVG · MAX · GROUP BY · ORDER BY",
    "storia": "Il reattore ha tre nuclei. «Un picco isolato di temperatura non significa nulla. Cerca il nucleo che resta più caldo in MEDIA: è quello che sta davvero andando fuori controllo».",
    "obiettivo": "Trova il <b>nucleo</b> con la <b>temperatura media più alta</b>. Attenzione: il picco singolo più alto è di un altro nucleo.",
    "indizi": [
     "<code>SELECT nucleo, AVG(temperatura), MAX(temperatura) FROM letture GROUP BY nucleo;</code>",
     "Confronta le due colonne: ti interessa la media.",
     "<code>ORDER BY AVG(temperatura) DESC LIMIT 1</code>."
    ],
    "placeholder": "Nucleo",
    "setup": "\n          CREATE TABLE letture (id INTEGER PRIMARY KEY, nucleo TEXT, ora TEXT, temperatura INTEGER);\n          INSERT INTO letture VALUES\n            (1,'N1','01:00',590),(2,'N1','02:00',610),(3,'N1','03:00',600),\n            (4,'N2','01:00',450),(5,'N2','02:00',900),(6,'N2','03:00',420),\n            (7,'N3','01:00',640),(8,'N3','02:00',660),(9,'N3','03:00',650);",
    "id": 7,
    "risposte": [
     "c6e075ddc1eed93470a9e24b859fc1e5e5a450b33866e080cc792cf7f0fd8892"
    ]
   },
   {
    "nome": "Il Deposito Carburante",
    "concetti": "SUM · GROUP BY · ORDER BY",
    "storia": "Il carburante sparisce troppo in fretta. «Non cercare il consumo singolo più alto. Voglio il sistema che in totale ha bruciato più litri: è quello con la perdita».",
    "obiettivo": "Trova il <b>sistema</b> con il <b>totale di litri consumati più alto</b>.",
    "indizi": [
     "<code>SELECT sistema, SUM(litri) FROM consumi GROUP BY sistema;</code>",
     "Controlla anche <code>MAX(litri)</code> per vedere il trucco.",
     "<code>ORDER BY SUM(litri) DESC LIMIT 1</code>."
    ],
    "placeholder": "Sistema",
    "setup": "\n          CREATE TABLE consumi (id INTEGER PRIMARY KEY, sistema TEXT, litri INTEGER, giorno INTEGER);\n          INSERT INTO consumi VALUES\n            (1,'Propulsione',500,1),(2,'Propulsione',450,2),(3,'Propulsione',520,3),\n            (4,'Manovra',800,1),(5,'Manovra',100,2),\n            (6,'Riscaldamento',300,1),(7,'Riscaldamento',310,2),(8,'Riscaldamento',290,3),(9,'Riscaldamento',320,4),\n            (10,'Illuminazione',150,1),(11,'Illuminazione',160,2),(12,'Illuminazione',140,3);",
    "id": 8,
    "risposte": [
     "42aa2ec5d041e4dffa0813c460541828ef86cf792e76d52bcf758ef85e5e5f60"
    ]
   },
   {
    "nome": "L'Hangar",
    "concetti": "COUNT(DISTINCT) · GROUP BY",
    "storia": "Nell'hangar il registro dei voli di servizio. «Mi serve la navetta più 'esplorativa': non quella con più voli, ma quella che ha visitato più destinazioni DIVERSE».",
    "obiettivo": "Trova la <b>navetta</b> con il maggior numero di <b>destinazioni distinte</b>.",
    "indizi": [
     "<code>COUNT(*)</code> conta i voli, non le destinazioni. Usa <code>COUNT(DISTINCT destinazione)</code>.",
     "Raggruppa: <code>GROUP BY navetta</code>.",
     "<code>ORDER BY COUNT(DISTINCT destinazione) DESC LIMIT 1</code>."
    ],
    "placeholder": "Navetta",
    "setup": "\n          CREATE TABLE voli (id INTEGER PRIMARY KEY, navetta TEXT, pilota TEXT, destinazione TEXT);\n          INSERT INTO voli VALUES\n            (1,'Aquila','Okafor','Luna'),(2,'Aquila','Okafor','Luna'),(3,'Aquila','Rossi','Marte'),(4,'Aquila','Okafor','Luna'),\n            (5,'Falco','Chen','Luna'),(6,'Falco','Chen','Marte'),(7,'Falco','Rossi','Cerere'),\n            (8,'Gufo','Tanaka','Luna'),(9,'Gufo','Tanaka','Luna'),(10,'Gufo','Novak','Luna'),(11,'Gufo','Tanaka','Luna'),(12,'Gufo','Novak','Luna');",
    "id": 9,
    "risposte": [
     "9ec9cf883ae57964276ca844b4ceb1e2f84dc3009c3b8fe168d0a813c8e59650"
    ]
   },
   {
    "nome": "Il Magazzino Cargo",
    "concetti": "AVG · COUNT · HAVING",
    "storia": "Le casse del cargo bloccano un condotto. «Servono le categorie pesanti: peso medio sopra i 50 kg, ma solo se hanno almeno 3 casse. Due casse enormi non fanno una categoria».",
    "obiettivo": "Trova la <b>categoria</b> con <b>peso medio superiore a 50 kg</b> e <b>almeno 3 casse</b>.",
    "indizi": [
     "<code>SELECT categoria, AVG(peso_kg), COUNT(*) FROM casse GROUP BY categoria;</code>",
     "Entrambe le condizioni vanno in <code>HAVING</code>.",
     "<code>HAVING AVG(peso_kg) &gt; 50 AND COUNT(*) &gt;= 3</code>."
    ],
    "placeholder": "Categoria",
    "setup": "\n          CREATE TABLE casse (id INTEGER PRIMARY KEY, contenuto TEXT, categoria TEXT, peso_kg INTEGER);\n          INSERT INTO casse VALUES\n            (1,'Saldatrici','Attrezzatura',80),(2,'Trapani','Attrezzatura',60),(3,'Generatore','Attrezzatura',70),\n            (4,'Antibiotici','Medicinali',5),(5,'Bende','Medicinali',8),(6,'Vaccini','Medicinali',6),\n            (7,'Telescopio','Strumenti',120),(8,'Spettrometro','Strumenti',90),\n            (9,'Razioni','Cibo',40),(10,'Acqua','Cibo',45),(11,'Conserve','Cibo',50),(12,'Surgelati','Cibo',52),\n            (13,'Filtri','Ricambi',45),(14,'Valvole','Ricambi',50),(15,'Cavi','Ricambi',40);",
    "id": 10,
    "risposte": [
     "e71c7745c8f9c0045f097a2d4e346a4ac686cd2d994ec88637e988bdf9063a21"
    ]
   }
  ]
 },
 {
  "id": 3,
  "nome": "Il Nucleo del Computer",
  "concetti": "JOIN · LEFT JOIN · più tabelle",
  "intro": "ORION custodisce i dati in tabelle separate, collegate da chiavi. Per raggiungere la capsula devi incrociarle con i JOIN.",
  "rooms": [
   {
    "nome": "Il Registro delle Cabine",
    "concetti": "JOIN",
    "storia": "Per sbloccare i dati del capo ingegnere serve il numero della sua cabina. Le cabine contengono solo l'ID dell'occupante: i nomi e i ruoli sono in un'altra tabella.",
    "obiettivo": "Trova il <b>numero della cabina</b> dell'<b>Ingegnere capo</b> (<code>ruolo = 'Ingegnere capo'</code>), unendo <code>cabine</code> ed <code>equipaggio</code>.",
    "indizi": [
     "<code>FROM cabine c JOIN equipaggio e ON c.equipaggio_id = e.id</code>.",
     "Filtra: <code>WHERE e.ruolo = 'Ingegnere capo'</code>.",
     "Seleziona <code>c.numero</code>."
    ],
    "placeholder": "Numero cabina",
    "setup": "\n          CREATE TABLE equipaggio (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);\n          CREATE TABLE cabine (id INTEGER PRIMARY KEY, numero INTEGER, equipaggio_id INTEGER);\n          INSERT INTO equipaggio VALUES\n            (1,'Wei Chen','Comandante'),(2,'Luis Ibarra','Medico'),(3,'Ada Okafor','Pilota'),\n            (4,'Ana Novak','Ingegnere capo'),(5,'Marco Rossi','Tecnico'),(6,'Yuki Tanaka','Biologa');\n          INSERT INTO cabine VALUES (1,101,1),(2,207,2),(3,150,3),(4,314,4),(5,322,5),(6,410,6);",
    "id": 11,
    "risposte": [
     "6312b768a4170ece786edf253db2622c54627a6ad8994f93a97b3c5d52991a59"
    ]
   },
   {
    "nome": "Il Registro degli Accessi",
    "concetti": "JOIN · WHERE · ORDER BY · LIMIT",
    "storia": "Ogni passaggio dalla porta del reattore viene registrato con l'ID di chi l'ha attraversata. «Chi è stato l'ULTIMO a entrare nel reattore prima del guasto? Voglio il suo cognome».",
    "obiettivo": "Trova il <b>nome</b> di chi ha avuto l'<b>ultimo accesso</b> (ora più tarda) alla porta <b>'Reattore'</b>. Inserisci il <b>cognome</b>.",
    "indizi": [
     "<code>FROM accessi a JOIN equipaggio e ON a.equipaggio_id = e.id</code>.",
     "Filtra la porta: <code>WHERE a.porta = 'Reattore'</code>.",
     "<code>ORDER BY a.ora DESC LIMIT 1</code>."
    ],
    "placeholder": "Cognome",
    "setup": "\n          CREATE TABLE equipaggio (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);\n          CREATE TABLE accessi (id INTEGER PRIMARY KEY, equipaggio_id INTEGER, porta TEXT, ora TEXT);\n          INSERT INTO equipaggio VALUES\n            (1,'Wei Chen','Comandante'),(2,'Luis Ibarra','Medico'),(3,'Ada Okafor','Pilota'),\n            (4,'Ana Novak','Ingegnere capo'),(5,'Marco Rossi','Tecnico'),(6,'Yuki Tanaka','Biologa');\n          INSERT INTO accessi VALUES\n            (1,4,'Reattore','02:10'),(2,3,'Hangar','03:40'),(3,5,'Reattore','04:25'),\n            (4,1,'Ponte','04:50'),(5,6,'Serra','05:05'),(6,4,'Mensa','05:30');",
    "id": 12,
    "risposte": [
     "799e4656bf9afca3daba42f0e9e2dcc694b11e7ed5b2d90d1152b40fd4873119",
     "af69f4dff02fd4247fe88e7bdfdd998f6e6af9f2e985b7be794b31ab1241a2b6"
    ]
   },
   {
    "nome": "Le Bombole d'Ossigeno",
    "concetti": "JOIN · SUM · GROUP BY",
    "storia": "Le bombole di riserva sono distribuite nei moduli. «Non ti serve la bombola più grande: ti serve il modulo con la maggiore riserva TOTALE. Lì potrai respirare più a lungo».",
    "obiettivo": "Trova il <b>nome del modulo</b> con il <b>totale di litri</b> di ossigeno più alto, unendo <code>bombole</code> e <code>moduli</code>.",
    "indizi": [
     "<code>FROM bombole b JOIN moduli m ON b.modulo_id = m.id</code>.",
     "Raggruppa: <code>GROUP BY m.nome</code>, somma: <code>SUM(b.litri)</code>.",
     "<code>ORDER BY SUM(b.litri) DESC LIMIT 1</code>."
    ],
    "placeholder": "Modulo",
    "setup": "\n          CREATE TABLE moduli (id INTEGER PRIMARY KEY, nome TEXT, ponte INTEGER);\n          CREATE TABLE bombole (id INTEGER PRIMARY KEY, modulo_id INTEGER, litri INTEGER);\n          INSERT INTO moduli VALUES (1,'Mensa',1),(2,'Laboratorio',2),(3,'Hangar',3),(4,'Serra',2);\n          INSERT INTO bombole VALUES\n            (1,1,900),(2,1,400),\n            (3,2,1500),\n            (4,3,600),(5,3,700),(6,3,500),\n            (7,4,300),(8,4,200);",
    "id": 13,
    "risposte": [
     "9fcd3bd0072dbb4fb2d7a170ea8b8f56c6ad89d09dd121b4bad7cc9b370ddb34"
    ]
   },
   {
    "nome": "I Moduli Isolati",
    "concetti": "LEFT JOIN · IS NULL",
    "storia": "Alcuni moduli non hanno nessun sensore e sono quindi 'ciechi' per ORION: non può sapere cosa succede dentro. «Escludi i moduli dismessi: quelli sono vuoti per ovvi motivi. Cerco quello ancora in uso ma senza sensori».",
    "obiettivo": "Trova il <b>modulo</b> senza <b>nessun sensore</b> che <b>non sia dismesso</b> (<code>dismesso = 0</code>).",
    "indizi": [
     "Un <code>JOIN</code> normale scarta i moduli senza sensori. Usa <code>FROM moduli m LEFT JOIN sensori s ON s.modulo_id = m.id</code>.",
     "Senza corrispondenza: <code>WHERE s.id IS NULL</code>.",
     "Escludi i dismessi: <code>AND m.dismesso = 0</code>."
    ],
    "placeholder": "Modulo",
    "setup": "\n          CREATE TABLE moduli (id INTEGER PRIMARY KEY, nome TEXT, dismesso INTEGER);\n          CREATE TABLE sensori (id INTEGER PRIMARY KEY, modulo_id INTEGER, tipo TEXT);\n          INSERT INTO moduli VALUES (1,'Mensa',0),(2,'Laboratorio',0),(3,'Hangar',0),(4,'Osservatorio',0),(5,'Deposito Vecchio',1);\n          INSERT INTO sensori VALUES (1,1,'ossigeno'),(2,1,'temperatura'),(3,2,'ossigeno'),(4,3,'pressione'),(5,3,'ossigeno');",
    "id": 14,
    "risposte": [
     "f445dda747efff84201da0c02d28dc2c989610788168af61db71331355794128"
    ]
   },
   {
    "nome": "Il Computer ORION",
    "concetti": "JOIN su 3 tabelle",
    "storia": "ORION ha infine accettato di collaborare. «Esiste una sola capsula di salvataggio davvero utilizzabile: deve essere PRONTA, ancorata a un modulo ancora PRESSURIZZATO e con il serbatoio carico ALMENO al 50%. Se la trovi, ti lascio andare».",
    "obiettivo": "Trova la <b>capsula</b> con <code>stato = 'pronta'</code>, collegata a un <b>modulo pressurizzato</b> (<code>pressurizzato = 1</code>) e con <b>livello serbatoio ≥ 50</b>. Inserisci il suo <b>nome</b>.",
    "indizi": [
     "Tre tabelle: <code>capsule c JOIN moduli m ON c.modulo_id = m.id JOIN serbatoi s ON s.capsula_id = c.id</code>.",
     "Condizioni su capsula e modulo: <code>c.stato = 'pronta' AND m.pressurizzato = 1</code>.",
     "Aggiungi <code>AND s.livello &gt;= 50</code>."
    ],
    "placeholder": "Nome della capsula",
    "setup": "\n          CREATE TABLE moduli (id INTEGER PRIMARY KEY, nome TEXT, pressurizzato INTEGER);\n          CREATE TABLE capsule (id INTEGER PRIMARY KEY, nome TEXT, stato TEXT, modulo_id INTEGER);\n          CREATE TABLE serbatoi (capsula_id INTEGER, livello INTEGER);\n          INSERT INTO moduli VALUES (1,'Hangar Nord',1),(2,'Hangar Sud',1),(3,'Hangar Est',0);\n          INSERT INTO capsule VALUES\n            (1,'Alfa','pronta',1),(2,'Beta','guasta',1),(3,'Gamma','pronta',2),(4,'Delta','pronta',3),(5,'Epsilon','pronta',2);\n          INSERT INTO serbatoi VALUES (1,20),(2,80),(3,75),(4,90),(5,40);",
    "id": 15,
    "risposte": [
     "6c374f759348cbadaee1075cab5d35366ac1d6c657e27bcbc75d63e1b3b9d331",
     "f8d5dc3c478ca3685a97847c89b5c825fd40b62c0097d53286d270e2db9a3f38"
    ]
   }
  ]
 }
];
