import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function PaymentScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { payRequest } = useContext(AppContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { requestId } = route.params;

  const handlePayment = () => {
    if (!phoneNumber) {
      alert('Veuillez entrer un numéro de téléphone valide');
      return;
    }

    // Simulate payment process (e.g. D-Money/Waafi API call would go here)
    Alert.alert(
      "Paiement initié",
      "Veuillez valider le paiement sur votre téléphone.",
      [
        {
          text: "OK",
          onPress: () => {
            // Update status to paid after user confirms
            payRequest(requestId, phoneNumber);
            navigation.navigate('PatientDashboard');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paiement Mobile Money</Text>
      <Text style={styles.description}>
        Entrez votre numéro D-Money ou Waafi pour régler les frais de déplacement de l'infirmier.
      </Text>

      <Text style={styles.label} nativeID="paymentPhoneLabel">Numéro de téléphone D-Money / Waafi</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: 77..."
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        accessibilityLabelledBy="paymentPhoneLabel"
      />

      <Button
        title="Valider le paiement"
        onPress={handlePayment}
        color="#4CAF50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 18,
  }
});
