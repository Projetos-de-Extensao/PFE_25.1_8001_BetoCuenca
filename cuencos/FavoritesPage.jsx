import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header'; // Alterado de ModernHeader para Header
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { ArrowLeft } from 'lucide-react';
import { getEventById } from '../lib/events';
import '../styles/favorites.css';

const FavoritesPage = () => {
  const { isFavorite } = useFavorites();
  const { user } = useAuth();
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  
  useEffect(() => {
    // Carregar os favoritos do localStorage e obter os detalhes dos eventos
    const loadFavorites = async () => {
      if (!user) return;
      
      try {
        // Importamos getFavorites aqui para evitar problemas de circular dependency
        const { getFavorites } = await import('../lib/favorites');
        const favoriteIds = getFavorites(user.id);
        
        // Carregar detalhes de cada evento favorito
        const favorites = [];
        for (const id of favoriteIds) {
          const event = getEventById(id);
          if (event) favorites.push(event);
        }
        
        setFavoriteEvents(favorites);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };
    
    loadFavorites();
  }, [user]);
  
  // Redirecionar para a página de login se não estiver autenticado
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header /> {/* Substituído ModernHeader por Header */}
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link to="/" className="text-white mr-2 hover:text-gray-300">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold text-white">
              <img 
                src="/assets/heart-icon.png" 
                alt="Ícone de favoritos" 
                className="inline-block mr-2 h-8 w-8 align-text-bottom"
              />
              Favoritos
            </h1>
          </div>
          
          {favoriteEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  isFavorite={isFavorite(event.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg p-12 text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h2 className="text-2xl font-bold text-white mb-4">Você ainda não tem favoritos</h2>
              <p className="text-gray-400 mb-6">Adicione eventos aos seus favoritos para encontrá-los facilmente aqui.</p>
              <Link 
                to="/"
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-md inline-block"
              >
                Explorar Eventos
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FavoritesPage;
