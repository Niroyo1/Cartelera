import { Show } from '../../types/show';
import { ShowGenre } from '../../types/showGenre';

export function parseShowsResponse(apiResponse: any): Show[] {

  return (apiResponse.results || []).map((show: any) => ({
    tmdb_id: show.id,
    name: show.name,
    poster_path: show.poster_path,
    release_date: show.release_date,
    vote_average: show.vote_average,
    overview: show.overview,
    genre_ids: show.genre_ids,
  }));
}

export function parseGenresResponse(apiResponse: any): ShowGenre[] {
  return (apiResponse.genres || []).map((genre: any) => ({
    tmdb_id: genre.id,
    name: genre.name,
  }));
}
