/*
  Warnings:

  - A unique constraint covering the columns `[studentProfilId]` on the table `Pencapaian` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[absensiId]` on the table `StudentProfil` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nilaiId]` on the table `StudentProfil` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pencapaianId]` on the table `StudentProfil` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_studentProfilId_fkey";

-- DropForeignKey
ALTER TABLE "Nilai" DROP CONSTRAINT "Nilai_studentProfilId_fkey";

-- AlterTable
ALTER TABLE "Nilai" ALTER COLUMN "skor" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "StudentProfil" ADD COLUMN     "absensiId" INTEGER,
ADD COLUMN     "nilaiId" INTEGER,
ADD COLUMN     "pencapaianId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Pencapaian_studentProfilId_key" ON "Pencapaian"("studentProfilId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfil_absensiId_key" ON "StudentProfil"("absensiId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfil_nilaiId_key" ON "StudentProfil"("nilaiId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfil_pencapaianId_key" ON "StudentProfil"("pencapaianId");

-- AddForeignKey
ALTER TABLE "StudentProfil" ADD CONSTRAINT "StudentProfil_absensiId_fkey" FOREIGN KEY ("absensiId") REFERENCES "Absensi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfil" ADD CONSTRAINT "StudentProfil_nilaiId_fkey" FOREIGN KEY ("nilaiId") REFERENCES "Nilai"("id") ON DELETE SET NULL ON UPDATE CASCADE;
