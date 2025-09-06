import { useState, useCallback, useRef, useEffect } from "react";
import chatAPI from "../services/api";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("online"); // 'online', 'offline', 'connecting'
  const sessionIdRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: "bot",
        content:
          "Hi! Welcome to Makers Tech Inventory Assistant. What can I help you with?",
        timestamp: new Date(),
        isWelcome: true,
      },
    ]);
  }, []);

  // Check connection status periodically
  useEffect(() => {
    const checkConnection = async () => {
      const isHealthy = await chatAPI.checkHealth();
      setConnectionStatus(isHealthy ? "online" : "offline");
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const sendMessage = useCallback(
    async (messageText) => {
      if (!messageText.trim() || isLoading) return;

      const userMessage = {
        id: Date.now(),
        type: "user",
        content: messageText.trim(),
        timestamp: new Date(),
      };

      // Add user message immediately
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);
      setConnectionStatus("connecting");

      try {
        const response = await chatAPI.sendMessage(
          messageText,
          sessionIdRef.current
        );

        // Store session ID
        sessionIdRef.current = response.sessionId;

        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: response.response,
          products: response.products,
          timestamp: new Date(response.timestamp),
        };

        setMessages((prev) => [...prev, botMessage]);
        setConnectionStatus("online");
      } catch (err) {
        console.error("Chat error:", err);
        setError(err.message);

        const errorMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: err.message,
          timestamp: new Date(),
          isError: true,
        };

        setMessages((prev) => [...prev, errorMessage]);
        setConnectionStatus("offline");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const startNewChat = useCallback(() => {
    setMessages([
      {
        id: 1,
        type: "bot",
        content:
          "Hi! Welcome to Makers Tech Inventory Assistant. What can I help you with?",
        timestamp: new Date(),
        isWelcome: true,
      },
    ]);
    setError(null);
    chatAPI.resetSession();
    sessionIdRef.current = null;
  }, []);

  const retryLastMessage = useCallback(() => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((msg) => msg.type === "user");
      if (lastUserMessage) {
        // Remove the last error message
        setMessages((prev) => prev.filter((msg) => !msg.isError));
        // Retry sending the message
        sendMessage(lastUserMessage.content);
      }
    }
  }, [messages, sendMessage]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    connectionStatus,
    sendMessage,
    startNewChat,
    retryLastMessage,
    clearError,
  };
};

export default useChat;
