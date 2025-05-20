/**
 * Visualization Components for Neuro-Transmitter Questionnaire Results
 * 
 * This module implements the visualization components for displaying
 * assessment results, including radar charts, bar graphs, and heat maps.
 */

// Import Chart.js if needed
function ensureChartJsLoaded() {
  return new Promise((resolve, reject) => {
    if (window.Chart) {
      resolve(window.Chart);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
    script.integrity = 'sha256-+8RZJLOISfSdLSGSmKDovSI1d8yyYKSAHbdlvKwHq+8=';
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve(window.Chart);
    script.onerror = () => reject(new Error('Failed to load Chart.js'));
    document.head.appendChild(script);
  });
}

// Configure Chart.js defaults
function configureChartDefaults() {
  if (!window.Chart) return;
  
  // Set global defaults for all charts
  Chart.defaults.font.family = 'var(--font-primary)';
  Chart.defaults.color = 'var(--clr-text)';
  Chart.defaults.plugins.tooltip.backgroundColor = 'var(--clr-header)';
  Chart.defaults.plugins.legend.labels.boxWidth = 15;
  Chart.defaults.plugins.legend.labels.padding = 15;
  
  // Add responsive behavior
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;
  
  // Add animation defaults
  Chart.defaults.animation.duration = 1000;
  Chart.defaults.animation.easing = 'easeOutQuart';
}

// Radar Chart for Neurotransmitter Balance
class RadarChartVisualizer {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.chart = null;
  }
  
  async initialize() {
    await ensureChartJsLoaded();
    configureChartDefaults();
  }
  
  render(scores) {
    const canvas = document.getElementById(this.canvasId);
    if (!canvas || !window.Chart) return;
    
    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
    
    // Create radar chart
    this.chart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: ['Dopamine', 'Acetylcholine', 'GABA', 'Serotonin'],
        datasets: [
          {
            label: 'Dominant Nature',
            data: [
              scores.part1.dopamine,
              scores.part1.acetylcholine,
              scores.part1.gaba,
              scores.part1.serotonin
            ],
            backgroundColor: 'rgba(193, 166, 123, 0.2)',
            borderColor: 'rgba(193, 166, 123, 1)',
            pointBackgroundColor: 'rgba(193, 166, 123, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(193, 166, 123, 1)'
          },
          {
            label: 'Deficiencies',
            data: [
              scores.part2.dopamine,
              scores.part2.acetylcholine,
              scores.part2.gaba,
              scores.part2.serotonin
            ],
            backgroundColor: 'rgba(57, 91, 100, 0.2)',
            borderColor: 'rgba(57, 91, 100, 1)',
            pointBackgroundColor: 'rgba(57, 91, 100, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(57, 91, 100, 1)'
          }
        ]
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 40,
            ticks: {
              stepSize: 10
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
    
    return this.chart;
  }
}

// Bar Charts for Dominant Nature and Deficiencies
class BarChartVisualizer {
  constructor(dominantCanvasId, deficiencyCanvasId) {
    this.dominantCanvasId = dominantCanvasId;
    this.deficiencyCanvasId = deficiencyCanvasId;
    this.dominantChart = null;
    this.deficiencyChart = null;
  }
  
  async initialize() {
    await ensureChartJsLoaded();
    configureChartDefaults();
  }
  
  render(scores) {
    this.renderDominantChart(scores);
    this.renderDeficiencyChart(scores);
  }
  
  renderDominantChart(scores) {
    const canvas = document.getElementById(this.dominantCanvasId);
    if (!canvas || !window.Chart) return;
    
    // Destroy existing chart if it exists
    if (this.dominantChart) {
      this.dominantChart.destroy();
    }
    
    // Create bar chart
    this.dominantChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Dopamine', 'Acetylcholine', 'GABA', 'Serotonin'],
        datasets: [{
          label: 'Dominant Nature Scores',
          data: [
            scores.part1.dopamine,
            scores.part1.acetylcholine,
            scores.part1.gaba,
            scores.part1.serotonin
          ],
          backgroundColor: [
            'rgba(193, 166, 123, 0.7)',
            'rgba(193, 166, 123, 0.7)',
            'rgba(193, 166, 123, 0.7)',
            'rgba(193, 166, 123, 0.7)'
          ],
          borderColor: [
            'rgba(193, 166, 123, 1)',
            'rgba(193, 166, 123, 1)',
            'rgba(193, 166, 123, 1)',
            'rgba(193, 166, 123, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 40,
            ticks: {
              stepSize: 10
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                const value = context.raw || 0;
                return `Score: ${value}`;
              },
              afterLabel: function(context) {
                const value = context.raw || 0;
                if (value >= 35) {
                  return 'Classically dominant nature';
                } else if (value >= 25) {
                  return 'Moderately dominant nature';
                } else if (value >= 15) {
                  return 'Mildly dominant nature';
                } else {
                  return 'Not dominant';
                }
              }
            }
          }
        }
      }
    });
    
    return this.dominantChart;
  }
  
  renderDeficiencyChart(scores) {
    const canvas = document.getElementById(this.deficiencyCanvasId);
    if (!canvas || !window.Chart) return;
    
    // Destroy existing chart if it exists
    if (this.deficiencyChart) {
      this.deficiencyChart.destroy();
    }
    
    // Create bar chart
    this.deficiencyChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Dopamine', 'Acetylcholine', 'GABA', 'Serotonin'],
        datasets: [{
          label: 'Deficiency Scores',
          data: [
            scores.part2.dopamine,
            scores.part2.acetylcholine,
            scores.part2.gaba,
            scores.part2.serotonin
          ],
          backgroundColor: [
            'rgba(57, 91, 100, 0.7)',
            'rgba(57, 91, 100, 0.7)',
            'rgba(57, 91, 100, 0.7)',
            'rgba(57, 91, 100, 0.7)'
          ],
          borderColor: [
            'rgba(57, 91, 100, 1)',
            'rgba(57, 91, 100, 1)',
            'rgba(57, 91, 100, 1)',
            'rgba(57, 91, 100, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 28,
            ticks: {
              stepSize: 7
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                const value = context.raw || 0;
                return `Score: ${value}`;
              },
              afterLabel: function(context) {
                const value = context.raw || 0;
                if (value >= 20) {
                  return 'Significant deficiency';
                } else if (value >= 15) {
                  return 'Moderate deficiency';
                } else if (value >= 10) {
                  return 'Mild deficiency';
                } else {
                  return 'No significant deficiency';
                }
              }
            }
          }
        }
      }
    });
    
    return this.deficiencyChart;
  }
}

