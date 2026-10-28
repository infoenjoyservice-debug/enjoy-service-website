// Esempio di Netlify Function per Places API (New)
// File suggerito: netlify/functions/google-reviews.js
//
// Configurare GOOGLE_PLACES_API_KEY come Environment Variable su Netlify.
// NON inserire mai la chiave nel JavaScript esposto al browser.

exports.handler = async function () {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = "ChIJMZIYl5u_hkcRNqvBLpj1bi8";

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "GOOGLE_PLACES_API_KEY non configurata" })
    };
  }

  const url =
    "https://places.googleapis.com/v1/places/" +
    encodeURIComponent(placeId);

  const response = await fetch(url, {
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
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(data)
  };
};
