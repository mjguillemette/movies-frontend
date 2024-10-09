"use client";

import React from "react";
import { useCart } from "../contexts/cartContext";
import { Button } from "@/components/ui/button";
import RentedMovieItem from "./RentedMovieItem";

const RentedMoviesList: React.FC = () => {
  const { rentedMovies, returnRentedMovie, isLoading, error } = useCart();

  const handleReturn = async (title: string) => {
    await returnRentedMovie(title);
  };

  return (
    <div className="mx-auto px-4 py-8 items-start max-w-7xl min-w-full">
      <h1 className="text-3xl font-bold mb-6">Your Rentals</h1>

      {isLoading && <div className="text-center py-8">Processing...</div>}

      {error && <div className="text-center py-8 text-red-500">{error}</div>}

      {!isLoading && !error && (
        <>
          {rentedMovies.length > 0 ? (
            <ul className="space-y-4">
              {rentedMovies.map((movie) => (
                <RentedMovieItem
                  key={movie.title}
                  movie={movie}
                  onReturn={handleReturn}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              You have no rentals at the moment.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RentedMoviesList;