// Heat Map for Neurotransmitter Patterns
class HeatMapVisualizer {
  constructor(containerId) {
    this.containerId = containerId;
  }
  
  render(scores) {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create heatmap grid
    const heatmapGrid = document.createElement('div');
    heatmapGrid.className = 'heatmap-grid';
    
    // Add header row
    const headerRow = document.createElement('div');
    headerRow.className = 'heatmap-row';
    
    // Add empty cell for top-left corner
    const emptyCell = document.createElement('div');
    emptyCell.className = 'heatmap-cell heatmap-header';
    emptyCell.textContent = '';
    headerRow.appendChild(emptyCell);
    
    // Add neurotransmitter headers
    ['Dopamine', 'Acetylcholine', 'GABA', 'Serotonin'].forEach(nt => {
      const headerCell = document.createElement('div');
      headerCell.className = 'heatmap-cell heatmap-header';
      headerCell.textContent = nt;
      headerRow.appendChild(headerCell);
    });
    
    heatmapGrid.appendChild(headerRow);
    
    // Add dominant nature row
    const dominantRow = document.createElement('div');
    dominantRow.className = 'heatmap-row';
    
    // Add row label
    const dominantLabel = document.createElement('div');
    dominantLabel.className = 'heatmap-cell heatmap-label';
    dominantLabel.textContent = 'Dominant Nature';
    dominantRow.appendChild(dominantLabel);
    
    // Add dominant nature scores
    ['dopamine', 'acetylcholine', 'gaba', 'serotonin'].forEach(nt => {
      const score = scores.part1[nt];
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.textContent = score;
      
      // Add color based on score
      if (score >= 35) {
        cell.style.backgroundColor = 'rgba(107, 144, 128, 0.8)'; // Strong dominant
        cell.style.color = 'white';
      } else if (score >= 25) {
        cell.style.backgroundColor = 'rgba(107, 144, 128, 0.5)'; // Moderate dominant
      } else if (score >= 15) {
        cell.style.backgroundColor = 'rgba(107, 144, 128, 0.3)'; // Weak dominant
      }
      
      // Add tooltip
      cell.title = this.getDominantTooltip(score);
      
      dominantRow.appendChild(cell);
    });
    
    heatmapGrid.appendChild(dominantRow);
    
    // Add deficiency row
    const deficiencyRow = document.createElement('div');
    deficiencyRow.className = 'heatmap-row';
    
    // Add row label
    const deficiencyLabel = document.createElement('div');
    deficiencyLabel.className = 'heatmap-cell heatmap-label';
    deficiencyLabel.textContent = 'Deficiency';
    deficiencyRow.appendChild(deficiencyLabel);
    
    // Add deficiency scores
    ['dopamine', 'acetylcholine', 'gaba', 'serotonin'].forEach(nt => {
      const score = scores.part2[nt];
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.textContent = score;
      
      // Add color based on score
      if (score >= 20) {
        cell.style.backgroundColor = 'rgba(224, 122, 95, 0.8)'; // Strong deficiency
        cell.style.color = 'white';
      } else if (score >= 15) {
        cell.style.backgroundColor = 'rgba(224, 122, 95, 0.5)'; // Moderate deficiency
      } else if (score >= 10) {
        cell.style.backgroundColor = 'rgba(224, 122, 95, 0.3)'; // Weak deficiency
      }
      
      // Add tooltip
      cell.title = this.getDeficiencyTooltip(score);
      
      deficiencyRow.appendChild(cell);
    });
    
    heatmapGrid.appendChild(deficiencyRow);
    
    // Add gap analysis row
    const gapRow = document.createElement('div');
    gapRow.className = 'heatmap-row';
    
    // Add row label
    const gapLabel = document.createElement('div');
    gapLabel.className = 'heatmap-cell heatmap-label';
    gapLabel.textContent = 'Relative Gap';
    gapRow.appendChild(gapLabel);
    
    // Calculate and add gap scores
    ['dopamine', 'acetylcholine', 'gaba', 'serotonin'].forEach(nt => {
      const dominantScore = scores.part1[nt];
      const deficiencyScore = scores.part2[nt];
      
      // Calculate normalized gap (higher value means bigger gap)
      const normalizedGap = (deficiencyScore / 28) - (dominantScore / 40);
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      
      // Format gap as percentage
      const gapPercentage = Math.round(normalizedGap * 100);
      cell.textContent = `${gapPercentage}%`;
      
      // Add color based on gap
      if (gapPercentage >= 30) {
        cell.style.backgroundColor = 'rgba(224, 122, 95, 0.8)'; // Significant gap
        cell.style.color = 'white';
      } else if (gapPercentage >= 15) {
        cell.style.backgroundColor = 'rgba(224, 122, 95, 0.5)'; // Moderate gap
      } else if (gapPercentage >= 5) {
        cell.style.backgroundColor = 'rgba(224, 122, 95, 0.3)'; // Mild gap
      } else if (gapPercentage <= -30) {
        cell.style.backgroundColor = 'rgba(107, 144, 128, 0.8)'; // Significant strength
        cell.style.color = 'white';
      } else if (gapPercentage <= -15) {
        cell.style.backgroundColor = 'rgba(107, 144, 128, 0.5)'; // Moderate strength
      } else if (gapPercentage <= -5) {
        cell.style.backgroundColor = 'rgba(107, 144, 128, 0.3)'; // Mild strength
      }
      
      // Add tooltip
      cell.title = this.getGapTooltip(gapPercentage);
      
      gapRow.appendChild(cell);
    });
    
    heatmapGrid.appendChild(gapRow);
    
    // Add heatmap to container
    container.appendChild(heatmapGrid);
    
    // Add legend
    this.addHeatmapLegend(container);
  }
  
