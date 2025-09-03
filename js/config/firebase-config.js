// Firebase Configuration Manager
// This module handles Firebase configuration with environment variable support

class FirebaseConfig {
  constructor() {
    this.config = this.loadConfig();
  }

  loadConfig() {
    // Try to load from environment variables first
    const envConfig = this.loadFromEnvironment();
    
    // Fallback to hardcoded values if environment variables are not available
    const fallbackConfig = {
      apiKey: "AIzaSyDV6pScpMLcu69Jo4eMqSAgh_pY8b1Ql2w",
      authDomain: "graduation-project-560f4.firebaseapp.com",
      projectId: "graduation-project-560f4",
      storageBucket: "graduation-project-560f4.appspot.com",
      messagingSenderId: "533080583769",
      appId: "1:533080583769:web:167f1275665cba29fc4b48",
      measurementId: "G-ZWFEHLBKMM"
    };

    // Use environment config if available, otherwise use fallback
    return envConfig.apiKey ? envConfig : fallbackConfig;
  }

  loadFromEnvironment() {
    // Check if we're in a Node.js environment (for server-side)
    if (typeof process !== 'undefined' && process.env) {
      return {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      };
    }

    // For client-side, try to load from window.env or other global variables
    if (typeof window !== 'undefined' && window.env) {
      return {
        apiKey: window.env.FIREBASE_API_KEY,
        authDomain: window.env.FIREBASE_AUTH_DOMAIN,
        projectId: window.env.FIREBASE_PROJECT_ID,
        storageBucket: window.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: window.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: window.env.FIREBASE_APP_ID,
        measurementId: window.env.FIREBASE_MEASUREMENT_ID
      };
    }

    // Try to load from a global config object
    if (typeof window !== 'undefined' && window.FIREBASE_CONFIG) {
      return window.FIREBASE_CONFIG;
    }

    return {};
  }

  getConfig() {
    return this.config;
  }

  // Method to update config at runtime (useful for testing or dynamic config)
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }

  // Method to validate config
  validateConfig() {
    const required = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    const missing = required.filter(key => !this.config[key]);
    
    if (missing.length > 0) {
      console.warn('Missing Firebase configuration keys:', missing);
      return false;
    }
    
    return true;
  }
}

// Create a global instance
const firebaseConfig = new FirebaseConfig();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FirebaseConfig;
}

// Make it available globally for browser usage
if (typeof window !== 'undefined') {
  window.firebaseConfig = firebaseConfig;
}
