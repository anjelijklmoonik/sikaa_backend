/*
  Warnings:

  - The primary key for the `AcademicYear` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `AcademicYear` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `academicYearId` column on the `StudentProfil` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `academicYearId` on the `Kelas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Kelas" DROP CONSTRAINT "Kelas_academicYearId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfil" DROP CONSTRAINT "StudentProfil_academicYearId_fkey";

-- AlterTable
ALTER TABLE "AcademicYear" DROP CONSTRAINT "AcademicYear_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AcademicYear_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Kelas" DROP COLUMN "academicYearId",
ADD COLUMN     "academicYearId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfil" DROP COLUMN "academicYearId",
ADD COLUMN     "academicYearId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_noKelas_academicYearId_semester_jurusanId_key" ON "Kelas"("noKelas", "academicYearId", "semester", "jurusanId");

-- AddForeignKey
ALTER TABLE "StudentProfil" ADD CONSTRAINT "StudentProfil_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
