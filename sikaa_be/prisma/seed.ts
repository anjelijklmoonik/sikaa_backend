import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const jurusan = await prisma.jurusan.createMany({
    data: [
      {
        nama: "SMA",
      },
      {
        nama: "Layanan Kesehatan",
      },
      {
        nama: "Akuntasi Keuangan Lembaga",
      },
    ],
  });

  const academicYear = await prisma.academicYear.createMany({
    data: [
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
      { namaMapel: "DKL 1 - PB", type: "JURUSAN", jurusanId: 2 },
      { namaMapel: "KKAKC 1 - IPU", type: "JURUSAN", jurusanId: 2 },
      { namaMapel: "KKAKC 3 - KDTK", type: "JURUSAN", jurusanId: 2 },
      { namaMapel: "DDAKL V1 -PB", type: "JURUSAN", jurusanId: 3 },
      { namaMapel: "KKBA 1 - EB", type: "JURUSAN", jurusanId: 3 },
      { namaMapel: "KKBA 1 - EB", type: "JURUSAN", jurusanId: 3 },
      { namaMapel: "KKBA 2 - APJDM", type: "JURUSAN", jurusanId: 3 },
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
      username: "Yosep",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("Yosep123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      role: "STUDENT",
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Laki-laki",
          nama: "Yosep",
          kelas: "X",
          noIndukSiswa: "1374823749",
          sekolah: "SMK",
          ttl: "Manado, 2001-12-09",
          jurusanId: 1,
        },
      },
    },
  });

  const user3 = await prisma.users.create({
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
          noIndukSiswa: "1374823750",
          sekolah: "SMK",
          ttl: "Manado, 2001-12-09",
          jurusanId: 1,
        },
      },
    },
  });

  const user4 = await prisma.users.create({
    data: {
      username: "Yanto",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("Yanto123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      role: "STUDENT",
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Laki-laki",
          nama: "Yanto",
          kelas: "XII",
          noIndukSiswa: "1374823751",
          sekolah: "SMK",
          ttl: "Manado, 2001-12-09",
          jurusanId: 1,
        },
      },
    },
  });

  const user5 = await prisma.users.create({
    data: {
      username: "Masbro",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("Masbro123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      role: "STUDENT",
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Laki-laki",
          nama: "Masbro",
          kelas: "X",
          noIndukSiswa: "1374823752",
          sekolah: "SMK",
          ttl: "Manado, 2001-12-09",
          jurusanId: 2,
        },
      },
    },
  });

  const user6 = await prisma.users.create({
    data: {
      username: "Nando",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("Nando123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      role: "STUDENT",
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Laki-laki",
          nama: "Nando",
          kelas: "XI",
          noIndukSiswa: "1374823753",
          sekolah: "SMK",
          ttl: "Manado, 2001-12-09",
          jurusanId: 2,
        },
      },
    },
  });

  const user7 = await prisma.users.create({
    data: {
      username: "Nanang",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("Nanang123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      role: "STUDENT",
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Laki-laki",
          nama: "Nanang",
          kelas: "XII",
          noIndukSiswa: "1374823754",
          sekolah: "SMK",
          ttl: "Manado, 2001-12-09",
          jurusanId: 2,
        },
      },
    },
  });

  const user8 = await prisma.users.create({
    data: {
      username: "Rudi",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("Rudi123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      role: "STUDENT",
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Laki-laki",
          nama: "Rudi",
          kelas: "X",
          noIndukSiswa: "1374823755",
          sekolah: "SMK",
          ttl: "Manado, 2001-12-09",
          jurusanId: 3,
        },
      },
    },
  });

  const user9 = await prisma.users.create({
    data: {
      username: "Masdi",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("Masdi123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      role: "STUDENT",
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Laki-laki",
          nama: "Masdi",
          kelas: "XI",
          noIndukSiswa: "1374823756",
          sekolah: "SMK",
          ttl: "Manado, 2001-12-09",
          jurusanId: 3,
        },
      },
    },
  });

  const user10 = await prisma.users.create({
    data: {
      username: "Wawan",
      // password: "$2y$10$dvkvdUNjZxq27VkeD7Iv5.x/kRjScplztpBLx0/CtaL0ztIbMnDxO",
      password: await Bun.password.hash("Wawan123", {
        algorithm: "bcrypt",
        cost: 10,
      }),
      role: "STUDENT",
      studentProfil: {
        create: {
          alamat: "Jl. Kebon Jeruk",
          jenisKelamin: "Laki-laki",
          nama: "Wawan",
          kelas: "XII",
          noIndukSiswa: "1374823757",
          sekolah: "SMK",
          ttl: "Manado, 2001-12-09",
          jurusanId: 3,
        },
      },
    },
  });

  const kelas = await prisma.kelas.createManyAndReturn({
    data: [
      {
        noKelas: "X",
        jurusanId: 1,
        academicYearId: 1,
        semester: "GENAP",
      },
      {
        noKelas: "XI",
        jurusanId: 1,
        academicYearId: 1,
        semester: "GENAP",
      },
      {
        noKelas: "XII",
        jurusanId: 1,
        academicYearId: 1,
        semester: "GENAP",
      },
      {
        noKelas: "X",
        jurusanId: 2,
        academicYearId: 1,
        semester: "GENAP",
      },
      {
        noKelas: "XI",
        jurusanId: 2,
        academicYearId: 1,
        semester: "GENAP",
      },
      {
        noKelas: "XII",
        jurusanId: 2,
        academicYearId: 1,
        semester: "GENAP",
      },
      {
        noKelas: "X",
        jurusanId: 3,
        academicYearId: 1,
        semester: "GENAP",
      },
      {
        noKelas: "XI",
        jurusanId: 3,
        academicYearId: 1,
        semester: "GENAP",
      },
      {
        noKelas: "XII",
        jurusanId: 3,
        academicYearId: 1,
        semester: "GENAP",
      },
    ],
  });

  const memberKelas = await prisma.memberKelas.createManyAndReturn({
    data: [
      {
        kelasId: kelas[0].id,
        studentId: 2,
      },
      {
        kelasId: kelas[1].id,
        studentId: 3,
      },
      {
        kelasId: kelas[2].id,
        studentId: 4,
      },
      {
        kelasId: kelas[3].id,
        studentId: 5,
      },
      {
        kelasId: kelas[4].id,
        studentId: 6,
      },
      {
        kelasId: kelas[5].id,
        studentId: 7,
      },
      {
        kelasId: kelas[6].id,
        studentId: 8,
      },
      {
        kelasId: kelas[7].id,
        studentId: 9,
      },
      {
        kelasId: kelas[8].id,
        studentId: 10,
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
      {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: 3,
      },
      {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: 4,
      },
      {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: 5,
      },
      {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: 6,
      },
      {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: 7,
      },
      {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: 8,
      },
      {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: 9,
      },
      {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: 10,
      },
    ],
  });

  const mapelKelas = await prisma.mapelKelas.createMany({
    data: [
      {
        kelasId: kelas[0].id,
        mapelId: 1,
      },
      {
        kelasId: kelas[1].id,
        mapelId: 2,
      },
      {
        kelasId: kelas[2].id,
        mapelId: 3,
      },
      {
        kelasId: kelas[3].id,
        mapelId: 4
      },
      {
        kelasId: kelas[4].id,
        mapelId: 5,
      },
      {
        kelasId: kelas[5].id,
        mapelId: 6,
      },
      {
        kelasId: kelas[6].id,
        mapelId: 7
      },
      {
        kelasId: kelas[7].id,
        mapelId: 8,
      },
      {
        kelasId: kelas[8].id,
        mapelId: 9,
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
