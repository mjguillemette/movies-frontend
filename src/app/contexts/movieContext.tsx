'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllMovies, searchMovies } from '../services/movieService';
import { Movie } from '../types/MovieTypes';
import useDebounce from '@/hooks/useDebounce';

type MovieContextType = {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  fetchAllMovies: () => Promise<void>;
  fetchSearchedMovies: (query: string) => Promise<void>;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

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

  useEffect(() => {
    fetchAllMovies();
  }, []);

  useEffect(() => {
    fetchSearchedMovies(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <MovieContext.Provider
      value={{
        movies,
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
