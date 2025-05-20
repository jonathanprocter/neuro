/**
 * Export Module for Neuro-Transmitter Questionnaire
 * 
 * This module handles exporting assessment results to PDF and DOCX formats
 * with client name and date included.
 */

// Import privacy manager to check export permissions
import privacyManager from './privacy_updated.js';

// Export Manager Class
class ExportManager {
  constructor() {
    this.initialized = false;
    this.userName = '';
    this.assessmentDate = new Date();
    this.scores = null;
  }
  
  // Initialize export manager
  async initialize() {
    console.log('Initializing export manager');
    
    // Load required libraries
    await this.loadDependencies();
    
    // Set up export buttons
    this.setupExportButtons();
    
    this.initialized = true;
  }
  
  // Load required dependencies
  async loadDependencies() {
    // Load docx library
    await this.loadScript('https://unpkg.com/docx@7.1.0/build/index.js');
    
    // Load FileSaver library
    await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js');
    
    // Load html2canvas for PDF generation
    await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    
    // Load jsPDF for PDF generation
    await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
  }
  
  // Load script asynchronously
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  // Set up export buttons
  setupExportButtons() {
    // PDF export button
    const pdfButton = document.getElementById('export-pdf');
    if (pdfButton) {
      pdfButton.addEventListener('click', () => {
        this.exportToPDF();
      });
    }
    
    // DOCX export button
    const docxButton = document.getElementById('export-docx');
    if (docxButton) {
      docxButton.addEventListener('click', () => {
        this.exportToDOCX();
      });
    }
    
    // Print button
    const printButton = document.getElementById('print-results');
    if (printButton) {
      printButton.addEventListener('click', () => {
        this.printResults();
      });
    }
  }
  
  // Update user information
  updateUserInfo(userName, scores) {
    this.userName = userName || 'Client';
    this.assessmentDate = new Date();
    this.scores = scores;
  }
  
