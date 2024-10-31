/*
  Warnings:

  - You are about to drop the column `studentProfilId` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `studentProfilId` on the `MapelJurusan` table. All the data in the column will be lost.
  - You are about to drop the column `studentProfilId` on the `MapelUmum` table. All the data in the column will be lost.
  - You are about to drop the column `studentProfilId` on the `Nilai` table. All the data in the column will be lost.
  - You are about to drop the column `absensiId` on the `StudentProfil` table. All the data in the column will be lost.
  - You are about to drop the column `jurusan` on the `StudentProfil` table. All the data in the column will be lost.
  - You are about to drop the column `nilaiId` on the `StudentProfil` table. All the data in the column will be lost.
  - You are about to drop the column `pencapaianId` on the `StudentProfil` table. All the data in the column will be lost.
  - Added the required column `memberKelasId` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jurusanId` to the `MapelJurusan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberKelasId` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jurusanId` to the `StudentProfil` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SemesterType" AS ENUM ('GANJIL', 'GENAP');

-- CreateEnum
CREATE TYPE "MapelType" AS ENUM ('UMUM', 'JURUSAN');

-- DropForeignKey
ALTER TABLE "MapelJurusan" DROP CONSTRAINT "MapelJurusan_studentProfilId_fkey";

-- DropForeignKey
ALTER TABLE "MapelUmum" DROP CONSTRAINT "MapelUmum_studentProfilId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfil" DROP CONSTRAINT "StudentProfil_absensiId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfil" DROP CONSTRAINT "StudentProfil_nilaiId_fkey";

-- DropIndex
DROP INDEX "StudentProfil_absensiId_key";

-- DropIndex
DROP INDEX "StudentProfil_nilaiId_key";

-- DropIndex
DROP INDEX "StudentProfil_pencapaianId_key";

-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "studentProfilId",
ADD COLUMN     "memberKelasId" INTEGER NOT NULL,
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MapelJurusan" DROP COLUMN "studentProfilId",
ADD COLUMN     "jurusanId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MapelUmum" DROP COLUMN "studentProfilId";

-- AlterTable
ALTER TABLE "Nilai" DROP COLUMN "studentProfilId",
ADD COLUMN     "memberKelasId" INTEGER NOT NULL,
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfil" DROP COLUMN "absensiId",
DROP COLUMN "jurusan",
DROP COLUMN "nilaiId",
DROP COLUMN "pencapaianId",
ADD COLUMN     "jurusanId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Jurusan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,

    CONSTRAINT "Jurusan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelas" (
    "id" SERIAL NOT NULL,
    "noKelas" TEXT NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "semester" "SemesterType" NOT NULL,
    "jurusanId" INTEGER NOT NULL,
    "mapelId" INTEGER NOT NULL,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberKelas" (
    "id" SERIAL NOT NULL,
    "kelasId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "MemberKelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mapel" (
    "id" SERIAL NOT NULL,
    "type" "MapelType" NOT NULL,
    "mapelUmumId" INTEGER,
    "mapelJurusanId" INTEGER,

    CONSTRAINT "Mapel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_noKelas_academicYearId_semester_jurusanId_key" ON "Kelas"("noKelas", "academicYearId", "semester", "jurusanId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberKelas_kelasId_studentId_key" ON "MemberKelas"("kelasId", "studentId");

-- AddForeignKey
ALTER TABLE "StudentProfil" ADD CONSTRAINT "StudentProfil_jurusanId_fkey" FOREIGN KEY ("jurusanId") REFERENCES "Jurusan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_jurusanId_fkey" FOREIGN KEY ("jurusanId") REFERENCES "Jurusan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_mapelId_fkey" FOREIGN KEY ("mapelId") REFERENCES "Mapel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberKelas" ADD CONSTRAINT "MemberKelas_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberKelas" ADD CONSTRAINT "MemberKelas_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_memberKelasId_fkey" FOREIGN KEY ("memberKelasId") REFERENCES "MemberKelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_memberKelasId_fkey" FOREIGN KEY ("memberKelasId") REFERENCES "MemberKelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapel" ADD CONSTRAINT "Mapel_mapelUmumId_fkey" FOREIGN KEY ("mapelUmumId") REFERENCES "MapelUmum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapel" ADD CONSTRAINT "Mapel_mapelJurusanId_fkey" FOREIGN KEY ("mapelJurusanId") REFERENCES "MapelJurusan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapelJurusan" ADD CONSTRAINT "MapelJurusan_jurusanId_fkey" FOREIGN KEY ("jurusanId") REFERENCES "Jurusan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
