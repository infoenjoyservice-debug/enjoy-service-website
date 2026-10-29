(() => {
  const summary=document.getElementById("google-reviews-summary");
  const list=document.getElementById("google-reviews-list");
  const link=document.getElementById("google-reviews-link");
  if(!summary||!list)return;

  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const stars=v=>{const n=Math.max(0,Math.min(5,Math.round(Number(v)||0)));return "★".repeat(n)+"☆".repeat(5-n)};

  fetch("/api/google-reviews",{headers:{accept:"application/json"}})
    .then(async r=>{const d=await r.json();if(!r.ok||!d.ok)throw new Error(d.error||"API non disponibile");return d})
    .then(({place})=>{
      if(place.googleMapsUri)link.href=place.googleMapsUri;
      summary.innerHTML=place.rating?`<strong>${esc(place.rating)}/5</strong> · ${esc(place.userRatingCount||0)} recensioni su Google`:"Recensioni Google";
      const reviews=Array.isArray(place.reviews)?place.reviews:[];
      if(!reviews.length){list.innerHTML="<p>Le recensioni sono disponibili direttamente su Google.</p>";return;}
      list.innerHTML=reviews.map(r=>{
        const author=r.authorAttribution?.displayName||"Cliente Google";
        const text=r.text?.text||r.originalText?.text||"";
        const date=r.relativePublishTimeDescription||"";
        return `<article class="google-review"><div class="google-review__author">${esc(author)}</div><div class="google-review__rating" aria-label="Valutazione ${esc(r.rating||"")} su 5">${stars(r.rating)}</div><p class="google-review__text">${esc(text)}</p>${date?`<div class="google-review__date">${esc(date)}</div>`:""}</article>`;
      }).join("");
    })
    .catch(()=>{summary.textContent="Scopri le valutazioni dei nostri clienti su Google.";list.innerHTML=""});
})();
