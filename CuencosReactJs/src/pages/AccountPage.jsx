import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AccountPage = () => {
  const { user, updateUser } = useAuth();
  
  // Safe extraction of name parts
  const firstName = user?.name ? user.name.split(' ')[0] : '';
  const lastName = user?.name ? user.name.split(' ').slice(1).join(' ') : '';
  
  const [formData, setFormData] = React.useState({
    firstName: firstName,
    lastName: lastName,
    address: user?.address || '',
    city: user?.city || ''
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
      address: formData.address,
      city: formData.city
    });
  };
  
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto py-12 px-4 text-center flex-grow">
          <h1 className="text-2xl font-bold mb-4">Você precisa estar logado para acessar esta página</h1>
          <Link to="/login" className="text-cuencos-purple hover:underline">Fazer login</Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-cuencos-gray rounded-lg p-6 md:mr-8 mb-8 md:mb-0">
              <h2 className="text-xl font-bold text-white mb-6">Configurações da Conta</h2>
              
              <nav className="space-y-1">
                <div className="bg-cuencos-purple px-4 py-2 rounded text-white">
                  Informação da Conta
                </div>
                <Link to="/my-tickets" className="block px-4 py-2 hover:bg-gray-700 rounded text-white">
                  Meus ingressos
                </Link>
                <Link to="/account/email" className="block px-4 py-2 hover:bg-gray-700 rounded text-white">
                  Mudar email
                </Link>
              </nav>
            </div>
            
            {/* Main content */}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-white mb-6">Informação da conta</h1>
              
              <div className="bg-cuencos-gray rounded-lg p-6">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Foto de Perfil</h2>
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-24 h-24 bg-cuencos-purple rounded-full flex items-center justify-center">
                        <span className="text-5xl text-white">👤</span>
                      </div>
                      <button className="absolute bottom-0 right-0 bg-cuencos-black text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-cuencos-purple">
                        📷
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Informação do Perfil</h2>
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
                    
                    <div>
                      <label className="text-gray-400 text-sm">É empresa ou organização?</label>
                      <p className="text-xs text-gray-400">Cadastre algumas informações para te conhecermos melhor!</p>
                      <button className="mt-2 bg-cuencos-purple text-white text-xs rounded-full px-3 py-1">
                        + Entre em contato
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Contact Details</h2>
                  <p className="text-sm text-gray-400 mb-4">These details are private and only used to contact you for ticketing or prizes.</p>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-white mb-1">Endereço:</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Coloque seu endereço"
                        className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-1">City/Town:</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Coloque sua cidade"
                        className="w-full bg-cuencos-black border border-gray-700 rounded p-2 text-white"
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-cuencos-purple hover:bg-cuencos-darkPurple text-white py-2 px-6 rounded-md"
                    >
                      Save My Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
