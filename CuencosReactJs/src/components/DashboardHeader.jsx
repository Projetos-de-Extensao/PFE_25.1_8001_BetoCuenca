import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ChevronDown, Settings, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard-header.css';
import RoleSwitcher from './RoleSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const DashboardHeader = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="header-modern">
      <div className="header-container" style={{ justifyContent: 'space-between', gap: '1.5rem' }}>
        <Link to="/" className="header-logo">
          <img 
            src="/assets/logo/logocuencosroxa.png" 
            alt="Cuencos" 
            className="header-logo-icon"
            onError={(e) => {
              e.target.src = "/assets/logo/logocuencospreta.svg";
            }}
          />
          <span id="CuencosTextOrganizador" className="header-logo-texto">Cuencos</span>
        </Link>
        
        <div className="flex items-center gap-2" style={{ marginLeft: 'auto' }}>
          <button 
            className="lg:hidden text-white p-2 hover:bg-gray-800 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <nav className={`header-nav ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <Link to="/dashboard" className="header-link menu-item">
              <div className="menu-item-content">
                <img 
                  src="/assets/icons/iconeDashboard.png" 
                  alt="Dashboard" 
                  className="header-icon"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link to="/dashboard/management" className="header-link menu-item">
              <div className="menu-item-content">
                <img 
                  src="/assets/icons/icone-ingresso.png" 
                  alt="Gerenciamento" 
                  className="header-icon"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span>Gerenciamento</span>
              </div>
            </Link>
            
            <div className="mx-2 menu-item">
              <RoleSwitcher />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="header-link cursor-pointer menu-item">
                <div className="menu-item-content">
                  <User className="header-icon" />
                  <span>Perfil</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white dropdown-menu-content">
                <DropdownMenuLabel>Olá, {user?.name?.split(' ')[0] || user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  className="hover:bg-gray-700 cursor-pointer focus:bg-gray-700"
                  onClick={() => navigate('/dashboard/account')}
                >
                  <User className="h-5 w-5 mr-2" /> Perfil
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-gray-700 cursor-pointer focus:bg-gray-700"
                  onClick={() => navigate('/dashboard/email')}
                >
                  <img 
                    src="/assets/icons/icone-email.png" 
                    alt="Email" 
                    className="h-5 w-5 mr-2"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  /> Mudar Email
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-gray-700 cursor-pointer focus:bg-gray-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
