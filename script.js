/* ============================================================
   Nkeeh Baridosian Godwin — Portfolio Scripts
   Mobile menu • Scroll animations • Active nav • Smooth extras
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Mobile Menu Toggle ----------
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuIconOpen.classList.toggle('hidden', isOpen);
      menuIconClose.classList.toggle('hidden', !isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Intersection Observer for Fade-in Animations ----------
  const animatedEls = document.querySelectorAll('.fade-up, .fade-in, .scale-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after first reveal for performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedEls.forEach(el => observer.observe(el));

  // ---------- Active Navigation Link on Scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav(); // initial

  // ---------- Sticky Nav Background on Scroll ----------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('bg-black/80', 'backdrop-blur-xl', 'border-b', 'border-white/5');
        navbar.classList.remove('bg-transparent');
      } else {
        navbar.classList.remove('bg-black/80', 'backdrop-blur-xl', 'border-b', 'border-white/5');
        navbar.classList.add('bg-transparent');
      }
    }, { passive: true });
  }

  // ---------- Current Year in Footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Smooth close of any open mobile menu on resize ----------
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu?.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      menuIconOpen?.classList.remove('hidden');
      menuIconClose?.classList.add('hidden');
    }
  });
});
