import { Context } from "hono";
import * as financeService from "../services/finance";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const createTransaction = async (c: Context) => {
//   try {
//     const payload = await c.req.json();

//     // Validasi input
//     if (!payload.keuanganId) {
//       return c.json({ error: "keuanganId diperlukan" }, 400);
//     }
//     if (typeof payload.amount !== "number" || payload.amount <= 0) {
//       return c.json({ error: "amount harus lebih dari 0" }, 400);
//     }
//     if (!["DEBIT", "KREDIT"].includes(payload.type)) {
//       return c.json({ error: "type harus 'DEBIT' atau 'KREDIT'" }, 400);
//     }

//     // Cek apakah keuanganId ada di database sebelum insert
//     const existingKeuangan = await prisma.keuangan.findUnique({
//       where: { id: payload.keuanganId },
//     });

//     if (!existingKeuangan) {
//       return c.json({ error: "keuanganId tidak ditemukan" }, 400);
//     }

//     // Gunakan TransaksiUncheckedCreateInput agar lebih sederhana
//     const transaksiData: Prisma.TransaksiUncheckedCreateInput = {
//       amount: payload.amount,
//       referensi: payload.referensi,
//       noJurnal: payload.noJurnal,
//       type: payload.type,
//       lastBalance: payload.lastBalance,
//       deskripsi: payload.deskripsi,
//       transDate: payload.transDate,
//       keuanganId: payload.keuanganId,
//     };

//     // Simpan transaksi
//     const createdTransaksi = await financeService.createTransaction(
//       transaksiData
//     );

//     return c.json(createdTransaksi, 201);
//   } catch (error) {
//     console.error("Error creating transaction:", error);

//     return c.json(
//       { error: error instanceof Error ? error.message : "Terjadi kesalahan" },
//       500
//     );
//   }
// };

export const createTransactionHandler = async (c: Context) => {
  try {
    const payload = await c.req.json();

    // Validasi payload harus berupa objek
    if (!payload || typeof payload !== "object") {
      return c.json({ error: "Payload tidak valid" }, 400);
    }

    // Validasi input
    if (!payload.keuanganId) {
      return c.json({ error: "keuanganId diperlukan" }, 400);
    }
    if (typeof payload.amount !== "number" || payload.amount <= 0) {
      return c.json({ error: "amount harus lebih dari 0" }, 400);
    }
    if (!["DEBIT", "KREDIT"].includes(payload.type)) {
      return c.json({ error: "type harus 'DEBIT' atau 'KREDIT'" }, 400);
    }

    // Proses transaksi melalui service
    const createdTransaksi = await financeService.processTransaction(payload);

    return c.json(createdTransaksi, 201);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return c.json(
      { error: error instanceof Error ? error.message : "Terjadi kesalahan" },
      500
    );
  }
};

export const getTransactionByIdHandler = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));

    if (isNaN(id)) {
      return c.json({ error: "id harus berupa angka" }, 400);
    }

    const transaksi = await financeService.getTransactionById(Number(id));

    if (!transaksi) {
      return c.json({ error: "Transaksi tidak ditemukan" }, 404);
    }

    return c.json(transaksi);
  } catch (error) {
    console.error("Error getting transaction by id:", error);
    return c.json(
      { error: error instanceof Error ? error.message : "Terjadi kesalahan" },
      500
    );
  }
};

export const getAllTransactionsHandler = async (c: Context) => {
  try {
    const transactions = await financeService.getAllTransactions();

    return c.json(transactions);
  } catch (error) {
    console.error("Error getting all transactions:", error);
    return c.json(
      { error: error instanceof Error ? error.message : "Terjadi kesalahan" },
      500
    );
  }
};

export const getFinanceByStudentIdHandler = async (c: Context) => {
  try {
    const studentId = parseInt(c.req.param("studentId"));

    if (isNaN(studentId)) {
      return c.json({ error: "studentId harus berupa angka" }, 400);
    }

    const finance = await financeService.getFinanceByStudentId(studentId);

    if (!finance) {
      return c.json({ error: "Keuangan tidak ditemukan" }, 404);
    }

    return c.json(finance);
  } catch (error) {
    console.error("Error getting finance by student id:", error);
    return c.json(
      { error: error instanceof Error ? error.message : "Terjadi kesalahan" },
      500
    );
  }
};

// export const getTransaksiByTokenController = async (c: Context) => {
//   try {
//     const user = c.get("user");

//     // if (!user || !user.id) {
//     //   return c.json({ error: "Unauthorized: Token tidak valid" }, 401);
//     // }

//     const transaksi = await financeService.getTransaksiService(user.id);

//     return c.json(
//       { message: "Data transaksi ditemukan", data: transaksi },
//       200
//     );
//   } catch (error) {
//     console.error("Error fetching transaksi:", error);
//     return c.json({ error: "Gagal mengambil data transaksi" }, 500);
//   }
// };

export const getTransaksiByTokenController = async (c: Context) => {
  try {
    const user = c.get("user");

    if (!user || !user.userId) {
      return c.json({ error: "Unauthorized: userId tidak ditemukan" }, 401);
    }

    const userData = await prisma.users.findUnique({
      where: { id: user.userId },
      select: { studentProfilId: true },
    });

    if (!userData || !userData.studentProfilId) {
      return c.json({ error: "Student profile tidak ditemukan" }, 404);
    }

    console.log("studentProfilId:", userData.studentProfilId);

    const transaksi = await financeService.getTransaksiService(
      userData.studentProfilId
    );

    console.log("Transaksi:", transaksi);

    return c.json({ message: "Transaksi ditemukan", data: transaksi }, 200);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return c.json({ error: "Gagal mendapatkan transaksi" }, 500);
  }
};

export const getTransaksiByTokenFromParentController = async (c: Context) => {
  try {
    const user = c.get("user");

    if (!user || !user.userId) {
      return c.json({ error: "Unauthorized: userId tidak ditemukan" }, 401);
    }

    const userData = await prisma.users.findUnique({
      where: { id: user.userId },
      select: { studentProfilId: true },
    });

    if (!userData || !userData.studentProfilId) {
      return c.json({ error: "Student profile tidak ditemukan" }, 404);
    }

    console.log("studentProfilId:", userData.studentProfilId);

    const transaksi = await financeService.getTransaksiService(
      userData.studentProfilId
    );

    return c.json({ message: "Transaksi ditemukan", data: transaksi }, 200);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return c.json({ error: "Gagal mendapatkan transaksi" }, 500);
  }
};
