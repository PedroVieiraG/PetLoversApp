import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const stored = await AsyncStorage.getItem('@petlovers_favorites');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (e) {
      console.error('Erro ao carregar favoritos:', e);
    }
  }

  async function toggleFavorite(pet) {
    const isFav = favorites.some((f) => f.id === pet.id);
    let updated;
    if (isFav) {
      updated = favorites.filter((f) => f.id !== pet.id);
    } else {
      updated = [...favorites, pet];
    }
    setFavorites(updated);
    try {
      await AsyncStorage.setItem('@petlovers_favorites', JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar favoritos:', e);
    }
  }

  function isFavorite(petId) {
    return favorites.some((f) => f.id === petId);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
