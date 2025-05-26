import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';

const ReviewStep = ({ eventData, onPublish, onSaveAsDraft, onBack, onDelete, isEditMode }) => {
  const formatDate = () => {
    if (!eventData.date) return '09 de Maio';
    return `${eventData.date} de Maio`;
  };
  
  const formatEndDate = () => {
    if (!eventData.endDate) return formatDate(); // Se não tiver data final, usa a inicial
    return `${eventData.endDate} de Maio`;
  };
  
  const formatTime = () => {
    if (!eventData.startTime || !eventData.endTime) return '21:00 - 04:00';
    return `${eventData.startTime} - ${eventData.endTime}`;
  };
  
  const isSingleDayEvent = () => {
    return !eventData.endDate || eventData.date === eventData.endDate;
  };
  
  const handleViewAsUser = () => {
    // In a real app, this would open a preview in a new tab or modal
    alert('Esta funcionalidade estará disponível em breve!');
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl text-white mb-4">Quase lá! Confira se está tudo certo.</h2>
      <p className="text-gray-400 mb-8">Você também pode visualizar como usuário antes de decidir</p>
      
      <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg border border-gray-800 mb-8">
        <div className="relative h-56">
          {eventData.image ? (
            <img 
              src={eventData.image} 
              alt={eventData.title || 'Evento'} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500">Sem imagem</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h2 className="text-white text-2xl font-bold mb-6">
            {eventData.title || 'Novo Evento'}
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <Calendar className="text-cuencos-purple mr-3 mt-0.5" size={18} />
              <div>
                <h4 className="text-white font-medium mb-1">Data e Horário</h4>
                <div className="flex flex-col text-sm">
                  {isSingleDayEvent() ? (
                    <>
                      <span className="text-gray-400 mr-2">{formatDate()}</span>
                      <div className="flex items-center mt-1">
                        <Clock className="text-cuencos-purple mr-1" size={14} />
                        <span className="text-gray-400">{formatTime()}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <span className="text-gray-400">Início: {formatDate()}</span>
                        <Clock className="text-cuencos-purple ml-2 mr-1" size={14} />
                        <span className="text-gray-400">{eventData.startTime || '21:00'}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-gray-400">Término: {formatEndDate()}</span>
                        <Clock className="text-cuencos-purple ml-2 mr-1" size={14} />
                        <span className="text-gray-400">{eventData.endTime || '04:00'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="text-cuencos-purple mr-3 mt-0.5" size={18} />
              <div>
                <h4 className="text-white font-medium mb-1">Endereço e Local</h4>
                <p className="text-gray-400 text-sm">
                  {eventData.location || 'Em breve... - Curitiba / Paraná'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-cuencos-purple mr-3 mt-0.5">
                <span className="text-xs font-bold border border-cuencos-purple py-0.5 px-1 rounded">18+</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Faixa Etária</h4>
                <p className="text-gray-400 text-sm">
                  Proibido menores de 18 anos
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-cuencos-purple w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs">O</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Organizadores</h4>
                <p className="text-gray-400 text-sm">
                  Associação Atlética
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-800">
            <h3 className="text-white font-medium mb-3">Descrição do Evento</h3>
            <div className="text-gray-400 text-sm whitespace-pre-wrap">
              {eventData.description || 'Nenhuma descrição fornecida.'}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-800 mt-4">
            <h3 className="text-white font-medium mb-3">Ingresso</h3>
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-white text-sm">
                  {eventData.ticketName || 'Ingresso Padrão'}
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-cuencos-purple font-medium">
                  R$ {eventData.ticketType === 'free' ? '0,00' : (parseFloat(eventData.ticketPrice) || 0).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-cuencos-purple text-cuencos-purple hover:bg-cuencos-purple hover:text-white transition-all flex items-center whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </Button>
        
        <div className="flex gap-3">
          {isEditMode && (
            <Button
              onClick={onDelete}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Excluir Evento
            </Button>
          )}
          
          <Button
            onClick={onSaveAsDraft}
            variant="outline"
            className="border-cuencos-purple text-cuencos-purple hover:bg-cuencos-purple hover:text-white transition-all flex items-center whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Salvar como rascunho
          </Button>
          
          <Button
            onClick={onPublish}
            className="bg-cuencos-purple text-white hover:bg-cuencos-darkPurple flex items-center whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Publicar evento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
