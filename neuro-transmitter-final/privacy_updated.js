/**
 * Privacy and Data Storage Module for Neuro-Transmitter Questionnaire
 * 
 * This module handles all data privacy, local storage, and user consent
 * functionality to ensure complete client-side processing with no server
 * transmission.
 */

// Privacy Manager Class
class PrivacyManager {
  constructor() {
    this.consentGiven = false;
    this.storageAvailable = this.isStorageAvailable('localStorage');
    this.privacySettings = {
      allowLocalStorage: false,
      allowExport: true,
      autoSave: false
    };
  }
  
  // Initialize privacy manager
  initialize() {
    console.log('Initializing privacy manager');
    
    // Check if storage is available
    if (!this.storageAvailable) {
      console.warn('Local storage is not available in this browser');
      this.showStorageWarning();
    }
    
    // Check for existing consent
    this.checkExistingConsent();
    
    // Set up privacy controls
    this.setupPrivacyControls();
    
    // Add privacy policy to page
    this.addPrivacyPolicy();
  }
  
  // Check if storage type is available
  isStorageAvailable(type) {
    try {
      const storage = window[type];
      const testKey = '__storage_test__';
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  // Show warning if storage is not available
  showStorageWarning() {
    const warningElement = document.createElement('div');
    warningElement.className = 'storage-warning';
    warningElement.innerHTML = `
      <p><strong>Warning:</strong> Local storage is not available in your browser. 
      Your responses will not be saved if you close or refresh the page. 
      Please consider using a different browser or enabling cookies.</p>
    `;
    
    // Add to page
    const welcomeSection = document.getElementById('welcome');
    if (welcomeSection) {
      welcomeSection.prepend(warningElement);
    }
    
    // Add styles
    const warningStyles = document.createElement('style');
    warningStyles.textContent = `
      .storage-warning {
        background-color: rgba(224, 122, 95, 0.1);
        border-left: 4px solid rgba(224, 122, 95, 0.7);
        padding: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
        border-radius: var(--border-radius-md);
      }
    `;
    document.head.appendChild(warningStyles);
  }
  
  // Check for existing consent
  checkExistingConsent() {
    if (this.storageAvailable) {
      const savedConsent = localStorage.getItem('neuroTransmitterConsent');
      if (savedConsent) {
        try {
          const consentData = JSON.parse(savedConsent);
          this.consentGiven = consentData.consentGiven || false;
          this.privacySettings = {
            ...this.privacySettings,
            ...consentData.settings
          };
        } catch (e) {
          console.error('Error parsing saved consent:', e);
          this.consentGiven = false;
        }
      }
    }
  }
  
  // Set up privacy controls
  setupPrivacyControls() {
    // Add consent dialog to welcome section
    const welcomeSection = document.getElementById('welcome');
    if (welcomeSection) {
      const consentElement = document.createElement('div');
      consentElement.className = 'consent-container';
      consentElement.innerHTML = `
        <div class="consent-box">
          <h3>Privacy Settings</h3>
          <p>This assessment processes all data locally in your browser. No data is sent to any server.</p>
          
          <div class="consent-option">
            <input type="checkbox" id="allow-storage" ${this.privacySettings.allowLocalStorage ? 'checked' : ''}>
            <label for="allow-storage">Allow local storage of responses in your browser</label>
            <p class="consent-description">This allows you to close the browser and return to the assessment later without losing your progress.</p>
          </div>
          
          <div class="consent-option">
            <input type="checkbox" id="auto-save" ${this.privacySettings.autoSave ? 'checked' : ''} ${!this.privacySettings.allowLocalStorage ? 'disabled' : ''}>
            <label for="auto-save">Automatically save progress</label>
            <p class="consent-description">Automatically save your responses as you progress through the assessment.</p>
          </div>
          
          <div class="consent-option">
            <input type="checkbox" id="allow-export" ${this.privacySettings.allowExport ? 'checked' : ''}>
            <label for="allow-export">Allow export of results</label>
            <p class="consent-description">Enable options to save, print, or download your results.</p>
          </div>
          
          <div class="consent-buttons">
            <button id="save-privacy-settings" class="btn">Save Privacy Settings</button>
          </div>
        </div>
      `;
      
      // Insert before name input
      const nameInput = welcomeSection.querySelector('.name-input-container');
      if (nameInput) {
        nameInput.before(consentElement);
      } else {
        welcomeSection.appendChild(consentElement);
      }
      
      // Add event listeners
      document.getElementById('allow-storage').addEventListener('change', (e) => {
        this.privacySettings.allowLocalStorage = e.target.checked;
        
        // Update auto-save checkbox
        const autoSaveCheckbox = document.getElementById('auto-save');
        if (autoSaveCheckbox) {
          autoSaveCheckbox.disabled = !e.target.checked;
          if (!e.target.checked) {
            autoSaveCheckbox.checked = false;
            this.privacySettings.autoSave = false;
          }
        }
      });
      
      document.getElementById('auto-save').addEventListener('change', (e) => {
        this.privacySettings.autoSave = e.target.checked;
      });
      
      document.getElementById('allow-export').addEventListener('change', (e) => {
        this.privacySettings.allowExport = e.target.checked;
      });
      
      document.getElementById('save-privacy-settings').addEventListener('click', () => {
        this.saveConsent();
        
        // Show confirmation
        const confirmationElement = document.createElement('div');
        confirmationElement.className = 'consent-confirmation';
        confirmationElement.textContent = 'Privacy settings saved successfully!';
        
        const consentBox = document.querySelector('.consent-box');
        consentBox.appendChild(confirmationElement);
        
        // Remove confirmation after 3 seconds
        setTimeout(() => {
          confirmationElement.remove();
        }, 3000);
      });
    }
    
    // Add styles for consent dialog
    const consentStyles = document.createElement('style');
    consentStyles.textContent = `
      .consent-container {
        margin: var(--spacing-xl) 0;
      }
      
      .consent-box {
        background-color: white;
        border-radius: var(--border-radius-md);
        padding: var(--spacing-lg);
        box-shadow: 0 2px 8px var(--clr-shadow);
      }
      
      .consent-option {
        margin: var(--spacing-md) 0;
        display: flex;
        flex-direction: column;
      }
      
      .consent-option label {
        display: flex;
        align-items: center;
        font-weight: 500;
        margin-bottom: var(--spacing-xs);
      }
      
      .consent-option input[type="checkbox"] {
        margin-right: var(--spacing-sm);
        width: 18px;
        height: 18px;
      }
      
      .consent-description {
        margin-left: 24px;
        font-size: 0.9rem;
        color: var(--clr-text);
        opacity: 0.8;
      }
      
      .consent-buttons {
        margin-top: var(--spacing-lg);
        display: flex;
        justify-content: flex-end;
      }
      
      .consent-confirmation {
        margin-top: var(--spacing-md);
        padding: var(--spacing-sm);
        background-color: rgba(107, 144, 128, 0.1);
        border-left: 4px solid rgba(107, 144, 128, 0.7);
        border-radius: var(--border-radius-sm);
        text-align: center;
        font-weight: 500;
        color: var(--clr-true);
      }
    `;
    document.head.appendChild(consentStyles);
  }
  
  // Add privacy policy to page
  addPrivacyPolicy() {
    // Create privacy policy modal
    const modalElement = document.createElement('div');
    modalElement.className = 'privacy-modal';
    modalElement.id = 'privacy-modal';
    modalElement.innerHTML = `
      <div class="privacy-modal-content">
        <span class="privacy-modal-close">&times;</span>
        <h2>Privacy Policy</h2>
        
        <div class="privacy-section">
          <h3>Data Processing</h3>
          <p>This Neuro-Transmitter Questionnaire application processes all data locally in your browser. No data is transmitted to any external servers.</p>
          <p>Your responses, scores, and results are processed entirely client-side using JavaScript running in your web browser.</p>
        </div>
        
        <div class="privacy-section">
          <h3>Data Storage</h3>
          <p>If you consent to local storage, your responses and progress will be saved in your browser's localStorage. This data remains on your device and is not accessible to anyone else.</p>
          <p>You can clear this data at any time by:</p>
          <ul>
            <li>Using the "Reset Assessment" button</li>
            <li>Clearing your browser's localStorage through browser settings</li>
          </ul>
        </div>
        
        <div class="privacy-section">
          <h3>Data Export</h3>
          <p>If you choose to export your results (PDF or DOCX), the files are generated locally in your browser and saved directly to your device. No data is uploaded to any server during this process.</p>
        </div>
        
        <div class="privacy-section">
          <h3>Cookies</h3>
          <p>This application does not use cookies or any other tracking technologies.</p>
        </div>
        
        <div class="privacy-section">
          <h3>Third-Party Access</h3>
          <p>Since all data remains on your device, no third parties have access to your assessment data unless you choose to share exported results.</p>
        </div>
      </div>
    `;
    
    // Add to page
    document.body.appendChild(modalElement);
    
    // Add privacy policy link to footer
    const footer = document.querySelector('footer');
    if (footer) {
      const privacyLink = document.createElement('p');
      privacyLink.innerHTML = '<a href="#" id="privacy-policy-link">Privacy Policy</a>';
      footer.querySelector('.container').appendChild(privacyLink);
      
      // Add event listener
      document.getElementById('privacy-policy-link').addEventListener('click', (e) => {
        e.preventDefault();
        this.showPrivacyPolicy();
      });
    }
    
    // Add close button event listener
    const closeButton = document.querySelector('.privacy-modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.hidePrivacyPolicy();
      });
    }
    
    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
      const modal = document.getElementById('privacy-modal');
      if (e.target === modal) {
        this.hidePrivacyPolicy();
      }
    });
    
    // Add styles for privacy policy modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
      .privacy-modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        overflow: auto;
      }
      
      .privacy-modal-content {
        background-color: white;
        margin: 5% auto;
        padding: var(--spacing-xl);
        border-radius: var(--border-radius-md);
        width: 80%;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
      }
      
      .privacy-modal-close {
        position: absolute;
        top: var(--spacing-md);
        right: var(--spacing-md);
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--clr-text);
        cursor: pointer;
      }
      
      .privacy-section {
        margin-bottom: var(--spacing-lg);
      }
      
      .privacy-section h3 {
        margin-bottom: var(--spacing-sm);
        color: var(--clr-header);
      }
      
      .privacy-section ul {
        margin-left: var(--spacing-lg);
      }
      
      #privacy-policy-link {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: underline;
      }
      
      #privacy-policy-link:hover {
        color: white;
      }
    `;
    document.head.appendChild(modalStyles);
  }
  
  // Show privacy policy modal
  showPrivacyPolicy() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  // Hide privacy policy modal
  hidePrivacyPolicy() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
  // Save consent to localStorage
  saveConsent() {
    this.consentGiven = true;
    
    if (this.storageAvailable && this.privacySettings.allowLocalStorage) {
      const consentData = {
        consentGiven: true,
        settings: this.privacySettings,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('neuroTransmitterConsent', JSON.stringify(consentData));
    }
    
    // Dispatch consent event
    this.dispatchConsentEvent();
  }
  
  // Dispatch consent event
  dispatchConsentEvent() {
    const consentEvent = new CustomEvent('privacyConsentUpdated', {
      detail: {
        consentGiven: this.consentGiven,
        settings: this.privacySettings
      }
    });
    
    document.dispatchEvent(consentEvent);
  }
  
  // Check if storage is allowed
  canUseStorage() {
    return this.storageAvailable && this.privacySettings.allowLocalStorage;
  }
  
  // Check if auto-save is enabled
  isAutoSaveEnabled() {
    return this.canUseStorage() && this.privacySettings.autoSave;
  }
  
  // Check if export is allowed
  canExportResults() {
    return this.privacySettings.allowExport;
  }
  
  // Save data to localStorage
  saveData(key, data) {
    if (!this.canUseStorage()) {
      console.warn('Cannot save data: storage not available or not allowed');
      return false;
    }
    
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error saving data:', e);
      return false;
    }
  }
  
  // Load data from localStorage
  loadData(key) {
    if (!this.canUseStorage()) {
      console.warn('Cannot load data: storage not available or not allowed');
      return null;
    }
    
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error loading data:', e);
      return null;
    }
  }
  
  // Clear data from localStorage
  clearData(key) {
    if (!this.canUseStorage()) {
      console.warn('Cannot clear data: storage not available or not allowed');
      return false;
    }
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error clearing data:', e);
      return false;
    }
  }
  
  // Clear all assessment data
  clearAllData() {
    if (!this.canUseStorage()) {
      console.warn('Cannot clear data: storage not available or not allowed');
      return false;
    }
    
    try {
      // Keep consent settings
      const consentData = localStorage.getItem('neuroTransmitterConsent');
      
      // Clear assessment data
      localStorage.removeItem('neuroTransmitterData');
      
      // Restore consent settings
      if (consentData) {
        localStorage.setItem('neuroTransmitterConsent', consentData);
      }
      
      return true;
    } catch (e) {
      console.error('Error clearing all data:', e);
      return false;
    }
  }
}

// Create and export privacy manager
const privacyManager = new PrivacyManager();

// Initialize privacy manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  privacyManager.initialize();
});

export default privacyManager;
