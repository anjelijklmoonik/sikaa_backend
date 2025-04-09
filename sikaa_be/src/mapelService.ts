import { Hono } from "hono";
import prisma from "./database";

const mapel = new Hono();

// CREATE
mapel.post("/mapel", async (c) => {
  const { type, mapelUmumId, mapelJurusanId } = await c.req.json();
  try {
    const newMapel = await prisma.mapel.create({
      data: { type, mapelUmumId, mapelJurusanId },
    });
    return c.json(newMapel, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Gagal membuat Mata Pelajaran" }, 400);
  }
});

// READ ALL
mapel.get("/mapel", async (c) => {
  try {
    const mapel = await prisma.mapel.findMany();
    return c.json(mapel);
  } catch (error) {
    return c.json({ error: "Mata pelajaran tidak terbaca" }, 500);
  }
});

// CREATE
mapel.post("/mapelUmum", async (c) => {
  const { namaMapel } = await c.req.json();
  try {
    const newMapelUmum = await prisma.mapelUmum.create({
      data: { namaMapel },
    });
    return c.json(newMapelUmum, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Mata pelajaran baru tidak bisa dibuat" }, 400);
  }
});

// READ all
mapel.get("/mapelUmum", async (c) => {
  try {
    const mapelUmum = await prisma.mapelUmum.findMany();
    return c.json(mapelUmum);
  } catch (error) {
    return c.json({ error: "Mapel umum tidak terbaca" }, 500);
  }
});

// READ one
mapel.get("/mapelUmum/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    const mapelUmum = await prisma.mapelUmum.findUnique({
      where: { id },
    });
    if (mapelUmum) {
      return c.json(mapelUmum);
    } else {
      return c.json({ error: "Error membaca data" }, 500);
    }
  } catch (error) {
    return c.json({ error: "Error membaca data" }, 500);
  }
});

// UPDATE
mapel.put("/mapelUmum/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { namaMapel } = await c.req.json();
  try {
    const updateMapelUmum = await prisma.mapelUmum.update({
      where: { id },
      data: { namaMapel },
    });
    return c.json(updateMapelUmum);
  } catch (error) {
    return c.json({ error: "Tidak bisa mengubah data" }, 400);
  }
});

// DELETE
mapel.delete("/mapelUmum/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    await prisma.mapelUmum.delete({
      where: { id },
    });
    return c.json({ message: "Penghapusan berhasil" });
  } catch (error) {
    return c.json({ error: "Penghapusan gagal" }, 400);
  }
});

// CREATE
mapel.post("/mapelJurusan", async (c) => {
  const { namaMapel, jurusanId } = await c.req.json();
  try {
    const newMapelJurusan = await prisma.mapelJurusan.create({
      data: { namaMapel, jurusanId },
    });
    return c.json(newMapelJurusan, 201);
  } catch (error) {
    return c.json({ error: "Mata pelajaran baru tidak bisa dibuat" }, 400);
  }
});

// READ all
mapel.get("/mapelJurusan", async (c) => {
  try {
    const mapelJurusan = await prisma.mapelJurusan.findMany();
    return c.json(mapelJurusan);
  } catch (error) {
    return c.json({ error: "Mapel umum tidak terbaca" }, 500);
  }
});

// READ one
mapel.get("/mapelJurusan/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    const mapelJurusan = await prisma.mapelJurusan.findUnique({
      where: { id },
    });
    if (mapelJurusan) {
      return c.json(mapelJurusan);
    } else {
      return c.json({ error: "Error membaca data" }, 500);
    }
  } catch (error) {
    return c.json({ error: "Error membaca data" }, 500);
  }
});

// UPDATE
mapel.put("/mapelJurusan/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { namaMapel, jurusanId } = await c.req.json();
  try {
    const updateMapelJurusan = await prisma.mapelJurusan.update({
      where: { id },
      data: { namaMapel, jurusanId },
    });
    return c.json(updateMapelJurusan);
  } catch (error) {
    return c.json({ error: "Tidak bisa mengubah data" }, 400);
  }
});

// DELETE
mapel.delete("/mapelJurusan/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    await prisma.mapelJurusan.delete({
      where: { id },
    });
    return c.json({ message: "Penghapusan berhasil" });
  } catch (error) {
    return c.json({ error: "Penghapusan gagal" }, 400);
  }
});

export default mapel;
