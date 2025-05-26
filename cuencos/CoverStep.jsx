import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const CoverStep = ({ onSave, initialData, onBack, onDelete, isEditMode }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    // If there's an existing image, show it as preview
    if (initialData && initialData.image && initialData.image !== '/lovable-uploads/placeholder.svg') {
      setPreview(initialData.image);
      
      // Simulate file info for the existing image
      const filename = initialData.image.split('/').pop();
      setFileInfo({
        name: filename || 'capa.jpg',
      });
    }
  }, [initialData]);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Formato inválido",
        description: "Por favor, use apenas arquivos JPG ou PNG",
        variant: "destructive",
      });
      return;
    }
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    setSelectedFile(file);
    setFileInfo(file);
  };
  
  const validateImageDimensions = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isValid = img.width >= 1170 && img.height >= 504;
        resolve(isValid);
      };
      img.onerror = () => {
        resolve(false);
      };
      img.src = src;
    });
  };
  
  const handleChooseFile = () => {
    fileInputRef.current.click();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!preview) {
      toast({
        title: "Imagem necessária",
        description: "Por favor, selecione uma imagem de capa para continuar",
        variant: "destructive",
      });
      return;
    }
    
    // Validate image dimensions
    const isValidDimensions = await validateImageDimensions(preview);
    if (!isValidDimensions) {
      toast({
        title: "Imagem muito pequena",
        description: "A imagem deve ter pelo menos 1170x504 pixels",
        variant: "warning",
      });
      // Allow continuing anyway
    }
    
    onSave({ image: preview });
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl text-white mb-8">Upload de Imagem</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-md p-6">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png"
            className="hidden"
            ref={fileInputRef}
          />
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              {fileInfo ? (
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleChooseFile}
                    className="bg-cuencos-purple text-white text-xs px-3 py-1 rounded-sm mr-2"
                  >
                    Escolher outro
                  </button>
                  <span className="text-gray-400 text-sm">{fileInfo.name}</span>
                  {preview && <span className="text-green-500 ml-2">✓</span>}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleChooseFile}
                  className="bg-cuencos-purple text-white text-xs px-3 py-1 rounded-sm"
                >
                  Escolher arquivo
                </button>
              )}
            </div>
          </div>
          
          {preview ? (
            <div className="relative w-full h-64 overflow-hidden rounded mb-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-700 rounded-md h-64 flex items-center justify-center mb-4">
              <div className="text-center">
                <p className="text-gray-500">Nenhum arquivo selecionado</p>
                <button
                  type="button"
                  onClick={handleChooseFile}
                  className="text-cuencos-purple hover:text-white mt-2"
                >
                  Selecione um arquivo
                </button>
              </div>
            </div>
          )}
          
          <p className="text-sm text-gray-500">
            Imagem deve ter pelo menos 1170 pixels de largura e 504 pixels de altura.
            <br />
            Formatos válidos: JPG e PNG.
          </p>
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

export default CoverStep;
