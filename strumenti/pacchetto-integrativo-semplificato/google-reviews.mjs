const PLACE_ID = "ChIJMZIYl5u_hkcRNqvBLpj1bi8";
const GOOGLE_ENDPOINT =
  `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=it&regionCode=IT`;

export default async () => {
  const apiKey =
    Netlify.env.get("GOOGLE_PLACES_API_KEY") ||
    process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return json(
      { ok: false, error: "GOOGLE_PLACES_API_KEY non configurata su Netlify" },
      500
    );
  }

  try {
    const response = await fetch(GOOGLE_ENDPOINT, {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,googleMapsUri,reviews"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return json(
        {
          ok: false,
          error:
            data?.error?.message ||
            `Google Places API ha restituito HTTP ${response.status}`
        },
        response.status
      );
    }

    return json(
      { ok: true, place: data },
      200,
      { "cache-control": "public, max-age=900, stale-while-revalidate=3600" }
    );
  } catch (error) {
    return json(
      { ok: false, error: "Errore di collegamento a Google Places API" },
      502
    );
  }
};

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...extraHeaders
    }
  });
}
