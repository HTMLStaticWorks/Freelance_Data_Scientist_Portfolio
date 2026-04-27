/**
 * Main JS for Freelance Data Scientist Portfolio
 * Author: Senior Frontend Developer
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTheme();
    initStickyNavbar();
    initFormValidation();
    initActiveLinks();
    initRTLSupport();
    initAnimations();
    initTerminal();
    initNavAutoClose();
});

/**
 * Preloader Fade-out
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 800);
    }
}

/**
 * Theme Toggle (Light/Dark)
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            let theme = document.documentElement.getAttribute('data-theme');
            let targetTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            updateThemeIcon(targetTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        if (theme === 'light') {
            icon.classList.replace('bi-moon-stars', 'bi-sun');
        } else {
            if (icon.classList.contains('bi-sun')) {
                icon.classList.replace('bi-sun', 'bi-moon-stars');
            } else {
                icon.classList.add('bi-moon-stars');
            }
        }
    }
}

/**
 * Sticky Navbar & Scroll Events
 */
function initStickyNavbar() {
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('navbar-scrolled', 'shadow-sm');
        } else {
            header.classList.remove('navbar-scrolled', 'shadow-sm');
        }
    });
}

/**
 * Form Validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

/**
 * Active Link Highlighting
 */
function initActiveLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

/**
 * RTL Support Switcher
 */
function initRTLSupport() {
    const rtlBtn = document.getElementById('rtl-toggle');
    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const targetDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', targetDir);
        });
    }
}

/**
 * Intersection Observer for Animations
 */
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

/**
 * Auto-close Navbar on Link Click (mobile / tablet collapse view)
 * Collapses the Bootstrap navbar whenever a nav-link or dropdown-item
 * is clicked, but only while the hamburger toggler is visible.
 */
function initNavAutoClose() {
    const navbarCollapse = document.getElementById('navbarNav');
    const toggler = document.querySelector('.navbar-toggler');

    if (!navbarCollapse || !toggler) return;

    const syncNavScrollLock = () => {
        const isCollapsedView = toggler.offsetParent !== null;
        const isOpen = navbarCollapse.classList.contains('show');

        document.body.classList.toggle('navbar-open', isCollapsedView && isOpen);
    };

    // Target real navigation actions, but keep dropdown toggles open so users can expand them first.
    const clickables = navbarCollapse.querySelectorAll(
        '.nav-link:not(.dropdown-toggle), .dropdown-item, .btn-outline-custom, .btn-link'
    );

    clickables.forEach(link => {
        link.addEventListener('click', () => {
            // Only collapse when the toggler is visible (i.e., responsive / collapsed mode)
            if (toggler.offsetParent !== null) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    navbarCollapse.addEventListener('shown.bs.collapse', syncNavScrollLock);
    navbarCollapse.addEventListener('hidden.bs.collapse', syncNavScrollLock);
    window.addEventListener('resize', syncNavScrollLock);
    syncNavScrollLock();
}

/**
 * Terminal Typing Animation
 */
function initTerminal() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const phrases = [
        "python train.py --epochs 50",
        "dvc pull core_dataset",
        "npm run deploy",
        "alex_rivera.status = 'In Flow'"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}
