import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { addTicket } from '../lib/tickets';
import { getEventById } from '../lib/events';

const SuccessPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checkoutInfo, setCheckoutInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [addedTicket, setAddedTicket] = useState(null);
  
  useEffect(() => {
    const storedInfo = localStorage.getItem('checkoutInfo');
    if (!storedInfo) {
      navigate('/');
      return;
    }
    
    const data = JSON.parse(storedInfo);
    // Verificar se os dados são recentes (menos de 1 hora)
    if (Date.now() - (data.timestamp || 0) > 60 * 60 * 1000) {
      localStorage.removeItem('checkoutInfo');
      navigate('/');
      return;
    }
    
    setCheckoutInfo(data);
  }, [navigate]);
  
  useEffect(() => {
    if (checkoutInfo && !isPaymentCompleted) {
      // Simulate payment processing
      const timer = setTimeout(() => {
        setIsPaymentCompleted(true);
        
        // Add ticket to user's account
        const event = getEventById(checkoutInfo.eventId);
        const newTicket = addTicket({
          userId: user.id,
          eventId: checkoutInfo.eventId,
          eventTitle: event.title,
          eventImage: event.image,
          eventDate: event.date,
          eventLocation: event.location,
          ticketType: checkoutInfo.ticketType,
          quantity: checkoutInfo.quantity,
          attendeeName: checkoutInfo.participantInfo.fullName,
          attendeeEmail: checkoutInfo.participantInfo.email,
          attendeePhone: checkoutInfo.participantInfo.phone,
        });
        
        setAddedTicket(newTicket);
        
        // Clear session storage
        localStorage.removeItem('checkoutInfo');
        localStorage.removeItem('ticketSelection');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [checkoutInfo, user, isPaymentCompleted]);
  
  useEffect(() => {
    if (isPaymentCompleted && addedTicket) {
      // Limpar os dados temporários de checkout e seleção
      localStorage.removeItem('checkoutInfo');
      localStorage.removeItem('ticketSelection');
    }
  }, [isPaymentCompleted, addedTicket]);
  
  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };
  
  const viewTicket = () => {
    setIsModalOpen(false);
    navigate('/my-tickets');
  };
  
  if (!checkoutInfo) return null;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Confirmação de Compra"
        >
          <div className="text-center mb-6">
            {!isPaymentCompleted ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cuencos-purple mb-4"></div>
                <p className="text-white">Processando seu pagamento...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-green-500 rounded-full p-2 mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-cuencos-purple mb-2">Compra Confirmada!</h3>
                <p className="text-white mb-4">Seu ingresso foi comprado com sucesso.</p>
                
                <div className="bg-cuencos-gray p-4 rounded-md w-full mb-6">
                  <h4 className="text-cuencos-purple font-medium mb-2">{checkoutInfo?.ticketType}</h4>
                  <p className="text-white">Quantidade: {checkoutInfo?.quantity}</p>
                  <p className="text-white">Para: {checkoutInfo?.participantInfo?.fullName}</p>
                  <p className="text-white">Total pago: R${(checkoutInfo?.finalTotal).toFixed(2)}</p>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={viewTicket}
                    className="bg-cuencos-purple hover:bg-cuencos-darkPurple text-white py-2 px-6 rounded-md"
                  >
                    Ver meus ingressos
                  </button>
                  <button 
                    onClick={closeModal}
                    className="border border-cuencos-purple text-cuencos-purple hover:bg-cuencos-purple hover:text-white py-2 px-6 rounded-md"
                  >
                    Voltar à página inicial
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
