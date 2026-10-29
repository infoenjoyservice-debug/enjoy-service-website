const PLACE_ID = "ChIJMZIYl5u_hkcRNqvBLpj1bi8";

export default async () => {
  const apiKey = Netlify.env.get("GOOGLE_PLACES_API_KEY");
  if (!apiKey) return new Response(JSON.stringify({ok:false,error:"GOOGLE_PLACES_API_KEY non configurata"}), {
    status:500, headers:{"content-type":"application/json; charset=utf-8"}
  });

  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=it&regionCode=IT`;

  try {
    const response = await fetch(url, {
      headers:{
        "X-Goog-Api-Key":apiKey,
        "X-Goog-FieldMask":"id,displayName,rating,userRatingCount,googleMapsUri,reviews"
      }
    });
    const data = await response.json();
    return new Response(JSON.stringify(response.ok ? {ok:true,place:data} : {
      ok:false,error:data?.error?.message || "Google Places API error"
    }), {
      status:response.ok ? 200 : response.status,
      headers:{
        "content-type":"application/json; charset=utf-8",
        "cache-control":"public, max-age=900"
      }
    });
  } catch {
    return new Response(JSON.stringify({ok:false,error:"Errore di collegamento a Google Places API"}), {
      status:500, headers:{"content-type":"application/json; charset=utf-8"}
    });
  }
};
