/**
 * Validation Module for Neuro-Transmitter Questionnaire
 * 
 * This module performs comprehensive validation of the application
 * to ensure all features are functioning correctly before deployment.
 */

// Validation Manager Class
class ValidationManager {
  constructor() {
    this.validationResults = {
      questionnaire: {
        complete: false,
        issues: []
      },
      navigation: {
        complete: false,
        issues: []
      },
      visualization: {
        complete: false,
        issues: []
      },
      interpretation: {
        complete: false,
        issues: []
      },
      privacy: {
        complete: false,
        issues: []
      },
      export: {
        complete: false,
        issues: []
      },
      design: {
        complete: false,
        issues: []
      },
      responsive: {
        complete: false,
        issues: []
      }
    };
  }
  
  // Run all validation checks
  async validateAll() {
    console.log('Running comprehensive validation...');
    
    // Validate questionnaire completeness
    await this.validateQuestionnaire();
    
    // Validate navigation
    await this.validateNavigation();
    
    // Validate visualizations
    await this.validateVisualizations();
    
    // Validate interpretation
    await this.validateInterpretation();
    
    // Validate privacy
    await this.validatePrivacy();
    
    // Validate export
    await this.validateExport();
    
    // Validate design
    await this.validateDesign();
    
    // Validate responsive design
    await this.validateResponsive();
    
    // Return validation results
    return this.validationResults;
  }
  
  // Validate questionnaire completeness
  async validateQuestionnaire() {
    console.log('Validating questionnaire completeness...');
    
    const issues = [];
    
    // Check Part 1 sections
    const part1Sections = [
      { id: 'part1-dopamine', name: 'Part 1 Dopamine' },
      { id: 'part1-acetylcholine', name: 'Part 1 Acetylcholine' },
      { id: 'part1-gaba', name: 'Part 1 GABA' },
      { id: 'part1-serotonin', name: 'Part 1 Serotonin' }
    ];
    
    for (const section of part1Sections) {
      const sectionElement = document.getElementById(section.id);
      if (!sectionElement) {
        issues.push(`Section ${section.name} not found in DOM`);
        continue;
      }
      
      // Check for question groups
      const questionGroups = sectionElement.querySelectorAll('.question-group');
      if (questionGroups.length === 0) {
        issues.push(`No questions found in ${section.name}`);
      }
    }
    
    // Check Part 2 sections
    const part2Sections = [
      { id: 'part2-dopamine', name: 'Part 2 Dopamine' },
      { id: 'part2-acetylcholine', name: 'Part 2 Acetylcholine' },
      { id: 'part2-gaba', name: 'Part 2 GABA' },
      { id: 'part2-serotonin', name: 'Part 2 Serotonin' }
    ];
    
    for (const section of part2Sections) {
      const sectionElement = document.getElementById(section.id);
      if (!sectionElement) {
        issues.push(`Section ${section.name} not found in DOM`);
        continue;
      }
      
      // Check for question groups
      const questionGroups = sectionElement.querySelectorAll('.question-group');
      if (questionGroups.length === 0) {
        issues.push(`No questions found in ${section.name}`);
      }
    }
    
    // Check for educational disclaimers
    const disclaimerCheck = document.body.innerText.includes('educational purposes only');
    if (disclaimerCheck) {
      issues.push('Educational disclaimer text found in the application');
    }
    
    // Update validation results
    this.validationResults.questionnaire.issues = issues;
    this.validationResults.questionnaire.complete = issues.length === 0;
    
    return this.validationResults.questionnaire;
  }
  
  // Validate navigation
  async validateNavigation() {
    console.log('Validating navigation...');
    
    const issues = [];
    
    // Check navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length === 0) {
      issues.push('No navigation links found');
    }
    
    // Check section navigation buttons
    const navButtons = document.querySelectorAll('.section-nav .btn');
    if (navButtons.length === 0) {
      issues.push('No section navigation buttons found');
    }
    
