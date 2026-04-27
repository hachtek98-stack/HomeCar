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
      <Text style={styles.title}>HomeCar</Text>
      <Text style={styles.subtitle}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        accessibilityLabel="Numéro de téléphone"
      />

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#3f51b5" />
        ) : (
          <>
            <Button
              title="Je suis Patient"
              onPress={() => handleLogin('patient')}
              disabled={!phone}
            />
            <View style={styles.spacer} />
            <Button
              title="Je suis Infirmier"
              onPress={() => handleLogin('nurse')}
              color="#2196F3"
              disabled={!phone}
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
  buttonContainer: {
    marginTop: 20,
  },
  spacer: {
    height: 15,
  }
});
