/*
  Warnings:

  - You are about to drop the column `studentId` on the `Nilai` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Nilai" DROP CONSTRAINT "Nilai_studentId_fkey";

-- AlterTable
ALTER TABLE "Nilai" DROP COLUMN "studentId";
