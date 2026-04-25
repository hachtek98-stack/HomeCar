import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in
  // user format: { id: '1', role: 'patient' | 'nurse', name: 'John Doe', phone: '12345678' }

  const login = (role) => {
    // Mock login
    setUser({ id: Math.random().toString(), role, name: role === 'patient' ? 'Test Patient' : 'Test Nurse', phone: '12345678' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
