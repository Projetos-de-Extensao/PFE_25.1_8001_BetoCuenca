import React from 'react';

const DeleteEventModal = ({ isOpen, onClose, onConfirm, event }) => {
  if (!isOpen || !event) return null;
  
  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0F0F0F] rounded-lg max-w-md w-full max-h-[90vh] shadow-xl overflow-hidden">
        {/* Cabeçalho */}
        <div className="p-6">
          <h2 className="text-[#B900FF] text-2xl font-bold">Excluir Evento</h2>
          <div className="h-px bg-gray-800 w-full mt-4"></div>
        </div>
        
        {/* Conteúdo */}
        <div className="px-6">
          <p className="text-white text-xl text-center mb-6">Você irá excluir:</p>
          
          <div className="bg-[#1a1a1a] rounded-lg overflow-hidden mb-6 shadow-md">
            <img 
              src={event.image || '/assets/images/placeholder.svg'} 
              alt={event.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-white font-bold text-xl text-center mb-2">{event.title}</h3>
              <div className="flex justify-center items-center text-gray-400 gap-1 text-sm">
                <span>📅 {event.date}</span>
                <span className="mx-1">·</span>
                <span>📍 {event.location?.split(' - ')[1] || event.location}</span>
              </div>
            </div>
          </div>
          
          <p className="text-white text-center mb-8">
            Após a exclusão você irá perder todo acesso aos dados de venda e não será mais possível a compra, está ciente?
          </p>
        </div>
        
        {/* Botões */}
        <div className="flex justify-center gap-4 p-6">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-[#C466FF] text-black font-bold rounded-lg hover:bg-[#B23AFF] transition-colors min-w-[120px]"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="px-6 py-3 bg-[#DA3C3C] text-white font-bold rounded-lg hover:bg-[#C13333] transition-colors min-w-[160px]"
          >
            Sim, quero excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
