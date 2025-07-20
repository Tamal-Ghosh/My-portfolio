// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDark = document.body.classList.contains('dark-theme');
    
    if (window.scrollY > 100) {
        if (isDark) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        }
    } else {
        if (isDark) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.skill-category, .project-card, .about-text, .about-image');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    // Add a small delay before starting the typing effect
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 500);
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    // Prevent default submission
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    

    setTimeout(() => {
        showMessage(`Thank you, ${name}! Your message has been received. Please contact me directly at tamalghosha07@gmail.com for immediate response.`, 'success');
        this.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);
});

// Function to show custom messages
function showMessage(text, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : '#dc2626'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#messageAnimations')) {
        const style = document.createElement('style');
        style.id = 'messageAnimations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Append to body
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 5000);
    
    // Click to dismiss
    messageDiv.addEventListener('click', () => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Skill items animation on hover
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotateY(10deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Counter animation for stats
function animateCounter(element, start, end, duration) {
    let current = start;
    const increment = (end - start) / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current) + '+';
        
        if (current >= end) {
            element.textContent = end + '+';
            clearInterval(timer);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            const stats = entry.target.querySelectorAll('.stat h4');
            stats.forEach((stat, index) => {
                const values = [11, 2, 50]; // GitHub Repos, Years Learning, GitHub Contributions
                setTimeout(() => {
                    animateCounter(stat, 0, values[index], 2000);
                }, index * 200);
            });
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Dark mode is now default
    document.body.classList.add('dark-theme');
    
    // Console message for fellow developers
    console.log('%c👋 Hello, fellow developer!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%c🚀 I\'m Tamal Ghosh, a CSE student learning Python-Django and Android development with Kotlin!', 'color: #764ba2; font-size: 14px;');
    console.log('%c📧 Let\'s connect: tamalghosha07@gmail.com', 'color: #667eea; font-size: 12px;');
    console.log('%c🔗 GitHub: https://github.com/Tamal-Ghosh', 'color: #764ba2; font-size: 12px;');
});

// Add smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Add custom cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

/**
 * Initialize theme toggle in navbar
 */
// Theme switcher in navbar
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;
    
    // Check if dark theme is already applied from the head script
    const isDarkThemeApplied = document.documentElement.classList.contains('dark-theme');
    if (isDarkThemeApplied) {
        document.body.classList.add('dark-theme');
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.documentElement.classList.toggle('dark-theme');
        
        const isDark = document.body.classList.contains('dark-theme');
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update navbar styling immediately when theme changes
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            if (isDark) {
                navbar.style.background = 'rgba(10, 10, 15, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            }
        } else {
            if (isDark) {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.2)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
        
        // Add a little animation on click
        themeToggle.style.transform = 'translateY(-2px) scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'translateY(0) scale(1)';
        }, 150);
    });
}

// Initialize theme toggle
initializeThemeToggle();

