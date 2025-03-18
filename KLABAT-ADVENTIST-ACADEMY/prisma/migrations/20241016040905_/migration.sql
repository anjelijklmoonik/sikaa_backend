/*
  Warnings:

  - You are about to drop the column `lastBalance` on the `Keuangan` table. All the data in the column will be lost.
  - You are about to drop the column `lastTransaction` on the `Keuangan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Keuangan" DROP COLUMN "lastBalance",
DROP COLUMN "lastTransaction",
ADD COLUMN     "debit" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "kredit" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "noJurnal" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "referensi" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;
