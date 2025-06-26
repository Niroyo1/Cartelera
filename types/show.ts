export type Show = {
  id: number;
  tmdb_id: number,
  name: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  trending?: boolean;
  overview: string;
  genre_ids?: number[];
};