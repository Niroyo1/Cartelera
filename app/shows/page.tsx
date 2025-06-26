'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaStar, FaChevronDown } from 'react-icons/fa';
import { Show } from "../../types/show";

export default function ShowsPage({
  initialShows = [],
}: {
  initialShows?: Show[];
}) {
  const [shows, setShows] = useState<Show[]>(initialShows);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const genre = searchParams.get('genre') || '';
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
    router.push(`/shows?${params.toString()}`);
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch('/api/showsFilters');
        const data = await res.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchFilteredShows = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        genre,
        page: page.toString(),
      }).toString();

      const res = await fetch(`/api/shows?${query}`);
      const data = await res.json();
      setShows(data);
      setLoading(false);
    };

    fetchFilteredShows();
  }, [ genre, page]);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-Night to-black">
      <div className="flex gap-4 mb-8 mx-40 items-center flex-wrap">

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

      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : Array.isArray(shows) && shows.length > 0 ? (
        <>
          <div className="grid mx-40 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-6">
            {shows.map((show) => (
              <Link
                key={show.id}
                href={`/shows/${show.id}`}
                className="group inline-block transition-all duration-200 hover:scale-105 rounded-lg overflow-hidden"
              >
                <div className="relative p-[2px] rounded-lg bg-transparent group-hover:bg-gradient-to-t group-hover:from-[#B381FB] group-hover:to-[#5D6FF1] transition-all duration-200">
                  <div className="bg-black rounded-lg shadow-lg flex flex-col items-center cursor-pointer overflow-hidden">
                    <div className="w-full aspect-[2/3] bg-black">
                      <img
                        src={
                          show.poster_path
                            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                            : '/no-image.png'
                        }
                        alt={show.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 bg-black bg-opacity-70 px-2 py-1 rounded text-white font-semibold flex items-center gap-1">
                      <FaStar className="text-Lavender" />
                      {show.vote_average === 0 ? '-' : show.vote_average.toFixed(1)}
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
                className="w-40 h-full rounded px-4 py-2 bg-Night text-white transition-all duration-200 hover:bg-gradient-to-t hover:from-Night hover:to-[#14193d]">
                Previous
              </button>
            </div>

            {/* Page */}
            <span className="text-white font-semibold text-lg">Page {page}</span>

            {/* Next */}
            <div className={`degradedContainer ${shows.length < 80 ? 'opacity-40 pointer-events-none' : ''}`}>
              <button
                onClick={() => updateFilter('page', (page + 1).toString())}
                className="w-40 h-full rounded px-4 py-2 bg-Night text-white transition-all duration-200 hover:bg-gradient-to-t hover:from-Night hover:to-[#14193d]"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-white">No TV shows found.</p>
      )}
    </div>
  );
}
