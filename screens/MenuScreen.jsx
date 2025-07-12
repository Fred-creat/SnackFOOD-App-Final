import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { useCart } from "../components/CartContext";

const productsMenu = [
  { name: "Bolos" },
  { name: "Doces" },
  { name: "Salgados" },
  { name: "Combos" },
];

// Arrays de produtos completos
const bolos = [
  {
    name: "Bolo de 15cm ",
    recheio: "coco, morango artificial, brigadeiro, chocolate",
    price: "110,00",
    image: require("../assets/images/bolo.png"),
  },
  {
    name: "Bolo de 20cm  ",
    recheio: "coco, morango artificial, brigadeiro, chocolate",
    price: " 170,00 ",
    image: require("../assets/images/bolo.png"),
  },
  {
    name: "Bolo de 25",
    recheio: "coco, morango artificial, brigadeiro, chocolate",
    price: " 210,00 ",
    image: require("../assets/images/bolo.png"),
  },
  {
    name: "Bolo de 30",
    recheio: "coco, morango artificial, brigadeiro, chocolate",
    price: " 270,00 ",
    image: require("../assets/images/bolo.png"),
  },
];

const doces = [
  {
    name: "Trufas-100un",
    price: "100,00",
    image: require("../assets/images/trufas.png"),
  },
  {
    name: "Brigadeiro-100un",
    price: "100,00",
    image: require("../assets/images/brigadeiro.png"),
  },
  {
    name: "Beijinhos-100un",
    price: "100,00",
    image: require("../assets/images/beijinhos.png"),
  },
  {
    name: "Casadinho-100un",
    price: "100,00",
    image: require("../assets/images/casadinho.png"),
  },
  {
    name: "Cajuzinho-100un",
    price: " 100,00 ",
    image: require("../assets/images/cajuzinho.png"),
  },
  {
    name: "Moranguinho-100un",
    price: " 100,00 ",
    image: require("../assets/images/moranguinho.png"),
  },
  {
    name: "Uva Encapada-100un",
    price: " 100,00 ",
    image: require("../assets/images/uva-encapada.png"),
  },
  {
    name: "Cerejinha-100un",
    price: " 100,00 ",
    image: require("../assets/images/cerejinnha.png"),
  },

  {
    name: "Churros-14un",
    price: "10,00",
    image: require("../assets/images/churros.png"),
  },
];

const salgados = [
  {
    name: "Coxinha",
    price: "1,10 unid.",
    image: require("../assets/images/coxinha.png"),
  },
  {
    name: "Pastel",
    price: "1,10 unid.",
    image: require("../assets/images/pastel.png"),
  },
  {
    name: "Bolinha de Queijo",
    price: "1,10 unid.",
    image: require("../assets/images/bolinha-queijo.png"),
  },
  { 
    name: "Kibe", 
    price: "1,10", 
    image: require("../assets/images/kibe.png") 
  },
   {
    name: "Almofadinha de Calabresa",
    price: "1,10 unid.",
    image: require("../assets/images/almofadinha-calabresa.png"),
  },
  {
    name: "Batata-Frita",
    recheio: "(porção)", // ✅ Adicionado para informar que é uma porção
    price: "15,00 porção.",
    image: require("../assets/images/batata-frita.png"),
  },
   
  {
    name: "Enroladinho",
    price: "1,10 unid.",
    image: require("../assets/images/enroladinho.png"),
  },
  {
    name: "Camarão Empanado",
    price: "1,50 unid.",
    image: require("../assets/images/camarao-empanado.png"),
  },
];

const combos = [
  {
    name: "🥗 Tô de Dieta",
    description: "10 salgados + Refri 1L",
    price: "18,00",
    image: require("../assets/images/coxinha.png"),
    details: "Combo ideal para quem quer economizar e se deliciar!"
  },
  {
    name: "😋 Tô de Boa",
    description: "20 salgados + Refri 1L",
    price: "29,00",
    image: require("../assets/images/pastel.png"),
    details: "Perfeito para uma refeição tranquila!"
  },
  {
    name: "👥 Amigos",
    description: "20 salgados + 1 porção de batata",
    price: "36,00",
    image: require("../assets/images/coxinha.png"),
    details: "Ideal para compartilhar com os amigos!"
  },
  {
    name: "👥👥 Amigos 2",
    description: "30 salgados + 1 porção de batata",
    price: "47,00",
    image: require("../assets/images/bolinha-queijo.png"),
    details: "Para grupos maiores de amigos!"
  },
  {
    name: "🍽️ Tô Com Fome",
    description: "30 salgados + Refri 1L",
    price: "40,00",
    image: require("../assets/images/kibe.png"),
    details: "Para quem está com muita fome!"
  },
  {
    name: "🔥 Mega Fome",
    description: "40 salgados + Refri 1L",
    price: "50,00",
    image: require("../assets/images/enroladinho.png"),
    details: "O maior combo para os mais famintos!"
  }
];

