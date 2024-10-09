"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckoutDrawer } from "./CheckoutDrawer";
import { useCart } from "../contexts/cartContext";

export default function FloatingCheckoutIndicator() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cart } = useCart();

  const itemCount = cart.length;

  return (
    <>
      <TooltipProvider>
        <Tooltip open={isHovered}>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              className="fixed bottom-4 right-4 rounded-full shadow-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsDrawerOpen(true)}
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingCart className="h-6 w-6" />
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 px-2 py-1"
              >
                {itemCount}
              </Badge>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" align="center">
            <p>
              {itemCount} {itemCount === 1 ? "item" : "items"} in cart
            </p>
            <p className="text-xs text-muted-foreground">Click to view cart</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CheckoutDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
