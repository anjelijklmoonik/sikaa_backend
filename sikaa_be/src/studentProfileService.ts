import { Hono } from "hono";
import prisma from "./database";

const studentProfile = new Hono();

// CREATE
studentProfile.post("/studentProfil", async (c) => {
  const {
    foto,
    nama,
    noIndukSiswa,
    sekolah,
    kelas,
    Jurusan,
    alamat,
    ttl,
    agama,
    jenisKelamin,
    noTelp,
    email,
    namaAyah,
    namaIbu,
    noTelpAyah,
    noTelpIbu,
    namaWali,
    noTelpWali,
    academicYear,
  } = await c.req.json();

  try {
    const newProfil = await prisma.studentProfil.create({
      data: {
        foto,
        nama,
        noIndukSiswa,
        sekolah,
        kelas,
        Jurusan,
        alamat,
        ttl,
        agama,
        jenisKelamin,
        noTelp,
        email,
        namaAyah,
        namaIbu,
        noTelpAyah,
        noTelpIbu,
        namaWali,
        noTelpWali,
        academicYear: { connect: { id: academicYear.toString() } },
        Keuangan: {
          create: {
            lastTransDate: new Date(),
            debit: 0,
            kredit: 0,
            total: 0,
          },
        },
      },
    });
    return c.json(newProfil, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Profil baru tidak bisa dibuat" }, 400);
  }
});

// READ ALL
studentProfile.get("/studentProfil", async (c) => {
  try {
    const studentProfil = await prisma.studentProfil.findMany();
    return c.json(studentProfil);
  } catch (error) {
    return c.json({ error: "Profil tidak terbaca" }, 500);
  }
});

// READ one
studentProfile.get("/studentProfil/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    const studentProfil = await prisma.studentProfil.findUnique({
      where: { id },
      include: { Jurusan: true },
    });
    if (studentProfil) {
      return c.json(studentProfil);
    } else {
      return c.json({ error: "Profil tidak terbaca" }, 404);
    }
  } catch (error) {
    return c.json({ error: "Error membaca data" }, 500);
  }
});

// UPDATE
studentProfile.put("/studentProfil/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const {
    foto,
    nama,
    noIndukSiswa,
    sekolah,
    kelas,
    Jurusan,
    alamat,
    ttl,
    agama,
    jenisKelamin,
    noTelp,
    email,
    namaAyah,
    namaIbu,
    noTelpAyah,
    noTelpIbu,
    namaWali,
    noTelpWali,
    academicYear,
  } = await c.req.json();
  try {
    const updateStudentProfil = await prisma.studentProfil.update({
      where: { id },
      data: {
        foto,
        nama,
        noIndukSiswa,
        sekolah,
        kelas,
        Jurusan,
        alamat,
        ttl,
        agama,
        jenisKelamin,
        noTelp,
        email,
        namaAyah,
        namaIbu,
        noTelpAyah,
        noTelpIbu,
        namaWali,
        noTelpWali,
        academicYear: { connect: { id: academicYear } },
      },
    });
    return c.json(updateStudentProfil);
  } catch (error) {
    return c.json({ error: "Tidak bisa mengubah data" }, 400);
  }
});

// DELETE
studentProfile.delete("studentProfil/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    await prisma.studentProfil.delete({
      where: { id },
    });
    return c.json({ message: "Penghapusan berhasil" });
  } catch (error) {
    return c.json({ error: "Penghapusan gagal" }, 400);
  }
});

export default studentProfile;
