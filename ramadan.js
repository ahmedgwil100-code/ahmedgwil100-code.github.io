/* ======================================
   RAMADAN MODE — JavaScript Controller
   Lanterns, Stars, Crescent, Banner, 
   Eid Countdown, Toggle
   ====================================== */
(function () {
    'use strict';

    // --- Configuration ---
    const EID_DATE = new Date('2027-03-22T00:00:00'); // Eid al-Fitr 2027 (approximate)
    const STORAGE_KEY = 'etyn-ramadan-mode';

    // --- Inject Ramadan HTML elements ---
    function injectElements() {
        // Banner
        if (!document.querySelector('.ramadan-banner')) {
            const banner = document.createElement('div');
            banner.className = 'ramadan-banner';
            banner.innerHTML = '🌙 <span class="banner-gold">Ramadan Kareem!</span> May this blessed month bring you peace, joy, and success. <button class="banner-close" aria-label="Close banner">&times;</button>';
            document.body.prepend(banner);
            banner.querySelector('.banner-close').addEventListener('click', function () {
                banner.style.display = 'none';
            });
        }

        // Lanterns
        if (!document.querySelector('.ramadan-lanterns')) {
            const lanterns = document.createElement('div');
            lanterns.className = 'ramadan-lanterns';
            lanterns.innerHTML = '<div class="lantern">🏮</div><div class="lantern">🏮</div><div class="lantern">🏮</div><div class="lantern">🏮</div><div class="lantern">🏮</div><div class="lantern">🏮</div>';
            document.body.appendChild(lanterns);
        }

        // Stars
        if (!document.querySelector('.ramadan-stars')) {
            const starsContainer = document.createElement('div');
            starsContainer.className = 'ramadan-stars';
            for (let i = 0; i < 40; i++) {
                const star = document.createElement('div');
                star.className = 'r-star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 60 + '%';
                star.style.animationDelay = (Math.random() * 3).toFixed(1) + 's';
                star.style.animationDuration = (1.5 + Math.random() * 2).toFixed(1) + 's';
                const size = 1 + Math.random() * 3;
                star.style.width = size + 'px';
                star.style.height = size + 'px';
                starsContainer.appendChild(star);
            }
            document.body.appendChild(starsContainer);
        }

        // Crescent Moon
        if (!document.querySelector('.ramadan-crescent')) {
            const crescent = document.createElement('div');
            crescent.className = 'ramadan-crescent';
            crescent.textContent = '🌙';
            document.body.appendChild(crescent);
        }

        // Eid Countdown
        if (!document.querySelector('.eid-countdown')) {
            const countdown = document.createElement('div');
            countdown.className = 'eid-countdown';
            countdown.innerHTML = '<div class="cd-title">✨ Countdown to Eid</div><div class="cd-timer" id="eidTimer">--d --h --m</div><div class="cd-label">May your fasting be accepted</div>';
            document.body.appendChild(countdown);
            updateCountdown();
            setInterval(updateCountdown, 60000);
        }

        // Toggle button in navbar
        if (!document.querySelector('.ramadan-toggle')) {
            const navLinks = document.querySelector('.navbar__links');
            if (navLinks) {
                const toggle = document.createElement('button');
                toggle.className = 'ramadan-toggle';
                toggle.setAttribute('aria-label', 'Toggle Ramadan Mode');
                toggle.setAttribute('title', 'Toggle Ramadan Mode');
                toggle.textContent = '🌙';
                toggle.addEventListener('click', toggleRamadan);
                navLinks.appendChild(toggle);
            }
        }
    }

    // --- Eid Countdown Timer ---
    function updateCountdown() {
        const timer = document.getElementById('eidTimer');
        if (!timer) return;
        const now = new Date();
        const diff = EID_DATE - now;
        if (diff <= 0) {
            timer.textContent = '🎉 Eid Mubarak!';
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        timer.textContent = days + 'd ' + hours + 'h ' + mins + 'm';
    }

    // --- Toggle Ramadan Mode ---
    function toggleRamadan() {
        const isActive = document.body.classList.toggle('ramadan-mode');
        localStorage.setItem(STORAGE_KEY, isActive ? 'on' : 'off');
        const toggle = document.querySelector('.ramadan-toggle');
        if (toggle) toggle.textContent = isActive ? '☀️' : '🌙';
    }

    // --- Initialize ---
    function init() {
        injectElements();
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'on') {
            document.body.classList.add('ramadan-mode');
            const toggle = document.querySelector('.ramadan-toggle');
            if (toggle) toggle.textContent = '☀️';
        }
    }

    // Run after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
