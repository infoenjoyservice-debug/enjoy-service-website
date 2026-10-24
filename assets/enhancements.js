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
