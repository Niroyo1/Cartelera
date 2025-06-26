'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchItem {
  id: string;
  title: string;
  type: 'movie' | 'show';
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const router = useRouter();

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  const handleSelect = (item: SearchItem) => {
    const path = item.type === 'movie' ? `/movies/${item.id}` : `/shows/${item.id}`;
    router.push(path);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-Night rounded">
        <input
          type="text"
          placeholder="Search movies or shows..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="px-4 py-2 bg-transparent text-WhiteSmoke focus:outline-none w-72"
        />
        <FiSearch className="text-WhiteSmoke mr-3" />
      </div>

      {results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-Night text-WhiteSmoke rounded shadow-lg max-h-60 overflow-auto">
          {results.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-WhiteSmoke hover:text-black cursor-pointer"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
