
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Página de índice que redireciona para a página apropriada conforme o tipo de usuário
const Index = () => {
  const { user, isOrganizer, loading } = useAuth();
  
  useEffect(() => {
    // Verifica se há usuário logado no localStorage e não no contexto
    if (!user) {
      try {
        const localUser = localStorage.getItem('usuarioLogado');
        if (localUser) {
          console.log("Usuário encontrado no localStorage:", localUser);
        }
      } catch (error) {
        console.error("Erro ao verificar localStorage:", error);
      }
    }
  }, [user]);
  
  // Aguardar o carregamento do estado de autenticação
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }
  
  // Se o usuário for organizador, redireciona para o dashboard
  if (user && isOrganizer()) {
    return <Navigate to="/dashboard" />;
  }
  
  // Caso contrário, redireciona para a página inicial
  return <Navigate to="/" />;
};

export default Index;
