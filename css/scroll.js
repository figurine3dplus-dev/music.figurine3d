// ── Floating Nav: scroll effect & active link ──
const floatNav = document.getElementById('float-nav');
const sections = document.querySelectorAll('section[id], #hero');
const navLinks = document.querySelectorAll('#float-nav .nav-link.desktop-only');

window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 40) {
        floatNav.classList.add('scrolled');
    } else {
        floatNav.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
            current = sec.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ── Hamburger Menu ──
const toggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('nav-mobile');

toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
        mobileMenu.classList.add('visible');
    } else {
        mobileMenu.classList.remove('visible');
    }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        mobileMenu.classList.remove('visible');
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!floatNav.contains(e.target) && !mobileMenu.contains(e.target)) {
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        mobileMenu.classList.remove('visible');
    }
});

// ── Scroll Reveal ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// ── Form Submit Handler ──
function handleForm(e) {
    e.preventDefault();
    const form = e.target;
    const success = document.getElementById('form-success');
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.3s';
    setTimeout(() => {
        form.style.display = 'none';
        success.style.display = 'block';
        success.style.opacity = '0';
        success.style.transition = 'opacity 0.4s';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                success.style.opacity = '1';
            });
        });
    }, 300);
}

// ── Background Music Toggle ──
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');

let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicBtn.classList.remove('playing');
        musicIcon.textContent = '🎙️';
        musicText.textContent = 'Balada Zurzănuței';
    } else {
        audio.play().then(() => {
            musicBtn.classList.add('playing');
            musicIcon.textContent = '❚❚';
            musicText.textContent = 'Oprește muzica';
        }).catch(err => {
            console.log("Playback failed:", err);
            // Poți adăuga un alert dacă vrei
        });
    }
    isPlaying = !isPlaying;
});

// Oprire muzică la părăsirea paginii (opțional, curățenie)
window.addEventListener('beforeunload', () => {
    audio.pause();
});
