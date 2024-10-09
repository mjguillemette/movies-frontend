"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCart } from "../contexts/cartContext";
import { get } from "http";
import { getAllMovies } from "../services/movieService";

type CheckoutDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CheckoutDrawer({ isOpen, onClose }: CheckoutDrawerProps) {
  const {
    cart,
    removeFromCart,
    checkoutMovies,
    isLoading,
    error,
  } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    await checkoutMovies();
    if (!error) {
      onClose();
    }
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your Rental Cart</DrawerTitle>
          <DrawerDescription>
            Review your selected movies before rental checkout
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
              {error}
            </div>
          )}
          
          {cart.map((movie) => (
            <div 
              key={movie.title} 
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-500">
                  ${movie.price.toFixed(2)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(movie.title)}
                aria-label={`Remove ${movie.title} from cart`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              Your rental cart is empty
            </div>
          )}
        </div>

        <DrawerFooter>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total Rental Cost:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleCheckout}
            disabled={isLoading || cart.length === 0}
          >
            {isLoading ? "Processing Rental..." : "Complete Rental"}
          </Button>
          
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}