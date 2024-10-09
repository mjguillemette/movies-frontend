// components/MovieFilter.tsx

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { useMovies } from '../contexts/movieContext';

interface MovieFilterProps {
  selectedGenres: string[];
  selectedLanguages: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
  onClearFilters: () => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({
  selectedGenres,
  selectedLanguages,
  setSelectedGenres,
  setSelectedLanguages,
  onClearFilters,
}) => {
  const { genres, languages } = useMovies();

  // Helper function to toggle selection
  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedItems.includes(item)) {
      setSelected(selectedItems.filter((i) => i !== item));
    } else {
      setSelected([...selectedItems, item]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
      {/* Genre Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-64 justify-between mr-4">
            Filter by Genre <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="flex flex-col max-h-60 overflow-y-auto">
            {genres.length > 0 ? (
              genres.map((genre) => (
                <label key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={() =>
                      toggleSelection(genre, selectedGenres, setSelectedGenres)
                    }
                  />
                  <span>{genre}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500">No genres available.</p>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Language Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-64 justify-between mr-4">
            Filter by Language <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="flex flex-col max-h-60 overflow-y-auto">
            {languages.length > 0 ? (
              languages.map((language) => (
                <label key={language} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={() =>
                      toggleSelection(
                        language,
                        selectedLanguages,
                        setSelectedLanguages
                      )
                    }
                  />
                  <span>{language}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500">No languages available.</p>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear Filters Button */}
      <Button variant="secondary" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default MovieFilter;
