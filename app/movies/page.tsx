'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaStar, FaChevronDown } from 'react-icons/fa';
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
  const order = searchParams.get('order') || 'date';
  const page = parseInt(searchParams.get('page') || '1');

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') {
      params.set('page', '1');
    }
    router.push(`/movies?${params.toString()}`);
  };

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

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        year,
        genre,
        order,
        page: page.toString(),
      }).toString();

      const res = await fetch(`/api/movies?${query}`);
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    };

    fetchFilteredMovies();
  }, [year, genre, order, page]);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="flex gap-4 mb-8 mx-40 items-center flex-wrap">
        {/* Year */}
        <div className="relative degradedContainer">
          <div className="relative">
            <select
              value={year}
              onChange={(e) => updateFilter('year', e.target.value)}
              className="appearance-none bg-black text-white px-4 py-2 pr-10 w-full rounded focus:outline-none focus:ring-0"
            >
              <option value="">Year</option>
              {Array.isArray(years) &&
                years.map((y) => (
                  <option key={y} value={y}>
                    {y % 10 === 0 && y !== new Date().getFullYear()
                      ? `${y}s`
                      : y}
                  </option>
                ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none text-sm" />
          </div>
        </div>

        {/* Genre */}
        <div className="relative degradedContainer">
          <div className="relative">
            <select
              value={genre}
              onChange={(e) => updateFilter('genre', e.target.value)}
              className="appearance-none bg-black text-white px-4 py-2 pr-10 w-full rounded focus:outline-none focus:ring-0"
            >
              <option value="">Genre</option>
              {Array.isArray(genres) &&
                genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none text-sm" />
          </div>
        </div>

        {/* Order */}
        <div className="relative degradedContainer">
          <div className="relative">
            <select
              value={order}
              onChange={(e) => updateFilter('order', e.target.value)}
              className="appearance-none bg-black text-white px-4 py-2 pr-10 w-full rounded focus:outline-none focus:ring-0"
            >
              <option value="date">Date</option>
              <option value="top">Rate</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none text-sm" />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : Array.isArray(movies) && movies.length > 0 ? (
        <>
          <div className="grid mx-40 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-6">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="group inline-block transition-all duration-200 hover:scale-105 rounded-lg overflow-hidden"
              >
                <div className="relative p-[2px] rounded-lg bg-transparent group-hover:bg-gradient-to-t group-hover:from-[#B381FB] group-hover:to-[#5D6FF1] transition-all duration-200">
                  <div className="bg-black rounded-lg shadow-lg flex flex-col items-center cursor-pointer overflow-hidden">
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
                    <div className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 bg-black bg-opacity-70 px-2 py-1 rounded text-white font-semibold flex items-center gap-1">
                      <FaStar className="text-Lavender" />
                      {movie.vote_average === 0 ? '-' : movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-18 items-center">
            {/* ´Previous */}
            <div className={`degradedContainer ${page <= 1 ? 'opacity-40 pointer-events-none' : ''}`}>
              <button
                onClick={() => updateFilter('page', (page - 1).toString())}
                className="w-full h-full rounded px-4 py-2 bg-black text-white transition-all duration-200 hover:bg-gradient-to-t hover:from-[#221c2f] hover:to-[#14193d]"
              >
                Previous
              </button>
            </div>

            {/* Page */}
            <span className="text-white text-lg">Page {page}</span>

            {/* Next */}
            <div className={`degradedContainer ${movies.length < 80 ? 'opacity-40 pointer-events-none' : ''}`}>
              <button
                onClick={() => updateFilter('page', (page + 1).toString())}
                className="w-full h-full rounded px-4 py-2 bg-black text-white transition-all duration-200 hover:bg-gradient-to-t hover:from-[#221c2f] hover:to-[#14193d]"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-white">No movies found.</p>
      )}
    </div>
  );
}
