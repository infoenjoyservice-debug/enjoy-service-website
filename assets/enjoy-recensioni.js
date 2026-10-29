/* Enjoy Service: recensioni unificate, senza API. */
(function(){
 'use strict';
 function install(){
  var section=document.getElementById('recensioni-google');
  if(!section){
   var legacy=document.getElementById('enjoy-recensioni');
   var target=legacy||document.getElementById('enjoy-recensioni-posizione');
   var contact=document.getElementById('contatti');
   if(!target&&!contact)return;
   var template=document.createElement('template');
   template.innerHTML="<section class=\"google-reviews es-reviews-unified\" id=\"recensioni-google\" aria-labelledby=\"recensioni-google-title\" data-enjoy-reviews=\"unified\"><div class=\"wrap\">\n<p class=\"google-reviews__eyebrow\">RECENSIONI GOOGLE</p>\n<h2 id=\"recensioni-google-title\">Le esperienze dei nostri clienti</h2>\n<p>Consulta le recensioni di Enjoy Service sulla nostra scheda Google. Hai utilizzato un nostro servizio? Racconta la tua esperienza.</p>\n<div class=\"es-reviews-actions\">\n<a href=\"https://share.google/YauA2F7wCWaJ1KCiF\" target=\"_blank\" rel=\"noopener noreferrer\">Leggi le recensioni su Google ↗</a>\n<a href=\"https://g.page/r/CTarwS6Y9W4vEBM/review\" target=\"_blank\" rel=\"noopener noreferrer\">Lascia una recensione ↗</a>\n</div><p class=\"es-reviews-note\">I collegamenti aprono Google in una nuova scheda. Per pubblicare una recensione è necessario accedere al proprio account Google.</p>\n</div></section>";
   section=template.content.firstElementChild;
   if(target)target.replaceWith(section);
   else {var container=contact.closest('section')||contact;container.insertAdjacentElement('beforebegin',section);}
  }else if(section.getAttribute('data-enjoy-reviews')!=='unified'){
   var template=document.createElement('template');template.innerHTML="<section class=\"google-reviews es-reviews-unified\" id=\"recensioni-google\" aria-labelledby=\"recensioni-google-title\" data-enjoy-reviews=\"unified\"><div class=\"wrap\">\n<p class=\"google-reviews__eyebrow\">RECENSIONI GOOGLE</p>\n<h2 id=\"recensioni-google-title\">Le esperienze dei nostri clienti</h2>\n<p>Consulta le recensioni di Enjoy Service sulla nostra scheda Google. Hai utilizzato un nostro servizio? Racconta la tua esperienza.</p>\n<div class=\"es-reviews-actions\">\n<a href=\"https://share.google/YauA2F7wCWaJ1KCiF\" target=\"_blank\" rel=\"noopener noreferrer\">Leggi le recensioni su Google ↗</a>\n<a href=\"https://g.page/r/CTarwS6Y9W4vEBM/review\" target=\"_blank\" rel=\"noopener noreferrer\">Lascia una recensione ↗</a>\n</div><p class=\"es-reviews-note\">I collegamenti aprono Google in una nuova scheda. Per pubblicare una recensione è necessario accedere al proprio account Google.</p>\n</div></section>";
   var next=template.content.firstElementChild;section.replaceWith(next);section=next;
  }
  document.querySelectorAll('#enjoy-recensioni,#enjoy-recensioni-posizione').forEach(function(el){el.remove();});
  document.querySelectorAll('#recensioni-google').forEach(function(el){if(el!==section)el.remove();});
  if(!document.querySelector('link[href*="enjoy-recensioni-unificate.css"]')){
   var css=document.createElement('link');css.rel='stylesheet';css.href='/assets/enjoy-recensioni-unificate.css?v=20261029';document.head.appendChild(css);
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
