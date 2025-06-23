/*
  Warnings:

  - You are about to drop the column `trending` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "trending",
ADD COLUMN     "backdrop_path" TEXT,
ADD COLUMN     "overview" TEXT,
ALTER COLUMN "poster_path" DROP NOT NULL,
ALTER COLUMN "release_date" DROP NOT NULL,
ALTER COLUMN "vote_average" DROP NOT NULL;
