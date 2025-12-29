import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

export default function ChatDetailScreen({ chatId, onBack }: { chatId: string, onBack: () => void }) {
  const [message, setMessage] = useState('');
  
  // Datos de ejemplo del chat
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hola! ¿Sigue disponible la chaqueta?', sender: 'other', time: '10:00 AM' },
    { id: '2', text: '¡Hola! Sí, aún la tengo. Es talla M.', sender: 'me', time: '10:02 AM' },
    { id: '3', text: 'Genial, ¿haces envíos?', sender: 'other', time: '10:05 AM' },
  ]);

  const sendMessage = () => {
    if (message.trim().length === 0) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      time: '10:06 AM'
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble, 
      item.sender === 'me' ? styles.myMessage : styles.otherMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'me' ? { color: '#FFF' } : { color: '#000' }
      ]}>
        {item.text}
      </Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER DEL CHAT */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Image source={{ uri: 'https://i.pravatar.cc/150?u=2' }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>Santi_V</Text>
          <Text style={styles.status}>En línea</Text>
        </View>
        <TouchableOpacity><Text style={{fontSize: 20}}>📞</Text></TouchableOpacity>
      </View>

      {/* LISTA DE MENSAJES */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />

      {/* INPUT DE TEXTO */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.cameraBtn}><Text>📷</Text></TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje..."
            value={message}
            onChangeText={setMessage}
          />
          {message.length > 0 ? (
            <TouchableOpacity onPress={sendMessage}>
              <Text style={styles.sendBtn}>Enviar</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{fontSize: 20}}>🎙️</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE' 
  },
  backArrow: { fontSize: 28, marginRight: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  headerInfo: { flex: 1, marginLeft: 10 },
  userName: { fontWeight: 'bold', fontSize: 16 },
  status: { fontSize: 12, color: '#4CAF50' },
  messagesList: { padding: 15 },
  messageBubble: { 
    padding: 12, 
    borderRadius: 20, 
    marginBottom: 10, 
    maxWidth: '80%' 
  },
  myMessage: { 
    alignSelf: 'flex-end', 
    backgroundColor: '#0095F6', 
    borderBottomRightRadius: 2 
  },
  otherMessage: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#EFEFEF', 
    borderBottomLeftRadius: 2 
  },
  messageText: { fontSize: 15 },
  messageTime: { fontSize: 10, color: '#999', marginTop: 4, alignSelf: 'flex-end' },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#EEE' 
  },
  input: { 
    flex: 1, 
    backgroundColor: '#F5F5F5', 
    borderRadius: 20, 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    marginHorizontal: 10 
  },
  cameraBtn: { backgroundColor: '#0095F6', borderRadius: 20, padding: 8 },
  sendBtn: { color: '#0095F6', fontWeight: 'bold', fontSize: 16 }
});