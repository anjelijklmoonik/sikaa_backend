import prisma from "./database";
import { Hono } from "hono";

const absensi = new Hono();

// CREATE
absensi.post("/absensi", async (c) => {
  const { tanggal, status, studentId, memberKelasId } = await c.req.json();
  try {
    const newAbsen = await prisma.absensi.create({
      data: { tanggal: new Date(tanggal), status, studentId, memberKelasId },
    });
    return c.json(newAbsen, 201);
  } catch (error) {
    return c.json({ error: "Absen baru tidak bisa dibuat" }, 400);
  }
});

// READ all
absensi.get("/absensi", async (c) => {
  try {
    const absensi = await prisma.absensi.findMany();
    return c.json(absensi);
  } catch (error) {
    return c.json({ error: "Absensi tidak terbaca" }, 500);
  }
});

// READ one
absensi.get("/absensi/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    const absensi = await prisma.absensi.findUnique({
      where: { id },
    });
    if (absensi) {
      return c.json(absensi);
    } else {
      return c.json({ error: "Error membaca data" }, 500);
    }
  } catch (error) {
    console.error(error);
    return c.json({ error: "Error membaca data" }, 500);
  }
});

// UPDATE
absensi.put("/absensi/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { tanggal, status, studentId, memberKelasId } = await c.req.json();
  try {
    const updateAbsensi = await prisma.absensi.update({
      where: { id },
      data: { tanggal: new Date(tanggal), status, studentId, memberKelasId },
    });
    return c.json(updateAbsensi);
  } catch (error) {
    return c.json({ error: "Tidak bisa mengubah data" }, 400);
  }
});

// DELETE
absensi.delete("/absensi/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    await prisma.absensi.delete({
      where: { id },
    });
    return c.json({ message: "Penghapusan berhasil" });
  } catch (error) {
    return c.json({ error: "Penghapusan gagal" }, 400);
  }
});

export default absensi;
