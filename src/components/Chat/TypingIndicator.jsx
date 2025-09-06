const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <div className="bot-avatar">
        <span className="bot-icon">🤖</span>
      </div>
      
      <div className="typing-bubble">
        <div className="typing-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="typing-text">Makers Tech is thinking...</div>
      </div>

      <style>{`
        .typing-indicator {
          display: flex;
          align-items: flex-end;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
        }

        .bot-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--color-gray-light);
          color: var(--color-text);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .typing-bubble {
          background-color: var(--color-gray-light);
          padding: var(--spacing-md) var(--spacing-lg);
          border-radius: var(--radius-xl);
          border-bottom-left-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .typing-dots {
          display: flex;
          gap: 4px;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-gray);
          animation: typing 1.5s ease-in-out infinite;
        }

        .dot:nth-child(1) {
          animation-delay: 0s;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        .typing-text {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          font-style: italic;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default TypingIndicator;