/**
 * Zen-inspired UI Components for Neuro-Transmitter Questionnaire
 * 
 * This file contains UI enhancement functions to create a more
 * calming, mindful experience throughout the application.
 */

// Add subtle animations and transitions to create a more mindful experience
function enhanceUIExperience() {
  document.addEventListener('DOMContentLoaded', () => {
    // Add subtle background pattern
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
          radial-gradient(circle at 25px 25px, rgba(193, 166, 123, 0.15) 2%, transparent 0%),
          radial-gradient(circle at 75px 75px, rgba(193, 166, 123, 0.1) 2%, transparent 0%);
        background-size: 100px 100px;
        pointer-events: none;
        z-index: -1;
      }
      
      .question-group {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .question-group:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .btn {
        position: relative;
        overflow: hidden;
      }
      
      .btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%, -50%);
        transform-origin: 50% 50%;
      }
      
      .btn:focus:not(:active)::after {
        animation: ripple 0.8s ease-out;
      }
      
      @keyframes ripple {
        0% {
          transform: scale(0, 0);
          opacity: 0.5;
        }
        20% {
          transform: scale(25, 25);
          opacity: 0.3;
        }
        100% {
          opacity: 0;
          transform: scale(40, 40);
        }
      }
      
      .section-header h2 {
        position: relative;
        display: inline-block;
      }
      
      .section-header h2::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, var(--clr-accent), transparent);
      }
      
      .category-header {
        position: relative;
        overflow: hidden;
      }
      
      .category-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: var(--clr-accent);
      }
    `;
    
    document.head.appendChild(styleElement);
    
    // Add smooth scrolling to section navigation
    document.querySelectorAll('.section-nav .btn').forEach(button => {
      button.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
    
    // Add focus styles for accessibility
    const focusStyles = document.createElement('style');
    focusStyles.textContent = `
      :focus {
        outline: 2px solid var(--clr-accent);
        outline-offset: 2px;
      }
      
      .btn:focus, .nav-link:focus {
        outline-offset: 4px;
      }
    `;
    
    document.head.appendChild(focusStyles);
  });
}

// Add mindful transitions between sections
function addMindfulTransitions() {
  document.addEventListener('DOMContentLoaded', () => {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    document.body.appendChild(overlay);
    
    // Add styles for transition
    const transitionStyles = document.createElement('style');
    transitionStyles.textContent = `
      .transition-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--clr-main-bg);
        opacity: 0;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.5s ease;
      }
      
      .transition-active {
        opacity: 1;
        pointer-events: all;
      }
    `;
    
    document.head.appendChild(transitionStyles);
    
    // Override section navigation to include transitions
    const originalNavigateTo = window.navigateTo || function() {};
    
    window.navigateTo = function(sectionId) {
      // Start transition
      overlay.classList.add('transition-active');
      
      // Wait for transition to complete
      setTimeout(() => {
        // Call original navigation function
        if (typeof originalNavigateTo === 'function') {
          originalNavigateTo(sectionId);
        } else {
          // Fallback navigation
          document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
          });
          
          const targetSection = document.getElementById(sectionId);
          if (targetSection) {
            targetSection.classList.add('active');
          }
        }
        
        // End transition
        setTimeout(() => {
          overlay.classList.remove('transition-active');
        }, 300);
      }, 300);
    };
    
    // Override navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        if (sectionId) {
          window.navigateTo(sectionId);
        }
      });
    });
  });
}

// Add zen-inspired decorative elements
function addZenDecorativeElements() {
  document.addEventListener('DOMContentLoaded', () => {
    // Add decorative elements to welcome page
    const welcomeContainer = document.querySelector('.welcome-container');
    if (welcomeContainer) {
      const decorElement = document.createElement('div');
      decorElement.className = 'zen-decor';
      welcomeContainer.appendChild(decorElement);
    }
    
    // Add decorative elements to break section
    const breakSection = document.querySelector('.break-section');
    if (breakSection) {
      const decorElement = document.createElement('div');
      decorElement.className = 'zen-decor';
      breakSection.appendChild(decorElement);
    }
    
    // Add styles for decorative elements
    const decorStyles = document.createElement('style');
    decorStyles.textContent = `
      .zen-decor {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23c1a67b' fill-opacity='0.1' d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
        background-size: cover;
        background-repeat: no-repeat;
        pointer-events: none;
        opacity: 0.7;
      }
      
      .welcome-container, .break-section {
        position: relative;
        padding-bottom: 60px;
      }
      
      .results-container {
        position: relative;
      }
      
      .results-container::before {
        content: '';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='%23c1a67b' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%23c1a67b' stroke-width='2'/%3E%3C/svg%3E");
        background-size: contain;
        opacity: 0.5;
      }
    `;
    
    document.head.appendChild(decorStyles);
  });
}

// Add breathing animation to break section
function addBreathingAnimation() {
  document.addEventListener('DOMContentLoaded', () => {
    const breakSection = document.querySelector('.break-section');
    if (breakSection) {
      const breathingCircle = document.createElement('div');
      breathingCircle.className = 'breathing-circle';
      breathingCircle.innerHTML = '<div class="breathing-text">Breathe</div>';
      breakSection.appendChild(breathingCircle);
      
      const breathingStyles = document.createElement('style');
      breathingStyles.textContent = `
        .breathing-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: rgba(193, 166, 123, 0.1);
          margin: 2rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: breathing 8s ease-in-out infinite;
        }
        
        .breathing-text {
          color: var(--clr-header);
          font-size: 1.2rem;
          opacity: 0.8;
        }
        
        @keyframes breathing {
          0%, 100% {
            transform: scale(1);
            background: rgba(193, 166, 123, 0.1);
          }
          
          40% {
            transform: scale(1.3);
            background: rgba(193, 166, 123, 0.2);
          }
          
          50% {
            transform: scale(1.3);
            background: rgba(193, 166, 123, 0.2);
          }
          
          90% {
            transform: scale(1);
            background: rgba(193, 166, 123, 0.1);
          }
        }
      `;
      
      document.head.appendChild(breathingStyles);
    }
  });
}

// Enhance form elements with zen-inspired styling
function enhanceFormElements() {
  document.addEventListener('DOMContentLoaded', () => {
    const formStyles = document.createElement('style');
    formStyles.textContent = `
      .answer-option label {
        position: relative;
        overflow: hidden;
      }
      
      .answer-option label::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: currentColor;
        opacity: 0;
        transform: scale(0);
        transition: transform 0.3s ease, opacity 0.3s ease;
        border-radius: inherit;
      }
      
      .answer-option input[type="radio"]:checked + label::before {
        opacity: 0.1;
        transform: scale(1);
      }
      
      .name-input {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
      }
      
      .name-input::placeholder {
        color: rgba(51, 51, 51, 0.5);
      }
    `;
    
    document.head.appendChild(formStyles);
  });
}

// Initialize all UI enhancements
function initializeZenUI() {
  enhanceUIExperience();
  addMindfulTransitions();
  addZenDecorativeElements();
  addBreathingAnimation();
  enhanceFormElements();
  
  console.log('Zen-inspired UI enhancements initialized');
}

// Export functions
export {
  initializeZenUI
};
