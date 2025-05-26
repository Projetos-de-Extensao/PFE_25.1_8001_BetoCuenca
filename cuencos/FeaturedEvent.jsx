import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FeaturedEvent = ({ event }) => {
  const navigate = useNavigate();
  
  const handleBuyClick = (e) => {
    e.preventDefault();
    navigate(`/events/${event.id}/buy`);
  };
  
  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    navigate(`/events/${event.id}`);
  };
  
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-r from-purple-900 to-purple-800 overflow-hidden">
      {/* Sobreposição de cor roxa */}
      <div className="absolute inset-0 bg-purple-900/70"></div>
      
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <img 
p          src={event.image || "/assets/events/puc-in-rio.png"} 
          alt={event.title}
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      
      {/* Conteúdo */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-24 relative z-10">
        <h1 className="text-6xl font-bold text-white mb-4">{event.title || "PUC IN RIO"}</h1>
        <p className="text-white text-lg mb-6 max-w-xl">
          {event.description || "Quem aí não perde uma festa da MAIOR DA CAPITAL?? Pensando em você, o Hellboy soltou mais uma edição de PUC IN RIO!"}
        </p>
        
        <div className="flex space-x-4">
          <button 
            onClick={handleBuyClick}
            className="bg-[#FF2DAF] hover:bg-[#E02A9D] text-white py-3 px-12 rounded-full font-medium"
          >
            Comprar
          </button>
          
          <button 
            onClick={handleLearnMoreClick}
            className="border border-white text-white hover:bg-white/10 py-3 px-8 rounded-full font-medium"
          >
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;
