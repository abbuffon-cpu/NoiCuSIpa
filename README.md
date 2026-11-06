# Archivio cedolini (PWA)

## Pubblicazione su GitHub Pages
1. Crea un account su github.com e un nuovo repository **pubblico** (es. `cedolini`). Il repository contiene solo il programma, mai i tuoi dati.
2. Nel repository: Add file > Upload files. Trascina TUTTI i file di questa cartella (index.html, manifest.webmanifest, sw.js, le due icone e la cartella `lib` se l'hai creata) e conferma con Commit.
3. Settings > Pages > Source: "Deploy from a branch", Branch: `main`, cartella `/ (root)` > Save.
4. Dopo uno o due minuti l'indirizzo e` `https://TUO-UTENTE.github.io/cedolini/`.

## Installazione
- **Android (Chrome)**: menu > Installa app.
- **iPhone/iPad (Safari)**: Condividi > Aggiungi alla schermata Home.
- **Computer (Edge/Chrome)**: icona di installazione nella barra degli indirizzi.

## Funzionamento offline (consigliato)
Scarica questi due file e mettili nella cartella `lib` del repository:
- https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js
- https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js

Senza, l'app funziona lo stesso ma scarica il lettore PDF da internet al primo avvio.

## Sincronizzazione cloud con Supabase (facoltativa, cifrata)
1. Su supabase.com crea un progetto (scegli una regione in Europa).
2. SQL Editor > New query: incolla il contenuto di `supabase.sql` ed esegui.
3. Authentication > Users > Add user: crea il tuo utente con email e password e spunta "Auto Confirm User".
4. Authentication > Sign In / Providers > disattiva "Allow new users to sign up", cosi nessun altro puo registrarsi.
5. Project Settings > API: copia l'URL del progetto e la chiave **anon / publishable**. NON usare mai la chiave `service_role`.
6. Nell'app: Backup > Cloud: inserisci URL, chiave anon, email, password e una **passphrase di cifratura** (min. 8 caratteri). Usa la stessa passphrase su tutti i dispositivi.

I dati (cedolini, PDF, note, ordine righe, unioni di codici) sono cifrati nel browser con AES-256 prima di essere inviati. Supabase conserva solo dati illeggibili. **Se perdi la passphrase i dati nel cloud non sono recuperabili**: tieni anche un backup con "Salva file". La sincronizzazione parte da sola dopo ogni modifica e quando riapri l'app; sul dispositivo restano comunque tutti i dati, quindi l'app funziona anche offline.

## Passphrase dimenticata o da cambiare
- **Da un dispositivo ancora collegato** (Backup > Cloud): scrivi la nuova passphrase e premi "Cambia passphrase". I dati vengono ricifrati. Sugli altri dispositivi premi "Esci" e rientra con la nuova passphrase.
- **Se nessun dispositivo e` piu collegato**: la vecchia passphrase non si puo recuperare (e` voluto). Dal dispositivo che ha tutti i cedolini fai Accedi con la casella "Ho dimenticato la passphrase" spuntata: il cloud viene cancellato e ricaricato da quel dispositivo con la nuova passphrase. Prima fai un backup con "Salva file".

## Problemi con i dati nel cloud
- Errore "Dato cifrato non valido" o "atob": la colonna `data` della tabella `vault` non e` di tipo `text`, oppure contiene righe vecchie danneggiate. In Supabase > SQL Editor controlla il tipo con:
  `select data_type from information_schema.columns where table_name='vault' and column_name='data';`
  Deve rispondere `text`. Per svuotare tutta la tabella (i dati cifrati nel cloud; quelli nei dispositivi non si toccano):
  `delete from public.vault;`
  Poi accedi di nuovo dall'app con una nuova passphrase.
- L'errore mostra tra parentesi il passo in cui e` avvenuto (es. "[passo: lettura chiave cloud]"): comunicalo se serve assistenza.

## Tenere attivo il progetto Supabase (GitHub Actions)
Il piano gratuito mette in pausa i progetti inattivi per circa una settimana. Questo automatismo contatta il progetto due volte a settimana (lunedi e giovedi).
1. Nel repository GitHub: Add file > Create new file. Come nome scrivi `.github/workflows/keepalive.yml` (le barre creano le cartelle) e incolla il contenuto del file `github-keepalive.yml` di questo pacchetto. Commit. Non trascinare la cartella `.github`: i file nascosti spesso non vengono caricati.
2. Settings > Secrets and variables > Actions > scheda **Variables** > New repository variable. Crea `SUPABASE_URL` (l'indirizzo del progetto) e `SUPABASE_ANON_KEY` (la chiave anon/publishable). Sono dati pubblici, non servono i Secrets.
3. Actions > Keep Supabase alive > Run workflow per provarlo subito. Deve risultare verde.
Il secondo passaggio del workflow scrive un file con la data nel repository: serve a evitare che GitHub disattivi l'automatismo dopo 60 giorni senza attivita. Non e` garantito che Supabase consideri questa chiamata come attivita: controlla dopo qualche settimana che il progetto non sia andato in pausa.

## Passare i dati dalla versione su Claude
Nella vecchia versione: Backup > "Salva file" (con i PDF). Nella nuova: Backup > "Importa file".

## Aggiornamenti
Sostituisci i file nel repository e cambia `cedolini-v8` in `cedolini-v9` e il numero in APPV dentro index.html dentro `sw.js`. L'app si aggiorna alla riapertura successiva.

## Dati
Sono salvati nel browser del dispositivo (IndexedDB). Fai backup periodici con "Salva file".
