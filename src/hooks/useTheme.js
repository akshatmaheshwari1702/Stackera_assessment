import { useState, useEffect } from 'react';

/**
 * Custom hook for managing theme state (light/dark mode)
 * Persists theme preference in localStorage
 */
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('crypto-trader-theme');
    return savedTheme || 'dark';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('crypto-trader-theme', newTheme);
      return newTheme;
    });
  };

  // Apply theme to document root for global CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
