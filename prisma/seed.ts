import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const jurusan = await prisma.jurusan.create({
    data: {
      nama: "IPA",
    },
  });

  const academicYear = await prisma.academicYear.create({
    data: {
      year: 2020,
    },
  });

  await prisma.mapel.createMany({
    data: [
      { namaMapel: "Bahasa Indonesia", type: "UMUM" },
      { namaMapel: "Bahasa Inggris", type: "UMUM" },
      { namaMapel: "Matematika", type: "UMUM" },
      { namaMapel: "Biologi", type: "JURUSAN", jurusanId: jurusan.id },
      { namaMapel: "Kimia", type: "JURUSAN", jurusanId: jurusan.id },
      { namaMapel: "Fisika", type: "JURUSAN", jurusanId: jurusan.id },
    ],
  });

  const user = await prisma.users.create({
    data: {
      username: "anjeli",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("anjeli123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      // password: "$2y$10$UZTZYqI9IkoLrBIGrPBvh.0buE3dOgMrpMtF.CbplZeGRVZgOk.tm", // anjeli123
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Perempuan",
          nama: "Anjeli",
          kelas: "X",
          noIndukSiswa: "1374823748",
          sekolah: "SMAN 1",
          ttl: "Manado, 2002-12-09",
          jurusanId: jurusan.id,
        },
      },
    },
  });

  const kelas = await prisma.kelas.createManyAndReturn({
    data: [
      {
        noKelas: "X",
        jurusanId: jurusan.id,
        academicYearId: academicYear.id,
        semester: "GANJIL",
      },
      {
        noKelas: "X",
        jurusanId: jurusan.id,
        academicYearId: academicYear.id,
        semester: "GENAP",
      },
    ],
  });

  const memberKelas = await prisma.memberKelas.createManyAndReturn({
    data: [
      {
        kelasId: kelas[0].id,
        studentId: user.id,
      },
      {
        kelasId: kelas[1].id,
        studentId: user.id,
      },
    ],
  });

  await prisma.nilai.createMany({
    data: [
      {
        memberKelasId: memberKelas[0].id,
        pelajaran: "Matematika",
        skor: 90,
      },
      {
        memberKelasId: memberKelas[0].id,
        pelajaran: "Bahasa Indonesia",
        skor: 95,
      },
      {
        memberKelasId: memberKelas[0].id,
        pelajaran: "Bahasa Inggris",
        skor: 92,
      },
      {
        memberKelasId: memberKelas[1].id,
        pelajaran: "Matematika",
        skor: 96,
      },
      {
        memberKelasId: memberKelas[1].id,
        pelajaran: "Bahasa Indonesia",
        skor: 90,
      },
      {
        memberKelasId: memberKelas[1].id,
        pelajaran: "Bahasa Inggris",
        skor: 89,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
