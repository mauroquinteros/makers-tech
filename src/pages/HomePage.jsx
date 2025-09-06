import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <div className="home-header">
          <h1>Makers Tech</h1>
          <p>Inventory Management System</p>
        </div>

        <div className="home-actions">
          <Link to="/login" className="login-link">
            Sign In
          </Link>
          <Link to="/chat" className="chat-link">
            Start Chat with Inventory Assistant
          </Link>
        </div>
      </div>

      <style>{`
        .home-page {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: var(--color-white);
        }

        .home-content {
          text-align: center;
          max-width: 500px;
          padding: var(--spacing-xl);
        }

        .home-header h1 {
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: var(--spacing-sm);
        }

        .home-header p {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-xl);
        }

        .home-actions {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          align-items: center;
        }

        .login-link {
          display: inline-block;
          background-color: transparent;
          color: var(--color-primary);
          text-decoration: none;
          padding: var(--spacing-md) var(--spacing-lg);
          border: 2px solid var(--color-primary);
          border-radius: var(--radius-lg);
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .login-link:hover {
          background-color: var(--color-primary);
          color: var(--color-white);
          transform: translateY(-2px);
        }

        .chat-link {
          display: inline-block;
          background-color: var(--color-primary);
          color: var(--color-dark);
          text-decoration: none;
          padding: var(--spacing-lg) var(--spacing-xl);
          border-radius: var(--radius-lg);
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.2s ease;
        }

        .chat-link:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default HomePage;
