import { prisma } from './prisma';
import { Movie } from '../../types/movie';
import { MovieGenre } from '../../types/movieGenre';

export async function saveMovies(movies: Movie[]) {
  try {
    for (const movie of movies) {
      // Preparar array de conexiones a géneros si existen genre_ids
      const genresToConnect = movie.genre_ids?.map(tmdb_id => ({ tmdb_id })) || [];

      await prisma.movie.upsert({
        where: { tmdb_id: movie.tmdb_id },
        update: {
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          overview: movie.overview,
          release_date: movie.release_date,
          title: movie.title,
          trending: movie.trending ?? false,
          genres: {
            set: [],
            connect: genresToConnect,
          },
        },
        create: {
          tmdb_id: movie.tmdb_id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          overview: movie.overview,
          trending: movie.trending ?? false,
          genres: {
            connect: genresToConnect,
          },
        },
      });
    }
  } catch (error) {
    console.error('Error in saveMovies:', error);
    throw error;
  }
}

export async function saveGenres(genres: MovieGenre[]) {
  try {
    for (const genre of genres) {
      await prisma.movieGenre.upsert({
        where: { tmdb_id: genre.tmdb_id },
        update: {
          name: genre.name,
        },
        create: {
          tmdb_id: genre.tmdb_id,
          name: genre.name,
        },
      });
    }
  } catch (error) {
    console.error('Error in saveGenres:', error);
    throw error;
  }
}