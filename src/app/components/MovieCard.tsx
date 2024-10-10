"use client";

import { useState } from "react";
import Image from "next/legacy/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Film } from "lucide-react";
import { Movie } from "@/app/types/MovieTypes";
import MovieCheckoutButton from "./CheckoutButton";
import { useCart } from "../contexts/cartContext";

export function MovieCardComponent({
  movie,
  isExpanded,
  onToggle,
}: {
  movie: Movie;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isOutOfStock = movie.stock < 1;
  const { rentedMovies } = useCart();

  const isRented = rentedMovies.some(
    (rentedMovie) => rentedMovie.title === movie.title
  );

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="w-full max-w-sm overflow-hidden relative flex flex-col">
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{ opacity: 0 }}
          whileHover={{ opacity: 0.3, x: ["0%", "100%"] }}
        />
        <div className="relative w-full aspect-[2/3] flex-grow">
          <Image
            src={`/assets/images/poster-placeholder.png`}
            alt={`${movie.title} poster`}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 hover:opacity-60"
          />
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4"
              >
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <dt className="font-semibold">Genre:</dt>
                    <dd>{movie.genre}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Language:</dt>
                    <dd>{movie.language}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Director:</dt>
                    <dd>{movie.director}</dd>
                  </div>
                </dl>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col z-20 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between z-20">
              <span className="text-xl font-bold truncate">{movie.title}</span>
              <Badge variant="secondary">{movie.yearOfRelease}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="font-semibold">Price:</dt>
                <dd>${movie.price.toFixed(2)}</dd>
              </div>
              <div>
                <dt className="font-semibold">In stock:</dt>
                <dd>{movie.stock}</dd>
              </div>
            </dl>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-4"
              onClick={onToggle}
              aria-expanded={isExpanded}
              aria-controls="more-info"
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Hide Info
                </>
              ) : (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Show Info
                </>
              )}
            </Button>
          </CardContent>
        </div>
        <div className="flex justify-center flex-grow p-2">
          {isRented ? (
            <Button disabled variant="default" className="w-full max-w-xs">
              <Film className="mr-2 h-5 w-5" />
              Already Rented
            </Button>
          ) : isOutOfStock ? (
            <Button disabled variant="outline" className="w-full max-w-xs">
              <Film className="mr-2 h-5 w-5" />
              Out of Stock
            </Button>
          ) : (
            <MovieCheckoutButton movie={movie} />
          )}
        </div>
      </Card>
    </motion.div>
  );
}
