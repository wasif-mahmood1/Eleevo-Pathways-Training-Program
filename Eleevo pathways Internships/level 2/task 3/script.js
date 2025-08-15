// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Elements to observe for animations
const animatedElements = [
    '.hero-content',
    '.hero-image',
    '.features-grid',
    '.testimonials-grid',
    '.pricing-grid',
    '.footer-content'
];

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe all animated elements
    animatedElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            observer.observe(element);
        }
    });

    // Hero section entrance animation with delay
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.classList.add('animate-left');
        }
        
        if (heroImage) {
            heroImage.style.opacity = '1';
            heroImage.classList.add('animate-right');
        }
    }, 300);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            }
        });
    });

    // Add click effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .pricing-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animate task items in phone mockup
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 1000 + (index * 200));
        
        // Initial state
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.3s ease';
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (hero && scrolled < hero.offsetHeight) {
            const rate = scrolled * -0.5;
            if (heroContent) {
                heroContent.style.transform = `translateY(${rate * 0.5}px)`;
            }
            if (heroImage) {
                heroImage.style.transform = `translateY(${rate * 0.3}px)`;
            }
        }
    });

    // Feature cards stagger animation
    const featureCards = document.querySelectorAll('.feature-card');
    const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.feature-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    const featuresGrid = document.querySelector('.features-grid');
    if (featuresGrid) {
        // Set initial state for feature cards
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        featuresObserver.observe(featuresGrid);
    }

    // Testimonials cards stagger animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.testimonial-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid) {
        // Set initial state for testimonial cards
        testimonialCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        testimonialsObserver.observe(testimonialsGrid);
    }

    // Pricing cards stagger animation
    const pricingCardsAnim = document.querySelectorAll('.pricing-card');
    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.pricing-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = card.classList.contains('featured') ? 'scale(1.05)' : 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    const pricingGrid = document.querySelector('.pricing-grid');
    if (pricingGrid) {
        // Set initial state for pricing cards
        pricingCardsAnim.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        pricingObserver.observe(pricingGrid);
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
