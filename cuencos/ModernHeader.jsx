import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/modern-header.css';
import { Ticket, User, ChevronDown, LogOut, Heart, LayoutDashboard, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RoleSwitcher from './RoleSwitcher';
import CustomDatePicker from './ui/DatePicker';

const ModernHeader = () => {
  const { user, logout, isOrganizer } = useAuth();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const handleLogout = () => {
    logout();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Aqui você pode implementar a lógica para filtrar eventos pela data selecionada
    console.log("Data selecionada:", date);
  };

  return (
    <>
      <header className="header-modern">
        <div className="header-container">
          <Link to="/" className="header-logo">
            <img 
              src="/assets/images/logo-cuencos-roxa.png" 
              alt="Cuencos" 
              className="header-logo-icon" 
            />
            <span className="header-logo-text">Cuencos</span>
          </Link>
          
          <div className="flex items-center gap-2 mr-4">
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="text-white bg-cuencos-purple px-3 py-1 rounded-md text-sm flex items-center gap-1"
            >
              <Calendar className="h-4 w-4" />
              <span>Buscar por data</span>
            </button>
            
            {showDatePicker && (
              <div className="absolute top-16 bg-cuencos-black p-3 rounded-md shadow-lg z-50">
                <CustomDatePicker 
                  value={selectedDate}
                  onChange={handleDateChange}
                  placeholder="Selecione uma data"
                />
              </div>
            )}
          </div>
          
          <nav className="header-nav">
            <Link to="/favorites" className="header-link flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favoritos</span>
            </Link>
            <Link to="/my-tickets" className="header-link flex items-center gap-1">
              <Ticket className="h-4 w-4" />
              <span className="hidden sm:inline">Meus ingressos</span>
            </Link>
            {user ? (
              <>
                {isOrganizer() && (
                  <Link to="/dashboard" className="header-link flex items-center gap-1">
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                )}
                {/* Botão de alternância de papel - Com design melhorado */}
                <div className="mx-2">
                  {(isOrganizer() || user.previousRole === 'organizador') && (
                    <RoleSwitcher />
                  )}
                </div>
                
                <Link to="/account" className="header-link">
                  <User className="h-5 w-5" />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="header-link cursor-pointer">
                    <ChevronDown className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                    <DropdownMenuLabel>Olá, {user.name?.split(' ')[0] || user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem 
                      className="hover:bg-gray-700 cursor-pointer focus:bg-gray-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login" className="header-link">
                <User className="h-5 w-5" />
              </Link>
            )}
          </nav>
        </div>
      </header>
      <div className="header-spacer"></div>
    </>
  );
};

export default ModernHeader;
