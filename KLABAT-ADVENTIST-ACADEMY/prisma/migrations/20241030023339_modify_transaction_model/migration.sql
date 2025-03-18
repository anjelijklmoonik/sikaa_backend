/*
  Warnings:

  - You are about to drop the column `deskripsi` on the `Keuangan` table. All the data in the column will be lost.
  - You are about to drop the column `noJurnal` on the `Keuangan` table. All the data in the column will be lost.
  - You are about to drop the column `referensi` on the `Keuangan` table. All the data in the column will be lost.
  - You are about to drop the column `studentProfilId` on the `Keuangan` table. All the data in the column will be lost.
  - You are about to drop the column `keuanganId` on the `StudentProfil` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `Keuangan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `Keuangan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEBIT', 'KREDIT');

-- DropForeignKey
ALTER TABLE "StudentProfil" DROP CONSTRAINT "StudentProfil_keuanganId_fkey";

-- DropIndex
DROP INDEX "StudentProfil_keuanganId_key";

-- AlterTable
ALTER TABLE "Keuangan" DROP COLUMN "deskripsi",
DROP COLUMN "noJurnal",
DROP COLUMN "referensi",
DROP COLUMN "studentProfilId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfil" DROP COLUMN "keuanganId";

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "referensi" TEXT NOT NULL,
    "noJurnal" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "lastBalance" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "transDate" TIMESTAMP(3) NOT NULL,
    "keuanganId" INTEGER NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Keuangan_studentId_key" ON "Keuangan"("studentId");

-- AddForeignKey
ALTER TABLE "Keuangan" ADD CONSTRAINT "Keuangan_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_keuanganId_fkey" FOREIGN KEY ("keuanganId") REFERENCES "Keuangan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
