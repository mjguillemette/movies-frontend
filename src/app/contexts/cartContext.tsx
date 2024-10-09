'use client'

import React, { createContext, useContext, useState } from 'react'
import { Movie } from '../types/MovieTypes'
import { checkoutMovie, returnMovie } from '../services/movieService';

type CartContextType = {
  cart: Movie[];
  addToCart: (movie: Movie) => void;
  removeFromCart: (title: string) => void;
  checkoutMovies: () => Promise<void>;
  returnMovie: (title: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

// Create the context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = (movie: Movie) => {
    setCart(prevCart => {
      // Check if movie is already in cart
      if (prevCart.some(item => item.title === movie.title)) {
        return prevCart;
      }
      // Check if movie is in stock
      if (movie.stock < 1) {
        return prevCart;
      }
      return [...prevCart, movie];
    });
  };

  const removeFromCart = (title: string) => {
    setCart(prevCart => prevCart.filter(item => item.title !== title));
  };

  const handlecheckoutMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Checkout each movie in cart
      const checkoutPromises = cart.map(movie =>
        checkoutMovie(movie.title, 1)
      );
      await Promise.all(checkoutPromises);
      setCart([]); // Clear cart after successful checkout
    } catch (err) {
      setError('Failed to checkout movies. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnMovie = async (title: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await returnMovie(title, 1);
    } catch (err) {
      setError('Failed to return movie. Please try again.');
      console.error('Return error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        checkoutMovies: handlecheckoutMovies, 
        returnMovie: handleReturnMovie,
        isLoading,
        error 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};