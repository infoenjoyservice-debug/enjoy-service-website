export default async (request) => {
  const apiKey = Netlify.env.get("GOOGLE_PLACES_API_KEY");
  const placeId = "ChIJMZIYl5u_hkcRNqvBLpj1bi8";

  if (!apiKey) {
    return new Response(JSON.stringify({
      ok: false,
      error: "GOOGLE_PLACES_API_KEY non configurata"
    }), {
      status: 503,
      headers: {"content-type": "application/json; charset=utf-8", "cache-control": "no-store"}
    });
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=it&regionCode=IT`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,googleMapsUri,reviews"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({
        ok: false,
        error: "Google Places API error",
        details: data
      }), {
        status: 502,
        headers: {"content-type": "application/json; charset=utf-8"}
      });
    }

    return new Response(JSON.stringify({ok: true, place: data}), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=900, stale-while-revalidate=3600"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      ok: false,
      error: "Errore nel collegamento a Google Places"
    }), {
      status: 502,
      headers: {"content-type": "application/json; charset=utf-8"}
    });
  }
};
