(() => {
  "use strict";

  const CLAIM_OLD = "Un solo partner, mille soluzioni.";
  const CLAIM_NEW = "Un solo referente per il tuo immobile";
  const GOOGLE_REVIEW_URL = "https://g.page/r/CTarwS6Y9W4vEBM/review";

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function replaceClaim(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue.includes(CLAIM_OLD)) {
            return NodeFilter.FILTER_REJECT;
          }
          const parent = node.parentElement;
          if (parent && ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);

    nodes.forEach((textNode) => {
      textNode.nodeValue = textNode.nodeValue.split(CLAIM_OLD).join(CLAIM_NEW);
    });
  }

  function addStyles() {
    if (document.getElementById("enjoy-google-reviews-style")) return;

    const style = document.createElement("style");
    style.id = "enjoy-google-reviews-style";
    style.textContent = `
      #enjoy-google-reviews {
        padding: clamp(48px, 7vw, 88px) 0;
      }
      #enjoy-google-reviews .egr-wrap {
        max-width: 1180px;
        margin: 0 auto;
        padding: 0 20px;
      }
      #enjoy-google-reviews .egr-eyebrow {
        margin: 0 0 10px;
        font-size: .8rem;
        font-weight: 800;
        letter-spacing: .1em;
      }
      #enjoy-google-reviews h2 {
        margin: 0 0 12px;
      }
      #enjoy-google-reviews .egr-intro {
        max-width: 760px;
        margin-bottom: 24px;
      }
      #enjoy-google-reviews .egr-summary {
        margin: 0 0 24px;
        font-weight: 700;
      }
      #enjoy-google-reviews .egr-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }
      #enjoy-google-reviews .egr-card {
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 18px;
        padding: 20px;
        background: #fff;
      }
      #enjoy-google-reviews .egr-author {
        font-weight: 800;
        margin-bottom: 7px;
      }
      #enjoy-google-reviews .egr-stars {
        letter-spacing: .08em;
        margin-bottom: 10px;
      }
      #enjoy-google-reviews .egr-text {
        line-height: 1.6;
        margin: 0;
      }
      #enjoy-google-reviews .egr-date {
        margin-top: 12px;
        font-size: .85rem;
        opacity: .68;
      }
      #enjoy-google-reviews .egr-link {
        display: inline-block;
        margin-top: 24px;
        text-decoration: underline;
      }
      @media (max-width: 800px) {
        #enjoy-google-reviews .egr-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function stars(rating) {
    const n = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    return "★".repeat(n) + "☆".repeat(5 - n);
  }

  function createSection() {
    if (document.getElementById("enjoy-google-reviews")) return;

    addStyles();

    const section = document.createElement("section");
    section.id = "enjoy-google-reviews";
    section.setAttribute("aria-labelledby", "enjoy-google-reviews-title");
    section.innerHTML = `
      <div class="egr-wrap">
        <div class="egr-intro">
          <p class="egr-eyebrow">RECENSIONI GOOGLE</p>
          <h2 id="enjoy-google-reviews-title">Cosa dicono i nostri clienti</h2>
          <p>Le valutazioni dei clienti di Enjoy Service direttamente da Google.</p>
        </div>
        <div class="egr-summary" id="egr-summary" aria-live="polite">
          Caricamento recensioni…
        </div>
        <div class="egr-grid" id="egr-grid" aria-live="polite"></div>
        <a class="egr-link" id="egr-link"
           href="${GOOGLE_REVIEW_URL}" target="_blank" rel="noopener">
          Leggi le recensioni su Google ↗
        </a>
      </div>
    `;

    // Inserisce la sezione prima del form preventivo se facilmente individuabile,
    // altrimenti prima del footer.
    const form =
      document.querySelector("#preventivo, #contatti, form") ||
      document.querySelector("footer");

    if (form && form.parentNode) {
      form.parentNode.insertBefore(section, form);
    } else {
      document.body.appendChild(section);
    }

    loadReviews();
  }

  async function loadReviews() {
    const summary = document.getElementById("egr-summary");
    const grid = document.getElementById("egr-grid");
    const link = document.getElementById("egr-link");

    try {
      const response = await fetch("/api/google-reviews", {
        headers: { Accept: "application/json" },
        cache: "no-store"
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "API non disponibile");
      }

      const place = data.place || {};
      const rating = place.rating;
      const count = place.userRatingCount || 0;

      if (place.googleMapsUri) {
        link.href = place.googleMapsUri;
      }

      summary.innerHTML = rating
        ? `<strong>${escapeHtml(rating)}/5</strong> · ${escapeHtml(count)} recensioni su Google`
        : "Recensioni Google";

      const reviews = Array.isArray(place.reviews) ? place.reviews : [];

      if (!reviews.length) {
        grid.innerHTML =
          "<p>Le recensioni sono disponibili direttamente su Google.</p>";
        return;
      }

      grid.innerHTML = reviews.map((review) => {
        const author =
          review.authorAttribution?.displayName || "Cliente Google";
        const text =
          review.text?.text || review.originalText?.text || "";
        const date =
          review.relativePublishTimeDescription || "";

        return `
          <article class="egr-card">
            <div class="egr-author">${escapeHtml(author)}</div>
            <div class="egr-stars"
                 aria-label="Valutazione ${escapeHtml(review.rating || "")} su 5">
              ${stars(review.rating)}
            </div>
            <p class="egr-text">${escapeHtml(text)}</p>
            ${date ? `<div class="egr-date">${escapeHtml(date)}</div>` : ""}
          </article>
        `;
      }).join("");
    } catch (error) {
      summary.textContent =
        "Scopri le valutazioni dei nostri clienti su Google.";
      grid.innerHTML = "";
      link.href = GOOGLE_REVIEW_URL;
    }
  }

  function init() {
    replaceClaim();
    createSection();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
