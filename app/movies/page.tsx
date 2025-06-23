'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { Movie } from "../../types/movie";

export default function MoviesPage({
  initialMovies = [],
}: {
  initialMovies?: Movie[];
}) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [loading, setLoading] = useState(false);

  const [years, setYears] = useState<number[]>([]);
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const year = searchParams.get('year') || '';
  const genre = searchParams.get('genre') || '';
  const top = searchParams.get('top') === '1';

  // Cargar años y géneros al montar el componente
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch('/api/moviesFilters');
        const data = await res.json();
        setYears(data.years);
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    fetchFilters();
  }, []);

  // Fetch películas filtradas al cambiar filtros
  useEffect(() => {
    const fetchFilteredMovies = async () => {
      setLoading(true);
      const query = new URLSearchParams({ year, genre, top: top ? '1' : '' }).toString();
      const res = await fetch(`/api/movies?${query}`);
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    };

    fetchFilteredMovies();
  }, [year, genre, top]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/movies?${params.toString()}`);
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="flex gap-4 mb-8 mx-24 items-center flex-wrap">
        <select
          value={year}
          onChange={(e) => updateFilter('year', e.target.value)}
          className="bg-black border border-white px-3 py-2 rounded"
        >
          <option value="">Año</option>
          {Array.isArray(years) && years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={genre}
          onChange={(e) => updateFilter('genre', e.target.value)}
          className="bg-black border border-white px-3 py-2 rounded"
        >
          <option value="">Género</option>
          {Array.isArray(genres) && genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={top}
            onChange={(e) => updateFilter('top', e.target.checked ? '1' : '')}
            className="accent-white"
          />
          Top 100
        </label>
      </div>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : Array.isArray(movies) && movies.length > 0 ? (
        <div className="grid mx-24 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-8">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="relative bg-black shadow-lg flex flex-col items-center transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-white group cursor-pointer rounded-lg overflow-hidden"
            >
              <div className="w-full aspect-[2/3] bg-black">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/no-image.png'
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black bg-opacity-70 px-2 py-1 rounded text-white text-sm flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-white">No se encontraron películas.</p>
      )}
    </div>
  );
}
