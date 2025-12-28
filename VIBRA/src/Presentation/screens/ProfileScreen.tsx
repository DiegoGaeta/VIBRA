import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function ProfileScreen({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header con botón Volver */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backBtn}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
          <View style={{ width: 50 }} /> 
        </View>

        {/* Info del Usuario */}
        <View style={styles.profileInfo}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' }} 
            style={styles.avatar} 
          />
          <Text style={styles.name}>Alex Vintage</Text>
          <Text style={styles.username}>@alex_vibe_99</Text>
          
          <View style={styles.stats}>
            <View style={styles.statItem}><Text style={styles.statNum}>12</Text><Text style={styles.statLabel}>Ventas</Text></View>
            <View style={styles.statItem}><Text style={styles.statNum}>4.9 ★</Text><Text style={styles.statLabel}>Valoración</Text></View>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Sección de Inventario */}
        <View style={styles.inventorySection}>
          <Text style={styles.sectionTitle}>Mis Artículos</Text>
          <Text style={styles.emptyText}>Todavía no has subido artículos para vender.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  backBtn: { fontSize: 16, color: '#5D5FEF', fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  profileInfo: { alignItems: 'center', padding: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold' },
  username: { color: '#888', marginBottom: 15 },
  stats: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 15 },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#999', fontSize: 12 },
  editBtn: { backgroundColor: '#111', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 25, marginTop: 10 },
  editBtnText: { color: '#FFF', fontWeight: 'bold' },
  inventorySection: { padding: 20, borderTopWidth: 1, borderTopColor: '#EEE' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 }
});
