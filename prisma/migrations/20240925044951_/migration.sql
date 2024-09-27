/*
  Warnings:

  - Made the column `studentProfilId` on table `MapelJurusan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentProfilId` on table `MapelUmum` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN', 'ORANGTUA');

-- DropForeignKey
ALTER TABLE "MapelJurusan" DROP CONSTRAINT "MapelJurusan_studentProfilId_fkey";

-- DropForeignKey
ALTER TABLE "MapelUmum" DROP CONSTRAINT "MapelUmum_studentProfilId_fkey";

-- AlterTable
ALTER TABLE "MapelJurusan" ALTER COLUMN "studentProfilId" SET NOT NULL;

-- AlterTable
ALTER TABLE "MapelUmum" ALTER COLUMN "studentProfilId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role";

-- AddForeignKey
ALTER TABLE "MapelUmum" ADD CONSTRAINT "MapelUmum_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapelJurusan" ADD CONSTRAINT "MapelJurusan_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
