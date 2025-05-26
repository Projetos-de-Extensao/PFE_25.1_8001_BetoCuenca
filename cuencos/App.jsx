import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "./components/ui/toaster"; // Corrigido o caminho de importação
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from "./components/theme-provider"; // Corrigido o caminho da importação

// Importação de todas as páginas
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import TicketSelectionPage from './pages/TicketSelectionPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';
import AccountPage from './pages/AccountPage';
import ChangeEmailPage from './pages/ChangeEmailPage';
import MyTicketsPage from './pages/MyTicketsPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFound from './pages/NotFound';
import DashboardPage from './pages/DashboardPage';
import DashboardManagementPage from './pages/DashboardManagementPage';
import DashboardAccountPage from './pages/DashboardAccountPage';
import DashboardEmailPage from './pages/DashboardEmailPage';
import EventCreationPage from './pages/EventCreationPage';
import ComingSoonPage from './pages/ComingSoonPage';
import OrganizerAccountPage from './pages/OrganizerAccountPage';
import OrganizerChangeEmailPage from './pages/OrganizerChangeEmailPage';

// Importar o utilitário para verificar disponibilidade do localStorage
import { isAvailable } from './lib/storage';

const queryClient = new QueryClient();

const App = () => {
  const [storageAvailable, setStorageAvailable] = useState(true);
  
  useEffect(() => {
    // Verificar se o localStorage está disponível
    const checkStorage = () => {
      const available = isAvailable();
      setStorageAvailable(available);
      
      if (!available) {
        console.warn('LocalStorage não está disponível. Algumas funcionalidades podem não funcionar corretamente.');
      }
    };
    
    checkStorage();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          <ThemeProvider defaultTheme="dark" storageKey="cuencos-theme">
            {!storageAvailable && (
              <div 
                style={{ 
                  background: '#ff4040', 
                  color: 'white', 
                  textAlign: 'center', 
                  padding: '10px', 
                  fontSize: '14px' 
                }}
              >
                Atenção: O armazenamento local está desativado ou indisponível. 
                Algumas funcionalidades como login e favoritos não irão funcionar corretamente.
              </div>
            )}
            
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events/:id" element={<EventDetailsPage />} />
                <Route path="/events/:id/buy" element={<TicketSelectionPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/account/email" element={<ChangeEmailPage />} />
                <Route path="/my-tickets" element={<MyTicketsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/management" element={<DashboardManagementPage />} />
                <Route path="/dashboard/account" element={<DashboardAccountPage />} />
                <Route path="/dashboard/email" element={<DashboardEmailPage />} />
                <Route path="/event/:id" element={<EventCreationPage />} />
                <Route path="/coming-soon" element={<ComingSoonPage />} /> {/* Nova rota */}
                
                {/* Rotas para organizador */}
                <Route path="/dashboard/account" element={<OrganizerAccountPage />} />
                <Route path="/dashboard/email" element={<OrganizerChangeEmailPage />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </ThemeProvider>
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
