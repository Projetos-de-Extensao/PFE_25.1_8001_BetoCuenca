import React, { useState } from 'react';
import './Cadastro.css';

function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Front End",
    email: "johnfrontend@gmail.com",
    password: "***************"
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para processar o cadastro
    console.log("Dados submetidos:", formData);
    // Redirecionar para index.html
    window.location.href = "index.html";
  };

  return (
    <div className="signup-container">
      {/* Logo à esquerda */}
      <div className="logo">
        <img src="/images/logo-preta-ingresso.svg" alt="Logo Cuencos" />
        <div className="logo-text">Cuencos</div>
      </div>
      
      {/* Texto promocional à esquerda */}
      <div className="promo-text">
        <p>Crie sua conta e seja avisado sobre promoções e novas festas!</p>
      </div>
      
      {/* Card de cadastro */}
      <div className="signup-card">
        <div className="signup-header">
          <span className="subtitle">VAMOS COMEÇAR</span>
          <h1>Cadastre-se!</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Seu Nome</label>
            <input 
              type="text" 
              id="name" 
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={formData.password}
                onChange={handleInputChange}
              />
              <span 
                className="eye-icon" 
                onClick={handleTogglePassword}
              ></span>
            </div>
          </div>
          
          <button type="submit" className="continue-btn">CONTINUAR</button>
        </form>
        
        <div className="divider">
          <span>Ou</span>
        </div>
        
        <div className="google-login">
          <img src="/images/google.png" alt="Google" />
          <span>Faça login com o Google</span>
        </div>
        
        <div className="login-link">
          <span>Já tem login? </span>
          <a href="login.html">FAÇA LOGIN AQUI</a>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
