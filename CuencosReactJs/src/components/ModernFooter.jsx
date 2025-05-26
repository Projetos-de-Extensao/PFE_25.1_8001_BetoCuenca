import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const ModernFooter = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="flex items-center mb-4">
            <img 
              src="/assets/ticket-icon-purple.svg" 
              alt="Cuencos" 
              className="h-8 w-auto mr-2" 
            />
            <span className="text-cuencos-purple text-xl font-semibold">Cuencos</span>
          </div>
          <p className="text-gray-400 text-sm">
            Cuencos é uma plataforma de estudantes feita para você descobrir os melhores 
            eventos universitários e eventos únicos por e para a comunidade acadêmica.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="https://facebook.com" className="text-white hover:text-cuencos-purple">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" className="text-white hover:text-cuencos-purple">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-400 hover:text-white">Conheça o Cuencos</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contato</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white">Política de Privacidade</Link></li>
            <li><Link to="/terms" className="text-gray-400 hover:text-white">Termos de Uso</Link></li>
          </ul>
        </div>
        
        <div className="col-span-1 flex flex-col items-start md:items-center justify-center">
          <h3 className="text-lg font-semibold mb-4">Anuncie na Cuencos!</h3>
          <p className="text-gray-400 text-sm mb-4">Conheça o que há de novo?</p>
          <button className="bg-cuencos-purple text-white font-semibold py-2 px-6 rounded-full hover:bg-cuencos-darkPurple transition-colors">
            Anunciar Agora
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-gray-800">
        <p className="text-center text-gray-500 text-sm">
          Copyright © 2025 Cuencos
        </p>
      </div>
    </footer>
  );
};

export default ModernFooter;
