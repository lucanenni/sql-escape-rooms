// SORGENTE in chiaro della storia "Stazione Orione". Non pubblicare la cartella dev/.
const GAME = {
  id: "stazione-orione",
  slug: "stazione-orione",
  genere: "Fantascienza · Escape room",
  descrizione:
    "Anno 2147: un guasto al reattore ha sigillato la stazione spaziale. Sblocca i moduli interrogando i database di bordo e raggiungi la capsula di salvataggio.",
  titolo: "Stazione Orione",
  logo: "🚀 STAZIONE ORIONE",
  tema: "scifi",
  storageKey: "sql-escape-room-orione-v1",
  premessa:
    "Anno 2147. Sei l'ingegnere di bordo della stazione Orione. Un guasto al reattore ha fatto scattare la quarantena e il computer di bordo, ORION, " +
    "ha sigillato ogni modulo. Hai poco tempo: per raggiungere una capsula di salvataggio devi sbloccare i moduli uno alla volta, " +
    "interrogando i database di bordo.",
  startLabel: "Avvia la sequenza di fuga",
  fine: {
    tag: "Evacuazione completata",
    titolo: "🛰 Capsula Gamma in orbita!",
    testo:
      "Il computer ORION ha riconosciuto l'unica capsula davvero funzionante: pronta, ancorata a un modulo pressurizzato e con il serbatoio carico. " +
      "I motori si accendono, la stazione si allontana alle tue spalle e il reattore si spegne in un lampo silenzioso.",
  },
};

