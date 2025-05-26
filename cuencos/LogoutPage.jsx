
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  useEffect(() => {
    // Log the user out
    logout();
    
    // Show success toast
    toast({
      title: "Logout",
      description: "Você foi desconectado com sucesso.",
    });
    
    // Redirect to home page
    navigate('/');
  }, [logout, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-cuencos-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cuencos-purple mx-auto"></div>
        <h1 className="text-2xl font-bold text-white mt-4">Saindo...</h1>
        <p className="text-gray-400 mt-2">Você será redirecionado em instantes.</p>
      </div>
    </div>
  );
};

export default LogoutPage;
