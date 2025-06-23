import { Movie } from '../../types/movie';
import { MovieGenre } from '../../types/movieGenre';

export function parseMoviesResponse(apiResponse: any): Movie[] {

  return (apiResponse.results || []).map((movie: any) => ({
    tmdb_id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    overview: movie.overview,
    backdrop_path: movie.backdrop_path,
    genre_ids: movie.genre_ids,
  }));
}

export function parseGenresResponse(apiResponse: any): MovieGenre[] {
  return (apiResponse.genres || []).map((genre: any) => ({
    tmdb_id: genre.id,
    name: genre.name,
  }));
}
