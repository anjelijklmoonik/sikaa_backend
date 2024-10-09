-- DropForeignKey
ALTER TABLE "StudentProfil" DROP CONSTRAINT "StudentProfil_academicYearId_fkey";

-- AlterTable
ALTER TABLE "StudentProfil" ALTER COLUMN "academicYearId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentProfil" ADD CONSTRAINT "StudentProfil_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;
