/*
  Warnings:

  - Added the required column `studentProfilId` to the `Nilai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nilai" ADD COLUMN     "studentProfilId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
