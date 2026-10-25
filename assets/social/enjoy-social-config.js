/* Inserire qui solo i link dei profili aziendali corretti. Stringa vuota = icona non cliccabile. */
(() => {
  const profili = {
    "facebook": "https://www.facebook.com/share/1Gq5n1i7Nt/",
    "instagram": "",
    "tiktok": "https://www.tiktok.com/@enjoy.service.srl?_r=1&_t=ZN-9AiM2FfpBt0",
    "linkedin": ""
};
  const domini = {facebook: ['facebook.com', 'www.facebook.com', 'm.facebook.com'], instagram: ['instagram.com', 'www.instagram.com'], tiktok: ['tiktok.com', 'www.tiktok.com'], linkedin: ['linkedin.com', 'www.linkedin.com', 'it.linkedin.com']};
  document.querySelectorAll('.enjoy-social [data-social]').forEach(elemento => {
    const social = elemento.dataset.social;
    const indirizzo = profili[social];
    if (!indirizzo) return;
    let url;
    try { url = new URL(indirizzo); } catch { return; }
    if (url.protocol !== 'https:' || !domini[social]?.includes(url.hostname) || url.username || url.password) return;
    const link = document.createElement('a');
    link.className = 'enjoy-social-item';
    link.dataset.social = social;
    link.href = indirizzo;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const nome = elemento.querySelector('span')?.textContent || social;
    link.setAttribute('aria-label', 'Enjoy Service su ' + nome + ' (si apre in una nuova scheda)');
    while (elemento.firstChild) link.appendChild(elemento.firstChild);
    elemento.replaceWith(link);
  });
})();
