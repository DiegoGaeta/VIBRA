import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  StatusBar
} from 'react-native';

// --- TIPOS ---
interface ConnectedUser {
  id: string;
  name: string;
  image: string;
}

interface Chat {
  id: string;
  userName: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  image: string;
}

// --- DATOS DE PRUEBA ---
const CONNECTED_USERS: ConnectedUser[] = [
  { id: '1', name: 'Tu nota', image: 'https://i.pravatar.cc/150?u=me' },
  { id: '2', name: 'Santi_V', image: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Elena_Style', image: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Street_Wear', image: 'https://i.pravatar.cc/150?u=4' },
];

const CHATS: Chat[] = [
  { id: '1', userName: 'Santi_V', lastMessage: '¿Aún tienes la chaqueta North Face?', time: '2m', unread: true, image: 'https://i.pravatar.cc/150?u=2' },
  { id: '2', userName: 'Elena_Style', lastMessage: 'Me encanta el outfit ⚡', time: '1h', unread: true, image: 'https://i.pravatar.cc/150?u=3' },
];

export default function MessagesScreen({ onBack, onOpenChat }: { onBack: () => void, onOpenChat: (id: string) => void }) {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER: Nombre de usuario */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.usernameTitle}>tu_usuario_vibra ▼</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 24 }}>📝</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* BUSCADOR */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* CARRUSEL DE CONECTADOS (Historias de notas) */}
        <View style={styles.connectedSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
            {CONNECTED_USERS.map((user) => (
              <View key={user.id} style={styles.connectedUser}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: user.image }} style={styles.avatar} />
                  <View style={styles.onlineBadge} />
                </View>
                <Text style={styles.connectedName} numberOfLines={1}>{user.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* LISTA DE CHATS */}
        <View style={styles.chatsSection}>
          <Text style={styles.sectionTitle}>Mensajes</Text>
          {CHATS.map((chat) => (
            <TouchableOpacity 
              key={chat.id} 
              style={styles.chatItem}
              onPress={() => onOpenChat(chat.id)}
            >
              <Image source={{ uri: chat.image }} style={styles.chatAvatar} />
              <View style={styles.chatInfo}>
                <Text style={[styles.chatName, chat.unread && { fontWeight: '800' }]}>{chat.userName}</Text>
                <Text style={[styles.lastMessage, chat.unread && { color: '#000', fontWeight: '600' }]} numberOfLines={1}>
                  {chat.lastMessage} · {chat.time}
                </Text>
              </View>
              {chat.unread && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  backArrow: { fontSize: 28 },
  usernameTitle: { fontSize: 18, fontWeight: 'bold' },
  searchContainer: { padding: 15 },
  searchInput: { backgroundColor: '#EFEFEF', borderRadius: 10, padding: 10, fontSize: 16 },
  connectedSection: { marginBottom: 20 },
  connectedUser: { alignItems: 'center', marginRight: 20, width: 70 },
  imageWrapper: { position: 'relative' },
  avatar: { width: 65, height: 65, borderRadius: 33 },
  onlineBadge: { position: 'absolute', bottom: 2, right: 2, width: 15, height: 15, borderRadius: 8, backgroundColor: '#4CAF50', borderWidth: 2, borderColor: '#FFF' },
  connectedName: { fontSize: 11, marginTop: 5, color: '#666' },
  chatsSection: { paddingHorizontal: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  chatItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  chatAvatar: { width: 55, height: 55, borderRadius: 28 },
  chatInfo: { flex: 1, marginLeft: 15 },
  chatName: { fontSize: 15 },
  lastMessage: { fontSize: 14, color: '#888' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#0095F6', marginLeft: 10 }
});