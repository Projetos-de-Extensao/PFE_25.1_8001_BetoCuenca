import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('johnfrontend@gmail.com');
  const [password, setPassword] = useState('***************');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de login bem-sucedido
    navigate('/logado');
  };

  return (
    <div className="login-container">
      {/* Logo à esquerda */}
      <div className="logo">
        <img src="/images/logo-preta-ingresso.svg" alt="Logo Cuencos" />
        <div className="logo-text">Cuencos</div>
      </div>
      
      {/* Texto promocional à esquerda */}
      <div className="promo-text">
        <p>Encontre as melhores festas universitárias com facilidade e a qualquer hora!</p>
      </div>
      
      {/* Card de login */}
      <div className="login-card">
        <h1>BEM-VINDO DE VOLTA!</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <span 
                className="eye-icon" 
                onClick={() => setShowPassword(!showPassword)}
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
        
        <div className="signup-link">
          <span>Ainda não tem cadastro? </span>
          <Link to="/cadastro">CLIQUE AQUI</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
