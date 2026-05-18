import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';

export default function LoginScreen() {
  const { login } = useContext(AppContext);
  const [phone, setPhone] = useState('');

  const handleLogin = (role) => {
    if (!phone) {
        alert("Veuillez entrer votre numéro de téléphone");
        return;
    }
    // Call API login
    login(role, phone);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeCar</Text>
      <Text style={styles.subtitle}>Connexion</Text>

      <Text nativeID="phoneLabel" style={styles.label}>Numéro de téléphone</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 771234567"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        accessibilityLabelledBy="phoneLabel"
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Je suis Patient"
          onPress={() => handleLogin('patient')}
          accessibilityLabel="Connexion Patient"
          accessibilityHint="Connectez-vous à votre espace patient"
        />
        <View style={styles.spacer} />
        <Button
          title="Je suis Infirmier"
          onPress={() => handleLogin('nurse')}
          color="#2196F3"
          accessibilityLabel="Connexion Infirmier"
          accessibilityHint="Connectez-vous à votre espace professionnel de santé"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#3f51b5'
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  spacer: {
    height: 15,
  }
});
