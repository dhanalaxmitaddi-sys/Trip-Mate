// LocalStorage schema management utility (SDD Section 4.4)
// Safe parse and fallback logic

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}":`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error saving to localStorage key "${key}":`, e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Error removing localStorage key "${key}":`, e);
    }
  },

  // Trips (Isolated by User ID - Requirement 2)
  getTrips(userId = null) {
    if (userId) {
      const userTrips = this.get(`tm.trips_${userId}`, null);
      if (userTrips && Array.isArray(userTrips)) return userTrips;
    }
    const all = this.get('tm.trips', []);
    if (userId) {
      return all.filter(t => t.userId === userId || (!t.userId && userId === 'demo-user-101'));
    }
    return all;
  },
  saveTrips(trips, userId = null) {
    if (userId) {
      this.set(`tm.trips_${userId}`, trips);
    }
    this.set('tm.trips', trips);
  },

  // Current Trip ID (Isolated by User ID)
  getCurrentTripId(userId = null) {
    if (userId) {
      const userCurrent = localStorage.getItem(`tm.currentTripId_${userId}`);
      if (userCurrent) return userCurrent;
    }
    return localStorage.getItem('tm.currentTripId') || null;
  },
  setCurrentTripId(id, userId = null) {
    if (userId) {
      if (id) localStorage.setItem(`tm.currentTripId_${userId}`, id);
      else localStorage.removeItem(`tm.currentTripId_${userId}`);
    }
    if (id) localStorage.setItem('tm.currentTripId', id);
    else localStorage.removeItem('tm.currentTripId');
  },

  // Packing list per trip
  getTripPacking(tripId) {
    return this.get(`tm.packing.${tripId}`, null);
  },
  saveTripPacking(tripId, items) {
    this.set(`tm.packing.${tripId}`, items);
  },

  // Form draft
  getDraft() {
    return this.get('tm.draft', null);
  },
  saveDraft(draft) {
    this.set('tm.draft', draft);
  },
  clearDraft() {
    this.remove('tm.draft');
  },

  // Chatbot history
  getChatHistory() {
    return this.get('tm.chat', []);
  },
  saveChatHistory(history) {
    // Keep max 50 messages
    const bounded = Array.isArray(history) ? history.slice(-50) : [];
    this.set('tm.chat', bounded);
  }
};

export default storage;