    // Check progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
      issues.push('Progress bar not found');
    }
    
    // Check welcome section
    const welcomeSection = document.getElementById('welcome');
    if (!welcomeSection) {
      issues.push('Welcome section not found');
    }
    
    // Check results section
    const resultsSection = document.getElementById('results');
    if (!resultsSection) {
      issues.push('Results section not found');
    }
    
    // Update validation results
    this.validationResults.navigation.issues = issues;
    this.validationResults.navigation.complete = issues.length === 0;
    
    return this.validationResults.navigation;
  }
  
  // Validate visualizations
  async validateVisualizations() {
    console.log('Validating visualizations...');
    
    const issues = [];
    
    // Check radar chart
    const radarChart = document.getElementById('radar-chart');
    if (!radarChart) {
      issues.push('Radar chart not found');
    }
    
    // Check dominant chart
    const dominantChart = document.getElementById('dominant-chart');
    if (!dominantChart) {
      issues.push('Dominant nature chart not found');
    }
    
    // Check deficiency chart
    const deficiencyChart = document.getElementById('deficiency-chart');
    if (!deficiencyChart) {
      issues.push('Deficiency chart not found');
    }
    
    // Check heatmap
    const heatmap = document.getElementById('heatmap-container');
    if (!heatmap) {
      issues.push('Heatmap not found');
    }
    
    // Check Chart.js availability
    if (!window.Chart) {
      issues.push('Chart.js library not loaded');
    }
    
    // Update validation results
    this.validationResults.visualization.issues = issues;
    this.validationResults.visualization.complete = issues.length === 0;
    
    return this.validationResults.visualization;
  }
  
  // Validate interpretation
  async validateInterpretation() {
    console.log('Validating interpretation...');
    
    const issues = [];
    
    // Check interpretation container
    const interpretation = document.getElementById('interpretation');
    if (!interpretation) {
      issues.push('Interpretation container not found');
    }
    
    // Check for clinical language
    if (interpretation) {
      const text = interpretation.innerText || interpretation.textContent;
      
      if (!text.includes('Clinical')) {
        issues.push('Clinical context missing from interpretation');
      }
      
      if (!text.includes('Prescribing')) {
        issues.push('Prescribing implications missing from interpretation');
      }
    }
    
    // Update validation results
    this.validationResults.interpretation.issues = issues;
    this.validationResults.interpretation.complete = issues.length === 0;
    
    return this.validationResults.interpretation;
  }
  
  // Validate privacy
  async validatePrivacy() {
    console.log('Validating privacy...');
    
    const issues = [];
    
    // Check privacy settings
    const privacySettings = document.querySelector('.consent-container');
    if (!privacySettings) {
      issues.push('Privacy settings container not found');
    }
    
    // Check privacy policy
    const privacyPolicy = document.getElementById('privacy-modal');
    if (!privacyPolicy) {
      issues.push('Privacy policy modal not found');
    }
    
    // Check local storage functionality
    if (!window.localStorage) {
      issues.push('Local storage not available in this browser');
    }
    
    // Update validation results
    this.validationResults.privacy.issues = issues;
    this.validationResults.privacy.complete = issues.length === 0;
    
    return this.validationResults.privacy;
  }
  
  // Validate export
  async validateExport() {
    console.log('Validating export...');
    
    const issues = [];
    
    // Check export buttons
    const pdfButton = document.getElementById('export-pdf');
    if (!pdfButton) {
      issues.push('PDF export button not found');
    }
    
    const docxButton = document.getElementById('export-docx');
    if (!docxButton) {
      issues.push('DOCX export button not found');
    }
    
    const printButton = document.getElementById('print-results');
    if (!printButton) {
      issues.push('Print button not found');
    }
    
    // Check required libraries
    if (!window.jspdf) {
      issues.push('jsPDF library not loaded');
    }
    
    if (!window.html2canvas) {
      issues.push('html2canvas library not loaded');
    }
    
    if (!window.docx) {
      issues.push('docx library not loaded');
    }
    
    if (!window.saveAs) {
      issues.push('FileSaver library not loaded');
    }
    
    // Check user info display
    const userInfo = document.getElementById('user-info');
    if (!userInfo) {
      issues.push('User info container not found');
    }
    
    // Update validation results
    this.validationResults.export.issues = issues;
    this.validationResults.export.complete = issues.length === 0;
    
    return this.validationResults.export;
  }
  
  // Validate design
  async validateDesign() {
    console.log('Validating design...');
    
    const issues = [];
    
    // Check color palette
    const root = document.documentElement;
    const style = getComputedStyle(root);
    
    const requiredColors = [
      '--clr-header',
      '--clr-nav-bg',
      '--clr-main-bg',
      '--clr-footer',
      '--clr-text',
      '--clr-accent'
    ];
    
    for (const color of requiredColors) {
      if (!style.getPropertyValue(color)) {
        issues.push(`Color variable ${color} not defined`);
      }
    }
    
    // Check fonts
    const fontFamily = style.getPropertyValue('--font-primary');
    if (!fontFamily) {
      issues.push('Primary font not defined');
    }
    
    // Check spacing variables
    const spacingVariables = [
      '--spacing-xs',
      '--spacing-sm',
      '--spacing-md',
      '--spacing-lg',
      '--spacing-xl'
    ];
    
    for (const spacing of spacingVariables) {
      if (!style.getPropertyValue(spacing)) {
        issues.push(`Spacing variable ${spacing} not defined`);
      }
    }
    
    // Check zen-inspired elements
    const zenElements = document.querySelectorAll('.zen-decor, .breathing-circle');
    if (zenElements.length === 0) {
      issues.push('Zen-inspired decorative elements not found');
    }
    
    // Update validation results
    this.validationResults.design.issues = issues;
    this.validationResults.design.complete = issues.length === 0;
    
    return this.validationResults.design;
  }
  
  // Validate responsive design
  async validateResponsive() {
    console.log('Validating responsive design...');
    
    const issues = [];
    
    // Check viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      issues.push('Viewport meta tag not found');
    }
    
    // Check responsive media queries
    const styleSheets = document.styleSheets;
    let hasMediaQueries = false;
    
    for (const sheet of styleSheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        for (const rule of rules) {
          if (rule.type === CSSRule.MEDIA_RULE) {
            hasMediaQueries = true;
            break;
          }
        }
        if (hasMediaQueries) break;
      } catch (e) {
        // Cross-origin stylesheet, can't access rules
        continue;
      }
    }
    
    if (!hasMediaQueries) {
      issues.push('No responsive media queries found in stylesheets');
    }
    
    // Check flexible layouts
    const flexLayouts = document.querySelectorAll('.container, [class*="flex"]');
    if (flexLayouts.length === 0) {
      issues.push('No flexible layout containers found');
    }
    
    // Update validation results
    this.validationResults.responsive.issues = issues;
    this.validationResults.responsive.complete = issues.length === 0;
    
    return this.validationResults.responsive;
  }
  
  // Generate validation report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        passed: 0,
        failed: 0,
        total: 0
      },
      details: this.validationResults
    };
    
    // Calculate summary
    for (const category in this.validationResults) {
      report.summary.total++;
      if (this.validationResults[category].complete) {
        report.summary.passed++;
      } else {
        report.summary.failed++;
      }
    }
    
    // Add overall status
    report.status = report.summary.failed === 0 ? 'PASSED' : 'FAILED';
    
    return report;
  }
}

// Create and export validation manager
const validationManager = new ValidationManager();

// Export validation manager
export default validationManager;
