// User authentication with localStorage
import { setItem, getItem, removeItem } from './storage';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';

// Initialize default users if none exist
const initializeUsers = () => {
  try {
    const existingUsers = getItem(USERS_KEY);
    
    if (!existingUsers) {
      // Default users: one regular user and one organizer
      const defaultUsers = [
        {
          id: 'johnfrontend@gmail.com',
          email: 'johnfrontend@gmail.com',
          name: 'John Frontend',
          password: 'admin123',
          tipo: 'usuario'
        },
        {
          id: 'organizador@cuencos.com',
          email: 'organizador@cuencos.com',
          name: 'Organizador Cuencos',
          password: 'admin123',
          tipo: 'organizador'
        }
      ];
      
      setItem(USERS_KEY, defaultUsers);
      console.log('Usuários padrão criados com sucesso, incluindo um organizador.');
    } else {
      // Verificar se existe um usuário organizador
      const users = existingUsers;
      const hasOrganizer = users.some(user => user.tipo === 'organizador');
      
      if (!hasOrganizer) {
        // Adicionar um usuário organizador se não existir
        const organizerUser = {
          id: 'organizador@cuencos.com',
          email: 'organizador@cuencos.com',
          name: 'Organizador Cuencos',
          password: 'admin123',
          tipo: 'organizador'
        };
        
        users.push(organizerUser);
        setItem(USERS_KEY, users);
        console.log('Usuário organizador padrão adicionado.');
      }
    }
  } catch (error) {
    console.error('Erro ao inicializar usuários:', error);
  }
};

// Função auxiliar para gerar ID único
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Garantir que a função de inicialização seja chamada
initializeUsers();

// Chamando manualmente para garantir que o usuário organizador exista
(function ensureOrganizerExists() {
  try {
    // Força a recriação do usuário organizador para garantir consistência
    const users = getItem(USERS_KEY) || [];
    const organizerIndex = users.findIndex(u => u.email === 'organizador@cuencos.com');
    
    // Se encontrou, atualiza; senão, adiciona
    const organizerUser = {
      id: 'organizador@cuencos.com',
      email: 'organizador@cuencos.com',
      name: 'Organizador Cuencos',
      password: 'admin123',
      tipo: 'organizador'
    };
    
    if (organizerIndex >= 0) {
      users[organizerIndex] = organizerUser;
    } else {
      users.push(organizerUser);
    }
    
    setItem(USERS_KEY, users);
    console.log('Usuário organizador verificado/atualizado.');
  } catch (error) {
    console.error("Erro ao verificar usuário organizador:", error);
  }
})();

// Get all users
export const getUsers = () => {
  return getItem(USERS_KEY) || [];
};

// Login user
export const loginUser = (email, password) => {
  try {
    const users = getItem(USERS_KEY) || [];
    // Check if the input is email or username
    const user = users.find(u => 
      (u.email === email || u.id === email) && u.password === password
    );
    
    if (user) {
      // Store user data in both storage methods for consistency
      const sessionUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        tipo: user.tipo || 'cliente'
      };
      
      // Garantir que o usuário seja armazenado nos dois locais
      setItem(CURRENT_USER_KEY, sessionUser);
      localStorage.setItem('usuarioLogado', JSON.stringify(sessionUser));
      
      console.log('Login bem-sucedido:', sessionUser);
      return sessionUser;
    }
    return null;
  } catch (error) {
    console.error('Erro no login:', error);
    return null;
  }
};

// Get current logged in user
export const getCurrentUser = () => {
  try {
    // Primeiro tenta obter a partir do localStorage diretamente (via 'usuarioLogado')
    const directUser = localStorage.getItem('usuarioLogado');
    if (directUser) {
      return JSON.parse(directUser);
    }
    
    // Se não encontrou, tenta via getItem
    return getItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error("Erro ao obter usuário atual:", error);
    return null;
  }
};

// Logout current user
export const logoutUser = () => {
  try {
    // Remove de ambos os locais para garantir sincronização
    removeItem(CURRENT_USER_KEY);
    localStorage.removeItem('usuarioLogado');
    return true;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return false;
  }
};

// Register a new user
export const registerUser = (userData) => {
  try {
    const users = getUsers();
    
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      return { success: false, message: "E-mail já cadastrado" };
    }
    
    // Create new user
    const newUser = {
      id: userData.email, // Using email as ID
      ...userData,
      tipo: userData.tipo || 'cliente', // Default to 'cliente' if tipo is not set
      createdAt: new Date().toISOString(),
    };
    
    // Save to localStorage
    users.push(newUser);
    setItem(USERS_KEY, users);
    
    // Return success but don't include password in the response
    const { password, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return { success: false, message: "Erro ao registrar usuário" };
  }
};

// Update a user's information
export const updateUser = (userId, updatedData) => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return { success: false, message: "Usuário não encontrado" };
    }
    
    // Update user data while preserving the id
    users[userIndex] = {
      ...users[userIndex],
      ...updatedData,
      id: userId, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
    
    setItem(USERS_KEY, users);
    
    // Also update current user session if it's the same user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const updatedSessionUser = {
        ...currentUser,
        ...updatedData,
        id: userId
      };
      setItem(CURRENT_USER_KEY, updatedSessionUser);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return { success: false, message: "Erro ao atualizar usuário" };
  }
};

// Verificar se o usuário é um organizador
export const isOrganizer = (userId) => {
  try {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    return user?.tipo === 'organizador';
  } catch (error) {
    console.error("Erro ao verificar tipo de usuário:", error);
    return false;
  }
};

// Garantir que um organizador esteja presente
initializeUsers();
