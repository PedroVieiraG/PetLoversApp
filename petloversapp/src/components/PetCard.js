import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function PetCard({ pet, onPress }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(pet.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: pet.image }} style={styles.image} />

      <TouchableOpacity
        style={styles.favBtn}
        onPress={() => toggleFavorite(pet)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={fav ? 'heart' : 'heart-outline'}
          size={22}
          color={fav ? '#FF6B6B' : '#fff'}
        />
      </TouchableOpacity>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{pet.species}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name}>{pet.name}</Text>
          <Ionicons
            name={pet.gender === 'Macho' ? 'male' : 'female'}
            size={16}
            color={pet.gender === 'Macho' ? '#4A90E2' : '#FF6B9D'}
          />
        </View>
        <Text style={styles.breed}>{pet.breed}</Text>

        <View style={styles.footer}>
          <View style={styles.chip}>
            <Ionicons name="time-outline" size={12} color="#666" />
            <Text style={styles.chipText}>{pet.age}</Text>
          </View>
          <View style={styles.chip}>
            <Ionicons name="resize-outline" size={12} color="#666" />
            <Text style={styles.chipText}>{pet.size}</Text>
          </View>
          <View style={styles.chip}>
            <Ionicons name="location-outline" size={12} color="#666" />
            <Text style={styles.chipText} numberOfLines={1}>{pet.location.split(',')[0]}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  favBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 6,
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF8C42',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  info: {
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  breed: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  chipText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
});
