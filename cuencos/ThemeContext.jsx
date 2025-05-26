import React, { createContext, useContext, useEffect, useState } from 'react';
import { setItem, getItem } from '../lib/storage';

const THEME_KEY = 'theme';
const THEME_OPTIONS = ['light', 'dark', 'system'];
const DEFAULT_THEME = 'system';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Recuperar o tema salvo ou usar o padrão
    return getItem(THEME_KEY) || DEFAULT_THEME;
  });
  
  // Aplicar o tema ao elemento HTML quando ele mudar
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remover todas as classes de tema
    root.classList.remove('light', 'dark');
    
    // Se o tema for system, aplicar baseado na preferência do sistema
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
      root.classList.add(systemTheme);
    } else {
      // Caso contrário, aplicar o tema escolhido
      root.classList.add(theme);
    }
    
    // Salvar a escolha no localStorage
    setItem(THEME_KEY, theme);
  }, [theme]);
  
  // Atualizar o tema quando a preferência do sistema mudar
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  // Função para alterar o tema
  const changeTheme = (newTheme) => {
    if (THEME_OPTIONS.includes(newTheme)) {
      setTheme(newTheme);
    } else {
      console.error(`Tema inválido: ${newTheme}`);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themes: THEME_OPTIONS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};
