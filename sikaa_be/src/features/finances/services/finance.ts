import { Prisma, Transaksi, TransactionType } from "@prisma/client";
import prisma from "../../../configs/database";
import * as financeRepository from "../repositories/finance";

export const processTransaction = async (
  payload: Prisma.TransaksiUncheckedCreateInput
) => {
  return await financeRepository.createTransaction(payload);
};

export const getTransactionById = async (id: number) => {
  return await financeRepository.getTransactionById(id);
};

export const getAllTransactions = async () => {
  return await financeRepository.getAllTransactions();
};

export const getFinanceByStudentId = async (studentId: number) => {
  return await financeRepository.getFinanaceByStudentId(studentId);
};

export const getTransaksiService = async (studentProfileId: number) => {
  const transactions = await financeRepository.getTransaksiByStudentId(
    studentProfileId
  );

  if (!transactions || transactions.length === 0) {
    return [];
  }

  let runningTotal = 0;

  const formattedTransactions = transactions.map((trx) => {
    // Update running total berdasarkan type transaksi
    if (trx.type === "DEBIT") {
      runningTotal += trx.amount;
    } else if (trx.type === "KREDIT") {
      runningTotal -= trx.amount;
    }

    return {
      tanggal: trx.transDate,
      noreferensi: trx.referensi,
      nojurnal: trx.noJurnal,
      deskripsi: trx.deskripsi,
      debit: trx.type === "DEBIT" ? trx.amount : 0,
      kredit: trx.type === "KREDIT" ? trx.amount : 0,
      runningTotal: runningTotal,
    };
  });

  return formattedTransactions;
};
