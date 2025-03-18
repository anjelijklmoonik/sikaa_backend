/*
  Warnings:

  - You are about to drop the column `studentId` on the `Absensi` table. All the data in the column will be lost.
  - Added the required column `mapelKelasId` to the `Absensi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_studentId_fkey";

-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "studentId",
ADD COLUMN     "mapelKelasId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_mapelKelasId_fkey" FOREIGN KEY ("mapelKelasId") REFERENCES "MapelKelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
