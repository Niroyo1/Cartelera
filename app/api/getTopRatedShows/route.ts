import { NextRequest, NextResponse } from 'next/server';
import { parseShowsResponse } from '../../../lib/tmdb/shows';
import { saveShows } from '../../../lib/db/shows';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';

  const url =
    `${process.env.NEXT_PUBLIC_TMDB_TOP_SHOWS_URL || 'https://api.themoviedb.org/3/tv/top_rated'}?page=${page}`;

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

    const movies = parseShowsResponse(data);
    await saveShows(movies);

    return NextResponse.json({ ok: true, count: movies.length });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
