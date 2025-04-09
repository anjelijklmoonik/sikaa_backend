-- CreateTable
CREATE TABLE "AcademicYear" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "AcademicYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfil" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "noIndukSiswa" TEXT NOT NULL,
    "sekolah" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "ttl" TIMESTAMP(3) NOT NULL,
    "noTelp" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "StudentProfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keuangang" (
    "id" SERIAL NOT NULL,
    "lastBalace" INTEGER NOT NULL,
    "lastTransaction" INTEGER NOT NULL,
    "lastTranasadate" TIMESTAMP(3) NOT NULL,
    "studentProfilId" INTEGER NOT NULL,

    CONSTRAINT "Keuangang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id" SERIAL NOT NULL,
    "kuanganId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "lastBalance" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,
    "transacdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "absensi" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "stedentProfilId" INTEGER NOT NULL,

    CONSTRAINT "absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nilai" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "pelajaran" TEXT NOT NULL,
    "studentProfilId" INTEGER NOT NULL,

    CONSTRAINT "nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pencapaian" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "studentProfilId" INTEGER NOT NULL,

    CONSTRAINT "pencapaian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfil_noIndukSiswa_key" ON "StudentProfil"("noIndukSiswa");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfil_email_key" ON "StudentProfil"("email");
