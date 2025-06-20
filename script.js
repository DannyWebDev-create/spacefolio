// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.classList.toggle('dark', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    html.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
});

// Smooth scrolling for navigation links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && subject && message) {
            // Simulate form submission
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Project card hover effects
document.querySelectorAll('.group').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger animations for visible elements
    const visibleElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    visibleElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Responsive navigation menu (for mobile)
const createMobileMenu = () => {
    const nav = document.querySelector('nav .flex');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800';
    mobileMenuBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    `;
    
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden hidden';
    mobileMenu.innerHTML = `
        <div class="px-4 py-2 space-y-2">
            <a href="#home" class="block py-2 hover:text-purple-600 transition-colors">Home</a>
            <a href="#about" class="block py-2 hover:text-purple-600 transition-colors">About</a>
            <a href="#projects" class="block py-2 hover:text-purple-600 transition-colors">Projects</a>
            <a href="#contact" class="block py-2 hover:text-purple-600 transition-colors">Contact</a>
        </div>
    `;
    
    nav.appendChild(mobileMenuBtn);
    nav.parentElement.appendChild(mobileMenu);
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
};

// Initialize mobile menu
createMobileMenu();
