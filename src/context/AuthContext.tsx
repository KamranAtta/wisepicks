/* eslint-disable no-console */
import React, { createContext, useEffect, ReactNode, useReducer } from 'react';

export const AuthContext = createContext<any>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    } else {
      dispatch({ type: 'LOGOUT', payload: null });
    }
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}> {children}</AuthContext.Provider>;
};
