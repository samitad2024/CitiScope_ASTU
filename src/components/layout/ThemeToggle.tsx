import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { useUIStore } from '../../hooks/useUI';

export function ThemeToggle() {
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();
  const { theme: storeTheme, setTheme: setStoreTheme } = useUIStore();

  // Sync store with next-themes
  useEffect(() => {
    if (nextTheme && nextTheme !== storeTheme) {
      setStoreTheme(nextTheme as any);
    }
  }, [nextTheme, storeTheme, setStoreTheme]);

  const toggleTheme = () => {
    const newTheme = nextTheme === 'dark' ? 'light' : 'dark';
    setNextTheme(newTheme);
    setStoreTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-md border border-input bg-background"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
