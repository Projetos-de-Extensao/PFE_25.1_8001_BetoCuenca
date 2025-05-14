import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
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
            <li><Link to="#">Conheça o Cuencos</Link></li>
            <li><Link to="#">Contato</Link></li>
            <li><Link to="#">Política de Privacidade</Link></li>
            <li><Link to="#">Termos de Uso</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Anuncie */}
        <div className="footer-col">
          <h4>Anuncie na Cuencos!</h4>
          <p>Buscando anunciar num local de confiança a sua festa?</p>
          <Link to="#" className="footer-btn">Anunciar Agora</Link>
        </div>
      </div>

      <hr className="footer-divider" />

      <p className="footer-copy">Copyright © 2025 Cuencos</p>
    </footer>
  );
};

export default Footer;
