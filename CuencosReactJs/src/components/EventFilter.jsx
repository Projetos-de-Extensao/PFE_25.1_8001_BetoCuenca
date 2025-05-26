import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Filter, X, ChevronDown } from 'lucide-react';
import { estadosBrasil } from '../lib/constants';
import CustomDatePicker from './ui/DatePicker';
import '../styles/eventFilter.css';

const EventFilter = ({ onFilterChange, className = '' }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    date: null,
    category: ''
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDateChange = (date) => {
    setFilters(prev => ({
      ...prev,
      date: date
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Notificar o componente pai sobre a mudança dos filtros (se necessário)
    if (onFilterChange) {
      onFilterChange(filters);
    }
    
    // Construir query params para a navegação
    const queryParams = new URLSearchParams();
    
    if (filters.search) queryParams.append('q', filters.search);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.date) queryParams.append('date', filters.date);
    if (filters.category) queryParams.append('category', filters.category);
    
    // Navegar para a página de busca com os parâmetros aplicados
    if (queryParams.toString()) {
      navigate(`/search?${queryParams.toString()}`);
    }
  };
  
  const clearFilters = () => {
    const emptyFilters = {
      search: '',
      location: '',
      date: null,
      category: ''
    };
    
    setFilters(emptyFilters);
    
    if (onFilterChange) {
      onFilterChange(emptyFilters);
    }
  };
  
  const dateOptions = [
    { value: '', label: 'Qualquer Data' },
    { value: 'today', label: 'Hoje' },
    { value: 'tomorrow', label: 'Amanhã' },
    { value: 'this-week', label: isMobile ? 'Esta Sem.' : 'Esta Semana' },
    { value: 'weekend', label: isMobile ? 'Fim Sem.' : 'Fim de Semana' },
    { value: 'this-month', label: isMobile ? 'Este Mês' : 'Este Mês' },
    { value: 'next-month', label: isMobile ? 'Próx. Mês' : 'Próximo Mês' }
  ];
  
  const categoryOptions = [
    { value: '', label: isMobile ? 'Todas' : 'Todas Categorias' },
    { value: 'athletics', label: 'Atléticas' },
    { value: 'party', label: isMobile ? 'Festas' : 'Festas & Shows' },
    { value: 'academic', label: 'Acadêmico' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'sports', label: 'Esportivo' }
  ];
  
  return (
    <div className={`event-filter-container ${className} ${isExpanded ? 'expanded' : ''}`}>
      <div className="filter-backdrop"></div>
      <div className="event-filter-content">
        <form onSubmit={handleSubmit} className="filter-form">
          {/* Barra de pesquisa principal */}
          <div className="filter-search-container">
            <div className="search-input-wrapper">
              <div className="search-icon-wrapper">
                <Search className="search-icon" size={isMobile ? 16 : 18} />
              </div>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleInputChange}
                placeholder={isMobile ? "Buscar" : "Buscar eventos"}
                className="search-input"
              />
              {filters.search && (
                <button 
                  type="button" 
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                  className="clear-input-button"
                  aria-label="Limpar busca"
                >
                  <X size={isMobile ? 12 : 14} />
                </button>
              )}
            </div>
            
            <button type="button" className="filter-toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
              <Filter size={isMobile ? 14 : 16} />
              {!isMobile && (
                <span className="hidden sm:inline">{isExpanded ? 'Menos Filtros' : 'Mais Filtros'}</span>
              )}
              <span className="sm:hidden">{isExpanded ? 'Menos' : 'Filtros'}</span>
              <ChevronDown size={isMobile ? 12 : 14} className={`toggle-icon ${isExpanded ? 'rotate' : ''}`} />
            </button>
          </div>
          
          {/* Filtros expandidos */}
          <div className={`expanded-filters ${isExpanded ? 'show' : ''}`}>
            <div className="filter-group location-filter">
              <div className="filter-label">
                <MapPin size={isMobile ? 16 : 18} />
                <span>Local</span>
              </div>
              <div className="select-wrapper">
                <select 
                  name="location"
                  value={filters.location}
                  onChange={handleSelectChange}
                  className="filter-select"
                >
                  <option value="">Todo o Brasil</option>
                  {estadosBrasil.map(estado => (
                    <option key={estado.sigla} value={estado.sigla}>
                      {isMobile ? estado.sigla : estado.nome}
                    </option>
                  ))}
                </select>
                <ChevronDown size={isMobile ? 14 : 16} className="select-icon" />
              </div>
            </div>
            
            <div className="filter-group date-filter">
              <div className="filter-label">
                <Calendar size={isMobile ? 16 : 18} />
                <span>Data</span>
              </div>
              <div className="select-wrapper">
                <CustomDatePicker
                  value={filters.date}
                  onChange={handleDateChange}
                  placeholder="Selecione uma data"
                  className="w-full bg-cuencos-darkPurple border-transparent focus:border-white/30"
                />
                <ChevronDown size={isMobile ? 14 : 16} className="select-icon" />
              </div>
            </div>
            
            <div className="filter-group category-filter">
              <div className="filter-label">
                <span>Categoria</span>
              </div>
              <div className="select-wrapper">
                <select 
                  name="category"
                  value={filters.category}
                  onChange={handleSelectChange}
                  className="filter-select"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={isMobile ? 14 : 16} className="select-icon" />
              </div>
            </div>
          </div>
          
          {/* Botões de ação */}
          <div className={`filter-actions ${isExpanded ? 'show' : ''}`}>
            <button type="button" onClick={clearFilters} className="clear-filter-btn">
              Limpar
            </button>
            <button type="submit" className="apply-filter-btn">
              <span>Aplicar</span>
              <Search size={isMobile ? 14 : 16} className="btn-icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFilter;
