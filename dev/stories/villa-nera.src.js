// SORGENTE in chiaro (risposte + soluzioni). Non pubblicare la cartella dev/.
// `node dev/build.js` genera ../rooms.js con le risposte sotto forma di hash.
const GAME = {
  id: "villa-nera",
  slug: "villa-nera",
  genere: "Gotico · Escape room",
  descrizione: "Sei chiuso in una villa maledetta: biblioteca, cantina, laboratorio segreto. Ogni stanza nasconde un codice nel suo database.",
  titolo: "Il Mistero di Villa Nera",
  logo: "🗝 VILLA NERA",
  tema: "gotico",
  storageKey: "sql-escape-room-v2",
  premessa: "Sei rimasto chiuso in una villa maledetta: per uscire devi risolvere gli enigmi di ogni stanza.",
  startLabel: "Entra nella villa",
  fine: {
    tag: "Fuga completata",
    titolo: "🎉 Sei libero!",
    testo: "Hai interrogato biblioteche, registri, cantine, tabelle di sicurezza e archivi. Il portone di Villa Nera si spalanca e l'aria della notte ti accoglie.",
  },
};

const LEVELS = [
  {
    id: 1,
    nome: "Il Piano Terra",
    concetti: "SELECT · WHERE · ORDER BY · LIMIT · LIKE",
    intro: "Le prime stanze della villa. Impara a interrogare una tabella: scegli colonne, filtra righe, ordina i risultati.",
    rooms: [
      {
        id: 1,
        nome: "La Biblioteca",
        concetti: "SELECT · WHERE · AND",
        storia:
          "La porta della villa si chiude alle tue spalle con un tonfo. Sei nella biblioteca di Villa Nera, " +
          "illuminata solo da una lampada a olio. Una scritta incisa sul camino recita: " +
          "«Il sapere antico custodisce la chiave. Cerca il libro dal dorso rosso scritto prima che il 1700 iniziasse a finire».",
        obiettivo:
          "Trova il libro con il dorso <b>rosso</b> pubblicato <b>prima del 1700</b>. " +
          "La sua <code>parola_segreta</code> è il codice del lucchetto.",
        indizi: [
          "Guarda la struttura della tabella <code>libri</code> qui a fianco: con <code>SELECT * FROM libri;</code> li vedi tutti.",
          "Per filtrare le righe usa <code>WHERE colonna = 'valore'</code>. Per i numeri puoi usare <code>&lt;</code> e <code>&gt;</code>.",
          "Combina le due condizioni con <code>AND</code>: <code>WHERE colore = 'rosso' AND anno &lt; 1700</code>.",
        ],
        risposte: ["luna"],
        placeholder: "Parola segreta",
        soluzione: "SELECT parola_segreta FROM libri WHERE colore='rosso' AND anno<1700",
        setup: `
          CREATE TABLE libri (id INTEGER PRIMARY KEY, titolo TEXT, autore TEXT, anno INTEGER, colore TEXT, parola_segreta TEXT);
          INSERT INTO libri VALUES
            (1,'Il nome della rosa','Umberto Eco',1980,'rosso','OMBRA'),
            (2,'Dialogo sopra i due massimi sistemi','Galileo Galilei',1632,'rosso','LUNA'),
            (3,'Il conte di Montecristo','Alexandre Dumas',1844,'rosso','FERRO'),
            (4,'Divina Commedia','Dante Alighieri',1320,'verde','STELLA'),
            (5,'Orlando Furioso','Ludovico Ariosto',1516,'blu','NEBBIA'),
            (6,'I promessi sposi','Alessandro Manzoni',1827,'blu','CORVO'),
            (7,'Il Principe','Niccolò Machiavelli',1532,'nero','VELENO'),
            (8,'Decameron','Giovanni Boccaccio',1353,'verde','PESTE'),
            (9,'Pinocchio','Carlo Collodi',1883,'rosso','LEGNO'),
            (10,'Il Gattopardo','Giuseppe T. di Lampedusa',1958,'nero','SOLE'),
            (11,'Ultime lettere di Jacopo Ortis','Ugo Foscolo',1802,'blu','TOMBA'),
            (12,'La Gerusalemme liberata','Torquato Tasso',1581,'verde','ASSEDIO');`,
      },
      {
        id: 0,
        nome: "Il Corridoio dei Ritratti",
        concetti: "IN · BETWEEN · =",
        storia:
          "Un lungo corridoio tappezzato di ritratti ti fissa con occhi dipinti. Una targa recita: «Cerca nell'ala Nord la persona " +
          "ritratta da Tiepolo o da Canaletto tra il 1750 e il 1800: il suo nome apre la porta».",
        obiettivo:
          "Trova il <b>soggetto</b> del ritratto esposto nella sala <b>Nord</b>, dipinto da <b>Tiepolo o Canaletto</b> " +
          "tra il <b>1750 e il 1800</b> (estremi inclusi). Inserisci il nome del soggetto.",
        indizi: [
          "Per più valori ammessi usa <code>IN</code>: <code>pittore IN ('Tiepolo', 'Canaletto')</code>.",
          "Per un intervallo usa <code>BETWEEN</code>: <code>anno BETWEEN 1750 AND 1800</code> (include gli estremi).",
          "Unisci tutto con <code>AND</code> e aggiungi <code>sala = 'Nord'</code>.",
        ],
        risposte: ["contessa aurelia", "aurelia"],
        placeholder: "Nome del soggetto",
        soluzione: "SELECT soggetto FROM ritratti WHERE pittore IN ('Tiepolo','Canaletto') AND anno BETWEEN 1750 AND 1800 AND sala='Nord'",
        setup: `
          CREATE TABLE ritratti (id INTEGER PRIMARY KEY, soggetto TEXT, pittore TEXT, anno INTEGER, sala TEXT);
          INSERT INTO ritratti VALUES
            (1,'Contessa Aurelia','Tiepolo',1762,'Nord'),
            (2,'Barone Ottavio','Tiepolo',1741,'Nord'),
            (3,'Dama con ventaglio','Canaletto',1771,'Est'),
            (4,'Conte Leopoldo','Canaletto',1788,'Sud'),
            (5,'Gentiluomo in nero','Goya',1790,'Nord'),
            (6,'Fanciulla con rosa','Tiepolo',1805,'Nord'),
            (7,'Il Cavaliere','Canaletto',1749,'Nord'),
            (8,'Vescovo Anselmo','Goya',1766,'Est');`,
      },
      {
        id: 2,
        nome: "Il Salone degli Ospiti",
        concetti: "ORDER BY · LIMIT · IS NOT NULL",
        storia:
          "Dietro la libreria si apre un passaggio verso il salone. Sul leggio c'è il registro della serata dell'omicidio. " +
          "Un biglietto: «Il numero della stanza dell'ultima persona che ha lasciato la villa apre la porta successiva».",
        obiettivo:
          "Scopri chi è stato l'<b>ultimo ospite ad andarsene</b> (ora di partenza più tarda) e inserisci il <b>numero della sua stanza</b>. " +
          "Attenzione: chi non è ancora partito ha la partenza vuota (<code>NULL</code>).",
        indizi: [
          "Ordina i risultati con <code>ORDER BY partenza DESC</code> per avere prima le ore più tarde.",
          "Per prendere solo la prima riga aggiungi <code>LIMIT 1</code> in fondo.",
          "Per escludere chi non è partito: <code>WHERE partenza IS NOT NULL</code> (non <code>= NULL</code>!).",
        ],
        risposte: ["21"],
        placeholder: "Numero stanza",
        soluzione: "SELECT stanza FROM ospiti WHERE partenza IS NOT NULL ORDER BY partenza DESC LIMIT 1",
        setup: `
          CREATE TABLE ospiti (id INTEGER PRIMARY KEY, nome TEXT, stanza INTEGER, arrivo TEXT, partenza TEXT);
          INSERT INTO ospiti VALUES
            (1,'Contessa Bianchi',13,'18:30','23:45'),
            (2,'Barone Rossi',7,'19:00','22:10'),
            (3,'Signora Verdi',4,'19:15','23:05'),
            (4,'Dott. Marini',9,'20:00',NULL),
            (5,'Cavaliere Neri',21,'20:30','23:58'),
            (6,'Miss Gray',16,'21:00','23:20'),
            (7,'Ing. Colombo',2,'21:10','22:50');`,
      },
      {
        id: 0,
        nome: "La Cucina",
        concetti: "ORDER BY · LIMIT/OFFSET · NULL",
        storia:
          "Una cucina di rame e piastrelle bianche. Sulla porta della dispensa un cartello: «Ciò che scade prima va usato per primo, " +
          "ma il segreto sta nel SECONDO prodotto in scadenza. Ignora ciò che è già scaduto o che non scade mai».",
        obiettivo:
          "Tra i prodotti con scadenza <b>dal 2026-10-01 in poi</b> (le scadenze vuote non contano), trova il <b>secondo</b> " +
          "in ordine di scadenza (il più vicino è il primo). Il suo nome è il codice.",
        indizi: [
          "Filtra con <code>WHERE scadenza &gt;= '2026-10-01'</code>: i <code>NULL</code> vengono scartati da soli.",
          "Ordina con <code>ORDER BY scadenza ASC</code>.",
          "Per saltare il primo e prendere il secondo: <code>LIMIT 1 OFFSET 1</code>.",
        ],
        risposte: ["latte"],
        placeholder: "Prodotto",
        soluzione: "SELECT prodotto FROM dispensa WHERE scadenza>='2026-10-01' ORDER BY scadenza ASC LIMIT 1 OFFSET 1",
        setup: `
          CREATE TABLE dispensa (id INTEGER PRIMARY KEY, prodotto TEXT, scadenza TEXT, quantita INTEGER);
          INSERT INTO dispensa VALUES
            (1,'Farina','2026-09-20',3),(2,'Latte','2026-10-05',6),(3,'Uova','2026-10-03',12),
            (4,'Burro','2026-10-20',2),(5,'Miele',NULL,4),(6,'Zucchero','2027-03-01',5),(7,'Aceto','2026-12-10',2);`,
      },
      {
        id: 3,
        nome: "La Sala da Pranzo",
        concetti: "LIKE · <> · più condizioni",
        storia:
          "Sul lungo tavolo c'è ancora la cena intatta. Sotto un piatto, un mazzo di biglietti scambiati dagli invitati durante la serata. " +
          "Uno solo parla del veleno ed è stato scritto da qualcuno che non è il maggiordomo, a serata inoltrata. " +
          "Il numero del tavolo scritto su quel biglietto è la chiave.",
        obiettivo:
          "Trova il biglietto che <b>contiene la parola «veleno»</b>, scritto <b>dopo le 21:00</b> da un mittente <b>diverso dal Maggiordomo</b>. " +
          "Il codice è il suo <code>numero_tavolo</code>.",
        indizi: [
          "Per cercare una parola dentro un testo: <code>WHERE testo LIKE '%veleno%'</code> (il <code>%</code> vuol dire «qualsiasi cosa»).",
          "Per escludere un valore usa <code>&lt;&gt;</code> (oppure <code>!=</code>): <code>mittente &lt;&gt; 'Maggiordomo'</code>.",
          "Metti tutto insieme con <code>AND</code>: <code>testo LIKE '%veleno%' AND ora &gt; '21:00' AND mittente &lt;&gt; 'Maggiordomo'</code>.",
        ],
        risposte: ["6"],
        placeholder: "Numero tavolo",
        soluzione: "SELECT numero_tavolo FROM biglietti WHERE testo LIKE '%veleno%' AND ora>'21:00' AND mittente<>'Maggiordomo'",
        setup: `
          CREATE TABLE biglietti (id INTEGER PRIMARY KEY, mittente TEXT, destinatario TEXT, testo TEXT, ora TEXT, numero_tavolo INTEGER);
          INSERT INTO biglietti VALUES
            (1,'Contessa Bianchi','Barone Rossi','Il vino stasera ha un sapore strano','20:10',3),
            (2,'Barone Rossi','Contessa Bianchi','Non toccare il veleno per topi in cantina','19:45',8),
            (3,'Maggiordomo','Cuoca','Ho nascosto il veleno nella dispensa','21:30',5),
            (4,'Miss Gray','Dott. Marini','Incontriamoci in giardino','21:15',11),
            (5,'Signora Verdi','Contessa Bianchi','Quel veleno non era destinato a te','22:05',6),
            (6,'Dott. Marini','Miss Gray','Porta con te la chiave','21:50',9),
            (7,'Cuoca','Maggiordomo','La zuppa è pronta','20:00',2);`,
      },
    ],
  },
  {
    id: 2,
    nome: "I Sotterranei",
    concetti: "COUNT · SUM · AVG · MIN/MAX · GROUP BY · HAVING",
    intro: "Scendi nei sotterranei. Qui non basta leggere le righe: devi riassumerle. Usa le funzioni aggregate e raggruppa i dati.",
    rooms: [
      {
        id: 4,
        nome: "La Cantina",
        concetti: "COUNT · GROUP BY · HAVING",
        storia:
          "Scendi nella cantina fredda e umida. Centinaia di bottiglie riposano sugli scaffali. " +
          "Su una botte è inciso: «La combinazione è l'annata che il padrone amava di più: " +
          "ne possiede più di dieci bottiglie, e nessun'altra annata ci si avvicina».",
        obiettivo: "Trova l'<b>annata</b> di cui esistono <b>più di 10 bottiglie</b> e inseriscila come codice.",
        indizi: [
          "Ogni riga è una bottiglia. Devi <i>raggruppare</i> per annata: <code>GROUP BY annata</code>.",
          "Con <code>SELECT annata, COUNT(*) FROM bottiglie GROUP BY annata;</code> vedi quante bottiglie ci sono per annata.",
          "Per filtrare sui gruppi si usa <code>HAVING COUNT(*) &gt; 10</code> (non <code>WHERE</code>).",
        ],
        risposte: ["2003"],
        placeholder: "Annata",
        soluzione: "SELECT annata FROM bottiglie GROUP BY annata HAVING COUNT(*)>10",
        setup: (() => {
          const conteggi = { 1985: 4, 1990: 7, 1998: 3, 2003: 12, 2010: 5 };
          const regioni = ["Toscana", "Piemonte", "Veneto"];
          let id = 0;
          const righe = [];
          for (const [annata, n] of Object.entries(conteggi))
            for (let i = 0; i < n; i++) { id++; righe.push(`(${id},${annata},'${regioni[id % 3]}','S${(id % 6) + 1}')`); }
          return `CREATE TABLE bottiglie (id INTEGER PRIMARY KEY, annata INTEGER, regione TEXT, scaffale TEXT);
                  INSERT INTO bottiglie VALUES ${righe.join(",")};`;
        })(),
      },
      {
        id: 0,
        nome: "Il Registro delle Visite",
        concetti: "COUNT(DISTINCT) · GROUP BY",
        storia:
          "Un grosso registro polveroso è appoggiato su un leggio. Il guardiano ha scritto: «Non conta quante volte si timbra, " +
          "ma in quanti GIORNI DIVERSI. Chi è venuto in più giorni diversi è colui che cerchi».",
        obiettivo:
          "Trova l'<b>ospite</b> che ha visitato la villa in più <b>giorni distinti</b>. " +
          "Attenzione: alcuni ospiti hanno più righe nello stesso giorno.",
        indizi: [
          "Con <code>COUNT(*)</code> conti le righe, non i giorni. Prova <code>COUNT(DISTINCT giorno)</code>.",
          "Raggruppa per ospite: <code>SELECT ospite, COUNT(DISTINCT giorno) FROM visite GROUP BY ospite;</code>",
          "Ordina il conteggio in modo decrescente e prendi la prima riga: <code>ORDER BY COUNT(DISTINCT giorno) DESC LIMIT 1</code>.",
        ],
        risposte: ["bruno"],
        placeholder: "Nome dell'ospite",
        soluzione: "SELECT ospite FROM visite GROUP BY ospite ORDER BY COUNT(DISTINCT giorno) DESC LIMIT 1",
        setup: `
          CREATE TABLE visite (id INTEGER PRIMARY KEY, ospite TEXT, giorno TEXT, durata_min INTEGER);
          INSERT INTO visite VALUES
            (1,'Ada','2026-10-01',30),(2,'Ada','2026-10-01',20),(3,'Ada','2026-10-02',45),
            (4,'Bruno','2026-10-01',15),(5,'Bruno','2026-10-02',25),(6,'Bruno','2026-10-03',35),
            (7,'Carla','2026-10-01',10),(8,'Carla','2026-10-01',12),(9,'Carla','2026-10-01',8),
            (10,'Carla','2026-10-01',20),(11,'Carla','2026-10-02',15),
            (12,'Dino','2026-10-04',60);`,
      },
      {
        id: 5,
        nome: "Il Libro Mastro",
        concetti: "SUM · GROUP BY · ORDER BY",
        storia:
          "Un corridoio di pietra conduce a un ufficio segreto. Sulla scrivania, il libro mastro della villa: ogni spesa degli ultimi mesi. " +
          "Il padrone scrisse in margine: «Non cercare la spesa singola più grande: il denaro scompare a piccole dosi. " +
          "Il codice è la categoria che ha pesato di più in totale».",
        obiettivo:
          "Trova la <b>categoria</b> con la <b>somma totale</b> delle spese più alta. " +
          "Attenzione: non è la categoria con la singola spesa più alta!",
        indizi: [
          "Somma gli importi per categoria: <code>SELECT categoria, SUM(importo) FROM spese GROUP BY categoria;</code>",
          "Ordina i totali dal più grande: dai un nome alla somma (<code>SUM(importo) AS totale</code>) e usa <code>ORDER BY totale DESC</code>.",
          "Aggiungi <code>LIMIT 1</code> per tenere solo la prima categoria.",
        ],
        risposte: ["manutenzione"],
        placeholder: "Categoria",
        soluzione: "SELECT categoria FROM spese GROUP BY categoria ORDER BY SUM(importo) DESC LIMIT 1",
        setup: `
          CREATE TABLE spese (id INTEGER PRIMARY KEY, categoria TEXT, importo INTEGER, mese TEXT);
          INSERT INTO spese VALUES
            (1,'Vino',1200,'gen'),(2,'Vino',600,'feb'),(3,'Vino',2600,'mar'),
            (4,'Cibo',800,'gen'),(5,'Cibo',700,'feb'),(6,'Cibo',650,'mar'),(7,'Cibo',900,'apr'),
            (8,'Manutenzione',3000,'feb'),(9,'Manutenzione',1500,'apr'),
            (10,'Giardino',400,'gen'),(11,'Giardino',300,'feb'),(12,'Giardino',500,'mar'),(13,'Giardino',250,'apr'),
            (14,'Personale',3500,'gen'),(15,'Personale',500,'mar');`,
      },
      {
        id: 0,
        nome: "Il Deposito dei Gioielli",
        concetti: "MIN · MAX · GROUP BY",
        storia:
          "Una cassaforte a muro, già aperta, rivela un deposito di gioielli. Un foglietto: «Il materiale più nobile non è quello con " +
          "il pezzo più costoso, ma quello in cui anche il pezzo più economico vale più di tutti gli altri».",
        obiettivo:
          "Trova il <b>materiale</b> il cui pezzo <b>meno prezioso</b> (<code>MIN(valore)</code>) vale <b>più</b> del pezzo meno prezioso di ogni altro materiale.",
        indizi: [
          "Raggruppa per materiale: <code>SELECT materiale, MIN(valore), MAX(valore) FROM gioielli GROUP BY materiale;</code>",
          "Guarda la colonna del minimo: non è quella del massimo!",
          "<code>ORDER BY MIN(valore) DESC LIMIT 1</code> ti dà il materiale cercato.",
        ],
        risposte: ["rubino"],
        placeholder: "Materiale",
        soluzione: "SELECT materiale FROM gioielli GROUP BY materiale ORDER BY MIN(valore) DESC LIMIT 1",
        setup: `
          CREATE TABLE gioielli (id INTEGER PRIMARY KEY, tipo TEXT, materiale TEXT, peso_g REAL, valore INTEGER);
          INSERT INTO gioielli VALUES
            (1,'anello','oro',8,500),(2,'collana','oro',25,1200),(3,'corona','oro',90,3000),
            (4,'spilla','argento',10,100),(5,'bracciale','argento',30,200),(6,'collana','argento',40,350),
            (7,'anello','diamante',5,900),(8,'diadema','diamante',20,7000),
            (9,'anello','rubino',6,4000),(10,'spilla','rubino',7,4100),
            (11,'collana','perla',15,50),(12,'orecchini','perla',4,60),(13,'bracciale','perla',20,80);`,
      },
      {
        id: 6,
        nome: "Le Scuderie",
        concetti: "AVG · COUNT · HAVING · ORDER BY",
        storia:
          "Un tunnel umido sbuca nelle scuderie sotterranee, dove il Conte allevava cavalli da corsa. " +
          "Una targa di ottone: «Il codice è il nome del cavallo più veloce in media. " +
          "Ma conta solo chi ha corso almeno tre volte: un colpo di fortuna non fa un campione».",
        obiettivo:
          "Trova il cavallo con il <b>tempo medio più basso</b> (<code>tempo_sec</code>) tra quelli che hanno corso <b>almeno 3 volte</b>.",
        indizi: [
          "Per ogni cavallo calcola media e numero di corse: <code>SELECT cavallo, AVG(tempo_sec), COUNT(*) FROM corse GROUP BY cavallo;</code>",
          "Escludi chi ha corso poco con <code>HAVING COUNT(*) &gt;= 3</code>.",
          "Poi <code>ORDER BY AVG(tempo_sec) ASC LIMIT 1</code> per il più veloce.",
        ],
        risposte: ["fulmine"],
        placeholder: "Nome del cavallo",
        soluzione: "SELECT cavallo FROM corse GROUP BY cavallo HAVING COUNT(*)>=3 ORDER BY AVG(tempo_sec) ASC LIMIT 1",
        setup: `
          CREATE TABLE corse (id INTEGER PRIMARY KEY, cavallo TEXT, fantino TEXT, tempo_sec REAL, ippodromo TEXT);
          INSERT INTO corse VALUES
            (1,'Lampo','Rossi',62,'Siena'),(2,'Lampo','Rossi',64,'Merano'),(3,'Lampo','Gori',63,'Roma'),
            (4,'Tuono','Gori',55,'Siena'),(5,'Tuono','Rossi',56,'Roma'),
            (6,'Fulmine','Mari',60,'Siena'),(7,'Fulmine','Mari',61,'Merano'),(8,'Fulmine','Gori',59,'Roma'),(9,'Fulmine','Mari',62,'Milano'),
            (10,'Nebbia','Rossi',66,'Siena'),(11,'Nebbia','Gori',70,'Merano'),(12,'Nebbia','Rossi',68,'Roma'),
            (13,'Corsaro','Mari',61,'Siena'),(14,'Corsaro','Mari',63,'Merano'),(15,'Corsaro','Gori',62,'Roma'),
            (16,'Corsaro','Rossi',64,'Milano'),(17,'Corsaro','Mari',60,'Napoli');`,
      },
    ],
  },
  {
    id: 3,
    nome: "La Torre",
    concetti: "JOIN · LEFT JOIN · più tabelle",
    intro: "L'ultima salita. I dati sono spezzati in più tabelle collegate da chiavi: per ricomporre il quadro devi unirle con i JOIN.",
    rooms: [
      {
        id: 7,
        nome: "L'Archivio dell'Osservatorio",
        concetti: "JOIN · WHERE · ORDER BY",
        storia:
          "In cima a una scala a chiocciola trovi l'inventario della torre: una tabella elenca gli oggetti, un'altra le stanze. " +
          "Una pergamena avverte: «Il custode del terzo piano nasconde il suo oggetto più prezioso. " +
          "Dammene il nome e la botola si aprirà».",
        obiettivo:
          "Trova l'<b>oggetto di maggior valore</b> che si trova in una stanza del <b>piano 3</b>. " +
          "Inserisci il <b>nome dell'oggetto</b>. Il piano sta nella tabella <code>stanze</code>, il valore in <code>oggetti</code>.",
        indizi: [
          "Collega le tabelle con la chiave: <code>FROM oggetti o JOIN stanze s ON o.stanza_id = s.id</code>.",
          "Filtra sul piano: <code>WHERE s.piano = 3</code>.",
          "Ordina per valore decrescente e prendi il primo: <code>ORDER BY o.valore DESC LIMIT 1</code>.",
        ],
        risposte: ["specchio nero"],
        placeholder: "Nome dell'oggetto",
        soluzione: "SELECT o.nome FROM oggetti o JOIN stanze s ON o.stanza_id=s.id WHERE s.piano=3 ORDER BY o.valore DESC LIMIT 1",
        setup: `
          CREATE TABLE stanze (id INTEGER PRIMARY KEY, nome TEXT, piano INTEGER);
          CREATE TABLE oggetti (id INTEGER PRIMARY KEY, nome TEXT, stanza_id INTEGER, valore INTEGER);
          INSERT INTO stanze VALUES (1,'Ingresso',0),(2,'Biblioteca',1),(3,'Camera Padronale',2),(4,'Studio',2),(5,'Osservatorio',3),(6,'Soffitta',3);
          INSERT INTO oggetti VALUES
            (1,'Telescopio',5,1800),(2,'Globo Antico',5,2500),(3,'Baule Chiuso',6,900),(4,'Specchio Nero',6,3200),
            (5,'Candelabro d''Oro',3,5000),(6,'Quadro del Conte',2,7000),(7,'Orologio a Pendolo',1,400),
            (8,'Diario Segreto',4,600),(9,'Sestante',5,1200);`,
      },
      {
        id: 0,
        nome: "L'Organigramma",
        concetti: "SELF JOIN",
        storia:
          "Nella torre trovi l'organigramma del personale: ogni dipendente indica il proprio capo, che è a sua volta un dipendente della stessa tabella. " +
          "Una nota: «Chi condivide il capo con la Cuoca custodisce la chiave. Non è lei, è l'altro».",
        obiettivo:
          "Trova la persona che ha <b>lo stesso capo</b> (<code>capo_id</code>) della <b>Cuoca</b>, ma che non è la Cuoca. Inserisci il <b>cognome</b>.",
        indizi: [
          "La tabella va unita a sé stessa con due alias: <code>FROM staff s JOIN staff c ON ...</code>.",
          "La condizione di unione è lo stesso capo: <code>ON s.capo_id = c.capo_id</code>, poi <code>WHERE c.ruolo = 'Cuoca'</code>.",
          "Escludi la Cuoca stessa con <code>AND s.id &lt;&gt; c.id</code>.",
        ],
        risposte: ["gallo", "sara gallo"],
        placeholder: "Cognome",
        soluzione: "SELECT s.nome FROM staff s JOIN staff c ON s.capo_id=c.capo_id WHERE c.ruolo='Cuoca' AND s.id<>c.id",
        setup: `
          CREATE TABLE staff (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT, capo_id INTEGER);
          INSERT INTO staff VALUES
            (1,'Conte Alberico','Padrone',NULL),(2,'Marco Neri','Maggiordomo',1),(3,'Elena Rossi','Cuoca',2),
            (4,'Sara Gallo','Giardiniera',2),(5,'Luigi Verdi','Autista',1),(6,'Tommaso Pini','Aiuto cuoco',3),
            (7,'Irene Conti','Segretaria',1),(8,'Fabio Moro','Garzone di giardino',4),(9,'Ugo Basso','Lavapiatti',3);`,
      },
      {
        id: 0,
        nome: "Il Magazzino dei Fornitori",
        concetti: "JOIN · SUM · GROUP BY",
        storia:
          "Un magazzino ingombro di casse. Fatture e fornitori sono su due registri separati. Un'etichetta: «Il fornitore che ha incassato di più in totale " +
          "è anche il più pericoloso. Non farti ingannare dalla fattura singola più alta».",
        obiettivo:
          "Trova il <b>fornitore</b> (nome in <code>fornitori</code>) a cui è stato pagato il <b>totale più alto</b> in <code>forniture</code>. " +
          "Inserisci il suo nome.",
        indizi: [
          "Unisci le tabelle: <code>FROM forniture f JOIN fornitori r ON f.fornitore_id = r.id</code>.",
          "Raggruppa per fornitore e somma: <code>SELECT r.nome, SUM(f.importo) FROM ... GROUP BY r.nome</code>.",
          "Ordina il totale in modo decrescente e prendi il primo: <code>ORDER BY SUM(f.importo) DESC LIMIT 1</code>.",
        ],
        risposte: ["cantine bellandi", "bellandi"],
        placeholder: "Nome del fornitore",
        soluzione: "SELECT r.nome FROM forniture f JOIN fornitori r ON f.fornitore_id=r.id GROUP BY r.id ORDER BY SUM(f.importo) DESC LIMIT 1",
        setup: `
          CREATE TABLE fornitori (id INTEGER PRIMARY KEY, nome TEXT, citta TEXT);
          CREATE TABLE forniture (id INTEGER PRIMARY KEY, fornitore_id INTEGER, prodotto TEXT, importo INTEGER);
          INSERT INTO fornitori VALUES (1,'Ditta Conti','Siena'),(2,'Cantine Bellandi','Asti'),(3,'Ferramenta Rizzo','Lucca'),(4,'Fiorista Lupi','Pisa'),(5,'Gioielleria Sarto','Milano');
          INSERT INTO forniture VALUES
            (1,1,'travi',3900),
            (2,2,'vino',1200),(3,2,'vino',1500),(4,2,'spumante',1800),
            (5,3,'chiodi',300),(6,3,'serrature',2500),
            (7,4,'rose',600),(8,4,'orchidee',900),
            (9,5,'collana',4200);`,
      },
      {
        id: 8,
        nome: "Il Laboratorio",
        concetti: "JOIN su 3 tabelle",
        storia:
          "Una botola nascosta ti porta in un laboratorio segreto. Il sistema di sicurezza registra ogni accesso, " +
          "ma qualcuno senza i permessi adatti è entrato dopo la mezzanotte. " +
          "Un monitor lampeggia: «ACCESSO ANOMALO RILEVATO. IDENTIFICARE IL COLPEVOLE».",
        obiettivo:
          "Chi è entrato nel <b>Laboratorio</b> tra le <b>00:00 e le 05:00</b> pur avendo un <b>livello di badge inferiore a 3</b>? " +
          "Inserisci il suo <b>cognome</b>. Dovrai collegare le tre tabelle con un <code>JOIN</code>.",
        indizi: [
          "I dati sono divisi in 3 tabelle: collega <code>accessi</code> a <code>personaggi</code> con <code>personaggio_id = personaggi.id</code>.",
          "Esempio: <code>SELECT p.nome, a.porta, a.ora FROM accessi a JOIN personaggi p ON a.personaggio_id = p.id;</code>",
          "Aggiungi un secondo <code>JOIN badge b ON b.personaggio_id = p.id</code> e filtra: <code>a.porta='Laboratorio' AND a.ora &lt; '05:00' AND b.livello &lt; 3</code>.",
        ],
        risposte: ["neri", "marco neri"],
        placeholder: "Cognome del colpevole",
        soluzione:
          "SELECT p.nome FROM accessi a JOIN personaggi p ON a.personaggio_id=p.id JOIN badge b ON b.personaggio_id=p.id " +
          "WHERE a.porta='Laboratorio' AND a.ora<'05:00' AND b.livello<3",
        setup: `
          CREATE TABLE personaggi (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);
          CREATE TABLE badge (personaggio_id INTEGER, livello INTEGER);
          CREATE TABLE accessi (id INTEGER PRIMARY KEY, personaggio_id INTEGER, porta TEXT, ora TEXT);
          INSERT INTO personaggi VALUES
            (1,'Marco Neri','Maggiordomo'),(2,'Elena Rossi','Cuoca'),(3,'Dott. Bruni','Chimico'),
            (4,'Sara Gallo','Giardiniera'),(5,'Luigi Verdi','Autista'),(6,'Irene Conti','Segretaria');
          INSERT INTO badge VALUES (1,2),(2,1),(3,5),(4,1),(5,2),(6,3);
          INSERT INTO accessi VALUES
            (1,2,'Laboratorio','14:00'),(2,3,'Laboratorio','01:00'),(3,6,'Laboratorio','23:30'),(4,4,'Giardino','02:00'),
            (5,1,'Laboratorio','02:14'),(6,5,'Garage','01:30'),(7,1,'Cucina','07:00'),(8,3,'Biblioteca','10:00');`,
      },
      {
        id: 9,
        nome: "La Sala del Tesoro",
        concetti: "JOIN · LEFT JOIN · IS NULL",
        storia:
          "Ultima porta! Dietro di essa c'è l'uscita. Una voce metallica dice: «Il traditore lavora nella Sicurezza " +
          "e non ha mai timbrato il cartellino: nessuna traccia della sua presenza, eppure ha le chiavi. " +
          "Dammi il suo cognome e sarai libero».",
        obiettivo:
          "Trova il dipendente del reparto <b>Sicurezza</b> che <b>non ha nessuna timbratura</b>. " +
          "Il nome del reparto è nella tabella <code>reparti</code>. Inserisci il <b>cognome</b>. " +
          "Attenzione: c'è anche un dipendente di un altro reparto senza timbrature!",
        indizi: [
          "Collega dipendenti e reparti: <code>JOIN reparti r ON d.reparto_id = r.id</code> e filtra <code>r.nome = 'Sicurezza'</code>.",
          "Un normale <code>JOIN</code> scarta chi non ha timbrature. Serve un <code>LEFT JOIN timbrature t ON t.dipendente_id = d.id</code>: mantiene tutti i dipendenti, con <code>NULL</code> dove non c'è corrispondenza.",
          "Tieni solo le righe senza corrispondenza: <code>WHERE t.id IS NULL AND r.nome = 'Sicurezza'</code>.",
        ],
        risposte: ["ferri", "paolo ferri"],
        placeholder: "Cognome del traditore",
        soluzione:
          "SELECT d.cognome FROM dipendenti d JOIN reparti r ON d.reparto_id=r.id LEFT JOIN timbrature t ON t.dipendente_id=d.id " +
          "WHERE t.id IS NULL AND r.nome='Sicurezza'",
        setup: `
          CREATE TABLE reparti (id INTEGER PRIMARY KEY, nome TEXT);
          CREATE TABLE dipendenti (id INTEGER PRIMARY KEY, nome TEXT, cognome TEXT, reparto_id INTEGER);
          CREATE TABLE timbrature (id INTEGER PRIMARY KEY, dipendente_id INTEGER, data TEXT);
          INSERT INTO reparti VALUES (1,'Sicurezza'),(2,'Cucina'),(3,'Giardino'),(4,'Amministrazione');
          INSERT INTO dipendenti VALUES
            (1,'Paolo','Ferri',1),(2,'Anna','Riva',1),(3,'Giulio','Sala',1),(4,'Carla','Dini',4),
            (5,'Mario','Pesci',2),(6,'Lucia','Fabbri',2),(7,'Piero','Orsi',3),(8,'Gino','Bassi',3);
          INSERT INTO timbrature VALUES
            (1,2,'2026-10-01'),(2,2,'2026-10-02'),(3,3,'2026-10-01'),(4,4,'2026-10-01'),(5,4,'2026-10-02'),
            (6,6,'2026-10-01'),(7,7,'2026-10-02'),(8,8,'2026-10-01'),(9,3,'2026-10-03');`,
      },
    ],
  },
];

// Gli id sono assegnati automaticamente in base all'ordine.
LEVELS.flatMap((l) => l.rooms).forEach((r, i) => (r.id = i + 1));

module.exports = { GAME, LEVELS };
