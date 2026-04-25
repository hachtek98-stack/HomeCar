import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';

export default function UploadPrescription({ navigation }) {
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const { addRequest } = useAppContext();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!image) {
      Alert.alert("Erreur", "Veuillez télécharger une ordonnance d'abord.");
      return;
    }

    // Create the request
    const requestId = addRequest({
      patientId: user.id,
      patientName: user.name,
      patientAddress: '123 Fake Street, City', // Mock address
      prescriptionImage: image,
    });

    // Navigate to payment
    navigation.navigate('PaymentScreen', { requestId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Télécharger votre ordonnance</Text>
      <Text style={styles.subtitle}>Pour trouver un infirmier, nous avons besoin de votre ordonnance.</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Choisir une photo</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <TouchableOpacity
        style={[styles.continueButton, !image && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!image}
      >
        <Text style={styles.continueButtonText}>Continuer vers le paiement</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
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
    textAlign: 'center',
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    color: '#34495e',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
