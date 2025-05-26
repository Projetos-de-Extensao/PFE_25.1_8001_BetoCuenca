import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { getEventById } from '../lib/events';

const TicketSelectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const event = getEventById(Number(id));
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-white">Evento não encontrado</p>
        </div>
        <Footer />
      </div>
    );
  }

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleProceed = () => {
    if (!user) {
      navigate('/login', { state: { from: `/events/${id}/buy` } });
      return;
    }
    
    // Armazenar a seleção de ingressos no localStorage
    localStorage.setItem('ticketSelection', JSON.stringify({
      eventId: event.id,
      eventTitle: event.title,
      ticketType: 'Sexto Lote',
      quantity,
      unitPrice: event.price,
      totalPrice: event.price * quantity,
      timestamp: Date.now(), // Adicionar timestamp para melhor controle
    }));
    
    navigate('/checkout');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(`/events/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-grow">
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Selecione o Ticket"
        >
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white">Tipos de Ingresso</div>
              <div className="text-white">Quantidade</div>
            </div>
            
            <div className="flex items-center justify-between bg-cuencos-gray p-4 rounded-md border-l-4 border-cuencos-purple mb-8">
              <div>
                <h3 className="text-xl font-medium text-white">Sexto Lote</h3>
                <p className="text-white">R$ {event.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={decreaseQuantity}
                  className="w-10 h-10 rounded-full bg-cuencos-black border border-gray-600 flex items-center justify-center text-white"
                >
                  -
                </button>
                <span className="text-2xl text-white">{quantity}</span>
                <button 
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-full bg-cuencos-black border border-gray-600 flex items-center justify-center text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-cuencos-gray pt-4 pb-4">
            <div className="flex justify-between text-lg text-white">
              <span>Qtd: <span className="text-cuencos-purple">{quantity}</span></span>
              <span>Total: <span className="text-cuencos-purple">R${(event.price * quantity).toFixed(2)}</span></span>
            </div>
          </div>
          
          <button 
            onClick={handleProceed}
            className="w-full bg-cuencos-purple hover:bg-cuencos-darkPurple text-white py-4 rounded-md text-lg font-medium flex items-center justify-center"
          >
            Proceed <span className="ml-2">→</span>
          </button>
        </Modal>
      </div>
      
      <Footer />
    </div>
  );
};

export default TicketSelectionPage;
