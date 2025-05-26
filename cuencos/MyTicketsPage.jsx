import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { getTicketsByUserId } from '../lib/tickets';
import QRCode from 'react-qr-code';
import { Wallet, Share2, Apple, Download, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { generateTicketPDF } from '../lib/pdfGenerator';
import { toast } from '../components/ui/use-toast';

const MyTicketsPage = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      const userTickets = getTicketsByUserId(user.id);
      setTickets(userTickets);
    }
  }, [user]);
  
  // Gera um identificador único para o ticket baseado nos seus dados
  const generateTicketIdentifier = (ticket) => {
    return `CUENCOS-${ticket.id}-${ticket.eventId}-${ticket.userId.substring(0, 8)}`;
  };
  
  // Gera dados estruturados para o QR Code em formato JSON
  const generateTicketQRData = (ticket) => {
    const ticketData = {
      id: ticket.id,
      eventId: ticket.eventId,
      eventTitle: ticket.eventTitle,
      attendeeName: ticket.attendeeName,
      attendeeEmail: ticket.attendeeEmail,
      ticketType: ticket.ticketType,
      quantity: ticket.quantity,
      eventDate: ticket.eventDate,
      eventLocation: ticket.eventLocation,
      identifier: generateTicketIdentifier(ticket),
      validationUrl: `https://cuencos.com/validate/${ticket.id}/${generateTicketIdentifier(ticket)}`
    };
    
    return JSON.stringify(ticketData);
  };
  
  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };
  
  const addToAppleWallet = () => {
    // Aqui viria a lógica para gerar o PKPass
    // Por enquanto apenas simularemos com um alerta
    alert('Funcionalidade de adicionar à Apple Wallet será implementada em breve!');
    
    // Em uma implementação real, aqui você geraria o Apple Wallet Pass
    // e usaria window.open ou um anchor para fazer o download
    
    // Exemplo: window.open(`https://api.cuencos.com/tickets/${selectedTicket.id}/wallet-pass`, '_blank');
  };
  
  const shareTicket = () => {
    if (navigator.share) {
      navigator.share({
        title: `Ingresso para ${selectedTicket.eventTitle}`,
        text: `Meu ingresso para ${selectedTicket.eventTitle} em ${selectedTicket.eventDate}`,
        // Em uma implementação real, você poderia gerar uma URL compartilhável
        url: `https://cuencos.com/ticket/${selectedTicket.id}/${generateTicketIdentifier(selectedTicket)}`,
      }).catch(err => {
        console.error('Erro ao compartilhar:', err);
      });
    } else {
      // Fallback para navegadores que não suportam a Web Share API
      alert('Compartilhamento não suportado neste navegador');
    }
  };
  
  const handleDownloadTicket = async (ticket) => {
    try {
      toast({
        title: "Gerando PDF...",
        description: "Preparando seu ingresso para download",
        duration: 2000,
      });
      
      const result = await generateTicketPDF(ticket);
      
      if (result.success) {
        toast({
          title: "Download concluído!",
          description: `Ingresso baixado: ${result.fileName}`,
          variant: "success",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erro ao baixar ingresso:', error);
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar o ingresso. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto py-12 px-4 text-center flex-grow">
          <h1 className="text-2xl font-bold mb-4">Você precisa estar logado para acessar esta página</h1>
          <Link to="/login" className="text-cuencos-purple hover:underline">Fazer login</Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      
      {/* Espaçador para compensar o header fixo */}
      <div className="h-16 md:h-20"></div>
      
      <main className="flex-grow py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
            {/* Sidebar - mais compacta */}
            <div className="w-full lg:w-64 bg-cuencos-gray rounded-lg p-4 md:p-6 flex-shrink-0">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Configurações da Conta</h2>
              
              <nav className="space-y-1">
                <Link to="/account" className="block px-3 md:px-4 py-2 hover:bg-gray-700 rounded text-white text-sm md:text-base">
                  Informação da Conta
                </Link>
                <div className="bg-cuencos-purple px-3 md:px-4 py-2 rounded text-white text-sm md:text-base">
                  Meus ingressos
                </div>
                <Link to="/account/email" className="block px-3 md:px-4 py-2 hover:bg-gray-700 rounded text-white text-sm md:text-base">
                  Mudar email
                </Link>
              </nav>
            </div>
            
            {/* Main content */}
            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Meus Ingressos</h1>
              <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">Clique para visualizar o QR Code</p>
              
              {tickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                      <div className="relative">
                        <img 
                          src={ticket.eventImage} 
                          alt={ticket.eventTitle} 
                          className="w-full h-40 md:h-48 object-cover rounded-t-lg"
                        />
                        
                        <div className="absolute top-2 md:top-4 right-2 md:right-4 flex gap-2">
                          <button
                            onClick={() => handleDownloadTicket(ticket)}
                            className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
                            title="Baixar PDF"
                          >
                            <Download className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 md:p-6">
                        <h3 className="text-lg md:text-xl font-semibold text-white line-clamp-2 mb-2">{ticket.eventTitle}</h3>
                        <div className="flex items-center my-1">
                          <span className="text-gray-400 mr-2">📍</span>
                          <span className="text-gray-300 text-sm md:text-base truncate">{ticket.eventLocation}</span>
                        </div>
                        <div className="flex items-center mb-4">
                          <span className="text-gray-400 mr-2">📅</span>
                          <span className="text-gray-300 text-sm md:text-base">{ticket.eventDate}</span>
                        </div>
                        
                        <button
                          onClick={() => openTicketDetails(ticket)}
                          className="w-full bg-cuencos-purple text-white py-2 px-4 rounded-md hover:bg-cuencos-darkPurple transition-colors text-sm md:text-base"
                        >
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 md:py-12 bg-cuencos-gray rounded-lg">
                  <div className="text-4xl md:text-5xl mb-4">🎫</div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Você ainda não tem ingressos</h3>
                  <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base px-4">Explore eventos e compre ingressos para vê-los aqui</p>
                  <Link 
                    to="/"
                    className="bg-cuencos-purple hover:bg-cuencos-darkPurple text-white px-4 md:px-6 py-2 rounded-md inline-block text-sm md:text-base"
                  >
                    Explorar Eventos
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Modal de detalhes do ingresso - otimizado */}
      {selectedTicket && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal}
          title="Seu ingresso"
        >
          <div className="text-center my-4">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Aqui está seu ingresso</h2>
            
            <div className="bg-gray-800 p-3 md:p-4 rounded mb-4">
              <img 
                src={selectedTicket.eventImage} 
                alt={selectedTicket.eventTitle} 
                className="w-full h-40 md:h-48 object-cover rounded mb-4" 
              />
              
              <h3 className="text-lg md:text-xl font-bold text-white uppercase line-clamp-2 mb-2">{selectedTicket.eventTitle}</h3>
              <p className="text-gray-400 text-xs md:text-sm mb-4">{selectedTicket.eventDate} - {selectedTicket.eventLocation}</p>
              
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 border-t border-gray-700 pt-4">
                <div>
                  <p className="text-xs text-cuencos-purple mb-1">Data</p>
                  <p className="text-white text-xs md:text-sm">{selectedTicket.eventDate.split(' ')[0]}</p>
                </div>
                <div>
                  <p className="text-xs text-cuencos-purple mb-1">Horário</p>
                  <p className="text-white text-xs md:text-sm">9:00 PM</p>
                </div>
                <div>
                  <p className="text-xs text-cuencos-purple mb-1">Nome</p>
                  <p className="text-white text-xs md:text-sm truncate">{selectedTicket.attendeeName.split(' ')[0]}</p>
                </div>
              </div>
              
              {/* QR Code Real - responsivo */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-3 md:p-4 rounded-md w-40 h-40 md:w-56 md:h-56 mx-auto">
                  <QRCode 
                    value={generateTicketQRData(selectedTicket)}
                    size={window.innerWidth < 768 ? 152 : 216}
                    style={{ width: '100%', height: '100%' }}
                    level="H"
                    className="border-0"
                  />
                </div>
                
                <p className="text-gray-400 text-xs mt-2">Escaneie esse QR Code na entrada.</p>
                <p className="text-gray-400 text-xs mb-4 break-all px-2">ID: {generateTicketIdentifier(selectedTicket)}</p>
                
                <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center mt-2">
                  <button
                    onClick={addToAppleWallet}
                    className="flex items-center justify-center gap-1 bg-black text-white py-2 px-3 md:px-4 rounded-md border border-gray-600 hover:bg-gray-900 transition-colors text-sm"
                  >
                    <Apple size={16} className="mr-1" />
                    <Wallet size={16} />
                    <span>Apple Wallet</span>
                  </button>
                  
                  <button
                    onClick={() => handleDownloadTicket(selectedTicket)}
                    className="flex items-center justify-center gap-1 bg-cuencos-purple text-white py-2 px-3 md:px-4 rounded-md hover:bg-cuencos-darkPurple transition-colors text-sm"
                  >
                    <Download size={16} />
                    <span>Baixar PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      
      <Footer />
    </div>
  );
};

export default MyTicketsPage;
