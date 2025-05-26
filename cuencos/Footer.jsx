import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-cuencos-black py-8 border-t border-cuencos-gray mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-cuencos-purple font-bold text-2xl flex items-center mb-4">
              <img 
                src="/assets/images/logo-cuencos-roxa.png" 
                alt="Cuencos" 
                className="h-8 mr-2" 
              />
              Cuencos
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Cuencos é uma plataforma de autoatendimento para venda de ingressos que conecta universitários a eventos criados por e para a comunidade acadêmica.
            </p>
            <div className="flex space-x-2">
              <a href="#" className="text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                f
              </a>
              <a href="#" className="text-white bg-blue-400 rounded-full w-8 h-8 flex items-center justify-center">
                t
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Sobre Nós</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">Conheça a Cuencos</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contato</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Política de Privacidade</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Termos de Uso</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Anuncie na Cuencos!</h3>
            <p className="text-sm text-gray-400 mb-4">
              Buscando anunciar num local de confiança a sua festa?
            </p>
            <Link to="/advertise" className="bg-cuencos-purple hover:bg-cuencos-darkPurple text-white py-2 px-6 rounded-full inline-block">
              Anunciar Agora
            </Link>
          </div>
        </div>

        <div className="border-t border-cuencos-gray mt-8 pt-4 text-center text-sm text-gray-500">
          Copyright © 2025 Cuencos
        </div>
      </div>
    </footer>
  );
};

export default Footer;
