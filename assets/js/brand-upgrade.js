/* Enjoy Service — Brand & Professionalità Upgrade v1 */
(function () {
  const reveal = () => {
    document.querySelectorAll('[data-es-reveal]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * .92) {
        el.classList.add('es-is-visible');
      }
    });
  };

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      let target = null;
      try { target = document.querySelector(a.getAttribute('href')); } catch (err) { return; }
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
    });
  });

  window.addEventListener('scroll', reveal, { passive: true });
  window.addEventListener('load', reveal);
})();
