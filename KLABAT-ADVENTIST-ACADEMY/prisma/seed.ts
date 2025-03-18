import { Keuangan } from "./../node_modules/.prisma/client/index.d";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const jurusan = await prisma.jurusan.createMany({
    data: [
      {
        nama: "Tidak Ada",
      },
      {
        nama: "Keperawatan",
      },
      {
        nama: "Bisnis Ekonomi",
      },
    ],
  });

  const academicYear = await prisma.academicYear.createMany({
    data: [
      {
        year: 2021,
      },
      {
        year: 2022,
      },
      {
        year: 2023,
      },
      {
        year: 2024,
      },
      {
        year: 2025,
      },
    ],
  });

  await prisma.mapel.createMany({
    data: [
      { namaMapel: "Bahasa Indonesia", type: "UMUM" },
      { namaMapel: "Bahasa Inggris", type: "UMUM" },
      { namaMapel: "Matematika", type: "UMUM" },
      { namaMapel: "Biologi", type: "JURUSAN", jurusanId: 2 },
      { namaMapel: "Kimia", type: "JURUSAN", jurusanId: 2 },
      { namaMapel: "Fisika", type: "JURUSAN", jurusanId: 2 },
    ],
  });

  const user1 = await prisma.users.create({
    data: {
      username: "anjeli",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("anjeli123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      role: "ADMIN",
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Perempuan",
          nama: "Anjeli",
          kelas: "X",
          noIndukSiswa: "1374823748",
          sekolah: "SMA",
          ttl: "Manado, 2002-12-09",
          jurusanId: 1,
        },
      },
    },
  });

  const user2 = await prisma.users.create({
    data: {
      username: "budi",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("budi123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      role: "STUDENT",
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Laki-laki",
          nama: "Budi",
          kelas: "XI",
          noIndukSiswa: "1374823749",
          sekolah: "SMK",
          ttl: "Manado, 2001-12-09",
          jurusanId: 2,
        },
      },
    },
  });

  const kelas = await prisma.kelas.createManyAndReturn({
    data: [
      {
        noKelas: "X",
        jurusanId: 1,
        academicYearId: 3,
        semester: "GANJIL",
      },
      {
        noKelas: "X",
        jurusanId: 1,
        academicYearId: 3,
        semester: "GENAP",
      },
      {
        noKelas: "XI",
        jurusanId: 2,
        academicYearId: 4,
        semester: "GANJIL",
      },
      {
        noKelas: "XI",
        jurusanId: 2,
        academicYearId: 4,
        semester: "GENAP",
      },
      {
        noKelas: "XII",
        jurusanId: 3,
        academicYearId: 5,
        semester: "GANJIL",
      },
      {
        noKelas: "XII",
        jurusanId: 3,
        academicYearId: 5,
        semester: "GENAP",
      },
    ],
  });

  const memberKelas = await prisma.memberKelas.createManyAndReturn({
    data: [
      {
        kelasId: kelas[0].id,
        studentId: 1,
      },
      {
        kelasId: kelas[1].id,
        studentId: 2,
      },
    ],
  });

  const keuangan = await prisma.keuangan.createMany({
    data: [
      {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: 1,
      },
      {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: 2,
      },
    ],
  });

  // await prisma.nilai.createMany({
  //   data: [
  //     {
  //       memberKelasId: memberKelas[0].id,
  //       mapelId: 1,
  //       skor: 90,
  //     },
  //     {
  //       memberKelasId: memberKelas[0].id,
  //       mapelId: 1,
  //       skor: 95,
  //     },
  //     {
  //       memberKelasId: memberKelas[0].id,
  //       mapelId: 1,
  //       skor: 92,
  //     },
  //     {
  //       memberKelasId: memberKelas[1].id,
  //       mapelId: 1,
  //       skor: 96,
  //     },
  //     {
  //       memberKelasId: memberKelas[1].id,
  //       mapelId: 1,
  //       skor: 90,
  //     },
  //     {
  //       memberKelasId: memberKelas[1].id,
  //       mapelId: 1,
  //       skor: 89,
  //     },
  //   ],
  // });
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
