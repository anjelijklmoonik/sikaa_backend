import prisma from "./database";
import { Hono } from "hono";

const kelas = new Hono();

// Create Kelas
kelas.post('/kelas', async (c) => {
    const { noKelas, academicYearId, jurusanId, semester } = await c.req.json(); // Tambahkan semester sebagai input
  
    // Validasi input
    if (!noKelas || !academicYearId || !jurusanId || !semester) {
      return c.json({ error: 'Semua field (noKelas, academicYearId, jurusanId, semester) wajib diisi.' }, 400);
    }
  
    try {
      const newKelas = await prisma.kelas.create({
        data: {
          noKelas,
          academicYearId,
          jurusanId,
          semester, // Pastikan properti ini sesuai dengan skema Prisma
        },
      });
      return c.json(newKelas, 201);
    } catch (error) {
      console.error(error); // Log untuk debugging
      return c.json({ error: 'Terjadi kesalahan saat membuat data kelas.' }, 400);
    }
  });
  
  
  // Get All Kelas
  kelas.get('/kelas', async (c) => {
    try {
      const kelasList = await prisma.kelas.findMany();
      return c.json(kelasList);
    } catch (error) {
      return c.json({ error: "terjadi kesalahan" }, 500);
    }
  });
  
  // Get Kelas by ID
  kelas.get('/kelas/:id', async (c) => {
    const id = Number(c.req.param('id'));
    try {
      const kelas = await prisma.kelas.findUnique({
        where: {id},
      });
      if (kelas) {
        return c.json(kelas);
      } else {
        return c.json({error: "Error mengambil data"}, 500);
      }
    } catch (error) {
        console.error(error);
      return c.json({ error: "terjadi kesalahan" }, 404);
    }
  });
  
// Update Kelas
kelas.put("/kelas/:id", async (c) => {
    const id = Number (c.req.param("id"));
    const {noKelas, academicYearId, jurusanId} = await c.req.json();
    try {
        const updateKelas = await prisma.kelas.update({
            where: {id},
            data: {noKelas, academicYearId, jurusanId},
        })
        return c.json(updateKelas);
    } catch (error) {
        return c.json({ error: "Terjadi error"}, 400);
    }
})

  // Delete Kelas
  kelas.delete('/kelas/:id', async (c) => {
    const id = Number(c.req.param('id'));
    try {
      const deletedKelas = await prisma.kelas.delete({
        where: {id},
      });
      return c.json(deletedKelas);
    } catch (error) {
      return c.json({ error: "terjadi kesalahan" }, 400);
    }
  });

export default kelas;