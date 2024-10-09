'use client'

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Movie Rental App</h1>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/rentals" className="text-gray-700 hover:text-gray-900">
            My Rentals
          </Link>
        </nav>
      </div>
    </header>
  );
}