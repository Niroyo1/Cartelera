import { prisma } from '../../../lib/db/prisma';
import { FaStar } from "react-icons/fa";

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const id = params.id;
  if (!id) {
    return (
      <div className="text-white p-8">
        <h2>Not found.</h2>
      </div>
    );
  }

  const movie = await prisma.movie.findUnique({
    where: { id: Number(id) },
    include: {
      genres: true,
    },
  });

  if (!movie) {
    return (
      <div className="text-white p-8">
        <h2>Not found.</h2>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-b from-black via-black to-teal-950 min-h-screen'>
      <div className="h-50 w-full bg-black"/>
      <div className="relative -top-28 mx-34 flex flex-col md:flex-row items-start gap-20">
        <img
          className="block w-84 aspect-[2/3] rounded-lg object-cover fade-top-bottom"
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-image.png'}
          alt={movie.title}
        />
        <div>
          <h1 className="text-9xl font-extrabold text-teal-400 drop-shadow-lg">{movie.title}</h1>
          <p className="text-WhiteSmoke text-base mb-1">
            Release date: {movie.release_date}
          </p>

          {movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 my-4">
              {movie.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="bg-teal-400 rounded px-3 py-1 text-black font-semibold inline-block"
                >
                  {genre.name}
                </div>
              ))}
            </div>
          )}

          <div className="flex-1 my-6 flex flex-col items-start mr-80">
            <p className="font-bold flex items-center gap-2 px-2 mb-4 text-lg bg-Crimson rounded-lg">
              <FaStar className="text-Tan" />
              <span className="text-Tan font-bold">
                {movie.vote_average !== 0 ? movie.vote_average : "-"}
              </span>
            </p>
            {movie.overview && (
              <p className="text-WhiteSmoke text-xl px-4">{movie.overview}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
