import { prisma } from './prisma';
import { Show } from '../../types/show';
import { ShowGenre } from '../../types/showGenre';

export async function saveShows(shows: Show[]) {
  try {
    for (const show of shows) {

      if (!show.tmdb_id || !show.name) continue;

      const genresToConnect = show.genre_ids?.map(tmdb_id => ({ tmdb_id })) || [];

      await prisma.show.upsert({
        where: { tmdb_id: show.tmdb_id },
        update: {
          poster_path: show.poster_path,
          vote_average: show.vote_average,
          overview: show.overview,
          release_date: show.release_date,
          genres: {
            set: [],
            connect: genresToConnect,
          },
        },
        create: {
          tmdb_id: show.tmdb_id,
          name: show.name,
          poster_path: show.poster_path,
          release_date: show.release_date,
          vote_average: show.vote_average,
          overview: show.overview,
          genres: {
            connect: genresToConnect,
          },
        },
      });
    }
  } catch (error) {
    console.error('Error in saveShows:', error);
    throw error;
  }
}

export async function saveGenres(genres: ShowGenre[]) {
  try {
    for (const genre of genres) {
      await prisma.showGenre.upsert({
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