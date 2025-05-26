import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import SearchFilters from '../components/SearchFilters';
import { searchEvents, getEvents } from '../lib/events';
import { ArrowLeft } from 'lucide-react';

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const initialFilters = {
    q: searchParams.get('q') || '',
    location: searchParams.get('location') || '',
    date: searchParams.get('date') || '',
  };
  
  const [filters, setFilters] = useState(initialFilters);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carregar eventos baseado nos filtros
  useEffect(() => {
    const loadEvents = () => {
      setIsLoading(true);
      
      try {
        // Usar a função searchEvents para filtrar os eventos
        const filteredEvents = searchEvents(
          filters.q,
          filters.location,
          filters.date
        );
        
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, [filters]);
  
  // Atualizar filtros quando os parâmetros de URL mudam
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      q: params.get('q') || '',
      location: params.get('location') || '',
      date: params.get('date') || '',
    });
  }, [location.search]);
  
  // Aplicar filtros adicionais
  const applyDateFilter = (dateFilter) => {
    setFilters(prev => ({
      ...prev,
      date: dateFilter
    }));
  };
  
  // Aplicar filtros de categoria
  const applyCategoryFilter = (category) => {
    // Implementação futura
  };
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Barra de navegação/voltar */}
        <div className="mb-6">
          <Link to="/" className="flex items-center text-white hover:text-gray-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar à página inicial
          </Link>
        </div>
        
        {/* Barra de pesquisa */}
        <div className="mb-6">
          <SearchBar defaultValues={filters} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar com filtros */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <SearchFilters 
              selectedDate={filters.date}
              onDateFilterChange={applyDateFilter}
            />
          </aside>
          
          {/* Resultados da busca */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-white mb-4">
              {filters.q 
                ? `Resultados para "${filters.q}"` 
                : "Todos os eventos"}
            </h1>
            
            {filters.location && (
              <p className="text-gray-400 mb-4">
                Local: {filters.location}
              </p>
            )}
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-900 rounded-lg">
                <p className="text-2xl text-white mb-4">Nenhum evento encontrado</p>
                <p className="text-gray-400 mb-6">
                  Tente ajustar seus filtros de busca ou explorar todas as categorias.
                </p>
                <Link 
                  to="/"
                  className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-md inline-block"
                >
                  Ver todos os eventos
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
