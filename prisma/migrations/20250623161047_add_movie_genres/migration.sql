/*
  Warnings:

  - You are about to drop the column `backdrop_path` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "backdrop_path",
ADD COLUMN     "trending" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "MovieGenre" (
    "id" SERIAL NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieGenresOnMovies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieGenresOnMovies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieGenre_tmdb_id_key" ON "MovieGenre"("tmdb_id");

-- CreateIndex
CREATE INDEX "_MovieGenresOnMovies_B_index" ON "_MovieGenresOnMovies"("B");

-- AddForeignKey
ALTER TABLE "_MovieGenresOnMovies" ADD CONSTRAINT "_MovieGenresOnMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieGenresOnMovies" ADD CONSTRAINT "_MovieGenresOnMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
