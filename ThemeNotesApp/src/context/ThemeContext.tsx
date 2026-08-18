import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType, ThemeColors } from '../types';

// Theme Colors Configuration
const themeColors: Record<ThemeType, ThemeColors> = {
  red: {
    primary: '#FF4444',
    secondary: '#FF6B6B',
    background: '#FFF5F5',
    text: '#8B0000',
    border: '#FF4444',
    buttonText: '#FFFFFF',
  },
  green: {
    primary: '#44BB44',
    secondary: '#66DD66',
    background: '#F0FFF0',
    text: '#006400',
    border: '#44BB44',
    buttonText: '#FFFFFF',
  },
  blue: {
    primary: '#4488FF',
    secondary: '#66AAFF',
    background: '#F0F8FF',
    text: '#00008B',
    border: '#4488FF',
    buttonText: '#FFFFFF',
  },
  yellow: {
    primary: '#FFD700',
    secondary: '#FFE44D',
    background: '#FFFFF0',
    text: '#8B8000',
    border: '#FFD700',
    buttonText: '#000000',
  },
};

// Context Type
interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  setTheme: (theme: ThemeType) => void;
  isLoading: boolean;
}

// Create Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('blue');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('selectedTheme');
      if (savedTheme && ['red', 'green', 'blue', 'yellow'].includes(savedTheme)) {
        setTheme(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem('selectedTheme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme: saveTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};