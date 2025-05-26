import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { registerUser } from '../lib/auth';
import { toast } from '../components/ui/use-toast';
import '../styles/auth.css';
import '../styles/login.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    tipo: 'cliente'  // Valor padrão: cliente
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Verifica se há um parâmetro de consulta para definir o tipo de usuário
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('role') === 'organizer') {
      setFormData(prev => ({ ...prev, tipo: 'organizador' }));
    }
  }, [location]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validação simples
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // Tentativa de registro usando localStorage
    const result = registerUser(formData);
    
    if (result.success) {
      toast({
        title: "Cadastro realizado!",
        description: "Sua conta foi criada com sucesso.",
      });
      
      // Redireciona para a página inicial após cadastro bem-sucedido
      // Se for organizador, redireciona para o dashboard
      if (formData.tipo === 'organizador') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } else {
      toast({
        title: "Erro no cadastro",
        description: result.message || "Ocorreu um erro ao criar sua conta.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };
  
  const isOrganizerRegistration = formData.tipo === 'organizador';
  
  return (
    <div className="login-container">
      {/* Logo alinhada com o texto */}
      <div className="logo">
        <img src="/assets/logo/logocuencospreta.svg" alt="Logo Cuencos" />
        <span className="logo-text">Cuencos</span>
      </div>
      
      {/* Texto promocional */}
      <div className="promo-text">
        <p>
          Crie sua conta e conecte-se a experiências universitárias únicas e inesquecíveis.
        </p>
      </div>
      
      {/* Card de registro */}
      <div className="login-card">
        {isOrganizerRegistration ? (
          <h1 className="text-center text-2xl font-medium mb-6">Cadastro de Organizador</h1>
        ) : (
          <div className="mb-6">
            <div className="welcome-message">VAMOS COMEÇAR</div>
            <h1>Cadastre-se!</h1>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome Completo*</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha*</label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              <span 
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          
          {/* Campo oculto para o tipo */}
          <input 
            type="hidden" 
            name="tipo" 
            value={formData.tipo} 
          />
          
          <button 
            type="submit" 
            className="continue-btn"
            disabled={isLoading}
          >
            {isLoading ? "PROCESSANDO..." : "CONTINUAR"}
          </button>
        </form>
        
        <div className="divider-container">
          <hr className="divider-line" />
          <span className="divider-text">Ou</span>
          <hr className="divider-line" />
        </div>
        
        <div className="google-login">
          <img src="/assets/icons/icon-google.png" alt="Google" />
          <span>Faça login com o Google</span>
        </div>
        
        <div className="signup-link">
          <span>Já tem login? </span>
          <Link to="/login">FAÇA LOGIN AQUI</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
