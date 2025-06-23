import { prisma } from '../../../lib/db/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const year = url.searchParams.get('year');
  const genre = url.searchParams.get('genre');
  const genreId = genre ? Number(genre) : undefined;
  const top = url.searchParams.get('top');

  const where: any = {};

  if (year) {
    where.release_date = {
      gte: `${year}-01-01`,
      lte: `${year}-12-31`,
    };
  }

  if (genreId) {
    where.genres = {
      some: { id: genreId },
    };
  }

  const movies = await prisma.movie.findMany({
    where,
    orderBy: top === '1'
      ? { vote_average: 'desc' }
      : { release_date: 'desc' },
    take: top === '1' ? 100 : undefined,
    include: { genres: true },
  });

  return new Response(JSON.stringify(movies), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}