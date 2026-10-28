async function loadGoogleReviews() {
  const response = await fetch("/.netlify/functions/google-reviews");
  if (!response.ok) return;

  const place = await response.json();

  const rating = document.getElementById("google-rating");
  const count = document.getElementById("google-review-count");
  const list = document.getElementById("google-reviews-list");
  const allReviews = document.getElementById("google-all-reviews");

  if (rating && place.rating != null) {
    rating.textContent = Number(place.rating).toFixed(1) + "/5";
  }

  if (count && place.userRatingCount != null) {
    count.textContent = place.userRatingCount + " recensioni Google";
  }

  if (allReviews && place.googleMapsUri) {
    allReviews.href = place.googleMapsUri;
  }

  if (!list || !Array.isArray(place.reviews)) return;

  list.innerHTML = place.reviews.map((review) => {
    const author =
      review.authorAttribution?.displayName || "Cliente Google";
    const text = review.text?.text || "";
    const stars = "★".repeat(Math.round(review.rating || 0));
    const source = review.googleMapsUri
      ? `<a href="${review.googleMapsUri}" target="_blank" rel="noopener noreferrer">Vedi su Google Maps</a>`
      : "";

    return `
      <article class="google-review">
        <div class="google-review__stars"
             aria-label="${review.rating || 0} stelle">${stars}</div>
        <p>${escapeHtml(text)}</p>
        <strong>${escapeHtml(author)}</strong>
        <div>${source}</div>
      </article>
    `;
  }).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", loadGoogleReviews);
