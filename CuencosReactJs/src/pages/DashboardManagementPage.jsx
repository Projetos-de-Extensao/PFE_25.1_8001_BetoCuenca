import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';
import DeleteEventModal from '../components/DeleteEventModal';
import '../styles/dashboard.css';
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Edit, Eye, FileText, CalendarDays, Trash2 } from "lucide-react";
import { getEvents, deleteEvent, getEventsByUser } from '../lib/events';
import { useAuth } from '../context/AuthContext';

const DashboardManagementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isOrganizer } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const { toast } = useToast();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

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

    // Carregar dados dos eventos
    const loadEvents = () => {
      try {
        // Carregar eventos do organizador logado
        const userEvents = getEventsByUser(user.id || user.email);
        
        // Separar eventos ativos e rascunhos (eventos com status draft)
        const activeEventsList = userEvents.filter(event => !event.isDraft);
        const draftsList = userEvents.filter(event => event.isDraft);
        
        setEvents(activeEventsList);
        setDrafts(draftsList);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar seus eventos",
        });
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [user, isOrganizer, navigate, toast]);

  // Função para criar um novo evento
  const handleCreateEvent = () => {
    navigate("/event/new");
  };

  // Funções para gerenciar eventos
  const handleViewEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleEditEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleEventDetails = (eventId) => {
    toast({
      title: "Função em desenvolvimento",
      description: "Os detalhes detalhados de vendas estarão disponíveis em breve!",
    });
  };

  const handleContinueEditing = (draftId) => {
    navigate(`/event/${draftId}`);
  };

  // Nova função para abrir o modal de confirmação de exclusão
  const handleDeleteConfirmation = (event) => {
    setEventToDelete(event);
    setDeleteModalOpen(true);
  };

  // Função para confirmar e executar a exclusão
  const confirmDelete = () => {
    try {
      if (!eventToDelete) return;
      
      deleteEvent(eventToDelete.id);
      
      // Atualizar listas locais
      if (events.find(e => e.id === eventToDelete.id)) {
        setEvents(events.filter(e => e.id !== eventToDelete.id));
      } else {
        setDrafts(drafts.filter(d => d.id !== eventToDelete.id));
      }
      
      toast({
        title: "Evento excluído",
        description: "O evento foi excluído com sucesso",
        variant: "success",
      });
      
      // Fechar o modal de confirmação
      setDeleteModalOpen(false);
      setEventToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o evento",
        variant: "destructive",
      });
    }
  };

  // Cancelar a exclusão
  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setEventToDelete(null);
  };

  // Função para verificar qual item do menu está ativo
  const isMenuItemActive = (path) => {
    return location.pathname === path;
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
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Gerenciamento de Eventos</h1>
                <p className="text-gray-400">Gerencie seus eventos e acompanhe o desempenho</p>
              </div>
              
              <Button 
                onClick={handleCreateEvent}
                className="w-full lg:w-auto bg-cuencos-purple hover:bg-cuencos-darkPurple flex items-center justify-center whitespace-nowrap"
              >
                <PlusCircle className="h-4 w-4 mr-1.5" />
                Criar Novo Evento
              </Button>
            </div>
            
            <Separator className="mb-6 bg-gray-800" />
            
            {/* Lista de Eventos Publicados */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">Eventos Publicados</h2>
              
              {events.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <div className="text-5xl mb-4">🎫</div>
                  <h3 className="text-xl font-medium text-white mb-2">Nenhum evento publicado</h3>
                  <p className="text-gray-400 mb-6">Crie seu primeiro evento para aparecer aqui</p>
                  <Button 
                    onClick={handleCreateEvent}
                    className="bg-cuencos-purple hover:bg-cuencos-darkPurple flex items-center whitespace-nowrap"
                  >
                    <PlusCircle className="h-4 w-4 mr-1.5" />
                    Criar Evento
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map(event => (
                    <div key={event.id} className="bg-[#1e1e1e] rounded-xl overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-bold text-lg">{event.title}</h3>
                          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Publicado</span>
                        </div>
                        
                        <div className="flex items-center text-gray-400 text-sm mb-4">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          <span>{event.date}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline"
                            size="sm"
                            className="border border-gray-700 text-gray-300 hover:border-cuencos-purple hover:text-cuencos-purple flex items-center whitespace-nowrap"
                            onClick={() => handleEventDetails(event.id)}
                          >
                            <FileText className="w-4 h-4 mr-1.5" />
                            Vendas
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="border border-gray-700 text-gray-300 hover:border-cuencos-purple hover:text-cuencos-purple flex items-center whitespace-nowrap"
                            onClick={() => handleEditEvent(event.id)}
                          >
                            <Edit className="w-4 h-4 mr-1.5" />
                            Editar
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="border border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 flex items-center whitespace-nowrap"
                            onClick={() => handleDeleteConfirmation(event)}
                          >
                            <Trash2 className="w-4 h-4 mr-1.5" />
                            Excluir
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-cuencos-purple text-white hover:bg-cuencos-darkPurple flex items-center whitespace-nowrap"
                            onClick={() => handleViewEvent(event.id)}
                          >
                            <Eye className="w-4 h-4 mr-1.5" />
                            Ver
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Lista de Rascunhos */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Rascunhos</h2>
              
              {drafts.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <div className="text-5xl mb-4">📝</div>
                  <h3 className="text-xl font-medium text-white mb-2">Nenhum rascunho salvo</h3>
                  <p className="text-gray-400">Os eventos que você salvar como rascunho aparecerão aqui</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {drafts.map(draft => (
                    <div key={draft.id} className="bg-[#1e1e1e] rounded-xl overflow-hidden">
                      <img 
                        src={draft.image || "/assets/images/placeholder.svg"} 
                        alt={draft.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-bold text-lg">{draft.title}</h3>
                          <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded">Rascunho</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button 
                            variant="outline"
                            size="sm"
                            className="border border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500 flex items-center whitespace-nowrap"
                            onClick={() => handleDeleteConfirmation(draft)}
                          >
                            <Trash2 className="w-4 h-4 mr-1.5" />
                            Excluir
                          </Button>
                          <Button 
                            className="bg-cuencos-purple text-white hover:bg-cuencos-darkPurple w-full mt-2 flex items-center justify-center whitespace-nowrap"
                            onClick={() => handleContinueEditing(draft.id)}
                          >
                            <Edit className="w-4 h-4 mr-1.5" />
                            Continuar edição
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* Modal de confirmação de exclusão */}
      <DeleteEventModal 
        isOpen={deleteModalOpen}
        event={eventToDelete}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
      
      <Footer />
    </div>
  );
};

export default DashboardManagementPage;
