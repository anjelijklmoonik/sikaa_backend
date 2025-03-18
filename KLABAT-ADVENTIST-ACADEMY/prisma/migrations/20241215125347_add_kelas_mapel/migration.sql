/*
  Warnings:

  - You are about to drop the column `mapelId` on the `Kelas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Kelas" DROP CONSTRAINT "Kelas_mapelId_fkey";

-- AlterTable
ALTER TABLE "Kelas" DROP COLUMN "mapelId";

-- CreateTable
CREATE TABLE "MapelKelas" (
    "mapelId" INTEGER NOT NULL,
    "kelasId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MapelKelas_mapelId_kelasId_key" ON "MapelKelas"("mapelId", "kelasId");

-- AddForeignKey
ALTER TABLE "MapelKelas" ADD CONSTRAINT "MapelKelas_mapelId_fkey" FOREIGN KEY ("mapelId") REFERENCES "Mapel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapelKelas" ADD CONSTRAINT "MapelKelas_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
