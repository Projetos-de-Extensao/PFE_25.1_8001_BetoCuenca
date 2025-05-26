import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

const OrganizerAccountPage = () => {
  const { user, updateUser } = useAuth();
  
  // Safe extraction of name parts
  const firstName = user?.name ? user.name.split(' ')[0] : '';
  const lastName = user?.name ? user.name.split(' ').slice(1).join(' ') : '';
  
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    organizationName: user?.organizationName || '',
    cnpj: user?.cnpj || '',
    address: user?.address || '',
    city: user?.city || '',
    phone: user?.phone || ''
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
    
    // Update user info
    updateUser({
      name: `${formData.firstName} ${formData.lastName}`,
      organizationName: formData.organizationName,
      cnpj: formData.cnpj,
      address: formData.address,
      city: formData.city,
      phone: formData.phone
    });

    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso",
      variant: "success"
    });
  };
  
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="container mx-auto py-12 px-4 text-center flex-grow">
          <h1 className="text-2xl font-bold mb-4 text-white">Você precisa estar logado para acessar esta página</h1>
          <Link to="/login" className="text-cuencos-purple hover:underline">Fazer login</Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1A1A]">
      <DashboardHeader user={user} />
      
      <div className="flex-grow px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="bg-[#2D2D2D] w-full lg:w-64 flex-shrink-0 p-4 lg:p-6 rounded-lg mb-6 lg:mb-0 lg:mr-8">
              <h2 className="text-white font-bold text-lg lg:text-xl mb-4">Configurações da Conta</h2>
              
              <nav className="flex flex-col space-y-2">
                <div className="bg-cuencos-purple/20 px-4 py-2 rounded text-cuencos-purple font-medium">
                  Informação da Conta
                </div>
                <Link to="/dashboard/management" className="text-gray-300 px-4 py-2 hover:bg-gray-700 rounded">
                  Gerenciamento de Eventos
                </Link>
                <Link to="/dashboard/email" className="text-gray-300 px-4 py-2 hover:bg-gray-700 rounded">
                  Mudar Email
                </Link>
              </nav>
            </aside>
            
            {/* Main content */}
            <div className="flex-grow bg-[#1e1e1e] rounded-lg p-6">
              <h1 className="text-3xl font-bold text-white mb-6">Informações da Conta</h1>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Foto de Perfil</h2>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-cuencos-purple rounded-full flex items-center justify-center">
                      <span className="text-5xl text-white">🏢</span>
                    </div>
                    <button className="absolute bottom-0 right-0 bg-cuencos-black text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-cuencos-purple">
                      📷
                    </button>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6 bg-gray-800" />
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Informações Pessoais</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-1">Primeiro Nome:</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-1">Sobrenomes:</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                      />
                    </div>
                  </div>
                </form>
              </div>
              
              <Separator className="my-6 bg-gray-800" />
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Dados da Organização</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-white mb-1">Nome da Organização:</label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      placeholder="Atlética / Empresa / Organização"
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-1">CNPJ (opcional):</label>
                    <input
                      type="text"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleChange}
                      placeholder="00.000.000/0000-00"
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                    />
                  </div>
                </form>
              </div>
              
              <Separator className="my-6 bg-gray-800" />
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Contato e Endereço</h2>
                <p className="text-sm text-gray-400 mb-4">Estas informações são utilizadas apenas para contato e gestão dos seus eventos.</p>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-white mb-1">Telefone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-1">Endereço:</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Rua, número, complemento"
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-1">Cidade/Estado:</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Cidade / UF"
                      className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-cuencos-purple hover:bg-cuencos-darkPurple text-white py-2 px-6 rounded-md"
                  >
                    Salvar Alterações
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrganizerAccountPage;
