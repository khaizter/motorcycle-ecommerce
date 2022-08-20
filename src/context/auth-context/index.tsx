import React, { useState, createContext } from 'react';

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

  const loginHandler = (id: string, token: string, name: string) => {
    setCurrentUserId(id);
    setCurrentToken(token);
    setCurrentUserName(name);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setCurrentUserId(null);
    setCurrentToken(null);
    setCurrentUserName(null);
    setIsLoggedIn(true);
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
