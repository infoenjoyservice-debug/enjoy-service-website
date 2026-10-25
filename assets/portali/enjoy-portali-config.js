/* Inserire soltanto il link HTTPS della scheda Enjoy Service corretta. */
(() => {
  const pagineBianche = '';
  if (!pagineBianche) return;
  let url;
  try { url = new URL(pagineBianche); } catch { return; }
  if (url.protocol !== 'https:' || !['paginebianche.it', 'www.paginebianche.it'].includes(url.hostname) || url.username || url.password) return;
  const elemento = document.querySelector('.enjoy-portali [data-portale="paginebianche"]');
  if (!elemento) return;
  const link = document.createElement('a');
  link.className = 'enjoy-portale enjoy-portale-paginebianche';
  link.dataset.portale = 'paginebianche';
  link.href = pagineBianche;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', 'Enjoy Service su PagineBianche (si apre in una nuova scheda)');
  while (elemento.firstChild) link.appendChild(elemento.firstChild);
  elemento.replaceWith(link);
})();
