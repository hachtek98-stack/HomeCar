import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

// Import Screens (to be created)
import LoginScreen from '../screens/LoginScreen';
import PatientDashboard from '../screens/patient/PatientDashboard';
import UploadPrescription from '../screens/patient/UploadPrescription';
import PaymentScreen from '../screens/patient/PaymentScreen';
import NurseDashboard from '../screens/nurse/NurseDashboard';
import RequestDetails from '../screens/nurse/RequestDetails';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user === null ? (
        // Not logged in
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      ) : user.role === 'patient' ? (
        // Patient Flow
        <>
          <Stack.Screen name="PatientDashboard" component={PatientDashboard} options={{ title: 'Mon Tableau de Bord' }} />
          <Stack.Screen name="UploadPrescription" component={UploadPrescription} options={{ title: 'Ordonnance' }} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Paiement' }} />
        </>
      ) : (
        // Nurse Flow
        <>
          <Stack.Screen name="NurseDashboard" component={NurseDashboard} options={{ title: 'Demandes Disponibles' }} />
          <Stack.Screen name="RequestDetails" component={RequestDetails} options={{ title: 'Détails de la demande' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
