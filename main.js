/* main.js — ETYN Tools shared functionality */

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme toggle ---
  const saved = localStorage.getItem('etyn-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    updateToggleIcon(toggleBtn);
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('etyn-theme', next);
      updateToggleIcon(toggleBtn);
    });
  }
  function updateToggleIcon(btn) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) links.classList.remove('open');
    });
  }

  // --- Sticky nav shadow ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // --- Fade-in on scroll ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-in'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.tool-card, .feature-card, .blog-card').forEach(el => observer.observe(el));
});

/* Utility: show result box */
function showResult(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('visible'); el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}
