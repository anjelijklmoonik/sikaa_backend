import { Hono } from "hono";
import prisma from "./database";

const pencapaian = new Hono();

//======================================================= PENCAPAIAN =======================================================//
// CREATE
pencapaian.post("/pencapaian", async (c) => {
  const { judul, deskripsi, tanggal, studentProfilId } = await c.req.json();
  try {
    const newPencapaian = await prisma.pencapaian.create({
      data: { judul, deskripsi, tanggal: new Date(tanggal), studentProfilId },
    });
    return c.json(newPencapaian, 201);
  } catch (error) {
    return c.json({ error: "Nilai baru tidak bisa dibuat" }, 400);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ all
pencapaian.get("/pencapaian", async (c) => {
  try {
    const pencapaian = await prisma.pencapaian.findMany();
    return c.json(pencapaian);
  } catch (error) {
    return c.json({ error: "Pencapaian tidak terbaca" }, 500);
  }
});
// READ one
pencapaian.get("/pencapaian/:studentId", async (c) => {
  const studentId = Number(c.req.param("studentId"));
  try {
    const pencapaian = await prisma.pencapaian.findMany({
      where: { studentProfilId: studentId },
    });
    if (pencapaian.length > 0) {
      return c.json(pencapaian);
    } else {
      return c.json(
        {
          message:
            "Belum terlihat Pencapaian.. Tetap Semangat dan Jangan Menyerah! :)",
        },
        500
      );
    }
  } catch (error) {
    return c.json({ error: "Error membaca data" }, 500);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
pencapaian.put("/pencapaian/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { judul, deskripsi, tanggal, studentProfilId } = await c.req.json();
  try {
    const updatePencapaian = await prisma.pencapaian.update({
      where: { id },
      data: { judul, deskripsi, tanggal: new Date(tanggal), studentProfilId },
    });
    return c.json(updatePencapaian);
  } catch (error) {
    return c.json({ error: "Tidak bisa mengubah data" }, 400);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// DELETE
pencapaian.delete("/pencapaian/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    await prisma.pencapaian.delete({
      where: { id },
    });
    return c.json({ message: "Penghapusan berhasil" });
  } catch (error) {
    return c.json({ error: "Penghapusan gagal" }, 400);
  }
});

export default pencapaian;
