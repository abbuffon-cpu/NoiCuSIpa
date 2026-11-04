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

## Passare i dati dalla versione su Claude
Nella vecchia versione: Backup > "Salva file" (con i PDF). Nella nuova: Backup > "Importa file".

## Aggiornamenti
Sostituisci i file nel repository e cambia `cedolini-v2` in `cedolini-v2` dentro `sw.js`. L'app si aggiorna alla riapertura successiva.

## Dati
Sono salvati nel browser del dispositivo (IndexedDB). Fai backup periodici con "Salva file".
