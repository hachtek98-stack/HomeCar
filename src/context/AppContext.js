import React, { createContext, useState, useEffect } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const AppContext = createContext();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Dynamically determine backend URL.
// Android emulators use 10.0.2.2. Web/iOS Simulator use localhost.
// For physical devices, you must replace this with your computer's local IP (e.g., 192.168.1.X)
const BACKEND_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const API_URL = `http://${BACKEND_HOST}:3000/api`;

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async (currentUser) => {
    try {
      let url = `${API_URL}/requests`;
      // If patient, only fetch their requests. If nurse, fetch all relevant requests.
      // In a real app, backend should handle role-based filtering based on auth token.
      if (currentUser && currentUser.role === 'patient') {
        url += `?patientId=${currentUser.id}`;
      } else if (currentUser && currentUser.role === 'nurse') {
        url += `?nurseId=${currentUser.id}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const registerForPushNotificationsAsync = async (userId) => {
    let token;
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      try {
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

        // Send token to backend
        await fetch(`${API_URL}/users/${userId}/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pushToken: token })
        });
      } catch (e) {
        console.error("Push token error", e);
      }
    } else {
      console.log('Must use physical device for Push Notifications');
    }
    return token;
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
        fetchRequests(data); // Initial fetch on login
        registerForPushNotificationsAsync(data.id); // Register push token
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
        fetchRequests(user); // Refresh requests
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
        fetchRequests(user); // Refresh requests
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
        fetchRequests(user); // Refresh requests
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
