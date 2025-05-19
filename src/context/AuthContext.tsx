
import React, { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated, getCurrentUser, logout } from "@/services/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { id: string; name: string; email: string } | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    // Verificar autenticação ao iniciar
    setIsLoggedIn(isAuthenticated());
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
