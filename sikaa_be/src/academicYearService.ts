import { Hono } from "hono";
import prisma from "./database";

const academicYear = new Hono();

// CREATE
academicYear.post("/academicYear", async (c) => {
  const { year } = await c.req.json();
  try {
    const newYear = await prisma.academicYear.create({
      data: { year },
    });
    return c.json(newYear, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Tahun akademik baru tidak bisa dibuat" }, 400);
  }
});

// READ all
academicYear.get("/academicYear", async (c) => {
  try {
    const academicYear = await prisma.academicYear.findMany();
    return c.json(academicYear);
  } catch (error) {
    return c.json({ error: "Tahun akademik tidak terbaca" }, 500);
  }
});

// READ one
academicYear.get("/academicYear/:id", async (c) => {
  const id = String(c.req.param("id"));
  try {
    const academicYear = await prisma.academicYear.findUnique({
      where: { id },
    });
    if (academicYear) {
      return c.json(academicYear);
    } else {
      return c.json({ error: "Tahun akademik tidak terbaca" }, 500);
    }
  } catch (error) {
    return c.json({ error: "Error membaca data" }, 500);
  }
});

// UPDATE
academicYear.put("/academicYear/:id", async (c) => {
  const id = String(c.req.param("id"));
  const { year } = await c.req.json();
  try {
    const updateAcademicYear = await prisma.academicYear.update({
      where: { id },
      data: { year },
    });
    return c.json(updateAcademicYear);
  } catch (error) {
    return c.json({ error: "Tidak bisa mengubah data" }, 400);
  }
});

// DELETE
academicYear.delete("/academicYear/:id", async (c) => {
  const id = String(c.req.param("id"));
  try {
    await prisma.academicYear.delete({
      where: { id },
    });
    return c.json({ message: "Pengahapusan berhasil" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Pengahapusan gagal" }, 400);
  }
});

export default academicYear;
