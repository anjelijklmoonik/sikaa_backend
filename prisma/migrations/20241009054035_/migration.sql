-- DropForeignKey
ALTER TABLE "Pencapaian" DROP CONSTRAINT "Pencapaian_studentProfilId_fkey";

-- DropIndex
DROP INDEX "Pencapaian_studentProfilId_key";

-- AddForeignKey
ALTER TABLE "StudentProfil" ADD CONSTRAINT "StudentProfil_pencapaianId_fkey" FOREIGN KEY ("pencapaianId") REFERENCES "Pencapaian"("id") ON DELETE SET NULL ON UPDATE CASCADE;
