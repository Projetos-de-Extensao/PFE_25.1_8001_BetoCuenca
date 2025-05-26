import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEventById, getEvents } from '../lib/events';
import { toggleFavorite, isFavorite } from '../lib/favorites';
import { hasTicketForEvent } from '../lib/tickets';
import { Share2, Clock, MapPin, Calendar, Ticket, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext 
} from '../components/ui/carousel';
import '../styles/carousel.css';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const event = getEventById(Number(id));
  const [isFav, setIsFav] = useState(false);
  const [hasTicket, setHasTicket] = useState(false);
  
  useEffect(() => {
    if (user && event) {
      setIsFav(isFavorite(user.id, Number(id)));
      setHasTicket(hasTicketForEvent(user.id, Number(id)));
    }
  }, [user, id, event]);
  
  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Evento não encontrado</h1>
          <Link to="/" className="text-cuencos-purple hover:underline">Voltar para a página inicial</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleToggleFavorite = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const result = toggleFavorite(user.id, event.id);
    setIsFav(result);
    
    toast({
      description: result ? "Adicionado aos favoritos!" : "Removido dos favoritos!",
      duration: 2000,
    });
  };
  
  const handleBuyTickets = () => {
    navigate(`/events/${id}/buy`);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
      toast({
        description: "Link copiado para a área de transferência!",
        duration: 2000,
      });
    }
  };
  
  // Get related events
  const allEvents = getEvents();
  const relatedEvents = allEvents.filter(e => e.id !== event.id).slice(0, 3);
  
  return (
    <div className="flex flex-col min-h-screen bg-cuencos-black">
      <Header />
      
      {/* Event Banner */}
      <div className="container mx-auto px-4 pt-6">
        <div className="rounded-lg overflow-hidden relative">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-56 md:h-80 object-cover"
          />
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Share2 className="w-5 h-5 text-cuencos-purple" />
            </button>
            <button 
              onClick={handleToggleFavorite}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Heart 
                className={`w-5 h-5 ${isFav ? 'fill-cuencos-purple text-cuencos-purple' : 'text-white'}`}
                alt="Favoritar"
              />
            </button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{event.title}</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content column */}
          <div className="w-full md:w-2/3">
            {/* Date and time section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-3">Data e Horário</h2>
              <div className="flex items-start gap-2 text-gray-300">
                <Calendar className="w-5 h-5 mt-0.5 text-cuencos-purple" />
                <p>{event.date}</p>
              </div>
              <div className="flex items-start gap-2 text-gray-300 mt-2">
                <Clock className="w-5 h-5 mt-0.5 text-cuencos-purple" />
                <p>{event.time || "21:00 PM - 4:00 AM"}</p>
              </div>
            </div>
            
            {/* Location section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-3">Endereço e Local</h2>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-5 h-5 mt-0.5 text-cuencos-purple" />
                <p>{event.location}</p>
              </div>
            </div>
            
            {/* Age restriction */}
            {event.ageRestriction && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-3">Faixa Etária</h2>
                <div className="flex items-start gap-2 text-gray-300">
                  <span className="text-cuencos-purple text-xl">🔞</span>
                  <p>{event.ageRestriction}</p>
                </div>
              </div>
            )}
            
            {/* Organizers */}
            {event.organizers && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-3">Organizadores</h2>
                <p className="text-gray-300">{event.organizers}</p>
              </div>
            )}
            
            {/* Event description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">Descrição do Evento</h2>
              <div className="text-gray-300 space-y-4">
                <p className="font-bold text-cuencos-purple">FALA RAÇA</p>
                <p>Quem aí não perde uma festa da MAIOR DA CAPITAL??</p>
                <p>Pensando em vocês, o Hellboy soltou mais uma edição da PUC IN RIO!!</p>
                <p>Vocês estão preparados (ou)?</p>
                <p>Esperamos que SIM! Aqui é PUC, respeitem e traga o seu sorriso!</p>
                <p>Agora o que todo mundo quer saber...</p>
                
                <div className="mt-4">
                  <p className="font-semibold">Quando?</p>
                  <p>09 de maio de 2025</p>
                  <p>21h - 04h</p>
                </div>
                
                <div className="mt-4">
                  <p className="font-semibold">Onde?</p>
                  <p>EM BREVE...</p>
                </div>
                
                <div className="mt-4">
                  <p className="font-semibold">OPEN BAR</p>
                  <ul className="list-disc pl-5">
                    <li>Cerveja (brahma)</li>
                    <li>Vodka</li>
                    <li>Energético</li>
                    <li>Refrigerante</li>
                    <li>Gummy</li>
                  </ul>
                </div>
                
                <div className="mt-4">
                  <p className="font-semibold">ATRAÇÕES</p>
                  <p>EM BREVE...</p>
                </div>
                
                <div className="mt-6 text-sm border-t border-gray-700 pt-4">
                  <p>A receita pra curtir: vodcê já sabem! Né! fígado forte, filtro delicado, muita animação, chegar no rol crush, perde o BJ, ficar de ressaca e sair felizão quando é planetário!</p>
                  <p className="mt-2">Você não pode perdor, omitir ou piorar, muito menos que você vai se arrepender até o último suspiro.</p>
                  <p className="mt-2">Lembrando sempre que não será tolerado nenhum tipo de abuso, desrespeito, intolerância, racismo, machismo e LGBTfobia. Não hesite em procurar a organização (de blusa, óculos ou seguranças). Depois só MÓ festa e álcool, queremos te encontrar ainda de lucido!</p>
                  <p className="mt-2">Só é permitida a entrada de maiores de 18 anos.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ticket sidebar */}
          <div className="w-full md:w-1/3">
            <div className="bg-cuencos-gray rounded-lg p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-white mb-4">Ingresso</h2>
              <div className="bg-cuencos-black/50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-cuencos-purple"></div>
                  <p className="text-white font-medium">Sexto Lote: R$ {event.price.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-400 ml-5">+ taxa a partir de R${(event.price * 0.1).toFixed(2)}</p>
              </div>
              
              {hasTicket ? (
                <div className="bg-green-500/20 p-3 rounded-lg mb-4 text-center border border-green-500/30">
                  <Ticket className="w-5 h-5 text-green-500 mx-auto mb-2" />
                  <p className="text-green-400 font-medium">Você já tem ingresso para este evento!</p>
                  <Link 
                    to="/my-tickets" 
                    className="text-green-300 text-sm hover:underline mt-1 inline-block"
                  >
                    Ver meus ingressos
                  </Link>
                </div>
              ) : (
                <Button
                  onClick={handleBuyTickets}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2"
                >
                  <Ticket className="h-4 w-4" />
                  Comprar
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Related events carousel - SEÇÃO CORRIGIDA */}
        <div className="my-12">
          <h2 className="text-2xl font-bold text-white mb-6">Outros eventos que você pode gostar</h2>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 1,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {relatedEvents.map((relEvent) => (
                  <CarouselItem key={relEvent.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <Link to={`/events/${relEvent.id}`} className="block">
                      <div className="bg-cuencos-gray rounded-lg overflow-hidden hover:shadow-lg hover:shadow-cuencos-purple/20 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={relEvent.image} 
                            alt={relEvent.title} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <div className="text-xs font-semibold text-cuencos-purple mb-2 uppercase tracking-wide">
                            {relEvent.date?.split(' ')[2] || 'MAY'}
                          </div>
                          <h3 className="text-white font-medium line-clamp-2 mb-1 hover:text-cuencos-purple transition-colors">
                            {relEvent.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                            {relEvent.description}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-cuencos-purple font-semibold text-sm">
                              R$ {relEvent.price?.toFixed(2) || '0,00'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {relEvent.location?.split(' - ')[1] || 'Local'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-6 bg-black/70 hover:bg-black/90 text-white border-white/20 hover:border-white/40" />
              <CarouselNext className="-right-4 md:-right-6 bg-black/70 hover:bg-black/90 text-white border-white/20 hover:border-white/40" />
            </Carousel>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetailsPage;
