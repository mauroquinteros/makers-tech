import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("makerstech_user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(userData.role === "admin");
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem("makerstech_user");
    }
  }, []);

  const login = (userData) => {
    const userInfo = {
      email: userData.email,
      role: userData.email.includes("admin") ? "admin" : "client",
      name: userData.email.includes("admin") ? "Admin User" : "Client User",
      loginTime: new Date().toISOString(),
    };

    setUser(userInfo);
    setIsAuthenticated(true);
    setIsAdmin(userInfo.role === "admin");
    localStorage.setItem("makerstech_user", JSON.stringify(userInfo));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("makerstech_user");
    localStorage.removeItem("makerstech_session");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
