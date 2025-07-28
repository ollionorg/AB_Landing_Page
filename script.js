document.addEventListener('DOMContentLoaded', function () {
    // --- Animate on Scroll Logic ---
    const scrollAnimations = document.querySelectorAll('.animate-on-scroll');
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrollAnimations.forEach(el => animationObserver.observe(el));

    // --- Navigation Logic ---
    const sections = document.querySelectorAll('section[data-section]');
    const desktopNavLinks = document.querySelectorAll('#desktop-nav a');
    const mobileNavLinks = document.querySelectorAll('#mobile-nav a');
    const allNavLinks = [...desktopNavLinks, ...mobileNavLinks];

    // Scroll Spy for active states
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dataSection = entry.target.getAttribute('data-section');
                
                // Update both desktop and mobile nav links
                allNavLinks.forEach(link => {
                    // Use getAttribute to match href exactly to data-section
                    const linkTarget = link.getAttribute('href').substring(1);
                    link.classList.toggle('active', linkTarget === dataSection);
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' }); // Asymmetrical margin to trigger earlier on scroll down

    sections.forEach(section => navObserver.observe(section));

    // Smooth scroll for all nav links
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // --- Mobile Nav Visibility ---
    // Show the nav bar only after the user has started scrolling down
    window.addEventListener('scroll', () => {
        if(window.scrollY > 150) { // Appears after scrolling 150px
             document.body.classList.add('scrolled');
        } else {
             document.body.classList.remove('scrolled');
        }
    }, { passive: true });

});