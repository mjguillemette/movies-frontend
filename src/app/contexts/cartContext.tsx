"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Movie } from "../types/MovieTypes";
import { checkoutMovie, returnMovie } from "../services/movieService";
import { useMovies } from "./movieContext";

type CartContextType = {
  cart: Movie[];
  rentedMovies: Movie[];
  addToCart: (movie: Movie) => void;
  removeFromCart: (title: string) => void;
  checkoutMovies: () => Promise<void>;
  returnRentedMovie: (title: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { fetchAllMovies } = useMovies();
  const [cart, setCart] = useState<Movie[]>([]);
  const [rentedMovies, setRentedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedRentals = localStorage.getItem("rentedMovies");
    if (storedRentals) {
      setRentedMovies(JSON.parse(storedRentals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rentedMovies", JSON.stringify(rentedMovies));
  }, [rentedMovies]);

  const addToCart = (movie: Movie) => {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.title === movie.title)) {
        return prevCart;
      }
      if (movie.stock < 1) {
        return prevCart;
      }
      return [...prevCart, movie];
    });
  };

  const removeFromCart = (title: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.title !== title));
  };

  const checkoutMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const checkoutPromises = cart.map((movie) =>
        checkoutMovie(movie.title, 1)
      );
      await Promise.all(checkoutPromises);
      setRentedMovies((prevRentedMovies) => [...prevRentedMovies, ...cart]);
      setCart([]);
      await fetchAllMovies();
    } catch (err) {
      setError("Failed to checkout movies. Please try again.");
      console.error("Checkout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const returnRentedMovie = async (title: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await returnMovie(title, 1);
      setRentedMovies((prevRentedMovies) =>
        prevRentedMovies.filter((movie) => movie.title !== title)
      );
      await fetchAllMovies();
    } catch (err) {
      setError("Failed to return movie. Please try again.");
      console.error("Return error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        rentedMovies,
        addToCart,
        removeFromCart,
        checkoutMovies,
        returnRentedMovie,
        isLoading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
