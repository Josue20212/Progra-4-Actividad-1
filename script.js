/* =========================================
   script.js — Kendall Duran Portfolio
   Justificación del uso de JavaScript:
   1. Menú hamburguesa (navegación mobile)
   2. Scroll reveal con IntersectionObserver
   3. Animación de barras de progreso
   4. Validación del formulario de contacto
========================================= */

/* -----------------------------------------
   1. MENÚ HAMBURGUESA (mobile)
   Alterna la clase .open en el menú al
   hacer clic en el botón de hamburguesa.
----------------------------------------- */
var navToggle = document.getElementById('navToggle');
var navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

/* Cierra el menú al seleccionar un enlace */
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});


/* -----------------------------------------
   2. SCROLL REVEAL
   Agrega la clase .visible a los elementos
   con .fade-up cuando entran al viewport.
----------------------------------------- */
var scrollObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, i) {
    if (entry.isIntersecting) {
      /* Escalonamiento sutil entre elementos del mismo grupo */
      entry.target.style.transitionDelay = (i % 3) * 0.1 + 's';
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(function (el) {
  scrollObserver.observe(el);
});


/* -----------------------------------------
   3. ANIMACIÓN DE BARRAS DE PROGRESO
   Activa el ancho de cada barra cuando
   llega al área visible del viewport.
----------------------------------------- */
var barObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-fill').forEach(function (bar) {
  barObserver.observe(bar);
});


/* -----------------------------------------
   4. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   Verifica campos requeridos y formato
   de email antes de "enviar" el mensaje.
----------------------------------------- */
function enviar() {
  var nombre  = document.getElementById('nombre').value.trim();
  var email   = document.getElementById('email').value.trim();
  var mensaje = document.getElementById('mensaje').value.trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nombre || !email || !mensaje) {
    alert('Por favor completa nombre, email y mensaje.');
    return;
  }

  if (!emailRegex.test(email)) {
    alert('Por favor ingresa un email válido.');
    return;
  }

  alert('¡Mensaje enviado! Pronto me pondré en contacto, ' + nombre + '.');

  /* Limpiar formulario tras envío exitoso */
  document.getElementById('nombre').value  = '';
  document.getElementById('email').value   = '';
  document.getElementById('asunto').value  = '';
  document.getElementById('mensaje').value = '';
}
