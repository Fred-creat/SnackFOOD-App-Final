import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Layout from '../components/Layout';
import WhatsAppButton from '../components/WhatsAppButton'; // ✅ Importar o componente existente

export default function HomeScreen({ navigation }) {
  return (
    <Layout onCartPress={() => navigation.navigate('Carrinho')}>
      <View style={styles.center}>
        <Text style={styles.title}>Bem-vindo à Snack Food!</Text>
        <Text style={styles.subtitle}>O melhor cardápio de bolos, doces e salgados para você!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.buttonText}>Ver Menu</Text>
        </TouchableOpacity>
      </View>
      
      {/* ✅ Usar o componente WhatsAppButton existente apenas aqui */}
      <WhatsAppButton />
    </Layout>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(255, 140, 0, 0.8)",
    borderColor: "#ff8c00",
    maxHeight: 190,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffa500',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});