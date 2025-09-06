import ProductCard from '../Product/ProductCard';

const MessageBubble = ({ message }) => {
  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  return (
    <div className={`message-bubble ${message.type}`}>
      <div className="message-content">
        {message.type === 'bot' && (
          <div className="bot-avatar">
            <span className="bot-icon">🤖</span>
          </div>
        )}
        
        <div className="bubble-wrapper">
          <div className={`bubble ${message.type} ${message.isError ? 'error' : ''} ${message.isWelcome ? 'welcome' : ''}`}>
            <div className="message-text">
              {message.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="message-paragraph">
                  {paragraph.split('\n').map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < paragraph.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            
            {message.products && message.products.length > 0 && (
              <div className="products-section">
                {message.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
          
          <div className="message-meta">
            <span className="message-time">{formatTime(message.timestamp)}</span>
          </div>
        </div>

        {message.type === 'user' && (
          <div className="user-avatar">
            <span className="user-icon">👤</span>
          </div>
        )}
      </div>

      <style>{`
        .message-bubble {
          display: flex;
          margin-bottom: var(--spacing-md);
        }

        .message-bubble.user {
          justify-content: flex-end;
        }

        .message-bubble.bot {
          justify-content: flex-start;
        }

        .message-content {
          display: flex;
          align-items: flex-end;
          gap: var(--spacing-sm);
          max-width: 70%;
        }

        .message-bubble.user .message-content {
          flex-direction: row-reverse;
        }

        .bubble-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .bubble {
          padding: var(--spacing-md) var(--spacing-lg);
          border-radius: var(--radius-xl);
          position: relative;
          word-wrap: break-word;
        }

        .bubble.user {
          background-color: var(--color-dark);
          color: var(--color-white);
          border-bottom-right-radius: var(--radius-sm);
        }

        .bubble.bot {
          background-color: var(--color-gray-light);
          color: var(--color-text);
          border-bottom-left-radius: var(--radius-sm);
        }

        .bubble.welcome {
          background-color: var(--color-primary);
          color: var(--color-dark);
          font-weight: 500;
        }

        .bubble.error {
          background-color: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .message-text {
          margin: 0;
          line-height: 1.5;
          font-size: 0.875rem;
        }

        .message-paragraph {
          margin: 0 0 var(--spacing-md) 0;
        }

        .message-paragraph:last-child {
          margin-bottom: 0;
        }

        .products-section {
          margin-top: var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .message-meta {
          display: flex;
          justify-content: flex-end;
          padding: 0 var(--spacing-xs);
        }

        .message-bubble.user .message-meta {
          justify-content: flex-start;
        }

        .message-time {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
        }

        .bot-avatar,
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .bot-avatar {
          background-color: var(--color-gray-light);
          color: var(--color-text);
        }

        .user-avatar {
          background-color: var(--color-primary);
          color: var(--color-dark);
        }

        @media (max-width: 768px) {
          .message-content {
            max-width: 85%;
          }

          .bubble {
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .message-text {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MessageBubble;