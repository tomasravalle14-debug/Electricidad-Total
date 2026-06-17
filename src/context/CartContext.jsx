import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((p) => p.name === product.name);
      if (existingProductIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingProductIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (productName) => {
    setCart((prevCart) => prevCart.filter((p) => p.name !== productName));
  };

  const updateQuantity = (productName, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productName);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((p) => (p.name === productName ? { ...p, quantity } : p))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isDrawerOpen,
    setIsDrawerOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
