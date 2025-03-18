/*
  Warnings:

  - You are about to drop the column `mapelKelasKelasId` on the `Nilai` table. All the data in the column will be lost.
  - You are about to drop the column `mapelKelasMapelId` on the `Nilai` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Nilai" DROP CONSTRAINT "Nilai_mapelKelasMapelId_mapelKelasKelasId_fkey";

-- AlterTable
ALTER TABLE "MapelKelas" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MapelKelas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Nilai" DROP COLUMN "mapelKelasKelasId",
DROP COLUMN "mapelKelasMapelId";

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_mapelKelasId_fkey" FOREIGN KEY ("mapelKelasId") REFERENCES "MapelKelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
