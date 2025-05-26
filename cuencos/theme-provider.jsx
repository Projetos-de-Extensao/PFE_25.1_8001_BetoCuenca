import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => null,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "cuencos-theme",
}) {
  const [theme, setTheme] = useState(() => {
    // Verificar se há tema salvo no localStorage
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(storageKey);
      return storedTheme || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remover classes de tema anteriores
    root.classList.remove("light", "dark");
    
    // Adicionar a classe do tema atual
    root.classList.add(theme);
    
    // Salvar tema no localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
