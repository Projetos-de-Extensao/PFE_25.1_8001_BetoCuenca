import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <>
      <header className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
        <div className="navbar-section">
          <Link to={isLoggedIn ? "/logado" : "/"}>
            <img src="/images/logo-header.svg" alt="Cuencos Logo" className="logo" />
          </Link>
        </div>
        
        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <div className={`navbar-section navbar-end ${menuOpen ? 'active' : ''}`}>
          <div className="close-menu" onClick={closeMenu}></div>
          
          {isLoggedIn ? (
            <>
              <Link to="/user/favoritos" className="nav-item" onClick={closeMenu}>
                <img src="/images/Star 1.png" alt="Favoritos" className="nav-icon" />
                <span>Favoritos</span>
              </Link>
              <Link to="#" className="nav-item" onClick={closeMenu}>
                <img src="/images/ion_ticket.png" alt="Meus Ingressos" className="nav-icon" />
                <span>Meus Ingressos</span>
              </Link>
              <Link to="/user/perfil">
                <img src="/images/Profile dropdown.png" alt="Perfil" className="profile-icon" />
              </Link>
            </>
          ) : (
            <>
              <Link to="#" className="nav-item" onClick={closeMenu}>Venda aqui</Link>
              <Link to="/login" className="login-button" onClick={closeMenu}>Login</Link>
            </>
          )}
        </div>
      </header>
      
      <div className={`menu-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
    </>
  );
};

export default Header;
