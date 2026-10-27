/* Enjoy Service — integrazione recensioni. Nessun widget esterno. */
(function () {
  'use strict';
  var currentScript = document.currentScript;
  var base = currentScript && currentScript.src ? new URL('.', currentScript.src).href : '/assets/';
  function install() {
    if (document.getElementById('enjoy-recensioni')) return;
    if (!document.querySelector('link[data-enjoy-recensioni]')) {
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = new URL('enjoy-recensioni.css', new URL(base, document.baseURI)).href;
      css.setAttribute('data-enjoy-recensioni', '');
      document.head.appendChild(css);
    }
    var section = document.createElement('section');
    section.id = 'enjoy-recensioni';
    section.setAttribute('aria-labelledby', 'esr-title');
    section.innerHTML = '<p class="esr-eyebrow">La tua esperienza conta</p>' +
      '<h2 id="esr-title">Recensioni su Google</h2>' +
      '<p>Vuoi conoscere meglio Enjoy Service? Consulta la nostra scheda Google e le recensioni disponibili.</p>' +
      '<p>Hai utilizzato un nostro servizio? Racconta la tua esperienza: il tuo parere aiuta altre persone a scegliere e ci aiuta a migliorare.</p>' +
      '<div class="esr-actions"><a class="esr-button" href="https://share.google/YauA2F7wCWaJ1KCiF" target="_blank" rel="noopener noreferrer">Leggi le recensioni su Google ↗</a>' +
      '<a class="esr-button esr-secondary" href="https://share.google/YauA2F7wCWaJ1KCiF" target="_blank" rel="noopener noreferrer">Lascia una recensione su Google ↗</a></div>' +
      '<p class="esr-note">I pulsanti aprono la scheda Google in una nuova pagina. Per pubblicare una recensione, seleziona “Scrivi una recensione” nella scheda e accedi al tuo account Google.</p>' +
      '<a class="esr-contact" href="/#contatti">Richiedi un preventivo gratuito</a>';
    var target = document.getElementById('enjoy-recensioni-posizione');
    var beforeAfter = document.getElementById('prima-dopo');
    var contact = document.getElementById('contatti');
    var main = document.querySelector('main');
    var footer = document.querySelector('footer');
    if (target) target.replaceWith(section);
    else if (beforeAfter) beforeAfter.insertAdjacentElement('afterend', section);
    else if (contact) contact.insertAdjacentElement('beforebegin', section);
    else if (main) main.appendChild(section);
    else if (footer) footer.insertAdjacentElement('beforebegin', section);
    else document.body.appendChild(section);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
}());
