import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isCollapsed }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-text">Makers Tech</span>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Navigation Menu */}
          <nav className="sidebar-nav">
            <div className="nav-item" onClick={() => navigate("/chat")}>
              <span className="nav-icon">💬</span>
              <span className="nav-text">Inventory Assistant</span>
            </div>
            {isAdmin && (
              <div
                className="nav-item"
                onClick={() => navigate("/admin-dashboard")}
              >
                <span className="nav-icon">📊</span>
                <span className="nav-text">Admin Dashboard</span>
              </div>
            )}
          </nav>
        </>
      )}

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        <div className="user-profile">
          <div className="user-avatar">{user?.name?.charAt(0) || "U"}</div>
          <div className="user-info">
            <div className="user-name">{user?.name || "User"}</div>
            <div className="user-role">{user?.role || "Guest"}</div>
          </div>
          <button onClick={logout} className="logout-btn" title="Logout">
            🚪
          </button>
        </div>
      </div>

      <style>{`
        .sidebar {
          width: 240px;
          height: 100vh;
          background-color: var(--color-dark);
          color: var(--color-white);
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
          position: relative;
        }

        .sidebar.collapsed {
          width: 60px;
        }

        .sidebar-header {
          padding: var(--spacing-md);
          border-bottom: 1px solid var(--color-dark-lighter);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-text {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        .collapse-btn {
          background: var(--color-dark-lighter);
          color: var(--color-white);
          border: none;
          padding: var(--spacing-xs);
          border-radius: var(--radius-sm);
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .new-chat-btn {
          margin: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
          background-color: var(--color-primary);
          color: var(--color-dark);
          border: none;
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          transition: all 0.2s ease;
          font-size: 0.875rem;
        }

        .new-chat-btn:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
        }

        .plus-icon {
          font-size: 1.2rem;
        }

        .sidebar-nav {
          padding: 0 var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background-color 0.2s ease;
          margin-bottom: var(--spacing-xs);
          font-size: 0.875rem;
        }

        .nav-item:hover {
          background-color: var(--color-dark-lighter);
        }

        .nav-item.active {
          background-color: var(--color-dark-lighter);
        }

        .nav-item.admin-nav {
          border: 1px solid var(--color-primary);
          background-color: rgba(59, 130, 246, 0.1);
        }

        .nav-item.admin-nav:hover {
          background-color: rgba(59, 130, 246, 0.2);
        }

        .nav-icon {
          font-size: 0.875rem;
        }

        .nav-text {
          font-size: 0.875rem;
        }

        .recent-section {
          padding: 0 var(--spacing-lg);
          flex: 1;
          overflow-y: auto;
        }

        .recent-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-gray);
          text-transform: uppercase;
          margin-bottom: var(--spacing-md);
          letter-spacing: 0.05em;
        }

        .recent-item {
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: background-color 0.2s ease;
          margin-bottom: var(--spacing-xs);
        }

        .recent-item:hover {
          background-color: var(--color-dark-lighter);
        }

        .recent-title-text {
          font-size: 0.875rem;
          color: var(--color-white);
          margin-bottom: var(--spacing-xs);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .recent-time {
          font-size: 0.75rem;
          color: var(--color-gray);
        }

        .sidebar-bottom {
          padding: var(--spacing-md);
          border-top: 1px solid var(--color-dark-lighter);
          margin-top: auto;
        }

        .trial-notice {
          background-color: var(--color-dark-lighter);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-lg);
        }

        .trial-notice p {
          font-size: 0.875rem;
          margin-bottom: var(--spacing-xs);
        }

        .trial-desc {
          font-size: 0.75rem;
          color: var(--color-gray);
          margin-bottom: var(--spacing-md) !important;
        }

        .upgrade-btn {
          background-color: var(--color-primary);
          color: var(--color-dark);
          border: none;
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          position: relative;
        }

        .user-avatar {
          width: 28px;
          height: 28px;
          background-color: var(--color-primary);
          color: var(--color-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.75rem;
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .user-role {
          font-size: 0.6875rem;
          color: var(--color-gray);
        }

        .logout-btn {
          background: none;
          border: none;
          color: var(--color-gray);
          font-size: 1rem;
          cursor: pointer;
          padding: var(--spacing-xs);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          margin-left: auto;
        }

        .logout-btn:hover {
          background-color: var(--color-dark-lighter);
          color: var(--color-white);
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
            transform: translateX(-100%);
          }

          .sidebar:not(.collapsed) {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
