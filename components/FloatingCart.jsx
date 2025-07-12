import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "./CartContext";

export default function FloatingCart({ onPress }) {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => {
    // Garante que o preço é número
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(',', '.')) : item.price;
    return sum + (price * item.qty);
  }, 0);

  if (totalItems === 0) return null;

  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.text}>🛒 {totalItems} | R$ {totalPrice.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor:  "#ff8c00",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 1000,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
