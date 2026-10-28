# 01 — Google Recensioni

## Sezione consigliata

Titolo:
**Cosa dicono i nostri clienti**

Testo:
**La qualità del servizio passa anche dalla soddisfazione dei nostri clienti. Scopri le recensioni lasciate su Google.**

Elementi:
- valutazione media Google
- numero recensioni
- 3–5 recensioni dinamiche
- nome autore
- data relativa, quando disponibile
- link alla singola recensione su Google Maps
- logo/attribuzione Google Maps
- CTA: **Leggi tutte le recensioni su Google**
- CTA: **Lascia una recensione**

## Perché usare API e non copiare/incollare le recensioni
La modalità dinamica permette di mostrare dati aggiornati e riduce il rischio di avere testi vecchi sul sito. Google impone comunque specifici requisiti di attribuzione e accesso alla fonte.

## Place ID
ChIJMZIYl5u_hkcRNqvBLpj1bi8

## API
Per Places API (New), richiedere solo i campi necessari, ad esempio:
- displayName
- rating
- userRatingCount
- googleMapsUri
- reviews

Le API restituiscono al massimo 5 recensioni per luogo.

## Posizione consigliata in Home
Subito dopo:
**Lavori svolti / Prima e dopo**

e prima del blocco finale di preventivo.

## Fallback manuale
Se non vuoi attivare subito l'API, puoi inserire un blocco statico con:
- rating Google
- pulsante alla scheda Google
- pulsante per lasciare una recensione

Non presentare recensioni copiate come se fossero un feed automatico.
