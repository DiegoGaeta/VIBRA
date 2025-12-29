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
  StatusBar,
  Platform
} from 'react-native';


// ==========================================
// 1. DEFINICIÓN DE TIPOS (TypeScript)
// ==========================================
// Definimos la forma que tendrá cada objeto de producto
interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  size: string;
  category: string;
  image: string;
}

// ==========================================
// 2. DATOS DE PRUEBA (Mock Data)
// ==========================================
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', title: "Chaqueta Vintage North Face", brand: "The North Face", price: 85, size: "M", category: "vintage", image: "https://images.unsplash.com/photo-1551488852-7a304bef7959?w=400" },
  { id: '2', title: "Nike Dunk Low Retro", brand: "Nike", price: 120, size: "US 9", category: "sneakers", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400" },
  { id: '3', title: "Jeans Baggy Y2K", brand: "Diesel", price: 45, size: "32", category: "y2k", image: "https://images.unsplash.com/photo-1584370848010-d7cc637703ef?w=400" },
  { id: '4', title: "Camiseta Gráfica", brand: "Stussy", price: 35, size: "L", category: "streetwear", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400" },
];

// ==========================================
// 3. COMPONENTE PRINCIPAL
// ==========================================
export default function MainScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  // ESTADOS: Para controlar la búsqueda y la categoría seleccionada
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  // LÓGICA DE FILTRADO: Filtra la lista según texto y categoría simultáneamente
  const filteredProducts = INITIAL_PRODUCTS.filter(p => 
    (category === 'all' || p.category === category) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // RENDERIZADO DE PRODUCTO: Cómo se ve cada "tarjeta" de ropa
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImg} resizeMode="cover" />
        <TouchableOpacity style={styles.likeBtn}>
          <Text>❤️</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.sizeTag}>
            <Text style={styles.sizeText}>{item.size}</Text>
          </View>
        </View>
        <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.brandName}>{item.brand}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* --- BLOQUE HEADER (Logo y Notificaciones) --- */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>VIBRA<Text style={{color: '#5D5FEF'}}>.</Text></Text>
        <View style={styles.navIcons}>

      {/* Bloque de vender que no tiene sentido
          <TouchableOpacity style={styles.sellBtn}>
            <Text style={styles.sellBtnText}>Vender</Text>
          </TouchableOpacity> */}


          <TouchableOpacity><Text style={styles.headerIcon}>🛒</Text></TouchableOpacity>
          {/* Botón de notificaciones solicitado */}
          <TouchableOpacity onPress={() => onNavigate('notifications')} style={{ marginLeft: 15 }}>
            <Text style={styles.headerIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- BLOQUE DE CONTENIDO DESPLAZABLE --- */}
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* BUSCADOR */}
        <View style={styles.searchSection}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar marcas, estilos..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* BARRA DE FILTROS (Categorías horizontales) */}
        <View style={{ height: 50 }}> 
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterBar}>
            {['all', 'streetwear', 'vintage', 'y2k', 'sneakers'].map((cat) => (
              <TouchableOpacity 
                key={cat} 
                style={[styles.filterPill, category === cat && styles.activePill]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.pillText, category === cat && styles.activePillText]}>
                  {cat.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* GRILLA DE PRODUCTOS */}
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false} // Se desactiva para que el ScrollView principal maneje el movimiento
          contentContainerStyle={styles.grid}
        />

        {/* ESPACIADOR: Para que el último producto no quede tapado por el footer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* --- BLOQUE FOOTER (Navegación Estilo Instagram) --- */}
      <View style={styles.footer}>
        {/* 1. Inicio */}
        <TouchableOpacity style={styles.footerTab} onPress={() => onNavigate('home')}>
          <Text style={styles.footerIcon}>🏠</Text>
          <Text style={styles.footerText}>Inicio</Text>
        </TouchableOpacity>

        {/* 2. Reels */}
        <TouchableOpacity style={styles.footerTab} onPress={() => onNavigate('reels')}>
          <Text style={styles.footerIcon}>🎬</Text>
          <Text style={styles.footerText}>Reels</Text>
        </TouchableOpacity>

        {/* 3. Mensajes */}
        <TouchableOpacity style={styles.footerTab} onPress={() => onNavigate('messages')}>
          <Text style={styles.footerIcon}>💬</Text>
          <Text style={styles.footerText}>Mensajes</Text>
        </TouchableOpacity>

        {/* 4. Lupa de Búsqueda */}
        <TouchableOpacity style={styles.footerTab} onPress={() => onNavigate('search')}>
          <Text style={styles.footerIcon}>🔍</Text>
          <Text style={styles.footerText}>Buscar</Text>
        </TouchableOpacity>

        {/* 5. Perfil de Usuario */}
        <TouchableOpacity style={styles.footerTab} onPress={() => onNavigate('profile')}>
          <Text style={styles.footerIcon}>👤</Text>
          <Text style={styles.footerText}>Perfil</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// ==========================================
// 4. ESTILOS (StyleSheet)
// ==========================================
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  // Header superior
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  logo: { fontSize: 24, fontWeight: '900' },
  navIcons: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: { fontSize: 22 },
  sellBtn: { 
    backgroundColor: '#111', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 6, 
    marginRight: 10 
  },
  sellBtnText: { color: '#FFF', fontWeight: '700' },

  // Sección de búsqueda
  searchSection: { padding: 15 },
  searchInput: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  // Barra de filtros
  filterBar: { paddingHorizontal: 15, alignItems: 'center' },
  filterPill: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 8,
    backgroundColor: '#FFF',
  },
  activePill: { backgroundColor: '#111', borderColor: '#111' },
  pillText: { fontWeight: '700', color: '#666', fontSize: 11 },
  activePillText: { color: '#FFF' },

  // Tarjetas de productos
  grid: { padding: 5 },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    overflow: 'hidden',
  },
  imageContainer: { height: 150, width: '100%' },
  productImg: { width: '100%', height: '100%' },
  likeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFF',
    borderRadius: 15,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: { padding: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontWeight: '800', fontSize: 16 },
  sizeTag: { backgroundColor: '#F0F0F0', paddingHorizontal: 4, borderRadius: 4 },
  sizeText: { fontSize: 10, fontWeight: '700' },
  productTitle: { fontSize: 13, fontWeight: '600', marginTop: 4 },
  brandName: { fontSize: 12, color: '#999' },
  
  // ESTILOS DEL FOOTER (Fijado abajo)
  footer: {
    position: 'absolute', // Mantiene el footer siempre visible
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 25 : 10, // Ajuste para el notch de iPhone
  },
  footerTab: {
    alignItems: 'center',
    flex: 1,
  },
  footerIcon: { fontSize: 20, marginBottom: 2 },
  footerText: { fontSize: 10, color: '#333', fontWeight: '500' }
});