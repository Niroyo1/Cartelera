import { prisma } from '../../../lib/db/prisma';

export async function GET() {
  try {
    // Obtener años únicos ordenados descendente
    const currentYear = new Date().getFullYear();

    const yearsRaw = await prisma.movie.findMany({
      select: {
        release_date: true,
      },
      orderBy: {
        release_date: 'desc',
      },
    });

    const allYearsSet = new Set<number>();
    yearsRaw.forEach(({ release_date }) => {
      if (release_date) {
        allYearsSet.add(new Date(release_date).getFullYear());
      }
    });
    const allYears = Array.from(allYearsSet).sort((a, b) => b - a);

    // Detectar si hay películas este año
    const hasCurrentYear = allYears.includes(currentYear);

    // Agregar año actual si aplica, luego décadas únicas
    const years: number[] = [];

    if (hasCurrentYear) {
      years.push(currentYear);
    }

    const decadesSet = new Set<number>();
    allYears.forEach((y) => {
      const decade = Math.floor(y / 10) * 10;
      if (!years.includes(decade)) {
        decadesSet.add(decade);
      }
    });

    years.push(...Array.from(decadesSet).sort((a, b) => b - a));

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