import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    login({ email });
    setIsSubmitting(false);
  };

  const handleMockLogin = (mockEmail, mockPassword) => {
    setEmail(mockEmail);
    setPassword(mockPassword);
  };

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <h1 className="logo-text">Makers Tech</h1>
          </div>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`login-btn ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mock-users">
          <h3 className="mock-users-title">Demo Users</h3>
          <div className="mock-users-grid">
            <div className="mock-user-card">
              <div className="mock-user-header">
                <div className="mock-user-avatar client">👤</div>
                <div className="mock-user-info">
                  <h4 className="mock-user-name">Client User</h4>
                  <p className="mock-user-role">Customer</p>
                </div>
              </div>
              <div className="mock-user-credentials">
                <p className="credential">📧 client@makerstech.com</p>
                <p className="credential">🔐 client123</p>
              </div>
              <button
                onClick={() =>
                  handleMockLogin("client@makerstech.com", "client123")
                }
                className="mock-login-btn client"
              >
                Client Account
              </button>
            </div>

            <div className="mock-user-card">
              <div className="mock-user-header">
                <div className="mock-user-avatar admin">👨‍💼</div>
                <div className="mock-user-info">
                  <h4 className="mock-user-name">Admin User</h4>
                  <p className="mock-user-role">Administrator</p>
                </div>
              </div>
              <div className="mock-user-credentials">
                <p className="credential">📧 admin@makerstech.com</p>
                <p className="credential">🔐 admin123</p>
              </div>
              <button
                onClick={() =>
                  handleMockLogin("admin@makerstech.com", "admin123")
                }
                className="mock-login-btn admin"
              >
                Admin Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-lg);
          position: relative;
          overflow: hidden;
        }

        .login-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at bottom right, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .login-container {
          background: rgba(26, 26, 26, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: var(--spacing-lg);
          width: 100%;
          max-width: 420px;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
                      0 1px 0 rgba(255, 255, 255, 0.1) inset;
          position: relative;
          z-index: 1;
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--spacing-lg);
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
        }

        .logo-icon {
          font-size: 2rem;
        }

        .logo-text {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          margin: 0;
        }

        .login-form {
          margin-bottom: var(--spacing-lg);
        }

        .form-group {
          margin-bottom: var(--spacing-md);
        }

        .form-label {
          display: block;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: var(--spacing-sm);
          font-size: 0.875rem;
          letter-spacing: 0.025em;
        }

        .form-input {
          width: 100%;
          padding: var(--spacing-md);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.2s ease;
          box-sizing: border-box;
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          backdrop-filter: blur(10px);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .form-input:focus {
          outline: none;
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2),
                      0 0 20px rgba(59, 130, 246, 0.1);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
        }

        .checkbox {
          accent-color: var(--color-primary);
        }

        .checkbox-text {
          font-size: 0.875rem;
          color: var(--color-text);
        }

        .forgot-link {
          font-size: 0.875rem;
          color: var(--color-primary);
          text-decoration: none;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .login-btn {
          width: 100%;
          background-color: var(--color-primary);
          color: var(--color-dark);
          border: none;
          padding: var(--spacing-md);
          border-radius: var(--radius-lg);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          transition: all 0.2s ease;
          font-size: 1rem;
        }

        .login-btn:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .login-btn.loading {
          position: relative;
        }

        .mock-users {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: var(--spacing-md);
          margin-top: var(--spacing-md);
        }

        .mock-users-title {
          text-align: center;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 var(--spacing-md) 0;
          letter-spacing: 0.025em;
        }

        .mock-users-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-sm);
        }

        .mock-user-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: var(--spacing-sm);
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          transition: all 0.2s ease;
          text-align: center;
        }

        .mock-user-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-1px);
        }

        .mock-user-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-sm);
        }

        .mock-user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          margin-bottom: var(--spacing-xs);
        }

        .mock-user-avatar.client {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.2) 100%);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .mock-user-avatar.admin {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .mock-user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
        }

        .mock-user-role {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .mock-user-credentials {
          margin-bottom: var(--spacing-sm);
        }

        .credential {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 2px 0;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        }

        .mock-login-btn {
          width: 100%;
          padding: var(--spacing-sm) var(--spacing-md);
          border: none;
          border-radius: 10px;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .mock-login-btn.client {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.8) 100%);
          color: #ffffff;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .mock-login-btn.client:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.9) 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .mock-login-btn.admin {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(217, 119, 6, 0.8) 100%);
          color: #ffffff;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .mock-login-btn.admin:hover {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(217, 119, 6, 0.9) 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        @media (max-width: 640px) {
          .login-page {
            padding: var(--spacing-md);
          }

          .login-container {
            padding: var(--spacing-md);
            margin: 0;
            border-radius: 16px;
            max-width: 100%;
          }

          .logo-text {
            font-size: 1.5rem;
          }

          .mock-users-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-xs);
          }

          .mock-user-card {
            padding: var(--spacing-xs);
          }

          .form-group {
            margin-bottom: var(--spacing-sm);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
