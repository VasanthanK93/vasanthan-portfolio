import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface UseDarkModeReturn {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useDarkMode = (): UseDarkModeReturn => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme || systemTheme;
    
    setThemeState(initialTheme);
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      // Store theme preference
      localStorage.setItem('theme', theme);
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
      }
    }
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Prevent hydration mismatch by returning default values until mounted
  if (!mounted) {
    return {
      isDark: false,
      theme: 'light',
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }

  return {
    isDark: theme === 'dark',
    theme,
    toggleTheme,
    setTheme,
  };
};

// Hook for theme-aware animations
export const useThemeTransition = () => {
  const { theme } = useDarkMode();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match your CSS transition duration

    return () => clearTimeout(timer);
  }, [theme]);

  return { isTransitioning };
};

// Hook for theme-specific values
export const useThemeValue = <T>(lightValue: T, darkValue: T): T => {
  const { isDark } = useDarkMode();
  return isDark ? darkValue : lightValue;
};

// Hook for CSS variables based on theme
export const useThemeVariables = () => {
  const { isDark } = useDarkMode();

  const variables = {
    // Background colors
    background: isDark ? '#0f172a' : '#ffffff',
    backgroundSecondary: isDark ? '#1e293b' : '#f8fafc',
    backgroundAccent: isDark ? '#334155' : '#e2e8f0',
    
    // Text colors
    textPrimary: isDark ? '#f8fafc' : '#0f172a',
    textSecondary: isDark ? '#cbd5e1' : '#64748b',
    textMuted: isDark ? '#94a3b8' : '#94a3b8',
    
    // Border colors
    border: isDark ? '#334155' : '#e2e8f0',
    borderHover: isDark ? '#475569' : '#cbd5e1',
    
    // Accent colors
    accent: isDark ? '#3b82f6' : '#2563eb',
    accentHover: isDark ? '#2563eb' : '#1d4ed8',
    
    // Success, warning, error colors
    success: isDark ? '#10b981' : '#059669',
    warning: isDark ? '#f59e0b' : '#d97706',
    error: isDark ? '#ef4444' : '#dc2626',
    
    // Shadow values
    shadow: isDark 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    shadowLg: isDark
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  return variables;
};