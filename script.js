
const menu = document.querySelector('.menu');
const navlinks = document.querySelector('.navlinks');
if(menu){
  menu.addEventListener('click',()=>navlinks.classList.toggle('open'));
}
document.querySelectorAll('.navlinks a').forEach(a=>{
  a.addEventListener('click',()=>navlinks?.classList.remove('open'));
});

const form = document.querySelector('#quote-form');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const msg = [
      "Ciao Enjoy Service SRL, vorrei richiedere un preventivo.",
      `Nome: ${data.get('nome') || ''}`,
      `Telefono: ${data.get('telefono') || ''}`,
      `Comune: ${data.get('comune') || ''}`,
      `Servizio: ${data.get('servizio') || ''}`,
      `Descrizione: ${data.get('messaggio') || ''}`
    ].join('\n');
    const url = 'https://wa.me/393505764058?text=' + encodeURIComponent(msg);
    window.open(url,'_blank');
  });
}
