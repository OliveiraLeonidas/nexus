import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative h-10 w-10 rounded-full flex items-center justify-center transition-colors',
        'hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun 
        className={cn(
          'absolute h-5 w-5 transition-all',
          theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        )} 
      />
      <Moon 
        className={cn(
          'absolute h-5 w-5 transition-all',
          theme === 'light' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        )} 
      />
    </button>
  );
};

export default ThemeToggle;