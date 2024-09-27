const prisma = new PrismaClient
import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono'

const app = new Hono()

// CREATE
app.post('/studentProfil', async (c) => {
  const {foto, nama, noIndukSiswa, sekolah, kelas, jurusan, alamat, ttl, noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear} = await c.req.json();

  try {
    const newProfil = await prisma.studentProfil.create ({
      data: { foto, nama, noIndukSiswa, sekolah, kelas, jurusan, alamat, ttl, noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear}
    })
    return c.json(newProfil, 201);
  } catch (error) {
    return c.json({errof: "Profil baru tidak bisa dibuat"}, 400);
  }
});

// ===================================================================================================================================================================================================== //
// READ all
app.get('/studentProfil', async (c) => {
  try {
    const studentProfil = await prisma.studentProfil.findMany();
    return c.json(studentProfil);
  } catch (error) {
    return c.json({error: "Profil tidak terbaca"}, 500);
  }
});

// READ one
app.get('/studentProfil/:id', async (c) => {
  const id = Number(c.req.param('id'));
  try {
    const studentProfil = await prisma.studentProfil.findUnique({
      where: {id}
    });
    if (studentProfil) {
      return c.json (studentProfil);
    } else {
      return c.json({error: "Profil tidak terbaca"}, 404);
    }
  } catch (error) {
    return c.json ({error: "Error membaca data"}, 500);
  }
});

// ===================================================================================================================================================================================================== //
// UPDATE 
app.put ('/studentProfil/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { foto, nama, noIndukSiswa, sekolah, kelas, jurusan, alamat, ttl, noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear} = await c.req.json();
  try {
    const updateStudentProfil = await prisma.studentProfil.update({
      where: {id},
      data: {foto, nama, noIndukSiswa, sekolah, kelas, jurusan, alamat, ttl, noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear}
    });
    return c.json(updateStudentProfil);
  } catch (error) {
    return c.json ({error: "Tidak bisa mengubah data"}, 400);
  }
});

// ===================================================================================================================================================================================================== //
// DELETE
app.delete('studentProfil/:id', async (c) => {
  const id = Number (c.req.param('id'));
  try {
    await prisma.studentProfil.delete({
      where: {id}
    });
    return c.json ({ message: "Penghapusan berhasil"});
  } catch (error) {
    return c.json ({error: "Penghapusan gagal"}, 400)
  }
})

export default app
