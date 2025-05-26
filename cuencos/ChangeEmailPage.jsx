
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from '@/components/ui/use-toast';

const ChangeEmailPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    currentEmail: user?.email || '',
    newEmail: '',
    confirmEmail: ''
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
        description: "Os emails não correspondem.",
        variant: "destructive"
      });
      return;
    }
    
    // Update user email
    updateUser({ email: formData.newEmail });
    
    toast({
      title: "Sucesso",
      description: "Seu email foi atualizado com sucesso."
    });
    
    // Navigate back to account page
    navigate('/account');
  };
  
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto py-12 px-4 text-center flex-grow">
          <h1 className="text-2xl font-bold mb-4">Você precisa estar logado para acessar esta página</h1>
          <Link to="/login" className="text-cuencos-purple hover:underline">Fazer login</Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-cuencos-gray rounded-lg p-6 md:mr-8 mb-8 md:mb-0">
              <h2 className="text-xl font-bold text-white mb-6">Configurações da Conta</h2>
              
              <nav className="space-y-1">
                <Link to="/account" className="block px-4 py-2 hover:bg-gray-700 rounded text-white">
                  Informação da Conta
                </Link>
                <Link to="/my-tickets" className="block px-4 py-2 hover:bg-gray-700 rounded text-white">
                  Meus ingressos
                </Link>
                <div className="bg-cuencos-purple px-4 py-2 rounded text-white">
                  Mudar email
                </div>
              </nav>
            </div>
            
            {/* Main content */}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-white mb-6">Mudar email</h1>
              
              <div className="bg-cuencos-gray rounded-lg p-6">
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
                  
                  <div>
                    <label className="block text-white mb-1">Novo email:</label>
                    <input
                      type="email"
                      name="newEmail"
                      value={formData.newEmail}
                      onChange={handleChange}
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                      placeholder="Enter new email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-1">Confirmar Email:</label>
                    <input
                      type="email"
                      name="confirmEmail"
                      value={formData.confirmEmail}
                      onChange={handleChange}
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                      placeholder="Enter again"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-cuencos-purple hover:bg-cuencos-darkPurple text-white py-2 px-8 rounded-md"
                  >
                    Salvar novo email
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChangeEmailPage;
