/*
  Warnings:

  - You are about to drop the `Keuangang` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Keuangang";

-- CreateTable
CREATE TABLE "Keuangan" (
    "id" SERIAL NOT NULL,
    "lastBalace" INTEGER NOT NULL,
    "lastTransaction" INTEGER NOT NULL,
    "lastTranasadate" TIMESTAMP(3) NOT NULL,
    "studentProfilId" INTEGER NOT NULL,

    CONSTRAINT "Keuangan_pkey" PRIMARY KEY ("id")
);
