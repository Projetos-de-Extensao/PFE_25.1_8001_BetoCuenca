import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

const OrganizerChangeEmailPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    currentEmail: user?.email || '',
    newEmail: '',
    confirmEmail: '',
    password: '' // Adicionando campo de senha para maior segurança
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate emails
    if (formData.newEmail !== formData.confirmEmail) {
      toast({
        title: "Erro",
        description: "Os emails não correspondem",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.password) {
      toast({
        title: "Erro",
        description: "Por favor, digite sua senha para confirmar",
        variant: "destructive"
      });
      return;
    }
    
    // Em uma aplicação real, você verificaria a senha antes de permitir a mudança
    
    // Update user email
    updateUser({ email: formData.newEmail });
    
    toast({
      title: "Email atualizado",
      description: "Seu email foi atualizado com sucesso",
      variant: "success"
    });
    
    // Navigate back to account page
    navigate('/dashboard/account');
  };
  
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="container mx-auto py-12 px-4 text-center flex-grow">
          <h1 className="text-2xl font-bold mb-4 text-white">Você precisa estar logado para acessar esta página</h1>
          <Link to="/login" className="text-cuencos-purple hover:underline">Fazer login</Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1A1A]">
      <DashboardHeader user={user} />
      
      <div className="flex-grow px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="bg-[#2D2D2D] w-full lg:w-64 flex-shrink-0 p-4 lg:p-6 rounded-lg mb-6 lg:mb-0 lg:mr-8">
              <h2 className="text-white font-bold text-lg lg:text-xl mb-4">Configurações da Conta</h2>
              
              <nav className="flex flex-col space-y-2">
                <Link to="/dashboard/account" className="text-gray-300 px-4 py-2 hover:bg-gray-700 rounded">
                  Informação da Conta
                </Link>
                <Link to="/dashboard/management" className="text-gray-300 px-4 py-2 hover:bg-gray-700 rounded">
                  Gerenciamento de Eventos
                </Link>
                <div className="bg-cuencos-purple/20 px-4 py-2 rounded text-cuencos-purple font-medium">
                  Mudar Email
                </div>
              </nav>
            </aside>
            
            {/* Main content */}
            <div className="flex-grow bg-[#1e1e1e] rounded-lg p-6">
              <h1 className="text-3xl font-bold text-white mb-6">Mudar Email</h1>
              
              <div className="max-w-2xl">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <h3 className="text-yellow-400 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Importante
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">
                    Ao alterar seu email, você precisará usá-lo para fazer login na próxima vez. 
                    Certifique-se de que o novo email é válido e que você tem acesso a ele.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white mb-1">Email atual:</label>
                    <input
                      type="email"
                      name="currentEmail"
                      value={formData.currentEmail}
                      disabled
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white opacity-70"
                    />
                  </div>
                  
                  <Separator className="my-4 bg-gray-800" />
                  
                  <div>
                    <label className="block text-white mb-1">Novo email:</label>
                    <input
                      type="email"
                      name="newEmail"
                      value={formData.newEmail}
                      onChange={handleChange}
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                      placeholder="Digite seu novo email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-1">Confirmar novo email:</label>
                    <input
                      type="email"
                      name="confirmEmail"
                      value={formData.confirmEmail}
                      onChange={handleChange}
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                      placeholder="Digite novamente"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-1">Sua senha atual:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                      placeholder="Digite sua senha para confirmar"
                      required
                    />
                    <p className="text-gray-400 text-xs mt-1">
                      Para sua segurança, precisamos verificar sua identidade
                    </p>
                  </div>
                  
                  <div className="flex space-x-4 pt-2">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard/account')}
                      className="border border-gray-600 text-gray-300 hover:bg-gray-700 py-2 px-6 rounded-md"
                    >
                      Cancelar
                    </button>
                    
                    <button
                      type="submit"
                      className="bg-cuencos-purple hover:bg-cuencos-darkPurple text-white py-2 px-6 rounded-md"
                    >
                      Atualizar Email
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrganizerChangeEmailPage;
