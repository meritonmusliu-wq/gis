document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navMobile');
    const overlay = document.getElementById('menuOverlay');

    function toggleMenu() {
        toggle.classList.toggle('active');
        nav.classList.toggle('open');
        overlay.classList.toggle('show');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    }

    toggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    document.querySelectorAll('.nav-mobile__link').forEach(a => {
        a.addEventListener('click', () => {
            if (nav.classList.contains('open')) toggleMenu();
        });
    });

    // Header scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const counter = document.getElementById('heroCurrentNum');
    let cur = 0, timer;

    function goTo(i) {
        slides[cur].classList.remove('active');
        dots[cur].classList.remove('active');
        cur = i;
        slides[cur].classList.add('active');
        dots[cur].classList.add('active');
        counter.textContent = String(cur + 1).padStart(2, '0');
    }

    function start() { timer = setInterval(() => goTo((cur + 1) % slides.length), 5000); }

    dots.forEach(d => d.addEventListener('click', () => {
        clearInterval(timer);
        goTo(+d.dataset.index);
        start();
    }));

    start();

    // FAQ Accordion
    document.querySelectorAll('.faq__q').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });

    // Cookie
    const cookie = document.getElementById('cookieBanner');
    if (localStorage.getItem('cookieConsent')) cookie.classList.add('hidden');

    document.getElementById('cookieAccept').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookie.classList.add('hidden');
    });

    document.getElementById('cookieReject').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookie.classList.add('hidden');
    });
});
