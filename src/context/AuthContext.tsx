import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your user object
interface Token {
  access_token: string;
}

interface AuthContextType {
  token: Token | null;
  login: (token: Token) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Function to get user data from local storage
  const getUserFromLocalStorage = (): Token | null => {
    const tokenJson = localStorage.getItem('token');
    return tokenJson ? JSON.parse(tokenJson) : null;
  };

  // Check local storage for user data when the hook is called
  const storedTokenn = getUserFromLocalStorage();

  const [token, setToken] = useState<Token | null>(storedTokenn);

  const login = (userToken: Token) => {
    // Set the user in local storage
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const logout = () => {
    // Remove the user from local storage
    localStorage.removeItem('token');
    setToken(null);
  };

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
