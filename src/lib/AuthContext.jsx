import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useState({ name: 'Usuario local', email: 'local@dev.com' });
  const isAuthenticated = true;
  const isLoadingAuth = false;
  const isLoadingPublicSettings = false;
  const authError = null;
  const authChecked = true;
  const appPublicSettings = null;

  const logout = () => {};
  const navigateToLogin = () => {};
  const checkUserAuth = () => {};
  const checkAppState = () => {};

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};