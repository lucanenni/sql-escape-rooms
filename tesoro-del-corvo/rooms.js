// FILE GENERATO da dev/build.js — non modificare a mano.
const GAME = {
 "id": "tesoro-del-corvo",
 "slug": "tesoro-del-corvo",
 "genere": "Pirati · Avventura",
 "descrizione": "Naufrago su un'isola dei Caraibi, devi seguire le tracce di Capitan Corvo tra relitti, taverne e grotte per trovare il suo tesoro e una barca per fuggire.",
 "titolo": "Il Tesoro di Capitan Corvo",
 "logo": "🏴‍☠️ CAPITAN CORVO",
 "tema": "pirati",
 "storageKey": "sql-escape-room-corvo-v1",
 "premessa": "Un naufragio ti ha gettato sull'Isola del Corvo, rifugio del leggendario pirata Capitan Corvo. Per lasciare l'isola devi trovare il suo tesoro e la barca nascosta nella grotta: ogni passaggio è protetto da un enigma, e le risposte si nascondono nei registri dei pirati.",
 "startLabel": "Salpa verso l'isola",
 "fine": {
  "tag": "Tesoro trovato",
  "titolo": "🏴‍☠️ Il forziere è tuo!",
  "testo": "Il Forziere Nero si spalanca: oro a perdita d'occhio e, sul fondo, la chiave della barca di Capitan Corvo. Con il vento in poppa lasci l'isola più ricco, e con qualche query in più nel tuo bagaglio."
 }
};
const LEVELS = [
 {
  "id": 1,
  "nome": "La Spiaggia",
  "concetti": "SELECT · WHERE · ORDER BY · LIMIT/OFFSET · LIKE · IN · BETWEEN · NULL",
  "intro": "Sei sulla sabbia, tra i resti di una nave e le tracce dei pirati. Impara a leggere i registri: filtra, ordina e cerca per trovare i primi indizi.",
  "rooms": [
   {
    "nome": "Il Relitto",
    "concetti": "SELECT · WHERE · AND",
    "storia": "Tra le onde emerge il relitto di un galeone. Nella stiva galleggiano diversi bauli, ognuno marchiato con un simbolo. Capitan Corvo marcava il suo con un segno speciale: era <b>intatto</b> e valeva più di mille dobloni.",
    "obiettivo": "Trova il baule con <code>condizione = 'intatto'</code> e <b>valore superiore a 1000</b>. Il suo <code>simbolo</code> è il codice.",
    "indizi": [
     "Guarda tutti i bauli: <code>SELECT * FROM bauli;</code>.",
     "Filtra la condizione: <code>WHERE condizione = 'intatto'</code>.",
     "Aggiungi <code>AND valore &gt; 1000</code>."
    ],
    "placeholder": "Simbolo",
    "setup": "\n          CREATE TABLE bauli (id INTEGER PRIMARY KEY, contenuto TEXT, condizione TEXT, valore INTEGER, simbolo TEXT);\n          INSERT INTO bauli VALUES\n            (1,'Monete spagnole','intatto',2500,'ancora'),\n            (2,'Vestiti','intatto',50,'vela'),\n            (3,'Gioielli','rotto',3000,'teschio'),\n            (4,'Rum','intatto',300,'bussola'),\n            (5,'Mappe','intatto',800,'sirena'),\n            (6,'Spezie','rotto',200,'cannone');",
    "id": 1,
    "risposte": [
     "208b9eb08dd3f451155fae06c37e35a5f11af903f7be1e3b888ea7dd350ca990"
    ]
   },
   {
    "nome": "La Taverna",
    "concetti": "WHERE · ORDER BY · LIMIT",
    "storia": "In una taverna sulla spiaggia, i pirati si giocano il bottino ai dadi. Il tavernaro ti sussurra: «Chi ha vinto la puntata più alta ieri sera conosce il segreto del tesoro. Conta solo chi ha VINTO, non chi ha perso di più!»",
    "obiettivo": "Fra le scommesse con <code>esito = 'vinta'</code>, trova il <b>pirata</b> con la <b>puntata più alta</b>.",
    "indizi": [
     "Filtra le vincite: <code>WHERE esito = 'vinta'</code>.",
     "Ordina dalla più alta: <code>ORDER BY puntata DESC</code>.",
     "<code>LIMIT 1</code> per tenere solo la prima."
    ],
    "placeholder": "Nome del pirata",
    "setup": "\n          CREATE TABLE scommesse (id INTEGER PRIMARY KEY, pirata TEXT, puntata INTEGER, esito TEXT);\n          INSERT INTO scommesse VALUES\n            (1,'Barba Verde',900,'vinta'),\n            (2,'Occhio Nero',1500,'persa'),\n            (3,'Dente d''Oro',400,'vinta'),\n            (4,'Mano Rossa',700,'vinta'),\n            (5,'Gamba di Legno',1200,'persa');",
    "id": 2,
    "risposte": [
     "725ab64a624dc7b8834cc99965d47d1d669aae19eed8c8ff66caf4f62f05db05"
    ]
   },
   {
    "nome": "Il Registro dei Marinai",
    "concetti": "LIKE · IN · AND",
    "storia": "Sul molo trovi il registro della ciurma. «Cerco un uomo sulla nave Corvo, cannoniere o timoniere, il cui soprannome parla di ferro. Un marinaio così forte da forzare qualunque serratura».",
    "obiettivo": "Trova il <b>marinaio</b> della nave <b>Corvo</b> con ruolo <b>cannoniere o timoniere</b> e un <b>soprannome che contiene «Ferro»</b>. Inserisci il <b>cognome</b>.",
    "indizi": [
     "Cerca nel testo: <code>soprannome LIKE '%Ferro%'</code>.",
     "Più ruoli: <code>ruolo IN ('cannoniere', 'timoniere')</code>.",
     "Aggiungi <code>AND nave = 'Corvo'</code>."
    ],
    "placeholder": "Cognome",
    "setup": "\n          CREATE TABLE marinai (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT, nave TEXT, soprannome TEXT);\n          INSERT INTO marinai VALUES\n            (1,'Tito Bassi','cannoniere','Corvo','Mano di Ferro'),\n            (2,'Jack Moro','cuoco','Corvo','Pugno di Ferro'),\n            (3,'Lena Ricci','timoniere','Corvo','Occhio di Falco'),\n            (4,'Nico Gatti','timoniere','Sirena','Cuore di Ferro'),\n            (5,'Gino Fosco','cannoniere','Sirena','Lingua di Seta');",
    "id": 3,
    "risposte": [
     "152ea8d141d7ad9643b9b406f2e94ccde0b8e759a196549104ca608a3e5ed43a",
     "00f2897c01e73222ee6c55106c8ea50f4622acbcf18db08896b10b61b4df732a"
    ]
   },
   {
    "nome": "La Mappa delle Isole",
    "concetti": "BETWEEN · <> · AND",
    "storia": "Una pergamena mostra le isole della zona. «Il tesoro è nascosto su un'isola disabitata, a latitudine tra 10 e 15 gradi. Ma non sull'Isola del Corvo: quella è dove sei adesso, e l'ho già frugata».",
    "obiettivo": "Trova l'<b>isola non abitata</b> (<code>abitata = 0</code>) con <b>latitudine tra 10 e 15</b> (estremi inclusi) e <b>diversa da «Isola del Corvo»</b>.",
    "indizi": [
     "Intervallo: <code>latitudine BETWEEN 10 AND 15</code>.",
     "Disabitata: <code>abitata = 0</code>.",
     "Escludi la tua isola: <code>nome &lt;&gt; 'Isola del Corvo'</code>."
    ],
    "placeholder": "Nome dell'isola",
    "setup": "\n          CREATE TABLE isole (id INTEGER PRIMARY KEY, nome TEXT, latitudine REAL, longitudine REAL, abitata INTEGER);\n          INSERT INTO isole VALUES\n            (1,'Isola del Corvo',12.5,-61.0,0),\n            (2,'Scoglio Nero',13.1,-60.2,0),\n            (3,'Isola Grande',11.0,-62.0,1),\n            (4,'Punta Osso',18.4,-65.0,0),\n            (5,'Isola Piccola',16.2,-59.9,0);",
    "id": 4,
    "risposte": [
     "d49b2c0762cbd0b00ae57a923727c80e2d2aa540191e38ad6df96e1add4ad4f6"
    ]
   },
   {
    "nome": "Il Diario del Capitano",
    "concetti": "ORDER BY · LIMIT/OFFSET · IS NOT NULL",
    "storia": "Il diario di Capitan Corvo elenca i viaggi di razzia. «Nel secondo viaggio più redditizio nascosi la chiave. Se il bottino è vuoto il viaggio non è stato registrato: ignoralo».",
    "obiettivo": "Fra i viaggi con <b>bottino registrato</b> (non <code>NULL</code>), trova il <b>secondo</b> per bottino (il più alto è il primo). Il codice è il <b>porto</b>.",
    "indizi": [
     "Escludi i vuoti: <code>WHERE bottino IS NOT NULL</code>.",
     "Ordina dal più alto: <code>ORDER BY bottino DESC</code>.",
     "Salta il primo: <code>LIMIT 1 OFFSET 1</code>."
    ],
    "placeholder": "Porto",
    "setup": "\n          CREATE TABLE viaggi (id INTEGER PRIMARY KEY, porto TEXT, anno INTEGER, bottino INTEGER);\n          INSERT INTO viaggi VALUES\n            (1,'Tortuga',1712,5000),(2,'Nassau',1713,3200),(3,'Port Royal',1714,7800),\n            (4,'Havana',1715,NULL),(5,'Cartagena',1716,4100),(6,'Santo Domingo',1717,NULL);",
    "id": 5,
    "risposte": [
     "c372b5d34eff710017525976c9096ae2e06ae475dab12275d877c7ed07f468a9"
    ]
   }
  ]
 },
 {
  "id": 2,
  "nome": "Il Covo dei Pirati",
  "concetti": "COUNT · SUM · AVG · MIN/MAX · GROUP BY · HAVING",
  "intro": "Superata la spiaggia, entri nel covo: libri mastri, conti di bordo e registri delle traversate. Qui servono somme, medie e conteggi per scoprire chi ha davvero il potere.",
  "rooms": [
   {
    "nome": "La Santabarbara",
    "concetti": "COUNT · WHERE · GROUP BY · HAVING",
    "storia": "Nella santabarbara si conservano munizioni di tutte le navi. «Cerca la nave con più di 5 PALLE DI CANNONE ASCIUTTE: quelle bagnate non sparano, e la polvere non è una palla».",
    "obiettivo": "Trova la <b>nave</b> con <b>più di 5</b> munizioni di tipo <code>'palla di cannone'</code> con stato <code>'asciutta'</code>.",
    "indizi": [
     "Filtra prima: <code>WHERE tipo = 'palla di cannone' AND stato = 'asciutta'</code>.",
     "Raggruppa per nave: <code>GROUP BY nave</code>.",
     "<code>HAVING COUNT(*) &gt; 5</code>."
    ],
    "placeholder": "Nave",
    "setup": "CREATE TABLE munizioni (id INTEGER PRIMARY KEY, nave TEXT, tipo TEXT, stato TEXT);\n                  INSERT INTO munizioni VALUES (1,'Vendetta','palla di cannone','asciutta'),(2,'Vendetta','palla di cannone','asciutta'),(3,'Vendetta','palla di cannone','asciutta'),(4,'Vendetta','palla di cannone','asciutta'),(5,'Vendetta','palla di cannone','asciutta'),(6,'Vendetta','palla di cannone','asciutta'),(7,'Vendetta','palla di cannone','asciutta'),(8,'Vendetta','palla di cannone','bagnata'),(9,'Vendetta','palla di cannone','bagnata'),(10,'Sirena','palla di cannone','asciutta'),(11,'Sirena','palla di cannone','asciutta'),(12,'Sirena','palla di cannone','asciutta'),(13,'Sirena','palla di cannone','asciutta'),(14,'Sirena','palla di cannone','bagnata'),(15,'Sirena','palla di cannone','bagnata'),(16,'Sirena','palla di cannone','bagnata'),(17,'Sirena','palla di cannone','bagnata'),(18,'Sirena','palla di cannone','bagnata'),(19,'Sirena','palla di cannone','bagnata'),(20,'Corvo','palla di cannone','asciutta'),(21,'Corvo','palla di cannone','asciutta'),(22,'Corvo','palla di cannone','asciutta'),(23,'Corvo','palla di cannone','asciutta'),(24,'Corvo','palla di cannone','asciutta'),(25,'Corvo','polvere','asciutta'),(26,'Corvo','polvere','asciutta'),(27,'Corvo','polvere','asciutta');",
    "id": 6,
    "risposte": [
     "ca37c3450cff063c2fcff971b4600897820a5272211b308b2c0766286193a928"
    ]
   },
   {
    "nome": "Il Forziere della Ciurma",
    "concetti": "SUM · GROUP BY · ORDER BY",
    "storia": "Il libro mastro registra ogni bottino portato al covo. «Non cercare il colpo singolo più grosso: chi ha accumulato di più in totale è il vero re del covo».",
    "obiettivo": "Trova il <b>pirata</b> con il <b>valore totale di bottino più alto</b>. Attenzione: il singolo bottino più alto è di un altro pirata.",
    "indizi": [
     "<code>SELECT pirata, SUM(valore) FROM bottino GROUP BY pirata;</code>",
     "Controlla anche <code>MAX(valore)</code> per vedere il trucco.",
     "<code>ORDER BY SUM(valore) DESC LIMIT 1</code>."
    ],
    "placeholder": "Pirata",
    "setup": "\n          CREATE TABLE bottino (id INTEGER PRIMARY KEY, pirata TEXT, valore INTEGER);\n          INSERT INTO bottino VALUES\n            (1,'Mano Rossa',2200),(2,'Mano Rossa',2100),(3,'Mano Rossa',2300),\n            (4,'Occhio Nero',6000),\n            (5,'Dente d''Oro',1500),(6,'Dente d''Oro',1500),(7,'Dente d''Oro',1500),\n            (8,'Barba Verde',2000),(9,'Barba Verde',1800);",
    "id": 7,
    "risposte": [
     "880b2cc770c59f3ffcb5ee66f9192a4fd3690a854423ca636196d66cd377917d"
    ]
   },
   {
    "nome": "Il Mercato del Porto",
    "concetti": "SUM · COUNT · HAVING",
    "storia": "Al mercato clandestino si vende la refurtiva. «Cerco un mercante che ha incassato più di 3000 monete, ma con meno di tre vendite: pochi affari, tutti grossi. Fa affari con Capitan Corvo, ne sono certo».",
    "obiettivo": "Trova il <b>mercante</b> con un <b>totale incassato superiore a 3000</b> e <b>meno di 3 vendite</b>. Inserisci il <b>cognome</b>.",
    "indizi": [
     "Raggruppa per mercante e guarda <code>SUM(importo)</code> e <code>COUNT(*)</code>.",
     "Le due condizioni vanno in <code>HAVING</code>.",
     "<code>HAVING SUM(importo) &gt; 3000 AND COUNT(*) &lt; 3</code>."
    ],
    "placeholder": "Cognome",
    "setup": "\n          CREATE TABLE vendite (id INTEGER PRIMARY KEY, mercante TEXT, merce TEXT, importo INTEGER, giorno INTEGER);\n          INSERT INTO vendite VALUES\n            (1,'Gianni Orsi','gioielli',2000,3),(2,'Gianni Orsi','argenteria',1800,9),\n            (3,'Carlo Neri','rum',1000,2),(4,'Carlo Neri','spezie',900,5),(5,'Carlo Neri','sete',1500,11),\n            (6,'Pina Rossi','arazzi',2800,7),\n            (7,'Rosa Gallo','vele',600,1),(8,'Rosa Gallo','corde',400,4);",
    "id": 8,
    "risposte": [
     "17eafec7930b24752766fb95f60b661724bc56de28b9ac623051af6ff1049205",
     "eea9b2b2f482471975ad00caa5253e8358291c426699d1be2ee5e0033bc72872"
    ]
   },
   {
    "nome": "Il Registro delle Traversate",
    "concetti": "MAX · GROUP BY · ORDER BY",
    "storia": "Il registro delle traversate atlantiche. «La nave affidabile è quella la cui traversata PIÙ LENTA è comunque la più veloce tra tutte le navi. Non cercare chi ha fatto un record: cerca chi non ha mai deluso».",
    "obiettivo": "Per ogni nave calcola la <b>traversata più lunga</b> (<code>MAX(giorni)</code>). Trova la nave con il <b>valore più basso</b>.",
    "indizi": [
     "<code>SELECT nave, MIN(giorni), AVG(giorni), MAX(giorni) FROM traversate GROUP BY nave;</code>",
     "Guarda solo la colonna del massimo: media e minimo sono un'esca.",
     "<code>ORDER BY MAX(giorni) ASC LIMIT 1</code>."
    ],
    "placeholder": "Nave",
    "setup": "\n          CREATE TABLE traversate (id INTEGER PRIMARY KEY, nave TEXT, giorni INTEGER, rotta TEXT);\n          INSERT INTO traversate VALUES\n            (1,'Tempesta',18,'Tortuga-Cadice'),(2,'Tempesta',20,'Nassau-Cadice'),(3,'Tempesta',19,'Havana-Lisbona'),\n            (4,'Gabbiano',14,'Tortuga-Cadice'),(5,'Gabbiano',15,'Nassau-Lisbona'),(6,'Gabbiano',23,'Havana-Cadice'),\n            (7,'Balena',22,'Tortuga-Lisbona'),(8,'Balena',24,'Nassau-Cadice'),(9,'Balena',23,'Havana-Cadice'),\n            (10,'Squalo',25,'Tortuga-Cadice'),(11,'Squalo',26,'Nassau-Lisbona'),(12,'Squalo',27,'Havana-Cadice');",
    "id": 9,
    "risposte": [
     "a93f24d219e15bec04154b9194f64123d36d41b8cd7000704db52df520699451"
    ]
   },
   {
    "nome": "Il Libro Paga",
    "concetti": "SUM · AVG · HAVING",
    "storia": "Il quartiermastro tiene il libro paga di tutte le ciurme. «Una nave costa più di 5000 monete in paghe, ma i suoi marinai sono sottopagati: media sotto le 700. È la nave dove presto scoppierà un ammutinamento».",
    "obiettivo": "Trova la <b>nave</b> con <b>somma delle paghe superiore a 5000</b> e <b>paga media inferiore a 700</b>.",
    "indizi": [
     "<code>SELECT nave, SUM(paga), AVG(paga) FROM ciurma GROUP BY nave;</code>",
     "Entrambe le condizioni in <code>HAVING</code>.",
     "<code>HAVING SUM(paga) &gt; 5000 AND AVG(paga) &lt; 700</code>."
    ],
    "placeholder": "Nave",
    "setup": "CREATE TABLE ciurma (id INTEGER PRIMARY KEY, nome TEXT, nave TEXT, paga INTEGER);\n                  INSERT INTO ciurma VALUES (1,'Marinaio 1','Leviatano',650),(2,'Marinaio 2','Leviatano',650),(3,'Marinaio 3','Leviatano',650),(4,'Marinaio 4','Leviatano',650),(5,'Marinaio 5','Leviatano',650),(6,'Marinaio 6','Leviatano',650),(7,'Marinaio 7','Leviatano',650),(8,'Marinaio 8','Leviatano',650),(9,'Marinaio 9','Sirena',1000),(10,'Marinaio 10','Sirena',1000),(11,'Marinaio 11','Sirena',1000),(12,'Marinaio 12','Sirena',1000),(13,'Marinaio 13','Corvo',900),(14,'Marinaio 14','Corvo',900),(15,'Marinaio 15','Corvo',900),(16,'Marinaio 16','Corvo',900),(17,'Marinaio 17','Corvo',900),(18,'Marinaio 18','Corvo',900),(19,'Marinaio 19','Gabbiano',500),(20,'Marinaio 20','Gabbiano',500),(21,'Marinaio 21','Gabbiano',500);",
    "id": 10,
    "risposte": [
     "8e6f7c903201d658a8d8992dbd2ab69bb871719a7322c274ecd6368a703857c5"
    ]
   }
  ]
 },
 {
  "id": 3,
  "nome": "La Grotta del Tesoro",
  "concetti": "JOIN · LEFT JOIN · più tabelle",
  "intro": "Il tesoro è nascosto in una grotta, e le sue tracce sono sparse in registri diversi, collegati da chiavi. Incrocia le tabelle con i JOIN.",
  "rooms": [
   {
    "nome": "L'Ingresso della Grotta",
    "concetti": "JOIN",
    "storia": "All'ingresso della grotta ci sono delle serrature. Ogni chiave è associata a un pirata tramite il suo ID: i nomi e i ruoli sono in un'altra tabella. «Quale colore ha la chiave del Capitano?»",
    "obiettivo": "Trova il <b>colore</b> della chiave del pirata con <code>ruolo = 'Capitano'</code>, unendo <code>chiavi</code> e <code>pirati</code>.",
    "indizi": [
     "<code>FROM chiavi c JOIN pirati p ON c.pirata_id = p.id</code>.",
     "Filtra: <code>WHERE p.ruolo = 'Capitano'</code>.",
     "Seleziona <code>c.colore</code>."
    ],
    "placeholder": "Colore",
    "setup": "\n          CREATE TABLE pirati (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);\n          CREATE TABLE chiavi (id INTEGER PRIMARY KEY, pirata_id INTEGER, colore TEXT);\n          INSERT INTO pirati VALUES\n            (1,'Capitan Corvo','Capitano'),(2,'Bianca Tempesta','Navigatrice'),(3,'Ugo Pistola','Cannoniere'),\n            (4,'Rosa dei Venti','Medico'),(5,'Tom Martello','Carpentiere'),(6,'Zeno Lanterna','Vedetta');\n          INSERT INTO chiavi VALUES (1,1,'rossa'),(2,2,'blu'),(3,3,'verde'),(4,4,'gialla'),(5,5,'nera'),(6,6,'bianca');",
    "id": 11,
    "risposte": [
     "6032584c09f1d90827d28eb78068071ce2614bf2b9951d2e957a26690a24f444"
    ]
   },
   {
    "nome": "Il Registro delle Navi",
    "concetti": "JOIN · WHERE · ORDER BY · LIMIT",
    "storia": "Una nave spagnola custodisce l'ultima parte della mappa. «Cerca nei porti del regno di Spagna: la nave più armata ha il compito di scortare il tesoro. Una nave inglese più grossa non c'entra».",
    "obiettivo": "Trova la <b>nave</b> ormeggiata in un porto del regno <b>Spagna</b> con il <b>maggior numero di cannoni</b>. Unisci <code>navi</code> e <code>porti</code>.",
    "indizi": [
     "<code>FROM navi n JOIN porti p ON n.porto_id = p.id</code>.",
     "Filtra il regno: <code>WHERE p.regno = 'Spagna'</code>.",
     "<code>ORDER BY n.cannoni DESC LIMIT 1</code>."
    ],
    "placeholder": "Nome della nave",
    "setup": "\n          CREATE TABLE porti (id INTEGER PRIMARY KEY, nome TEXT, regno TEXT);\n          CREATE TABLE navi (id INTEGER PRIMARY KEY, nome TEXT, porto_id INTEGER, cannoni INTEGER);\n          INSERT INTO porti VALUES (1,'Havana','Spagna'),(2,'Portsmouth','Inghilterra'),(3,'Cartagena','Spagna');\n          INSERT INTO navi VALUES\n            (1,'Santa Rosa',1,40),(2,'Gabbiano d''Oro',1,24),(3,'Invincibile',2,64),(4,'Fiamma',3,32);",
    "id": 12,
    "risposte": [
     "eb374a7f0df5f054cf58ba7e45620e61f0d1e21ab848f673f39e850e28c8ab32"
    ]
   },
   {
    "nome": "Le Taglie",
    "concetti": "JOIN · SUM · GROUP BY",
    "storia": "Sul muro della grotta sono incise le taglie messe sui pirati dalle corone d'Europa. «Chi ha più taglie in totale è il più temuto. Non farti ingannare dalla taglia singola più alta: quella è di un altro».",
    "obiettivo": "Trova il <b>pirata</b> con il <b>totale di taglie più alto</b>, unendo <code>taglie</code> e <code>pirati</code>. Inserisci il <b>cognome</b>.",
    "indizi": [
     "<code>FROM taglie t JOIN pirati p ON t.pirata_id = p.id</code>.",
     "Raggruppa e somma: <code>GROUP BY p.nome</code>, <code>SUM(t.importo)</code>.",
     "<code>ORDER BY SUM(t.importo) DESC LIMIT 1</code>."
    ],
    "placeholder": "Cognome",
    "setup": "\n          CREATE TABLE pirati (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);\n          CREATE TABLE taglie (id INTEGER PRIMARY KEY, pirata_id INTEGER, importo INTEGER, regno TEXT);\n          INSERT INTO pirati VALUES\n            (1,'Capitan Corvo','Capitano'),(2,'Bianca Tempesta','Navigatrice'),(3,'Ugo Pistola','Cannoniere'),\n            (4,'Rosa dei Venti','Medico'),(5,'Tom Martello','Carpentiere'),(6,'Zeno Lanterna','Vedetta');\n          INSERT INTO taglie VALUES\n            (1,1,5000,'Spagna'),\n            (2,3,2000,'Spagna'),(3,3,1800,'Inghilterra'),(4,3,2200,'Francia'),\n            (5,2,1500,'Spagna'),(6,2,1700,'Francia'),\n            (7,4,800,'Inghilterra'),\n            (8,5,1200,'Spagna'),(9,5,900,'Francia');",
    "id": 13,
    "risposte": [
     "ab3e0e98db03bcb0659ad2f00a7e65c689264e32a333e283b9c4777fd1dd3066",
     "3bd871506d7a78c3f392c3934b0ebc12b2de0c180f3a1823223a6251dd991e02"
    ]
   },
   {
    "nome": "I Tesori Dimenticati",
    "concetti": "LEFT JOIN · IS NULL",
    "storia": "Nella grotta c'è un elenco di tesori e, in un'altra tabella, le mappe che li riportano. «Cerco un tesoro che nessuna mappa indica, ma che esiste ancora. Quelli già perduti non contano».",
    "obiettivo": "Trova il <b>tesoro senza alcuna mappa</b> e <b>non perduto</b> (<code>perduto = 0</code>).",
    "indizi": [
     "Un <code>JOIN</code> normale scarta i tesori senza mappe: usa <code>FROM tesori t LEFT JOIN mappe m ON m.tesoro_id = t.id</code>.",
     "Senza corrispondenza: <code>WHERE m.id IS NULL</code>.",
     "Escludi i perduti: <code>AND t.perduto = 0</code>."
    ],
    "placeholder": "Nome del tesoro",
    "setup": "\n          CREATE TABLE tesori (id INTEGER PRIMARY KEY, nome TEXT, valore INTEGER, perduto INTEGER);\n          CREATE TABLE mappe (id INTEGER PRIMARY KEY, tesoro_id INTEGER, autore TEXT);\n          INSERT INTO tesori VALUES\n            (1,'Corona di Montezuma',90000,0),(2,'Calice d''Oro',12000,0),(3,'Rubino del Re',45000,0),\n            (4,'Spada di Cortés',30000,1),(5,'Perla Nera',20000,0);\n          INSERT INTO mappe VALUES (1,2,'Barba Verde'),(2,3,'Occhio Nero'),(3,5,'Mano Rossa'),(4,2,'Dente d''Oro');",
    "id": 14,
    "risposte": [
     "a6dc5faae60c7dbc089b8746ce882470a0cb2be2094192e3dca470d28e0a755f"
    ]
   },
   {
    "nome": "La Camera del Tesoro",
    "concetti": "JOIN su 3 tabelle",
    "storia": "Cinque forzieri sono sparsi su tre isole. Solo uno si apre davvero: deve contenere ORO, trovarsi su un'isola NON vulcanica (la lava ha sciolto gli altri) e avere la sua chiave ancora INTEGRA. È il forziere di Capitan Corvo.",
    "obiettivo": "Trova il <b>forziere</b> con <code>contenuto = 'oro'</code>, su un'isola con <code>vulcanica = 0</code> e con chiave <code>stato = 'integra'</code>. Inserisci il suo <b>nome</b>.",
    "indizi": [
     "<code>FROM forzieri f JOIN isole i ON f.isola_id = i.id JOIN chiavi c ON c.forziere_id = f.id</code>.",
     "Condizioni su forziere e isola: <code>f.contenuto = 'oro' AND i.vulcanica = 0</code>.",
     "Aggiungi <code>AND c.stato = 'integra'</code>."
    ],
    "placeholder": "Nome del forziere",
    "setup": "\n          CREATE TABLE isole (id INTEGER PRIMARY KEY, nome TEXT, vulcanica INTEGER);\n          CREATE TABLE forzieri (id INTEGER PRIMARY KEY, nome TEXT, isola_id INTEGER, contenuto TEXT);\n          CREATE TABLE chiavi (id INTEGER PRIMARY KEY, forziere_id INTEGER, stato TEXT);\n          INSERT INTO isole VALUES (1,'Isola del Teschio',1),(2,'Baia Silenziosa',0),(3,'Isola Smeralda',0);\n          INSERT INTO forzieri VALUES\n            (1,'Forziere Rosso',1,'oro'),(2,'Forziere Blu',2,'oro'),(3,'Forziere Verde',2,'gioielli'),\n            (4,'Forziere Nero',3,'oro'),(5,'Forziere Bianco',3,'oro');\n          INSERT INTO chiavi VALUES (1,1,'integra'),(2,2,'spezzata'),(3,3,'integra'),(4,4,'integra'),(5,5,'spezzata');",
    "id": 15,
    "risposte": [
     "6234a8ee8b3a4ed53c2d269c56b4992207eebe0cf5ac703d4b96e6ff06fbd06d",
     "6757f6fbf95fcbe8056b499fb1a972065191c721a2ce674c8da0b7ef76f2d2ff"
    ]
   }
  ]
 }
];
