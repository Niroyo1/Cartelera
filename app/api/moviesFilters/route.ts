import { prisma } from '../../../lib/db/prisma';

export async function GET() {
  try {
    // Obtener años únicos ordenados descendente
    const yearsRaw = await prisma.movie.findMany({
      select: {
        release_date: true,
      },
      orderBy: {
        release_date: 'desc',
      },
    });

    const yearsSet = new Set<number>();
    yearsRaw.forEach(({ release_date }) => {
      if (release_date) {
        yearsSet.add(new Date(release_date).getFullYear());
      }
    });
    const years = Array.from(yearsSet).sort((a, b) => b - a);

    // Obtener géneros ordenados alfabéticamente
    const genres = await prisma.movieGenre.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return new Response(JSON.stringify({ years, genres }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching filters:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}