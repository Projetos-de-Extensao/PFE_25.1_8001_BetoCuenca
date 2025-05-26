import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';
import '../styles/dashboard.css';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '../context/AuthContext';

const DashboardAccountPage = () => {
  const navigate = useNavigate();
  const { user, isOrganizer, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
  });

  // Verificar se o usuário está logado e é um organizador
  useEffect(() => {
    if (!user) {
      toast({
        title: "Acesso restrito",
        description: "Faça login para acessar esta página",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!isOrganizer()) {
      toast({
        variant: "destructive",
        title: "Acesso restrito",
        description: "Essa área é exclusiva para organizadores",
      });
      navigate('/');
      return;
    }

    // Preencher o formulário com os dados do usuário
    setFormData({
      name: user.name || '',
      email: user.email || '',
      organization: user.organization || '',
      phone: user.phone || '',
    });

    setIsLoading(false);
  }, [user, isOrganizer, navigate, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Atualizar o perfil do usuário
      // Note: Esta função precisa ser implementada no AuthContext
      updateUserProfile(formData);
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso",
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar seu perfil",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="dashboard-loading">Carregando...</div>;
  }

  return (
    <div className="dashboard-page">
      <DashboardHeader user={user} />
      
      {/* Adicionando um espaçador para compensar o header fixo */}
      <div className="header-spacer"></div>
      
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)]">
        {/* Sidebar */}
        <aside className="bg-[#2D2D2D] w-full lg:w-64 flex-shrink-0 p-4 lg:p-6">
          <h2 className="text-white font-bold text-lg lg:text-xl mb-4">Configurações da Conta</h2>
          
          <nav className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
            <a 
              href="/dashboard/account" 
              className="text-cuencos-purple py-2 px-3 rounded bg-cuencos-purple/10 font-medium whitespace-nowrap"
            >
              Informação da Conta
            </a>
            <a 
              href="/dashboard/management" 
              className="text-gray-300 py-2 px-3 rounded hover:bg-cuencos-purple/10 hover:text-white transition-colors whitespace-nowrap"
            >
              Gerenciamento de Eventos
            </a>
            <a 
              href="/dashboard/email" 
              className="text-gray-300 py-2 px-3 rounded hover:bg-cuencos-purple/10 hover:text-white transition-colors whitespace-nowrap"
            >
              Mudar email
            </a>
          </nav>
        </aside>
        
        {/* Conteúdo principal */}
        <main className="flex-1 p-4 lg:p-6 bg-[#1A1A1A]">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Informações da Conta</h1>
              <p className="text-gray-400">Atualize suas informações pessoais</p>
            </div>
            
            <Separator className="mb-6 bg-gray-800" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nome completo</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="bg-gray-800 border-gray-700 text-gray-400"
                  />
                  <p className="text-xs text-gray-500">
                    Para alterar seu email, use a opção "Mudar email" no menu lateral.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-white">Organização</Label>
                  <Input 
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="Nome da sua organização"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Telefone</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit"
                  className="bg-cuencos-purple hover:bg-cuencos-darkPurple text-white"
                >
                  Salvar alterações
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardAccountPage;
