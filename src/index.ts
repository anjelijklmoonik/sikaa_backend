const prisma = new PrismaClient
import { PrismaClient, Role, Prisma } from '@prisma/client';
import { connect } from 'bun';
import { Hono, Next } from 'hono'
import { Context, useId } from 'hono/jsx';
import type { Context as HonoContext } from 'hono';
import {cors} from 'hono/cors'

const app = new Hono()

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
)

// ===================================================================================================================================================================================================== //
//======================================================= MIDDLEWARE ADMIN ONLY =======================================================//
const adminOnly = async (c: HonoContext, next: Next) => {
  const userRole = c.req.header('user-role');
  console.log('User Role:', userRole);
  if (userRole?.toUpperCase() !== 'ADMIN') {
    return c.json({error: "Admin ditolak"}, 403);
  }
  await next();
}

// ===================================================================================================================================================================================================== //

//======================================================= STUDENT PROFIL =======================================================//
// CREATE
app.post('/studentProfil', async (c) => {
  const {foto, nama, noIndukSiswa, sekolah, kelas, Jurusan, alamat, ttl, agama, jenisKelamin, noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear} = await c.req.json();

  try {
    const newProfil = await prisma.studentProfil.create ({
      data: { foto, nama, noIndukSiswa, sekolah, kelas, Jurusan, alamat, ttl: new Date(ttl), agama, jenisKelamin, noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear: {connect: {id: academicYear.toString()}}, Keuangan: {
        create: {
          lastTransDate: new Date(),
          debit: 0,
          kredit: 0,
          total: 0,
        }
      }}
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
  const { foto, nama, noIndukSiswa, sekolah, kelas, Jurusan, alamat, ttl, agama, jenisKelamin, noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear} = await c.req.json();
  try {
    const updateStudentProfil = await prisma.studentProfil.update({
      where: {id},
      data: {foto, nama, noIndukSiswa, sekolah, kelas, Jurusan, alamat, ttl: new Date (ttl), agama, jenisKelamin, noTelp, email, namaAyah, namaIbu, noTelpAyah, noTelpIbu, namaWali, noTelpWali, academicYear: {connect: {id: academicYear}}}
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
// app.put ('/keuangan/:id', async (c) => {
//   const id = Number(c.req.param('id'));
//   const { debit, kredit, total, lastTransDate, studentProfilId, deskripsi} = await c.req.json();
//   try {
//     const updateKeuangan = await prisma.keuangan.update({
//       where: {id},
//       data: { debit, kredit, total, lastTransDate: new Date (lastTransDate), studentProfilId, deskripsi}
//     });
//     return c.json(updateKeuangan);
//   } catch (error) {
//     return c.json({error: "Tidak bisa mengubah data"}, 400)
//   }
// });

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


// ======================================================== TRANSAKSI =======================================================//
app.post('/keuangan/:id/transaksi', async (c) => {
  try {
    const payload: Prisma.TransaksiCreateInput = await c.req.json()
    const data = await prisma.$transaction(async prisma => {
      const transaksi = await prisma.transaksi.create({
        data: payload,
        include: {
          Keuangan: true
        }
      })

      const keuanganPayload: Prisma.KeuanganUpdateInput = {
        debit: transaksi.type === 'DEBIT' ? transaksi.Keuangan.debit + transaksi.amount : transaksi.Keuangan.debit,
        kredit: transaksi.type === 'KREDIT' ? transaksi.Keuangan.kredit + transaksi.amount : transaksi.Keuangan.kredit,
        lastTransDate: transaksi.transDate,
        total: transaksi.type === 'KREDIT' ? transaksi.Keuangan.total + transaksi.amount : transaksi.Keuangan.total - transaksi.amount,
      }

      const keuangan = await prisma.keuangan.update({
        where: {id: transaksi.keuanganId},
        data: keuanganPayload
      })

      return {transaksi, keuangan}
    })
    return c.json({message: 'Transaksi berhasil dibuat', data})
  } catch (error) {
    return c.json ({error: "Pengahapusan gagal"}, 400)
  }
})


//======================================================= ABSENSI =======================================================//
// CREATE
app.post('/absensi', async (c) => {
  const { tanggal, status, studentId, memberKelasId} = await c.req.json();
  try {
    const newAbsen = await prisma.absensi.create ({
      data: { tanggal: new Date(tanggal), status, studentId, memberKelasId}
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
      return c.json(absensi)
    } else {
      return c.json ({error: "Error membaca data"}, 500)
    }
  } catch (error) {
    console.error(error)
    return c.json ({error: "Error membaca data"}, 500)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
app.put ('/absensi/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { tanggal, status, studentId, memberKelasId} = await c.req.json();
  try {
    const updateAbsensi = await prisma.absensi.update({
      where: {id},
      data: { tanggal: new Date(tanggal), status, studentId, memberKelasId}
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
  const { skor, pelajaran, studentId, memberKelasId} = await c.req.json();
  try {
    const newNilai = await prisma.nilai.create ({
      data: { skor, pelajaran, studentId, memberKelasId}
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
      return c.json(nilai)
    } else {
      return c.json ({error: "Error membaca data"}, 500)
    }
  } catch (error) {
    console.error(error)
    return c.json({error: "Error membaca data"}, 500)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
app.put('/nilai/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { skor, pelajaran, studentId, memberKelasId} = await c.req.json();
  try {
    const updateNilai = await prisma.nilai.update({
      where: {id},
      data: { skor, pelajaran, studentId, memberKelasId}
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
app.get('/pencapaian/:studentId', async (c) => {
  const studentId = Number (c.req.param('studentId'));
  try {
    const pencapaian = await prisma.pencapaian.findMany({
      where: {studentProfilId: studentId}
    });
    if (pencapaian.length > 0) {
      return c.json(pencapaian)
    } else {
      return c.json ({message: "Belum terlihat Pencapaian.. Tetap Semangat dan Jangan Menyerah! :)"}, 500)
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

//======================================================= MAPEL =======================================================//
// CREATE
app.post('/mapel', async (c) => {
  const {type, mapelUmumId, mapelJurusanId} = await c.req.json();
  try {
    const newMapel = await prisma.mapel.create({
      data: {type, mapelUmumId, mapelJurusanId}
    })
    return c.json(newMapel, 201)
  } catch (error) {
    console.error(error)
    return c.json({error: "Gagal membuat Mata Pelajaran"}, 400)
  }
})

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ ALL
app.get('/mapel', async (c) => {
  try {
    const mapel = await prisma.mapel.findMany();
    return c.json(mapel);
  } catch (error) {
    return c.json({error: "Mata pelajaran tidak terbaca"}, 500)
  }
})
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //


//======================================================= MAPEL UMUM =======================================================//
// CREATE
app.post('/mapelUmum', async (c) => {
  const { namaMapel} = await c.req.json();
  try {
    const newMapelUmum = await prisma.mapelUmum.create({
      data: { namaMapel}
    });
    return c.json(newMapelUmum, 201);
  } catch (error) {
    console.error(error)
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
      return c.json(mapelUmum)
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
  const { namaMapel} = await c.req.json();
  try {
    const updateMapelUmum = await prisma.mapelUmum.update({
      where: {id},
      data: { namaMapel}
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
  const { namaMapel, jurusanId} = await c.req.json();
  try {
    const newMapelJurusan = await prisma.mapelJurusan.create({
      data: { namaMapel, jurusanId}
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
      return c.json(mapelJurusan)
    } else {
      return c.json({error: "Error membaca data"}, 500)
    }
  }catch (error) {
    return c.json({error: "Error membaca data"}, 500)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
app.put('/mapelJurusan/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const {namaMapel, jurusanId} = await c.req.json();
  try {
    const updateMapelJurusan = await prisma.mapelJurusan.update({
      where: {id},
      data: {namaMapel, jurusanId}
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


//======================================================= USERS =======================================================//
// CREATE admin only
app.post('/admin', adminOnly, async (c: HonoContext) => {
    const {username, password} = await c.req.json();
    if (!username || !password) {
      return c.json({error: "Password atau Username tidak dimasukkan"}, 400)
    }
    try {
      const newAdmin = await prisma.users.create({
        data: {username, password, role: 'ADMIN'}
      });
      return c.json(newAdmin, 201);
  } catch (error) {
    console.error(error);
    return c.json({error: "Admin tidak bisa dibuat"}, 400)
  }
});
// CREATE users
app.post('/users', async (c) => {
  const {username, password, role, studentProfilId} = await c.req.json();
  if (role !== 'STUDENT' && role !== 'ORANGTUA') {
    return c.json({error: 'Role salah'}, 400)
  }
  const userData: any = {
    username, password, role: role === 'ORANGTUA'? Role.ORANGTUA : role === 'STUDENT'? Role.STUDENT: Role}
  if (role === 'STUDENT') {
    if (!studentProfilId) {
      return c.json({error: "Student harus memiliki Student ID"})
    }
    userData.studentProfilId = studentProfilId;
  } 

  try {
      const newUser = await prisma.users.create({
        data: userData,
      });
      return c.json(newUser, 201);
  } catch (error) {
    console.error(error);
    return c.json({error: "Tidak bisa membuat user baru"}, 400)
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ all
app.get('/users', async (c: HonoContext) => {
  try {
    const users = await prisma.users.findMany();
    return c.json(users, 200);
  } catch (error) {
    console.error(error);
    return c.json({error: "Error membaca user"}, 500);
  }
});
// READ one
app.get('/users/:id', async(c: HonoContext) => {
  const id = Number(c.req.param('id'));
  try {
    const users = await prisma.users.findUnique({
      where: {id},
    });
    if (!users) {
      return c.json({error: "User tidak bisa terbaca"}, 404);
    }
    return c.json(users, 200);
  } catch (error) {
    console.error(error);
    return c.json({error: "Tidak bisa membaca user"})
  }
})

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE admin
app.put('/admin/:id', adminOnly, async(c) => {
  const userId = Number (c.req.param('id'));
  const {username, password, role} = await c.req.json();

  if (!username && !password && !role) {
    return c.json({error: "Username, Password atau Role tidak diisi"});
  }
  const updateData: any = {};
  if (username) updateData.username = username;
  if (password) updateData.password = password;
  if (role) updateData.role = role;

  try {
    const updateUser = await prisma.users.update({
      where: {id: userId},
      data: updateData
    });
    return c.json(updateUser, 200);
  } catch (error) {
    console.error(error);
    return c.json({error: "Tidak bisa mengubah data"})
  }
})

// UPDATE users
app.put('/users/:id', async (c: HonoContext) => {
  const id = Number(c.req.param('id'));
  try {
    const {username, password, role} = await c.req.json();
    const updateUser = await prisma.users.update({
      where: {id},
      data: {username, password, role,}
    });
    return c.json(updateUser, 200);
  } catch (error) {
    console.error(error);
    return c.json({error: "Tidak bisa mengubah data"}, 400);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE admin
app.delete('/admin/:id', adminOnly, async(c) => {
  const userId = Number(c.req.param('id'));
  try {
    const deleteAdmin = await prisma.users.delete({
      where: {id: userId},
    });
    return c.json({message: "Penghapusan berhasil", deleteAdmin}, 200);
  } catch (error) {
    console.error(error)
    return c.json({error: "Penghapusan gagal"}, 500);
  }
})

// DELETE users
app.delete('/users/:id', async (c: HonoContext) => {
  const id = Number(c.req.param('id'));
  try {
    await prisma.users.delete({
      where: {id},
    });
    return c.json({message: "Penghapusan berhasil"}, 200);
  } catch (error) {
    console.error(error);
    return c.json({error: "Penghapusan gagal"}, 400);
  }
});

// ===================================================================================================================================================================================================== //


//======================================================= ROLE =======================================================//
// CREATE

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE

export default {
  port: 3001,
  fetch: app.fetch
}
