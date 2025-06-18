
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

const movies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    release_date: "1994-09-23",
    vote_average: 8.7,
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    release_date: "1972-03-14",
    vote_average: 8.7,
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_date: "2008-07-16",
    vote_average: 8.5,
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    release_date: "1994-09-10",
    vote_average: 8.5,
  },
];

export default function TopMoviesPage() {
  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Top Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg flex flex-col items-center"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/no-image.png'
              }
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4 w-full flex flex-col items-center">
              <h2 className="text-lg font-semibold text-white text-center">{movie.title}</h2>
              <p className="text-zinc-400 text-sm mt-2">
                Estreno: {movie.release_date}
              </p>
              <p className="text-yellow-400 font-bold mt-1">
                ⭐ {movie.vote_average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}