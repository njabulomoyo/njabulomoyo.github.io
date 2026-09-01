(function () {
    'use strict';

    var root = document.documentElement;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Theme toggle ---------- */
    var themeToggle = document.getElementById('theme-toggle');

    function systemPrefersDark() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function currentTheme() {
        return root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try {
                localStorage.setItem('theme', next);
            } catch (e) { /* ignore */ }
        });
    }

    /* ---------- Mobile nav ---------- */
    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');

    function closeNav() {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            var open = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(open));
        });

        navMenu.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') {
                closeNav();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navMenu.classList.contains('open')) {
                closeNav();
                navToggle.focus();
            }
        });
    }

    /* ---------- Sticky header shadow ---------- */
    var header = document.getElementById('site-header');

    function onScroll() {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 8);
        }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Scroll reveal ---------- */
    var revealItems = document.querySelectorAll('.reveal');

    function revealAll() {
        revealItems.forEach(function (el) { el.classList.add('is-visible'); });
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealAll();
    } else {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -10% 0px' });

        revealItems.forEach(function (el) { revealObserver.observe(el); });

        // Safety net: never leave content hidden (fast scrolling, observer quirks,
        // JS errors elsewhere). Everything is guaranteed visible shortly after load.
        setTimeout(revealAll, 1200);
    }

    /* ---------- Active section in nav ---------- */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-menu a'));
    var sections = navLinks
        .map(function (link) { return document.querySelector(link.getAttribute('href')); })
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
                    });
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        sections.forEach(function (section) { sectionObserver.observe(section); });
    }

    /* ---------- Footer year ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }
})();
