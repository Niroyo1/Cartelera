import { auth } from './auth';

export const getDayTrendingMovies = async () => {
  await auth();

  const url =
    process.env.TMDB_TRENDING_DAILY_MOVIES_URL ||
    'https://api.themoviedb.org/3/trending/movie/day';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.TMDB_API_KEY
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error fetching trending movies:', err);
      throw err;
    });
}