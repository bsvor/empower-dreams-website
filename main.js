/* =============================================
   EMPOWER DREAMS — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll(
        '.section-header, .story-card, .feature-card, .tool-card, .stat-item, .update-content, .update-video, .newsletter-card, .video-feature'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Staggered reveal for grid items ---
    const staggerContainers = document.querySelectorAll('.stories-grid, .tools-grid, .stats-grid, .involved-features');
    staggerContainers.forEach(container => {
        const items = container.children;
        const containerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(items).forEach((item, index) => {
                        item.style.transitionDelay = `${index * 0.1}s`;
                    });
                    containerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        containerObserver.observe(container);
    });

    // --- YouTube video placeholders: click to load iframe ---
    document.querySelectorAll('.video-placeholder[data-video-id]').forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const videoId = placeholder.dataset.videoId;
            const wrapper = placeholder.parentElement;
            const iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border-radius:var(--radius-md);';
            wrapper.style.position = 'relative';
            wrapper.style.paddingBottom = '56.25%';
            wrapper.style.height = '0';
            wrapper.innerHTML = '';
            wrapper.appendChild(iframe);
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });
});
