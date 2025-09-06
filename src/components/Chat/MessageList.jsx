import MessageBubble from './MessageBubble';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      <style>{`
        .message-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default MessageList;