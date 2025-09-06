const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const TIMEOUT = 120000; // 2 minutes for AI processing

class ChatAPI {
  constructor() {
    this.sessionId = null;
  }

  async sendMessage(message, sessionId = null) {
    try {
      // Generate sessionId only if we don't have one yet
      if (!this.sessionId && !sessionId) {
        this.sessionId = this.generateSessionId();
      }

      const requestBody = {
        userId: sessionId || this.sessionId,
        message: message.trim(),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

      const response = await fetch(`${API_BASE_URL}/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Store session ID for future requests
      if (data.sessionId) {
        this.sessionId = data.sessionId;
      }

      return {
        response:
          data.response ||
          "Sorry, I didn't understand that. Could you please rephrase?",
        products: data.products || [],
        sessionId: data.sessionId || this.sessionId,
        timestamp: data.timestamp || new Date().toISOString(),
      };
    } catch (error) {
      console.error("API Error:", error);

      if (error.name === "AbortError") {
        throw new Error(
          "Request timeout. Please check your connection and try again."
        );
      }

      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError")
      ) {
        throw new Error(
          "Unable to connect to our servers. Please check your internet connection."
        );
      }

      throw new Error(
        "Sorry, something went wrong. Please try again in a moment."
      );
    }
  }

  generateSessionId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `session_${timestamp}_${random}`;
  }

  // Health check method
  async checkHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.error("Health check failed:", error);
      return false;
    }
  }

  // Reset session
  resetSession() {
    this.sessionId = null;
  }
}

// Create singleton instance
const chatAPI = new ChatAPI();

export default chatAPI;
