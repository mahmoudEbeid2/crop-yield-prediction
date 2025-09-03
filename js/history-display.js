// History Display Management
// This module handles displaying prediction history from localStorage

document.addEventListener('DOMContentLoaded', function() {
  loadHistoryData();
});

function loadHistoryData() {
  try {
    // Check if historyStorage is available
    if (typeof historyStorage === 'undefined') {
      console.error('History storage not available');
      return;
    }

    const history = historyStorage.getHistory();
    const cardsContainer = document.querySelector('.cards-container');

    if (!cardsContainer) {
      console.error('Cards container not found');
      return;
    }

    // Clear existing cards
    cardsContainer.innerHTML = '';

    if (history.length === 0) {
      // Show message when no history is available
      cardsContainer.innerHTML = `
        <div class="no-history-message">
          <div class="no-history-card">
            <div class="no-history-icon">
              <ion-icon name="document-outline"></ion-icon>
            </div>
            <h3>No History Available</h3>
            <p>You haven't made any predictions yet. Start by making your first crop yield prediction!</p>
            <a href="predection.html" class="start-prediction-btn">Make Prediction</a>
          </div>
        </div>
      `;
      return;
    }

    // Create cards for each history entry
    history.forEach(entry => {
      const card = createHistoryCard(entry);
      cardsContainer.appendChild(card);
    });

    console.log(`Loaded ${history.length} history entries`);
  } catch (error) {
    console.error('Error loading history data:', error);
  }
}

function createHistoryCard(entry) {
  const card = document.createElement('div');
  card.className = 'history-card';
  card.setAttribute('data-id', entry.id);

  card.innerHTML = `
    <div class="card-header">
      <h3 class="card-date">${entry.date}</h3>
      <span class="card-year">${entry.year}</span>
    </div>
    <div class="card-body">
      <div class="card-row">
        <span class="card-label">Average Rainfall:</span>
        <span class="card-value">${entry.averageRainfall} Mm/Year</span>
      </div>
      <div class="card-row">
        <span class="card-label">Average Temperature:</span>
        <span class="card-value">${entry.averageTemperature}°C</span>
      </div>
      <div class="card-row">
        <span class="card-label">Pesticides:</span>
        <span class="card-value">${entry.pesticidesQuantity} Tonnes</span>
      </div>
      <div class="card-row">
        <span class="card-label">Country:</span>
        <span class="card-value">${entry.country}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Crop:</span>
        <span class="card-value">${entry.crop}</span>
      </div>
      <div class="card-row prediction-row">
        <span class="card-label">Prediction:</span>
        <span class="card-value prediction-value">${entry.prediction}</span>
      </div>
    </div>
    <div class="card-actions">
      <button class="delete-btn" onclick="deleteHistoryEntry(${entry.id})" title="Delete this entry">
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    </div>
  `;

  return card;
}

function deleteHistoryEntry(entryId) {
  if (confirm('Are you sure you want to delete this history entry?')) {
    try {
      if (typeof historyStorage !== 'undefined') {
        const success = historyStorage.deleteHistoryEntry(entryId);
        if (success) {
          // Remove the card from DOM
          const card = document.querySelector(`[data-id="${entryId}"]`);
          if (card) {
            card.remove();
          }
          
          // Show success message
          if (typeof swal !== 'undefined') {
            swal("Deleted", "History entry has been deleted successfully", "success");
          } else {
            alert('History entry deleted successfully');
          }
        } else {
          throw new Error('Failed to delete entry');
        }
      }
    } catch (error) {
      console.error('Error deleting history entry:', error);
      if (typeof swal !== 'undefined') {
        swal("Error", "Failed to delete history entry", "error");
      } else {
        alert('Failed to delete history entry');
      }
    }
  }
}

// Add CSS for no history message and delete button
const style = document.createElement('style');
style.textContent = `
  .no-history-message {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }

  .no-history-card {
    text-align: center;
    background: white;
    padding: 4rem 3rem;
    border-radius: 15px;
    box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.15);
    max-width: 400px;
  }

  .no-history-icon {
    font-size: 6rem;
    color: #96d4c2;
    margin-bottom: 2rem;
  }

  .no-history-card h3 {
    font-size: 2.4rem;
    color: #2da884;
    margin-bottom: 1.6rem;
    font-weight: 700;
  }

  .no-history-card p {
    font-size: 1.4rem;
    color: #666;
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  .start-prediction-btn {
    display: inline-block;
    padding: 1.2rem 2.4rem;
    background: linear-gradient(#96d4c2, #2da884);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 600;
    font-size: 1.4rem;
    transition: all 0.3s ease;
  }

  .start-prediction-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 1rem 2rem rgba(45, 168, 132, 0.3);
  }

  .card-actions {
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-top: 1px solid rgba(45, 168, 132, 0.1);
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  .card-actions::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #2da884, transparent);
  }

  .delete-btn {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    border: none;
    color: white;
    font-size: 1.6rem;
    cursor: pointer;
    padding: 0.8rem;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    box-shadow: 0 4px 15px rgba(238, 90, 82, 0.3);
    position: relative;
    overflow: hidden;
  }

  .delete-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s ease;
  }

  .delete-btn:hover {
    background: linear-gradient(135deg, #ff5252, #d32f2f);
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 20px rgba(238, 90, 82, 0.4);
  }

  .delete-btn:hover::before {
    left: 100%;
  }

  .delete-btn:active {
    transform: scale(0.95);
  }
`;
document.head.appendChild(style);
