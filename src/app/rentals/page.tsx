"use client";

import RentedMoviesList from "../components/RentedMoviesList";

export default function RentalsPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <RentedMoviesList />
    </div>
  );
}