  // Export results to PDF
  async exportToPDF() {
    // Check if export is allowed
    if (!privacyManager.canExportResults()) {
      this.showExportError('Export is not enabled in privacy settings.');
      return;
    }
    
    // Check if jsPDF is loaded
    if (!window.jspdf || !window.html2canvas) {
      this.showExportError('PDF export libraries not loaded. Please try again.');
      return;
    }
    
    try {
      // Show loading indicator
      this.showLoadingIndicator('Generating PDF...');
      
      // Get results container
      const resultsContainer = document.getElementById('results-container');
      if (!resultsContainer) {
        throw new Error('Results container not found');
      }
      
      // Create a clone of the results container for export
      const exportContainer = resultsContainer.cloneNode(true);
      exportContainer.style.width = '800px';
      exportContainer.style.padding = '20px';
      exportContainer.style.backgroundColor = 'white';
      
      // Add export header with name and date
      const exportHeader = document.createElement('div');
      exportHeader.className = 'export-header';
      exportHeader.innerHTML = `
        <h2>Neuro-Transmitter Questionnaire Results</h2>
        <div class="export-user-info">
          <p><strong>Client:</strong> ${this.userName}</p>
          <p><strong>Date:</strong> ${this.assessmentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>
      `;
      
      // Insert header at the beginning
      exportContainer.insertBefore(exportHeader, exportContainer.firstChild);
      
      // Temporarily append to document for rendering
      exportContainer.style.position = 'absolute';
      exportContainer.style.left = '-9999px';
      document.body.appendChild(exportContainer);
      
      // Create PDF
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Render each page
      const pageHeight = 287; // A4 height in mm (297mm) minus margins
      let currentY = 0;
      let pageNumber = 1;
      
      // Get all direct children of export container
      const elements = Array.from(exportContainer.children);
      
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        
        // Render element to canvas
        const canvas = await html2canvas(element, {
          scale: 2,
          logging: false,
          useCORS: true
        });
        
        // Convert canvas to image
        const imgData = canvas.toDataURL('image/png');
        
        // Calculate element height in mm
        const elementHeight = (canvas.height * 210) / (canvas.width * 1.5); // Scale to A4 width (210mm)
        
        // Check if element fits on current page
        if (currentY + elementHeight > pageHeight && i > 0) {
          // Add new page
          pdf.addPage();
          currentY = 0;
          pageNumber++;
        }
        
        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 10, currentY + 10, 190, elementHeight);
        currentY += elementHeight + 10;
        
        // Add page number
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Page ${pageNumber}`, 10, 287);
      }
      
      // Remove temporary container
      document.body.removeChild(exportContainer);
      
      // Save PDF
      const fileName = `${this.userName.replace(/\s+/g, '_')}_Neuro_Transmitter_Results_${this.formatDateForFileName(this.assessmentDate)}.pdf`;
      pdf.save(fileName);
      
      // Hide loading indicator
      this.hideLoadingIndicator();
      
      // Show success message
      this.showExportSuccess('PDF exported successfully!');
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      this.hideLoadingIndicator();
      this.showExportError('Error generating PDF. Please try again.');
    }
  }
  
  // Export results to DOCX
  async exportToDOCX() {
    // Check if export is allowed
    if (!privacyManager.canExportResults()) {
      this.showExportError('Export is not enabled in privacy settings.');
      return;
    }
    
    // Check if docx library is loaded
    if (!window.docx) {
      this.showExportError('DOCX export library not loaded. Please try again.');
      return;
    }
    
    try {
      // Show loading indicator
      this.showLoadingIndicator('Generating DOCX...');
      
      // Get results data
      const interpretationElement = document.getElementById('interpretation');
      if (!interpretationElement) {
        throw new Error('Interpretation element not found');
      }
      
      const interpretationText = interpretationElement.innerText || interpretationElement.textContent;
      
      // Create DOCX document
      const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, BorderStyle } = window.docx;
      
      // Create document
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Title
            new Paragraph({
              text: 'Neuro-Transmitter Questionnaire Results',
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 200
              }
            }),
            
            // Client info
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Client: ',
                  bold: true
                }),
                new TextRun(this.userName)
              ],
              spacing: {
                after: 100
              }
            }),
            
            // Date
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Date: ',
                  bold: true
                }),
                new TextRun(this.assessmentDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }))
              ],
              spacing: {
                after: 400
              }
            }),
            
            // Scores table
            new Paragraph({
              text: 'Assessment Scores',
              heading: HeadingLevel.HEADING_2,
              spacing: {
                after: 200
              }
            }),
            
            // Create scores table
            this.createScoresTable(Table, TableRow, TableCell, TextRun, BorderStyle),
            
            // Interpretation
            new Paragraph({
              text: 'Clinical Interpretation',
              heading: HeadingLevel.HEADING_2,
              spacing: {
                before: 400,
                after: 200
              }
            }),
            
            // Add interpretation paragraphs
            ...this.createInterpretationParagraphs(interpretationText, Paragraph, TextRun)
          ]
        }]
      });
      
      // Generate DOCX
      const blob = await doc.save();
      
      // Save file
      const fileName = `${this.userName.replace(/\s+/g, '_')}_Neuro_Transmitter_Results_${this.formatDateForFileName(this.assessmentDate)}.docx`;
      saveAs(blob, fileName);
      
      // Hide loading indicator
      this.hideLoadingIndicator();
      
      // Show success message
      this.showExportSuccess('DOCX exported successfully!');
    } catch (error) {
      console.error('Error exporting to DOCX:', error);
      this.hideLoadingIndicator();
      this.showExportError('Error generating DOCX. Please try again.');
    }
  }
  
  // Create scores table for DOCX
  createScoresTable(Table, TableRow, TableCell, TextRun, BorderStyle) {
    if (!this.scores) return new Paragraph('');
    
    // Create table
    return new Table({
      width: {
        size: 100,
        type: 'pct'
      },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
        left: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
        right: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: '888888' }
      },
      rows: [
        // Header row
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Neurotransmitter')],
              shading: {
                fill: 'F2F2F2'
              }
            }),
            new TableCell({
              children: [new Paragraph('Dominant Nature')],
              shading: {
                fill: 'F2F2F2'
              }
            }),
            new TableCell({
              children: [new Paragraph('Deficiency')],
              shading: {
                fill: 'F2F2F2'
              }
            })
          ]
        }),
        
        // Dopamine row
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Dopamine')]
            }),
            new TableCell({
              children: [new Paragraph(this.scores.part1.dopamine.toString())]
            }),
            new TableCell({
              children: [new Paragraph(this.scores.part2.dopamine.toString())]
            })
          ]
        }),
        
        // Acetylcholine row
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Acetylcholine')]
            }),
            new TableCell({
              children: [new Paragraph(this.scores.part1.acetylcholine.toString())]
            }),
            new TableCell({
              children: [new Paragraph(this.scores.part2.acetylcholine.toString())]
            })
          ]
        }),
        
        // GABA row
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('GABA')]
            }),
            new TableCell({
              children: [new Paragraph(this.scores.part1.gaba.toString())]
            }),
            new TableCell({
              children: [new Paragraph(this.scores.part2.gaba.toString())]
            })
          ]
        }),
        
        // Serotonin row
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Serotonin')]
            }),
            new TableCell({
              children: [new Paragraph(this.scores.part1.serotonin.toString())]
            }),
            new TableCell({
              children: [new Paragraph(this.scores.part2.serotonin.toString())]
            })
          ]
        })
      ]
    });
  }
  
  // Create interpretation paragraphs for DOCX
  createInterpretationParagraphs(interpretationText, Paragraph, TextRun) {
    // Split text into paragraphs
    const paragraphs = interpretationText.split('\n\n').filter(p => p.trim());
    
    // Convert to DOCX paragraphs
    return paragraphs.map(text => {
      // Check if it's a heading
      if (text.startsWith('Clinical Summary') || 
          text.startsWith('Dominant Neurotransmitter') ||
          text.startsWith('Neurotransmitter Deficiency') ||
          text.startsWith('Pattern Analysis') ||
          text.startsWith('Clinical Considerations') ||
          text.startsWith('Prescribing Implications') ||
          text.startsWith('Clinical Disclaimer')) {
        return new Paragraph({
          text: text,
          heading: HeadingLevel.HEADING_3,
          spacing: {
            before: 300,
            after: 100
          }
        });
      }
      
      // Regular paragraph
      return new Paragraph({
        text: text,
        spacing: {
          after: 100
        }
      });
    });
  }
  
  // Print results
  printResults() {
    // Check if export is allowed
    if (!privacyManager.canExportResults()) {
      this.showExportError('Export is not enabled in privacy settings.');
      return;
    }
    
    // Open print dialog
    window.print();
  }
  
  // Show loading indicator
  showLoadingIndicator(message) {
    // Create loading indicator if it doesn't exist
    let loadingIndicator = document.getElementById('export-loading');
    
    if (!loadingIndicator) {
      loadingIndicator = document.createElement('div');
      loadingIndicator.id = 'export-loading';
      loadingIndicator.className = 'export-loading';
      loadingIndicator.innerHTML = `
        <div class="export-loading-content">
          <div class="export-loading-spinner"></div>
          <div class="export-loading-message"></div>
        </div>
      `;
      document.body.appendChild(loadingIndicator);
      
      // Add styles
      const loadingStyles = document.createElement('style');
      loadingStyles.textContent = `
        .export-loading {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        
        .export-loading-content {
          background-color: white;
          padding: var(--spacing-lg);
          border-radius: var(--border-radius-md);
          box-shadow: 0 2px 8px var(--clr-shadow);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .export-loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(193, 166, 123, 0.3);
          border-top: 4px solid var(--clr-accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: var(--spacing-md);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .export-loading-message {
          font-weight: 500;
        }
      `;
      document.head.appendChild(loadingStyles);
    }
    
    // Update message
    const messageElement = loadingIndicator.querySelector('.export-loading-message');
    if (messageElement) {
      messageElement.textContent = message || 'Loading...';
    }
    
    // Show loading indicator
    loadingIndicator.style.display = 'flex';
  }
  
  // Hide loading indicator
  hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('export-loading');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
  }
  
  // Show export error
  showExportError(message) {
    this.showExportNotification(message, 'error');
  }
  
  // Show export success
  showExportSuccess(message) {
    this.showExportNotification(message, 'success');
  }
  
  // Show export notification
  showExportNotification(message, type) {
    // Create notification if it doesn't exist
    let notification = document.getElementById('export-notification');
    
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'export-notification';
      notification.className = 'export-notification';
      document.body.appendChild(notification);
      
      // Add styles
      const notificationStyles = document.createElement('style');
      notificationStyles.textContent = `
        .export-notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: var(--spacing-md) var(--spacing-lg);
          border-radius: var(--border-radius-md);
          box-shadow: 0 2px 8px var(--clr-shadow);
          font-weight: 500;
          z-index: 9999;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .export-notification.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        .export-notification.success {
          background-color: rgba(107, 144, 128, 0.9);
          color: white;
        }
        
        .export-notification.error {
          background-color: rgba(224, 122, 95, 0.9);
          color: white;
        }
      `;
      document.head.appendChild(notificationStyles);
    }
    
    // Update notification
    notification.textContent = message;
    notification.className = `export-notification ${type}`;
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
  
  // Format date for file name
  formatDateForFileName(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

// Create and export export manager
const exportManager = new ExportManager();

// Initialize export manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  exportManager.initialize();
});

export default exportManager;