// Add dark theme styles
const darkThemeStyles = `
    .dark-theme {
        --bg-primary: #0a0a0f;
        --bg-secondary: #1a1a2e;
        --bg-tertiary: #16213e;
        --bg-card: #1f2937;
        --text-primary: #ffffff;
        --text-secondary: #e2e8f0;
        --text-muted: #94a3b8;
        --accent-primary: #8b5cf6;
        --accent-secondary: #a855f7;
        --accent-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --accent-gradient-alt: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%);
        --border-color: #374151;
        --hover-bg: #374151;
        --purple-glow: rgba(139, 92, 246, 0.4);
    }
    
    .dark-theme body {
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        color: var(--text-primary);
    }
    
    .dark-theme .navbar {
        background: rgba(10, 10, 15, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-color);
    }
    
    .dark-theme .nav-logo a {
        background: var(--accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .dark-theme .nav-link {
        color: var(--text-secondary);
    }
    
    .dark-theme .nav-link:hover {
        color: var(--accent-primary);
    }
    
    .dark-theme .theme-toggle {
        background: var(--accent-gradient-alt);
        box-shadow: 0 2px 10px var(--purple-glow);
    }
    
    .dark-theme .theme-toggle:hover {
        box-shadow: 0 4px 15px var(--purple-glow);
    }
    
    .dark-theme .hero {
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-tertiary) 100%);
        position: relative;
    }
    
    .dark-theme .hero::before {
        background: radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
    }
    
    .dark-theme .hero-title {
        color: var(--text-primary);
    }
    
    .dark-theme .highlight {
        background: var(--accent-gradient-alt);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .dark-theme .hero-subtitle {
        color: var(--text-secondary);
    }
    
    .dark-theme .hero-description {
        color: var(--text-muted);
    }
    
    .dark-theme .btn-primary {
        background: var(--accent-gradient-alt);
        border: none;
        box-shadow: 0 4px 15px var(--purple-glow);
    }
    
    .dark-theme .btn-secondary {
        background: transparent;
        color: var(--accent-primary);
        border: 2px solid var(--accent-primary);
    }
    
    .dark-theme .btn-secondary:hover {
        background: var(--accent-primary);
        color: white;
    }
    
    .dark-theme .btn-outline {
        background: transparent !important;
        color: var(--accent-secondary) !important;
        border: 2px solid var(--accent-secondary) !important;
    }
    
    .dark-theme .btn-outline:hover {
        background: var(--accent-gradient-alt) !important;
        color: white !important;
        border-color: transparent !important;
        box-shadow: 0 6px 20px var(--purple-glow);
    }
    
    .dark-theme .profile-circle {
        background: var(--accent-gradient-alt);
        box-shadow: 0 20px 40px var(--purple-glow);
    }
    
    .dark-theme .about {
        background: var(--bg-secondary);
    }
    
    .dark-theme .section-title {
        color: var(--text-primary);
    }
    
    .dark-theme .section-title::after {
        background: var(--accent-gradient);
    }
    
    .dark-theme .about-text h3 {
        color: var(--text-primary);
    }
    
    .dark-theme .about-text p {
        color: var(--text-muted);
    }
    
    .dark-theme .stat {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
    }
    
    .dark-theme .stat h4 {
        color: var(--accent-primary);
    }
    
    .dark-theme .stat p {
        color: var(--text-secondary);
    }
    
    .dark-theme .current-status {
        background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
        border: 1px solid #4b5563;
        box-shadow: 0 8px 25px rgba(139, 92, 246, 0.2);
        color: #ffffff;
    }
    
    .dark-theme .current-status::before {
        background: linear-gradient(45deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
    }
    
    .dark-theme .current-status h4 {
        color: #ffffff;
    }
    
    .dark-theme .status-text {
        color: #e5e7eb;
        font-weight: 500;
    }
    
    .dark-theme .languages-section h4 {
        color: var(--text-primary);
    }
    
    .dark-theme .language-item {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-left: 4px solid var(--accent-primary);
    }
    
    .dark-theme .language-item:hover {
        background: var(--bg-tertiary);
        box-shadow: 0 4px 12px var(--purple-glow);
    }
    
    .dark-theme .language-name {
        color: var(--text-primary);
    }
    
    .dark-theme .language-level {
        color: var(--accent-secondary);
    }
    
    .dark-theme .about-img-container {
        background: var(--accent-gradient-alt);
        box-shadow: 0 20px 40px var(--purple-glow);
    }
    
    .dark-theme .skills {
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%);
    }
    
    .dark-theme .skill-category {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
    }
    
    .dark-theme .skill-category h3 {
        color: var(--text-primary);
    }
    
    .dark-theme .skill-item {
        background: var(--bg-tertiary);
        color: var(--text-secondary);
        border: 1px solid var(--border-color);
        transition: all 0.3s ease;
    }
    
    .dark-theme .skill-item i {
        color: var(--accent-primary);
    }
    
    .dark-theme .skill-item:hover {
        background: var(--accent-gradient-alt);
        color: var(--text-primary);
        border-color: transparent;
        transform: scale(1.05) rotateY(10deg);
        box-shadow: 0 10px 25px var(--purple-glow);
    }
    
    .dark-theme .skill-item:hover i {
        color: var(--text-primary);
    }
    
    .dark-theme .projects {
        background: var(--bg-secondary);
    }
    
    .dark-theme .project-card {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
    }
    
    .dark-theme .project-image {
        background: var(--accent-gradient-alt);
    }
    
    .dark-theme .project-content h3 {
        color: var(--text-primary);
    }
    
    .dark-theme .project-content p {
        color: var(--text-muted);
    }
    
    .dark-theme .tag {
        background: var(--bg-tertiary);
        color: var(--text-secondary);
        border: 1px solid var(--border-color);
    }
    
    .dark-theme .project-link {
        background: var(--bg-tertiary);
        color: var(--accent-primary);
        border: 1px solid var(--border-color);
    }
    
    .dark-theme .project-link:hover {
        background: var(--accent-primary);
        color: var(--text-primary);
        border-color: var(--accent-primary);
    }
    
    .dark-theme .contact {
        background: var(--accent-gradient-alt);
        position: relative;
        overflow: hidden;
    }
    
    .dark-theme .contact::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%);
        z-index: 1;
    }
    
    .dark-theme .contact .container {
        position: relative;
        z-index: 2;
    }
    
    .dark-theme .contact .section-title {
        color: white;
    }
    
    .dark-theme .contact .section-title::after {
        background: white;
    }
    
    .dark-theme .contact-info h3 {
        color: white;
    }
    
    .dark-theme .contact-info p {
        color: rgba(255, 255, 255, 0.9);
    }
    
    .dark-theme .contact-item {
        color: rgba(255, 255, 255, 0.9);
    }
    
    .dark-theme .social-link {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        backdrop-filter: blur(10px);
    }
    
    .dark-theme .social-link:hover {
        background: white;
        color: var(--accent-primary);
    }
    
    .dark-theme .contact-form {
        background: rgba(13, 27, 42, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }
    
    .dark-theme .form-group input,
    .dark-theme .form-group textarea {
        background: rgba(13, 27, 42, 0.7);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        font-weight: 500;
    }
    
    .dark-theme .form-group input::placeholder,
    .dark-theme .form-group textarea::placeholder {
        color: rgba(255, 255, 255, 0.7);
        font-weight: 400;
    }
    
    .dark-theme .form-group input:focus,
    .dark-theme .form-group textarea:focus {
        background: rgba(13, 27, 42, 0.95);
        border-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
    }
    
    .dark-theme .footer {
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        color: var(--text-secondary);
        border-top: 1px solid var(--border-color);
    }
    
    .dark-theme .footer-message p {
        color: var(--text-secondary);
    }
    
    .dark-theme .footer-links a {
        color: var(--accent-primary);
        border-color: rgba(139, 92, 246, 0.3);
    }
    
    .dark-theme .footer-links a:hover {
        color: white;
        background: rgba(139, 92, 246, 0.2);
        border-color: var(--accent-primary);
    }
    
    .dark-theme .hamburger span {
        background: var(--text-secondary);
    }
    
    .dark-theme .nav-menu {
        background: rgba(10, 10, 15, 0.98);
        backdrop-filter: blur(20px);
        border: none;
    }
    
    .dark-theme .nav-menu.active {
        background: rgba(10, 10, 15, 0.98);
    }
    
    .dark-theme .hamburger.active span:nth-child(1) {
        background: var(--text-secondary);
    }
    
    .dark-theme .hamburger.active span:nth-child(2) {
        background: var(--text-secondary);
    }
    
    .dark-theme .hamburger.active span:nth-child(3) {
        background: var(--text-secondary);
    }
`;

// Inject dark theme styles
const styleSheet = document.createElement('style');
styleSheet.textContent = darkThemeStyles;
document.head.appendChild(styleSheet);
