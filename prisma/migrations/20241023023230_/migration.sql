/*
  Warnings:

  - Made the column `jenisKelamin` on table `StudentProfil` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Keuangan" ALTER COLUMN "noJurnal" DROP DEFAULT,
ALTER COLUMN "referensi" DROP DEFAULT;

-- AlterTable
ALTER TABLE "StudentProfil" ALTER COLUMN "agama" DROP DEFAULT,
ALTER COLUMN "jenisKelamin" SET NOT NULL,
ALTER COLUMN "jenisKelamin" DROP DEFAULT;
