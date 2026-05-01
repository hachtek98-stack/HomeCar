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
        accessibilityLabelledBy="phoneLabel"
        style={styles.input}
        placeholder="ex: 77..."
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <View style={styles.buttonContainer}>
        <Button title="Je suis Patient" onPress={() => handleLogin('patient')} />
        <View style={styles.spacer} />
        <Button title="Je suis Infirmier" onPress={() => handleLogin('nurse')} color="#2196F3" />
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
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
