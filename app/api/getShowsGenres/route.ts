import { NextResponse } from 'next/server';
import { parseGenresResponse } from '../../../lib/tmdb/shows';
import { saveGenres } from '../../../lib/db/shows';

export async function GET() {

  const url =
    process.env.NEXT_PUBLIC_TMDB_SHOWS_GENRES_URL ||
    'https://api.themoviedb.org/3/genre/tv/list';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TMDB_API_KEY,
    },
  };
  
  try {
    const res = await fetch(url, options);
    const data = await res.json();

    const genres = parseGenresResponse(data);
    await saveGenres(genres);

    return NextResponse.json({ ok: true});
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}