(() => {
  const summary = document.getElementById("google-reviews-summary");
  const list = document.getElementById("google-reviews-list");
  const link = document.getElementById("google-reviews-link");

  if (!summary || !list) return;

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));

  const stars = (rating) => {
    const n = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    return "★".repeat(n) + "☆".repeat(5 - n);
  };

  fetch("/api/google-reviews", {headers:{accept:"application/json"}})
    .then(r => r.json().then(data => ({ok:r.ok, data})))
    .then(({ok, data}) => {
      if (!ok || !data?.ok) throw new Error(data?.error || "API non disponibile");

      const place = data.place || {};
      const rating = place.rating;
      const count = place.userRatingCount;
      if (place.googleMapsUri) link.href = place.googleMapsUri;

      summary.innerHTML = rating
        ? `<strong>${escapeHtml(rating)}/5</strong> · ${escapeHtml(count || 0)} recensioni su Google`
        : "Recensioni Google";

      const reviews = Array.isArray(place.reviews) ? place.reviews : [];
      list.innerHTML = reviews.length
        ? reviews.map(review => {
            const author = review.authorAttribution?.displayName || "Cliente Google";
            const text = review.text?.text || review.originalText?.text || "";
            const date = review.relativePublishTimeDescription || "";
            return `<article class="google-review">
              <div class="google-review__author">${escapeHtml(author)}</div>
              <div class="google-review__rating" aria-label="Valutazione ${escapeHtml(review.rating || "")} su 5">${stars(review.rating)}</div>
              <p class="google-review__text">${escapeHtml(text)}</p>
              ${date ? `<div class="google-review__date">${escapeHtml(date)}</div>` : ""}
            </article>`;
          }).join("")
        : "<p>Le recensioni sono disponibili direttamente su Google.</p>";
    })
    .catch(() => {
      summary.textContent = "Scopri le valutazioni dei nostri clienti su Google.";
      list.innerHTML = "";
    });
})();
