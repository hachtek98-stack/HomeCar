import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../context/AppContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';

// Patient Screens
import PatientDashboard from '../screens/patient/PatientDashboard';
import UploadPrescription from '../screens/patient/UploadPrescription';
import PaymentScreen from '../screens/patient/PaymentScreen';

// Nurse Screens
import NurseDashboard from '../screens/nurse/NurseDashboard';
import RequestDetails from '../screens/nurse/RequestDetails';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          // Auth Flow
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : user.role === 'patient' ? (
          // Patient Flow
          <>
            <Stack.Screen name="PatientDashboard" component={PatientDashboard} options={{ title: 'Mon Tableau de Bord' }} />
            <Stack.Screen name="UploadPrescription" component={UploadPrescription} options={{ title: 'Ordonnance' }} />
            <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Paiement' }} />
          </>
        ) : (
          // Nurse Flow
          <>
            <Stack.Screen name="NurseDashboard" component={NurseDashboard} options={{ title: 'Demandes de Prélèvement' }} />
            <Stack.Screen name="RequestDetails" component={RequestDetails} options={{ title: 'Détails de la demande' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
