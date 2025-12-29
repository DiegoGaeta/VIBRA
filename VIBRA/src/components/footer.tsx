import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

// Definimos qué "props" (propiedades) recibe nuestro Footer
// En este caso, la función para navegar.
interface FooterProps {
  onNavigate: (screen: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerTab} onPress={() => onNavigate('home')}>
        <Text style={styles.footerIcon}>🏠</Text>
        <Text style={styles.footerText}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerTab} onPress={() => onNavigate('reels')}>
        <Text style={styles.footerIcon}>🎬</Text>
        <Text style={styles.footerText}>Reels</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerTab} onPress={() => onNavigate('messages')}>
        <Text style={styles.footerIcon}>💬</Text>
        <Text style={styles.footerText}>Mensajes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerTab} onPress={() => onNavigate('search')}>
        <Text style={styles.footerIcon}>🔍</Text>
        <Text style={styles.footerText}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerTab} onPress={() => onNavigate('profile')}>
        <Text style={styles.footerIcon}>👤</Text>
        <Text style={styles.footerText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
  },
  footerTab: {
    alignItems: 'center',
    flex: 1,
  },
  footerIcon: { fontSize: 20, marginBottom: 2 },
  footerText: { fontSize: 10, color: '#333', fontWeight: '500' }
});