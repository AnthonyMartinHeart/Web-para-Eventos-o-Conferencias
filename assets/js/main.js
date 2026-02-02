// EventPro - Main JavaScript File

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled', 'shadow-lg');
    } else {
        navbar.classList.remove('scrolled', 'shadow-lg');
    }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'all';
    } else {
        scrollTopBtn.classList.remove('visible');
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Schedule Tabs Functionality
const scheduleTabs = document.querySelectorAll('.schedule-tab-btn');
const scheduleContents = document.querySelectorAll('.schedule-content');

scheduleTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const targetDay = this.getAttribute('data-day');
        
        // Remove active class from all tabs
        scheduleTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all schedule contents
        scheduleContents.forEach(content => {
            content.classList.add('hidden');
        });
        
        // Show target schedule content
        const targetContent = document.getElementById(targetDay);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#0') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Countdown Timer
function initCountdown() {
    const eventDate = new Date('May 15, 2026 09:00:00').getTime();
    
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-number">${days}</div>
                <div class="countdown-label">Días</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${hours}</div>
                <div class="countdown-label">Horas</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${minutes}</div>
                <div class="countdown-label">Minutos</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${seconds}</div>
                <div class="countdown-label">Segundos</div>
            </div>
        `;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = '<div class="text-2xl font-bold">¡El evento ha comenzado!</div>';
        }
    }, 1000);
}

// Initialize countdown if element exists
if (document.getElementById('countdown')) {
    initCountdown();
}

// Form Validation
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Por favor, completa todos los campos requeridos', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
        this.reset();
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('footer form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        showNotification('¡Gracias por suscribirte! Recibirás nuestras actualizaciones.', 'success');
        this.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-8 z-50 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 translate-x-[400px]`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Animate stats when in viewport
if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.text-4xl');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace(/\D/g, ''));
                    if (target) {
                        animateCounter(stat, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('#home .grid.grid-cols-3');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Video Modal
function openVideoModal(videoUrl) {
    const modal = document.createElement('div');
    modal.className = 'video-modal active';
    modal.innerHTML = `
        <div class="max-w-5xl w-full mx-4">
            <div class="relative">
                <button onclick="this.closest('.video-modal').remove()" class="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition">
                    <i class="fas fa-times"></i>
                </button>
                <div class="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden">
                    <iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full"></iframe>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
}

// Pricing Plans Comparison
function comparePlans() {
    // Add functionality to compare different pricing plans
    console.log('Comparing pricing plans...');
}

// Speaker Filter
function filterSpeakers(category) {
    const speakers = document.querySelectorAll('.speaker-card');
    
    speakers.forEach(speaker => {
        if (category === 'all' || speaker.dataset.category === category) {
            speaker.style.display = 'block';
        } else {
            speaker.style.display = 'none';
        }
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const searchableElements = document.querySelectorAll('[data-searchable]');
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });
    });
}

// Initialize search if element exists
initSearch();

// Add to Calendar Functionality
function addToCalendar() {
    const event = {
        title: 'EventPro - Conferencia de Tecnología 2026',
        start: new Date('2026-05-15T09:00:00'),
        end: new Date('2026-05-17T18:00:00'),
        location: 'Centro de Convenciones, Ciudad de México',
        description: 'La conferencia de tecnología más grande del año'
    };
    
    // Generate iCal format
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDate(event.start)}
DTEND:${formatDate(event.end)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
    
    // Create download link
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'eventpro-2026.ics';
    link.click();
    
    showNotification('Evento agregado al calendario', 'success');
}

function formatDate(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// Share Event
function shareEvent(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('¡Únete a EventPro 2026! La conferencia de tecnología más grande del año.');
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copiado al portapapeles', 'success');
    }).catch(() => {
        showNotification('Error al copiar', 'error');
    });
}

// Initialize tooltips (if using a tooltip library)
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            // Position tooltip
        });
    });
}

// Performance Monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            console.log('Performance entry:', entry);
        });
    });
    
    perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
}

// Console welcome message
console.log('%c🎉 EventPro 2026', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%c¡Bienvenido a la conferencia de tecnología más grande del año!', 'font-size: 14px; color: #ec4899;');
console.log('%cDesarrollado con ❤️ usando HTML + Tailwind CSS', 'font-size: 12px; color: #6b7280;');

// Export functions for global use
window.EventPro = {
    openVideoModal,
    comparePlans,
    filterSpeakers,
    addToCalendar,
    shareEvent,
    copyToClipboard,
    showNotification
};
