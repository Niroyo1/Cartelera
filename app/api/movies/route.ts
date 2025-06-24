import { prisma } from '../../../lib/db/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const year = url.searchParams.get('year');
  const genre = url.searchParams.get('genre');
  const order = url.searchParams.get('order') || 'date';
  const pageParam = url.searchParams.get('page');
  const page = pageParam ? parseInt(pageParam) : 1;

  const genreId = genre ? Number(genre) : undefined;
  const PAGE_SIZE = 80;

  const where: any = {};

  if (year) {
    const y = parseInt(year);
    const isDecade = y % 10 === 0;
    const from = isDecade ? y : y;
    const to = isDecade ? y + 9 : y;

    where.release_date = {
      gte: `${from}-01-01`,
      lte: `${to}-12-31`,
    };
  }

  if (genreId) {
    where.genres = {
      some: { id: genreId },
    };
  }

  const movies = await prisma.movie.findMany({
    where,
    orderBy: order === 'top'
      ? { vote_average: 'desc' }
      : { release_date: 'desc' },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: { genres: true },
  });

  return new Response(JSON.stringify(movies), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
