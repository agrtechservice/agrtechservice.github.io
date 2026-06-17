document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
});

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            const isExpanded = mobileMenu.classList.contains('hidden') ? 'false' : 'true';
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    const navbar = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }

        lastScroll = currentScroll;
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isValid = validateForm();
            
            if (isValid) {
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                console.log('Form submitted with data:', data);
                
                const successMessage = document.getElementById('form-success');
                successMessage.classList.remove('hidden');
                
                contactForm.reset();
                
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }
        });

        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                const errorElement = document.getElementById(`${this.id}-error`);
                if (errorElement && !errorElement.classList.contains('hidden')) {
                    validateField(this);
                }
            });
        });
    }
}

function validateForm() {
    let isValid = true;
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const service = document.getElementById('service');
    const message = document.getElementById('message');
    
    isValid = validateField(name) && isValid;
    isValid = validateField(email) && isValid;
    isValid = validateField(service) && isValid;
    isValid = validateField(message) && isValid;
    
    return isValid;
}

function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    if (field.id === 'message' && field.value.trim() && field.value.trim().length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
    }
    
    if (errorElement) {
        if (isValid) {
            errorElement.classList.add('hidden');
            errorElement.textContent = '';
            field.classList.remove('border-red-500');
            field.classList.add('border-gray-700');
        } else {
            errorElement.classList.remove('hidden');
            errorElement.textContent = errorMessage;
            field.classList.add('border-red-500');
            field.classList.remove('border-gray-700');
        }
    }
    
    return isValid;
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
