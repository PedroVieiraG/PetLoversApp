import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PetCard from '../components/PetCard';
import { PETS } from '../data/pets';

const FILTERS = ['Todos', 'Cachorro', 'Gato'];
const PAGE_SIZE = 6;

export default function PetListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return PETS.filter((p) => {
      const matchFilter = filter === 'Todos' || p.species === filter;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.breed.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [search, filter]);

  const displayed = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);

  const loadMore = useCallback(() => {
    if (loading || displayed.length >= filtered.length) return;
    setLoading(true);
    setTimeout(() => {
      setPage((p) => p + 1);
      setLoading(false);
    }, 600);
  }, [loading, displayed.length, filtered.length]);

  const handleSearch = (text) => {
    setSearch(text);
    setPage(1);
  };

  const handleFilter = (f) => {
    setFilter(f);
    setPage(1);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <PetCard
        pet={item}
        onPress={() => navigation.navigate('PetDetail', { pet: item })}
      />
    ),
    [navigation]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const ListHeader = (
    <View>
      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome, raça ou cidade..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={handleSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtros */}
      <View style={styles.filtersRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => handleFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'Cachorro' ? '🐶 ' : f === 'Gato' ? '🐱 ' : '🐾 '}
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.resultsCount}>
        {filtered.length} pet{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );

  const ListFooter = loading ? (
    <ActivityIndicator size="small" color="#FF8C42" style={{ marginVertical: 16 }} />
  ) : displayed.length < filtered.length ? (
    <TouchableOpacity style={styles.loadMoreBtn} onPress={loadMore}>
      <Text style={styles.loadMoreText}>Carregar mais</Text>
    </TouchableOpacity>
  ) : (
    <Text style={styles.endText}>✓ Todos os pets exibidos</Text>
  );

  const ListEmpty = (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>Nenhum pet encontrado</Text>
      <Text style={styles.emptyText}>Tente outro filtro ou palavra-chave</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayed}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={ListEmpty}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        removeClippedSubviews={true}
        maxToRenderPerBatch={6}
        windowSize={10}
        initialNumToRender={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  list: { paddingBottom: 24 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#333' },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  filterChipActive: {
    backgroundColor: '#FF8C42',
    borderColor: '#FF8C42',
  },
  filterText: { fontSize: 13, fontWeight: '600', color: '#666' },
  filterTextActive: { color: '#fff' },
  resultsCount: {
    marginHorizontal: 16,
    marginBottom: 4,
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  loadMoreBtn: {
    margin: 16,
    padding: 14,
    backgroundColor: '#FF8C42',
    borderRadius: 14,
    alignItems: 'center',
  },
  loadMoreText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  endText: { textAlign: 'center', color: '#aaa', padding: 16, fontSize: 13 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 50, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 6 },
  emptyText: { fontSize: 14, color: '#888' },
});
