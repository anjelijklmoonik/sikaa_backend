import { Context } from "hono";
import * as memberKelasService from "../services/classMember";

// Tambah MemberKelas
export const createMemberKelasController = async (c: Context) => {
  const data = await c.req.json();
  try {
    const newMember = await memberKelasService.createMemberKelasService(data);
    return c.json(newMember, 201);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};

// Dapatkan MemberKelas berdasarkan ID
export const getMemberKelasByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  try {
    const member = await memberKelasService.getMemberKelasByIdService(id);
    if (!member) return c.json({ message: "MemberKelas tidak ditemukan" }, 404);
    return c.json(member);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};

// Dapatkan semua MemberKelas
export const getAllMemberKelasController = async (c: Context) => {
  try {
    const members = await memberKelasService.getAllMemberKelasService();
    return c.json(members);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};

// Perbarui MemberKelas berdasarkan ID
export const updateMemberKelasByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const data = await c.req.json();
  try {
    const updatedMember = await memberKelasService.updateMemberKelasByIdService(
      id,
      data
    );
    return c.json(updatedMember);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};

// Hapus MemberKelas berdasarkan ID
export const deleteMemberKelasByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  try {
    await memberKelasService.deleteMemberKelasByIdService(id);
    return c.json({ message: "MemberKelas berhasil dihapus" });
  } catch (error) {
    return c.json({ message: (error as Error).message }, 400);
  }
};
