INTEGRAZIONE MANUALE — PUNTI 1 E 2
Enjoy Service SRL

OBIETTIVI
1. Integrare nella Home una sezione "Cosa dicono i nostri clienti" con dati/recensioni Google.
2. Uniformare il claim in tutto il sito sostituendo:
   "Un solo partner, mille soluzioni."
   con:
   "Un solo referente per il tuo immobile"

IMPORTANTE
Questo ZIP NON è un sito completo e NON va pubblicato da solo.
Va copiato dentro il progetto originale di Enjoy Service, mantenendo tutte le pagine, immagini, CSS e file già presenti.

PASSO 1 — COPIA FILE
Copia:
- enjoy-service-integration.js
  nella ROOT del progetto originale
- netlify/functions/google-reviews.mjs
  dentro la cartella:
  netlify/functions/

PASSO 2 — COLLEGA LO SCRIPT
Nel file HTML della Home (o nel template globale, se esiste), subito prima di </body> inserisci:

<script src="/enjoy-service-integration.js" defer></script>

Se il progetto usa già un template comune, è preferibile inserirlo una sola volta nel template globale.

PASSO 3 — GOOGLE PLACES API
Su Netlify:
Site configuration → Environment variables

Aggiungi:
Nome: GOOGLE_PLACES_API_KEY
Valore: la tua API key Google Maps Platform

Non inserire mai la chiave dentro il file JavaScript frontend.

La funzione usa il Place ID:
ChIJMZIYl5u_hkcRNqvBLpj1bi8

La funzione richiede i campi:
id, displayName, rating, userRatingCount, googleMapsUri, reviews

PASSO 4 — DEPLOY
Pubblica il PROGETTO ORIGINALE COMPLETO su Netlify.

NON caricare questo ZIP come sito autonomo.

PASSO 5 — TEST
Dopo il deploy:
1. apri la Home;
2. controlla che il footer non mostri più "Un solo partner, mille soluzioni.";
3. cerca "Cosa dicono i nostri clienti";
4. verifica rating e recensioni Google;
5. clicca "Vedi tutte su Google";
6. verifica che il pulsante apra la pagina Google corretta.

TEST API
Apri:
https://TUO-DOMINIO/api/google-reviews

Deve restituire JSON con:
{"ok":true,"place":{...}}

Se restituisce errore GOOGLE_PLACES_API_KEY non configurata:
controlla la variabile Netlify e fai un nuovo deploy.

NOTA
Google Places API (New) può restituire rating, numero totale di recensioni e fino a 5 recensioni per Place Details. La visualizzazione deve mantenere le attribuzioni richieste da Google.
