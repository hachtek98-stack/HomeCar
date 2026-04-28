import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { AppContext } from '../../context/AppContext';

export default function LoginScreen() {
  const { login } = useContext(AppContext);
  const [phone, setPhone] = useState('');
  const [loadingRole, setLoadingRole] = useState(null);

  const handleLogin = async (role) => {
    if (!phone) {
        alert("Veuillez entrer votre numéro de téléphone");
        return;
    }

    setLoadingRole(role);
    try {
      // Call API login
      await login(role, phone);
    } finally {
      // It's possible the component is unmounted upon successful login,
      // but in case login fails, we reset the loading state.
      setLoadingRole(null);
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
        editable={!loadingRole}
        accessibilityLabel="Numéro de téléphone"
      />

      <View style={styles.buttonContainer}>
        {loadingRole === 'patient' ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <Button
            title="Je suis Patient"
            onPress={() => handleLogin('patient')}
            disabled={loadingRole !== null}
          />
        )}
        <View style={styles.spacer} />
        {loadingRole === 'nurse' ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <Button
            title="Je suis Infirmier"
            onPress={() => handleLogin('nurse')}
            color="#2196F3"
            disabled={loadingRole !== null}
          />
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