  getDominantTooltip(score) {
    if (score >= 35) {
      return 'Classically dominant nature (35+)';
    } else if (score >= 25) {
      return 'Moderately dominant nature (25-34)';
    } else if (score >= 15) {
      return 'Mildly dominant nature (15-24)';
    } else {
      return 'Not dominant (<15)';
    }
  }
  
  getDeficiencyTooltip(score) {
    if (score >= 20) {
      return 'Significant deficiency (20+)';
    } else if (score >= 15) {
      return 'Moderate deficiency (15-19)';
    } else if (score >= 10) {
      return 'Mild deficiency (10-14)';
    } else {
      return 'No significant deficiency (<10)';
    }
  }
  
  getGapTooltip(gapPercentage) {
    if (gapPercentage >= 30) {
      return 'Significant imbalance - deficiency much higher than dominance';
    } else if (gapPercentage >= 15) {
      return 'Moderate imbalance - deficiency higher than dominance';
    } else if (gapPercentage >= 5) {
      return 'Mild imbalance - slight deficiency relative to dominance';
    } else if (gapPercentage <= -30) {
      return 'Significant strength - dominance much higher than deficiency';
    } else if (gapPercentage <= -15) {
      return 'Moderate strength - dominance higher than deficiency';
    } else if (gapPercentage <= -5) {
      return 'Mild strength - slight dominance relative to deficiency';
    } else {
      return 'Balanced - similar levels of dominance and deficiency';
    }
  }
  
