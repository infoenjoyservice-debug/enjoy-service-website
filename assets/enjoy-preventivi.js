/* Netlify Forms: invio progressivo, dati conservati nei campi in caso di errore. */
(() => {
  'use strict';
  const form = document.querySelector('form[name="preventivi"]');
  if (!form || !window.fetch || !window.AbortController) return;
  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');
  if (!status || !button) return;
  let sending = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    sending = true;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Invio della richiesta in corso…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const body = new URLSearchParams(new FormData(form));
      body.set('form-name', form.name);
      const response = await fetch('/', {
        method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: body.toString(), signal: controller.signal
      });
      if (!response.ok) throw new Error('Invio non accettato');
      window.location.assign(form.getAttribute('action') || '/grazie/');
    } catch (error) {
      status.textContent = error.name === 'AbortError'
        ? 'Il server non ha confermato l’esito in tempo. La richiesta potrebbe essere arrivata: prima di ripeterla contattaci al 350 576 4058 o via email a info.enjoyservice@gmail.com.'
        : 'Non è stato possibile confermare l’invio. I campi restano compilati. Contattaci al 350 576 4058, via email a info.enjoyservice@gmail.com oppure tramite WhatsApp.';
      status.focus();
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
})();
