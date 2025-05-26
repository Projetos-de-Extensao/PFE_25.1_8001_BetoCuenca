import React from 'react';

const GoogleLoginButton = ({ onClick, disabled }) => {
  return (
    <button 
      className="google-login" 
      onClick={onClick}
      disabled={disabled}
    >
      {/* Ícone à esquerda e texto à direita */}
      <img src="/assets/icons/google-icon.png" alt="Google" className="google-icon" />
      <span>Faça login com o Google</span>
    </button>
  );
};

export default GoogleLoginButton;