  addHeatmapLegend(container) {
    const legend = document.createElement('div');
    legend.className = 'heatmap-legend';
    
    legend.innerHTML = `
      <div class="legend-title">Legend</div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: rgba(107, 144, 128, 0.8);"></div>
        <div class="legend-label">Strong dominance/strength</div>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: rgba(107, 144, 128, 0.5);"></div>
        <div class="legend-label">Moderate dominance/strength</div>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: rgba(107, 144, 128, 0.3);"></div>
        <div class="legend-label">Mild dominance/strength</div>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: rgba(224, 122, 95, 0.3);"></div>
        <div class="legend-label">Mild deficiency/imbalance</div>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: rgba(224, 122, 95, 0.5);"></div>
        <div class="legend-label">Moderate deficiency/imbalance</div>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: rgba(224, 122, 95, 0.8);"></div>
        <div class="legend-label">Significant deficiency/imbalance</div>
      </div>
    `;
    
    // Add styles for legend
    const legendStyles = document.createElement('style');
    legendStyles.textContent = `
      .heatmap-legend {
        margin-top: var(--spacing-md);
        font-size: 0.9rem;
      }
      
      .legend-title {
        font-weight: bold;
        margin-bottom: var(--spacing-xs);
      }
      
      .legend-item {
        display: flex;
        align-items: center;
        margin-bottom: var(--spacing-xs);
      }
      
      .legend-color {
        width: 20px;
        height: 20px;
        margin-right: var(--spacing-sm);
        border-radius: var(--border-radius-sm);
      }
      
      @media (min-width: 768px) {
        .heatmap-legend {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-sm);
        }
        
        .legend-title {
          grid-column: 1 / -1;
        }
      }
    `;
    
    document.head.appendChild(legendStyles);
    
    container.appendChild(legend);
  }
}

// Main Visualization Manager
class VisualizationManager {
  constructor() {
    this.radarChart = new RadarChartVisualizer('radar-chart');
    this.barCharts = new BarChartVisualizer('dominant-chart', 'deficiency-chart');
    this.heatMap = new HeatMapVisualizer('heatmap-container');
    this.initialized = false;
  }
  
  async initialize() {
    await Promise.all([
      this.radarChart.initialize(),
      this.barCharts.initialize()
    ]);
    
    this.initialized = true;
  }
  
  async renderVisualizations(scores) {
    if (!this.initialized) {
      await this.initialize();
    }
    
    this.radarChart.render(scores);
    this.barCharts.render(scores);
    this.heatMap.render(scores);
  }
}

// Initialize visualization manager
const visualizationManager = new VisualizationManager();

// Export visualization manager
export default visualizationManager;
