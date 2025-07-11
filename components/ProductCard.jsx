import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useCart } from './CartContext';
import RecheioSelectorModal from './RecheioSelectorModal';

export default function ProductCard({ 
  name, 
  price, 
  image, 
  recheio, 
  categoria,
  recheiosDisponiveis,
  maxRecheios 
}) {
  const { addToCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  
  const isBolo = categoria === 'bolo' || name.toLowerCase().includes('bolo');

  const handleAddToCart = () => {
    if (isBolo && recheiosDisponiveis) {
      // Para bolos, abre o modal de seleção de recheios
      setModalVisible(true);
    } else {
      // Para outros produtos, adiciona diretamente
      addToCart({ name, price, image, recheio });
    }
  };

  const handleRecheiosConfirmados = (recheiosSelecionados) => {
    const recheiosTexto = recheiosSelecionados.map(r => r.nome).join(', ');
    addToCart({ 
      name, 
      price, 
      image, 
      recheio: recheiosTexto,
      recheiosDetalhados: recheiosSelecionados
    });
  };

  return (
    <View style={styles.card}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.name}>{name}</Text>
      
      {isBolo ? (
        <Text style={styles.recheioInfo}>
          🍰 Escolha até {maxRecheios || 2} recheios
        </Text>
      ) : (
        recheio && <Text style={styles.recheio}>Recheio: {recheio}</Text>
      )}
      
      <Text style={styles.price}>R$ {price}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>
          {isBolo ? 'Escolher Recheios' : 'Adicionar ao carrinho'}
        </Text>
      </TouchableOpacity>

      {isBolo && (
        <RecheioSelectorModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleRecheiosConfirmados}
          maxRecheios={maxRecheios || 2}
          produtoNome={name}
          recheiosDisponiveis={recheiosDisponiveis}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(203, 204, 189, 0.9)',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recheio: {
    fontSize: 15,
    color: '#333',
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'center',
  },
  recheioInfo: {
    fontSize: 14,
    color: '#2e7d32',
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'center',
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginTop: 8,
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});