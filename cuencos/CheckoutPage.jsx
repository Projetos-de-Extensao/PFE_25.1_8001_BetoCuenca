import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { toast } from '../components/ui/use-toast';
import '../styles/checkout.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticketSelection, setTicketSelection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  useEffect(() => {
    const storedSelection = localStorage.getItem('ticketSelection');
    if (!storedSelection) {
      navigate('/');
      return;
    }
    
    // Verificar se os dados são recentes (menos de 24 horas)
    const data = JSON.parse(storedSelection);
    if (Date.now() - (data.timestamp || 0) > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('ticketSelection');
      navigate('/');
      return;
    }
    
    setTicketSelection(data);
  }, [navigate]);
  
  const closeModal = () => {
    setIsModalOpen(false);
    navigate(-1);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Preencha este campo.';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Preencha este campo.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido.';
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'Você precisa aceitar os termos.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validate()) {
      // Add service fee
      const serviceFee = ticketSelection.totalPrice * 0.1; // 10% service fee
      
      // Store checkout info
      const checkoutInfo = {
        ...ticketSelection,
        participantInfo: formData,
        serviceFee,
        finalTotal: ticketSelection.totalPrice + serviceFee,
        timestamp: Date.now(),
      };
      
      localStorage.setItem('checkoutInfo', JSON.stringify(checkoutInfo));
      navigate('/success');
    } else if (errors.terms) {
      // Se houver erro nos termos, rolar para o checkbox
      const termsElement = document.getElementById('terms');
      if (termsElement) {
        termsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  if (!ticketSelection) return null;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-grow">
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Detalhes do Participante"
        >
          <div className="mb-4">
            <h2 className="text-cuencos-purple font-medium mb-1">PUC IN RIO</h2>
            <div className="flex items-center mb-4">
              <span className="text-gray-400 mr-2">📅</span>
              <span className="text-white">09 de Maio de 2025</span>
            </div>
            
            <h3 className="text-white font-medium border-b border-cuencos-purple pb-2 mb-4">
              Sexto Lote: PUC IN RIO
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Nome Completo</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Coloque seu nome completo"
                  className="w-full bg-cuencos-gray text-white p-3 rounded-md"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="block text-gray-400 mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Coloque seu email"
                  className="w-full bg-cuencos-gray text-white p-3 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>
          
          <div className={`flex items-center mt-4 mb-8 ${errors.terms ? 'terms-error' : ''}`}>
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className={`mr-2 ${errors.terms ? 'ring-2 ring-red-500' : ''}`}
            />
            <label htmlFor="terms" className="text-white">
              Eu aceito os <span className="text-blue-400">Terms de Uso</span> e li a <span className="text-blue-400">Política de Privacidade</span>
            </label>
          </div>
          {errors.terms && (<p className="text-red-500 text-sm mb-4">{errors.terms}</p>)}
          
          <div className="border-t border-cuencos-gray pt-4 pb-4">
            <div className="flex justify-between text-lg text-white">
              <span>Qtd: <span className="text-cuencos-purple">{ticketSelection.quantity}</span></span>
              <span>Total: <span className="text-cuencos-purple">R${ticketSelection.totalPrice.toFixed(2)}</span></span>
            </div>
          </div>
          
          <button 
            onClick={handleSubmit}
            className="w-full bg-cuencos-purple hover:bg-cuencos-darkPurple text-white py-4 rounded-md text-lg font-medium flex items-center justify-center"
          >
            Continue to Checkout <span className="ml-2">→</span>
          </button>
        </Modal>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
