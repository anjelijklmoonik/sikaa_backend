/*
  Warnings:

  - You are about to drop the column `lastTranasadate` on the `Keuangan` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `absensi` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `nilai` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `transacdate` on the `transaksi` table. All the data in the column will be lost.
  - Added the required column `lastTransDate` to the `Keuangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skor` to the `nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deskripsi` to the `transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transDate` to the `transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keuangan" DROP COLUMN "lastTranasadate",
ADD COLUMN     "lastTransDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "absensi" DROP COLUMN "date",
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "nilai" DROP COLUMN "score",
ADD COLUMN     "skor" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "transaksi" DROP COLUMN "desc",
DROP COLUMN "transacdate",
ADD COLUMN     "deskripsi" TEXT NOT NULL,
ADD COLUMN     "transDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "mapelUmum" (
    "id" SERIAL NOT NULL,
    "namaMapel" TEXT NOT NULL,

    CONSTRAINT "mapelUmum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mapelJurusan" (
    "id" SERIAL NOT NULL,
    "namaMapel" TEXT NOT NULL,

    CONSTRAINT "mapelJurusan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "studentProfilId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
