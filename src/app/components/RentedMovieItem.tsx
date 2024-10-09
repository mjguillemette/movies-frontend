// components/RentedMovieItem.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { Movie } from "../types/MovieTypes";

interface RentedMovieItemProps {
  movie: Movie;
  onReturn: (title: string) => void;
}

const RentedMovieItem: React.FC<RentedMovieItemProps> = ({
  movie,
  onReturn,
}) => {
  return (
    <li className="flex items-center justify-between p-4 border rounded-md">
      <div>
        <h3 className="text-lg font-bold">{movie.title}</h3>
      </div>
      <Button variant="outline" onClick={() => onReturn(movie.title)}>
        Return Movie
      </Button>
    </li>
  );
};

export default RentedMovieItem;
