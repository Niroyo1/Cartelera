'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'ok' | 'error';

export default function Home() {
  const [status, setStatus] = useState<Status>('idle');
  const [count, setCount] = useState<number | null>(null);

  const fetchData = async (endpoint: string) => {
    setStatus('loading');
    try {
      const res = await fetch(endpoint, { method: 'POST' });
      const data = await res.json();
      if (data.ok) {
        setStatus('ok');
        setCount(data.count ?? null);
      } else {
        setStatus('error');
        setCount(null);
      }
    } catch {
      setStatus('error');
      setCount(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="flex flex-col gap-6">
        <button
          className="bg-WhiteSmoke text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={() => fetchData('/api/getTrendingMovies')}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Cargando...' : 'Get Trending Movies'}
        </button>
        <button
          className="bg-WhiteSmoke text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={() => fetchData('/api/getTopRatedMovies')}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Cargando...' : 'Get Top Rated Movies'}
        </button>
        <button
          className="bg-WhiteSmoke text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={() => fetchData('/api/getMoviesGenres')}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Cargando...' : 'Get Movie Genres'}
        </button>
        {status === 'ok' && count !== null && (
          <p className="text-teal-600">¡Películas guardadas! ({count})</p>
        )}
        {status === 'error' && <p className="text-red-400">Error al guardar películas.</p>}
      </div>
    </div>
  );
}
