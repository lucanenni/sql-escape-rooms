// FILE GENERATO da dev/build.js — non modificare a mano.
const GAME = {
 "id": "villa-nera",
 "slug": "villa-nera",
 "genere": "Gotico · Escape room",
 "descrizione": "Sei chiuso in una villa maledetta: biblioteca, cantina, laboratorio segreto. Ogni stanza nasconde un codice nel suo database.",
 "titolo": "Il Mistero di Villa Nera",
 "logo": "🗝 VILLA NERA",
 "tema": "gotico",
 "storageKey": "sql-escape-room-v2",
 "premessa": "Sei rimasto chiuso in una villa maledetta: per uscire devi risolvere gli enigmi di ogni stanza.",
 "startLabel": "Entra nella villa",
 "fine": {
  "tag": "Fuga completata",
  "titolo": "🎉 Sei libero!",
  "testo": "Hai interrogato biblioteche, registri, cantine, tabelle di sicurezza e archivi. Il portone di Villa Nera si spalanca e l'aria della notte ti accoglie."
 }
};
const LEVELS = [
 {
  "id": 1,
  "nome": "Il Piano Terra",
  "concetti": "SELECT · WHERE · ORDER BY · LIMIT · LIKE",
  "intro": "Le prime stanze della villa. Impara a interrogare una tabella: scegli colonne, filtra righe, ordina i risultati.",
  "rooms": [
   {
    "id": 1,
    "nome": "La Biblioteca",
    "concetti": "SELECT · WHERE · AND",
    "storia": "La porta della villa si chiude alle tue spalle con un tonfo. Sei nella biblioteca di Villa Nera, illuminata solo da una lampada a olio. Una scritta incisa sul camino recita: «Il sapere antico custodisce la chiave. Cerca il libro dal dorso rosso scritto prima che il 1700 iniziasse a finire».",
    "obiettivo": "Trova il libro con il dorso <b>rosso</b> pubblicato <b>prima del 1700</b>. La sua <code>parola_segreta</code> è il codice del lucchetto.",
    "indizi": [
     "Guarda la struttura della tabella <code>libri</code> qui a fianco: con <code>SELECT * FROM libri;</code> li vedi tutti.",
     "Per filtrare le righe usa <code>WHERE colonna = 'valore'</code>. Per i numeri puoi usare <code>&lt;</code> e <code>&gt;</code>.",
     "Combina le due condizioni con <code>AND</code>: <code>WHERE colore = 'rosso' AND anno &lt; 1700</code>."
    ],
    "placeholder": "Parola segreta",
    "setup": "\n          CREATE TABLE libri (id INTEGER PRIMARY KEY, titolo TEXT, autore TEXT, anno INTEGER, colore TEXT, parola_segreta TEXT);\n          INSERT INTO libri VALUES\n            (1,'Il nome della rosa','Umberto Eco',1980,'rosso','OMBRA'),\n            (2,'Dialogo sopra i due massimi sistemi','Galileo Galilei',1632,'rosso','LUNA'),\n            (3,'Il conte di Montecristo','Alexandre Dumas',1844,'rosso','FERRO'),\n            (4,'Divina Commedia','Dante Alighieri',1320,'verde','STELLA'),\n            (5,'Orlando Furioso','Ludovico Ariosto',1516,'blu','NEBBIA'),\n            (6,'I promessi sposi','Alessandro Manzoni',1827,'blu','CORVO'),\n            (7,'Il Principe','Niccolò Machiavelli',1532,'nero','VELENO'),\n            (8,'Decameron','Giovanni Boccaccio',1353,'verde','PESTE'),\n            (9,'Pinocchio','Carlo Collodi',1883,'rosso','LEGNO'),\n            (10,'Il Gattopardo','Giuseppe T. di Lampedusa',1958,'nero','SOLE'),\n            (11,'Ultime lettere di Jacopo Ortis','Ugo Foscolo',1802,'blu','TOMBA'),\n            (12,'La Gerusalemme liberata','Torquato Tasso',1581,'verde','ASSEDIO');",
    "risposte": [
     "b020d4df3db144ab2275b7f85fdb0f354b44cfbd5af9269a54b5c602ae8636b2"
    ]
   },
   {
    "id": 2,
    "nome": "Il Corridoio dei Ritratti",
    "concetti": "IN · BETWEEN · =",
    "storia": "Un lungo corridoio tappezzato di ritratti ti fissa con occhi dipinti. Una targa recita: «Cerca nell'ala Nord la persona ritratta da Tiepolo o da Canaletto tra il 1750 e il 1800: il suo nome apre la porta».",
    "obiettivo": "Trova il <b>soggetto</b> del ritratto esposto nella sala <b>Nord</b>, dipinto da <b>Tiepolo o Canaletto</b> tra il <b>1750 e il 1800</b> (estremi inclusi). Inserisci il nome del soggetto.",
    "indizi": [
     "Per più valori ammessi usa <code>IN</code>: <code>pittore IN ('Tiepolo', 'Canaletto')</code>.",
     "Per un intervallo usa <code>BETWEEN</code>: <code>anno BETWEEN 1750 AND 1800</code> (include gli estremi).",
     "Unisci tutto con <code>AND</code> e aggiungi <code>sala = 'Nord'</code>."
    ],
    "placeholder": "Nome del soggetto",
    "setup": "\n          CREATE TABLE ritratti (id INTEGER PRIMARY KEY, soggetto TEXT, pittore TEXT, anno INTEGER, sala TEXT);\n          INSERT INTO ritratti VALUES\n            (1,'Contessa Aurelia','Tiepolo',1762,'Nord'),\n            (2,'Barone Ottavio','Tiepolo',1741,'Nord'),\n            (3,'Dama con ventaglio','Canaletto',1771,'Est'),\n            (4,'Conte Leopoldo','Canaletto',1788,'Sud'),\n            (5,'Gentiluomo in nero','Goya',1790,'Nord'),\n            (6,'Fanciulla con rosa','Tiepolo',1805,'Nord'),\n            (7,'Il Cavaliere','Canaletto',1749,'Nord'),\n            (8,'Vescovo Anselmo','Goya',1766,'Est');",
    "risposte": [
     "eac24de55ce01af5d4dc72245a4dd3521954ebffea5fe2584abed9433e7cb263",
     "098b0515d9efe52b97a2d12774b9221b3ae37f4d06d23b9bab60f245206af330"
    ]
   },
   {
    "id": 3,
    "nome": "Il Salone degli Ospiti",
    "concetti": "ORDER BY · LIMIT · IS NOT NULL",
    "storia": "Dietro la libreria si apre un passaggio verso il salone. Sul leggio c'è il registro della serata dell'omicidio. Un biglietto: «Il numero della stanza dell'ultima persona che ha lasciato la villa apre la porta successiva».",
    "obiettivo": "Scopri chi è stato l'<b>ultimo ospite ad andarsene</b> (ora di partenza più tarda) e inserisci il <b>numero della sua stanza</b>. Attenzione: chi non è ancora partito ha la partenza vuota (<code>NULL</code>).",
    "indizi": [
     "Ordina i risultati con <code>ORDER BY partenza DESC</code> per avere prima le ore più tarde.",
     "Per prendere solo la prima riga aggiungi <code>LIMIT 1</code> in fondo.",
     "Per escludere chi non è partito: <code>WHERE partenza IS NOT NULL</code> (non <code>= NULL</code>!)."
    ],
    "placeholder": "Numero stanza",
    "setup": "\n          CREATE TABLE ospiti (id INTEGER PRIMARY KEY, nome TEXT, stanza INTEGER, arrivo TEXT, partenza TEXT);\n          INSERT INTO ospiti VALUES\n            (1,'Contessa Bianchi',13,'18:30','23:45'),\n            (2,'Barone Rossi',7,'19:00','22:10'),\n            (3,'Signora Verdi',4,'19:15','23:05'),\n            (4,'Dott. Marini',9,'20:00',NULL),\n            (5,'Cavaliere Neri',21,'20:30','23:58'),\n            (6,'Miss Gray',16,'21:00','23:20'),\n            (7,'Ing. Colombo',2,'21:10','22:50');",
    "risposte": [
     "06dd32393a6cda43c6d688fb887f1bd2269876319484c89b4aacf283377d93ea"
    ]
   },
   {
    "id": 4,
    "nome": "La Cucina",
    "concetti": "ORDER BY · LIMIT/OFFSET · NULL",
    "storia": "Una cucina di rame e piastrelle bianche. Sulla porta della dispensa un cartello: «Ciò che scade prima va usato per primo, ma il segreto sta nel SECONDO prodotto in scadenza. Ignora ciò che è già scaduto o che non scade mai».",
    "obiettivo": "Tra i prodotti con scadenza <b>dal 2026-10-01 in poi</b> (le scadenze vuote non contano), trova il <b>secondo</b> in ordine di scadenza (il più vicino è il primo). Il suo nome è il codice.",
    "indizi": [
     "Filtra con <code>WHERE scadenza &gt;= '2026-10-01'</code>: i <code>NULL</code> vengono scartati da soli.",
     "Ordina con <code>ORDER BY scadenza ASC</code>.",
     "Per saltare il primo e prendere il secondo: <code>LIMIT 1 OFFSET 1</code>."
    ],
    "placeholder": "Prodotto",
    "setup": "\n          CREATE TABLE dispensa (id INTEGER PRIMARY KEY, prodotto TEXT, scadenza TEXT, quantita INTEGER);\n          INSERT INTO dispensa VALUES\n            (1,'Farina','2026-09-20',3),(2,'Latte','2026-10-05',6),(3,'Uova','2026-10-03',12),\n            (4,'Burro','2026-10-20',2),(5,'Miele',NULL,4),(6,'Zucchero','2027-03-01',5),(7,'Aceto','2026-12-10',2);",
    "risposte": [
     "03ca97b7bdc90470951a02d28551258f0b86c33d77e45fc71703ec6f73d57a46"
    ]
   },
   {
    "id": 5,
    "nome": "La Sala da Pranzo",
    "concetti": "LIKE · <> · più condizioni",
    "storia": "Sul lungo tavolo c'è ancora la cena intatta. Sotto un piatto, un mazzo di biglietti scambiati dagli invitati durante la serata. Uno solo parla del veleno ed è stato scritto da qualcuno che non è il maggiordomo, a serata inoltrata. Il numero del tavolo scritto su quel biglietto è la chiave.",
    "obiettivo": "Trova il biglietto che <b>contiene la parola «veleno»</b>, scritto <b>dopo le 21:00</b> da un mittente <b>diverso dal Maggiordomo</b>. Il codice è il suo <code>numero_tavolo</code>.",
    "indizi": [
     "Per cercare una parola dentro un testo: <code>WHERE testo LIKE '%veleno%'</code> (il <code>%</code> vuol dire «qualsiasi cosa»).",
     "Per escludere un valore usa <code>&lt;&gt;</code> (oppure <code>!=</code>): <code>mittente &lt;&gt; 'Maggiordomo'</code>.",
     "Metti tutto insieme con <code>AND</code>: <code>testo LIKE '%veleno%' AND ora &gt; '21:00' AND mittente &lt;&gt; 'Maggiordomo'</code>."
    ],
    "placeholder": "Numero tavolo",
    "setup": "\n          CREATE TABLE biglietti (id INTEGER PRIMARY KEY, mittente TEXT, destinatario TEXT, testo TEXT, ora TEXT, numero_tavolo INTEGER);\n          INSERT INTO biglietti VALUES\n            (1,'Contessa Bianchi','Barone Rossi','Il vino stasera ha un sapore strano','20:10',3),\n            (2,'Barone Rossi','Contessa Bianchi','Non toccare il veleno per topi in cantina','19:45',8),\n            (3,'Maggiordomo','Cuoca','Ho nascosto il veleno nella dispensa','21:30',5),\n            (4,'Miss Gray','Dott. Marini','Incontriamoci in giardino','21:15',11),\n            (5,'Signora Verdi','Contessa Bianchi','Quel veleno non era destinato a te','22:05',6),\n            (6,'Dott. Marini','Miss Gray','Porta con te la chiave','21:50',9),\n            (7,'Cuoca','Maggiordomo','La zuppa è pronta','20:00',2);",
    "risposte": [
     "d411aa2e0e7636facef707dc436ac3a582aa84e553bee89fda9ba969c0b4f8fc"
    ]
   }
  ]
 },
 {
  "id": 2,
  "nome": "I Sotterranei",
  "concetti": "COUNT · SUM · AVG · MIN/MAX · GROUP BY · HAVING",
  "intro": "Scendi nei sotterranei. Qui non basta leggere le righe: devi riassumerle. Usa le funzioni aggregate e raggruppa i dati.",
  "rooms": [
   {
    "id": 6,
    "nome": "La Cantina",
    "concetti": "COUNT · GROUP BY · HAVING",
    "storia": "Scendi nella cantina fredda e umida. Centinaia di bottiglie riposano sugli scaffali. Su una botte è inciso: «La combinazione è l'annata che il padrone amava di più: ne possiede più di dieci bottiglie, e nessun'altra annata ci si avvicina».",
    "obiettivo": "Trova l'<b>annata</b> di cui esistono <b>più di 10 bottiglie</b> e inseriscila come codice.",
    "indizi": [
     "Ogni riga è una bottiglia. Devi <i>raggruppare</i> per annata: <code>GROUP BY annata</code>.",
     "Con <code>SELECT annata, COUNT(*) FROM bottiglie GROUP BY annata;</code> vedi quante bottiglie ci sono per annata.",
     "Per filtrare sui gruppi si usa <code>HAVING COUNT(*) &gt; 10</code> (non <code>WHERE</code>)."
    ],
    "placeholder": "Annata",
    "setup": "CREATE TABLE bottiglie (id INTEGER PRIMARY KEY, annata INTEGER, regione TEXT, scaffale TEXT);\n                  INSERT INTO bottiglie VALUES (1,1985,'Piemonte','S2'),(2,1985,'Veneto','S3'),(3,1985,'Toscana','S4'),(4,1985,'Piemonte','S5'),(5,1990,'Veneto','S6'),(6,1990,'Toscana','S1'),(7,1990,'Piemonte','S2'),(8,1990,'Veneto','S3'),(9,1990,'Toscana','S4'),(10,1990,'Piemonte','S5'),(11,1990,'Veneto','S6'),(12,1998,'Toscana','S1'),(13,1998,'Piemonte','S2'),(14,1998,'Veneto','S3'),(15,2003,'Toscana','S4'),(16,2003,'Piemonte','S5'),(17,2003,'Veneto','S6'),(18,2003,'Toscana','S1'),(19,2003,'Piemonte','S2'),(20,2003,'Veneto','S3'),(21,2003,'Toscana','S4'),(22,2003,'Piemonte','S5'),(23,2003,'Veneto','S6'),(24,2003,'Toscana','S1'),(25,2003,'Piemonte','S2'),(26,2003,'Veneto','S3'),(27,2010,'Toscana','S4'),(28,2010,'Piemonte','S5'),(29,2010,'Veneto','S6'),(30,2010,'Toscana','S1'),(31,2010,'Piemonte','S2');",
    "risposte": [
     "9bb6aac6382abd5f150497f52ce3280198b5d3bbf71a99fef84d5de239368cf3"
    ]
   },
   {
    "id": 7,
    "nome": "Il Registro delle Visite",
    "concetti": "COUNT(DISTINCT) · GROUP BY",
    "storia": "Un grosso registro polveroso è appoggiato su un leggio. Il guardiano ha scritto: «Non conta quante volte si timbra, ma in quanti GIORNI DIVERSI. Chi è venuto in più giorni diversi è colui che cerchi».",
    "obiettivo": "Trova l'<b>ospite</b> che ha visitato la villa in più <b>giorni distinti</b>. Attenzione: alcuni ospiti hanno più righe nello stesso giorno.",
    "indizi": [
     "Con <code>COUNT(*)</code> conti le righe, non i giorni. Prova <code>COUNT(DISTINCT giorno)</code>.",
     "Raggruppa per ospite: <code>SELECT ospite, COUNT(DISTINCT giorno) FROM visite GROUP BY ospite;</code>",
     "Ordina il conteggio in modo decrescente e prendi la prima riga: <code>ORDER BY COUNT(DISTINCT giorno) DESC LIMIT 1</code>."
    ],
    "placeholder": "Nome dell'ospite",
    "setup": "\n          CREATE TABLE visite (id INTEGER PRIMARY KEY, ospite TEXT, giorno TEXT, durata_min INTEGER);\n          INSERT INTO visite VALUES\n            (1,'Ada','2026-10-01',30),(2,'Ada','2026-10-01',20),(3,'Ada','2026-10-02',45),\n            (4,'Bruno','2026-10-01',15),(5,'Bruno','2026-10-02',25),(6,'Bruno','2026-10-03',35),\n            (7,'Carla','2026-10-01',10),(8,'Carla','2026-10-01',12),(9,'Carla','2026-10-01',8),\n            (10,'Carla','2026-10-01',20),(11,'Carla','2026-10-02',15),\n            (12,'Dino','2026-10-04',60);",
    "risposte": [
     "655fbd104be028584074a83ad4445169b682cc9651025fec1d14b3ee9eb16a1b"
    ]
   },
   {
    "id": 8,
    "nome": "Il Libro Mastro",
    "concetti": "SUM · GROUP BY · ORDER BY",
    "storia": "Un corridoio di pietra conduce a un ufficio segreto. Sulla scrivania, il libro mastro della villa: ogni spesa degli ultimi mesi. Il padrone scrisse in margine: «Non cercare la spesa singola più grande: il denaro scompare a piccole dosi. Il codice è la categoria che ha pesato di più in totale».",
    "obiettivo": "Trova la <b>categoria</b> con la <b>somma totale</b> delle spese più alta. Attenzione: non è la categoria con la singola spesa più alta!",
    "indizi": [
     "Somma gli importi per categoria: <code>SELECT categoria, SUM(importo) FROM spese GROUP BY categoria;</code>",
     "Ordina i totali dal più grande: dai un nome alla somma (<code>SUM(importo) AS totale</code>) e usa <code>ORDER BY totale DESC</code>.",
     "Aggiungi <code>LIMIT 1</code> per tenere solo la prima categoria."
    ],
    "placeholder": "Categoria",
    "setup": "\n          CREATE TABLE spese (id INTEGER PRIMARY KEY, categoria TEXT, importo INTEGER, mese TEXT);\n          INSERT INTO spese VALUES\n            (1,'Vino',1200,'gen'),(2,'Vino',600,'feb'),(3,'Vino',2600,'mar'),\n            (4,'Cibo',800,'gen'),(5,'Cibo',700,'feb'),(6,'Cibo',650,'mar'),(7,'Cibo',900,'apr'),\n            (8,'Manutenzione',3000,'feb'),(9,'Manutenzione',1500,'apr'),\n            (10,'Giardino',400,'gen'),(11,'Giardino',300,'feb'),(12,'Giardino',500,'mar'),(13,'Giardino',250,'apr'),\n            (14,'Personale',3500,'gen'),(15,'Personale',500,'mar');",
    "risposte": [
     "85f92e63781a1cae2ca0214e44c00e77a056341331ae74c83513d902187603ca"
    ]
   },
   {
    "id": 9,
    "nome": "Il Deposito dei Gioielli",
    "concetti": "MIN · MAX · GROUP BY",
    "storia": "Una cassaforte a muro, già aperta, rivela un deposito di gioielli. Un foglietto: «Il materiale più nobile non è quello con il pezzo più costoso, ma quello in cui anche il pezzo più economico vale più di tutti gli altri».",
    "obiettivo": "Trova il <b>materiale</b> il cui pezzo <b>meno prezioso</b> (<code>MIN(valore)</code>) vale <b>più</b> del pezzo meno prezioso di ogni altro materiale.",
    "indizi": [
     "Raggruppa per materiale: <code>SELECT materiale, MIN(valore), MAX(valore) FROM gioielli GROUP BY materiale;</code>",
     "Guarda la colonna del minimo: non è quella del massimo!",
     "<code>ORDER BY MIN(valore) DESC LIMIT 1</code> ti dà il materiale cercato."
    ],
    "placeholder": "Materiale",
    "setup": "\n          CREATE TABLE gioielli (id INTEGER PRIMARY KEY, tipo TEXT, materiale TEXT, peso_g REAL, valore INTEGER);\n          INSERT INTO gioielli VALUES\n            (1,'anello','oro',8,500),(2,'collana','oro',25,1200),(3,'corona','oro',90,3000),\n            (4,'spilla','argento',10,100),(5,'bracciale','argento',30,200),(6,'collana','argento',40,350),\n            (7,'anello','diamante',5,900),(8,'diadema','diamante',20,7000),\n            (9,'anello','rubino',6,4000),(10,'spilla','rubino',7,4100),\n            (11,'collana','perla',15,50),(12,'orecchini','perla',4,60),(13,'bracciale','perla',20,80);",
    "risposte": [
     "5b6b9574e4be1d6f3190f1077b477a1cbb9c84be2e1c27d5edd45d89d05e8150"
    ]
   },
   {
    "id": 10,
    "nome": "Le Scuderie",
    "concetti": "AVG · COUNT · HAVING · ORDER BY",
    "storia": "Un tunnel umido sbuca nelle scuderie sotterranee, dove il Conte allevava cavalli da corsa. Una targa di ottone: «Il codice è il nome del cavallo più veloce in media. Ma conta solo chi ha corso almeno tre volte: un colpo di fortuna non fa un campione».",
    "obiettivo": "Trova il cavallo con il <b>tempo medio più basso</b> (<code>tempo_sec</code>) tra quelli che hanno corso <b>almeno 3 volte</b>.",
    "indizi": [
     "Per ogni cavallo calcola media e numero di corse: <code>SELECT cavallo, AVG(tempo_sec), COUNT(*) FROM corse GROUP BY cavallo;</code>",
     "Escludi chi ha corso poco con <code>HAVING COUNT(*) &gt;= 3</code>.",
     "Poi <code>ORDER BY AVG(tempo_sec) ASC LIMIT 1</code> per il più veloce."
    ],
    "placeholder": "Nome del cavallo",
    "setup": "\n          CREATE TABLE corse (id INTEGER PRIMARY KEY, cavallo TEXT, fantino TEXT, tempo_sec REAL, ippodromo TEXT);\n          INSERT INTO corse VALUES\n            (1,'Lampo','Rossi',62,'Siena'),(2,'Lampo','Rossi',64,'Merano'),(3,'Lampo','Gori',63,'Roma'),\n            (4,'Tuono','Gori',55,'Siena'),(5,'Tuono','Rossi',56,'Roma'),\n            (6,'Fulmine','Mari',60,'Siena'),(7,'Fulmine','Mari',61,'Merano'),(8,'Fulmine','Gori',59,'Roma'),(9,'Fulmine','Mari',62,'Milano'),\n            (10,'Nebbia','Rossi',66,'Siena'),(11,'Nebbia','Gori',70,'Merano'),(12,'Nebbia','Rossi',68,'Roma'),\n            (13,'Corsaro','Mari',61,'Siena'),(14,'Corsaro','Mari',63,'Merano'),(15,'Corsaro','Gori',62,'Roma'),\n            (16,'Corsaro','Rossi',64,'Milano'),(17,'Corsaro','Mari',60,'Napoli');",
    "risposte": [
     "d30b2afa3737f3a2de61bf8ebe58830a4f048f11a6328b1f36c0e8cf1013eb77"
    ]
   }
  ]
 },
 {
  "id": 3,
  "nome": "La Torre",
  "concetti": "JOIN · LEFT JOIN · più tabelle",
  "intro": "L'ultima salita. I dati sono spezzati in più tabelle collegate da chiavi: per ricomporre il quadro devi unirle con i JOIN.",
  "rooms": [
   {
    "id": 11,
    "nome": "L'Archivio dell'Osservatorio",
    "concetti": "JOIN · WHERE · ORDER BY",
    "storia": "In cima a una scala a chiocciola trovi l'inventario della torre: una tabella elenca gli oggetti, un'altra le stanze. Una pergamena avverte: «Il custode del terzo piano nasconde il suo oggetto più prezioso. Dammene il nome e la botola si aprirà».",
    "obiettivo": "Trova l'<b>oggetto di maggior valore</b> che si trova in una stanza del <b>piano 3</b>. Inserisci il <b>nome dell'oggetto</b>. Il piano sta nella tabella <code>stanze</code>, il valore in <code>oggetti</code>.",
    "indizi": [
     "Collega le tabelle con la chiave: <code>FROM oggetti o JOIN stanze s ON o.stanza_id = s.id</code>.",
     "Filtra sul piano: <code>WHERE s.piano = 3</code>.",
     "Ordina per valore decrescente e prendi il primo: <code>ORDER BY o.valore DESC LIMIT 1</code>."
    ],
    "placeholder": "Nome dell'oggetto",
    "setup": "\n          CREATE TABLE stanze (id INTEGER PRIMARY KEY, nome TEXT, piano INTEGER);\n          CREATE TABLE oggetti (id INTEGER PRIMARY KEY, nome TEXT, stanza_id INTEGER, valore INTEGER);\n          INSERT INTO stanze VALUES (1,'Ingresso',0),(2,'Biblioteca',1),(3,'Camera Padronale',2),(4,'Studio',2),(5,'Osservatorio',3),(6,'Soffitta',3);\n          INSERT INTO oggetti VALUES\n            (1,'Telescopio',5,1800),(2,'Globo Antico',5,2500),(3,'Baule Chiuso',6,900),(4,'Specchio Nero',6,3200),\n            (5,'Candelabro d''Oro',3,5000),(6,'Quadro del Conte',2,7000),(7,'Orologio a Pendolo',1,400),\n            (8,'Diario Segreto',4,600),(9,'Sestante',5,1200);",
    "risposte": [
     "147e054ee052f038349a8c772733749cdf01bbfc378fb52e64f7b71280d2b19c"
    ]
   },
   {
    "id": 12,
    "nome": "L'Organigramma",
    "concetti": "SELF JOIN",
    "storia": "Nella torre trovi l'organigramma del personale: ogni dipendente indica il proprio capo, che è a sua volta un dipendente della stessa tabella. Una nota: «Chi condivide il capo con la Cuoca custodisce la chiave. Non è lei, è l'altro».",
    "obiettivo": "Trova la persona che ha <b>lo stesso capo</b> (<code>capo_id</code>) della <b>Cuoca</b>, ma che non è la Cuoca. Inserisci il <b>cognome</b>.",
    "indizi": [
     "La tabella va unita a sé stessa con due alias: <code>FROM staff s JOIN staff c ON ...</code>.",
     "La condizione di unione è lo stesso capo: <code>ON s.capo_id = c.capo_id</code>, poi <code>WHERE c.ruolo = 'Cuoca'</code>.",
     "Escludi la Cuoca stessa con <code>AND s.id &lt;&gt; c.id</code>."
    ],
    "placeholder": "Cognome",
    "setup": "\n          CREATE TABLE staff (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT, capo_id INTEGER);\n          INSERT INTO staff VALUES\n            (1,'Conte Alberico','Padrone',NULL),(2,'Marco Neri','Maggiordomo',1),(3,'Elena Rossi','Cuoca',2),\n            (4,'Sara Gallo','Giardiniera',2),(5,'Luigi Verdi','Autista',1),(6,'Tommaso Pini','Aiuto cuoco',3),\n            (7,'Irene Conti','Segretaria',1),(8,'Fabio Moro','Garzone di giardino',4),(9,'Ugo Basso','Lavapiatti',3);",
    "risposte": [
     "2c13b4f21c0099fa34814c45775a8e918306b793c730659d928a5b96d7e1f275",
     "5777c71fa34c0c3189b21bbf8bf263e00e1c8369514eb4f225ad420b8cb356c9"
    ]
   },
   {
    "id": 13,
    "nome": "Il Magazzino dei Fornitori",
    "concetti": "JOIN · SUM · GROUP BY",
    "storia": "Un magazzino ingombro di casse. Fatture e fornitori sono su due registri separati. Un'etichetta: «Il fornitore che ha incassato di più in totale è anche il più pericoloso. Non farti ingannare dalla fattura singola più alta».",
    "obiettivo": "Trova il <b>fornitore</b> (nome in <code>fornitori</code>) a cui è stato pagato il <b>totale più alto</b> in <code>forniture</code>. Inserisci il suo nome.",
    "indizi": [
     "Unisci le tabelle: <code>FROM forniture f JOIN fornitori r ON f.fornitore_id = r.id</code>.",
     "Raggruppa per fornitore e somma: <code>SELECT r.nome, SUM(f.importo) FROM ... GROUP BY r.nome</code>.",
     "Ordina il totale in modo decrescente e prendi il primo: <code>ORDER BY SUM(f.importo) DESC LIMIT 1</code>."
    ],
    "placeholder": "Nome del fornitore",
    "setup": "\n          CREATE TABLE fornitori (id INTEGER PRIMARY KEY, nome TEXT, citta TEXT);\n          CREATE TABLE forniture (id INTEGER PRIMARY KEY, fornitore_id INTEGER, prodotto TEXT, importo INTEGER);\n          INSERT INTO fornitori VALUES (1,'Ditta Conti','Siena'),(2,'Cantine Bellandi','Asti'),(3,'Ferramenta Rizzo','Lucca'),(4,'Fiorista Lupi','Pisa'),(5,'Gioielleria Sarto','Milano');\n          INSERT INTO forniture VALUES\n            (1,1,'travi',3900),\n            (2,2,'vino',1200),(3,2,'vino',1500),(4,2,'spumante',1800),\n            (5,3,'chiodi',300),(6,3,'serrature',2500),\n            (7,4,'rose',600),(8,4,'orchidee',900),\n            (9,5,'collana',4200);",
    "risposte": [
     "21173553a8276adaa5ed477cf293238afaec5e056072881651b60eb757c921df",
     "19a3c24768e2ec2df7604ef4529b3fa6140fa3060048866a1545d4b2d06feb33"
    ]
   },
   {
    "id": 14,
    "nome": "Il Laboratorio",
    "concetti": "JOIN su 3 tabelle",
    "storia": "Una botola nascosta ti porta in un laboratorio segreto. Il sistema di sicurezza registra ogni accesso, ma qualcuno senza i permessi adatti è entrato dopo la mezzanotte. Un monitor lampeggia: «ACCESSO ANOMALO RILEVATO. IDENTIFICARE IL COLPEVOLE».",
    "obiettivo": "Chi è entrato nel <b>Laboratorio</b> tra le <b>00:00 e le 05:00</b> pur avendo un <b>livello di badge inferiore a 3</b>? Inserisci il suo <b>cognome</b>. Dovrai collegare le tre tabelle con un <code>JOIN</code>.",
    "indizi": [
     "I dati sono divisi in 3 tabelle: collega <code>accessi</code> a <code>personaggi</code> con <code>personaggio_id = personaggi.id</code>.",
     "Esempio: <code>SELECT p.nome, a.porta, a.ora FROM accessi a JOIN personaggi p ON a.personaggio_id = p.id;</code>",
     "Aggiungi un secondo <code>JOIN badge b ON b.personaggio_id = p.id</code> e filtra: <code>a.porta='Laboratorio' AND a.ora &lt; '05:00' AND b.livello &lt; 3</code>."
    ],
    "placeholder": "Cognome del colpevole",
    "setup": "\n          CREATE TABLE personaggi (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);\n          CREATE TABLE badge (personaggio_id INTEGER, livello INTEGER);\n          CREATE TABLE accessi (id INTEGER PRIMARY KEY, personaggio_id INTEGER, porta TEXT, ora TEXT);\n          INSERT INTO personaggi VALUES\n            (1,'Marco Neri','Maggiordomo'),(2,'Elena Rossi','Cuoca'),(3,'Dott. Bruni','Chimico'),\n            (4,'Sara Gallo','Giardiniera'),(5,'Luigi Verdi','Autista'),(6,'Irene Conti','Segretaria');\n          INSERT INTO badge VALUES (1,2),(2,1),(3,5),(4,1),(5,2),(6,3);\n          INSERT INTO accessi VALUES\n            (1,2,'Laboratorio','14:00'),(2,3,'Laboratorio','01:00'),(3,6,'Laboratorio','23:30'),(4,4,'Giardino','02:00'),\n            (5,1,'Laboratorio','02:14'),(6,5,'Garage','01:30'),(7,1,'Cucina','07:00'),(8,3,'Biblioteca','10:00');",
    "risposte": [
     "af770bc926c4dfe386f02b01788ba2f7050f3d23c4c44dddd4c7d1a1cb498225",
     "faa1b03bdc915f8bb03464bc7234dce2aed9af9f240950a061058a9c45f79ef6"
    ]
   },
   {
    "id": 15,
    "nome": "La Sala del Tesoro",
    "concetti": "JOIN · LEFT JOIN · IS NULL",
    "storia": "Ultima porta! Dietro di essa c'è l'uscita. Una voce metallica dice: «Il traditore lavora nella Sicurezza e non ha mai timbrato il cartellino: nessuna traccia della sua presenza, eppure ha le chiavi. Dammi il suo cognome e sarai libero».",
    "obiettivo": "Trova il dipendente del reparto <b>Sicurezza</b> che <b>non ha nessuna timbratura</b>. Il nome del reparto è nella tabella <code>reparti</code>. Inserisci il <b>cognome</b>. Attenzione: c'è anche un dipendente di un altro reparto senza timbrature!",
    "indizi": [
     "Collega dipendenti e reparti: <code>JOIN reparti r ON d.reparto_id = r.id</code> e filtra <code>r.nome = 'Sicurezza'</code>.",
     "Un normale <code>JOIN</code> scarta chi non ha timbrature. Serve un <code>LEFT JOIN timbrature t ON t.dipendente_id = d.id</code>: mantiene tutti i dipendenti, con <code>NULL</code> dove non c'è corrispondenza.",
     "Tieni solo le righe senza corrispondenza: <code>WHERE t.id IS NULL AND r.nome = 'Sicurezza'</code>."
    ],
    "placeholder": "Cognome del traditore",
    "setup": "\n          CREATE TABLE reparti (id INTEGER PRIMARY KEY, nome TEXT);\n          CREATE TABLE dipendenti (id INTEGER PRIMARY KEY, nome TEXT, cognome TEXT, reparto_id INTEGER);\n          CREATE TABLE timbrature (id INTEGER PRIMARY KEY, dipendente_id INTEGER, data TEXT);\n          INSERT INTO reparti VALUES (1,'Sicurezza'),(2,'Cucina'),(3,'Giardino'),(4,'Amministrazione');\n          INSERT INTO dipendenti VALUES\n            (1,'Paolo','Ferri',1),(2,'Anna','Riva',1),(3,'Giulio','Sala',1),(4,'Carla','Dini',4),\n            (5,'Mario','Pesci',2),(6,'Lucia','Fabbri',2),(7,'Piero','Orsi',3),(8,'Gino','Bassi',3);\n          INSERT INTO timbrature VALUES\n            (1,2,'2026-10-01'),(2,2,'2026-10-02'),(3,3,'2026-10-01'),(4,4,'2026-10-01'),(5,4,'2026-10-02'),\n            (6,6,'2026-10-01'),(7,7,'2026-10-02'),(8,8,'2026-10-01'),(9,3,'2026-10-03');",
    "risposte": [
     "c92af80d7c47170df7b5fde1880aee907fb3a7f3ac4a884abf1a1a1c42312675",
     "39a97b82e101996dfd15f71dc7700f350ba27f4b8739dc85de038fc4fbf24441"
    ]
   }
  ]
 }
];
