import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { AppContext } from '../../context/AppContext';

export default function LoginScreen() {
  const { login } = useContext(AppContext);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (role) => {
    if (!phone) {
        alert("Veuillez entrer votre numéro de téléphone");
        return;
    }

    setIsLoading(true);
    try {
      // Call API login
      await login(role, phone);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">HomeCar</Text>
      <Text style={styles.subtitle}>Connexion</Text>

      <TextInput
        style={[styles.input, isLoading && styles.inputDisabled]}
        placeholder="Numéro de téléphone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        editable={!isLoading}
        accessibilityLabel="Numéro de téléphone"
        accessibilityHint="Saisissez votre numéro de téléphone pour vous connecter"
      />

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#3f51b5" accessibilityLabel="Connexion en cours" />
        ) : (
          <>
            <Button
              title="Je suis Patient"
              onPress={() => handleLogin('patient')}
              accessibilityLabel="Se connecter en tant que patient"
              accessibilityHint="Connectez-vous à votre espace patient"
            />
            <View style={styles.spacer} />
            <Button
              title="Je suis Infirmier"
              onPress={() => handleLogin('nurse')}
              color="#2196F3"
              accessibilityLabel="Se connecter en tant qu'infirmier"
              accessibilityHint="Connectez-vous à votre espace infirmier"
            />
          </>
        )}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#a0a0a0',
  },
  buttonContainer: {
    marginTop: 20,
    minHeight: 100, // Reserve space to prevent layout jump
    justifyContent: 'center',
  },
  spacer: {
    height: 15,
  }
});