const LEVELS = [
  {
    id: 1,
    nome: "Il Modulo Abitativo",
    concetti: "SELECT · WHERE · ORDER BY · LIMIT/OFFSET · LIKE · IN · BETWEEN · NULL",
    intro:
      "Le luci d'emergenza sono rosse e il computer ripete l'allarme. Parti dagli alloggi: filtra i dati di bordo per trovare i primi codici.",
    rooms: [
      {
        nome: "Il Corridoio d'Ingresso",
        concetti: "SELECT · WHERE · AND",
        storia:
          "Il portello alle tue spalle si chiude con un sibilo. Il pannello di controllo mostra tutte le porte del modulo: " +
          "solo una è <b>bloccata</b> ma accessibile al tuo livello di autorizzazione (<b>2 o inferiore</b>). È quella che il computer aprirà con il suo codice.",
        obiettivo:
          "Trova la porta con <code>stato = 'bloccata'</code> e <code>livello_accesso</code> <b>minore o uguale a 2</b>. Il suo <code>codice</code> è la chiave.",
        indizi: [
          "Vedi tutte le porte con <code>SELECT * FROM porte;</code>.",
          "Filtra lo stato: <code>WHERE stato = 'bloccata'</code>.",
          "Aggiungi <code>AND livello_accesso &lt;= 2</code>.",
        ],
        risposte: ["7391"],
        placeholder: "Codice porta",
        soluzione: "SELECT codice FROM porte WHERE stato='bloccata' AND livello_accesso<=2",
        setup: `
          CREATE TABLE porte (id INTEGER PRIMARY KEY, nome TEXT, stato TEXT, livello_accesso INTEGER, codice TEXT);
          INSERT INTO porte VALUES
            (1,'Portello A','aperta',1,'1204'),
            (2,'Portello B','bloccata',4,'8855'),
            (3,'Portello C','bloccata',2,'7391'),
            (4,'Portello D','aperta',2,'5520'),
            (5,'Portello E','bloccata',5,'3017'),
            (6,'Portello F','aperta',3,'9942');`,
      },
      {
        nome: "La Mensa",
        concetti: "ORDER BY · LIMIT · WHERE",
        storia:
          "Nella mensa un frigorifero a cella è sigillato. La serratura chiede il nome dell'articolo <b>quasi esaurito</b>: " +
          "quello con la scorta più bassa, ma ancora disponibile. Ciò che è già a zero non conta.",
        obiettivo:
          "Trova l'<b>articolo</b> con la <b>quantità più bassa</b> tra quelli con <b>quantità maggiore di 0</b>.",
        indizi: [
          "Escludi gli esauriti: <code>WHERE quantita &gt; 0</code>.",
          "Ordina in modo crescente: <code>ORDER BY quantita ASC</code>.",
          "<code>LIMIT 1</code> per il primo.",
        ],
        risposte: ["caffe"],
        placeholder: "Articolo",
        soluzione: "SELECT articolo FROM scorte WHERE quantita>0 ORDER BY quantita ASC LIMIT 1",
        setup: `
          CREATE TABLE scorte (id INTEGER PRIMARY KEY, articolo TEXT, quantita INTEGER, unita TEXT);
          INSERT INTO scorte VALUES
            (1,'Acqua',480,'litri'),(2,'Barretta proteica',120,'pezzi'),(3,'Caffè',3,'kg'),
            (4,'Zucchero',0,'kg'),(5,'Sale',0,'kg'),(6,'Tè',14,'kg'),(7,'Zuppa liofilizzata',60,'buste');`,
      },
      {
        nome: "Il Diario di Bordo",
        concetti: "LIKE · IN · AND",
        storia:
          "Il diario di bordo registra ogni anomalia. «Cerca la perdita di pressione grave: quella segnalata come alta o critica. " +
          "Il settore indicato è dove la paratia di emergenza si è chiusa».",
        obiettivo:
          "Trova il <b>settore</b> del messaggio che <b>contiene «perdita»</b> con gravità <b>alta o critica</b>.",
        indizi: [
          "Cerca nel testo: <code>messaggio LIKE '%perdita%'</code>.",
          "Gravità tra più valori: <code>gravita IN ('alta', 'critica')</code>.",
          "Combina con <code>AND</code> e seleziona <code>settore</code>.",
        ],
        risposte: ["d4"],
        placeholder: "Settore",
        soluzione: "SELECT settore FROM log_bordo WHERE messaggio LIKE '%perdita%' AND gravita IN ('alta','critica')",
        setup: `
          CREATE TABLE log_bordo (id INTEGER PRIMARY KEY, ora TEXT, settore TEXT, messaggio TEXT, gravita TEXT);
          INSERT INTO log_bordo VALUES
            (1,'02:10','A1','Piccola perdita d''olio nel compressore','bassa'),
            (2,'03:45','B2','Perdita di refrigerante sotto controllo','media'),
            (3,'04:20','D4','Perdita di pressione nella paratia','critica'),
            (4,'04:55','E5','Aumento anomalo di temperatura','critica'),
            (5,'05:30','C3','Vibrazioni nel giroscopio','alta');`,
      },
      {
        nome: "I Sensori d'Ossigeno",
        concetti: "BETWEEN · <> · AND",
        storia:
          "I sensori d'ossigeno dei moduli segnalano valori preoccupanti. «Cerca un modulo con ossigeno tra 15 e 18 (zona rischiosa ma ancora respirabile). " +
          "La Serra l'ho già controllata: ignorala».",
        obiettivo:
          "Trova il <b>modulo</b> con sensore di tipo <b>ossigeno</b>, valore <b>tra 15 e 18</b> (estremi inclusi), diverso da <b>Serra</b>.",
        indizi: [
          "Filtra il tipo: <code>tipo = 'ossigeno'</code>.",
          "Intervallo: <code>valore BETWEEN 15 AND 18</code>.",
          "Escludi la Serra con <code>modulo &lt;&gt; 'Serra'</code>.",
        ],
        risposte: ["laboratorio"],
        placeholder: "Modulo",
        soluzione: "SELECT modulo FROM sensori WHERE tipo='ossigeno' AND valore BETWEEN 15 AND 18 AND modulo<>'Serra'",
        setup: `
          CREATE TABLE sensori (id INTEGER PRIMARY KEY, modulo TEXT, tipo TEXT, valore REAL, ora TEXT);
          INSERT INTO sensori VALUES
            (1,'Serra','ossigeno',16.5,'06:00'),
            (2,'Laboratorio','ossigeno',17.2,'06:00'),
            (3,'Mensa','ossigeno',20.9,'06:00'),
            (4,'Hangar','ossigeno',14.1,'06:00'),
            (5,'Laboratorio','temperatura',16.0,'06:00');`,
      },
      {
        nome: "Il Registro dell'Equipaggio",
        concetti: "ORDER BY · LIMIT/OFFSET · IS NOT NULL",
        storia:
          "Per sbloccare il ponte servono le credenziali del terzo ufficiale più anziano <b>con badge attivo</b>. " +
          "Chi ha il badge vuoto (<code>NULL</code>) è stato disattivato dal sistema e non conta.",
        obiettivo:
          "Fra chi ha un <b>badge</b> (non <code>NULL</code>), trova il <b>terzo</b> per anzianità (<code>anni_servizio</code> più alti). Il codice è il suo <b>cognome</b>.",
        indizi: [
          "Escludi i disattivati: <code>WHERE badge IS NOT NULL</code>.",
          "Ordina per anzianità decrescente: <code>ORDER BY anni_servizio DESC</code>.",
          "Per il terzo: <code>LIMIT 1 OFFSET 2</code>.",
        ],
        risposte: ["novak", "ana novak"],
        placeholder: "Cognome",
        soluzione: "SELECT nome FROM equipaggio WHERE badge IS NOT NULL ORDER BY anni_servizio DESC LIMIT 1 OFFSET 2",
        setup: `
          CREATE TABLE equipaggio (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT, anni_servizio INTEGER, badge TEXT);
          INSERT INTO equipaggio VALUES
            (1,'Wei Chen','Comandante',25,'B1'),
            (2,'Luis Ibarra','Medico',22,NULL),
            (3,'Ada Okafor','Pilota',19,'B3'),
            (4,'Ana Novak','Ingegnere',17,'B4'),
            (5,'Marco Rossi','Tecnico',14,'B5'),
            (6,'Yuki Tanaka','Biologa',12,'B6');`,
      },
    ],
  },
  {
    id: 2,
    nome: "La Sala Macchine",
    concetti: "COUNT · SUM · AVG · MIN/MAX · GROUP BY · HAVING",
    intro:
      "Scendi nella sala macchine. Qui i dati sono migliaia di letture: devi riassumerle con le funzioni aggregate per capire cosa si sta rompendo.",
    rooms: [
      {
        nome: "I Pannelli Solari",
        concetti: "COUNT · WHERE · GROUP BY · HAVING",
        storia:
          "I pannelli solari alimentano le paratie. «Cerca l'array con più di 4 pannelli GUASTI. Gli altri hanno pochi guasti: " +
          "non farti ingannare da chi ha tanti pannelli in totale».",
        obiettivo:
          "Trova l'<b>array</b> con <b>più di 4 pannelli guasti</b> (<code>stato = 'guasto'</code>).",
        indizi: [
          "Prima filtra i guasti con <code>WHERE stato = 'guasto'</code>.",
          "Raggruppa per array: <code>GROUP BY array</code>.",
          "<code>HAVING COUNT(*) &gt; 4</code>.",
        ],
        risposte: ["delta"],
        placeholder: "Array",
        soluzione: "SELECT array FROM pannelli WHERE stato='guasto' GROUP BY array HAVING COUNT(*)>4",
        setup: (() => {
          // [array, guasti, funzionanti]
          const conf = [["Alfa", 3, 5], ["Beta", 2, 4], ["Gamma", 4, 8], ["Delta", 6, 1]];
          let id = 0;
          const righe = [];
          for (const [a, g, f] of conf) {
            for (let i = 0; i < g; i++) righe.push(`(${++id},'${a}','guasto')`);
            for (let i = 0; i < f; i++) righe.push(`(${++id},'${a}','ok')`);
          }
          return `CREATE TABLE pannelli (id INTEGER PRIMARY KEY, "array" TEXT, stato TEXT);
                  INSERT INTO pannelli VALUES ${righe.join(",")};`;
        })(),
      },
      {
        nome: "Il Reattore",
        concetti: "AVG · MAX · GROUP BY · ORDER BY",
        storia:
          "Il reattore ha tre nuclei. «Un picco isolato di temperatura non significa nulla. Cerca il nucleo che resta più caldo in MEDIA: " +
          "è quello che sta davvero andando fuori controllo».",
        obiettivo:
          "Trova il <b>nucleo</b> con la <b>temperatura media più alta</b>. Attenzione: il picco singolo più alto è di un altro nucleo.",
        indizi: [
          "<code>SELECT nucleo, AVG(temperatura), MAX(temperatura) FROM letture GROUP BY nucleo;</code>",
          "Confronta le due colonne: ti interessa la media.",
          "<code>ORDER BY AVG(temperatura) DESC LIMIT 1</code>.",
        ],
        risposte: ["n3"],
        placeholder: "Nucleo",
        soluzione: "SELECT nucleo FROM letture GROUP BY nucleo ORDER BY AVG(temperatura) DESC LIMIT 1",
        setup: `
          CREATE TABLE letture (id INTEGER PRIMARY KEY, nucleo TEXT, ora TEXT, temperatura INTEGER);
          INSERT INTO letture VALUES
            (1,'N1','01:00',590),(2,'N1','02:00',610),(3,'N1','03:00',600),
            (4,'N2','01:00',450),(5,'N2','02:00',900),(6,'N2','03:00',420),
            (7,'N3','01:00',640),(8,'N3','02:00',660),(9,'N3','03:00',650);`,
      },
      {
        nome: "Il Deposito Carburante",
        concetti: "SUM · GROUP BY · ORDER BY",
        storia:
          "Il carburante sparisce troppo in fretta. «Non cercare il consumo singolo più alto. Voglio il sistema che in totale " +
          "ha bruciato più litri: è quello con la perdita».",
        obiettivo:
          "Trova il <b>sistema</b> con il <b>totale di litri consumati più alto</b>.",
        indizi: [
          "<code>SELECT sistema, SUM(litri) FROM consumi GROUP BY sistema;</code>",
          "Controlla anche <code>MAX(litri)</code> per vedere il trucco.",
          "<code>ORDER BY SUM(litri) DESC LIMIT 1</code>.",
        ],
        risposte: ["propulsione"],
        placeholder: "Sistema",
        soluzione: "SELECT sistema FROM consumi GROUP BY sistema ORDER BY SUM(litri) DESC LIMIT 1",
        setup: `
          CREATE TABLE consumi (id INTEGER PRIMARY KEY, sistema TEXT, litri INTEGER, giorno INTEGER);
          INSERT INTO consumi VALUES
            (1,'Propulsione',500,1),(2,'Propulsione',450,2),(3,'Propulsione',520,3),
            (4,'Manovra',800,1),(5,'Manovra',100,2),
            (6,'Riscaldamento',300,1),(7,'Riscaldamento',310,2),(8,'Riscaldamento',290,3),(9,'Riscaldamento',320,4),
            (10,'Illuminazione',150,1),(11,'Illuminazione',160,2),(12,'Illuminazione',140,3);`,
      },
      {
        nome: "L'Hangar",
        concetti: "COUNT(DISTINCT) · GROUP BY",
        storia:
          "Nell'hangar il registro dei voli di servizio. «Mi serve la navetta più 'esplorativa': non quella con più voli, " +
          "ma quella che ha visitato più destinazioni DIVERSE».",
        obiettivo:
          "Trova la <b>navetta</b> con il maggior numero di <b>destinazioni distinte</b>.",
        indizi: [
          "<code>COUNT(*)</code> conta i voli, non le destinazioni. Usa <code>COUNT(DISTINCT destinazione)</code>.",
          "Raggruppa: <code>GROUP BY navetta</code>.",
          "<code>ORDER BY COUNT(DISTINCT destinazione) DESC LIMIT 1</code>.",
        ],
        risposte: ["falco"],
        placeholder: "Navetta",
        soluzione: "SELECT navetta FROM voli GROUP BY navetta ORDER BY COUNT(DISTINCT destinazione) DESC LIMIT 1",
        setup: `
          CREATE TABLE voli (id INTEGER PRIMARY KEY, navetta TEXT, pilota TEXT, destinazione TEXT);
          INSERT INTO voli VALUES
            (1,'Aquila','Okafor','Luna'),(2,'Aquila','Okafor','Luna'),(3,'Aquila','Rossi','Marte'),(4,'Aquila','Okafor','Luna'),
            (5,'Falco','Chen','Luna'),(6,'Falco','Chen','Marte'),(7,'Falco','Rossi','Cerere'),
            (8,'Gufo','Tanaka','Luna'),(9,'Gufo','Tanaka','Luna'),(10,'Gufo','Novak','Luna'),(11,'Gufo','Tanaka','Luna'),(12,'Gufo','Novak','Luna');`,
      },
      {
        nome: "Il Magazzino Cargo",
        concetti: "AVG · COUNT · HAVING",
        storia:
          "Le casse del cargo bloccano un condotto. «Servono le categorie pesanti: peso medio sopra i 50 kg, ma solo se hanno almeno 3 casse. " +
          "Due casse enormi non fanno una categoria».",
        obiettivo:
          "Trova la <b>categoria</b> con <b>peso medio superiore a 50 kg</b> e <b>almeno 3 casse</b>.",
        indizi: [
          "<code>SELECT categoria, AVG(peso_kg), COUNT(*) FROM casse GROUP BY categoria;</code>",
          "Entrambe le condizioni vanno in <code>HAVING</code>.",
          "<code>HAVING AVG(peso_kg) &gt; 50 AND COUNT(*) &gt;= 3</code>.",
        ],
        risposte: ["attrezzatura"],
        placeholder: "Categoria",
        soluzione: "SELECT categoria FROM casse GROUP BY categoria HAVING AVG(peso_kg)>50 AND COUNT(*)>=3",
        setup: `
          CREATE TABLE casse (id INTEGER PRIMARY KEY, contenuto TEXT, categoria TEXT, peso_kg INTEGER);
          INSERT INTO casse VALUES
            (1,'Saldatrici','Attrezzatura',80),(2,'Trapani','Attrezzatura',60),(3,'Generatore','Attrezzatura',70),
            (4,'Antibiotici','Medicinali',5),(5,'Bende','Medicinali',8),(6,'Vaccini','Medicinali',6),
            (7,'Telescopio','Strumenti',120),(8,'Spettrometro','Strumenti',90),
            (9,'Razioni','Cibo',40),(10,'Acqua','Cibo',45),(11,'Conserve','Cibo',50),(12,'Surgelati','Cibo',52),
            (13,'Filtri','Ricambi',45),(14,'Valvole','Ricambi',50),(15,'Cavi','Ricambi',40);`,
      },
    ],
  },
  {
    id: 3,
    nome: "Il Nucleo del Computer",
    concetti: "JOIN · LEFT JOIN · più tabelle",
    intro:
      "ORION custodisce i dati in tabelle separate, collegate da chiavi. Per raggiungere la capsula devi incrociarle con i JOIN.",
    rooms: [
      {
        nome: "Il Registro delle Cabine",
        concetti: "JOIN",
        storia:
          "Per sbloccare i dati del capo ingegnere serve il numero della sua cabina. Le cabine contengono solo l'ID dell'occupante: " +
          "i nomi e i ruoli sono in un'altra tabella.",
        obiettivo:
          "Trova il <b>numero della cabina</b> dell'<b>Ingegnere capo</b> (<code>ruolo = 'Ingegnere capo'</code>), unendo <code>cabine</code> ed <code>equipaggio</code>.",
        indizi: [
          "<code>FROM cabine c JOIN equipaggio e ON c.equipaggio_id = e.id</code>.",
          "Filtra: <code>WHERE e.ruolo = 'Ingegnere capo'</code>.",
          "Seleziona <code>c.numero</code>.",
        ],
        risposte: ["314"],
        placeholder: "Numero cabina",
        soluzione: "SELECT c.numero FROM cabine c JOIN equipaggio e ON c.equipaggio_id=e.id WHERE e.ruolo='Ingegnere capo'",
        setup: `
          CREATE TABLE equipaggio (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);
          CREATE TABLE cabine (id INTEGER PRIMARY KEY, numero INTEGER, equipaggio_id INTEGER);
          INSERT INTO equipaggio VALUES
            (1,'Wei Chen','Comandante'),(2,'Luis Ibarra','Medico'),(3,'Ada Okafor','Pilota'),
            (4,'Ana Novak','Ingegnere capo'),(5,'Marco Rossi','Tecnico'),(6,'Yuki Tanaka','Biologa');
          INSERT INTO cabine VALUES (1,101,1),(2,207,2),(3,150,3),(4,314,4),(5,322,5),(6,410,6);`,
      },
      {
        nome: "Il Registro degli Accessi",
        concetti: "JOIN · WHERE · ORDER BY · LIMIT",
        storia:
          "Ogni passaggio dalla porta del reattore viene registrato con l'ID di chi l'ha attraversata. " +
          "«Chi è stato l'ULTIMO a entrare nel reattore prima del guasto? Voglio il suo cognome».",
        obiettivo:
          "Trova il <b>nome</b> di chi ha avuto l'<b>ultimo accesso</b> (ora più tarda) alla porta <b>'Reattore'</b>. Inserisci il <b>cognome</b>.",
        indizi: [
          "<code>FROM accessi a JOIN equipaggio e ON a.equipaggio_id = e.id</code>.",
          "Filtra la porta: <code>WHERE a.porta = 'Reattore'</code>.",
          "<code>ORDER BY a.ora DESC LIMIT 1</code>.",
        ],
        risposte: ["rossi", "marco rossi"],
        placeholder: "Cognome",
        soluzione: "SELECT e.nome FROM accessi a JOIN equipaggio e ON a.equipaggio_id=e.id WHERE a.porta='Reattore' ORDER BY a.ora DESC LIMIT 1",
        setup: `
          CREATE TABLE equipaggio (id INTEGER PRIMARY KEY, nome TEXT, ruolo TEXT);
          CREATE TABLE accessi (id INTEGER PRIMARY KEY, equipaggio_id INTEGER, porta TEXT, ora TEXT);
          INSERT INTO equipaggio VALUES
            (1,'Wei Chen','Comandante'),(2,'Luis Ibarra','Medico'),(3,'Ada Okafor','Pilota'),
            (4,'Ana Novak','Ingegnere capo'),(5,'Marco Rossi','Tecnico'),(6,'Yuki Tanaka','Biologa');
          INSERT INTO accessi VALUES
            (1,4,'Reattore','02:10'),(2,3,'Hangar','03:40'),(3,5,'Reattore','04:25'),
            (4,1,'Ponte','04:50'),(5,6,'Serra','05:05'),(6,4,'Mensa','05:30');`,
      },
      {
        nome: "Le Bombole d'Ossigeno",
        concetti: "JOIN · SUM · GROUP BY",
        storia:
          "Le bombole di riserva sono distribuite nei moduli. «Non ti serve la bombola più grande: ti serve il modulo con la maggiore riserva TOTALE. " +
          "Lì potrai respirare più a lungo».",
        obiettivo:
          "Trova il <b>nome del modulo</b> con il <b>totale di litri</b> di ossigeno più alto, unendo <code>bombole</code> e <code>moduli</code>.",
        indizi: [
          "<code>FROM bombole b JOIN moduli m ON b.modulo_id = m.id</code>.",
          "Raggruppa: <code>GROUP BY m.nome</code>, somma: <code>SUM(b.litri)</code>.",
          "<code>ORDER BY SUM(b.litri) DESC LIMIT 1</code>.",
        ],
        risposte: ["hangar"],
        placeholder: "Modulo",
        soluzione: "SELECT m.nome FROM bombole b JOIN moduli m ON b.modulo_id=m.id GROUP BY m.id ORDER BY SUM(b.litri) DESC LIMIT 1",
        setup: `
          CREATE TABLE moduli (id INTEGER PRIMARY KEY, nome TEXT, ponte INTEGER);
          CREATE TABLE bombole (id INTEGER PRIMARY KEY, modulo_id INTEGER, litri INTEGER);
          INSERT INTO moduli VALUES (1,'Mensa',1),(2,'Laboratorio',2),(3,'Hangar',3),(4,'Serra',2);
          INSERT INTO bombole VALUES
            (1,1,900),(2,1,400),
            (3,2,1500),
            (4,3,600),(5,3,700),(6,3,500),
            (7,4,300),(8,4,200);`,
      },
      {
        nome: "I Moduli Isolati",
        concetti: "LEFT JOIN · IS NULL",
        storia:
          "Alcuni moduli non hanno nessun sensore e sono quindi 'ciechi' per ORION: non può sapere cosa succede dentro. " +
          "«Escludi i moduli dismessi: quelli sono vuoti per ovvi motivi. Cerco quello ancora in uso ma senza sensori».",
        obiettivo:
          "Trova il <b>modulo</b> senza <b>nessun sensore</b> che <b>non sia dismesso</b> (<code>dismesso = 0</code>).",
        indizi: [
          "Un <code>JOIN</code> normale scarta i moduli senza sensori. Usa <code>FROM moduli m LEFT JOIN sensori s ON s.modulo_id = m.id</code>.",
          "Senza corrispondenza: <code>WHERE s.id IS NULL</code>.",
          "Escludi i dismessi: <code>AND m.dismesso = 0</code>.",
        ],
        risposte: ["osservatorio"],
        placeholder: "Modulo",
        soluzione: "SELECT m.nome FROM moduli m LEFT JOIN sensori s ON s.modulo_id=m.id WHERE s.id IS NULL AND m.dismesso=0",
        setup: `
          CREATE TABLE moduli (id INTEGER PRIMARY KEY, nome TEXT, dismesso INTEGER);
          CREATE TABLE sensori (id INTEGER PRIMARY KEY, modulo_id INTEGER, tipo TEXT);
          INSERT INTO moduli VALUES (1,'Mensa',0),(2,'Laboratorio',0),(3,'Hangar',0),(4,'Osservatorio',0),(5,'Deposito Vecchio',1);
          INSERT INTO sensori VALUES (1,1,'ossigeno'),(2,1,'temperatura'),(3,2,'ossigeno'),(4,3,'pressione'),(5,3,'ossigeno');`,
      },
      {
        nome: "Il Computer ORION",
        concetti: "JOIN su 3 tabelle",
        storia:
          "ORION ha infine accettato di collaborare. «Esiste una sola capsula di salvataggio davvero utilizzabile: deve essere PRONTA, " +
          "ancorata a un modulo ancora PRESSURIZZATO e con il serbatoio carico ALMENO al 50%. Se la trovi, ti lascio andare».",
        obiettivo:
          "Trova la <b>capsula</b> con <code>stato = 'pronta'</code>, collegata a un <b>modulo pressurizzato</b> (<code>pressurizzato = 1</code>) " +
          "e con <b>livello serbatoio ≥ 50</b>. Inserisci il suo <b>nome</b>.",
        indizi: [
          "Tre tabelle: <code>capsule c JOIN moduli m ON c.modulo_id = m.id JOIN serbatoi s ON s.capsula_id = c.id</code>.",
          "Condizioni su capsula e modulo: <code>c.stato = 'pronta' AND m.pressurizzato = 1</code>.",
          "Aggiungi <code>AND s.livello &gt;= 50</code>.",
        ],
        risposte: ["gamma", "capsula gamma"],
        placeholder: "Nome della capsula",
        soluzione:
          "SELECT c.nome FROM capsule c JOIN moduli m ON c.modulo_id=m.id JOIN serbatoi s ON s.capsula_id=c.id " +
          "WHERE c.stato='pronta' AND m.pressurizzato=1 AND s.livello>=50",
        setup: `
          CREATE TABLE moduli (id INTEGER PRIMARY KEY, nome TEXT, pressurizzato INTEGER);
          CREATE TABLE capsule (id INTEGER PRIMARY KEY, nome TEXT, stato TEXT, modulo_id INTEGER);
          CREATE TABLE serbatoi (capsula_id INTEGER, livello INTEGER);
          INSERT INTO moduli VALUES (1,'Hangar Nord',1),(2,'Hangar Sud',1),(3,'Hangar Est',0);
          INSERT INTO capsule VALUES
            (1,'Alfa','pronta',1),(2,'Beta','guasta',1),(3,'Gamma','pronta',2),(4,'Delta','pronta',3),(5,'Epsilon','pronta',2);
          INSERT INTO serbatoi VALUES (1,20),(2,80),(3,75),(4,90),(5,40);`,
      },
    ],
  },
];

// Gli id sono assegnati automaticamente in base all'ordine.
LEVELS.flatMap((l) => l.rooms).forEach((r, i) => (r.id = i + 1));

module.exports = { GAME, LEVELS };
