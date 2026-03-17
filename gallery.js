/* ============================================================
   gallery.js — Filter + Animations for the Gallery page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Fade-in on scroll ─────────────────────────────────── */
    const fadeEls = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger cards in the same grid
                const delay = entry.target.closest('.masonry-grid, .promo-cards-grid')
                    ? i * 60
                    : 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => observer.observe(el));

    /* ── Masonry card filter ───────────────────────────────── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.gallery-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ── Animated counters (hero stats) ───────────────────── */
    function animateCounter(el, target, suffix) {
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current + suffix;
        }, 25);
    }

    const counterPosts = document.getElementById('counter-posts');
    const counterClinics = document.getElementById('counter-clinics');
    const counterLeads = document.getElementById('counter-leads');

    const heroSection = document.querySelector('.gallery-hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (counterPosts) animateCounter(counterPosts, 120, '+');
                    if (counterClinics) animateCounter(counterClinics, 48, '+');
                    if (counterLeads) animateCounter(counterLeads, 73, '%');
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        heroObserver.observe(heroSection);
    }

    /* ── Sticky header shrink ─────────────────────────────── */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                header.style.background = 'rgba(5, 5, 5, 0.97)';
            } else {
                header.style.background = 'rgba(5, 5, 5, 0.8)';
            }
        });
    }
});
