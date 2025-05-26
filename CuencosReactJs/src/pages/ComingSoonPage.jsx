import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction, Calendar } from 'lucide-react';
import '../styles/coming-soon.css';

const ComingSoonPage = () => {
  const [codeLines, setCodeLines] = useState([]);
  const [stars, setStars] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Função para gerar estrelas
  const generateStars = useCallback(() => {
    const { width, height } = windowSize;
    const screenArea = width * height;
    const starCount = Math.min(Math.floor(screenArea / 10000), 50);
    
    const newStars = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: `star-${i}`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() < 0.5 ? 'tiny' : Math.random() < 0.8 ? 'small' : 'medium',
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 3}s`
      });
    }
    setStars(newStars);
  }, [windowSize]);
  
  // Função para gerar linhas de código
  const generateCodeLines = useCallback(() => {
    const codeSnippets = [
      "<EventManager props={...} />",
      "const [events, setEvents] = useState([]);",
      "import { useAuth } from '../context';",
      "addEventListener('load', init);",
      "npm install cuencos-platform",
      "async function fetchEvents() {}",
      "return <EventCard {...event} />",
      "const api = axios.create();",
      "useEffect(() => { fetchData(); }, [])"
    ];
    
    const { width } = windowSize;
    const isMobile = width < 640;
    const lineCount = isMobile ? Math.min(3, Math.floor(width / 300)) : Math.floor(width / 200);
    
    const lines = [];
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        id: `code-${i}`,
        left: `${Math.random() * 100}%`,
        duration: `${isMobile ? 4 + Math.random() * 6 : 5 + Math.random() * 10}s`,
        delay: `${Math.random() * 3}s`,
        content: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        speed: 0.8 + Math.random() * 0.4
      });
    }
    setCodeLines(lines);
  }, [windowSize]);
  
  // Função para gerar circuitos
  const generateCircuits = useCallback(() => {
    const { width, height } = windowSize;
    const isMobile = width < 640;
    const circuitCount = isMobile ? 3 : Math.floor((width * height) / 50000);
    
    const newCircuits = [];
    for (let i = 0; i < circuitCount; i++) {
      // Linhas de circuito
      newCircuits.push({
        id: `line-${i}`,
        type: 'line',
        top: `${Math.random() * 100}%`,
        width: `${30 + Math.random() * 70}%`,
        delay: `${Math.random() * 5}s`,
      });
      
      // Pontos de conexão
      const dotsCount = isMobile ? 2 : (3 + Math.floor(Math.random() * 5));
      for (let j = 0; j < dotsCount; j++) {
        newCircuits.push({
          id: `dot-${i}-${j}`,
          type: 'dot',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 3}s`,
        });
      }
    }
    setCircuits(newCircuits);
  }, [windowSize]);
  
  // Atualiza o tamanho da janela e regenera elementos
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Regenerar elementos de fundo quando o tamanho da tela muda
  useEffect(() => {
    generateStars();
    generateCodeLines();
    generateCircuits();
  }, [windowSize, generateStars, generateCodeLines, generateCircuits]);
  
  return (
    <div className="coming-soon-container">
      {/* Grade de fundo */}
      <div className="matrix-grid"></div>
      
      {/* Efeitos de fundo tecnológico */}
      <div className="tech-background">
        {/* Estrelas animadas */}
        {stars.map(star => (
          <div 
            key={star.id}
            className={`animated-star ${star.size}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
        
        {/* Linhas de código caindo */}
        {codeLines.map(line => (
          <div 
            key={line.id}
            className="code-line"
            style={{
              left: line.left,
              animationDuration: line.duration,
              animationDelay: line.delay,
              animationTimingFunction: line.speed > 1 ? "ease-in" : "linear"
            }}
          >
            {line.content}
          </div>
        ))}

        {/* Efeito de circuito */}
        {circuits.map(circuit => (
          circuit.type === 'line' ? 
            <div 
              key={circuit.id}
              className="circuit-line"
              style={{
                top: circuit.top,
                width: circuit.width,
                animationDelay: circuit.delay
              }}
            /> :
            <div 
              key={circuit.id}
              className="circuit-dot"
              style={{
                top: circuit.top,
                left: circuit.left,
                animationDelay: circuit.delay
              }}
            />
        ))}
        
        {/* Efeito de luz pulsante */}
        <div className="pulse-light"></div>
      </div>
      
      {/* Botão de voltar */}
      <Link to="/" className="back-button">
        <ArrowLeft size={16} />
        <span>Voltar</span>
      </Link>
      
      {/* Conteúdo principal */}
      <div className="content-card">
        <div className="coming-soon-header">
          <Construction className="construction-icon" />
          <h1>Área em Desenvolvimento</h1>
        </div>
        
        <div className="divider"></div>
        
        <p className="description">
          Estamos trabalhando para trazer uma experiência incrível para organizadores de eventos!
        </p>
        
        <div className="features">
          <div className="feature">
            <div className="feature-icon">🚀</div>
            <div className="feature-text">
              <h3>Gerencie Eventos</h3>
              <p>Organize e promova seus eventos universitários.</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">📊</div>
            <div className="feature-text">
              <h3>Análise de dados</h3>
              <p>Acompanhe o desempenho das vendas em tempo real.</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">🎟️</div>
            <div className="feature-text">
              <h3>Controle de ingressos</h3>
              <p>Gerencie ingressos e validações com facilidade.</p>
            </div>
          </div>
        </div>
        
        <div className="release-info">
          <Calendar className="calendar-icon" size={16} />
          <p>Previsão de lançamento: Julho 2025</p>
        </div>
        
        <div className="actions">
          <Link to="/register" className="register-button">
            Cadastre-se como participante
          </Link>
          
          <button className="notify-button">
            Avise-me quando lançar
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ComingSoonPage;