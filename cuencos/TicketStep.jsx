import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const TicketStep = ({ onSave, initialData, onBack, onDelete, isEditMode }) => {
  const [formData, setFormData] = useState({
    ticketType: 'paid',
    ticketName: '',
    ticketPrice: '',
  });
  
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        ticketType: initialData.ticketType || 'paid',
        ticketName: initialData.ticketName || '',
        ticketPrice: initialData.ticketPrice || '',
      });
    }
  }, [initialData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'ticketPrice') {
      // Allow only numbers and one decimal point
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (!regex.test(value) && value !== '') {
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Corrigido para impedir propagação de eventos e resolver o problema de seleção
  const handleTicketTypeChange = (type, e) => {
    // Impede que o evento de clique se propague para outros elementos
    if (e) {
      e.stopPropagation();
    }
    
    setFormData(prev => ({ 
      ...prev, 
      ticketType: type,
      // Reset price to zero if switching to free
      ticketPrice: type === 'free' ? '0' : prev.ticketPrice
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (formData.ticketType === 'paid') {
      if (!formData.ticketName.trim()) {
        newErrors.ticketName = 'O nome do ingresso é obrigatório';
      }
      
      if (!formData.ticketPrice) {
        newErrors.ticketPrice = 'O preço é obrigatório';
      } else {
        const price = parseFloat(formData.ticketPrice);
        if (isNaN(price) || price < 0) {
          newErrors.ticketPrice = 'Por favor, informe um preço válido';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    } else {
      toast({
        title: "Por favor, corrija os erros",
        description: "Há campos obrigatórios não preenchidos",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl text-white mb-8">Qual o tipo de ingresso</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Evento Pago Option */}
          <div 
            className={`
              bg-gray-900 border-2 rounded-xl p-6 cursor-pointer 
              transition-all text-center
              ${formData.ticketType === 'paid' ? 
                'border-cuencos-purple bg-cuencos-purple bg-opacity-10' : 
                'border-gray-700 hover:border-gray-500'}
            `}
            onClick={(e) => handleTicketTypeChange('paid', e)}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-cuencos-purple rounded-full flex items-center justify-center">
                {/* Substituído por um ícone em texto para evitar problemas de caminhos */}
                <span className="text-white text-2xl">🎟️</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-1">Evento Pago</h3>
            <p className="text-sm text-gray-400">Meu evento precisa de ingresso para entrar</p>
          </div>
          
          {/* Evento de graça Option */}
          <div 
            className={`
              bg-gray-900 border-2 rounded-xl p-6 cursor-pointer 
              transition-all text-center
              ${formData.ticketType === 'free' ? 
                'border-cuencos-purple bg-cuencos-purple bg-opacity-10' : 
                'border-gray-700 hover:border-gray-500'}
            `}
            onClick={(e) => handleTicketTypeChange('free', e)}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">FREE</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-1">Evento de graça</h3>
            <p className="text-sm text-gray-400">Estou criando um evento gratuito</p>
          </div>
        </div>
        
        {formData.ticketType === 'paid' && (
          <>
            <h3 className="text-xl text-white mb-6">Qual ingresso você está vendendo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="ticketName" className="text-white text-sm">
                  Nome do Ingresso <span className="text-red-500">*</span>
                </label>
                <Input
                  id="ticketName"
                  name="ticketName"
                  value={formData.ticketName}
                  onChange={handleChange}
                  placeholder="Sexto Lote"
                  className={`bg-gray-900 border-gray-700 text-white ${
                    errors.ticketName ? 'border-red-500' : ''
                  }`}
                />
                {errors.ticketName && (
                  <span className="text-red-500 text-xs">{errors.ticketName}</span>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="ticketPrice" className="text-white text-sm">
                  Preço <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-400">R$</span>
                  </div>
                  <Input
                    id="ticketPrice"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    className={`bg-gray-900 border-gray-700 text-white pl-10 ${
                      errors.ticketPrice ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.ticketPrice && (
                  <span className="text-red-500 text-xs">{errors.ticketPrice}</span>
                )}
              </div>
            </div>
          </>
        )}
        
        <div className="flex justify-between pt-10">
          <Button
            type="button"
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
                type="button"
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
              type="submit"
              className="bg-cuencos-purple text-white hover:bg-cuencos-darkPurple flex items-center whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Salvar e Continuar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketStep;
