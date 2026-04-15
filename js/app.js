document.addEventListener('DOMContentLoaded', () => {
    const themeKey = 'gis-theme';
    const themeBtn = document.getElementById('themeToggle');
    const themeMeta = document.getElementById('themeColorMeta');

    function currentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }

    function setTheme(t) {
        if (t !== 'light' && t !== 'dark') return;
        document.documentElement.setAttribute('data-theme', t);
        try {
            localStorage.setItem(themeKey, t);
        } catch (e) { /* ignore */ }
        if (themeMeta) {
            themeMeta.setAttribute('content', t === 'dark' ? '#0d1117' : '#faf9f6');
        }
        if (themeBtn) {
            themeBtn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
            themeBtn.setAttribute(
                'aria-label',
                t === 'dark' ? 'Attiva tema chiaro' : 'Attiva tema scuro'
            );
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
        });
        setTheme(currentTheme());
    }

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

    document.getElementById('heroPrev').addEventListener('click', () => {
        clearInterval(timer);
        goTo((cur - 1 + slides.length) % slides.length);
        start();
    });

    document.getElementById('heroNext').addEventListener('click', () => {
        clearInterval(timer);
        goTo((cur + 1) % slides.length);
        start();
    });

    start();

    // Testimonials slider
    const ttSlides = document.querySelectorAll('.testimonials__slide');
    const ttDots = document.querySelectorAll('.testimonials__dot');
    const ttPrev = document.getElementById('testimonialPrev');
    const ttNext = document.getElementById('testimonialNext');
    if (ttSlides.length && ttPrev && ttNext) {
        let tIdx = 0;
        function goTestimonial(next) {
            ttSlides[tIdx].classList.remove('is-active');
            ttDots[tIdx]?.classList.remove('is-active');
            ttDots[tIdx]?.removeAttribute('aria-current');
            tIdx = (next + ttSlides.length) % ttSlides.length;
            ttSlides[tIdx].classList.add('is-active');
            ttDots[tIdx]?.classList.add('is-active');
            ttDots[tIdx]?.setAttribute('aria-current', 'true');
        }
        ttPrev.addEventListener('click', () => goTestimonial(tIdx - 1));
        ttNext.addEventListener('click', () => goTestimonial(tIdx + 1));
        ttDots.forEach((d, i) => {
            d.addEventListener('click', () => goTestimonial(i));
        });
    }

    // Scroll Animations
    const animEls = document.querySelectorAll('.brand-intro, .testimonials__center, .s-header, .s-card, .s-cards__footer, .about__img, .about__text, .why__title, .why__item, .how__header, .how__step, .stats__item, .location__card, .faq__grid, .process-header, .step, .services-intro, .service-row, .intro-grid, .cta-banner__inner');

    animEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.1}s, transform 0.6s ease ${(i % 4) * 0.1}s`;
    });

    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
                animObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });

    animEls.forEach(el => animObserver.observe(el));

    // Counter animation for stats
    const counters = document.querySelectorAll('.stats__num');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const text = el.textContent;
                const num = parseInt(text.replace(/[^0-9]/g, ''));
                const suffix = text.replace(/[0-9.,]/g, '');
                const hasDot = text.includes('.');
                let current = 0;
                const step = Math.ceil(num / 40);
                const interval = setInterval(() => {
                    current += step;
                    if (current >= num) {
                        current = num;
                        clearInterval(interval);
                    }
                    el.textContent = hasDot ? current.toLocaleString('it-IT') : current + suffix;
                }, 30);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

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
