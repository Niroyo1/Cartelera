'use client';

import { useState } from 'react';
import { getDayTrendingMovies } from '../../lib/tmdb/movies';

export default function TopMoviesPage() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  const handleShowTop3 = async () => {
    setLoading(true);
    try {
      const data = await getDayTrendingMovies();
      setMovies(data.results.slice(0, 3));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowAll = async () => {
    setLoading(true);
    try {
      const data = await getDayTrendingMovies();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white mb-8">Top Movies</h1>
      <div className="flex flex-col gap-6 w-full max-w-xs mb-8">
        <button
          className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={handleShowTop3}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Mostrar Top 3'}
        </button>
        <button
          className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={handleShowAll}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Mostrar Todas'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg flex flex-col items-center w-64"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/no-image.png'
              }
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4 w-full flex flex-col items-center">
              <h2 className="text-lg font-semibold text-white text-center">{movie.title}</h2>
              <p className="text-zinc-400 text-sm mt-2">
                Estreno: {movie.release_date}
              </p>
              <p className="text-yellow-400 font-bold mt-1">
                ⭐ {movie.vote_average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}