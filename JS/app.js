document.addEventListener('DOMContentLoaded', () => {
  
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if (navToggle && menu) {
    navToggle.addEventListener('click', () => {
      const abierto = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!abierto));
      menu.classList.toggle('abierto');
    });
  }

  
  const audio = document.getElementById('intro-audio');
  if (audio) {
    const fallback = document.getElementById('intro-audio-fallback');
    const playBtn = document.getElementById('play-intro');
    let timeoutId; let fadeInterval;
    function detener(){ try { clearTimeout(timeoutId); audio.pause(); audio.currentTime=0; } catch(_){} }
    function configurarLimite(){ clearTimeout(timeoutId); timeoutId = setTimeout(detener, 25000); audio.addEventListener('ended', detener, { once:true }); }
    function fadeInObjetivo(objetivo=0.55, dur=1800){ clearInterval(fadeInterval); audio.volume = 0; const pasos=30; let i=0; const inc=objetivo/pasos; const lapso=dur/pasos; fadeInterval = setInterval(()=>{ i++; audio.volume = Math.min(objetivo, audio.volume+inc); if(i>=pasos) clearInterval(fadeInterval); }, lapso); }
    function iniciar(){ const prom = audio.play(); if(prom && prom.then){ prom.then(()=>{ configurarLimite(); fadeInObjetivo(); }).catch(()=> mostrarFallback()); } else { setTimeout(()=>{ if(!audio.paused){ configurarLimite(); fadeInObjetivo(); } else mostrarFallback(); }, 400); } }
    function mostrarFallback(){ if(fallback) fallback.style.display='block'; }
    if(playBtn){ playBtn.addEventListener('click', ()=>{ iniciar(); if(fallback) fallback.style.display='none'; }); }
    iniciar();
  }

 
  const form = document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit', e => {
      if (!form.checkValidity()) {
        e.preventDefault();
        alert('Por favor completa los campos obligatorios.');
      } else {
        e.preventDefault();
        alert('Mensaje simulado enviado. Gracias por escribir.');
        form.reset();
      }
    });
  }
});
