// History Storage Management
// This module handles saving and retrieving prediction history from localStorage

class HistoryStorage {
  constructor() {
    this.storageKey = 'cropPredictionHistory';
  }

  // Save a new prediction to history
  savePrediction(predictionData) {
    try {
      // Get existing history
      const existingHistory = this.getHistory();
      
      // Create new history entry
      const newEntry = {
        id: Date.now(), // Unique ID based on timestamp
        date: new Date().toLocaleDateString('en-US'),
        year: predictionData.Year,
        averageRainfall: predictionData.average_rain_fall_mm_per_year,
        averageTemperature: predictionData.avg_temp,
        pesticidesQuantity: predictionData.pesticides_tonnes,
        country: predictionData.Area,
        crop: predictionData.Item,
        prediction: predictionData.prediction || 'N/A',
        timestamp: new Date().toISOString()
      };

      // Add new entry to the beginning of the array (most recent first)
      existingHistory.unshift(newEntry);

      // Keep only the last 50 entries to prevent localStorage from getting too large
      if (existingHistory.length > 50) {
        existingHistory.splice(50);
      }

      // Save to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(existingHistory));
      
      console.log('Prediction saved to history:', newEntry);
      return true;
    } catch (error) {
      console.error('Error saving prediction to history:', error);
      return false;
    }
  }

  // Get all history entries
  getHistory() {
    try {
      const history = localStorage.getItem(this.storageKey);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error retrieving history from localStorage:', error);
      return [];
    }
  }

  // Get the most recent prediction (for dashboard)
  getLatestPrediction() {
    const history = this.getHistory();
    return history.length > 0 ? history[0] : null;
  }

  // Clear all history
  clearHistory() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log('History cleared');
      return true;
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  }

  // Delete a specific history entry
  deleteHistoryEntry(entryId) {
    try {
      const history = this.getHistory();
      const filteredHistory = history.filter(entry => entry.id !== entryId);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredHistory));
      console.log('History entry deleted:', entryId);
      return true;
    } catch (error) {
      console.error('Error deleting history entry:', error);
      return false;
    }
  }

  // Get history count
  getHistoryCount() {
    return this.getHistory().length;
  }
}

// Create a global instance
const historyStorage = new HistoryStorage();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HistoryStorage;
}
