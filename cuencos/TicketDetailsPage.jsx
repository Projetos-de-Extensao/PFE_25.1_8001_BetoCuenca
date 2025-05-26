import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getTicketById } from '../lib/tickets';
import QRCode from 'react-qr-code';
import { Download, ArrowLeft, Calendar, MapPin, User, Hash, Apple, Wallet } from 'lucide-react';
import { generateTicketPDF } from '../lib/pdfGenerator';
import { toast } from '../components/ui/use-toast';

const TicketDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const ticketData = getTicketById(id);
    if (!ticketData || ticketData.userId !== user.id) {
      navigate('/my-tickets');
      return;
    }

    setTicket(ticketData);
    setIsLoading(false);
  }, [id, user, navigate]);

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

  const handleDownloadPDF = async () => {
    try {
      toast({
        title: "Gerando PDF...",
        description: "Aguarde enquanto seu ingresso está sendo preparado",
        duration: 2000,
      });
      
      const result = await generateTicketPDF(ticket);
      
      if (result.success) {
        toast({
          title: "Download concluído!",
          description: `Arquivo ${result.fileName} foi baixado com sucesso`,
          variant: "success",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      toast({
        title: "Erro no download",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const addToAppleWallet = () => {
    // Aqui viria a lógica para gerar o PKPass
    // Por enquanto apenas simularemos com um alerta
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A integração com Apple Wallet será implementada em breve!",
      duration: 3000,
    });
    
    // Em uma implementação real, aqui você geraria o Apple Wallet Pass
    // e usaria window.open ou um anchor para fazer o download
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cuencos-purple mx-auto mb-4"></div>
          <p>Carregando ingresso...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Ingresso não encontrado</h1>
          <button 
            onClick={() => navigate('/my-tickets')}
            className="bg-cuencos-purple text-white px-6 py-2 rounded-md hover:bg-cuencos-darkPurple transition-colors"
          >
            Voltar aos meus ingressos
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Espaçador para compensar o header fixo */}
      <div className="h-16 md:h-20"></div>
      
      <main className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Botão Voltar - mais compacto */}
        <button
          onClick={() => navigate('/my-tickets')}
          className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos meus ingressos
        </button>

        {/* Card do Ingresso - layout mais compacto */}
        <div className="bg-gradient-to-br from-cuencos-purple via-purple-700 to-purple-900 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl relative overflow-hidden">
          {/* Padrão de fundo decorativo - responsivo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 md:top-4 md:right-4 w-16 h-16 md:w-32 md:h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 w-12 h-12 md:w-24 md:h-24 border border-white/20 rounded-full"></div>
          </div>
          
          {/* Header do ingresso - mais compacto */}
          <div className="relative z-10 text-center mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 line-clamp-2">{ticket.eventTitle}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-4 text-sm md:text-base">
              <div className="flex items-center justify-center text-white/80">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span className="truncate">{ticket.eventDate}</span>
              </div>
              <div className="flex items-center justify-center text-white/80">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span className="truncate">{ticket.eventLocation}</span>
              </div>
            </div>
          </div>

          {/* Layout responsivo para QR Code e Informações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* QR Code */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg">
                <QRCode 
                  value={generateTicketQRData(ticket)}
                  size={window.innerWidth < 768 ? 150 : 180}
                  style={{ width: '100%', height: '100%' }}
                  level="H"
                />
              </div>
              <p className="text-white/80 text-xs text-center mt-2 break-all">
                ID: {generateTicketIdentifier(ticket)}
              </p>
            </div>

            {/* Informações do Ingresso - grid responsivo */}
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center text-white mb-1">
                  <User className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base">Portador</span>
                </div>
                <p className="text-white/90 text-sm md:text-base truncate">{ticket.attendeeName}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center text-white mb-1">
                  <Hash className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base">Tipo de Ingresso</span>
                </div>
                <p className="text-white/90 text-sm md:text-base">{ticket.ticketType}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center text-white mb-1">
                  <span className="font-medium text-sm md:text-base">Quantidade</span>
                </div>
                <p className="text-white/90 text-sm md:text-base">{ticket.quantity} ingresso(s)</p>
              </div>
            </div>
          </div>

          {/* Botões de Ação - layout responsivo */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={addToAppleWallet}
              className="bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-medium md:font-bold text-sm md:text-base hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <Apple className="h-4 w-4 md:h-5 md:w-5" />
              <Wallet className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Apple Wallet</span>
              <span className="sm:hidden">Wallet</span>
            </button>
            
            <button
              onClick={handleDownloadPDF}
              className="bg-white text-cuencos-purple px-4 md:px-6 py-2 md:py-3 rounded-full font-medium md:font-bold text-sm md:text-base hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <Download className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Baixar PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>

          {/* Instruções - mais compactas */}
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-white/80 text-xs md:text-sm">
              Apresente este QR code na entrada do evento para validação
            </p>
          </div>
        </div>

        {/* Informações adicionais - mais compactas */}
        <div className="mt-4 md:mt-6 bg-gray-900 rounded-lg p-4 md:p-6">
          <h3 className="text-white font-bold mb-3 text-sm md:text-base">Informações Importantes</h3>
          <ul className="text-gray-300 space-y-1 md:space-y-2 text-xs md:text-sm">
            <li>• Chegue com antecedência para evitar filas</li>
            <li>• Tenha um documento de identidade em mãos</li>
            <li>• Este ingresso é pessoal e intransferível</li>
            <li>• Guarde este ingresso em local seguro</li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TicketDetailsPage;