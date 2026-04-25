import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HomeCar</Text>
      <Text style={styles.subtitle}>Service de prélèvement à domicile</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => login('patient')}>
          <Text style={styles.buttonText}>Connexion Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.nurseButton]} onPress={() => login('nurse')}>
          <Text style={styles.buttonText}>Connexion Infirmier</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  nurseButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
