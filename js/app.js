document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
        overlay.classList.toggle('show');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) toggleMenu();
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    const heroCounter = document.getElementById('heroCurrentNum');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        heroCounter.textContent = String(currentSlide + 1).padStart(2, '0');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(parseInt(dot.dataset.index));
            startSlider();
        });
    });

    startSlider();

    // Cookie Banner
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');

    if (localStorage.getItem('cookieConsent')) {
        cookieBanner.classList.add('hidden');
    }

    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.add('hidden');
    });

    cookieReject.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.classList.add('hidden');
    });
});
