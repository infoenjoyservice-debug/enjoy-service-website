# Enjoy Service — Integrazione manuale: Google Recensioni + Claim uniforme

Pacchetto pensato per il sito statico/Netlify di Enjoy Service.

## Obiettivi
1. Inserire una sezione dinamica di recensioni Google.
2. Uniformare il claim principale in tutto il sito:
   **Un solo referente per il tuo immobile**
3. Eliminare/evitare varianti concorrenti come:
   - Un solo partner, mille soluzioni
   - Un solo referente / tanti servizi
4. Mantenere CTA coerenti:
   - Preventivo gratuito
   - WhatsApp
   - Lascia una recensione su Google

## Nota tecnica
Il pacchetto NON contiene una API key Google. Per la modalità automatica tramite Google Places API (New), la chiave va configurata lato Netlify Function/server-side.

Google Places API può restituire rating, numero recensioni, link Google Maps e un massimo di 5 recensioni. Le recensioni visualizzate devono mantenere le attribuzioni/autore e il link alla fonte Google Maps.

Riferimento ufficiale:
https://developers.google.com/maps/documentation/places/web-service/policies

Place ID individuato dal link Google fornito:
ChIJMZIYl5u_hkcRNqvBLpj1bi8
