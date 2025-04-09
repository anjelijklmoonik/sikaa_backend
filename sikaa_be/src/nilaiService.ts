import { Hono } from "hono";
import prisma from "./database";

const nilai = new Hono();

// CREATE
nilai.post("/nilai", async (c) => {
  const { skor, pelajaran, studentId, memberKelasId } = await c.req.json();
  try {
    const newNilai = await prisma.nilai.create({
      data: { skor, pelajaran, studentId, memberKelasId },
    });
    return c.json(newNilai, 201);
  } catch (error) {
    return c.json({ error: "Nilai baru tidak bisa dibuat" }, 400);
  }
});

// READ all
nilai.get("/nilai", async (c) => {
  try {
    const nilai = await prisma.nilai.findMany();
    return c.json(nilai);
  } catch (error) {
    return c.json({ error: "Nilai tidak terbaca" }, 500);
  }
});

// READ one
nilai.get("/nilai/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    const nilai = await prisma.nilai.findMany({
      where: { MemberKelas: { studentId: id } },
      include: {
        MemberKelas: {
          select: {
            Kelas: {
              select: {
                semester: true,
                AcademicYear: { select: { year: true } },
              },
            },
          },
        },
      },
    });
    if (nilai) {
      const normalizedNilai = Object.groupBy(
        nilai,
        (item) =>
          `${item.MemberKelas.Kelas.AcademicYear.year}_${item.MemberKelas.Kelas.semester}`
      );

      return c.json({ data: normalizedNilai, message: "Nilai terbaca" }, 200);
    } else {
      return c.json({ error: "Error membaca data" }, 500);
    }
  } catch (error) {
    console.error(error);
    return c.json({ error: "Error membaca data" }, 500);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// UPDATE
nilai.put("/nilai/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { skor, pelajaran, studentId, memberKelasId } = await c.req.json();
  try {
    const updateNilai = await prisma.nilai.update({
      where: { id },
      data: { skor, pelajaran, studentId, memberKelasId },
    });
    return c.json(updateNilai);
  } catch (error) {
    return c.json({ erro: "Tidak bisa mengubah data" }, 400);
  }
});

// DELETE
nilai.delete("/nilai/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    await prisma.nilai.delete({
      where: { id },
    });
    return c.json({ message: "Penghapusan berhasil" });
  } catch (error) {
    return c.json({ error: "Penghapusan gagal" }, 400);
  }
});

export default nilai;
