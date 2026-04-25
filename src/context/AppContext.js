import React, { createContext, useState } from 'react';

export const AppContext = createContext();

// Use the local IP of the machine running the backend for the React Native app to reach it
import { Platform } from 'react-native';

// Dynamically determine backend URL.
// Android emulators use 10.0.2.2. Web/iOS Simulator use localhost.
// For physical devices, you must replace this with your computer's local IP (e.g., 192.168.1.X)
const BACKEND_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const API_URL = `http://${BACKEND_HOST}:3000/api`;

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/requests`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const login = async (role, phone) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, phone })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        fetchRequests(); // Initial fetch on login
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Erreur de connexion au serveur");
    }
  };

  const logout = () => {
    setUser(null);
    setRequests([]);
  };

  const addRequest = async (requestData) => {
    try {
      const response = await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      if (response.ok) {
        fetchRequests(); // Refresh requests
      }
    } catch (error) {
      console.error("Error adding request:", error);
    }
  };

  const payRequest = async (id, paymentPhone) => {
    try {
      const response = await fetch(`${API_URL}/requests/${id}/pay`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentPhone })
      });
      if (response.ok) {
        fetchRequests(); // Refresh requests
      }
    } catch (error) {
      console.error("Error paying request:", error);
    }
  };

  const acceptRequest = async (requestId, nurseId) => {
    try {
      const response = await fetch(`${API_URL}/requests/${requestId}/accept`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nurseId })
      });
      if (response.ok) {
        fetchRequests(); // Refresh requests
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout,
      requests,
      addRequest,
      fetchRequests,
      payRequest,
      acceptRequest
    }}>
      {children}
    </AppContext.Provider>
  );
};
