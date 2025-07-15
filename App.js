import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {

  return (
    <ThemeProvider>
      <StatusBar
          barStyle="light-content" // white text/icons
          backgroundColor="#000000" // dark background
        />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
