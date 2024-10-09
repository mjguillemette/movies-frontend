"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Film, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../contexts/cartContext";
import { Movie } from "@/app/types/MovieTypes";

interface MovieCheckoutButtonProps {
  movie: Movie;
}

export default function MovieCheckoutButton({
  movie,
}: MovieCheckoutButtonProps) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const isInCart = cart.some((item) => item.title === movie.title);

  const handleToggle = () => {
    if (isInCart) {
      removeFromCart(movie.title);
    } else {
      setIsAdding(true);
      addToCart(movie);
      setTimeout(() => setIsAdding(false), 1000);
    }
  };

  return (
    <Button
      onClick={handleToggle}
      variant={isInCart ? "default" : "outline"}
      className={`
        w-full max-w-xs transition-all duration-300 ease-in-out border-2
        ${
          isInCart
            ? "bg-gradient-to-r from-teal-200 to-blue-200 text-black"
            : "hover:bg-gray-100 hover:text-gray-800"
        }
      `}
    >
      {isAdding ? (
        <>
          <ShoppingCart className="mr-2 h-5 w-5 animate-bounce" />
          Adding to Cart...
        </>
      ) : isInCart ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          In Cart
        </>
      ) : (
        <>
          <Film className="mr-2 h-5 w-5" />
          Rent Movie
        </>
      )}
    </Button>
  );
}
