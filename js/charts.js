// Chart.js helper functions for the Medical Prep Dashboard

let trendChartInstance = null;
let distributionChartInstance = null;
let comparisonChartInstance = null;

/**
 * Initializes or updates the Performance Trend Line Chart.
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Array} scores - Array of quiz attempt objects
 */
export function renderTrendChart(canvas, scores) {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Aggregate scores by date or just show last 10 attempts
  const recentAttempts = scores.slice(-10);
  const labels = recentAttempts.map((item, index) => {
    const date = new Date(item.date);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  });
  const dataPoints = recentAttempts.map(item => Math.round((item.correct / item.total) * 100));

  // If no data, show a dummy/placeholder line so the user can see what it will look like
  const displayLabels = labels.length > 0 ? labels : ["Jan", "Feb", "Mar", "Apr", "May"];
  const displayData = dataPoints.length > 0 ? dataPoints : [70, 78, 85, 82, 90];

  if (trendChartInstance) {
    trendChartInstance.destroy();
  }

  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: displayLabels,
      datasets: [{
        label: 'Overall Score (%)',
        data: displayData,
        borderColor: '#1565C0',
        backgroundColor: 'rgba(21, 101, 192, 0.1)',
        borderWidth: 3,
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#26A69A',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#1E293B',
          titleFont: { family: 'Inter', size: 12 },
          bodyFont: { family: 'Inter', size: 12 },
          callbacks: {
            label: function(context) {
              return `Score: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            color: '#64748B',
            font: { family: 'Inter', size: 10 }
          },
          grid: {
            color: 'rgba(226, 232, 240, 0.6)'
          }
        },
        x: {
          ticks: {
            color: '#64748B',
            font: { family: 'Inter', size: 10 }
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

/**
 * Initializes or updates the Question Distribution Pie Chart (Correct, Incorrect, Skipped).
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Array} scores - Array of quiz attempt objects
 */
export function renderDistributionChart(canvas, scores) {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let correct = 0;
  let incorrect = 0;
  let skipped = 0;

  scores.forEach(attempt => {
    correct += attempt.correct || 0;
    incorrect += attempt.incorrect || 0;
    skipped += attempt.skipped || 0;
  });

  // Default values for visual preview if there's no data
  const hasData = scores.length > 0;
  const chartData = hasData ? [correct, incorrect, skipped] : [15, 5, 2];

  if (distributionChartInstance) {
    distributionChartInstance.destroy();
  }

  distributionChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Correct', 'Incorrect', 'Skipped'],
      datasets: [{
        data: chartData,
        backgroundColor: [
          '#26A69A', // Correct - Teallish Accent
          '#EF5350', // Incorrect - soft red
          '#94A3B8'  // Skipped - Slate gray
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: 'Inter', size: 11, weight: '500' },
            color: '#475569',
            boxWidth: 12
          }
        },
        tooltip: {
          backgroundColor: '#1E293B',
          bodyFont: { family: 'Inter', size: 11 }
        }
      }
    }
  });
}

/**
 * Initializes or updates the Subject Comparison Bar Chart.
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Array} scores - Array of quiz attempt objects
 */
export function renderComparisonChart(canvas, scores) {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const subjects = ["Medicine", "Surgery", "Anatomy", "Pharmacology"];
  const subjectAverages = subjects.map(sub => {
    const subAttempts = scores.filter(a => a.subject === sub);
    if (subAttempts.length === 0) return 0;
    const sum = subAttempts.reduce((acc, curr) => acc + (curr.correct / curr.total), 0);
    return Math.round((sum / subAttempts.length) * 100);
  });

  // Default mock data if no real data is recorded yet
  const displayData = scores.length > 0 ? subjectAverages : [82, 75, 91, 0];

  if (comparisonChartInstance) {
    comparisonChartInstance.destroy();
  }

  comparisonChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: subjects,
      datasets: [{
        label: 'Average Score (%)',
        data: displayData,
        backgroundColor: [
          '#1565C0', // Medicine - deep blue
          '#5C6BC0', // Surgery - indigo
          '#26A69A', // Anatomy - teal
          '#AB47BC'  // Pharmacology - purple
        ],
        borderRadius: 6,
        borderWidth: 0,
        barThickness: 24
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#1E293B',
          bodyFont: { family: 'Inter', size: 11 }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            color: '#64748B',
            font: { family: 'Inter', size: 10 }
          },
          grid: {
            color: 'rgba(226, 232, 240, 0.6)'
          }
        },
        x: {
          ticks: {
            color: '#64748B',
            font: { family: 'Inter', size: 10, weight: '600' }
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}
