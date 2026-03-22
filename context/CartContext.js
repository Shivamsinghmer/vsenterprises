"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";


const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const initialMount = useRef(true);

  // Load from database if signed in, else load from localStorage
  useEffect(() => {
    if (!isAuthLoaded) return;

    if (!isSignedIn) {
      const savedCart = localStorage.getItem("vs_cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
      setIsDataLoaded(true);
      return;
    }

    async function fetchUserCart() {
      try {
        const res = await fetch('/api/user/sync');
        if (res.ok) {
          const data = await res.json();
          if (data.cart) {
             setCartItems(data.cart);
             localStorage.setItem('vs_cart', JSON.stringify(data.cart));
          }
        }
      } catch (error) {
        console.error("Failed to fetch user cart", error);
      } finally {
        setIsDataLoaded(true);
      }
    }

    fetchUserCart();
  }, [isSignedIn, isAuthLoaded]);

  // Save to localStorage and DB on change
  useEffect(() => {
    if (!isDataLoaded) return;
    
    if (initialMount.current) {
        initialMount.current = false;
        return;
    }

    localStorage.setItem("vs_cart", JSON.stringify(cartItems));

    if (isSignedIn) {
        fetch('/api/user/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: cartItems })
        }).catch(err => console.error("Failed to sync cart", err));
    }
  }, [cartItems, isSignedIn, isDataLoaded]);

  const addToCart = (product, quantity, selectedOptions = {}) => {
    setCartItems((prevItems) => {
      // Check if item already exists with same options
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item._id === product._id &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { ...product, quantity, selectedOptions }];
    });
  };

  const removeFromCart = (id, selectedOptions) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item._id === id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
      )
    );
  };

  const updateQuantity = (id, selectedOptions, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