export default function MenuScreen({ navigation }) {
  const { addToCart } = useCart();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [bolosData, setBolosData] = useState([]);
  const [docesData, setDocesData] = useState([]);
  const [salgadosData, setSalgadosData] = useState([]);
  const [combosData, setCombosData] = useState([]);
  const [recheiosDisponiveis, setRecheiosDisponiveis] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para adicionar combo ao carrinho
  const handleAddComboToCart = async (combo) => {
    try {
      const comboItem = {
        name: combo.name,
        price: combo.price,
        description: combo.description,
        details: combo.details,
        image: combo.image,
        categoria: 'combo',
        tipo: 'combo'
      };

      addToCart(comboItem);

      Alert.alert(
        'Sucesso! 🎉',
        `${combo.name} foi adicionado ao carrinho!`,
        [
          { text: 'Continuar Comprando', style: 'default' },
          { text: 'Ir para Carrinho', onPress: () => navigation.navigate('Carrinho'), style: 'default' }
        ]
      );

    } catch (error) {
      console.error('Erro ao adicionar combo ao carrinho:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o combo ao carrinho.', [{ text: 'OK' }]);
    }
  };

  // Carregar dados da API
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/bolos`).then((res) => res.json()).catch(() => []),
      fetch(`${API_URL}/doces`).then((res) => res.json()).catch(() => []),
      fetch(`${API_URL}/salgados`).then((res) => res.json()).catch(() => []),
      fetch(`${API_URL}/combos`).then((res) => res.json()).catch(() => []),
      fetch(`${API_URL}/recheios`).then((res) => res.json()).catch(() => [])
    ])
    .then(([bolosRes, docesRes, salgadosRes, combosRes, recheiosRes]) => {
      setBolosData(bolosRes);
      setDocesData(docesRes);
      setSalgadosData(salgadosRes);
      setCombosData(combosRes);
      setRecheiosDisponiveis(recheiosRes);
      console.log('Dados carregados no MenuScreen');
    })
    .catch((err) => {
      console.log('Erro ao buscar dados:', err);
      setBolosData([]);
      setDocesData([]);
      setSalgadosData([]);
      setCombosData([]);
      setRecheiosDisponiveis([]);
    })
    .finally(() => setLoading(false));
  }, []);

  // Mapeamento de imagens
  const imageMap = {
    'bolo.png': require('../assets/images/bolo.png'),
    'trufas.png': require('../assets/images/trufas.png'),
    'brigadeiro.png': require('../assets/images/brigadeiro.png'),
    'beijinhos.png': require('../assets/images/beijinhos.png'),
    'casadinho.png': require('../assets/images/casadinho.png'),
    'cajuzinho.png': require('../assets/images/cajuzinho.png'),
    'churros.png': require('../assets/images/churros.png'),
    'moranguinho.png': require('../assets/images/moranguinho.png'),
    'uva-encapada.png': require('../assets/images/uva-encapada.png'),
    'cerejinnha.png': require('../assets/images/cerejinnha.png'),
    'coxinha.png': require('../assets/images/coxinha.png'),
    'pastel.png': require('../assets/images/pastel.png'),
    'bolinha-queijo.png': require('../assets/images/bolinha-queijo.png'),
    'kibe.png': require('../assets/images/kibe.png'),
    'almofadinha-calabresa.png': require('../assets/images/almofadinha-calabresa.png'),
    'batata-frita.png': require('../assets/images/batata-frita.png'),
    'enroladinho.png': require('../assets/images/enroladinho.png'),
    'camarao-empanado.png': require('../assets/images/camarao-empanado.png'),
  };

  function mapImage(product) {
    let mappedProduct = { ...product };
    
    if (typeof product.image === 'string' && imageMap[product.image]) {
      mappedProduct.image = imageMap[product.image];
    } else if (typeof product.image === 'string') {
      if (product.categoria === 'bolo' || product.name?.toLowerCase().includes('bolo')) {
        mappedProduct.image = imageMap['bolo.png'];
      } else {
        mappedProduct.image = imageMap['bolo.png'];
      }
    }
    
    return mappedProduct;
  }

  // Determinar produtos a mostrar
  let productsToShow = [];
  if (selectedMenu === "Bolos") productsToShow = bolosData.length ? bolosData.map(mapImage) : bolos;
  else if (selectedMenu === "Doces") productsToShow = docesData.length ? docesData.map(mapImage) : doces;
  else if (selectedMenu === "Salgados") productsToShow = salgadosData.length ? salgadosData.map(mapImage) : salgados;
  else if (selectedMenu === "Combos") productsToShow = combosData.length ? combosData.map(mapImage) : combos;

  return (
    <Layout onCartPress={() => navigation.navigate('Carrinho')}>
      {!selectedMenu ? (
        <View>
          <Text style={styles.titlecardapio}>Cardápios:</Text>
          <View style={styles.menuContainer}>
            {productsMenu.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  item.name === "Combos" && styles.comboMenuItem
                ]}
                onPress={() => setSelectedMenu(item.name)}
              >
                <Text style={[
                  styles.menuText,
                  item.name === "Combos" && styles.comboMenuText
                ]}>
                  {item.name === "Combos" ? "🔥 Combos" : item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryTitle}>📦 Informações de Entrega:</Text>
            <Text style={styles.deliveryText}>• Entrega: R$ 3,00</Text>
            <Text style={styles.deliveryText}>• Retirada no local: GRÁTIS</Text>
          </View>
        </View>
      ) : (
        <ScrollView>
          {selectedMenu === "Combos" ? (
            <View>
              <Text style={styles.comboSectionTitle}>🔥 COMBOS ESPECIAIS 🔥</Text>
              {productsToShow.map((combo, index) => (
                <View key={index} style={styles.comboCard}>
                  <View style={styles.comboHeader}>
                    <Text style={styles.comboName}>{combo.name}</Text>
                    <Text style={styles.comboPrice}>R$ {combo.price}</Text>
                  </View>
                  <Text style={styles.comboDescription}>{combo.description}</Text>
                  <Text style={styles.comboDetails}>{combo.details}</Text>
                  
                  <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={() => handleAddComboToCart(combo)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addToCartText}>🛒 Adicionar ao Carrinho</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <View style={styles.deliveryReminder}>
                <Text style={styles.deliveryReminderText}>
                  💡 Lembre-se: Entrega R$ 3,00 ou retirada GRÁTIS no local!
                </Text>
              </View>
            </View>
          ) : (
            productsToShow.map((item, index) => (
              <ProductCard
                key={index}
                name={item.name}
                recheio={item.recheio}
                price={item.price}
                image={item.image}
                categoria={item.categoria}
                recheiosDisponiveis={recheiosDisponiveis}
                maxRecheios={item.maxRecheios}
              />
            ))
          )}
          
          <TouchableOpacity
            onPress={() => setSelectedMenu(null)}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Voltar ao Menu</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Layout>
  );
}
// ...existing code...

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 30,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "rgba(255, 140, 0, 0.2)",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ff8c00",
    width: 150,
    height: 90,
  },
  comboMenuItem: {
    backgroundColor: "rgba(255, 140, 0, 0.2)",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ff8c00",
    width: 150,
    height: 90,
  },
  titlecardapio: {
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
    fontSize: 40,
    backgroundColor: "rgba(255, 140, 0, 0.2)",
     borderColor: "#ff8c00",
    borderRadius: 10,
  },
  menuText: {
    textAlign: "center",
    fontSize: 25,
    width: 120,
    height: 30,
    borderRadius: 10,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#ff8c00",
  },
  comboMenuText: {
    backgroundColor: "#ff8c00",
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  comboSectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff8c00",
    textAlign: "center",
    marginVertical: 20,
    backgroundColor: "hsla(33, 20.90%, 91.60%, 0.90)",
    padding: 10,
    borderRadius: 10,
  },
  comboCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#ff8c00",
  },
  comboHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  comboName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  comboPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff8c00",
  },
  comboDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    fontWeight: "600",
  },
  comboDetails: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
    marginBottom: 15,
  },
  addToCartButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  deliveryInfo: {
    backgroundColor: "rgba(49, 211, 49, 0.5)",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#228b22",
  },
  deliveryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // ✅ Mudado para branco
    marginBottom: 8,
  },
  deliveryText: {
    fontSize: 16,
    color: "#fff", // ✅ Mudado para branco
    marginVertical: 2,
     fontWeight: "bold",
  },
  deliveryReminder: {
    backgroundColor: "rgba(255, 193, 7, 0.3)",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffc107",
  },
  deliveryReminderText: {
    fontSize: 16,
    color: "#856404",
    textAlign: "center",
    fontWeight: "600",
  },
  backButton: {
    margin: 20,
    padding: 10,
    backgroundColor: "#ffa500",
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});