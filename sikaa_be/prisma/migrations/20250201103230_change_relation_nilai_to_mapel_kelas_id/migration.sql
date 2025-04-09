/*
  Warnings:

  - You are about to drop the column `mapelId` on the `Nilai` table. All the data in the column will be lost.
  - Added the required column `mapelKelasId` to the `Nilai` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Nilai" DROP CONSTRAINT "Nilai_mapelId_fkey";

-- AlterTable
ALTER TABLE "Nilai" DROP COLUMN "mapelId",
ADD COLUMN     "mapelKelasId" INTEGER NOT NULL,
ADD COLUMN     "mapelKelasKelasId" INTEGER,
ADD COLUMN     "mapelKelasMapelId" INTEGER;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_mapelKelasMapelId_mapelKelasKelasId_fkey" FOREIGN KEY ("mapelKelasMapelId", "mapelKelasKelasId") REFERENCES "MapelKelas"("mapelId", "kelasId") ON DELETE SET NULL ON UPDATE CASCADE;
