/*
  Warnings:

  - You are about to drop the column `pelajaran` on the `Nilai` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nilai" DROP COLUMN "pelajaran",
ADD COLUMN     "mapelId" INTEGER;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_mapelId_fkey" FOREIGN KEY ("mapelId") REFERENCES "Mapel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
