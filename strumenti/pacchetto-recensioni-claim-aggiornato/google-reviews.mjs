const PLACE_ID = "ChIJMZIYl5u_hkcRNqvBLpj1bi8";

export default async (request) => {
  const key = Netlify.env.get("GOOGLE_PLACES_API_KEY");

  if (!key) {
    return new Response(JSON.stringify({
      ok: false,
      error: "GOOGLE_PLACES_API_KEY non configurata"
    }), {
      status: 500,
      headers: {"content-type":"application/json; charset=utf-8"}
    });
  }

  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=it&regionCode=IT`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,googleMapsUri,reviews"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({
        ok: false,
        error: data?.error?.message || "Errore Google Places API"
      }), {
        status: response.status,
        headers: {"content-type":"application/json; charset=utf-8"}
      });
    }

    return new Response(JSON.stringify({ok:true, place:data}), {
      status: 200,
      headers: {
        "content-type":"application/json; charset=utf-8",
        "cache-control":"public, max-age=900"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      ok:false,
      error:"Impossibile contattare Google Places API"
    }), {
      status:500,
      headers:{"content-type":"application/json; charset=utf-8"}
    });
  }
};
