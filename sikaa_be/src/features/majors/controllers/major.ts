import * as jurusanService from "../services/major";
import { Context } from "hono";

export const getAllMajorController = async (c: Context) => {
  const jurusans = await jurusanService.getAllJurusanService();
  return c.json(jurusans);
};

export const getMajorByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  try {
    const jurusan = await jurusanService.getJurusanByIdService(id);
    return c.json(jurusan);
  } catch (error) {
    return c.json({ message: "Jurusan tidak ditemukan" }, 404);
  }
};

export const createMajorController = async (c: Context) => {
  const data = await c.req.json();
  try {
    const newJurusan = await jurusanService.createJurusanService(data);
    return c.json(newJurusan, 201);
  } catch (error) {
    return c.json({ message: "Gagal menambahkan jurusan" }, 400);
  }
};

export const updateMajorByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const data = await c.req.json();
  try {
    const updatedJurusan = await jurusanService.updateJurusanByIdService(
      id,
      data
    );
    return c.json(updatedJurusan);
  } catch (error) {
    return c.json({ message: "Gagal memperbarui jurusan" }, 400);
  }
};

export const deleteMajorController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  try {
    await jurusanService.deleteJurusanService(id);
    return c.json({ message: "Jurusan berhasil dihapus" });
  } catch (error) {
    return c.json({ message: "Gagal menghapus jurusan" }, 400);
  }
};
