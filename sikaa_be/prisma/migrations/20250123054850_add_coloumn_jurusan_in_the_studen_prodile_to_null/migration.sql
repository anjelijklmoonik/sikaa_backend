-- DropForeignKey
ALTER TABLE "StudentProfil" DROP CONSTRAINT "StudentProfil_jurusanId_fkey";

-- AlterTable
ALTER TABLE "StudentProfil" ALTER COLUMN "jurusanId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentProfil" ADD CONSTRAINT "StudentProfil_jurusanId_fkey" FOREIGN KEY ("jurusanId") REFERENCES "Jurusan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
