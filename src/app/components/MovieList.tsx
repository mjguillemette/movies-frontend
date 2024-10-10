// components/MovieList.tsx

"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MovieCardComponent } from "./MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { useMovies } from "../contexts/movieContext";
import MovieCardSkeleton from "./MovieCardSkeleton";
import SearchBar from "./SearchBar";
import MovieFilter from "./MovieFilter";

const MovieList: React.FC = () => {
  const { movies, isLoading, error, searchQuery, setSearchQuery } = useMovies();
  const [expandedMovieTitle, setExpandedMovieTitle] = useState<string | null>(
    null
  );

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Persist filters to localStorage (optional)
  useEffect(() => {
    const storedGenres = localStorage.getItem("selectedGenres");
    const storedLanguages = localStorage.getItem("selectedLanguages");

    if (storedGenres) setSelectedGenres(JSON.parse(storedGenres));
    if (storedLanguages) setSelectedLanguages(JSON.parse(storedLanguages));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
  }, [selectedGenres]);

  useEffect(() => {
    localStorage.setItem(
      "selectedLanguages",
      JSON.stringify(selectedLanguages)
    );
  }, [selectedLanguages]);

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

  // Function to clear all filters
  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
  };

  // Filter movies based on search query, selected genres, and selected languages
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGenre =
        selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.includes(movie.language);
      return matchesSearch && matchesGenre && matchesLanguage;
    });
  }, [movies, searchQuery, selectedGenres, selectedLanguages]);

  return (
    <div className="mx-auto px-4 py-8 items-start min-w-6xl min-h-fit max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Movie Collection</h1>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* Movie Filter */}
      <MovieFilter
        selectedGenres={selectedGenres}
        selectedLanguages={selectedLanguages}
        setSelectedGenres={setSelectedGenres}
        setSelectedLanguages={setSelectedLanguages}
        onClearFilters={handleClearFilters}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
          {[...Array(8)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}
      {/* Error State */}
      {error && <div className="text-center py-8 text-red-500">{error}</div>}
      {/* Movies Display */}
      {!isLoading && !error && (
        <>
          {filteredMovies.length > 0 ? (
            <>
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
                  {filteredMovies.map((movie) => (
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
              <div className="pb-12"></div>
            </>
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
