import { useState, useRef } from "react";

const InputArea = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const maxLength = 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);

      // Auto-resize textarea
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  return (
    <div className="input-area">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about our products..."
            disabled={disabled}
            rows="1"
            className="message-input"
          />

          <button
            type="submit"
            className="send-btn"
            disabled={disabled || !message.trim()}
          >
            <span className="send-icon">➤</span>
          </button>
        </div>

        <div className="input-footer">
          <div className="character-count">
            {message.length}/{maxLength}
          </div>
          <div className="input-hint">
            Makers Tech may provide inaccurate information about products,
            places or facts. Check our inventory carefully.
          </div>
        </div>
      </form>

      <style>{`
        .input-area {
          background-color: var(--color-white);
          border-top: 1px solid var(--color-border);
          padding: var(--spacing-lg);
        }

        .input-form {
          max-width: 100%;
        }

        .input-container {
          display: flex;
          align-items: flex-end;
          gap: var(--spacing-sm);
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: var(--spacing-sm);
          transition: border-color 0.2s ease;
        }

        .input-container:focus-within {
          border-color: var(--color-primary);
        }

        .attachment-btn {
          background: none;
          border: none;
          padding: var(--spacing-sm);
          cursor: pointer;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
          font-size: 1rem;
        }

        .attachment-btn:hover:not(:disabled) {
          background-color: var(--color-gray-light);
        }

        .attachment-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .message-input {
          flex: 1;
          border: none;
          outline: none;
          resize: none;
          font-family: inherit;
          font-size: 0.875rem;
          line-height: 1.5;
          padding: var(--spacing-sm) var(--spacing-md);
          background: transparent;
          color: var(--color-text);
          min-height: 20px;
          max-height: 120px;
        }

        .message-input::placeholder {
          color: var(--color-text-secondary);
        }

        .message-input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .send-btn {
          background-color: var(--color-primary);
          color: var(--color-dark);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.875rem;
        }

        .send-btn:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
        }

        .send-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .send-icon {
          margin-left: 1px; /* Optical alignment */
        }

        .input-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--spacing-sm);
          gap: var(--spacing-md);
        }

        .character-count {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          flex-shrink: 0;
        }

        .input-hint {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          text-align: right;
          flex: 1;
        }

        @media (max-width: 768px) {
          .input-area {
            padding: var(--spacing-md);
          }

          .input-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-xs);
          }

          .input-hint {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default InputArea;
