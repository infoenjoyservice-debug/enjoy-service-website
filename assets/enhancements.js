/* Miglioramenti non invasivi di accessibilità */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[target="_blank"]').forEach(a => {
    const rel = new Set((a.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    rel.add('noopener'); rel.add('noreferrer');
    a.setAttribute('rel', [...rel].join(' '));
  });
  document.querySelectorAll('img:not([loading])').forEach((img, index) => {
    if (index > 0) img.loading = 'lazy';
    img.decoding = 'async';
  });
});

/* Enjoy Service: collegamenti Google nella home, 26/10/2026. */
(() => {
  function addGoogleLinks() {
    if (document.getElementById('enjoy-google-links')) return;
    const social = document.querySelector('#presenze-online .enjoy-social, #azienda .enjoy-social');
    const company = document.querySelector('#presenze-online .wrap, #azienda .split > div:last-child');
    if (!social && !company) return;
    const section = document.createElement('section');
    section.id = 'enjoy-google-links';
    section.className = 'enjoy-google-links';
    section.setAttribute('aria-labelledby', 'enjoy-google-title');
    const title = document.createElement('h3');
    title.id = 'enjoy-google-title';
    title.textContent = 'Cercaci su Google';
    section.appendChild(title);
    const list = document.createElement('div');
    list.className = 'enjoy-google-list';
    const google = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.4a4.7 4.7 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.3 2.9-7.4Z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4L15.4 17c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9l3.4-2.6Z"/><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.6 9.6 0 0 0 12 2a10 10 0 0 0-9 5.5l3.4 2.6C7.2 7.8 9.4 6 12 6Z"/></svg>';
    const maps = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path fill="#4285F4" d="M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8Z"/><path fill="#34A853" d="m12 22 1-10 6-6c3.9 6.5-3 13-7 16Z"/><path fill="#FBBC05" d="m4.2 8 6 5L8 3.1A8 8 0 0 0 4.2 8Z"/><circle cx="12" cy="10" r="3.2" fill="white"/></svg>';
    const query = 'Enjoy Service SRL Cinisello Balsamo Via Niccolò Machiavelli 22';
    const items = [
      {label:'Google', detail:'Cerca Enjoy Service', url:'https://www.google.com/search?q='+encodeURIComponent(query), icon:google},
      {label:'Google Maps', detail:'Cerca sede e indicazioni', url:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query), icon:maps}
    ];
    for (const item of items) {
      const link = document.createElement('a');
      link.className = 'enjoy-google-item';
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', item.detail+' su '+item.label+' (si apre in una nuova scheda)');
      const icon = document.createElement('span');
      icon.className = 'enjoy-google-icon';
      icon.innerHTML = item.icon;
      link.appendChild(icon);
      const text = document.createElement('span');
      const strong = document.createElement('strong');
      strong.textContent = item.label;
      const small = document.createElement('small');
      small.textContent = item.detail;
      text.append(strong, small);
      link.appendChild(text);
      list.appendChild(link);
    }
    section.appendChild(list);
    if (social) social.insertAdjacentElement('afterend', section);
    else company.appendChild(section);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addGoogleLinks, {once:true});
  else addGoogleLinks();
})();
