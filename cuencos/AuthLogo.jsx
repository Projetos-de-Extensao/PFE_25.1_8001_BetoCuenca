import React from 'react';
import { Link } from 'react-router-dom';

const AuthLogo = () => {
  return (
    <Link to="/" className="logo">
      <img 
        src="/assets/images/logo-cuencos-roxa.png" 
        alt="Logo Cuencos" 
        className="h-10 w-auto"
      />
      
      <span className="logo-text">Cuencos</span>
    </Link>
  );
};

export default AuthLogo;
