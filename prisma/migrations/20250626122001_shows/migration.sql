/*
  Warnings:

  - You are about to drop the column `trending` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `trending` on the `Show` table. All the data in the column will be lost.
  - Added the required column `name` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "trending";

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "title",
DROP COLUMN "trending",
ADD COLUMN     "name" TEXT NOT NULL;
