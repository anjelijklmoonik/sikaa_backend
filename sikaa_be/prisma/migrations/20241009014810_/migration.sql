/*
  Warnings:

  - A unique constraint covering the columns `[keuanganId]` on the table `StudentProfil` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Keuangan" DROP CONSTRAINT "Keuangan_studentProfilId_fkey";

-- AlterTable
ALTER TABLE "StudentProfil" ADD COLUMN     "keuanganId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfil_keuanganId_key" ON "StudentProfil"("keuanganId");

-- AddForeignKey
ALTER TABLE "StudentProfil" ADD CONSTRAINT "StudentProfil_keuanganId_fkey" FOREIGN KEY ("keuanganId") REFERENCES "Keuangan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
