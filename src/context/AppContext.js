import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Array of request objects: { id, patientId, prescriptionImage, paymentStatus, status, nurseId }
  const [requests, setRequests] = useState([
    {
      id: 'req1',
      patientId: 'p1',
      patientName: 'Alice',
      patientAddress: '123 Main St',
      prescriptionImage: null,
      paymentStatus: 'paid', // pending, paid
      status: 'pending', // pending, accepted, completed
      nurseId: null,
    }
  ]);

  const addRequest = (requestData) => {
    const newReq = {
      id: Math.random().toString(),
      ...requestData,
      paymentStatus: 'pending',
      status: 'pending',
      nurseId: null,
    };
    setRequests([...requests, newReq]);
    return newReq.id;
  };

  const updateRequestPayment = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, paymentStatus: 'paid' } : req));
  };

  const acceptRequest = (reqId, nurseId) => {
    setRequests(requests.map(req => req.id === reqId ? { ...req, status: 'accepted', nurseId } : req));
  };

  const completeRequest = (reqId) => {
    setRequests(requests.map(req => req.id === reqId ? { ...req, status: 'completed' } : req));
  };

  return (
    <AppContext.Provider value={{ requests, addRequest, updateRequestPayment, acceptRequest, completeRequest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
