// Dashboard History Display
// This module handles displaying the latest prediction history on the dashboard

document.addEventListener('DOMContentLoaded', function() {
  loadLatestHistory();
});

function loadLatestHistory() {
  try {
    // Check if historyStorage is available
    if (typeof historyStorage === 'undefined') {
      console.error('History storage not available');
      return;
    }

    const latestPrediction = historyStorage.getLatestPrediction();
    const historyContainer = document.querySelector('.historey-table .history');

    if (!historyContainer) {
      console.error('History container not found');
      return;
    }

    if (!latestPrediction) {
      // Show message when no history is available
      historyContainer.innerHTML = `
        <li class="no-history-item">
          <span class="his">No predictions yet</span>
          <span class="his-value">Make your first prediction!</span>
        </li>
      `;
      return;
    }

    // Update the history display with latest prediction data
    historyContainer.innerHTML = `
      <li>
        <span class="his">Date:</span>
        <span class="his-value">${latestPrediction.date}</span>
      </li>
      <li>
        <span class="his">Year:</span>
        <span class="his-value">${latestPrediction.year}</span>
      </li>
      <li>
        <span class="his">Average Rainfall (Mm/Year):</span>
        <span class="his-value">${latestPrediction.averageRainfall}</span>
      </li>
      <li>
        <span class="his">Average Temperature:</span>
        <span class="his-value">${latestPrediction.averageTemperature}°C</span>
      </li>
      <li>
        <span class="his">Quantity of Pesticides (Tonnes):</span>
        <span class="his-value">${latestPrediction.pesticidesQuantity}</span>
      </li>
      <li>
        <span class="his">Country:</span>
        <span class="his-value">${latestPrediction.country}</span>
      </li>
      <li>
        <span class="his">Crop:</span>
        <span class="his-value">${latestPrediction.crop}</span>
      </li>
      <li>
        <span class="his">Prediction:</span>
        <span class="his-value">${latestPrediction.prediction}</span>
      </li>
    `;

    console.log('Latest history loaded on dashboard:', latestPrediction);
  } catch (error) {
    console.error('Error loading latest history on dashboard:', error);
  }
}

// Add CSS for no history message
const style = document.createElement('style');
style.textContent = `
  .no-history-item {
    text-align: center;
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 10px;
    margin: 1rem 0;
  }

  .no-history-item .his {
    display: block;
    font-size: 1.4rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .no-history-item .his-value {
    display: block;
    font-size: 1.2rem;
    color: #2da884;
    font-weight: 600;
  }
`;
document.head.appendChild(style);
