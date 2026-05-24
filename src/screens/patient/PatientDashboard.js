import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';

export default function PatientDashboard({ navigation }) {
  const { user, logout } = useAuth();
  const { requests } = useAppContext();

  const myRequests = requests.filter(req => req.patientId === user.id);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.statusText}>Statut: {item.status}</Text>
      <Text style={styles.statusText}>Paiement: {item.paymentStatus}</Text>
      {item.status === 'accepted' && (
        <Text style={styles.nurseInfo}>Un infirmier a accepté votre demande et est en route.</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonjour, {user.name}</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.newRequestButton}
        onPress={() => navigation.navigate('UploadPrescription')}
      >
        <Text style={styles.newRequestText}>+ Nouvelle demande de prélèvement</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Mes demandes</Text>

      <FlatList
        data={myRequests}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Aucune demande en cours.</Text>}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  newRequestButton: {
    backgroundColor: '#3498db',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  newRequestText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 5,
  },
  nurseInfo: {
    marginTop: 10,
    color: '#27ae60',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#7f8c8d',
  }
});
