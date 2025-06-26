'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'ok' | 'error';

interface EndpointConfig {
  label: string;
  endpoint: string;
  params?: {
    name: string;
    label: string;
    default: string;
  }[];
}

const endpoints: EndpointConfig[] = [
  {
    label: 'Get Trending Movies',
    endpoint: '/api/getTrendingMovies',
  },
  {
    label: 'Get Top Rated Movies',
    endpoint: '/api/getTopRatedMovies',
    params: [
      {
        name: 'page',
        label: 'Page',
        default: '1',
      },
    ],
  },
  {
    label: 'Get Movie Genres',
    endpoint: '/api/getMoviesGenres',
  },
  {
    label: 'Get Trending Shows',
    endpoint: '/api/getTrendingShows',
  },
  {
    label: 'Get Top Rated Shows',
    endpoint: '/api/getTopRatedShows',
    params: [
      {
        name: 'page',
        label: 'Page',
        default: '1',
      },
    ],
  },
  {
    label: 'Get Show Genres',
    endpoint: '/api/getShowsGenres',
  },
];

export default function Home() {
  const [status, setStatus] = useState<Status>('idle');
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setParamValues((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async (config: EndpointConfig) => {
    setStatus('loading');
    setActiveLabel(config.label);

    const params = config.params?.map(({ name }) => {
      const val = paramValues[name] || '1';
      return `${name}=${val}`;
    });

    const url = `${config.endpoint}${params && params.length > 0 ? `?${params.join('&')}` : ''}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.ok) {
        setStatus('ok');
      } else {
        setStatus('error');
      }
    } catch (e) {
      console.error('Error fetching data:', e);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="flex flex-col gap-6">
        {endpoints.map((config) => (
          <div key={config.label} className="flex items-center gap-4">
            <div className='degradedContainer'>
              <button
                className="bg-black px-8 py-3 rounded font-semibold hover:bg-gray-900 transition"
                onClick={() => fetchData(config)}
                disabled={status === 'loading'}
              >
                {status === 'loading' && activeLabel === config.label
                  ? 'Cargando...'
                  : config.label}
              </button>
            </div>
            {config.params?.map((param) => (
              <input
                key={param.name}
                type="number"
                min={1}
                className="w-22 px-2 py-3 rounded bg-Night text-whiteSmoke border border-gray-700"
                placeholder={param.label}
                value={paramValues[param.name] || param.default}
                onChange={(e) => handleChange(param.name, e.target.value)}
              />
            ))}
          </div>
        ))}
        {status === 'ok' && <p className="text-NeonBlue">¡Success!</p>}
        {status === 'error' && <p className="text-red-400">Internal Error.</p>}
      </div>
    </div>
  );
}
