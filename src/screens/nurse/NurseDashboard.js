import React, { useContext, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function NurseDashboard() {
  const { user, requests, logout } = useContext(AppContext);
  const navigation = useNavigation();

  // Nurses only see requests that are 'paid' (ready to be picked up) or assigned to them
  // Optimized: Memoize to prevent breaking FlatList's internal PureComponent optimizations
  const availableRequests = useMemo(() => {
    return requests.filter(req => req.status === 'paid' || (req.status === 'confirmed' && req.nurseId === user.id));
  }, [requests, user.id]);

  // Optimized: useCallback to avoid recreating function on each render
  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RequestDetails', { request: item })}
    >
      <Text style={styles.date}>Demande du {new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.status}>
        Statut : {item.status === 'paid' ? 'Nouvelle demande' : 'Acceptée par vous'}
      </Text>
      <Text style={styles.details}>Appuyez pour voir l'ordonnance</Text>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Espace Infirmier</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Demandes disponibles</Text>
      <FlatList
        data={availableRequests}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Aucune demande en attente</Text>}
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
    marginBottom: 10,
    fontWeight: 'bold',
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#e3f2fd',
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    color: '#1565c0',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    color: '#666',
    fontSize: 12,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  }
});
