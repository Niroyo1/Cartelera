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
    <div className='bg-black min-h-screen mt-50 w-full'>
      <div className="relative -top-28 mx-34 flex flex-col md:flex-row items-start gap-20">
        <img
          className="block w-84 aspect-[2/3] rounded-lg object-cover fade-top-bottom"
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-image.png'}
          alt={movie.title}
        />
        <div>
          <h1 className="text-9xl font-extrabold textDegraded drop-shadow-lg">{movie.title}</h1>
          <p className="text-white text-base mb-1">
            Release date: {movie.release_date}
          </p>

          {movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
              {movie.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="p-[2px] bg-gradient-to-t from-Lavender to-NeonBlue rounded inline-block"
                >
                  <div className="bg-black rounded px-3 py-1 text-white font-semibold">
                    {genre.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex-1 my-6 flex flex-col items-start mr-80">
            <p className="font-bold flex items-center gap-2 px-2 mb-4 text-lg bg-Crimson rounded-lg">
              <FaStar className="text-Lavender" />
              <span className="text-Lavender font-bold">
                {movie.vote_average !== 0 ? movie.vote_average?.toFixed(1) : "-"}
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
