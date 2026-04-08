import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PetCard from '../components/PetCard';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="heart-outline" size={80} color="#FFCDD2" />
        <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
        <Text style={styles.emptyText}>
          Toque no ❤️ em qualquer pet para salvá-lo aqui!
        </Text>
        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={() => navigation.navigate('Explorar')}
        >
          <Text style={styles.exploreBtnText}>Explorar Pets</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PetCard
            pet={item}
            onPress={() => navigation.navigate('Explorar', { screen: 'PetDetail', params: { pet: item } })}
          />
        )}
        ListHeaderComponent={
          <Text style={styles.count}>
            {favorites.length} pet{favorites.length !== 1 ? 's' : ''} salvo{favorites.length !== 1 ? 's' : ''}
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  count: {
    marginHorizontal: 16,
    marginVertical: 12,
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 32,
  },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: '#1A1A2E', marginTop: 20, marginBottom: 8 },
  emptyText: { fontSize: 15, color: '#888', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  exploreBtn: {
    backgroundColor: '#FF8C42',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  exploreBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
