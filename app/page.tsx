'use client';

import { getDayTrendingMovies } from '../lib/tmdb/movies';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleTrendingClick = async () => {
    setLoading(true);
    try {
      const data = await getDayTrendingMovies();
      console.log('Trending Movies:', data);
      // Aquí puedes manejar la data como desees
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="flex flex-col gap-6">
        <button
          className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={handleTrendingClick}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Botón 1 (Trending)'}
        </button>
        <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
          Botón 2
        </button>
      </div>
    </div>
  );
}