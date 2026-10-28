# Test dopo il deploy

1. Aprire `/api/google-reviews`.
2. Verificare `ok: true`.
3. Verificare `rating`.
4. Verificare `userRatingCount`.
5. Verificare `reviews`.
6. Aprire Home in incognito.
7. Verificare che le recensioni compaiano.
8. Cliccare `Leggi tutte le recensioni su Google`.
9. Cliccare `Lascia una recensione`.
10. Controllare smartphone.
11. Controllare console browser.
12. Cercare nel progetto la frase `Un solo partner, mille soluzioni`.
13. Deve risultare zero occorrenze.

## Se `/api/google-reviews` restituisce 500
Quasi sempre significa:
- variabile GOOGLE_PLACES_API_KEY mancante;
- nome variabile errato;
- deploy non aggiornato.

## Se restituisce 502
Controllare:
- Places API (New) abilitata;
- billing Google Cloud;
- API key valida;
- restrizioni della chiave;
- Place ID.
