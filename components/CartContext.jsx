import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState('retirada');

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.name === product.name);
      if (found) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(productName) {
    setCart((prev) => prev.filter((item) => item.name !== productName));
  }

  function updateQuantity(itemName, quantity) {
    if (quantity <= 0) {
      removeFromCart(itemName);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.name === itemName ? { ...item, qty: quantity } : item
        )
      );
    }
  }

  function clearCart() {
    setCart([]);
    setDeliveryOption('retirada');
  }

  function getSubtotal() {
    return cart.reduce((sum, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price.replace(',', '.')) : item.price;
      return sum + (price * item.qty);
    }, 0);
  }

  function getDeliveryFee() {
    return deliveryOption === 'entrega' ? 3.00 : 0;
  }

  function getCartTotal() {
    const subtotal = getSubtotal();
    const deliveryFee = getDeliveryFee();
    return subtotal + deliveryFee;
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      deliveryOption,
      setDeliveryOption,
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      getSubtotal,
      getDeliveryFee,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}