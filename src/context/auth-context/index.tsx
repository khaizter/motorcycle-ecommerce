import React, { useState, createContext, useEffect } from 'react';

import { contextType } from 'src/context/auth-context/model';

const defaultProvider: contextType = {
  isLoggedIn: false,
  currentUserId: null,
  currentToken: null,
  currentUserName: null,
  login: (id: string, token: string, name: string) => {},
  logout: () => {}
};

const AuthContext = createContext(defaultProvider);

interface propType {
  children: React.ReactNode;
}

const AuthProvider: React.FC<propType> = props => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

  // Check if user is currently logged in
  useEffect(() => {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    if (id && token && name) {
      setCurrentUserId(id);
      setCurrentToken(token);
      setCurrentUserName(name);
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (id: string, token: string, name: string) => {
    setCurrentUserId(id);
    localStorage.setItem('userId', id);
    setCurrentToken(token);
    localStorage.setItem('token', token);
    setCurrentUserName(name);
    localStorage.setItem('userName', name);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setCurrentUserId(null);
    localStorage.removeItem('userId');
    setCurrentToken(null);
    localStorage.removeItem('token');
    setCurrentUserName(null);
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        currentUserId: currentUserId,
        currentToken: currentToken,
        currentUserName: currentUserName,
        login: loginHandler,
        logout: logoutHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
