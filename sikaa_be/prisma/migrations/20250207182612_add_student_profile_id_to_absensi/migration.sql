/*
  Warnings:

  - Added the required column `studentId` to the `Absensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Absensi" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
