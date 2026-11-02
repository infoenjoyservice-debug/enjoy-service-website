# Istruzioni di applicazione

1. Fare una copia di backup del progetto attualmente pubblicato.
2. Integrare il contenuto di `patch/homepage-copy.html` nella homepage: sostituire hero e sezione servizi, adattando classi e link alla struttura effettiva del sito.
3. Sostituire il contenuto della select `name="servizio"` del modulo con `patch/modulo-preventivo.html`. Non sostituire il resto del form: conservare `form-name`, honeypot, action, campi privacy e configurazione Netlify Forms.
4. Integrare `patch/jsonld-localbusiness.json` nel JSON-LD della homepage, evitando duplicati di `LocalBusiness`. Controllare URL, logo, immagini, indirizzo e profili social.
5. Verificare che le pagine collegate esistano e restituiscano HTTP 200. Le nuove voci senza URL specifico possono restare senza link finché le pagine non saranno create.
6. Testare invio preventivo, pagina grazie, checkbox privacy e ricezione del messaggio.
7. Validare il JSON-LD con Rich Results Test e Schema Markup Validator.
8. Pubblicare tramite il normale flusso Netlify e controllare il deploy in produzione.

**Classificazione da mantenere:** B&B, sgomberi, giardinaggio e portineria sono diretti; manutenzioni generali e ristrutturazioni sono tramite partner.

Questo pacchetto è una patch integrativa: non contiene la root completa del sito e non va caricato da solo come sito Netlify.
