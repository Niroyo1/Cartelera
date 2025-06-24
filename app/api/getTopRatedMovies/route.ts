import { NextRequest, NextResponse } from 'next/server';
import { parseMoviesResponse } from '../../../lib/tmdb/movies';
import { saveMovies } from '../../../lib/db/movies';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';

  const url =
    `${process.env.NEXT_PUBLIC_TMDB_TOP_MOVIES_URL || 'https://api.themoviedb.org/3/movie/top_rated'}?page=${page}`;

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

    const movies = parseMoviesResponse(data);
    await saveMovies(movies);

    return NextResponse.json({ ok: true, count: movies.length });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
