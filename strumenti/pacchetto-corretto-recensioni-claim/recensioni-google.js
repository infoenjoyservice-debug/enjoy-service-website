(() => {
  const status = document.getElementById("es-google-status");
  const summary = document.getElementById("es-google-summary");
  const ratingEl = document.getElementById("es-google-rating");
  const countEl = document.getElementById("es-google-count");
  const list = document.getElementById("es-google-list");
  const allLink = document.getElementById("es-google-all");

  if (!status || !list) return;

  const esc = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  async function load() {
    try {
      const response = await fetch("/api/google-reviews", {
        headers: { "Accept": "application/json" }
      });

      const data = await response.json();

      if (!response.ok || !data.ok || !data.place) {
        throw new Error(data.error || "Impossibile caricare le recensioni");
      }

      const place = data.place;

      if (place.rating != null) {
        ratingEl.textContent = `${Number(place.rating).toFixed(1)}/5`;
      }

      if (place.userRatingCount != null) {
        countEl.textContent = `${place.userRatingCount} recensioni Google`;
      }

      if (place.googleMapsUri) {
        allLink.href = place.googleMapsUri;
      }

      summary.hidden = false;

      const reviews = Array.isArray(place.reviews) ? place.reviews : [];

      if (!reviews.length) {
        status.textContent = "Consulta tutte le recensioni su Google.";
        return;
      }

      status.remove();

      list.innerHTML = reviews.map((review) => {
        const stars = "★".repeat(Math.round(Number(review.rating) || 0));
        const author =
          review.authorAttribution?.displayName || "Cliente Google";
        const text = review.text?.text || review.originalText?.text || "";
        const time = review.relativePublishTimeDescription || "";

        return `
          <article class="es-google-card">
            <div class="es-google-stars" aria-label="${esc(review.rating)} stelle">
              ${stars}
            </div>
            <p>${esc(text)}</p>
            <strong>${esc(author)}</strong>
            ${time ? `<small>${esc(time)}</small>` : ""}
          </article>
        `;
      }).join("");
    } catch (error) {
      // Il link Google resta sempre utilizzabile anche se l'API non è configurata.
      status.innerHTML =
        'Le recensioni sono disponibili su Google. ' +
        '<a href="https://g.page/r/CTarwS6Y9W4vEBM/review" target="_blank" rel="noopener noreferrer">Leggi le recensioni</a>.';
    }
  }

  load();
})();
