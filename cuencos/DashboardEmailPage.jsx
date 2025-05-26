import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';
import '../styles/dashboard.css';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check } from "lucide-react";
import { useAuth } from '../context/AuthContext';

const DashboardEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isOrganizer, updateUserEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Estados para os campos do formulário
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verificar se o usuário está logado
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

    setIsLoading(false);
  }, [user, navigate, toast]);

  // Função para verificar qual item do menu está ativo
  const isMenuItemActive = (path) => {
    return location.pathname === path;
  };

  // Validação do formulário
  const validateForm = () => {
    const errors = {};
    
    // Validar senha atual
    if (!currentPassword) {
      errors.currentPassword = "A senha atual é obrigatória";
    }
    
    // Validar novo email
    if (!newEmail) {
      errors.newEmail = "O novo email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(newEmail)) {
      errors.newEmail = "Email inválido";
    }
    
    // Validar confirmação de email
    if (!confirmEmail) {
      errors.confirmEmail = "A confirmação do email é obrigatória";
    } else if (newEmail !== confirmEmail) {
      errors.confirmEmail = "Os emails não coincidem";
    }
    
    // Verificar se o novo email é igual ao atual
    if (newEmail && user && newEmail === user.email) {
      errors.newEmail = "O novo email deve ser diferente do atual";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Função para submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulário antes de submeter
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simular uma chamada à API com tempo de resposta
      setTimeout(() => {
        // Atualizar o email do usuário (implementação simulada)
        const success = updateUserEmail(currentPassword, newEmail);
        
        if (success) {
          toast({
            title: "Email atualizado com sucesso",
            description: "Seu email foi alterado para " + newEmail,
            variant: "success",
          });
          
          // Limpar formulário
          setCurrentPassword('');
          setNewEmail('');
          setConfirmEmail('');
        } else {
          toast({
            title: "Erro ao atualizar email",
            description: "Senha incorreta ou erro de serviço",
            variant: "destructive",
          });
        }
        
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar email:", error);
      toast({
        title: "Erro ao atualizar email",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      });
      setIsSubmitting(false);
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
            <Link 
              to="/dashboard/account" 
              className={`py-2 px-3 rounded whitespace-nowrap transition-colors ${
                isMenuItemActive('/dashboard/account') 
                  ? 'text-cuencos-purple bg-cuencos-purple/10 font-medium' 
                  : 'text-gray-300 hover:bg-cuencos-purple/10 hover:text-white'
              }`}
            >
              Informação da Conta
            </Link>
            <Link 
              to="/dashboard/management" 
              className={`py-2 px-3 rounded whitespace-nowrap transition-colors ${
                isMenuItemActive('/dashboard/management') 
                  ? 'text-cuencos-purple bg-cuencos-purple/10 font-medium' 
                  : 'text-gray-300 hover:bg-cuencos-purple/10 hover:text-white'
              }`}
            >
              Gerenciamento de Eventos
            </Link>
            <Link 
              to="/dashboard/email" 
              className={`py-2 px-3 rounded whitespace-nowrap transition-colors ${
                isMenuItemActive('/dashboard/email') 
                  ? 'text-cuencos-purple bg-cuencos-purple/10 font-medium' 
                  : 'text-gray-300 hover:bg-cuencos-purple/10 hover:text-white'
              }`}
            >
              Mudar email
            </Link>
          </nav>
        </aside>
        
        {/* Conteúdo principal */}
        <main className="flex-1 p-4 lg:p-6 bg-[#1A1A1A]">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Mudar Email</h1>
              <p className="text-gray-400">Atualize seu endereço de email para receber notificações e acessar sua conta</p>
            </div>
            
            <Separator className="mb-6 bg-gray-800" />
            
            <Card className="bg-[#2D2D2D] border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white text-xl">Email Atual</CardTitle>
                <CardDescription className="text-gray-400">
                  Este é o email atualmente associado à sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center bg-[#1A1A1A] p-3 rounded-md border border-gray-700">
                  <span className="text-white font-medium">{user.email}</span>
                  <div className="ml-auto flex items-center bg-green-900/30 text-green-400 text-sm font-medium rounded-full px-3 py-1">
                    <Check className="w-4 h-4 mr-1" />
                    <span>Verificado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#2D2D2D] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Atualizar Email</CardTitle>
                <CardDescription className="text-gray-400">
                  Preencha o formulário abaixo para atualizar seu email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-gray-200">
                        Senha Atual <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Digite sua senha atual"
                        className={`bg-[#1A1A1A] border-gray-700 text-white ${formErrors.currentPassword ? 'border-red-500' : ''}`}
                      />
                      {formErrors.currentPassword && (
                        <p className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {formErrors.currentPassword}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newEmail" className="text-gray-200">
                        Novo Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="newEmail"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Digite seu novo email"
                        className={`bg-[#1A1A1A] border-gray-700 text-white ${formErrors.newEmail ? 'border-red-500' : ''}`}
                      />
                      {formErrors.newEmail && (
                        <p className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {formErrors.newEmail}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmEmail" className="text-gray-200">
                        Confirmar Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="confirmEmail"
                        type="email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        placeholder="Confirme seu novo email"
                        className={`bg-[#1A1A1A] border-gray-700 text-white ${formErrors.confirmEmail ? 'border-red-500' : ''}`}
                      />
                      {formErrors.confirmEmail && (
                        <p className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {formErrors.confirmEmail}
                        </p>
                      )}
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-cuencos-purple text-white hover:bg-cuencos-darkPurple"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processando..." : "Atualizar Email"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-6 bg-amber-500/10 border border-amber-500/30 rounded-md p-4">
              <h3 className="text-amber-400 font-medium flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                Observação Importante
              </h3>
              <p className="text-gray-300 mt-2 text-sm">
                Após a alteração do seu email, você receberá uma mensagem de confirmação em seu novo endereço. 
                Você precisará verificar esse novo email antes de poder usá-lo para fazer login.
              </p>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardEmailPage;
