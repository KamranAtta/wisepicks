// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your user object
interface User {
  email: string;
  password: string;
  // Add more properties as needed
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Function to get user data from local storage
  const getUserFromLocalStorage = (): User | null => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  };

  // Check local storage for user data when the hook is called
  const storedUser = getUserFromLocalStorage();

  const [user, setUser] = useState<User | null>(storedUser);

  const login = (loggedInUser: User) => {
    // Set the user in local storage
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = () => {
    // Remove the user from local storage
    localStorage.removeItem('user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
