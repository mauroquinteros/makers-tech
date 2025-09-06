import Sidebar from "../components/Layout/Sidebar";
import ChatContainer from "../components/Chat/ChatContainer";

const ChatPage = () => {
  const handleNewChat = () => {
    // This will be handled by the ChatContainer through useChat hook
    console.log("New chat requested");
  };

  return (
    <div className="chat-page">
      <Sidebar onNewChat={handleNewChat} />
      <ChatContainer />

      <style>{`
        .chat-page {
          display: flex;
          height: 100vh;
          background-color: var(--color-white);
        }

        @media (max-width: 768px) {
          .chat-page {
            position: relative;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatPage;
