import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import CategorySelect from '../ui/CategorySelect';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomDatePicker from '../ui/DatePicker';

const EditionStep = ({ onSave, initialData, onBack, onDelete, isEditMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    endDate: '', // Novo campo para data final
    location: '',
    description: '',
  });
  
  const [errors, setErrors] = useState({});
  
  // Converter strings de data para objetos Date
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || '',
        date: initialData.date || '',
        startTime: initialData.startTime || '',
        endTime: initialData.endTime || '',
        endDate: initialData.endDate || '',
        location: initialData.location || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSelectChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Manipuladores de data específicos
  const handleDateChange = (date, field) => {
    // Extrai o dia do objeto Date
    const day = date.getDate();
    
    setFormData(prev => ({
      ...prev,
      [field]: day.toString() // Guarda apenas o dia como string
    }));
    
    // Limpa erro se existir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'O título do evento é obrigatório';
    }
    
    if (!formData.category) {
      newErrors.category = 'Selecione uma categoria';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'O local do evento é obrigatório';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'A descrição do evento é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  const categories = [
    "Atlética", 
    "Festa", 
    "Congresso", 
    "Workshop", 
    "Feira", 
    "Palestra",
    "Cultural",
    "Esportivo"
  ];
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl text-white mb-8">Detalhes do Evento</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="title" className="text-white text-sm">
              Título do Evento <span className="text-red-500">*</span>
            </label>
            {errors.title && (
              <span className="text-red-500 text-xs">{errors.title}</span>
            )}
          </div>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nome inteiro do Evento"
            className={`bg-gray-900 border-gray-700 text-white ${
              errors.title ? 'border-red-500' : ''
            }`}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="category" className="text-white text-sm">
              Categoria <span className="text-red-500">*</span>
            </label>
            {errors.category && (
              <span className="text-red-500 text-xs">{errors.category}</span>
            )}
          </div>
          <CategorySelect
            value={formData.category}
            onChange={(value) => handleSelectChange(value, 'category')}
            error={errors.category}
          />
        </div>
        
        <h3 className="text-white text-lg mt-8">Data e Horário</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <label htmlFor="date" className="text-white text-sm">
                Data de início <span className="text-red-500">*</span>
              </label>
            </div>
            <CustomDatePicker
              value={formData.date ? new Date(2025, 4, parseInt(formData.date)) : null}
              onChange={(date) => handleDateChange(date, 'date')}
              placeholder="Selecione uma data"
              label={null}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <label htmlFor="startTime" className="text-white text-sm">
                Horário de início <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative">
              <Input
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                placeholder="21:00"
                className="bg-gray-900 border-gray-700 text-white pl-10"
              />
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cuencos-purple" size={16} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <label htmlFor="endDate" className="text-white text-sm">
                Data de término <span className="text-red-500">*</span>
              </label>
            </div>
            <CustomDatePicker
              value={formData.endDate ? new Date(2025, 4, parseInt(formData.endDate)) : null}
              onChange={(date) => handleDateChange(date, 'endDate')}
              placeholder="Selecione uma data"
              label={null}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <label htmlFor="endTime" className="text-white text-sm">
                Horário de término <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative">
              <Input
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                placeholder="04:00"
                className="bg-gray-900 border-gray-700 text-white pl-10"
              />
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cuencos-purple" size={16} />
            </div>
          </div>
        </div>
        
        <h3 className="text-white text-lg mt-4">Local</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="location" className="text-white text-sm">
              Onde o evento vai acontecer? <span className="text-red-500">*</span>
            </label>
            {errors.location && (
              <span className="text-red-500 text-xs">{errors.location}</span>
            )}
          </div>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Em breve... - Curitiba / Paraná"
            className={`bg-gray-900 border-gray-700 text-white ${
              errors.location ? 'border-red-500' : ''
            }`}
          />
        </div>
        
        <h3 className="text-white text-lg mt-4">Descrição</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="description" className="text-white text-sm">
              Descrição do Evento <span className="text-red-500">*</span>
            </label>
            {errors.description && (
              <span className="text-red-500 text-xs">{errors.description}</span>
            )}
          </div>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Escreva detalhes e informações sobre o evento"
            className={`bg-gray-900 border-gray-700 text-white min-h-[200px] ${
              errors.description ? 'border-red-500' : ''
            }`}
          />
        </div>
        
        <div className="flex justify-between pt-4">
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

export default EditionStep;
