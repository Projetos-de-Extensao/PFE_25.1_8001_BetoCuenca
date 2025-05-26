/**
 * Biblioteca de utilitários para trabalhar com localStorage
 */

// Versão do esquema de dados - incrementar quando houver mudanças incompatíveis
const SCHEMA_VERSION = '1.0';
const VERSION_KEY = 'cuencos_schema_version';

// Prefixo para todas as chaves de armazenamento
const PREFIX = 'cuencos_';

// Verificar e atualizar a versão do esquema
const initializeStorage = () => {
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    
    if (!storedVersion || storedVersion !== SCHEMA_VERSION) {
      // Se for uma nova versão, podemos fazer migrações de dados se necessário
      console.log(`Inicializando armazenamento local (versão ${SCHEMA_VERSION})`);
      localStorage.setItem(VERSION_KEY, SCHEMA_VERSION);
    }
  } catch (error) {
    console.error('Erro ao inicializar localStorage:', error);
  }
};

// Salvar dados com prefixo e tratamento de erro
const setItem = (key, data) => {
  try {
    const prefixedKey = `${PREFIX}${key}`;
    const serializedData = JSON.stringify({
      data,
      timestamp: Date.now()
    });
    localStorage.setItem(prefixedKey, serializedData);
    console.log(`Dados salvos em ${prefixedKey}:`, data);
    return true;
  } catch (error) {
    console.error(`Erro ao salvar '${key}' no localStorage:`, error);
    return false;
  }
};

// Obter dados com prefixo e tratamento de erro
const getItem = (key, maxAge = null) => {
  try {
    const prefixedKey = `${PREFIX}${key}`;
    const storedValue = localStorage.getItem(prefixedKey);
    
    if (!storedValue) {
      console.log(`Nenhum dado encontrado para a chave ${prefixedKey}`);
      return null;
    }
    
    const parsedValue = JSON.parse(storedValue);
    const { data, timestamp } = parsedValue;
    
    // Verificar se os dados expiraram (se maxAge for fornecido em milissegundos)
    if (maxAge && Date.now() - timestamp > maxAge) {
      console.log(`Dados expirados para a chave ${prefixedKey}`);
      removeItem(key);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Erro ao recuperar '${key}' do localStorage:`, error);
    return null;
  }
};

// Remover dados com prefixo e tratamento de erro
const removeItem = (key) => {
  try {
    const prefixedKey = `${PREFIX}${key}`;
    localStorage.removeItem(prefixedKey);
    return true;
  } catch (error) {
    console.error(`Erro ao remover '${key}' do localStorage:`, error);
    return false;
  }
};

// Limpar todos os dados com o prefixo
const clearAll = () => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    return true;
  } catch (error) {
    console.error('Erro ao limpar localStorage:', error);
    return false;
  }
};

// Verificar se o localStorage está disponível
const isAvailable = () => {
  try {
    const testKey = `${PREFIX}test`;
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn('localStorage não está disponível:', error);
    return false;
  }
};

// Inicializar o armazenamento ao importar este módulo
initializeStorage();

export { 
  setItem, 
  getItem, 
  removeItem, 
  clearAll, 
  isAvailable,
  SCHEMA_VERSION
};
