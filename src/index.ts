const prisma = new PrismaClient
import { PrismaClient } from '@prisma/client';
import { connect } from 'bun';
import { Hono } from 'hono'

const app = new Hono()

// ===================================================================================================================================================================================================== //
//======================================================= STUDENT PROFIL =======================================================//
// CREATE
app.post('/studentProfil', async (c) => {
  const {foto, nama, noIndukSiswa, sekolah, kelas, jurusan, alamat, ttl, noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear} = await c.req.json();

  try {
    const newProfil = await prisma.studentProfil.create ({
      data: { foto, nama, noIndukSiswa, sekolah, kelas, jurusan, alamat, ttl: new Date(ttl), noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear: {connect: {id: academicYear.toString()}}}
    })
    return c.json(newProfil, 201);
  } catch (error) {
    console.error(error)
    return c.json({error: "Profil baru tidak bisa dibuat"}, 400);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
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

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE 
app.put ('/studentProfil/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { foto, nama, noIndukSiswa, sekolah, kelas, jurusan, alamat, ttl, noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear} = await c.req.json();
  try {
    const updateStudentProfil = await prisma.studentProfil.update({
      where: {id},
      data: {foto, nama, noIndukSiswa, sekolah, kelas, jurusan, alamat, ttl: new Date (ttl), noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear: {connect: {id: academicYear}}}
    });
    return c.json(updateStudentProfil);
  } catch (error) {
    return c.json ({error: "Tidak bisa mengubah data"}, 400);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
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
});


//======================================================= ACADEMIC YEAR =======================================================//
// CREATE
app.post('/academicYear', async (c) => {
  const { year} = await c.req.json();
  try {
    const newYear = await prisma.academicYear.create ({
      data: {year}
    })
    return c.json(newYear, 201);
  } catch (error) {
    console.error(error)
    return c.json ({ error: "Tahun akademik baru tidak bisa dibuat"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ all
app.get('/academicYear', async (c) => {
  try {
    const academicYear = await prisma.academicYear.findMany();
    return c.json(academicYear);
  } catch (error) {
    return c.json({error: "Tahun akademik tidak terbaca"}, 500);
  }
});
// READ one
app.get('/academicYear/:id', async (c) => {
  const id = String(c.req.param('id'));
  try {
    const academicYear = await prisma.academicYear.findUnique({
      where: {id}
    })
    if (academicYear) {
      return c.json (academicYear);
    } else {
      return c.json({error: "Tahun akademik tidak terbaca"}, 500)
    }
  } catch (error) {
    return c.json ({error: "Error membaca data"}, 500);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
app.put ('/academicYear/:id', async (c) => {
  const id = String(c.req.param('id'));
  const {year} = await c.req.json();
  try {
    const updateAcademicYear = await prisma.academicYear.update({
      where: {id},
      data: {year}
    })
    return c.json(updateAcademicYear);
  } catch (error) {
    return c.json ({error: "Tidak bisa mengubah data"}, 400);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE
app.delete('/academicYear/:id', async (c) => {
  const id = String (c.req.param('id'));
  try {
    
    await prisma.academicYear.delete({
      where: {id}
    });
    return c.json ({message: "Pengahapusan berhasil"});
  } catch (error) {
    console.error(error)
    return c.json ({error: "Pengahapusan gagal"}, 400)
  }
});

//======================================================= KEUANGAN =======================================================//
// CREATE
app.post('/keuangan', async (c) => {
  const { lastBalance, lastTransaction, lastTransDate, studentProfilId, deskripsi} = await c.req.json();
  try {
    const newKeuangan = await prisma.keuangan.create ({
      data: { lastBalance, lastTransaction, lastTransDate: new Date(lastTransDate), studentProfilId, deskripsi}
    })
    return c.json(newKeuangan, 201);
  } catch (error) {
    console.error(error)
    return c.json({error: "Keuangan baru tidak bisa dibuat"}, 400);
  }
});


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ all
app.get('/keuangan', async (c) => {
  try {
    const keuangan = await prisma.keuangan.findMany();
    return c.json(keuangan);
  } catch (error) {
    return c.json({error: "Keuangan tidak terbaca"}, 500);
  }
});
// READ one
app.get('/keuangan/:id', async (c) => {
  const id = Number (c.req.param('id'));
  try {
    const keuangan = await prisma.keuangan.findUnique({
      where: {id}
    });
    if (keuangan) {
      return c.json (keuangan);
    } else {
      return c.json({error: "Keuangan tidak terbaca"}, 404);
    }
  } catch (error) {
    return c.json ({error: "Error membaca data"}, 500)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
app.put ('/keuangan/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const {lastBalance, lastTransaction, lastTransDate, studentProfilId, deskripsi} = await c.req.json();
  try {
    const updateKeuangan = await prisma.keuangan.update({
      where: {id},
      data: {lastBalance, lastTransaction, lastTransDate: new Date (lastTransDate), studentProfilId, deskripsi}
    });
    return c.json(updateKeuangan);
  } catch (error) {
    return c.json({error: "Tidak bisa mengubah data"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE
app.delete('/keuangan/:id', async (c) => {
  const id = Number (c.req.param('id'));
  try {
    await prisma.keuangan.delete ({
      where: {id}
    });
    return c.json ({ message: "Pengahapusan berhasil"});
  } catch (error) {
    return c.json ({error: "Pengahapusan gagal"}, 400)
  }
});


//======================================================= ABSENSI =======================================================//
// CREATE
app.post('/absensi', async (c) => {
  const { tanggal, status, studentProfilId} = await c.req.json();
  try {
    const newAbsen = await prisma.absensi.create ({
      data: { tanggal: new Date(tanggal), status, studentProfilId}
    })
    return c.json(newAbsen, 201);
  } catch (error) {
    return c.json({error: "Absen baru tidak bisa dibuat"}, 400);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ all
app.get('/absensi', async (c) => {
  try {
    const absensi = await prisma.absensi.findMany();
    return c.json(absensi);
  } catch (error) {
    return c.json({error: "Absensi tidak terbaca"}, 500);
  }
});
// READ one
app.get('/absensi/:id', async (c) => {
  const id = Number (c.req.param('id'));
  try {
    const absensi = await prisma.absensi.findUnique({
      where: {id}
    });
    if (absensi) {
      return c.json({error: "Absensi tidak terbaca"}, 404)
    } else {
      return c.json ({error: "Error membaca data"}, 500)
    }
  } catch (error) {
    return c.json ({error: "Error membaca data"}, 500)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
app.put ('/absensi/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { tanggal, status, studentProfilId} = await c.req.json();
  try {
    const updateAbsensi = await prisma.absensi.update({
      where: {id},
      data: { tanggal: new Date(tanggal), status, studentProfilId}
    });
    return c.json(updateAbsensi);
  } catch (error) {
    return c.json({error: "Tidak bisa mengubah data"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE
app.delete('/absensi/:id', async (c) => {
  const id = Number (c.req.param('id'));
  try {
    await prisma.absensi.delete ({
      where: {id}
    });
    return c.json ({ message: "Penghapusan berhasil"});
  } catch (error) {
    return c.json({error: "Penghapusan gagal"}, 400)
  }
});


//======================================================= NILAI =======================================================//
// CREATE
app.post('/nilai', async (c) => {
  const { skor, pelajaran, studentProfilId} = await c.req.json();
  try {
    const newNilai = await prisma.nilai.create ({
      data: { skor, pelajaran, studentProfilId}
    })
    return c.json(newNilai, 201);
  } catch (error) {
    return c.json({error: "Nilai baru tidak bisa dibuat"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ all
app.get('/nilai', async (c) => {
  try {
    const nilai = await prisma.nilai.findMany();
    return c.json(nilai);
  } catch (error) {
    return c.json ({error: "Nilai tidak terbaca"}, 500)
  }
});
// READ one
app.get('/nilai/:id', async (c) => {
  const id = Number (c.req.param('id'));
  try{
    const nilai = await prisma.nilai.findUnique({
      where: {id}
    });
    if (nilai) {
      return c.json({error: "Nilai tidak terbaca"}, 404)
    } else {
      return c.json ({error: "Error membaca data"}, 500)
    }
  } catch (error) {
    return c.json({error: "Error membaca data"}, 500)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
app.put('/nilai/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { skor, pelajaran, studentProfilId} = await c.req.json();
  try {
    const updateNilai = await prisma.nilai.update({
      where: {id},
      data: { skor, pelajaran, studentProfilId}
    });
    return c.json(updateNilai);
  } catch (error) {
    return c.json({erro: "Tidak bisa mengubah data"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE
app.delete('/nilai/:id', async (c) => {
  const id = Number (c.req.param('id'));
  try {
    await prisma.nilai.delete ({
      where: {id}
    });
    return c.json ({message: "Penghapusan berhasil"});
  } catch (error) {
    return c.json({error: "Penghapusan gagal"}, 400)
  }
});


//======================================================= PENCAPAIAN =======================================================//
// CREATE
app.post('/pencapaian', async (c) => {
  const { judul, deskripsi, tanggal, studentProfilId} = await c.req.json();
  try {
    const newPencapaian = await prisma.pencapaian.create({
      data: { judul, deskripsi, tanggal: new Date(tanggal), studentProfilId}
    });
    return c.json(newPencapaian, 201);
  } catch (error) {
    return c.json({error: "Nilai baru tidak bisa dibuat"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ all
app.get('/pencapaian', async (c) => {
  try {
    const pencapaian = await prisma.pencapaian.findMany();
    return c.json(pencapaian);
  } catch (error) {
    return c.json({error: "Pencapaian tidak terbaca"}, 500)
  }
});
// READ one
app.get('/pencapaian/:id', async (c) => {
  const id = Number (c.req.param('id'));
  try {
    const pencapaian = await prisma.pencapaian.findUnique({
      where: {id}
    });
    if (pencapaian) {
      return c.json({error: "Nilai tidak terbaca"}, 404)
    } else {
      return c.json ({error: "Error membaca data"}, 500)
    }
  } catch (error) {
    return c.json({error: "Error membaca data"}, 500)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
app.put('/pencapaian/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { judul, deskripsi, tanggal, studentProfilId} = await c.req.json();
  try {
    const updatePencapaian = await prisma.pencapaian.update({
      where: {id},
      data: { judul, deskripsi, tanggal: new Date (tanggal), studentProfilId}
    });
    return c.json(updatePencapaian);
  } catch (error) {
    return c.json({error: "Tidak bisa mengubah data"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE
app.delete('/pencapaian/:id', async (c) => {
  const id = Number(c.req.param('id'));
  try {
    await prisma.pencapaian.delete ({
      where: {id}
    });
    return c.json ({message: "Penghapusan berhasil"});
  } catch (error) {
    return c.json({error: "Penghapusan gagal"}, 400)
  }
});


//======================================================= MAPEL UMUM =======================================================//
// CREATE
app.post('/mapelUmum', async (c) => {
  const { namaMapel, studentProfilId} = await c.req.json();
  try {
    const newMapelUmum = await prisma.mapelUmum.create({
      data: { namaMapel, studentProfilId}
    });
    return c.json(newMapelUmum, 201);
  } catch (error) {
    return c.json({error: "Mata pelajaran baru tidak bisa dibuat"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ all
app.get('/mapelUmum', async (c) => {
  try {
    const mapelUmum = await prisma.mapelUmum.findMany();
    return c.json(mapelUmum);
  } catch (error) {
    return c.json({error: "Mapel umum tidak terbaca"}, 500)
  }
});
// READ one
app.get('/mapelUmum/:id', async (c) => {
  const id = Number(c.req.param('id'));
  try {
    const mapelUmum = await prisma.mapelUmum.findUnique({
      where: {id}
    });
    if (mapelUmum) {
      return c.json({error: "Mapel umum tidak terbaca"}, 404)
    } else {
      return c.json({error: "Error membaca data"}, 500)
    }
  }catch (error) {
    return c.json({error: "Error membaca data"}, 500)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
app.put('/mapelUmum/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { namaMapel, studentProfilId} = await c.req.json();
  try {
    const updateMapelUmum = await prisma.mapelUmum.update({
      where: {id},
      data: { namaMapel, studentProfilId}
    });
    return c.json(updateMapelUmum);
  } catch (error) {
    return c.json({error: "Tidak bisa mengubah data"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE
app.delete('/mapelUmum/:id', async (c) => {
  const id = Number(c.req.param('id'));
  try {
    await prisma.mapelUmum.delete ({
      where: {id}
    });
    return c.json ({message: "Penghapusan berhasil"});
  } catch (error) {
    return c.json({error: "Penghapusan gagal"}, 400)
  }
});


//======================================================= MAPEL JURUSAN =======================================================//
// CREATE
app.post('/mapelJurusan', async (c) => {
  const { namaMapel, studentProfilId} = await c.req.json();
  try {
    const newMapelJurusan = await prisma.mapelJurusan.create({
      data: { namaMapel, studentProfilId}
    });
    return c.json(newMapelJurusan, 201);
  } catch (error) {
    return c.json({error: "Mata pelajaran baru tidak bisa dibuat"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ all
app.get('/mapelJurusan', async (c) => {
  try {
    const mapelJurusan = await prisma.mapelJurusan.findMany();
    return c.json(mapelJurusan);
  } catch (error) {
    return c.json({error: "Mapel umum tidak terbaca"}, 500)
  }
});
// READ one
app.get('/mapelJurusan/:id', async (c) => {
  const id = Number(c.req.param('id'));
  try {
    const mapelJurusan = await prisma.mapelJurusan.findUnique({
      where: {id}
    });
    if (mapelJurusan) {
      return c.json({error: "Mapel umum tiddak terbaca"}, 404)
    } else {
      return c.json({error: "Error membaca data"}, 500)
    }
  }catch (error) {
    return c.json({error: "Error membadca data"}, 500)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
app.put('/mapelJurusan/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const {namaMapel, studentProfilId} = await c.req.json();
  try {
    const updateMapelJurusan = await prisma.mapelJurusan.update({
      where: {id},
      data: {namaMapel, studentProfilId}
    });
    return c.json(updateMapelJurusan);
  } catch (error) {
    return c.json({error: "Tidak bisa mengubah data"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE
app.delete('/mapelJurusan/:id', async (c) => {
  const id = Number(c.req.param('id'));
  try {
    await prisma.mapelJurusan.delete({
      where: {id}
    });
    return c.json({ message: "Penghapusan berhasil"});
  } catch (error) {
    return c.json({error: "Penghapusan gagal"}, 400)
  }
});


//======================================================= ROLE =======================================================//
// CREATE

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE


//======================================================= USERS =======================================================//
// CREATE

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE

// ===================================================================================================================================================================================================== //

export default app
