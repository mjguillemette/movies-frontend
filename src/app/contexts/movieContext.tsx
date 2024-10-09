'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllMovies, searchMovies } from '../services/movieService';
import { Movie } from '../types/MovieTypes';
import useDebounce from '@/hooks/useDebounce';

type MovieContextType = {
  movies: Movie[];
  genres: string[];
  languages: string[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  fetchAllMovies: () => Promise<void>;
  fetchSearchedMovies: (query: string) => Promise<void>;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

/**
 * Custom hook to consume the MovieContext.
 * Throws an error if used outside of the MovieProvider.
 */
export const useMovies = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

/**
 * MovieProvider component that wraps around parts of the app
 * that need access to movie data, genres, and languages.
 */
export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Debounce the search query to optimize performance
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  /**
   * Fetches all movies from the API and updates the movies state.
   */
  const fetchAllMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllMovies();
      setMovies(response.data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      setError('An error occurred while fetching movies. Please try again.');
      setMovies([]);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  /**
   * Fetches movies based on the search query.
   * If the query is empty, it fetches all movies.
   * @param query The search query string.
   */
  const fetchSearchedMovies = async (query: string) => {
    if (query.trim() === '') {
      fetchAllMovies();
      return;
    }

    setIsSearching(true);
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchMovies(query);
      setMovies(response.data);
    } catch (error) {
      console.error('Failed to search movies:', error);
      setError('An error occurred while searching for movies.');
      setMovies([]);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  // Fetch all movies when the component mounts
  useEffect(() => {
    fetchAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch searched movies whenever the debounced search query changes
  useEffect(() => {
    fetchSearchedMovies(debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  /**
   * Derives unique genres and languages from the fetched movies.
   * Updates the genres and languages state accordingly.
   */
  useEffect(() => {
    const genreSet = new Set<string>();
    const languageSet = new Set<string>();

    movies.forEach((movie) => {
      if (movie.genre) genreSet.add(movie.genre);
      if (movie.language) languageSet.add(movie.language);
    });

    // Convert Sets to sorted arrays for consistent ordering
    setGenres(Array.from(genreSet).sort());
    setLanguages(Array.from(languageSet).sort());
  }, [movies]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        genres,
        languages,
        isLoading,
        error,
        searchQuery,
        setSearchQuery,
        fetchAllMovies,
        fetchSearchedMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
