import { useCallback, useEffect, useState } from 'react';

/**
 * Manages the light/dark theme toggle.
 * Mirrors the original main.js theme logic: persists to localStorage,
 * sets [data-theme="light"] on <html>, defaults to dark.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback((checked) => {
    setTheme(checked ? 'light' : 'dark');
  }, []);

  return { theme, toggleTheme };
}
