// Netlify Function
// Percorso consigliato:
// netlify/functions/google-reviews.js
//
// Configurare su Netlify:
// GOOGLE_PLACES_API_KEY = la tua chiave Google Places API
//
// NON mettere la chiave nel frontend.

exports.handler = async function () {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = "ChIJMZIYl5u_hkcRNqvBLpj1bi8";

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "GOOGLE_PLACES_API_KEY non configurata"
      })
    };
  }

  const endpoint =
    "https://places.googleapis.com/v1/places/" +
    encodeURIComponent(placeId);

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "displayName,rating,userRatingCount,googleMapsUri,reviews"
      }
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=900"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Errore nel recupero delle recensioni" })
    };
  }
};
