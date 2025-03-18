import { Hono } from "hono";
import prisma from "./database";
import { Prisma } from "@prisma/client";

const keuangan = new Hono();

//======================================================= KEUANGAN =======================================================//

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ //
// READ all
keuangan.get("/keuangan", async (c) => {
  try {
    const keuangan = await prisma.keuangan.findMany();
    return c.json(keuangan);
  } catch (error) {
    return c.json({ error: "Keuangan tidak terbaca" }, 500);
  }
});
// READ one
keuangan.get("/keuangan/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    const keuangan = await prisma.keuangan.findUnique({
      where: { id },
    });
    if (keuangan) {
      return c.json(keuangan);
    } else {
      return c.json({ error: "Keuangan tidak terbaca" }, 404);
    }
  } catch (error) {
    return c.json({ error: "Error membaca data" }, 500);
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
keuangan.delete("/keuangan/:id", async (c) => {
  const id = Number(c.req.param("id"));
  try {
    await prisma.keuangan.delete({
      where: { id },
    });
    return c.json({ message: "Pengahapusan berhasil" });
  } catch (error) {
    return c.json({ error: "Pengahapusan gagal" }, 400);
  }
});

// ======================================================== TRANSAKSI =======================================================//
keuangan.post("/keuangan/:id/transaksi", async (c) => {
  try {
    const payload: Prisma.TransaksiCreateInput = await c.req.json();
    const data = await prisma.$transaction(async (prisma) => {
      const transaksi = await prisma.transaksi.create({
        data: payload,
        include: {
          Keuangan: true,
        },
      });

      const keuanganPayload: Prisma.KeuanganUpdateInput = {
        debit:
          transaksi.type === "DEBIT"
            ? transaksi.Keuangan.debit + transaksi.amount
            : transaksi.Keuangan.debit,
        kredit:
          transaksi.type === "KREDIT"
            ? transaksi.Keuangan.kredit + transaksi.amount
            : transaksi.Keuangan.kredit,
        lastTransDate: transaksi.transDate,
        total:
          transaksi.type === "KREDIT"
            ? transaksi.Keuangan.total + transaksi.amount
            : transaksi.Keuangan.total - transaksi.amount,
      };

      const keuangan = await prisma.keuangan.update({
        where: { id: transaksi.keuanganId },
        data: keuanganPayload,
      });

      return { transaksi, keuangan };
    });
    return c.json({ message: "Transaksi berhasil dibuat", data });
  } catch (error) {
    return c.json({ error: "Pengahapusan gagal" }, 400);
  }
});

export default keuangan;
