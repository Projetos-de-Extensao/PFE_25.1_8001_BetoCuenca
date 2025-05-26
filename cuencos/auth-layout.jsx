import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const AuthLayout = ({
  children,
  className,
  backgroundImage,
  promoText,
  cardPosition = 'right' // right ou center
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar se está em dispositivo móvel
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div 
      className={cn(
        "w-full min-h-screen bg-cover bg-center relative flex flex-col items-center overflow-hidden",
        isMobile ? "py-8" : "",
        className
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay roxo */}
      <div className="absolute inset-0 bg-purple-900/70 z-0"></div>
      
      {/* Logo */}
      <div className={cn(
        "absolute top-8 flex items-center z-10",
        isMobile ? "left-1/2 -translate-x-1/2" : "left-[10%]"
      )}>
        <Link to="/" className="flex items-center">
          <img 
            src="/assets/logo/logocuencospreta.svg" 
            alt="Cuencos" 
            className="h-12 w-auto mr-2"
          />
          <span className="text-white text-2xl font-bold">Cuencos</span>
        </Link>
      </div>
      
      {/* Texto promocional */}
      <div className={cn(
        "relative z-1 text-white max-w-lg px-6 mx-auto text-center",
        isMobile ? "mt-24 mb-4" : "md:text-left md:mx-0 md:absolute md:left-[10%] md:top-1/2 md:-translate-y-1/2"
      )}>
        <p className="text-2xl md:text-3xl font-normal leading-relaxed">
          {promoText}
        </p>
      </div>
      
      {/* Card de autenticação */}
      <div className={cn(
        "bg-white rounded-xl shadow-lg p-6 md:p-10 w-[90%] max-w-md mx-auto relative z-10",
        isMobile ? "mt-4 mb-8" : "md:absolute md:bottom-5 md:mt-0",
        cardPosition === 'right' && !isMobile ? "md:right-[10%] md:translate-x-0" : 
        isMobile ? "" : "md:left-1/2 md:-translate-x-1/2"
      )}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout; 