/*
  Warnings:

  - You are about to drop the column `lastBalace` on the `Keuangan` table. All the data in the column will be lost.
  - Added the required column `lastBalance` to the `Keuangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicYearId` to the `StudentProfil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keuangan" DROP COLUMN "lastBalace",
ADD COLUMN     "lastBalance" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfil" ADD COLUMN     "academicYearId" TEXT NOT NULL,
ADD COLUMN     "foto" TEXT,
ADD COLUMN     "namaAyah" TEXT,
ADD COLUMN     "namaIbu" TEXT,
ADD COLUMN     "namaWali" TEXT,
ADD COLUMN     "noTelpAyah" TEXT,
ADD COLUMN     "noTelpIbu" TEXT,
ADD COLUMN     "noTelpWali" TEXT,
ALTER COLUMN "noTelp" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentProfil" ADD CONSTRAINT "StudentProfil_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
