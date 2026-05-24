import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';

export default function NurseDashboard({ navigation }) {
  const { user, logout } = useAuth();
  const { requests } = useAppContext();

  // Nurses can see pending, paid requests (available), or their own accepted requests.
  const availableRequests = requests.filter(req => req.paymentStatus === 'paid' && req.status === 'pending');
  const myAcceptedRequests = requests.filter(req => req.nurseId === user.id);

  const displayData = [...myAcceptedRequests, ...availableRequests];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RequestDetails', { requestId: item.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.requestId}>Demande #{item.id.slice(0, 4)}...</Text>
        <Text style={[styles.statusBadge, item.status === 'accepted' ? styles.statusAccepted : styles.statusPending]}>
          {item.status === 'accepted' ? 'Acceptée' : 'Nouvelle'}
        </Text>
      </View>
      <Text style={styles.infoText}>Zone: Quartier à définir (Distance: ~2km)</Text>
      <Text style={styles.actionText}>Appuyez pour voir l'ordonnance et les détails</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonjour, Infirmier {user.name}</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Demandes de prélèvement</Text>

      <FlatList
        data={displayData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Aucune demande disponible pour le moment.</Text>}
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  requestId: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  statusPending: {
    backgroundColor: '#f39c12',
  },
  statusAccepted: {
    backgroundColor: '#27ae60',
  },
  infoText: {
    color: '#7f8c8d',
    marginBottom: 10,
  },
  actionText: {
    color: '#3498db',
    fontWeight: 'bold',
    textAlign: 'right',
  }
});
