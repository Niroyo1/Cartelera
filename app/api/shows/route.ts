import { prisma } from '../../../lib/db/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const genre = url.searchParams.get('genre');
  const pageParam = url.searchParams.get('page');
  const page = pageParam ? parseInt(pageParam) : 1;

  const genreId = genre ? Number(genre) : undefined;
  const PAGE_SIZE = 80;

  const where: any = {};

  if (genreId) {
    where.genres = {
      some: { id: genreId },
    };
  }

  const shows = await prisma.show.findMany({
    where,
    orderBy: {
      vote_average: 'desc',
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: { genres: true },
  });

  return new Response(JSON.stringify(shows), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
