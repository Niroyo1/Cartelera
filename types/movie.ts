export type Movie = {
  id: number;
  tmdb_id: number,
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  trending?: boolean;
  overview: string;
  genre_ids?: number[];
};