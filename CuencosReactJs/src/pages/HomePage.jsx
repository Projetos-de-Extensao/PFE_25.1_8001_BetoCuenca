import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../lib/events';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import EventFilter from '../components/EventFilter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../components/ui/container'; // Importação adicionada
import '../styles/homepage.css';

const HomePage = () => {
  const events = getEvents();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  
  useEffect(() => {
    // Inicializar com todos os eventos não rascunho
    setFilteredEvents(events.filter(event => !event.isDraft));
  }, [events]);
  
  const heroEvents = [
    {
      id: 1,
      title: "PUC IN RIO",
      description: "Quem aí não perde uma festa da MAIOR DA CAPITAL? Pensando em vocês, o Hellboy soltou mais uma edição da PUC IN RIO!!",
      image: "/assets/events/puc-in-rio.png", // Caminho atualizado para a pasta public
    },
    {
      id: 2,
      title: "BAILE DO MAGNA",
      description: "Venha curtir a melhor festa universitária do semestre! Uma noite inesquecível com as melhores atrações.",
      image: "/assets/events/baile-do-magna.png", // Caminho atualizado para a pasta public
    },
    {
      id: 3,
      title: "CALOURADA 2025.1",
      description: "A festa de boas-vindas aos calouros que vai agitar o campus! Não perca essa celebração incrível.",
      image: "/assets/events/calourada-brasil.png", // Caminho atualizado para a pasta public
    }
  ];
  
  // Funções para navegação do carousel
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === heroEvents.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? heroEvents.length - 1 : prev - 1));
  };
  
  // Função para abrir o menu
  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden'; // Impede rolagem quando menu está aberto
  };
  
  // Função para fechar o menu
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
    document.body.style.overflow = ''; // Restaura rolagem
  };
  
  // Autoplay para o carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeSlide]);
  
  // Função para lidar com a mudança de filtros
  const handleFilterChange = (filters) => {
    const allEvents = events.filter(event => !event.isDraft);
    let filtered = allEvents;
    
    // Aplicar filtro de busca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchLower) || 
        (event.description && event.description.toLowerCase().includes(searchLower))
      );
    }
    
    // Aplicar filtro de localização
    if (filters.location && filters.location !== '') {
      filtered = filtered.filter(event => 
        event.location && event.location.includes(filters.location)
      );
    }
    
    // Aplicar filtro de data
    if (filters.date && filters.date !== '') {
      // Implementação da filtragem por data será feita na função searchEvents
      // que já foi definida no arquivo de eventos
      const { searchEvents } = require('../lib/events');
      filtered = searchEvents('', '', filters.date).filter(event => filtered.includes(event));
    }
    
    // Aplicar filtro de categoria
    if (filters.category && filters.category !== '') {
      filtered = filtered.filter(event => 
        event.category === filters.category
      );
    }
    
    setFilteredEvents(filtered);
  };

  // Número de eventos a exibir inicialmente
  const initialEventsToShow = 6;

  // Função para mostrar todos os eventos
  const handleShowAllEvents = () => {
    setShowAllEvents(true);
  };

  // Obter os eventos a serem exibidos (todos ou limitados)
  const eventsToDisplay = showAllEvents 
    ? filteredEvents 
    : filteredEvents.slice(0, initialEventsToShow);

  return (
    <>
      <Header />
      
      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

      <main>
        {/* Hero Section com Carousel */}
        <section className="hero-carousel">
          {heroEvents.map((heroEvent, index) => (
            <div 
              key={heroEvent.id}
              className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(to right, rgba(162, 0, 255, 0.7), rgba(162, 0, 255, 0.4)), url(${heroEvent.image})` }}
            >
              <Container>
                <div className="hero-content">
                  <h1 className="hero-title">{heroEvent.title}</h1>
                  <p className="hero-description">{heroEvent.description}</p>
                  <div className="hero-buttons">
                    <Link to="/login" className="btn-primary">Comprar</Link>
                    <Link to={`/events/${heroEvent.id}`} className="btn-secondary">Saiba Mais</Link>
                  </div>
                </div>
              </Container>
            </div>
          ))}
          
          {/* Controles do carousel */}
          <button className="hero-carousel-control prev" onClick={prevSlide} aria-label="Slide anterior">
            <ChevronLeft className="carousel-arrow" />
          </button>
          <button className="hero-carousel-control next" onClick={nextSlide} aria-label="Próximo slide">
            <ChevronRight className="carousel-arrow" />
          </button>
        </section>

        {/* Filtro centralizado com sobreposição ao banner */}
        <section className="filtro-section">
          <Container>
            <div className="filtro-wrapper">
              <EventFilter onFilterChange={handleFilterChange} />
            </div>
          </Container>
        </section>
          
        <section className="eventos">
          <div className="eventos-header">
            <h2>Eventos em alta</h2>
            <div className="eventos-filtros">
              <select className="w-full sm:w-auto bg-white bg-opacity-10 border border-gray-600 rounded-full py-1 px-4 text-white">
                <option>Dias da Semana</option>
                <option>Segunda</option>
                <option>Sexta</option>
                <option>Sábado</option>
              </select>
              <select className="w-full sm:w-auto bg-white bg-opacity-10 border border-gray-600 rounded-full py-1 px-4 text-white">
                <option>Qualquer Categoria</option>
                <option>Festas</option>
                <option>Shows</option>
                <option>Eventos Acadêmicos</option>
                <option>Esportes</option>
              </select>
            </div>
          </div>

          <div className="eventos-grid">
            {eventsToDisplay.length > 0 ? (
              eventsToDisplay.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="no-events-found">
                <p>Nenhum evento encontrado com os filtros selecionados.</p>
                <button 
                  onClick={() => setFilteredEvents(events.filter(event => !event.isDraft))}
                  className="reset-filters-btn"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
          
          {/* Botão "Explorar Mais" - visível apenas se houver mais eventos para mostrar */}
          {!showAllEvents && filteredEvents.length > initialEventsToShow && (
            <div className="explorar">
              <button onClick={handleShowAllEvents}>Explorar Mais</button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="footer">
          <Container>
            <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
              <div className="footer-col">
                <img src="/footer-logo.png" alt="Logo Cuencos" className="footer-logo mb-4" />
                <p className="text-sm md:text-base">
                  Cuencos é uma plataforma de autoatendimento para venda de ingressos que conecta
                  universitários a eventos criados por e para a comunidade acadêmica.
                </p>
              </div>

              <div className="footer-col md:pl-12">
                <h4 className="text-lg font-medium mb-4">Sobre Nós</h4>
                <ul className="space-y-2">
                  <li><Link to="#" className="hover:text-cuencos-purple transition-colors">Conheça o Cuencos</Link></li>
                  <li><Link to="#" className="hover:text-cuencos-purple transition-colors">Contato</Link></li>
                  <li><Link to="#" className="hover:text-cuencos-purple transition-colors">Política de Privacidade</Link></li>
                  <li><Link to="#" className="hover:text-cuencos-purple transition-colors">Termos de Uso</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4 className="text-lg font-medium mb-4">Anuncie na Cuencos!</h4>
                <p className="mb-4">Buscando anunciar num local de confiança a sua festa?</p>
                <Link to="#" className="footer-btn bg-cuencos-purple text-white py-2 px-6 rounded-full inline-block">Anunciar Agora</Link>
              </div>
            </div>

            <hr className="footer-divider opacity-20" />

            <p className="footer-copy text-center py-4 text-sm">Copyright © 2025 Cuencos</p>
          </Container>
        </footer>
      </main>
    </>
  );
};

export default HomePage;
