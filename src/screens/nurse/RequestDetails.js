import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RequestDetails() {
  const { user, acceptRequest } = useContext(AppContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { request } = route.params;

  const handleAccept = () => {
    acceptRequest(request.id, user.id);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Détails de la demande</Text>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>Ordonnance du patient :</Text>
        <Image source={{ uri: request.prescriptionImage }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.status}>
          Statut : {request.status === 'paid' ? 'En attente' : 'Acceptée'}
        </Text>

        {/* Reveal patient phone number ONLY if the nurse has accepted */}
        {request.status === 'confirmed' && request.nurseId === user.id ? (
          <View style={styles.contactCard}>
            <Text style={styles.successText}>Demande acceptée !</Text>
            <Text style={styles.contactText}>Vous pouvez contacter le patient au :</Text>
            <Text style={styles.phoneText}>{request.patientPhone}</Text>
          </View>
        ) : (
          <Button
            title="Accepter la demande"
            onPress={handleAccept}
            color="#4CAF50"
          />
        )}
      </View>
    </ScrollView>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  infoContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  contactCard: {
    padding: 20,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    alignItems: 'center',
  },
  successText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 5,
  },
  phoneText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1565c0',
  }
});
