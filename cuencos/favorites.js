
// Favorites management with localStorage
const STORAGE_KEY = 'user_favorites';

// Recuperar favoritos do localStorage
const getUserFavorites = (userId) => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const allFavorites = JSON.parse(storedData);
      return allFavorites[userId] || [];
    }
  } catch (error) {
    console.error("Erro ao recuperar favoritos:", error);
  }
  return [];
};

// Salvar favoritos no localStorage
const saveUserFavorites = (userId, favorites) => {
  try {
    let allFavorites = {};
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
      allFavorites = JSON.parse(storedData);
    }
    
    allFavorites[userId] = favorites;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allFavorites));
  } catch (error) {
    console.error("Erro ao salvar favoritos:", error);
  }
};

export const getFavorites = (userId) => {
  return getUserFavorites(userId);
};

export const toggleFavorite = (userId, eventId) => {
  if (!userId) return false;
  
  const favorites = getUserFavorites(userId);
  const index = favorites.indexOf(eventId);
  
  if (index >= 0) {
    // Remove dos favoritos
    favorites.splice(index, 1);
    saveUserFavorites(userId, favorites);
    return false;
  } else {
    // Adiciona aos favoritos
    favorites.push(eventId);
    saveUserFavorites(userId, favorites);
    return true;
  }
};

export const isFavorite = (userId, eventId) => {
  if (!userId) return false;
  
  const favorites = getUserFavorites(userId);
  return favorites.includes(eventId);
};

// Initialize favorites for testing
const initializeFavorites = () => {
  const defaultUser = "johnfrontend@gmail.com";
  const currentFavorites = getUserFavorites(defaultUser);
  
  // Only initialize if the user has no favorites yet
  if (currentFavorites.length === 0) {
    // Set default favorites for the test user (events 1 and 3)
    saveUserFavorites(defaultUser, [1, 3]);
  }
};

// Run initialization
initializeFavorites();
