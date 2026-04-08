import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

export default function PetDetailScreen({ route, navigation }) {
  const { pet } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(pet.id);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  function handleAdopt() {
    Alert.alert(
      '🐾 Solicitação de Adoção',
      `Você tem certeza que deseja solicitar a adoção de ${pet.name}?\n\nEntraremos em contato em até 24 horas!`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          style: 'default',
          onPress: () => {
            Alert.alert(
              '✅ Solicitação Enviada!',
              `Sua solicitação para adotar ${pet.name} foi enviada com sucesso! Nossa equipe entrará em contato em breve.`,
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          },
        },
      ]
    );
  }

  const infoBadge = (icon, label, value, color = '#FF8C42') => (
    <View style={styles.infoBadge}>
      <Ionicons name={icon} size={18} color={color} />
      <View>
        <Text style={styles.infoBadgeLabel}>{label}</Text>
        <Text style={styles.infoBadgeValue}>{value}</Text>
      </View>
    </View>
  );

  const checkBadge = (label, value) => (
    <View style={styles.checkRow}>
      <Ionicons
        name={value ? 'checkmark-circle' : 'close-circle'}
        size={20}
        color={value ? '#4CAF50' : '#FF5252'}
      />
      <Text style={styles.checkText}>{label}</Text>
    </View>
  );

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Imagem principal */}
        <TouchableOpacity onPress={() => { setSelectedImg(pet.image); setModalVisible(true); }}>
          <Image source={{ uri: pet.image }} style={styles.mainImage} />
        </TouchableOpacity>

        {/* Header info */}
        <View style={styles.headerCard}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Ionicons
                  name={pet.gender === 'Macho' ? 'male' : 'female'}
                  size={20}
                  color={pet.gender === 'Macho' ? '#4A90E2' : '#FF6B9D'}
                />
              </View>
              <Text style={styles.petBreed}>{pet.breed}</Text>
            </View>
            <TouchableOpacity
              style={[styles.favBtn, fav && styles.favBtnActive]}
              onPress={() => toggleFavorite(pet)}
            >
              <Ionicons
                name={fav ? 'heart' : 'heart-outline'}
                size={24}
                color={fav ? '#fff' : '#FF6B6B'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location" size={15} color="#FF8C42" />
            <Text style={styles.locationText}>{pet.location}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {pet.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Info grid */}
        <View style={styles.infoGrid}>
          {infoBadge('time-outline', 'Idade', pet.age)}
          {infoBadge('resize-outline', 'Porte', pet.size, '#4A90E2')}
          {infoBadge('color-palette-outline', 'Cor', pet.color, '#9C27B0')}
          {infoBadge('transgender-outline', 'Sexo', pet.gender, '#4CAF50')}
        </View>

        {/* Saúde */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saúde & Documentação</Text>
          <View style={styles.healthCard}>
            {checkBadge('Vacinado', pet.vaccinated)}
            {checkBadge('Castrado / Esterilizado', pet.neutered)}
            {checkBadge('Microchipado', pet.microchipped)}
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre {pet.name}</Text>
          <View style={styles.descCard}>
            <Text style={styles.descText}>{pet.description}</Text>
          </View>
        </View>

        {/* Cuidados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuidados Especiais</Text>
          <View style={styles.careCard}>
            <Ionicons name="information-circle" size={20} color="#4A90E2" />
            <Text style={styles.careText}>{pet.care}</Text>
          </View>
        </View>

        {/* Galeria */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Galeria de Fotos</Text>
          <FlatList
            data={[pet.image, ...pet.gallery]}
            keyExtractor={(item, i) => i.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { setSelectedImg(item); setModalVisible(true); }}>
                <Image source={{ uri: item }} style={styles.galleryImg} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botão fixo */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.adoptBtn} onPress={handleAdopt}>
          <Ionicons name="paw" size={22} color="#fff" />
          <Text style={styles.adoptBtnText}>Quero Adotar {pet.name}!</Text>
        </TouchableOpacity>
      </View>

      {/* Modal imagem */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modal}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <Image source={{ uri: selectedImg }} style={styles.modalImage} resizeMode="contain" />
          <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  mainImage: { width: '100%', height: 300, backgroundColor: '#e0e0e0' },
  headerCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  petName: { fontSize: 28, fontWeight: '900', color: '#1A1A2E' },
  petBreed: { fontSize: 15, color: '#888' },
  favBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnActive: { backgroundColor: '#FF6B6B', borderColor: '#FF6B6B' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  locationText: { color: '#666', fontSize: 13 },
  tagsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: { backgroundColor: '#FFF3E8', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { color: '#FF8C42', fontSize: 12, fontWeight: '600' },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  infoBadge: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  infoBadgeLabel: { fontSize: 11, color: '#aaa', fontWeight: '500' },
  infoBadgeValue: { fontSize: 14, color: '#1A1A2E', fontWeight: '700' },
  section: { marginHorizontal: 16, marginTop: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1A1A2E', marginBottom: 10 },
  healthCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkText: { fontSize: 15, color: '#333', fontWeight: '500' },
  descCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  descText: { fontSize: 15, color: '#444', lineHeight: 24 },
  careCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#E8F4FF',
    borderRadius: 14,
    padding: 14,
    alignItems: 'flex-start',
  },
  careText: { flex: 1, fontSize: 14, color: '#2C5F8A', lineHeight: 20 },
  galleryImg: {
    width: 130,
    height: 130,
    borderRadius: 14,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  adoptBtn: {
    backgroundColor: '#FF8C42',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  adoptBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: { width: width, height: width },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 8,
  },
});
