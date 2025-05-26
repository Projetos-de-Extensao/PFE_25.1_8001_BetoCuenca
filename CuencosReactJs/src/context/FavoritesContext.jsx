
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getFavorites, toggleFavorite as toggleFavoriteInStorage, isFavorite as checkIsFavorite } from '../lib/favorites';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Carregar favoritos do localStorage quando o usuário mudar
  useEffect(() => {
    if (user) {
      try {
        const userFavorites = getFavorites(user.id);
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      } finally {
        setLoaded(true);
      }
    } else {
      setFavorites([]);
      setLoaded(true);
    }
  }, [user]);

  // Função para adicionar/remover favorito
  const toggleFavorite = (eventId) => {
    if (!user) return false;
    
    try {
      const isFav = toggleFavoriteInStorage(user.id, eventId);
      
      // Atualizar o estado local de forma otimista
      setFavorites(prev => 
        isFav 
          ? [...prev, eventId] 
          : prev.filter(id => id !== eventId)
      );
      
      return isFav;
    } catch (error) {
      console.error("Erro ao alterar favorito:", error);
      return false;
    }
  };
  
  // Verificar se um evento está nos favoritos
  const isFavorite = (eventId) => {
    if (!user || !loaded) return false;
    return favorites.includes(eventId);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      isFavorite,
      isLoading: !loaded
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
