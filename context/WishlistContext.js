"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";


const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const initialMount = useRef(true);

  useEffect(() => {
    if (!isAuthLoaded) return;

    if (!isSignedIn) {
      const savedWishlist = localStorage.getItem("vs_wishlist");
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (e) {
          console.error("Failed to parse wishlist", e);
        }
      }
      setIsDataLoaded(true);
      return;
    }

    async function fetchUserWishlist() {
      try {
        const res = await fetch('/api/user/sync');
        if (res.ok) {
          const data = await res.json();
          if (data.wishlist) {
             setWishlistItems(data.wishlist);
             localStorage.setItem('vs_wishlist', JSON.stringify(data.wishlist));
          }
        }
      } catch (error) {
        console.error("Failed to fetch user wishlist", error);
      } finally {
        setIsDataLoaded(true);
      }
    }

    fetchUserWishlist();
  }, [isSignedIn, isAuthLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;
    
    if (initialMount.current) {
        initialMount.current = false;
        return;
    }

    localStorage.setItem("vs_wishlist", JSON.stringify(wishlistItems));

    if (isSignedIn) {
        fetch('/api/user/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wishlist: wishlistItems })
        }).catch(err => console.error("Failed to sync wishlist", err));
    }
  }, [wishlistItems, isSignedIn, isDataLoaded]);

  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.find((item) => item._id === product._id);
      if (exists) {
        return prevItems.filter((item) => item._id !== product._id);
      }
      return [...prevItems, product];
    });
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item._id === id);
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const clearWishlist = () => setWishlistItems([]);

  const getWishlistCount = () => wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
