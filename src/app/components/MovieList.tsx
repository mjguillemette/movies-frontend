"use client";

import React, { useState } from "react";
import { MovieCardComponent } from "./MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { useMovies } from "../contexts/movieContext";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieList: React.FC = () => {
  const { movies, isLoading, error, searchQuery, setSearchQuery } = useMovies();
  const [expandedMovieTitle, setExpandedMovieTitle] = useState<string | null>(
    null
  );

  const handleToggle = (movieTitle: string) => {
    setExpandedMovieTitle((prevTitle) =>
      prevTitle === movieTitle ? null : movieTitle
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className="mx-auto px-4 py-8 items-start max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Movie Collection</h1>

      <div className="mb-6">
        <label htmlFor="movie-search" className="sr-only">
          Search Movies
        </label>
        <input
          id="movie-search"
          type="text"
          placeholder="Search movies by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}

      {error && <div className="text-center py-8 text-red-500">{error}</div>}

      {!isLoading && !error && (
        <>
          {movies.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <AnimatePresence>
                {movies.map((movie) => (
                  <motion.div
                    key={movie.title}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    layout
                  >
                    <MovieCardComponent
                      movie={movie}
                      isExpanded={expandedMovieTitle === movie.title}
                      onToggle={() => handleToggle(movie.title)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-8">
              {searchQuery
                ? "No movies found for your search."
                : "No movies available at the moment."}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieList;
