(() => {
  const filters = document.querySelector('.esl-filters');
  const cards = [...document.querySelectorAll('[data-esl-category]')];
  const count = document.getElementById('esl-count');
  if (!filters || !cards.length || !count) return;
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-esl-filter]');
    if (!button || !filters.contains(button)) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let visible = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.eslFilter !== 'Tutti' && card.dataset.eslCategory !== button.dataset.eslFilter;
      if (!card.hidden) visible++;
    });
    count.textContent = visible + ' fotografie · ' + button.dataset.eslFilter;
  });
})();
