import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const SETTINGS_KEY = '@theme_settings';

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');
  const [themeColor, setThemeColor] = useState('#2196F3');
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const settings = JSON.parse(saved);
        setThemeMode(settings.themeMode || 'light');
        setThemeColor(settings.themeColor || '#2196F3');
        setFontSize(settings.fontSize || 16);
      }
    })();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      const settings = { themeMode, themeColor, fontSize };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    };
    saveSettings();
  }, [themeMode, themeColor, fontSize]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        toggleTheme,
        themeColor,
        setThemeColor,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
