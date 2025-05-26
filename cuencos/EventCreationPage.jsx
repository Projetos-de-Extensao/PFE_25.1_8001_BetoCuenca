import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';
import EditionStep from '../components/eventCreation/EditionStep';
import CoverStep from '../components/eventCreation/CoverStep';
import TicketStep from '../components/eventCreation/TicketStep';
import ReviewStep from '../components/eventCreation/ReviewStep';
import ProgressBar from '../components/eventCreation/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { updateEvent, addEvent, getEventById, deleteEvent } from '../lib/events';
import DeleteEventModal from '../components/DeleteEventModal';

const EventCreationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isOrganizer } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    image: null,
    ticketType: 'paid',
    ticketName: '',
    ticketPrice: '',
    isDraft: true,
    createdBy: user?.id || user?.email
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Acesso restrito",
        description: "Faça login para criar ou editar eventos",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!isOrganizer()) {
      toast({
        title: "Permissão negada",
        description: "Apenas organizadores podem criar eventos",
        variant: "destructive",
      });
      navigate('/dashboard');
      return;
    }

    // If we have an ID, try to load existing event data
    if (id && id !== 'new') {
      try {
        const event = getEventById(parseInt(id));
        if (!event) {
          toast({
            title: "Evento não encontrado",
            description: "O evento que você está tentando editar não existe",
            variant: "destructive",
          });
          navigate('/dashboard/management');
          return;
        }

        // Format event data for form
        setEventData({
          title: event.title || '',
          description: event.description || '',
          category: event.category || '',
          date: event.date?.split(' de ')[0] || '',
          startTime: event.time?.split(' - ')[0] || '',
          endTime: event.time?.split(' - ')[1] || '',
          location: event.location || '',
          image: event.image || null,
          ticketType: event.price > 0 ? 'paid' : 'free',
          ticketName: event.ticketName || 'Ingresso Padrão',
          ticketPrice: event.price?.toString() || '0',
          isDraft: event.isDraft || false,
          createdBy: event.createdBy || user?.id || user?.email
        });
      } catch (error) {
        console.error('Error loading event:', error);
        toast({
          title: "Erro ao carregar evento",
          description: "Não foi possível carregar os dados do evento",
          variant: "destructive",
        });
      }
    } else {
      // Check if we have draft data in localStorage
      try {
        const editionData = localStorage.getItem('eventoDraft_edicao');
        const coverData = localStorage.getItem('eventoDraft_capa');
        const ticketData = localStorage.getItem('eventoDraft_ingresso');

        if (editionData) {
          const parsedData = JSON.parse(editionData);
          setEventData(prev => ({ ...prev, ...parsedData }));
        }

        if (coverData) {
          const parsedCover = JSON.parse(coverData);
          setEventData(prev => ({ ...prev, image: parsedCover.image }));
        }

        if (ticketData) {
          const parsedTicket = JSON.parse(ticketData);
          setEventData(prev => ({ ...prev, ...parsedTicket }));
        }
      } catch (error) {
        console.error('Error loading draft data:', error);
      }
    }

    setIsLoading(false);
  }, [id, user, isOrganizer, navigate, toast]);

  const steps = [
    { name: 'Edição', component: EditionStep },
    { name: 'Capa', component: CoverStep },
    { name: 'Ingresso', component: TicketStep },
    { name: 'Revisão', component: ReviewStep },
  ];

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditionSave = (editionFormData) => {
    const updatedData = { ...eventData, ...editionFormData };
    setEventData(updatedData);
    
    // Save to localStorage
    localStorage.setItem('eventoDraft_edicao', JSON.stringify(updatedData));
    
    goToNextStep();
  };

  const handleCoverSave = (coverFormData) => {
    const updatedData = { ...eventData, ...coverFormData };
    setEventData(updatedData);
    
    // Save to localStorage
    localStorage.setItem('eventoDraft_capa', JSON.stringify({ image: coverFormData.image }));
    
    goToNextStep();
  };

  const handleTicketSave = (ticketFormData) => {
    const updatedData = { ...eventData, ...ticketFormData };
    setEventData(updatedData);
    
    // Save to localStorage
    localStorage.setItem('eventoDraft_ingresso', JSON.stringify(ticketFormData));
    
    goToNextStep();
  };

  const handlePublish = () => {
    try {
      const dateStr = eventData.date ? `${eventData.date} de Maio` : '09 de Maio';
      const endDateStr = eventData.endDate ? `${eventData.endDate} de Maio` : dateStr;
      const timeStr = eventData.startTime && eventData.endTime ? 
        `${eventData.startTime} - ${eventData.endTime}` : 
        '21:00 - 04:00';
      
      const finalEventData = {
        title: eventData.title,
        description: eventData.description,
        longDescription: eventData.description,
        category: eventData.category,
        date: dateStr,
        endDate: endDateStr,  // Adicionado data final
        time: timeStr,
        location: eventData.location,
        image: eventData.image,
        price: parseFloat(eventData.ticketPrice) || 0,
        ticketName: eventData.ticketName || 'Ingresso Padrão',
        featured: false,
        ageRestriction: "Proibido menores de 18 anos",
        organizers: "Associação Atlética",
        createdBy: user?.id || user?.email,
        isDraft: false,
        salesCount: 0
      };

      let eventId;
      
      if (id && id !== 'new') {
        // Update existing event
        eventId = parseInt(id);
        updateEvent(eventId, finalEventData);
        toast({
          title: "Evento atualizado",
          description: "O evento foi atualizado com sucesso",
          variant: "success",
        });
      } else {
        // Add new event
        const newEvent = addEvent(finalEventData);
        eventId = newEvent.id;
        toast({
          title: "Evento publicado",
          description: "Seu evento foi publicado com sucesso",
          variant: "success",
        });
      }
      
      // Clear localStorage draft data
      localStorage.removeItem('eventoDraft_edicao');
      localStorage.removeItem('eventoDraft_capa');
      localStorage.removeItem('eventoDraft_ingresso');
      
      // Redirecionar para a página de gerenciamento em vez da página de detalhes do evento
      navigate('/dashboard/management');
    } catch (error) {
      console.error('Error publishing event:', error);
      toast({
        title: "Erro ao publicar evento",
        description: "Não foi possível publicar seu evento",
        variant: "destructive",
      });
    }
  };

  const handleSaveAsDraft = () => {
    try {
      const dateStr = eventData.date ? `${eventData.date} de Maio` : '09 de Maio';
      const timeStr = eventData.startTime && eventData.endTime ? 
        `${eventData.startTime} - ${eventData.endTime}` : 
        '21:00 - 04:00';
      
      const finalEventData = {
        title: eventData.title || "Novo Evento",
        description: eventData.description || "Descrição do evento",
        date: dateStr,
        time: timeStr,
        location: eventData.location || "Em breve...",
        image: eventData.image || "/lovable-uploads/placeholder.svg",
        price: parseFloat(eventData.ticketPrice) || 0,
        createdBy: user?.id || user?.email,
        isDraft: true
      };

      if (id && id !== 'new') {
        // Update existing event
        updateEvent(parseInt(id), finalEventData);
        toast({
          title: "Rascunho salvo",
          description: "Suas alterações foram salvas com sucesso",
          variant: "success",
        });
      } else {
        // Add new event as draft
        addEvent(finalEventData);
        toast({
          title: "Rascunho salvo",
          description: "Seu evento foi salvo como rascunho",
          variant: "success",
        });
      }
      
      // Keep localStorage for now, might want to continue editing later
      
      navigate('/dashboard/management');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Erro ao salvar rascunho",
        description: "Não foi possível salvar seu rascunho",
        variant: "destructive",
      });
    }
  };

  const handleDeleteConfirmation = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    try {
      if (!eventId) return;
      
      deleteEvent(parseInt(eventId));
      
      toast({
        title: "Evento excluído",
        description: "O evento foi excluído com sucesso",
        variant: "success",
      });
      
      setDeleteModalOpen(false);
      
      navigate('/dashboard/management');
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o evento",
        variant: "destructive",
      });
    }
  };
  
  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const CurrentStepComponent = steps[currentStep]?.component;

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  const getPageTitle = () => {
    if (id && id !== 'new') {
      return eventData.title || "Editar Evento";
    }
    return "Criar Novo Evento";
  };

  const handleComponentProps = () => {
    const isEditMode = id && id !== 'new';
    
    switch (currentStep) {
      case 0:
        return {
          onSave: handleEditionSave,
          initialData: eventData,
          onBack: () => navigate('/dashboard/management'),
          onDelete: handleDeleteConfirmation,
          isEditMode
        };
      case 1:
        return {
          onSave: handleCoverSave,
          initialData: eventData,
          onBack: goToPreviousStep,
          onDelete: handleDeleteConfirmation,
          isEditMode
        };
      case 2:
        return {
          onSave: handleTicketSave,
          initialData: eventData,
          onBack: goToPreviousStep,
          onDelete: handleDeleteConfirmation,
          isEditMode
        };
      case 3:
        return {
          eventData: eventData,
          onPublish: handlePublish,
          onSaveAsDraft: handleSaveAsDraft,
          onBack: goToPreviousStep,
          onDelete: handleDeleteConfirmation,
          isEditMode
        };
      default:
        return {};
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <DashboardHeader user={user} />
      
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-16 py-8 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-400 hover:text-white mb-4 whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          <h1 className="text-2xl font-bold text-white">{getPageTitle()}</h1>
        </div>
        
        <ProgressBar 
          steps={steps.map(s => s.name)} 
          currentStep={currentStep} 
        />
        
        <div className="my-8">
          {CurrentStepComponent && (
            <CurrentStepComponent 
              {...handleComponentProps()} 
            />
          )}
        </div>
        
        {/* Remover botão de exclusão daqui, pois agora está em cada etapa */}
        
      </div>
      
      {/* Modal de confirmação de exclusão */}
      <DeleteEventModal 
        isOpen={deleteModalOpen}
        event={eventData}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
      
      <Footer />
    </div>
  );
};

export default EventCreationPage;
