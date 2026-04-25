import React, { useState, useContext } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function UploadPrescription() {
  const [image, setImage] = useState(null);
  const { addRequest, user } = useContext(AppContext);
  const navigation = useNavigation();

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

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("L'accès à la caméra est requis!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!image) {
      alert('Veuillez sélectionner une image de votre ordonnance');
      return;
    }

    addRequest({
      patientId: user.id,
      prescriptionImage: image,
      patientPhone: user.phone // Phone is kept but hidden until confirmed
    });

    navigation.navigate('PatientDashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Envoyer mon ordonnance</Text>

      <View style={styles.buttonGroup}>
        <Button title="Prendre une photo" onPress={takePhoto} />
        <View style={styles.spacer} />
        <Button title="Choisir depuis la galerie" onPress={pickImage} color="#607D8B" />
      </View>

      {image && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Aperçu :</Text>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      <View style={styles.submitContainer}>
        <Button
          title="Soumettre la demande"
          onPress={handleSubmit}
          disabled={!image}
          color="#4CAF50"
        />
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    marginBottom: 20,
  },
  spacer: {
    height: 10,
  },
  previewContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  previewText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitContainer: {
    marginTop: 'auto',
    marginBottom: 20,
  }
});
