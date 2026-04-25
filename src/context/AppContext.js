import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, role: 'patient' | 'nurse', phone }
  const [requests, setRequests] = useState([]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addRequest = (request) => {
    setRequests(prev => [...prev, { ...request, id: Date.now().toString(), status: 'pending' }]);
  };

  const updateRequestStatus = (id, status) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
  };

  const payRequest = (id, phoneNumber) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'paid', paymentPhone: phoneNumber } : req));
  };

  const acceptRequest = (requestId, nurseId) => {
    setRequests(prev => prev.map(req => req.id === requestId ? { ...req, status: 'confirmed', nurseId } : req));
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout,
      requests,
      addRequest,
      updateRequestStatus,
      payRequest,
      acceptRequest
    }}>
      {children}
    </AppContext.Provider>
  );
};
