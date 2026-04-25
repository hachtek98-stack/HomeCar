import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function PaymentScreen({ route, navigation }) {
  const { requestId } = route.params;
  const { updateRequestPayment } = useAppContext();
  const [phone, setPhone] = useState('');

  const handlePayment = () => {
    if (!phone || phone.length < 8) {
      Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone valide.');
      return;
    }

    // Simulate Payment Processing
    setTimeout(() => {
      updateRequestPayment(requestId);
      Alert.alert(
        "Paiement Réussi",
        "Votre demande est maintenant en attente d'un infirmier.",
        [{ text: "OK", onPress: () => navigation.popToTop() }] // Go back to dashboard
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paiement Mobile Money</Text>
      <Text style={styles.subtitle}>Payez via D-Money ou Waafi pour valider votre demande.</Text>

      <Text style={styles.label}>Numéro de téléphone</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="Ex: 77 12 34 56"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Payer et Valider</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 30,
    backgroundColor: '#ecf0f1',
  },
  payButton: {
    backgroundColor: '#f39c12',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
