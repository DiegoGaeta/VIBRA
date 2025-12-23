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

// 1. Definimos la forma de nuestros datos (TypeScript)
  interface Product {
  id: string; // Usamos string para el id porque FlatList lo prefiere así
  title: string;
  brand: string;
  price: number;
  size: string;
  category: string;
  image: string;
}

// 2. Datos de prueba
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', title: "Chaqueta Vintage North Face", brand: "The North Face", price: 85, size: "M", category: "vintage", image: "https://images.unsplash.com/photo-1551488852-7a304bef7959?w=400" },
  { id: '2', title: "Nike Dunk Low Retro", brand: "Nike", price: 120, size: "US 9", category: "sneakers", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400" },
  { id: '3', title: "Jeans Baggy Y2K", brand: "Diesel", price: 45, size: "32", category: "y2k", image: "https://images.unsplash.com/photo-1584370848010-d7cc637703ef?w=400" },
  { id: '4', title: "Camiseta Gráfica", brand: "Stussy", price: 35, size: "L", category: "streetwear", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400" },
];


export default function MainScreen()  {

 const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filteredProducts = INITIAL_PRODUCTS.filter(p => 
    (category === 'all' || p.category === category) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Componente de la Tarjeta
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImg}
          resizeMode="cover" // <-- IMPORTANTE: En móvil se usa resizeMode, no object-fit
        />
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
      
      {/* HEADER */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>VIBRA<Text style={{color: '#5D5FEF'}}>.</Text></Text>
        <View style={styles.navIcons}>
          <TouchableOpacity style={styles.sellBtn}>
            <Text style={styles.sellBtnText}>Vender</Text>
          </TouchableOpacity>
          <Text style={styles.cartIcon}>🛒</Text>
        </View>
      </View>

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

      {/* FILTROS */}
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

      {/* LISTA */}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
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
  sellBtn: { 
    backgroundColor: '#111', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 6, 
    marginRight: 10 
  },
  sellBtnText: { color: '#FFF', fontWeight: '700' },
  cartIcon: { fontSize: 20 },
  
  searchSection: { padding: 15 },
  searchInput: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    color: '#000'
  },

  filterBar: { paddingHorizontal: 15, alignItems: 'center' },
  filterPill: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 8,
    backgroundColor: '#FFF',
    height: 35,
    justifyContent: 'center'
  },
  activePill: { backgroundColor: '#111', borderColor: '#111' },
  pillText: { fontWeight: '700', color: '#666', fontSize: 11 },
  activePillText: { color: '#FFF' },

  grid: { padding: 5 },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    overflow: 'hidden',
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Sombra para Android
    elevation: 2,
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
  brandName: { fontSize: 12, color: '#999' }
});