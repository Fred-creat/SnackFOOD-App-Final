import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView
} from 'react-native';
import { API_URL } from '../api';

export default function RecheioSelectorModal({ 
  visible, 
  onClose, 
  onConfirm, 
  maxRecheios = 2,
  produtoNome,
  recheiosDisponiveis: recheiosProps
}) {
  const [recheiosDisponiveis, setRecheiosDisponiveis] = useState([]);
  const [recheiosSelecionados, setRecheiosSelecionados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      if (recheiosProps && recheiosProps.length > 0) {
        // Usa os recheios passados como prop
        setRecheiosDisponiveis(recheiosProps.filter(r => r.disponivel));
        setLoading(false);
      } else {
        // Fallback: busca do backend se não tiver props
        carregarRecheios();
      }
      setRecheiosSelecionados([]);
    }
  }, [visible, recheiosProps]);

  const carregarRecheios = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/recheios`);
      const recheios = await response.json();
      setRecheiosDisponiveis(recheios.filter(r => r.disponivel));
    } catch (error) {
      console.error('Erro ao carregar recheios:', error);
      Alert.alert('Erro', 'Não foi possível carregar os recheios disponíveis');
    } finally {
      setLoading(false);
    }
  };

  const toggleRecheio = (recheio) => {
    const jaEstaAdicionado = recheiosSelecionados.find(r => r.id === recheio.id);
    
    if (jaEstaAdicionado) {
      // Remove o recheio
      setRecheiosSelecionados(prev => prev.filter(r => r.id !== recheio.id));
    } else {
      // Adiciona o recheio se não exceder o limite
      if (recheiosSelecionados.length < maxRecheios) {
        setRecheiosSelecionados(prev => [...prev, recheio]);
      } else {
        Alert.alert(
          'Limite excedido', 
          `Você pode escolher no máximo ${maxRecheios} recheios.`
        );
      }
    }
  };

  const confirmarSelecao = () => {
    if (recheiosSelecionados.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos um recheio.');
      return;
    }

    onConfirm(recheiosSelecionados);
    onClose();
  };

  const renderRecheio = ({ item }) => {
    const isSelected = recheiosSelecionados.find(r => r.id === item.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.recheioItem,
          isSelected && styles.recheioSelecionado
        ]}
        onPress={() => toggleRecheio(item)}
      >
        <View style={styles.recheioInfo}>
          <Text style={[
            styles.recheioNome,
            isSelected && styles.textoSelecionado
          ]}>
            {item.nome}
          </Text>
          {isSelected && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.titulo}>Escolha os Recheios</Text>
              <Text style={styles.subtitulo}>
                {produtoNome}
              </Text>
              <Text style={styles.instrucao}>
                Selecione até {maxRecheios} recheios para seu bolo
              </Text>
            </View>

            <View style={styles.contadorContainer}>
              <Text style={styles.contador}>
                {recheiosSelecionados.length}/{maxRecheios} recheios selecionados
              </Text>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Carregando recheios...</Text>
              </View>
            ) : (
              <FlatList
                data={recheiosDisponiveis}
                renderItem={renderRecheio}
                keyExtractor={(item) => item.id}
                style={styles.lista}
                scrollEnabled={false}
              />
            )}

            <View style={styles.recheiosSelecionadosContainer}>
              <Text style={styles.selecionadosTitle}>Recheios Selecionados:</Text>
              {recheiosSelecionados.length > 0 ? (
                recheiosSelecionados.map((recheio, index) => (
                  <Text key={recheio.id} style={styles.recheioSelecionadoText}>
                    {index + 1}. {recheio.nome}
                  </Text>
                ))
              ) : (
                <Text style={styles.nenhumSelecionado}>
                  Nenhum recheio selecionado
                </Text>
              )}
            </View>

            <View style={styles.botoes}>
              <TouchableOpacity 
                style={styles.botaoCancelar} 
                onPress={onClose}
              >
                <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.botaoConfirmar,
                  recheiosSelecionados.length === 0 && styles.botaoDesabilitado
                ]}
                onPress={confirmarSelecao}
                disabled={recheiosSelecionados.length === 0}
              >
                <Text style={styles.textoBotaoConfirmar}>
                  Confirmar ({recheiosSelecionados.length})
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 15,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  instrucao: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  contadorContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  contador: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  lista: {
    maxHeight: 200,
  },
  recheioItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  recheioSelecionado: {
    backgroundColor: '#e8f5e8',
    borderColor: '#2e7d32',
  },
  recheioInfo: {
    flexDirection: 'row',
    justifyContent: 'between',
    alignItems: 'center',
  },
  recheioNome: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  textoSelecionado: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: 18,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  recheiosSelecionadosContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  selecionadosTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  recheioSelecionadoText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  nenhumSelecionado: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoCancelar: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  botaoConfirmar: {
    flex: 1,
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#ccc',
  },
  textoBotaoConfirmar: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
