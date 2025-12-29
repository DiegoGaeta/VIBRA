import { useState } from 'react';
import React from 'react';
import MainScreen from './src/Presentation/screens/MainScreen';
import  ProfileScreen  from './src/Presentation/screens/ProfileScreen';
import  MessagesScreen  from './src/Presentation/screens/MessagesScreen';
import  NotificationsScreen  from './src/Presentation/screens/NotificationsScreen';
// ... tus otros imports
import ChatDetailScreen from './src/Presentation/screens/ChatDetailScreen'; // Lo crearemos ahora

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  // Nuevo estado para saber qué chat estamos viendo
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // LÓGICA PARA MOSTRAR EL CHAT PRIVADO
  if (currentScreen === 'chat_detail' && selectedChatId) {
    return (
      <ChatDetailScreen 
        chatId={selectedChatId} 
        onBack={() => {
          setSelectedChatId(null);
          setCurrentScreen('messages');
        }} 
      />
    );
  }

  if (currentScreen === 'profile') {
    return <ProfileScreen onBack={() => setCurrentScreen('home')} />;
  }

  if (currentScreen === 'messages') {
    return (
      <MessagesScreen 
        onBack={() => setCurrentScreen('home')} 
        // ESTO ES LO QUE FALTABA:
        onOpenChat={(id) => {
          setSelectedChatId(id);
          setCurrentScreen('chat_detail');
        }}
      />
    );
  }

  if (currentScreen === 'notifications') {
    return <NotificationsScreen onBack={() => setCurrentScreen('home')} />;
  }

  return <MainScreen onNavigate={(screen) => setCurrentScreen(screen)} />;
}