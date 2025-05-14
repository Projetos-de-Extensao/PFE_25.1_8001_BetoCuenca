import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './mudarEmail.css';

function MudarEmail() {
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação simples
    if (!newEmail || !confirmEmail) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }
    
    if (newEmail !== confirmEmail) {
      setErrorMessage('Os emails não coincidem.');
      return;
    }
    
    // Aqui você adicionaria o código para atualizar o email no backend
    setSuccessMessage('Email atualizado com sucesso!');
    setErrorMessage('');
    
    // Limpar os campos após envio bem-sucedido
    setNewEmail('');
    setConfirmEmail('');
  };

  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img src="/images/logo cuencos roxa.png" alt="Logo Cuencos"/>
        </div>
        <nav className="nav">
          <Link to="/venda" className="nav-link">Venda aqui</Link>
          <Link to="/login" className="login-button">Login</Link>
        </nav>
      </header>
      
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Configurações da Conta</h2>
          <nav className="sidebar-nav">
            <Link to="/perfil">Informação da Conta</Link>
            <Link to="/meus-ingressos">Meus ingressos</Link>
            <Link to="/mudar-email" className="active">Mudar email</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="content">
          <h1>Mudar email</h1>
          <h2>Mudar email</h2>
          <hr className="footer-divider" />

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email atual:</label>
              <span className="current-email">betocuenca@gmail.com</span>
            </div>

            <div className="form-group">
              <label htmlFor="new-email">Novo email:</label>
              <input 
                type="email" 
                id="new-email" 
                placeholder="Digite seu novo email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-email">Confirmar Email:</label>
              <input 
                type="email" 
                id="confirm-email" 
                placeholder="Digite novamente"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="save-button">Salvar novo email</button>
          </form>
        </main>
      </div>
      
      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          {/* Coluna 1: Logo e descrição */}
          <div className="footer-col">
            <img src="/images/logo cuencos roxa.png" alt="Logo Cuencos" className="footer-logo" />
            <p>
              Cuencos é uma plataforma de autoatendimento para venda de ingressos que conecta
              universitários a eventos criados por e para a comunidade acadêmica.
            </p>
          </div>

          {/* Coluna 2: Sobre Nós */}
          <div className="footer-col" style={{padding: '0 3rem 0 6rem'}}>
            <h4>Sobre Nós</h4>
            <ul>
              <li><Link to="/sobre">Conheça o Cuencos</Link></li>
              <li><Link to="/contato">Contato</Link></li>
              <li><Link to="/privacidade">Política de Privacidade</Link></li>
              <li><Link to="/termos">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Anuncie */}
          <div className="footer-col">
            <h4>Anuncie na Cuencos!</h4>
            <p>Buscando anunciar num local de confiança a sua festa?</p>
            <Link to="/anunciar" className="footer-btn">Anunciar Agora</Link>
          </div>
        </div>

        <hr className="footer-divider" />
        <p className="footer-copy">Copyright © 2025 Cuencos</p>
      </footer>
    </div>
  );
}

export default MudarEmail;
