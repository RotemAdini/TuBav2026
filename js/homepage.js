// Homepage JavaScript - Clean and Organized
document.addEventListener('DOMContentLoaded', function() {
  console.log('Script loaded successfully');
  initializeHomepage();
});

// Initialize all homepage functionality
function initializeHomepage() {
  setupSidebar();
  setupMemoryGamePopup();
  setupSmoothScrolling();
  setupNewsletterForm();
  setupAnimations();
  markCurrentPage();
}

// Sidebar functionality
function setupSidebar() {
  // Make toggleSidebar global for onclick
  window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburger = document.querySelector('.hamburger');
    
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
  };
  
  // Close sidebar on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && sidebar.classList.contains('open')) {
        window.toggleSidebar();
      }
    }
  });
}

// Memory Game Popup functionality
function setupMemoryGamePopup() {
  // Make popup functions global
  window.openMemoryGamePopup = function() {
    const popup = document.getElementById('memoryGamePopup');
    if (popup) {
      popup.classList.add('active');
      popup.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Focus management for accessibility
      const closeButton = popup.querySelector('.popup-close');
      if (closeButton) {
        closeButton.focus();
      }
    }
  };

  window.closeMemoryGamePopup = function() {
    const popup = document.getElementById('memoryGamePopup');
    if (popup) {
      popup.classList.remove('active');
      popup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }
  };

  // Close popup when clicking outside
  const popup = document.getElementById('memoryGamePopup');
  if (popup) {
    popup.addEventListener('click', function(e) {
      if (e.target === this) {
        window.closeMemoryGamePopup();
      }
    });
  }

  // Close popup with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const popup = document.getElementById('memoryGamePopup');
      if (popup && popup.classList.contains('active')) {
        window.closeMemoryGamePopup();
      }
    }
  });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      console.log('Link clicked:', this.getAttribute('href'));
      
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        console.log('Target found, scrolling to:', targetId);
        
        // Close sidebar if open
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
          window.toggleSidebar();
        }
        
        // Wait a bit for sidebar to close, then scroll
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
        
        console.log('Scrolled successfully');
      } else {
        console.log('Target not found:', targetId);
      }
    });
  });
}

// Newsletter form functionality
function setupNewsletterForm() {
  const form = document.getElementById('containingDiv7eaada0');
  if (!form) return;
  
  const submitBtn = form.querySelector('.fc_button');
  const nameInput = form.querySelector('input[name="1"]');
  const emailInput = form.querySelector('input[name="eMail"]');
  const confirmCheckbox = form.querySelector('input[name="confirm"]');
  
  // Form validation and submission
  form.addEventListener('submit', function(e) {
    // Validate name
    if (!nameInput || !nameInput.value.trim()) {
      alert('אנא מלאו את השם');
      if (nameInput) nameInput.focus();
      e.preventDefault();
      return false;
    }
    
    // Validate email
    if (!emailInput || !emailInput.value.trim()) {
      alert('אנא מלאו את כתובת המייל');
      if (emailInput) emailInput.focus();
      e.preventDefault();
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      alert('אנא מלאו כתובת מייל תקינה');
      emailInput.focus();
      e.preventDefault();
      return false;
    }
    
    // Validate checkbox
    if (!confirmCheckbox || !confirmCheckbox.checked) {
      alert('יש לאשר קבלת דיוורים על מנת להירשם');
      if (confirmCheckbox) confirmCheckbox.focus();
      e.preventDefault();
      return false;
    }
    
    // Show loading state
    if (submitBtn) {
      const originalText = submitBtn.value;
      submitBtn.value = '⏳ שולח...';
      submitBtn.disabled = true;
      
      // Simulate loading and success
      setTimeout(() => {
        submitBtn.value = '✅ נשלח בהצלחה!';
        setTimeout(() => {
          submitBtn.value = originalText;
          submitBtn.disabled = false;
          form.reset();
        }, 3000);
      }, 1500);
    }
  });
  
  // Real-time validation feedback
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = '#e74c3c';
      } else {
        this.style.borderColor = '';
      }
    });
  }
  
  if (nameInput) {
    nameInput.addEventListener('blur', function() {
      if (this.value.trim().length < 2) {
        this.style.borderColor = '#e74c3c';
      } else {
        this.style.borderColor = '';
      }
    });
  }
}

// Initialize animations
function setupAnimations() {
  // Animate benefit cards on scroll
  const cards = document.querySelectorAll('.benefit-card');
  if (cards.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 200);
        }
      });
    }, observerOptions);
    
    // Set initial state and observe
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });
  }
  
  // Animate game cards
  const gameCards = document.querySelectorAll('.game-card');
  if (gameCards.length > 0) {
    const gameObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, index * 150);
        }
      });
    }, { threshold: 0.1 });
    
    gameCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px) scale(0.95)';
      card.style.transition = 'all 0.5s ease';
      gameObserver.observe(card);
    });
  }
}

// Mark current page in sidebar
function markCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  
  sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.style.background = 'var(--gradient-primary)';
      link.style.color = 'white';
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle viewport changes
window.addEventListener('resize', debounce(() => {
  // Close mobile menu on desktop
  if (window.innerWidth > 768) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      window.toggleSidebar();
    }
  }
}, 250));

// Performance monitoring
if (window.performance && window.performance.measure) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      }
    }, 0);
  });
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
});

// Console message for developers
console.log('%c🎮 משחקי זוגיות - רותם עדיני', 
           'color: #8e44ad; font-size: 20px; font-weight: bold;');
console.log('%cהאתר פותח בידי מפתח מקצועי', 
           'color: #667eea; font-size: 14px;');