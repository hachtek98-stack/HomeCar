import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';

export default function RequestDetails({ route, navigation }) {
  const { requestId } = route.params;
  const { user } = useAuth();
  const { requests, acceptRequest, completeRequest } = useAppContext();

  const request = requests.find(req => req.id === requestId);

  if (!request) {
    return <Text style={{padding: 20}}>Demande introuvable.</Text>;
  }

  const isAccepted = request.status === 'accepted';
  const isMine = request.nurseId === user.id;

  const handleAccept = () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous accepter cette demande de prélèvement ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Accepter", onPress: () => {
            acceptRequest(requestId, user.id);
            Alert.alert("Succès", "Vous avez accepté cette demande. Les coordonnées du patient sont maintenant visibles.");
        }}
      ]
    );
  };

  const handleComplete = () => {
    completeRequest(requestId);
    Alert.alert("Terminé", "La demande de prélèvement est marquée comme terminée.");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ordonnance</Text>
        {request.prescriptionImage ? (
          <Image source={{ uri: request.prescriptionImage }} style={styles.image} />
        ) : (
          <Text style={styles.noImageText}>Aucune image (Ordonnance au format texte simulé)</Text>
        )}
      </View>

      {/* Conditional Rendering of Patient Details based on critical flow */}
      <View style={styles.card}>
        <Text style={styles.title}>Informations</Text>

        {isAccepted && isMine ? (
          // Revealed details
          <>
            <Text style={styles.detailText}>Nom du patient : {request.patientName}</Text>
            <Text style={styles.detailText}>Adresse : {request.patientAddress}</Text>
            <Text style={styles.detailText}>Téléphone : 77 00 00 00 (Contact visible)</Text>
          </>
        ) : (
          // Hidden details
          <>
            <Text style={styles.hiddenText}>Les coordonnées du patient seront affichées après acceptation de la demande.</Text>
            <Text style={styles.detailText}>Zone estimée : Quartier Centre</Text>
          </>
        )}
      </View>

      {!isAccepted && (
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.acceptButtonText}>Accepter la demande</Text>
        </TouchableOpacity>
      )}

      {isAccepted && isMine && request.status !== 'completed' && (
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Marquer comme terminé</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
  },
  noImageText: {
    fontStyle: 'italic',
    color: '#7f8c8d',
    textAlign: 'center',
    padding: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  hiddenText: {
    fontStyle: 'italic',
    color: '#e67e22',
    marginBottom: 15,
  },
  acceptButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
