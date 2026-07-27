// Analytics tracking
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }
}

function trackPurchaseIntent(source) {
    trackEvent('purchase_intent', {
        'source': source,
        'value': 36
    });
}

// Sidebar functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburger = document.querySelector('.hamburger');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Back to top functionality
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        trackEvent('scroll_to_top');
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// FAQ functionality
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.classList.remove('active');
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            
            // Toggle current answer
            if (!isActive) {
                answer.classList.add('active');
                question.classList.add('active');
                trackEvent('faq_opened', { 'question': question.textContent.substring(0, 50) });
            }
        });
    });
}

// Terms and Privacy popups
function showTerms() {
    alert('תנאי השימוש:\n\n1. המשחק מיועד לשימוש אישי בלבד\n2. אין החזר כספי למוצרים דיגיטליים\n3. כל הזכויות שמורות לרותם עדיני\n4. השימוש במשחק הוא באחריות המשתמש\n5. אסור להעביר או למכור את המשחק לאחרים');
}

function showPrivacy() {
    alert('מדיניות פרטיות:\n\n1. אנו אוספים רק מידע הכרחי לשליחת המשחק\n2. המידע לא יועבר לצדדים שלישיים\n3. ניתן לבקש מחיקת המידע בכל עת\n4. אנו משתמשים בעוגיות לשיפור החוויה\n5. ליצירת קשר: rotemadini@gmail.com');
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Mark current page in sidebar
function markCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    
    sidebarLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || linkPage === 'memoryGame.html') {
            link.style.background = 'rgba(255,255,255,0.2)';
            link.style.color = 'white';
        }
    });
}

// Track time on page
function trackTimeOnPage() {
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', { 'seconds': timeSpent });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initBackToTop();
    animateOnScroll();
    initFAQ();
    initSmoothScrolling();
    markCurrentPage();
    trackTimeOnPage();
    
    // Track page view
    trackEvent('page_view');
    
    console.log('Memory Game page loaded successfully');
});

// Make toggleSidebar globally available for onclick handlers
window.toggleSidebar = toggleSidebar;
window.showTerms = showTerms;
window.showPrivacy = showPrivacy;
window.trackPurchaseIntent = trackPurchaseIntent;
