import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';

export default function WhatsAppButton() {
  const whatsappNumber = '5575999741333'; // Número do WhatsApp: (75) 99974-1333
  const message = 'Olá! Gostaria de saber mais sobre os produtos da SnackFOOD!';

  const openWhatsApp = () => {
    const url = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          // Se o WhatsApp não estiver instalado, abre o link da web
          const webUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
          return Linking.openURL(webUrl);
        }
      })
      .catch((err) => {
        console.error('Erro ao abrir WhatsApp:', err);
        Alert.alert(
          'Erro',
          'Não foi possível abrir o WhatsApp. Verifique se está instalado.',
          [{ text: 'OK' }]
        );
      });
  };

  return (
    <TouchableOpacity
      style={styles.whatsappButton}
      onPress={openWhatsApp}
      activeOpacity={0.8}
    >
      <Text style={styles.whatsappIcon}></Text>
      <Text style={styles.whatsappText}>Fale Conosco</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  whatsappButton: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 50, // Mantém formato arredondado
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    zIndex: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    minWidth: 5, // Largura mínima para o texto
  },
  whatsappIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  whatsappText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});