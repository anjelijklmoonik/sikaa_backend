-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_studentProfilId_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "studentProfilId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_studentProfilId_fkey" FOREIGN KEY ("studentProfilId") REFERENCES "StudentProfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;
