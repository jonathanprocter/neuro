/**
 * Questionnaire Logic and Navigation Module for Neuro-Transmitter Questionnaire
 * 
 * This module handles the core logic for questionnaire navigation, response tracking,
 * and score calculation with the complete question database.
 */

// Import the complete question database
import questionDatabase from './questionDatabase.js';

// Main questionnaire controller class
class QuestionnaireController {
  constructor() {
    // Application state
    this.state = {
      currentSection: 'welcome',
      userName: '',
      responses: {
        part1: {
          dopamine: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          acetylcholine: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          gaba: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          serotonin: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          }
        },
        part2: {
          dopamine: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          acetylcholine: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          gaba: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          serotonin: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          }
        }
      },
      scores: {
        part1: {
          dopamine: 0,
          acetylcholine: 0,
          gaba: 0,
          serotonin: 0
        },
        part2: {
          dopamine: 0,
          acetylcholine: 0,
          gaba: 0,
          serotonin: 0
        }
      },
      sectionProgress: {
        'welcome': true,
        'part1-intro': false,
        'part1-dopamine': false,
        'part1-acetylcholine': false,
        'part1-gaba': false,
        'part1-serotonin': false,
        'part1-break': false,
        'part2-intro': false,
        'part2-dopamine': false,
        'part2-acetylcholine': false,
        'part2-gaba': false,
        'part2-serotonin': false,
        'results': false
      }
    };
    
    // Event listeners
    this.eventListeners = {};
  }
  
  // Initialize the questionnaire
  initialize() {
    console.log('Initializing questionnaire logic and navigation');
    
    // Render all questions
    this.renderAllQuestions();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Try to load saved responses
    const hasLoadedData = this.loadResponses();
    
    // If data was loaded and user has completed some sections, show the appropriate section
    if (hasLoadedData) {
      // Find the last completed section
      const completedSections = Object.entries(this.state.sectionProgress)
        .filter(([_, completed]) => completed)
        .map(([section, _]) => section);
      
      if (completedSections.length > 0) {
        const lastCompletedSection = completedSections[completedSections.length - 1];
        this.navigateTo(lastCompletedSection);
      }
    } else {
      // Otherwise start at welcome section
      this.navigateTo('welcome');
    }
    
    // Dispatch initialization event
    this.dispatchEvent('initialized', this.state);
  }
  
  // Set up event listeners
  setupEventListeners() {
    // Name input
    const nameInput = document.getElementById('name-input');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        this.state.userName = e.target.value.trim();
        this.saveResponses();
      });
      
      // Set initial value if available
      if (this.state.userName) {
        nameInput.value = this.state.userName;
      }
    }
    
    // Begin assessment button
    const beginAssessmentBtn = document.getElementById('begin-assessment');
    if (beginAssessmentBtn) {
      beginAssessmentBtn.addEventListener('click', () => {
        // Get user name
        if (nameInput) {
          this.state.userName = nameInput.value.trim() || 'Client';
          this.saveResponses();
        }
        
        // Navigate to Part 1 intro
        this.navigateTo('part1-intro');
      });
    }
    
    // Begin Part 1 button
    const beginPart1Btn = document.getElementById('begin-part1');
    if (beginPart1Btn) {
      beginPart1Btn.addEventListener('click', () => {
        this.navigateTo('part1-dopamine');
      });
    }
    
    // Begin Part 2 button
    const beginPart2Btn = document.getElementById('begin-part2');
    if (beginPart2Btn) {
      beginPart2Btn.addEventListener('click', () => {
        this.navigateTo('part2-dopamine');
      });
    }
    
    // Section navigation buttons
    document.querySelectorAll('.section-nav .btn').forEach(button => {
      button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const nextSection = button.getAttribute('data-next');
        
        if (action === 'next' && nextSection) {
          this.navigateTo(nextSection);
        } else if (action === 'back') {
          window.history.back();
        }
      });
    });
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        
        if (sectionId) {
          this.navigateTo(sectionId);
        }
      });
    });
    
    // Make navigation functions available globally
    window.navigateTo = this.navigateTo.bind(this);
  }
  
  // Navigation function
  navigateTo(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      this.state.currentSection = sectionId;
      
      // Mark section as visited in progress
      this.state.sectionProgress[sectionId] = true;
      
      // Update progress bar
      this.updateProgress();
      
      // Update navigation links
      this.updateNavLinks();
      
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Special handling for results section
      if (sectionId === 'results') {
        this.calculateScores();
        this.renderResults();
      }
      
      // Save progress
      this.saveResponses();
      
      // Dispatch navigation event
      this.dispatchEvent('navigated', { sectionId });
    }
  }
  
  // Update progress bar
  updateProgress() {
    // Calculate progress percentage
    const totalSections = Object.keys(this.state.sectionProgress).length;
    const completedSections = Object.values(this.state.sectionProgress).filter(Boolean).length;
    const progressPercentage = (completedSections / totalSections) * 100;
    
    // Update progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progressPercentage}%`;
    }
  }
  
  // Update navigation links
  updateNavLinks() {
    // Update navigation links based on progress
    document.querySelectorAll('.nav-link').forEach(link => {
      const sectionId = link.getAttribute('data-section');
      
      if (this.state.sectionProgress[sectionId]) {
        link.classList.add('completed');
      }
      
      if (this.state.currentSection === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Render all questions
  renderAllQuestions() {
    // Part 1: Determining Your Dominant Nature
    
    // Section 1A: Dopamine Assessment
    this.renderQuestions('part1', 'dopamine', 'memoryAttention', 'part1-dopamine-memory-questions');
    this.renderQuestions('part1', 'dopamine', 'physical', 'part1-dopamine-physical-questions');
    this.renderQuestions('part1', 'dopamine', 'personality', 'part1-dopamine-personality-questions');
    this.renderQuestions('part1', 'dopamine', 'character', 'part1-dopamine-character-questions');
    
    // Section 2A: Acetylcholine Assessment
    this.renderQuestions('part1', 'acetylcholine', 'memoryAttention', 'part1-acetylcholine-memory-questions');
    this.renderQuestions('part1', 'acetylcholine', 'physical', 'part1-acetylcholine-physical-questions');
    this.renderQuestions('part1', 'acetylcholine', 'personality', 'part1-acetylcholine-personality-questions');
    this.renderQuestions('part1', 'acetylcholine', 'character', 'part1-acetylcholine-character-questions');
    
    // Section 3A: GABA Assessment
    this.renderQuestions('part1', 'gaba', 'memoryAttention', 'part1-gaba-memory-questions');
    this.renderQuestions('part1', 'gaba', 'physical', 'part1-gaba-physical-questions');
    this.renderQuestions('part1', 'gaba', 'personality', 'part1-gaba-personality-questions');
    this.renderQuestions('part1', 'gaba', 'character', 'part1-gaba-character-questions');
    
    // Section 4A: Serotonin Assessment
    this.renderQuestions('part1', 'serotonin', 'memoryAttention', 'part1-serotonin-memory-questions');
    this.renderQuestions('part1', 'serotonin', 'physical', 'part1-serotonin-physical-questions');
    this.renderQuestions('part1', 'serotonin', 'personality', 'part1-serotonin-personality-questions');
    this.renderQuestions('part1', 'serotonin', 'character', 'part1-serotonin-character-questions');
    
    // Part 2: Defining Your Deficiencies
    
    // Section 1B: Dopamine Deficiency
    this.renderQuestions('part2', 'dopamine', 'memoryAttention', 'part2-dopamine-memory-questions');
    this.renderQuestions('part2', 'dopamine', 'physical', 'part2-dopamine-physical-questions');
    this.renderQuestions('part2', 'dopamine', 'personality', 'part2-dopamine-personality-questions');
    this.renderQuestions('part2', 'dopamine', 'character', 'part2-dopamine-character-questions');
    
    // Section 2B: Acetylcholine Deficiency
    this.renderQuestions('part2', 'acetylcholine', 'memoryAttention', 'part2-acetylcholine-memory-questions');
    this.renderQuestions('part2', 'acetylcholine', 'physical', 'part2-acetylcholine-physical-questions');
    this.renderQuestions('part2', 'acetylcholine', 'personality', 'part2-acetylcholine-personality-questions');
    this.renderQuestions('part2', 'acetylcholine', 'character', 'part2-acetylcholine-character-questions');
    
    // Section 3B: GABA Deficiency
    this.renderQuestions('part2', 'gaba', 'memoryAttention', 'part2-gaba-memory-questions');
    this.renderQuestions('part2', 'gaba', 'physical', 'part2-gaba-physical-questions');
    this.renderQuestions('part2', 'gaba', 'personality', 'part2-gaba-personality-questions');
    this.renderQuestions('part2', 'gaba', 'character', 'part2-gaba-character-questions');
    
    // Section 4B: Serotonin Deficiency
    this.renderQuestions('part2', 'serotonin', 'memoryAttention', 'part2-serotonin-memory-questions');
    this.renderQuestions('part2', 'serotonin', 'physical', 'part2-serotonin-physical-questions');
    this.renderQuestions('part2', 'serotonin', 'personality', 'part2-serotonin-personality-questions');
    this.renderQuestions('part2', 'serotonin', 'character', 'part2-serotonin-character-questions');
  }
  
  // Render questions for a specific section
  renderQuestions(part, neurotransmitter, category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Get questions for this section
    const questions = questionDatabase[part][neurotransmitter][category];
    
    // Render each question
    questions.forEach((question, index) => {
      const questionId = `${part}-${neurotransmitter}-${category}-${index}`;
      const questionNumber = index + 1;
      
      // Create question group
      const questionGroup = document.createElement('div');
      questionGroup.className = 'question-group';
      
      // Create question
      const questionElement = document.createElement('div');
      questionElement.className = 'question';
      questionElement.innerHTML = `
        <div class="question-number">${questionNumber}.</div>
        <div class="question-text">${question}</div>
      `;
      
      // Create answer options
      const answerOptions = document.createElement('div');
      answerOptions.className = 'answer-options';
      
      // True option
      const trueOption = document.createElement('div');
      trueOption.className = 'answer-option';
      trueOption.innerHTML = `
        <input type="radio" id="${questionId}-true" name="${questionId}" value="true">
        <label for="${questionId}-true" class="true">True</label>
      `;
      
      // False option
      const falseOption = document.createElement('div');
      falseOption.className = 'answer-option';
      falseOption.innerHTML = `
        <input type="radio" id="${questionId}-false" name="${questionId}" value="false">
        <label for="${questionId}-false" class="false">False</label>
      `;
      
      // Add event listeners
      trueOption.querySelector('input').addEventListener('change', (e) => {
        if (e.target.checked) {
          // Store response
          if (!this.state.responses[part][neurotransmitter][category]) {
            this.state.responses[part][neurotransmitter][category] = {};
          }
          this.state.responses[part][neurotransmitter][category][index] = true;
          
          // Save to local storage
          this.saveResponses();
          
          // Dispatch response event
          this.dispatchEvent('responseUpdated', {
            part,
            neurotransmitter,
            category,
            index,
            value: true
          });
        }
      });
      
      falseOption.querySelector('input').addEventListener('change', (e) => {
        if (e.target.checked) {
          // Store response
          if (!this.state.responses[part][neurotransmitter][category]) {
            this.state.responses[part][neurotransmitter][category] = {};
          }
          this.state.responses[part][neurotransmitter][category][index] = false;
          
          // Save to local storage
          this.saveResponses();
          
          // Dispatch response event
          this.dispatchEvent('responseUpdated', {
            part,
            neurotransmitter,
            category,
            index,
            value: false
          });
        }
      });
      
      // Check if there's a saved response
      if (this.state.responses[part][neurotransmitter][category] && 
          this.state.responses[part][neurotransmitter][category][index] !== undefined) {
        const value = this.state.responses[part][neurotransmitter][category][index];
        if (value === true) {
          trueOption.querySelector('input').checked = true;
        } else {
          falseOption.querySelector('input').checked = true;
        }
      }
      
      // Assemble question group
      answerOptions.appendChild(trueOption);
      answerOptions.appendChild(falseOption);
      questionGroup.appendChild(questionElement);
      questionGroup.appendChild(answerOptions);
      container.appendChild(questionGroup);
    });
  }
  
  // Calculate scores based on responses
  calculateScores() {
    // Reset scores
    this.state.scores = {
      part1: {
        dopamine: 0,
        acetylcholine: 0,
        gaba: 0,
        serotonin: 0
      },
      part2: {
        dopamine: 0,
        acetylcholine: 0,
        gaba: 0,
        serotonin: 0
      }
    };
    
    // Calculate Part 1 scores (Dominant Nature)
    ['dopamine', 'acetylcholine', 'gaba', 'serotonin'].forEach(neurotransmitter => {
      ['memoryAttention', 'physical', 'personality', 'character'].forEach(category => {
        const responses = this.state.responses.part1[neurotransmitter][category];
        if (responses) {
          Object.values(responses).forEach(response => {
            if (response === true) {
              this.state.scores.part1[neurotransmitter]++;
            }
          });
        }
      });
    });
    
    // Calculate Part 2 scores (Deficiencies)
    ['dopamine', 'acetylcholine', 'gaba', 'serotonin'].forEach(neurotransmitter => {
      ['memoryAttention', 'physical', 'personality', 'character'].forEach(category => {
        const responses = this.state.responses.part2[neurotransmitter][category];
        if (responses) {
          Object.values(responses).forEach(response => {
            if (response === true) {
              this.state.scores.part2[neurotransmitter]++;
            }
          });
        }
      });
    });
    
    // Save scores to local storage
    this.saveResponses();
    
    // Dispatch scores calculated event
    this.dispatchEvent('scoresCalculated', this.state.scores);
    
    return this.state.scores;
  }
  
  // Render results
  renderResults() {
    // Update user info
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      userInfoElement.innerHTML = `
        <h3>${this.state.userName}</h3>
        <p>${formattedDate}</p>
      `;
    }
    
    // Dispatch results rendered event
    this.dispatchEvent('resultsRendered', {
      userName: this.state.userName,
      scores: this.state.scores
    });
  }
  
  // Save responses to local storage
  saveResponses() {
    try {
      const userData = {
        userName: this.state.userName,
        responses: this.state.responses,
        scores: this.state.scores,
        sectionProgress: this.state.sectionProgress,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('neuroTransmitterData', JSON.stringify(userData));
      
      // Dispatch save event
      this.dispatchEvent('dataSaved', userData);
      
      return true;
    } catch (error) {
      console.error('Error saving responses:', error);
      return false;
    }
  }
  
  // Load responses from local storage
  loadResponses() {
    try {
      const savedData = localStorage.getItem('neuroTransmitterData');
      
      if (savedData) {
        const userData = JSON.parse(savedData);
        
        if (userData.userName) this.state.userName = userData.userName;
        if (userData.responses) this.state.responses = userData.responses;
        if (userData.scores) this.state.scores = userData.scores;
        if (userData.sectionProgress) this.state.sectionProgress = userData.sectionProgress;
        
        // Dispatch load event
        this.dispatchEvent('dataLoaded', userData);
        
        return true;
      }
    } catch (error) {
      console.error('Error loading responses:', error);
    }
    
    return false;
  }
  
  // Clear all responses and reset the questionnaire
  resetQuestionnaire() {
    // Reset state
    this.state = {
      currentSection: 'welcome',
      userName: '',
      responses: {
        part1: {
          dopamine: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          acetylcholine: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          gaba: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          serotonin: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          }
        },
        part2: {
          dopamine: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          acetylcholine: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          gaba: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          },
          serotonin: {
            memoryAttention: {},
            physical: {},
            personality: {},
            character: {}
          }
        }
      },
      scores: {
        part1: {
          dopamine: 0,
          acetylcholine: 0,
          gaba: 0,
          serotonin: 0
        },
        part2: {
          dopamine: 0,
          acetylcholine: 0,
          gaba: 0,
          serotonin: 0
        }
      },
      sectionProgress: {
        'welcome': true,
        'part1-intro': false,
        'part1-dopamine': false,
        'part1-acetylcholine': false,
        'part1-gaba': false,
        'part1-serotonin': false,
        'part1-break': false,
        'part2-intro': false,
        'part2-dopamine': false,
        'part2-acetylcholine': false,
        'part2-gaba': false,
        'part2-serotonin': false,
        'results': false
      }
    };
    
    // Clear local storage
    localStorage.removeItem('neuroTransmitterData');
    
    // Re-render all questions
    this.renderAllQuestions();
    
    // Navigate to welcome section
    this.navigateTo('welcome');
    
    // Dispatch reset event
    this.dispatchEvent('questionnaireReset', {});
    
    return true;
  }
  
  // Event handling
  addEventListener(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    
    this.eventListeners[event].push(callback);
  }
  
  removeEventListener(event, callback) {
    if (!this.eventListeners[event]) return;
    
    this.eventListeners[event] = this.eventListeners[event].filter(
      listener => listener !== callback
    );
  }
  
  dispatchEvent(event, data) {
    if (!this.eventListeners[event]) return;
    
    this.eventListeners[event].forEach(callback => {
      callback(data);
    });
  }
}

// Create and export the questionnaire controller
const questionnaireController = new QuestionnaireController();

// Initialize the questionnaire when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  questionnaireController.initialize();
});

export default questionnaireController;
