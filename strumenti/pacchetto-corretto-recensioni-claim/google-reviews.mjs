const PLACE_ID = "ChIJMZIYl5u_hkcRNqvBLpj1bi8";

export default async (request) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "GOOGLE_PLACES_API_KEY non configurata su Netlify"
      }),
      {
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" }
      }
    );
  }

  const url =
    `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}` +
    `?languageCode=it&regionCode=IT`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,googleMapsUri,reviews"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: data?.error?.message || "Google Places API ha restituito un errore",
          googleStatus: response.status
        }),
        {
          status: 502,
          headers: { "content-type": "application/json; charset=utf-8" }
        }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        place: data
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "public, max-age=900"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Errore di connessione con Google Places API"
      }),
      {
        status: 502,
        headers: { "content-type": "application/json; charset=utf-8" }
      }
    );
  }
};
