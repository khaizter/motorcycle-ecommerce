import React, { useState, createContext, useEffect } from 'react';

import AuthApi from 'src/common/api/auth';
import { contextType } from 'src/context/auth-context/model';

const defaultProvider: contextType = {
  isLoggedIn: false,
  currentUserId: null,
  currentToken: null,
  currentUserName: null,
  currentUserType: null,
  login: (id: string, token: string, name: string, type: string) => {},
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
  const [currentUserType, setCurrentUserType] = useState<string | null>(null);

  // Check if user is currently logged in
  useEffect(() => {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const type = localStorage.getItem('userType');
    if (id && token && name && type) {
      // check if token doesn't expire yet
      AuthApi.checkToken(token)
        .then(response => {
          setCurrentUserId(id);
          setCurrentToken(token);
          setCurrentUserName(name);
          setCurrentUserType(type);
          setIsLoggedIn(true);
        })
        .catch(err => {
          console.log(err);
          if (err?.response?.data?.message === 'jwt expired') {
            setCurrentUserId(null);
            localStorage.removeItem('userId');
            setCurrentToken(null);
            localStorage.removeItem('token');
            setCurrentUserName(null);
            localStorage.removeItem('userName');
            setCurrentUserType(null);
            localStorage.removeItem('userType');
            setIsLoggedIn(false);
          }
        });
    }
  }, []);

  const loginHandler = (id: string, token: string, name: string, type: string) => {
    setCurrentUserId(id);
    localStorage.setItem('userId', id);
    setCurrentToken(token);
    localStorage.setItem('token', token);
    setCurrentUserName(name);
    localStorage.setItem('userName', name);
    setCurrentUserType(type);
    localStorage.setItem('userType', type);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setCurrentUserId(null);
    localStorage.removeItem('userId');
    setCurrentToken(null);
    localStorage.removeItem('token');
    setCurrentUserName(null);
    localStorage.removeItem('userName');
    setCurrentUserType(null);
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        currentUserId: currentUserId,
        currentToken: currentToken,
        currentUserName: currentUserName,
        currentUserType: currentUserType,
        login: loginHandler,
        logout: logoutHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
