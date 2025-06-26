import { NextResponse } from 'next/server';
import { parseShowsResponse } from '../../../lib/tmdb/shows';
import { saveShows } from '../../../lib/db/shows';

export async function GET() {

  const url =
    process.env.NEXT_PUBLIC_TMDB_TRENDING_DAILY_SHOWS_URL ||
    'https://api.themoviedb.org/3/trending/tv/day';
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

    const shows = parseShowsResponse(data);
    await saveShows(shows);

    return NextResponse.json({ ok: true});
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}