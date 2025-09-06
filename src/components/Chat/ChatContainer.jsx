import { useRef, useEffect } from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';
import TypingIndicator from './TypingIndicator';
import useChat from '../../hooks/useChat';

const ChatContainer = () => {
  const messagesEndRef = useRef(null);
  const { 
    messages, 
    isLoading, 
    connectionStatus, 
    sendMessage
  } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText) => {
    sendMessage(messageText);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-content">
          <h1 className="chat-title">Inventory Assistant</h1>
          <div className="status-indicator">
            <span className={`status-dot ${connectionStatus}`}></span>
            <span className="status-text">
              {connectionStatus === 'online' ? 'Online' : 
               connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="chat-content">
        <MessageList messages={messages} />
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <InputArea onSendMessage={handleSendMessage} disabled={isLoading} />

      <style>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: var(--color-white);
          flex: 1;
        }

        .chat-header {
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--color-border);
          background-color: var(--color-white);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-gray);
        }

        .status-dot.online {
          background-color: var(--color-primary);
        }

        .status-dot.connecting {
          background-color: #f59e0b;
          animation: pulse 2s ease-in-out infinite;
        }

        .status-dot.offline {
          background-color: #dc2626;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .status-text {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          font-weight: 500;
        }

        .chat-content {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-lg);
          padding-bottom: 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        @media (max-width: 768px) {
          .chat-header {
            padding: var(--spacing-md);
          }

          .chat-title {
            font-size: 1.25rem;
          }

          .chat-content {
            padding: var(--spacing-md);
            padding-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;