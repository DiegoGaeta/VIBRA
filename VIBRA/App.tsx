import { useState } from 'react';
import React from 'react';
import MainScreen from './src/Presentation/screens/MainScreen';
import  ProfileScreen  from './src/Presentation/screens/ProfileScreen';


export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  if (currentScreen === 'profile') {
    return <ProfileScreen onBack={() => setCurrentScreen('home')} />;
  }

  return <MainScreen onNavigate={(screen) => setCurrentScreen(screen)} />;
}