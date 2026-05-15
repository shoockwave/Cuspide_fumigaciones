/* ============================================================
   CÚSPIDE — script.js  v2.1 — Optimizado
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Año actual en footer ─────────────────────────────── */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ── Hero Slider ──────────────────────────────────────── */
  new Swiper('.swiper-hero', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 700,
    pagination: {
      el: '.swiper-hero .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-hero .swiper-button-next',
      prevEl: '.swiper-hero .swiper-button-prev',
    },
    a11y: {
      prevSlideMessage: 'Slide anterior',
      nextSlideMessage: 'Siguiente slide',
    },
  });


  /* ── Product Swipers (uno por tab) ───────────────────── */
  // Swiper with multiple elements returns an array-like SwiperList.
  // Each instance is accessible by its container element via el.swiper.
  new Swiper('.swiper-products', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      520: { slidesPerView: 2 },
      900: { slidesPerView: 3 },
    },
  });


  /* ── Actualizar swiper activo al cambiar de tab ───────── */
  // When a tab panel becomes visible (was display:none → display:block),
  // Swiper needs to recalculate its dimensions.
  document.querySelectorAll('.tab-input').forEach((input) => {
    input.addEventListener('change', () => {
      // Derive the swiper id from the tab id: "tab2" → "swiper2"
      const swiperId = input.id.replace('tab', 'swiper');
      const swiperEl = document.getElementById(swiperId);
      if (swiperEl?.swiper) {
        // Delay so the browser paints display:block before Swiper measures
        setTimeout(() => swiperEl.swiper.update(), 50);
      }
    });
  });


  /* ── Cerrar menú móvil al hacer clic en un nav-link ─── */
  const navToggle = document.getElementById('nav-toggle');
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (navToggle) navToggle.checked = false;
    });
  });


  /* ── Resaltar sección activa en la navegación ─────────── */
  // Uses IntersectionObserver so it works without scroll event overhead.
  const sections = document.querySelectorAll('section[id], div[id="inicio"]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px', // trigger when section is roughly in the middle of the viewport
      threshold: 0,
    }
  );

  // Observe the hero div and all labelled sections
  const heroEl = document.getElementById('inicio');
  if (heroEl) observer.observe(heroEl);
  sections.forEach((sec) => observer.observe(sec));

});
