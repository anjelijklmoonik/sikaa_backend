-- DropForeignKey
ALTER TABLE "StudentProfil" DROP CONSTRAINT "StudentProfil_pencapaianId_fkey";

-- AddForeignKey
ALTER TABLE "Pencapaian" ADD CONSTRAINT "Pencapaian_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
