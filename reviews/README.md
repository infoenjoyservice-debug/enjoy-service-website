# Enjoy Service — Integrativo recensioni

Pacchetto manuale "drop-in" per aggiungere al sito:
- pulsante per lasciare una recensione Google;
- sezione recensioni;
- modulo locale per raccogliere una recensione;
- stile responsive.

## Installazione

1. Apri `config.js` e sostituisci `GOOGLE_REVIEW_URL` con il link diretto alla scheda Google di Enjoy Service.
2. Copia `review-widget.html` nella Home nel punto in cui vuoi mostrare la sezione.
3. Copia `assets/reviews.css` nel CSS del sito.
4. Copia `assets/reviews.js` e includilo prima di `</body>`.
5. Se vuoi usare il modulo, collega l'azione di invio al tuo backend/form provider. Il pacchetto NON invia dati a un server da solo.

## Importante

Il modulo locale usa un placeholder per la destinazione del form. Non inserire dati personali in servizi non configurati. Per le recensioni Google, usa esclusivamente il link ufficiale della scheda Google Business Profile.

## Struttura

- `review-widget.html` — blocco HTML pronto da inserire
- `config.js` — configurazione
- `assets/reviews.css` — stile
- `assets/reviews.js` — comportamento
