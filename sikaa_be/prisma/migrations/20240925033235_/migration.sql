/*
  Warnings:

  - You are about to drop the column `name` on the `StudentProfil` table. All the data in the column will be lost.
  - You are about to drop the `absensi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mapelJurusan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mapelUmum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nilai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pencapaian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaksi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deskripsi` to the `Keuangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `StudentProfil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keuangan" ADD COLUMN     "deskripsi" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfil" DROP COLUMN "name",
ADD COLUMN     "nama" TEXT NOT NULL;

-- DropTable
DROP TABLE "absensi";

-- DropTable
DROP TABLE "mapelJurusan";

-- DropTable
DROP TABLE "mapelUmum";

-- DropTable
DROP TABLE "nilai";

-- DropTable
DROP TABLE "pencapaian";

-- DropTable
DROP TABLE "transaksi";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Absensi" (
    "id" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "stedentProfilId" INTEGER NOT NULL,
    "studentProfilId" INTEGER,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nilai" (
    "id" SERIAL NOT NULL,
    "skor" INTEGER NOT NULL,
    "pelajaran" TEXT NOT NULL,
    "studentProfilId" INTEGER NOT NULL,

    CONSTRAINT "Nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pencapaian" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "studentProfilId" INTEGER NOT NULL,

    CONSTRAINT "Pencapaian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapelUmum" (
    "id" SERIAL NOT NULL,
    "namaMapel" TEXT NOT NULL,
    "studentProfilId" INTEGER,

    CONSTRAINT "MapelUmum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapelJurusan" (
    "id" SERIAL NOT NULL,
    "namaMapel" TEXT NOT NULL,
    "studentProfilId" INTEGER,

    CONSTRAINT "MapelJurusan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "studentProfilId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Keuangan" ADD CONSTRAINT "Keuangan_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pencapaian" ADD CONSTRAINT "Pencapaian_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapelUmum" ADD CONSTRAINT "MapelUmum_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapelJurusan" ADD CONSTRAINT "MapelJurusan_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
