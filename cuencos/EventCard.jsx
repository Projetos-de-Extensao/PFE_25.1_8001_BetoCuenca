import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/ui/use-toast';
import { Heart } from 'lucide-react';
import '../styles/eventCard.css';

const EventCard = ({ event }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const favorite = isFavorite(event.id);
  
  // Extrair mês da data do evento
  const getMonthAbbreviation = (dateString) => {
    if (!dateString) return 'MAY';
    
    // Extrai o mês da string de data (formato esperado: "19 de Jun")
    const parts = dateString.split(' ');
    if (parts.length >= 3) {
      return parts[2].toUpperCase();
    }
    return dateString.split(' ')[1]?.toUpperCase() || 'MAY';
  };
  
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Ação necessária",
        description: "Faça login para adicionar eventos aos favoritos",
        variant: "warning"
      });
      return;
    }
    
    // Correção: Passando o ID do evento em vez do objeto evento completo
    const result = toggleFavorite(event.id);
    
    toast({
      title: favorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: favorite ? "O evento foi removido dos seus favoritos" : "O evento foi adicionado aos seus favoritos",
      variant: favorite ? "default" : "success"
    });
  };
  
  return (
    <div className="event-card">
      <Link to={`/events/${event.id}`} className="event-card-link">
        <div className="event-card-image-container">
          <img 
            src={event.image} 
            alt={event.title} 
            className="event-card-image"
          />
          
          <button 
            className={`favorite-button ${favorite ? 'favorited' : ''}`} 
            onClick={handleToggleFavorite}
            aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart 
              className={`h-6 w-6 ${favorite ? 'fill-cuencos-purple text-cuencos-purple' : 'text-white'}`}
            />
          </button>
        </div>
        
        <div className="event-card-content">
          <div className="event-card-month">
            {getMonthAbbreviation(event.date)}
          </div>
          <h3 className="event-card-title">{event.title}</h3>
          <p className="event-card-description">{event.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
