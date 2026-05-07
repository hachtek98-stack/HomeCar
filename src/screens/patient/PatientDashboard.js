import React, { useContext, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

const getStatusText = (status) => {
  switch (status) {
    case 'pending': return 'En attente de paiement';
    case 'paid': return 'En attente d\'un infirmier';
    case 'confirmed': return 'Confirmé par un infirmier';
    default: return status;
  }
};

export default function PatientDashboard() {
  const { user, requests, logout } = useContext(AppContext);
  const navigation = useNavigation();

  // Filter requests for the current patient
  // ⚡ Bolt: Wrap derived list in useMemo to preserve reference equality and prevent unnecessary FlatList re-renders
  const patientRequests = useMemo(() => {
    return requests.filter(req => req.patientId === user?.id);
  }, [requests, user?.id]);

  // ⚡ Bolt: Memoize renderItem with useCallback to prevent re-rendering list items on parent render
  const renderItem = useCallback(({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>Demande du {new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.status}>Statut : {getStatusText(item.status)}</Text>
      {item.status === 'pending' && (
        <Button
          title="Payer maintenant"
          onPress={() => navigation.navigate('Payment', { requestId: item.id })}
        />
      )}
    </View>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bonjour, {user.name}</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Nouvelle demande de prélèvement"
        onPress={() => navigation.navigate('UploadPrescription')}
        color="#4CAF50"
      />

      <Text style={styles.subtitle}>Mes demandes :</Text>
      <FlatList
        data={patientRequests}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Aucune demande en cours</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logout: {
    color: '#f44336',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    color: '#666',
    marginBottom: 10,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  }
});
