/**
 * Progressive Interface Module for Neuro-Transmitter Questionnaire
 * 
 * This module implements the progressive interface that guides users
 * through the questionnaire with clear instructions and gentle prompts.
 */

// Function to implement progressive navigation with section tracking
function implementProgressiveNavigation() {
  document.addEventListener('DOMContentLoaded', () => {
    // Define the section sequence for proper navigation
    const sectionSequence = [
      'welcome',
      'part1-intro',
      'part1-dopamine',
      'part1-acetylcholine',
      'part1-gaba',
      'part1-serotonin',
      'part1-break',
      'part2-intro',
      'part2-dopamine',
      'part2-acetylcholine',
      'part2-gaba',
      'part2-serotonin',
      'results'
    ];
    
    // Track current section index
    let currentSectionIndex = 0;
    
    // Function to navigate to next section
    function navigateToNextSection() {
      if (currentSectionIndex < sectionSequence.length - 1) {
        currentSectionIndex++;
        navigateToSection(sectionSequence[currentSectionIndex]);
      }
    }
    
    // Function to navigate to previous section
    function navigateToPreviousSection() {
      if (currentSectionIndex > 0) {
        currentSectionIndex--;
        navigateToSection(sectionSequence[currentSectionIndex]);
      }
    }
    
    // Function to navigate to specific section
    function navigateToSection(sectionId) {
      // Update current section index
      const newIndex = sectionSequence.indexOf(sectionId);
      if (newIndex !== -1) {
        currentSectionIndex = newIndex;
      }
      
      // Hide all sections
      document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
      });
      
      // Show target section
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add('active');
        
        // Update progress bar
        updateProgressBar();
        
        // Update navigation links
        updateNavigationLinks();
        
        // Scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
    
    // Function to update progress bar
    function updateProgressBar() {
      const progressPercentage = ((currentSectionIndex + 1) / sectionSequence.length) * 100;
      const progressBar = document.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
      }
    }
    
    // Function to update navigation links
    function updateNavigationLinks() {
      document.querySelectorAll('.nav-link').forEach(link => {
        const sectionId = link.getAttribute('data-section');
        const sectionIndex = sectionSequence.indexOf(sectionId);
        
        // Mark as active if current section
        if (sectionIndex === currentSectionIndex) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
        
        // Mark as completed if already visited
        if (sectionIndex < currentSectionIndex) {
          link.classList.add('completed');
        }
      });
    }
    
    // Add event listeners to navigation buttons
    document.querySelectorAll('.section-nav .btn').forEach(button => {
      button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const nextSection = button.getAttribute('data-next');
        
        if (action === 'next' && nextSection) {
          navigateToSection(nextSection);
        } else if (action === 'back') {
          navigateToPreviousSection();
        }
      });
    });
    
    // Add event listeners to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        if (sectionId) {
          navigateToSection(sectionId);
        }
      });
    });
    
    // Initialize navigation
    navigateToSection(sectionSequence[currentSectionIndex]);
    
    // Expose navigation functions to global scope
    window.navigateToNextSection = navigateToNextSection;
    window.navigateToPreviousSection = navigateToPreviousSection;
    window.navigateToSection = navigateToSection;
  });
}

