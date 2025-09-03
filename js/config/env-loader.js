// Environment Variables Loader
// This script loads environment variables from .env file for development

class EnvLoader {
  constructor() {
    this.envVars = {};
    this.loadEnvFile();
  }

  async loadEnvFile() {
    try {
      // Try to fetch .env file
      const response = await fetch('.env');
      if (response.ok) {
        const envText = await response.text();
        this.parseEnvFile(envText);
        console.log('Environment variables loaded from .env file');
      } else {
        console.log('No .env file found, using default configuration');
      }
    } catch (error) {
      console.log('Could not load .env file:', error.message);
    }
  }

  parseEnvFile(envText) {
    const lines = envText.split('\n');
    
    lines.forEach(line => {
      // Skip empty lines and comments
      if (line.trim() === '' || line.startsWith('#')) {
        return;
      }

      // Parse KEY=VALUE format
      const equalIndex = line.indexOf('=');
      if (equalIndex > 0) {
        const key = line.substring(0, equalIndex).trim();
        const value = line.substring(equalIndex + 1).trim();
        
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, '');
        this.envVars[key] = cleanValue;
      }
    });

    // Make environment variables available globally
    if (typeof window !== 'undefined') {
      window.env = this.envVars;
    }
  }

  getEnvVar(key) {
    return this.envVars[key];
  }

  getAllEnvVars() {
    return { ...this.envVars };
  }
}

// Create global instance
const envLoader = new EnvLoader();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnvLoader;
}
