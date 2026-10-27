// Imposta il link Google in config.js prima di usare questo script.
(function () {
  const link = document.getElementById("es-google-review");
  if (link && typeof GOOGLE_REVIEW_URL !== "undefined" &&
      GOOGLE_REVIEW_URL.startsWith("http")) {
    link.href = GOOGLE_REVIEW_URL;
  }
})();
