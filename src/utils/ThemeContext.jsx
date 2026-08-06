import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [inverted, setInverted] = useState(() => {
    const saved = localStorage.getItem('theme-inverted');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('theme-inverted', JSON.stringify(inverted));
    // Apply theme class to document body to support global styles
    if (inverted) {
      document.body.classList.add('theme-inverted');
    } else {
      document.body.classList.remove('theme-inverted');
    }
  }, [inverted]);

  const toggleTheme = () => {
    setInverted(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ inverted, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