// Function to add progress indicators for each section
function addProgressIndicators() {
  document.addEventListener('DOMContentLoaded', () => {
    // Add progress indicator to each questionnaire section
    document.querySelectorAll('.questionnaire-section').forEach(section => {
      const sectionHeader = section.querySelector('.section-header');
      if (sectionHeader) {
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'section-progress';
        
        // Get section ID to determine progress
        const sectionId = section.parentElement.id;
        let progressText = '';
        
        if (sectionId.includes('part1-dopamine')) {
          progressText = 'Section 1 of 8';
        } else if (sectionId.includes('part1-acetylcholine')) {
          progressText = 'Section 2 of 8';
        } else if (sectionId.includes('part1-gaba')) {
          progressText = 'Section 3 of 8';
        } else if (sectionId.includes('part1-serotonin')) {
          progressText = 'Section 4 of 8';
        } else if (sectionId.includes('part2-dopamine')) {
          progressText = 'Section 5 of 8';
        } else if (sectionId.includes('part2-acetylcholine')) {
          progressText = 'Section 6 of 8';
        } else if (sectionId.includes('part2-gaba')) {
          progressText = 'Section 7 of 8';
        } else if (sectionId.includes('part2-serotonin')) {
          progressText = 'Section 8 of 8';
        }
        
        progressIndicator.textContent = progressText;
        sectionHeader.appendChild(progressIndicator);
      }
    });
    
    // Add styles for progress indicators
    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
      .section-progress {
        font-size: 0.9rem;
        color: var(--clr-accent);
        margin-top: 0.5rem;
        font-weight: 500;
      }
      
      .section-header {
        display: flex;
        flex-direction: column;
      }
    `;
    
    document.head.appendChild(progressStyles);
  });
}

// Function to add mindful prompts between sections
function addMindfulPrompts() {
  document.addEventListener('DOMContentLoaded', () => {
    // Add mindful prompts to section navigation
    document.querySelectorAll('.section-nav').forEach(nav => {
      const sectionId = nav.closest('section').id;
      
      // Only add prompts to questionnaire sections
      if (sectionId.includes('part1-') || sectionId.includes('part2-')) {
        const promptElement = document.createElement('div');
        promptElement.className = 'mindful-prompt';
        
        // Different prompts for different sections
        let promptText = '';
        
        if (sectionId.includes('dopamine')) {
          promptText = 'Take a moment to reflect on your energy and motivation patterns.';
        } else if (sectionId.includes('acetylcholine')) {
          promptText = 'Pause briefly to consider your learning and creative tendencies.';
        } else if (sectionId.includes('gaba')) {
          promptText = 'Breathe deeply as you reflect on your calm and stability patterns.';
        } else if (sectionId.includes('serotonin')) {
          promptText = 'Center yourself as you consider your mood and social connection patterns.';
        }
        
        promptElement.textContent = promptText;
        nav.insertBefore(promptElement, nav.firstChild);
      }
    });
    
    // Add styles for mindful prompts
    const promptStyles = document.createElement('style');
    promptStyles.textContent = `
      .mindful-prompt {
        background: var(--clr-light-accent);
        padding: var(--spacing-md);
        border-radius: var(--border-radius-md);
        margin-bottom: var(--spacing-md);
        font-style: italic;
        color: var(--clr-header);
        text-align: center;
      }
    `;
    
    document.head.appendChild(promptStyles);
  });
}

// Function to enhance the break section between parts
function enhanceBreakSection() {
  document.addEventListener('DOMContentLoaded', () => {
    const breakSection = document.getElementById('part1-break');
    if (breakSection) {
      // Add mindful quote to break section
      const quoteElement = document.createElement('blockquote');
      quoteElement.className = 'mindful-quote';
      quoteElement.innerHTML = `
        <p>"Between stimulus and response there is a space. In that space is our power to choose our response."</p>
        <cite>— Viktor E. Frankl</cite>
      `;
      
      // Insert after break message
      const breakMessage = breakSection.querySelector('.break-message');
      if (breakMessage) {
        breakMessage.after(quoteElement);
      } else {
        breakSection.querySelector('.break-section').appendChild(quoteElement);
      }
      
      // Add styles for mindful quote
      const quoteStyles = document.createElement('style');
      quoteStyles.textContent = `
        .mindful-quote {
          margin: var(--spacing-xl) auto;
          max-width: 600px;
          padding: var(--spacing-lg);
          background: rgba(255, 255, 255, 0.7);
          border-left: 4px solid var(--clr-accent);
          border-radius: var(--border-radius-md);
          font-style: italic;
        }
        
        .mindful-quote p {
          margin-bottom: var(--spacing-sm);
          line-height: 1.6;
        }
        
        .mindful-quote cite {
          display: block;
          text-align: right;
          font-size: 0.9rem;
          color: var(--clr-header);
        }
      `;
      
      document.head.appendChild(quoteStyles);
    }
  });
}

// Function to add section completion indicators
function addSectionCompletionIndicators() {
  document.addEventListener('DOMContentLoaded', () => {
    // Track section completion
    const sectionCompletion = {};
    
    // Function to check if a section is complete
    function checkSectionCompletion(sectionId) {
      // Get all radio inputs in the section
      const section = document.getElementById(sectionId);
      if (!section) return false;
      
      const radioInputs = section.querySelectorAll('input[type="radio"]');
      const radioGroups = {};
      
      // Group radio inputs by name
      radioInputs.forEach(input => {
        const name = input.getAttribute('name');
        if (!radioGroups[name]) {
          radioGroups[name] = [];
        }
        radioGroups[name].push(input);
      });
      
      // Check if all radio groups have a selected option
      const totalGroups = Object.keys(radioGroups).length;
      if (totalGroups === 0) return true; // No inputs to check
      
      let completedGroups = 0;
      
      Object.values(radioGroups).forEach(group => {
        const isGroupComplete = group.some(input => input.checked);
        if (isGroupComplete) {
          completedGroups++;
        }
      });
      
      // Calculate completion percentage
      const completionPercentage = (completedGroups / totalGroups) * 100;
      
      // Update section completion status
      sectionCompletion[sectionId] = {
        complete: completedGroups === totalGroups,
        percentage: completionPercentage
      };
      
      return completedGroups === totalGroups;
    }
    
    // Function to update section completion indicators
    function updateSectionCompletionIndicators() {
      document.querySelectorAll('.questionnaire-section').forEach(section => {
        const sectionId = section.parentElement.id;
        const isComplete = checkSectionCompletion(sectionId);
        const completionPercentage = sectionCompletion[sectionId]?.percentage || 0;
        
        // Update section header with completion status
        const sectionHeader = section.querySelector('.section-header');
        if (sectionHeader) {
          // Remove existing completion indicator if any
          const existingIndicator = sectionHeader.querySelector('.completion-indicator');
          if (existingIndicator) {
            existingIndicator.remove();
          }
          
          // Add new completion indicator
          const completionIndicator = document.createElement('div');
          completionIndicator.className = 'completion-indicator';
          
          if (isComplete) {
            completionIndicator.innerHTML = `
              <span class="completion-icon">✓</span>
              <span class="completion-text">Section Complete</span>
            `;
            completionIndicator.classList.add('complete');
          } else {
            completionIndicator.innerHTML = `
              <span class="completion-text">${Math.round(completionPercentage)}% Complete</span>
              <div class="completion-bar">
                <div class="completion-progress" style="width: ${completionPercentage}%"></div>
              </div>
            `;
          }
          
          sectionHeader.appendChild(completionIndicator);
        }
        
        // Update next button state
        const nextButton = section.querySelector('.section-nav .btn[data-action="next"]');
        if (nextButton) {
          if (isComplete) {
            nextButton.removeAttribute('disabled');
            nextButton.title = 'Continue to next section';
          } else {
            nextButton.setAttribute('disabled', 'disabled');
            nextButton.title = 'Please complete all questions before continuing';
          }
        }
      });
    }
    
    // Add styles for completion indicators
    const completionStyles = document.createElement('style');
    completionStyles.textContent = `
      .completion-indicator {
        margin-top: var(--spacing-sm);
        display: flex;
        align-items: center;
        font-size: 0.9rem;
      }
      
      .completion-indicator.complete {
        color: var(--clr-true);
      }
      
      .completion-icon {
        margin-right: var(--spacing-xs);
        font-weight: bold;
      }
      
      .completion-bar {
        height: 4px;
        background: var(--clr-neutral);
        border-radius: 2px;
        width: 100px;
        margin-left: var(--spacing-sm);
        overflow: hidden;
      }
      
      .completion-progress {
        height: 100%;
        background: var(--clr-accent);
        border-radius: 2px;
        width: 0%;
        transition: width 0.3s ease;
      }
      
      .btn[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .btn[disabled]:hover {
        background: var(--clr-accent);
        transform: none;
        box-shadow: none;
      }
    `;
    
    document.head.appendChild(completionStyles);
    
    // Add event listeners to track section completion
    document.querySelectorAll('.questionnaire-section').forEach(section => {
      section.addEventListener('change', () => {
        updateSectionCompletionIndicators();
      });
    });
    
    // Initialize completion indicators
    document.addEventListener('DOMContentLoaded', () => {
      updateSectionCompletionIndicators();
    });
    
    // Update indicators when navigating between sections
    const originalNavigateToSection = window.navigateToSection;
    if (originalNavigateToSection) {
      window.navigateToSection = function(sectionId) {
        originalNavigateToSection(sectionId);
        updateSectionCompletionIndicators();
      };
    }
  });
}

// Initialize all progressive interface features
function initializeProgressiveInterface() {
  implementProgressiveNavigation();
  addProgressIndicators();
  addMindfulPrompts();
  enhanceBreakSection();
  addSectionCompletionIndicators();
  
  console.log('Progressive interface initialized');
}

// Export functions
export {
  initializeProgressiveInterface
};
