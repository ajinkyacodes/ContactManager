import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
