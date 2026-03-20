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
