/*
  Warnings:

  - You are about to drop the `_MovieGenresOnMovies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MovieGenresOnMovies" DROP CONSTRAINT "_MovieGenresOnMovies_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieGenresOnMovies" DROP CONSTRAINT "_MovieGenresOnMovies_B_fkey";

-- DropTable
DROP TABLE "_MovieGenresOnMovies";

-- CreateTable
CREATE TABLE "Show" (
    "id" SERIAL NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "poster_path" TEXT,
    "release_date" TEXT,
    "overview" TEXT,
    "vote_average" DOUBLE PRECISION,
    "trending" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowGenre" (
    "id" SERIAL NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ShowGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieGenres_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ShowGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ShowGenres_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Show_tmdb_id_key" ON "Show"("tmdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "ShowGenre_tmdb_id_key" ON "ShowGenre"("tmdb_id");

-- CreateIndex
CREATE INDEX "_MovieGenres_B_index" ON "_MovieGenres"("B");

-- CreateIndex
CREATE INDEX "_ShowGenres_B_index" ON "_ShowGenres"("B");

-- AddForeignKey
ALTER TABLE "_MovieGenres" ADD CONSTRAINT "_MovieGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieGenres" ADD CONSTRAINT "_MovieGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowGenres" ADD CONSTRAINT "_ShowGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowGenres" ADD CONSTRAINT "_ShowGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "ShowGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
