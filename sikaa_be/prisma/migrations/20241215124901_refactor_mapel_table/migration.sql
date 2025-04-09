/*
  Warnings:

  - You are about to drop the column `mapelJurusanId` on the `Mapel` table. All the data in the column will be lost.
  - You are about to drop the column `mapelUmumId` on the `Mapel` table. All the data in the column will be lost.
  - You are about to drop the `MapelJurusan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MapelUmum` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `namaMapel` to the `Mapel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mapel" DROP CONSTRAINT "Mapel_mapelJurusanId_fkey";

-- DropForeignKey
ALTER TABLE "Mapel" DROP CONSTRAINT "Mapel_mapelUmumId_fkey";

-- DropForeignKey
ALTER TABLE "MapelJurusan" DROP CONSTRAINT "MapelJurusan_jurusanId_fkey";

-- AlterTable
ALTER TABLE "Mapel" DROP COLUMN "mapelJurusanId",
DROP COLUMN "mapelUmumId",
ADD COLUMN     "jurusanId" INTEGER,
ADD COLUMN     "namaMapel" TEXT NOT NULL;

-- DropTable
DROP TABLE "MapelJurusan";

-- DropTable
DROP TABLE "MapelUmum";

-- AddForeignKey
ALTER TABLE "Mapel" ADD CONSTRAINT "Mapel_jurusanId_fkey" FOREIGN KEY ("jurusanId") REFERENCES "Jurusan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
