import { prisma } from '../../../lib/db/prisma';
import { FaStar } from "react-icons/fa";

interface ShowPageProps {
  params: { id: string };
}

export default async function ShowPage({ params }: ShowPageProps) {
  const id = params.id;
  if (!id) {
    return (
      <div className="text-white p-8">
        <h2>Not found.</h2>
      </div>
    );
  }

  const show = await prisma.show.findUnique({
    where: { id: Number(id) },
    include: {
      genres: true,
    },
  });

  if (!show) {
    return (
      <div className="text-white p-8">
        <h2>Not found.</h2>
      </div>
    );
  }

  return (
    <div className='p-8 bg-gradient-to-b from-Night to-black'>
      <div className="relative mt-10 mx-40 flex flex-col md:flex-row items-start gap-20">
        <img
          className="block w-84 aspect-[2/3] rounded-lg object-cover fade-top-bottom"
          src={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '/no-image.png'}
          alt={show.name}
        />
        <div>
          <h1 className="text-9xl font-extrabold textDegraded drop-shadow-lg">{show.name}</h1>

          {show.genres.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
              {show.genres.map((genre) => (
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
                {show.vote_average !== 0 ? show.vote_average?.toFixed(1) : "-"}
              </span>
            </p>
            {show.overview && (
              <p className="text-WhiteSmoke italic text-xl pl-4">{show.overview}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
