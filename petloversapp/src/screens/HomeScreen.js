import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { CARE_TIPS, PETS } from '../data/pets';

export default function HomeScreen({ navigation }) {
  const { favorites } = useFavorites();
  const featuredPets = PETS.slice(0, 3);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />

      {/* Hero */}
      <ImageBackground
        source={{ uri: 'https://picsum.photos/seed/pets-hero/800/500' }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>🐾 PetLovers</Text>
          <Text style={styles.heroSub}>
            Encontre seu companheiro perfeito e transforme a vida de um animal
          </Text>
          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => navigation.navigate('Explorar')}
          >
            <Text style={styles.heroBtnText}>Ver Pets Disponíveis</Text>
            <Ionicons name="arrow-forward" size={18} color="#FF8C42" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{PETS.length}</Text>
          <Text style={styles.statLabel}>Pets</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {PETS.filter((p) => p.vaccinated).length}
          </Text>
          <Text style={styles.statLabel}>Vacinados</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#FFF3E8' }]}
            onPress={() => navigation.navigate('Explorar')}
          >
            <Ionicons name="paw" size={28} color="#FF8C42" />
            <Text style={styles.actionText}>Adotar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#FFE8EE' }]}
            onPress={() => navigation.navigate('Favoritos')}
          >
            <Ionicons name="heart" size={28} color="#FF6B6B" />
            <Text style={styles.actionText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#E8F4FF' }]}
            onPress={() => navigation.navigate('Perfil')}
          >
            <Ionicons name="person" size={28} color="#4A90E2" />
            <Text style={styles.actionText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#E8FFE8' }]}
            onPress={() => navigation.navigate('Explorar')}
          >
            <Ionicons name="search" size={28} color="#4CAF50" />
            <Text style={styles.actionText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Destaques */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Em Destaque</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explorar')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {featuredPets.map((pet) => (
            <TouchableOpacity
              key={pet.id}
              style={styles.featuredCard}
              onPress={() => navigation.navigate('Explorar', { screen: 'PetDetail', params: { pet } })}
            >
              <ImageBackground
                source={{ uri: pet.image }}
                style={styles.featuredImage}
                imageStyle={{ borderRadius: 14 }}
              >
                <View style={styles.featuredOverlay}>
                  <Text style={styles.featuredName}>{pet.name}</Text>
                  <Text style={styles.featuredBreed}>{pet.breed}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Dicas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dicas de Cuidados 💡</Text>
        {CARE_TIPS.map((tip) => (
          <View key={tip.id} style={styles.tipCard}>
            <Text style={styles.tipIcon}>{tip.icon}</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipText}>{tip.tip}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  hero: { height: 280, margin: 16, borderRadius: 20, overflow: 'hidden' },
  heroImage: { borderRadius: 20 },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26,26,46,0.65)',
    padding: 24,
    justifyContent: 'flex-end',
  },
  heroTitle: { fontSize: 32, fontWeight: '900', color: '#fff', marginBottom: 8 },
  heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 16, lineHeight: 20 },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
  },
  heroBtnText: { color: '#1A1A2E', fontWeight: '700', fontSize: 14 },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 10,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: { fontSize: 28, fontWeight: '900', color: '#FF8C42' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  section: { marginHorizontal: 16, marginTop: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E', marginBottom: 12 },
  seeAll: { color: '#FF8C42', fontWeight: '600', fontSize: 14 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: {
    width: '47%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  actionText: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  horizontalList: { marginHorizontal: -16, paddingHorizontal: 16 },
  featuredCard: { marginRight: 12, width: 160 },
  featuredImage: { height: 200, width: 160, justifyContent: 'flex-end' },
  featuredOverlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 10,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  featuredName: { color: '#fff', fontWeight: '800', fontSize: 16 },
  featuredBreed: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tipIcon: { fontSize: 28 },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginBottom: 2 },
  tipText: { fontSize: 13, color: '#666', lineHeight: 18 },
});
