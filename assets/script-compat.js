/* Compatibilità per pagine legacy: nessun menu viene nascosto senza JS. */
document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll("nav").forEach(function(n){n.hidden=false;});});
