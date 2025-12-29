import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  StatusBar
} from 'react-native';

// Definimos la estructura de una notificación
interface Notification {
  id: string;
  message: string;
  description: string;
  image: string;
  time: string;
}

// Datos de prueba para las notificaciones
const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    message: "¡Nueva colección Vintage!",
    description: "Te pueden interesar estas chaquetas que acaban de llegar a la tienda.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    time: "Hace 2 min"
  },
  {
    id: '2',
    message: "Bajó de precio 📉",
    description: "Los Nike Dunk Low que viste ahora tienen un 15% de descuento.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200",
    time: "Hace 1 hora"
  }
];

export default function NotificationsScreen({ onBack }: { onBack: () => void }) {
  
  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.textContainer}>
        <Text style={styles.notifTitle}>{item.message}</Text>
        <Text style={styles.notifDescription}>{item.description}</Text>
        <Text style={styles.notifTime}>{item.time}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.notifImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER CON BOTÓN VOLVER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={{ width: 40 }} /> {/* Espaciador para centrar el título */}
      </View>

      {/* LISTA DE NOTIFICACIONES */}
      <FlatList
        data={NOTIFICATIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No tienes notificaciones aún.</Text>}
      />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 28,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  listContent: {
    paddingVertical: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  notifDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  notifTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 6,
  },
  notifImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  }
});