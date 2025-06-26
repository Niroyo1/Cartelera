import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.toLowerCase() ?? '';

  if (!query || query.length < 2) {
    return NextResponse.json([]); // mínimo 2 letras
  }

  const movies = await prisma.movie.findMany({
    where: {
      title: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: 5,
  });

  const shows = await prisma.show.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: 5,
  });

  const results = [
    ...movies.map((m) => ({
      id: m.id,
      title: m.title,
      type: 'movie',
    })),
    ...shows.map((s) => ({
      id: s.id,
      title: s.name,
      type: 'show',
    })),
  ];

  return NextResponse.json(results);
}
