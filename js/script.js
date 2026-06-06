/**
 * NOVATECH SOLUTIONS - UI ENGINE ARCHITECTURE (FIXED)
 * Core Scripts for Interactions, Performance Management, and Global Functions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initStickyNavbar();
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
    initAnimatedCounters();
    initFaqAccordion();
    initPortfolioFiltering();
    initTestimonialSlider();
    initFormValidation();
});

// 1. Page Loader Execution
function initPageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }
}

// 2. Sticky Header Interface Toggle
function initStickyNavbar() {
    const header = document.querySelector('.header-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 3. Mobile Navigation Drawer Core
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            menu.classList.toggle('mobile-open');
            document.body.style.overflow = menu.classList.contains('mobile-open') ? 'hidden' : 'auto';
        });
    }
}

// 4. Scroll Reveal Engine using IntersectionObserver
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // FIXED: Resolved runtime script crashing error loop by fixing 'revevals' reference typo
    reveals.forEach(element => revealObserver.observe(element));
}

// 5. Back-to-Top Interaction Tracking
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (btn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// 6. Dynamic Animated Statistics Engine
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                let count = 0;
                const speed = target / 50; 

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                // Set counter metric to base zero on target intersection before starting animation loop
                counter.innerText = "0";
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// 7. Accessible FAQ Accordion Pattern
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item-trigger');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const content = item.nextElementSibling;
            const isOpen = parent.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('active');
                const innerContent = el.querySelector('.faq-item-content');
                if (innerContent) innerContent.style.maxHeight = null;
            });

            if (!isOpen) {
                parent.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// 8. Client-Side Portfolio Category Filtering
function initPortfolioFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.portfolio-card');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// 9. Premium Testimonial Multi-Item Slider
function initTestimonialSlider() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    const updateSlider = () => {
        const slideWidth = slides[0].clientWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    });

    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);
}

// 10. Robust Enterprise Client Form Validation Logic
function initFormValidation() {
    const form = document.querySelector('.validated-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const inputs = form.querySelectorAll('[required]');
        inputs.forEach(input => {
            const formGroup = input.parentElement;
            let errorMsg = formGroup.querySelector('.error-message');

            if (!errorMsg) {
                errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#EF4444';
                errorMsg.style.fontSize = '0.8rem';
                formGroup.appendChild(errorMsg);
            }

            if (!input.value.trim()) {
                isValid = false;
                formGroup.classList.add('field-error');
                errorMsg.innerText = 'This field cannot be blank.';
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                isValid = false;
                formGroup.classList.add('field-error');
                errorMsg.innerText = 'Please input a valid email structure.';
            } else {
                formGroup.classList.remove('field-error');
                errorMsg.innerText = '';
            }
        });

        if (isValid) {
            alert('Form processing complete! Your request has been securely dispatched.');
            form.reset();
        }
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
