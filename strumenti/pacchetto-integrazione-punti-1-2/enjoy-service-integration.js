(() => {
  "use strict";

  const GOOGLE_REVIEW_URL = "https://g.page/r/CTarwS6Y9W4vEBM/review";
  const API_URL = "/api/google-reviews";

  const claimFrom = "Un solo partner, mille soluzioni.";
  const claimTo = "Un solo referente per il tuo immobile";

  function replaceClaim() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.nodeValue && node.nodeValue.includes(claimFrom)) {
        node.nodeValue = node.nodeValue.split(claimFrom).join(claimTo);
      }
    });
  }

  function css() {
    if (document.getElementById("es-reviews-style")) return;
    const style = document.createElement("style");
    style.id = "es-reviews-style";
    style.textContent = `
      #es-google-reviews {
        margin: 48px auto;
        max-width: 1120px;
        padding: 34px 22px;
        border-radius: 22px;
        background: #f6f8fb;
        border: 1px solid #e5e9ef;
      }
      #es-google-reviews .es-review-head {
        display:flex; gap:20px; align-items:flex-end; justify-content:space-between;
        margin-bottom:22px; flex-wrap:wrap;
      }
      #es-google-reviews h2 { margin:0 0 8px; }
      #es-google-reviews .es-rating { font-size:1.05rem; font-weight:700; }
      #es-google-reviews .es-stars { letter-spacing:1px; }
      #es-google-reviews .es-review-grid {
        display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px;
      }
      #es-google-reviews .es-card {
        background:#fff; border:1px solid #e5e9ef; border-radius:16px; padding:20px;
      }
      #es-google-reviews .es-card p { margin:0 0 14px; line-height:1.6; }
      #es-google-reviews .es-author { font-weight:700; }
      #es-google-reviews .es-date { font-size:.9rem; opacity:.7; }
      #es-google-reviews .es-google-btn {
        display:inline-flex; align-items:center; justify-content:center;
        padding:12px 17px; border-radius:10px; text-decoration:none; font-weight:700;
        border:1px solid currentColor;
      }
      @media (max-width: 800px) {
        #es-google-reviews .es-review-grid { grid-template-columns:1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[ch]));
  }

  function findInjectionPoint() {
    const headings = [...document.querySelectorAll("h2")];
    const target = headings.find(h => /contattaci|richiedi il tuo preventivo/i.test(h.textContent || ""));
    if (target) return target.closest("section") || target.parentElement;
    return document.querySelector("main")?.lastElementChild || document.body;
  }

  function reviewSection(place) {
    const rating = Number(place.rating || 0);
    const count = Number(place.userRatingCount || 0);
    const reviews = Array.isArray(place.reviews) ? place.reviews.slice(0, 3) : [];
    const mapsUrl = place.googleMapsUri || GOOGLE_REVIEW_URL;

    const cards = reviews.map(r => {
      const author = r.authorAttribution?.displayName || "Cliente Google";
      const text = r.text?.text || r.originalText?.text || "";
      const date = r.relativePublishTimeDescription || "";
      const stars = "★".repeat(Math.max(0, Math.min(5, Math.round(Number(r.rating || 5)))));
      return `
        <article class="es-card">
          <div class="es-stars" aria-label="${escapeHtml(r.rating || 5)} su 5">${stars}</div>
          <p>${escapeHtml(text)}</p>
          <div class="es-author">${escapeHtml(author)}</div>
          <div class="es-date">${escapeHtml(date)}</div>
        </article>`;
    }).join("");

    const fallback = `
      <article class="es-card">
        <p>Scopri le recensioni e lascia anche tu la tua esperienza su Google.</p>
        <a class="es-google-btn" href="${escapeHtml(GOOGLE_REVIEW_URL)}" target="_blank" rel="noopener">Vedi / lascia una recensione su Google</a>
      </article>`;

    return `
      <section id="es-google-reviews" aria-labelledby="es-google-reviews-title">
        <div class="es-review-head">
          <div>
            <div>Cosa dicono i nostri clienti</div>
            <h2 id="es-google-reviews-title">Recensioni Google</h2>
            ${rating ? `<div class="es-rating"><span class="es-stars">★★★★★</span> ${rating.toFixed(1)}/5${count ? ` · ${count} recensioni` : ""}</div>` : ""}
          </div>
          <a class="es-google-btn" href="${escapeHtml(GOOGLE_REVIEW_URL)}" target="_blank" rel="noopener">Vedi tutte su Google</a>
        </div>
        <div class="es-review-grid">${cards || fallback}</div>
      </section>`;
  }

  async function loadReviews() {
    if (document.getElementById("es-google-reviews")) return;
    css();

    let place = null;
    try {
      const res = await fetch(API_URL, {headers: {"Accept":"application/json"}});
      if (res.ok) {
        const json = await res.json();
        if (json.ok) place = json.place;
      }
    } catch (_) {}

    const wrapper = document.createElement("div");
    wrapper.innerHTML = reviewSection(place || {});
    const section = wrapper.firstElementChild;
    const point = findInjectionPoint();
    point.parentNode.insertBefore(section, point);
  }

  function init() {
    replaceClaim();
    loadReviews();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else {
    init();
  }
})();
