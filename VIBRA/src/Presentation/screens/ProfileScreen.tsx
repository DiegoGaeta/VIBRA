import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  location: string;
  avatar: string;
  balance: number;
}

export default function ProfileScreen({ onBack }: { onBack: () => void }) {
  // 1. ESTADOS
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('items'); // 'items' o 'likes'
  
  // Datos del usuario (Estado para que sean editables)
  const [user, setUser] = useState<UserProfile>({
    name: 'Alex Vintage',
    username: 'alex_vibe_99',
    bio: 'Amante de la moda Y2K y coleccionista de sneakers. ✌️',
    location: 'Madrid, España',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    balance: 125.50
  });

  // Temporales para el formulario
  const [tempName, setTempName] = useState(user.name);
  const [tempBio, setTempBio] = useState(user.bio);
  const [tempLoc, setTempLoc] = useState(user.location);

  const handleSave = () => {
    setUser({ ...user, name: tempName, bio: tempBio, location: tempLoc});
    setIsEditing(false);
    Alert.alert("Éxito", "Perfil actualizado correctamente");
  };

  // --- VISTA DE FORMULARIO DE EDICIÓN ---
  if (isEditing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsEditing(false)}>
            <Text style={styles.cancelBtn}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveBtn}>Guardar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ padding: 20 }}>
          <View style={styles.editAvatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.largeAvatar} />
            <TouchableOpacity style={styles.changePhotoBtn}>
              <Text style={styles.changePhotoText}>Cambiar foto</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nombre</Text>
          <TextInput 
            style={styles.input} 
            value={tempName} 
            onChangeText={setTempName} 
            placeholder="Tu nombre"
          />

          <Text style={styles.label}>Biografía</Text>
          <TextInput 
            style={[styles.input, { height: 80 }]} 
            value={tempBio} 
            onChangeText={setTempBio} 
            multiline
            placeholder="Cuéntales algo sobre ti..."
          />
          <Text style={styles.label}>Location</Text>
          <TextInput 
            style={[styles.input, { height: 60 }]} 
            value={tempLoc} 
            onChangeText={setTempLoc} 
            multiline
            placeholder="Locacion"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- VISTA DE PERFIL NORMAL ---
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Superior */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backBtn}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>@{user.username}</Text>
          <TouchableOpacity>
            <Text style={{fontSize: 20}}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Información Principal */}
        <View style={styles.profileInfo}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.onlineBadge} />
          </View>
          
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.location}>📍 {user.location}</Text>
          <Text style={styles.bioText}>{user.bio}</Text>

          <TouchableOpacity style={styles.editProfileBtn} onPress={() => setIsEditing(true)}>
            <Text style={styles.editProfileBtnText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Billetera / Balance (Muy común en apps de ventas) */}
        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.balanceLabel}>Tu Balance VIBRA</Text>
            <Text style={styles.balanceAmount}>${user.balance.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.withdrawBtn}>
            <Text style={styles.withdrawText}>Cobrar</Text>
          </TouchableOpacity>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}><Text style={styles.statNum}>12</Text><Text style={styles.statLabel}>Ventas</Text></View>
          <View style={styles.statBox}><Text style={styles.statNum}>150</Text><Text style={styles.statLabel}>Seguidores</Text></View>
          <View style={styles.statBox}><Text style={styles.statNum}>4.8 ★</Text><Text style={styles.statLabel}>Valoración</Text></View>
        </View>

        {/* Pestañas (Tabs) */}
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'items' && styles.activeTab]} 
            onPress={() => setActiveTab('items')}
          >
            <Text style={[styles.tabText, activeTab === 'items' && styles.activeTabText]}>ARTÍCULOS</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'likes' && styles.activeTab]} 
            onPress={() => setActiveTab('likes')}
          >
            <Text style={[styles.tabText, activeTab === 'likes' && styles.activeTabText]}>FAVORITOS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === 'items' ? (
            <Text style={styles.emptyText}>No tienes artículos a la venta aún.</Text>
          ) : (
            <Text style={styles.emptyText}>No tienes favoritos guardados.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backBtn: { fontSize: 24, fontWeight: 'bold' },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  cancelBtn: { color: 'red', fontSize: 16 },
  saveBtn: { color: '#5D5FEF', fontSize: 16, fontWeight: 'bold' },

  profileInfo: { alignItems: 'center', padding: 20 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  onlineBadge: { position: 'absolute', bottom: 5, right: 5, width: 15, height: 15, borderRadius: 8, backgroundColor: '#4CAF50', borderColor: '#FFF', borderWidth: 2 },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  location: { color: '#888', fontSize: 13, marginVertical: 5 },
  bioText: { textAlign: 'center', color: '#444', paddingHorizontal: 20 },
  editProfileBtn: { marginTop: 15, borderWidth: 1, borderColor: '#DDD', paddingHorizontal: 25, paddingVertical: 8, borderRadius: 20 },
  editProfileBtnText: { fontWeight: '600', fontSize: 14 },

  balanceCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8F9FF', margin: 20, padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#E0E4FF' },
  balanceLabel: { fontSize: 12, color: '#5D5FEF', fontWeight: 'bold' },
  balanceAmount: { fontSize: 24, fontWeight: 'bold' },
  withdrawBtn: { backgroundColor: '#5D5FEF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8 },
  withdrawText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  statBox: { alignItems: 'center' },
  statNum: { fontWeight: 'bold', fontSize: 16 },
  statLabel: { color: '#999', fontSize: 11 },

  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 15 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#111' },
  tabText: { color: '#999', fontWeight: 'bold', fontSize: 12 },
  activeTabText: { color: '#111' },
  
  content: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#BBB' },

  // Estilos del Formulario
  editAvatarContainer: { alignItems: 'center', marginBottom: 20 },
  largeAvatar: { width: 120, height: 120, borderRadius: 60, opacity: 0.7 },
  changePhotoBtn: { position: 'absolute', bottom: 40 },
  changePhotoText: { color: '#FFF', fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#666' },
  input: { borderWidth: 1, borderColor: '#EEE', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16, backgroundColor: '#FAFAFA' }
});