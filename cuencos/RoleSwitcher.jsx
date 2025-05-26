
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { UserCog, User, SwitchCamera } from 'lucide-react';

const RoleSwitcher = () => {
  const { isOrganizer, switchUserRole, previousRole } = useAuth();
  const navigate = useNavigate();
  
  const handleSwitchRole = () => {
    // Verifica se o usuário pode alternar para organizador
    if (!isOrganizer() && previousRole !== 'organizador') {
      // Se o usuário não tem papel de organizador, redireciona para o cadastro
      navigate('/register?role=organizer');
      return;
    }
    
    // Caso contrário, use a função switchUserRole com redirecionamento
    switchUserRole(navigate);
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleSwitchRole}
      className="relative group overflow-hidden rounded-full px-3 py-1.5 h-auto transition-all duration-300 
                bg-gradient-to-r from-purple-900/80 to-purple-600/80 hover:from-purple-800 hover:to-purple-500
                border border-purple-500/50 shadow-md hover:shadow-purple-500/20"
    >
      <div className="flex items-center gap-1.5">
        {isOrganizer() ? (
          <>
            <User className="h-3.5 w-3.5 text-white" />
            <span className="text-xs font-medium text-white hidden md:inline">Usuário</span>
          </>
        ) : previousRole === 'organizador' ? (
          <>
            <UserCog className="h-3.5 w-3.5 text-white" />
            <span className="text-xs font-medium text-white hidden md:inline">Organizador</span>
          </>
        ) : (
          <>
            <UserCog className="h-3.5 w-3.5 text-white" />
            <span className="text-xs font-medium text-white hidden md:inline">Seja Organizador</span>
          </>
        )}
        <SwitchCamera className="h-3 w-3 text-white/80 ml-0.5 animate-pulse" />
      </div>

      {/* Efeito de brilho ao passar o mouse */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </Button>
  );
};

export default RoleSwitcher;
